'use client';

import Link from 'next/link';
import { Bookmark, Eye, Clock, Building2 } from 'lucide-react';
import { getDday, formatDate, getCategoryStyle, getOrganizationLabel, formatCount } from '@/lib/utils';

export default function BenefitCard({ benefit, variant = 'default' }) {
  const dday = getDday(benefit.endDate);
  const categoryStyle = getCategoryStyle(benefit.category);
  
  if (variant === 'compact') {
    return (
      <Link href={`/benefit/${benefit.id}`}>
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 card-hover">
          <div className={`w-12 h-12 rounded-xl ${categoryStyle.bg} flex items-center justify-center flex-shrink-0`}>
            <span className={`text-lg font-bold ${categoryStyle.text}`}>
              {benefit.categoryLabel[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate text-sm">
              {benefit.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{benefit.organization}</p>
          </div>
          <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
            dday.isExpired 
              ? 'bg-slate-100 text-slate-400' 
              : dday.isUrgent 
                ? 'bg-red-100 text-red-600 dday-badge' 
                : 'bg-slate-100 text-slate-600'
          }`}>
            {dday.text}
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link href={`/benefit/${benefit.id}`}>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover">
        {/* 카드 헤더 */}
        <div className={`px-4 py-3 ${categoryStyle.bg} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${categoryStyle.text} px-2 py-0.5 rounded-full bg-white/60`}>
              {getOrganizationLabel(benefit.organizationType)}
            </span>
            <span className={`text-xs font-semibold ${categoryStyle.text}`}>
              {benefit.categoryLabel}
            </span>
          </div>
          <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
            dday.isExpired 
              ? 'bg-white/60 text-slate-400' 
              : dday.isUrgent 
                ? 'bg-red-500 text-white dday-badge' 
                : 'bg-white/80 text-slate-700'
          }`}>
            {dday.text}
          </div>
        </div>
        
        {/* 카드 바디 */}
        <div className="p-4">
          <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2">
            {benefit.title}
          </h3>
          
          <p className="text-sm text-slate-500 mb-3 line-clamp-2">
            {benefit.description}
          </p>
          
          {/* 지원 금액 */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-3 mb-3">
            <p className="text-xs text-primary-600 font-medium mb-0.5">지원 금액</p>
            <p className="text-primary-700 font-bold">{benefit.amount}</p>
          </div>
          
          {/* 메타 정보 */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Building2 size={12} />
                {benefit.organization}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {formatCount(benefit.viewCount)}
              </span>
              <span className="flex items-center gap-1">
                <Bookmark size={12} />
                {formatCount(benefit.bookmarkCount)}
              </span>
            </div>
          </div>
        </div>
        
        {/* 태그 */}
        <div className="px-4 pb-4 flex gap-1.5 flex-wrap">
          {benefit.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

// 가로 스크롤용 컴팩트 카드
export function BenefitCardHorizontal({ benefit }) {
  const dday = getDday(benefit.endDate);
  const categoryStyle = getCategoryStyle(benefit.category);
  
  return (
    <Link href={`/benefit/${benefit.id}`}>
      <div className="w-64 bg-white rounded-2xl border border-slate-100 overflow-hidden card-hover flex-shrink-0">
        <div className={`px-3 py-2 ${categoryStyle.bg} flex items-center justify-between`}>
          <span className={`text-xs font-semibold ${categoryStyle.text}`}>
            {benefit.categoryLabel}
          </span>
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
            dday.isUrgent ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-700'
          }`}>
            {dday.text}
          </span>
        </div>
        <div className="p-3">
          <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1 line-clamp-2">
            {benefit.title}
          </h3>
          <p className="text-xs text-slate-500 mb-2">{benefit.organization}</p>
          <p className="text-sm text-primary-600 font-semibold">{benefit.amount}</p>
        </div>
      </div>
    </Link>
  );
}
