'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronRight, Sparkles, Clock, TrendingUp, Filter } from 'lucide-react';
import { benefits, categories } from '@/data/benefits';
import { getUrgentBenefits, filterBenefits, sortBenefits, getDday } from '@/lib/utils';
import BenefitCard, { BenefitCardHorizontal } from '@/components/BenefitCard';
import CategoryFilter from '@/components/CategoryFilter';
import BottomNav from '@/components/BottomNav';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 마감 임박 지원사업
  const urgentBenefits = useMemo(() => {
    return getUrgentBenefits(benefits).slice(0, 5);
  }, []);
  
  // 인기 지원사업
  const popularBenefits = useMemo(() => {
    return sortBenefits(benefits, 'popular').slice(0, 5);
  }, []);
  
  // 카테고리 필터링된 지원사업
  const filteredBenefits = useMemo(() => {
    const filtered = filterBenefits(benefits, { 
      category: selectedCategory,
      hideExpired: true 
    });
    return sortBenefits(filtered, 'deadline');
  }, [selectedCategory]);
  
  return (
    <div className="min-h-screen pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-slate-100">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                청춘혜택
              </h1>
            </div>
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
              <Bell size={20} />
            </button>
          </div>
          
          {/* 검색 바 */}
          <Link href="/search">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-100 rounded-2xl text-slate-400">
              <Search size={20} />
              <span className="text-sm">지원사업 검색하기</span>
            </div>
          </Link>
        </div>
      </header>
      
      <main className="px-4 py-4 space-y-6">
        {/* 프로필 설정 배너 */}
        <Link href="/profile">
          <div className="bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">나에게 맞는 혜택을 찾으려면</p>
                <p className="font-bold text-lg">내 조건 설정하기</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ChevronRight size={24} />
              </div>
            </div>
          </div>
        </Link>
        
        {/* 마감 임박 섹션 */}
        {urgentBenefits.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-red-500" />
                <h2 className="font-bold text-slate-900">마감 임박</h2>
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                  D-7 이내
                </span>
              </div>
              <Link href="/search?sort=deadline" className="text-sm text-slate-500 flex items-center">
                전체보기 <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {urgentBenefits.map((benefit) => (
                <BenefitCardHorizontal key={benefit.id} benefit={benefit} />
              ))}
            </div>
          </section>
        )}
        
        {/* 카테고리 필터 */}
        <section>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>
        
        {/* 전체 지원사업 목록 */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary-500" />
              <h2 className="font-bold text-slate-900">
                {selectedCategory === 'all' ? '전체 지원사업' : categories.find(c => c.id === selectedCategory)?.label}
              </h2>
              <span className="text-sm text-slate-400">
                {filteredBenefits.length}건
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredBenefits.length > 0 ? (
              filteredBenefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <BenefitCard benefit={benefit} />
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400">
                <p className="text-lg mb-2">😢</p>
                <p>해당 카테고리의 지원사업이 없습니다</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
}
