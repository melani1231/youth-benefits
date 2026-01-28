'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Search, 
  ArrowLeft, 
  SlidersHorizontal, 
  X,
  ChevronDown 
} from 'lucide-react';
import { benefits, categories, regions, academicStatusOptions, incomeBrackets } from '@/data/benefits';
import { filterBenefits, sortBenefits } from '@/lib/utils';
import BenefitCard from '@/components/BenefitCard';
import BottomNav from '@/components/BottomNav';

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    region: '전국',
    incomeBracket: '',
    academicStatus: '',
    hideExpired: true,
  });
  const [sortBy, setSortBy] = useState('deadline');
  
  // 필터링 및 정렬
  const filteredBenefits = useMemo(() => {
    let result = filterBenefits(benefits, filters);
    
    // 검색어 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((b) => 
        b.title.toLowerCase().includes(query) ||
        b.organization.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query) ||
        b.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    return sortBenefits(result, sortBy);
  }, [filters, searchQuery, sortBy]);
  
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      category: 'all',
      region: '전국',
      incomeBracket: '',
      academicStatus: '',
      hideExpired: true,
    });
    setSearchQuery('');
  };
  
  const activeFilterCount = [
    filters.category !== 'all',
    filters.region !== '전국',
    filters.incomeBracket !== '',
    filters.academicStatus !== '',
  ].filter(Boolean).length;
  
  return (
    <div className="min-h-screen pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-40 border-b border-slate-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="지원사업 검색"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <SlidersHorizontal size={20} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* 필터 패널 */}
        {showFilters && (
          <div className="px-4 py-4 bg-slate-50 border-t border-slate-100 animate-slide-up">
            <div className="space-y-4">
              {/* 카테고리 */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateFilter('category', 'all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      filters.category === 'all'
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    전체
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter('category', cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filters.category === cat.id
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-slate-600 border border-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 지역 */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">지역</label>
                <div className="relative">
                  <select
                    value={filters.region}
                    onChange={(e) => updateFilter('region', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              {/* 소득분위 & 학적상태 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">소득분위</label>
                  <div className="relative">
                    <select
                      value={filters.incomeBracket}
                      onChange={(e) => updateFilter('incomeBracket', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">전체</option>
                      {incomeBrackets.map((bracket) => (
                        <option key={bracket.value} value={bracket.value}>{bracket.value}분위</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">학적상태</label>
                  <div className="relative">
                    <select
                      value={filters.academicStatus}
                      onChange={(e) => updateFilter('academicStatus', e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">전체</option>
                      {academicStatusOptions.map((status) => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              {/* 마감된 항목 제외 */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">마감된 항목 제외</span>
                <button
                  onClick={() => updateFilter('hideExpired', !filters.hideExpired)}
                  className={`w-12 h-7 rounded-full transition-colors ${
                    filters.hideExpired ? 'bg-primary-500' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    filters.hideExpired ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              {/* 버튼 */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-medium"
                >
                  초기화
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-2.5 bg-primary-500 text-white rounded-xl font-medium"
                >
                  적용하기
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="px-4 py-4">
        {/* 정렬 & 결과 수 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">
            검색결과 <span className="font-bold text-primary-600">{filteredBenefits.length}</span>건
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-100 rounded-lg text-sm appearance-none focus:outline-none"
            >
              <option value="deadline">마감순</option>
              <option value="popular">인기순</option>
              <option value="recent">최신순</option>
            </select>
            <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
        
        {/* 결과 목록 */}
        <div className="space-y-3">
          {filteredBenefits.length > 0 ? (
            filteredBenefits.map((benefit, index) => (
              <div
                key={benefit.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <BenefitCard benefit={benefit} />
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-medium mb-1">검색 결과가 없습니다</p>
              <p className="text-sm">다른 조건으로 검색해 보세요</p>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
