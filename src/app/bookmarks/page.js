'use client';

import { useState } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { benefits } from '@/data/benefits';
import BenefitCard from '@/components/BenefitCard';
import BottomNav from '@/components/BottomNav';

export default function BookmarksPage() {
  // 실제로는 localStorage나 서버에서 가져옴
  const [bookmarkedIds, setBookmarkedIds] = useState(['1', '2', '9']);
  
  const bookmarkedBenefits = benefits.filter(b => bookmarkedIds.includes(b.id));
  
  const removeBookmark = (id) => {
    setBookmarkedIds(prev => prev.filter(i => i !== id));
  };
  
  return (
    <div className="min-h-screen pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-40 border-b border-slate-100">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Bookmark size={22} className="text-primary-500" />
            <h1 className="text-xl font-bold text-slate-900">저장한 지원사업</h1>
          </div>
        </div>
      </header>
      
      <main className="px-4 py-4">
        {bookmarkedBenefits.length > 0 ? (
          <>
            <p className="text-sm text-slate-500 mb-4">
              총 <span className="font-bold text-primary-600">{bookmarkedBenefits.length}</span>개의 지원사업
            </p>
            <div className="space-y-3">
              {bookmarkedBenefits.map((benefit) => (
                <div key={benefit.id} className="relative">
                  <BenefitCard benefit={benefit} />
                  <button
                    onClick={() => removeBookmark(benefit.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-slate-400">
            <Bookmark size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-1">저장한 지원사업이 없습니다</p>
            <p className="text-sm">관심 있는 지원사업을 저장해 보세요</p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}
