'use client';

import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { benefits } from '@/data/benefits';
import BenefitCard from '@/components/BenefitCard';
import BottomNav from '@/components/BottomNav';

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // 해당 월의 날짜들
  const monthDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);
  
  // 마감일 기준으로 지원사업 매핑
  const benefitsByDate = useMemo(() => {
    const map = {};
    benefits.forEach(benefit => {
      const dateKey = benefit.endDate;
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(benefit);
    });
    return map;
  }, []);
  
  // 선택된 날짜의 지원사업
  const selectedBenefits = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return benefitsByDate[dateKey] || [];
  }, [selectedDate, benefitsByDate]);
  
  // 첫 번째 날의 요일 (0: 일요일)
  const firstDayOfWeek = startOfMonth(currentMonth).getDay();
  
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  
  return (
    <div className="min-h-screen pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-40 border-b border-slate-100">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Calendar size={22} className="text-primary-500" />
            <h1 className="text-xl font-bold text-slate-900">마감 캘린더</h1>
          </div>
        </div>
      </header>
      
      <main className="px-4 py-4">
        {/* 월 네비게이션 */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-slate-900">
            {format(currentMonth, 'yyyy년 M월', { locale: ko })}
          </h2>
          <button 
            onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day, i) => (
            <div 
              key={day} 
              className={`text-center text-sm font-medium py-2 ${
                i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {/* 빈 칸 */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {/* 날짜들 */}
          {monthDays.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const hasBenefits = benefitsByDate[dateKey]?.length > 0;
            const benefitCount = benefitsByDate[dateKey]?.length || 0;
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const dayOfWeek = day.getDay();
            
            return (
              <button
                key={dateKey}
                onClick={() => setSelectedDate(hasBenefits ? day : null)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all ${
                  isSelected 
                    ? 'bg-primary-500 text-white' 
                    : isToday
                      ? 'bg-primary-50 text-primary-600'
                      : hasBenefits
                        ? 'bg-slate-50 hover:bg-slate-100'
                        : 'hover:bg-slate-50'
                }`}
              >
                <span className={`text-sm font-medium ${
                  isSelected 
                    ? 'text-white' 
                    : dayOfWeek === 0 
                      ? 'text-red-400' 
                      : dayOfWeek === 6 
                        ? 'text-blue-400' 
                        : ''
                }`}>
                  {format(day, 'd')}
                </span>
                {hasBenefits && (
                  <span className={`text-[10px] font-bold mt-0.5 ${
                    isSelected ? 'text-white/80' : 'text-primary-500'
                  }`}>
                    {benefitCount}건
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* 선택된 날짜의 지원사업 */}
        {selectedDate && (
          <div className="border-t border-slate-100 pt-4">
            <h3 className="font-bold text-slate-900 mb-3">
              {format(selectedDate, 'M월 d일', { locale: ko })} 마감
              <span className="text-primary-500 ml-1">({selectedBenefits.length}건)</span>
            </h3>
            <div className="space-y-3">
              {selectedBenefits.map(benefit => (
                <BenefitCard key={benefit.id} benefit={benefit} variant="compact" />
              ))}
            </div>
          </div>
        )}
        
        {!selectedDate && (
          <div className="py-8 text-center text-slate-400">
            <p>마감일이 있는 날짜를 선택하면</p>
            <p>해당 지원사업을 확인할 수 있어요</p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
