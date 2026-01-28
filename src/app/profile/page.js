'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  User,
  MapPin,
  GraduationCap,
  Wallet,
  Heart,
  ChevronDown,
  Check
} from 'lucide-react';
import { regions, academicStatusOptions, incomeBrackets } from '@/data/benefits';
import BottomNav from '@/components/BottomNav';

const majorCategories = [
  { value: 'humanities', label: '인문계열' },
  { value: 'social', label: '사회계열' },
  { value: 'natural', label: '자연계열' },
  { value: 'engineering', label: '공학계열' },
  { value: 'arts', label: '예체능계열' },
  { value: 'medical', label: '의약계열' },
];

const specialConditions = [
  { id: 'basicLiving', label: '기초생활수급자' },
  { id: 'nearPoverty', label: '차상위계층' },
  { id: 'singleParent', label: '한부모가정' },
  { id: 'multiChild', label: '다자녀가구' },
  { id: 'disability', label: '장애인' },
  { id: 'veteran', label: '제대군인' },
  { id: 'northKorean', label: '북한이탈주민' },
];

export default function ProfilePage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    region: '',
    universityRegion: '',
    gender: '',
    academicStatus: '',
    grade: '',
    majorCategory: '',
    incomeBracket: '',
    specialConditions: [],
  });
  
  const updateProfile = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };
  
  const toggleSpecialCondition = (id) => {
    setProfile(prev => ({
      ...prev,
      specialConditions: prev.specialConditions.includes(id)
        ? prev.specialConditions.filter(c => c !== id)
        : [...prev.specialConditions, id]
    }));
    setSaved(false);
  };
  
  const handleSave = () => {
    // 실제로는 여기서 localStorage나 서버에 저장
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  
  return (
    <div className="min-h-screen pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 bg-white z-40 border-b border-slate-100">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-slate-900">내 프로필 설정</h1>
          </div>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              saved 
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-primary-500 text-white'
            }`}
          >
            {saved ? (
              <span className="flex items-center gap-1">
                <Check size={16} /> 저장됨
              </span>
            ) : '저장'}
          </button>
        </div>
      </header>
      
      <main className="px-4 py-6 space-y-6">
        {/* 안내 문구 */}
        <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-2xl p-4">
          <p className="text-primary-700 font-medium">
            조건을 설정하면 나에게 맞는 지원사업을 추천받을 수 있어요!
          </p>
        </div>
        
        {/* 기본 정보 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-slate-500" />
            <h2 className="font-bold text-slate-900">기본 정보</h2>
          </div>
          
          <div className="space-y-4">
            {/* 성별 */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">성별</label>
              <div className="flex gap-2">
                {['male', 'female'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => updateProfile('gender', gender)}
                    className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                      profile.gender === gender
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {gender === 'male' ? '남성' : '여성'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* 지역 정보 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-slate-500" />
            <h2 className="font-bold text-slate-900">지역 정보</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">거주 지역</label>
              <div className="relative">
                <select
                  value={profile.region}
                  onChange={(e) => updateProfile('region', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">선택하세요</option>
                  {regions.filter(r => r !== '전국').map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">대학 소재지</label>
              <div className="relative">
                <select
                  value={profile.universityRegion}
                  onChange={(e) => updateProfile('universityRegion', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">선택하세요</option>
                  {regions.filter(r => r !== '전국').map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
        
        {/* 학적 정보 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} className="text-slate-500" />
            <h2 className="font-bold text-slate-900">학적 정보</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">학적 상태</label>
              <div className="relative">
                <select
                  value={profile.academicStatus}
                  onChange={(e) => updateProfile('academicStatus', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">선택하세요</option>
                  {academicStatusOptions.map((status) => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">학년</label>
                <div className="relative">
                  <select
                    value={profile.grade}
                    onChange={(e) => updateProfile('grade', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">선택</option>
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                    <option value="4">4학년</option>
                    <option value="grad">대학원</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">전공 계열</label>
                <div className="relative">
                  <select
                    value={profile.majorCategory}
                    onChange={(e) => updateProfile('majorCategory', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">선택</option>
                    {majorCategories.map((major) => (
                      <option key={major.value} value={major.value}>{major.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 경제 정보 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Wallet size={18} className="text-slate-500" />
            <h2 className="font-bold text-slate-900">경제 정보</h2>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              소득분위 <span className="text-slate-400 font-normal">(모르면 선택 안 해도 돼요)</span>
            </label>
            <div className="relative">
              <select
                value={profile.incomeBracket}
                onChange={(e) => updateProfile('incomeBracket', e.target.value)}
                className="w-full px-4 py-3 bg-slate-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">모름 / 선택 안 함</option>
                {incomeBrackets.map((bracket) => (
                  <option key={bracket.value} value={bracket.value}>{bracket.label}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </section>
        
        {/* 특수 조건 */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Heart size={18} className="text-slate-500" />
            <h2 className="font-bold text-slate-900">추가 조건</h2>
            <span className="text-sm text-slate-400">(해당 시 선택)</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {specialConditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => toggleSpecialCondition(condition.id)}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  profile.specialConditions.includes(condition.id)
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {condition.label}
              </button>
            ))}
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
}
