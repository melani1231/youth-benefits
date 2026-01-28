import { differenceInDays, format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

// D-day 계산
export function getDday(endDate) {
  const today = new Date();
  const end = parseISO(endDate);
  const diff = differenceInDays(end, today);
  
  if (diff < 0) return { text: '마감', isExpired: true, isUrgent: false };
  if (diff === 0) return { text: 'D-Day', isExpired: false, isUrgent: true };
  if (diff <= 7) return { text: `D-${diff}`, isExpired: false, isUrgent: true };
  return { text: `D-${diff}`, isExpired: false, isUrgent: false };
}

// 날짜 포맷팅
export function formatDate(dateString) {
  return format(parseISO(dateString), 'yyyy.MM.dd');
}

// 날짜 범위 포맷팅
export function formatDateRange(startDate, endDate) {
  return `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
}

// 카테고리별 스타일
export function getCategoryStyle(category) {
  const styles = {
    scholarship: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    living: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    housing: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    job: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    startup: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    education: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  };
  return styles[category] || styles.scholarship;
}

// 조직 타입별 라벨
export function getOrganizationLabel(type) {
  const labels = {
    government: '정부',
    local: '지자체',
    foundation: '재단',
    corporate: '기업',
    university: '학교',
  };
  return labels[type] || '기타';
}

// 필터링 함수
export function filterBenefits(benefits, filters) {
  return benefits.filter((benefit) => {
    // 카테고리 필터
    if (filters.category && filters.category !== 'all') {
      if (benefit.category !== filters.category) return false;
    }
    
    // 지역 필터
    if (filters.region && filters.region !== '전국') {
      if (benefit.requirements.regions && !benefit.requirements.regions.includes(filters.region)) {
        return false;
      }
    }
    
    // 소득분위 필터
    if (filters.incomeBracket) {
      if (benefit.requirements.incomeBracket) {
        if (!benefit.requirements.incomeBracket.includes(parseInt(filters.incomeBracket))) {
          return false;
        }
      }
    }
    
    // 학적 상태 필터
    if (filters.academicStatus) {
      if (benefit.requirements.academicStatus) {
        if (!benefit.requirements.academicStatus.includes(filters.academicStatus)) {
          return false;
        }
      }
    }
    
    // 마감된 항목 제외 (옵션)
    if (filters.hideExpired) {
      const dday = getDday(benefit.endDate);
      if (dday.isExpired) return false;
    }
    
    return true;
  });
}

// 정렬 함수
export function sortBenefits(benefits, sortBy) {
  const sorted = [...benefits];
  
  switch (sortBy) {
    case 'deadline':
      return sorted.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    case 'popular':
      return sorted.sort((a, b) => b.viewCount - a.viewCount);
    case 'recent':
      return sorted.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    default:
      return sorted;
  }
}

// 마감 임박 필터 (7일 이내)
export function getUrgentBenefits(benefits) {
  return benefits.filter((benefit) => {
    const dday = getDday(benefit.endDate);
    return dday.isUrgent && !dday.isExpired;
  });
}

// SNS 공유 URL 생성
export function getShareUrls(benefit, pageUrl) {
  const title = encodeURIComponent(`[대학생 필수 지원사업] ${benefit.title}`);
  const text = encodeURIComponent(`💰 ${benefit.amount}\n📅 마감: ${formatDate(benefit.endDate)}`);
  const url = encodeURIComponent(pageUrl);
  
  return {
    kakao: `https://sharer.kakao.com/talk/friends/picker/link?app_key=YOUR_KAKAO_KEY&link_url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`,
    twitter: `https://twitter.com/intent/tweet?text=${title}%0A${text}&url=${url}`,
    threads: `https://www.threads.net/intent/post?text=${title}%0A${text}%0A${url}`,
  };
}

// 조회수 포맷팅
export function formatCount(count) {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1)}만`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}천`;
  }
  return count.toString();
}
