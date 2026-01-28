'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck,
  Share2, 
  Calendar, 
  Building2, 
  Wallet, 
  CheckCircle2, 
  FileText,
  ExternalLink,
  X,
  Copy,
  Check
} from 'lucide-react';
import { benefits } from '@/data/benefits';
import { 
  getDday, 
  formatDateRange, 
  getCategoryStyle, 
  getOrganizationLabel,
  formatCount 
} from '@/lib/utils';

// SNS 아이콘 컴포넌트
function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#000000">
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.8 1.86 5.26 4.64 6.67-.14.53-.94 3.31-.97 3.53 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.77-2.46 4.37-2.89.53.08 1.07.12 1.63.12 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#000000">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#000000">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.013-3.278.79-6.023 2.31-8.162C5.62 1.567 8.4.29 12.02.29c2.63 0 4.864.78 6.645 2.317 1.675 1.446 2.818 3.475 3.397 6.03l-2.326.568c-.453-2.023-1.334-3.573-2.617-4.608C15.773 3.517 14.015 2.94 12 2.94c-2.76 0-4.86 1.012-6.24 3.008-1.267 1.827-1.913 4.243-1.92 7.176v.063c0 2.93.597 5.19 1.774 6.72 1.266 1.647 3.166 2.48 5.648 2.48h.034c2.36-.013 4.12-.65 5.386-1.947.99-1.014 1.603-2.39 1.823-4.095l2.327.33c-.29 2.258-1.132 4.148-2.502 5.616-1.748 1.872-4.215 2.84-7.336 2.88z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="url(#instagram-gradient)">
      <defs>
        <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="50%" stopColor="#F77737" />
          <stop offset="100%" stopColor="#C13584" />
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function BenefitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const benefit = benefits.find((b) => b.id === params.id);
  
  if (!benefit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">지원사업을 찾을 수 없습니다.</p>
      </div>
    );
  }
  
  const dday = getDday(benefit.endDate);
  const categoryStyle = getCategoryStyle(benefit.category);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `[대학생 필수 지원사업] ${benefit.title}`,
          text: `💰 ${benefit.amount}\n📅 마감: ${benefit.endDate}`,
          url: window.location.href,
        });
      } catch (err) {
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const shareUrls = {
    kakao: `https://story.kakao.com/share?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`[대학생 필수 지원사업] ${benefit.title}\n💰 ${benefit.amount}`)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`,
    threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(`[대학생 필수 지원사업] ${benefit.title}\n💰 ${benefit.amount}\n${typeof window !== 'undefined' ? window.location.href : ''}`)}`,
  };
  
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-slate-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Share2 size={20} />
            </button>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isBookmarked 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
          </div>
        </div>
      </header>
      
      <main className="px-4 py-4">
        {/* 카테고리 & D-day */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
              {benefit.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600">
              {getOrganizationLabel(benefit.organizationType)}
            </span>
          </div>
          <span className={`px-3 py-1.5 rounded-xl text-sm font-bold ${
            dday.isExpired 
              ? 'bg-slate-100 text-slate-400' 
              : dday.isUrgent 
                ? 'bg-red-500 text-white' 
                : 'bg-slate-800 text-white'
          }`}>
            {dday.text}
          </span>
        </div>
        
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
          {benefit.title}
        </h1>
        
        {/* 기관 */}
        <p className="text-slate-500 mb-6 flex items-center gap-1">
          <Building2 size={16} />
          {benefit.organization}
        </p>
        
        {/* 지원 금액 */}
        <div className="bg-gradient-to-r from-primary-500 to-indigo-500 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Wallet size={18} />
            <span className="text-white/80 text-sm font-medium">지원 금액</span>
          </div>
          <p className="text-2xl font-bold">{benefit.amount}</p>
        </div>
        
        {/* 정보 카드들 */}
        <div className="space-y-4 mb-6">
          {/* 신청 기간 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-primary-500" />
              <h3 className="font-semibold text-slate-900">신청 기간</h3>
            </div>
            <p className="text-slate-700 pl-7">
              {formatDateRange(benefit.startDate, benefit.endDate)}
            </p>
          </div>
          
          {/* 지원 대상 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <h3 className="font-semibold text-slate-900">지원 대상</h3>
            </div>
            <div className="pl-7 space-y-2">
              {benefit.requirements.incomeBracket && (
                <p className="text-slate-700">
                  • 소득분위: {benefit.requirements.incomeBracket[0]}~{benefit.requirements.incomeBracket[benefit.requirements.incomeBracket.length - 1]}분위
                </p>
              )}
              {benefit.requirements.regions && (
                <p className="text-slate-700">
                  • 거주지역: {benefit.requirements.regions.join(', ')}
                </p>
              )}
              {benefit.requirements.academicStatus && (
                <p className="text-slate-700">
                  • 학적상태: {benefit.requirements.academicStatus.map(s => {
                    const labels = { enrolled: '재학', leave: '휴학', returning: '복학예정', graduated: '졸업/졸업예정' };
                    return labels[s];
                  }).join(', ')}
                </p>
              )}
              {benefit.requirements.ageRange && (
                <p className="text-slate-700">
                  • 연령: 만 {benefit.requirements.ageRange[0]}세 ~ {benefit.requirements.ageRange[1]}세
                </p>
              )}
            </div>
          </div>
          
          {/* 필요 서류 */}
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={18} className="text-amber-500" />
              <h3 className="font-semibold text-slate-900">필요 서류</h3>
            </div>
            <ul className="pl-7 space-y-1">
              {benefit.documents.map((doc, index) => (
                <li key={index} className="text-slate-700">• {doc}</li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* 상세 설명 */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-2">상세 내용</h3>
          <p className="text-slate-600 leading-relaxed">
            {benefit.description}
          </p>
        </div>
        
        {/* 태그 */}
        <div className="flex gap-2 flex-wrap mb-6">
          {benefit.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-sm px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </main>
      
      {/* CTA 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 z-50">
        <div className="mx-auto max-w-lg">
          <a 
            href={benefit.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-2xl btn-primary"
          >
            신청하러 가기
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
      
      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">공유하기</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-4 mb-6">
              <a 
                href={shareUrls.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-[#FEE500] rounded-2xl flex items-center justify-center">
                  <KakaoIcon />
                </div>
                <span className="text-xs text-slate-600">카카오톡</span>
              </a>
              
              <a 
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-xs text-slate-600">페이스북</span>
              </a>
              
              <a 
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="text-xs text-slate-600">X</span>
              </a>
              
              <a 
                href={shareUrls.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center">
                  <svg viewBox="0 0 192 192" className="w-6 h-6" fill="white">
                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 125.084 65.4397 132.956 73.6984 138.358C80.7013 142.958 89.4458 145.309 98.5034 144.822C110.726 144.177 120.477 139.545 127.514 131.087C132.9 124.629 136.616 116.337 138.663 106.155C144.285 109.312 148.52 113.46 150.941 118.618C155.026 127.185 155.212 141.966 144.832 152.337C134.452 162.707 121.287 167.055 97.5619 167.055C74.1656 167.055 56.7119 159.946 45.6967 146.017C35.2168 132.704 29.6997 113.219 29.6997 88.5C29.6997 63.7807 35.2168 44.2964 45.6967 30.9831C56.7119 17.0535 74.1656 9.94531 97.5619 9.94531C121.074 9.94531 138.614 17.0756 149.687 31.0389C155.128 38.0037 159.157 46.7107 161.738 56.9697L178.49 52.5639C175.16 39.7583 169.758 28.7129 162.216 19.5883C147.854 1.58687 125.746 -7.5 97.5619 -7.5C69.5269 -7.5 47.4759 1.54012 33.0844 19.3892C19.2768 36.7085 12.2001 60.6972 12.2001 88.5C12.2001 116.303 19.2768 140.292 33.0844 157.611C47.4759 175.46 69.5269 184.5 97.5619 184.5C125.597 184.5 147.648 175.46 162.039 157.611C179.702 136.052 179.633 106.917 169.936 86.8258C162.998 72.2743 150.618 61.5 132.779 55.7644C132.186 60.6231 131.33 65.2131 130.227 69.5343C140.04 73.7497 146.776 80.0693 151.238 88.9883C157.66 102.261 157.722 122.142 146.553 133.311C138.475 141.389 127.042 146.136 109.667 146.136H109.661C92.3028 146.136 80.8694 141.389 72.7915 133.311C68.7497 129.269 66.7401 124.215 66.4997 119.001C66.0101 108.777 73.6765 99.2688 89.5277 98.3676C96.3575 97.9598 103.643 98.2908 111.193 99.3468C115.127 88.5919 117.125 75.8691 117.125 62.3177L117.125 61.6855C101.254 61.6855 86.7156 67.0618 75.881 77.8963L62.1016 68.4442C72.2041 53.8892 88.3272 44.7443 109.667 44.7443H117.125C117.125 44.7443 117.125 44.745 117.125 44.745C142.181 44.905 157.1 60.5382 158.582 87.8451C158.769 88.0035 158.954 88.1639 159.137 88.3262L141.537 88.9883Z"/>
                  </svg>
                </div>
                <span className="text-xs text-slate-600">스레드</span>
              </a>
              
              <button 
                onClick={copyToClipboard}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  copied ? 'bg-emerald-500' : 'bg-slate-200'
                }`}>
                  {copied ? (
                    <Check size={24} className="text-white" />
                  ) : (
                    <Copy size={24} className="text-slate-600" />
                  )}
                </div>
                <span className="text-xs text-slate-600">
                  {copied ? '복사됨!' : '링크복사'}
                </span>
              </button>
            </div>
            
            <button 
              onClick={() => setShowShareModal(false)}
              className="w-full py-3 bg-slate-100 text-slate-700 font-medium rounded-xl"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
