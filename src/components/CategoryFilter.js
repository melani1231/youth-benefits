'use client';

import { GraduationCap, Wallet, Home, Briefcase, Rocket, BookOpen, LayoutGrid } from 'lucide-react';

const categoryIcons = {
  all: LayoutGrid,
  scholarship: GraduationCap,
  living: Wallet,
  housing: Home,
  job: Briefcase,
  startup: Rocket,
  education: BookOpen,
};

const categoryColors = {
  all: 'from-slate-500 to-slate-600',
  scholarship: 'from-blue-500 to-blue-600',
  living: 'from-emerald-500 to-emerald-600',
  housing: 'from-amber-500 to-amber-600',
  job: 'from-pink-500 to-pink-600',
  startup: 'from-purple-500 to-purple-600',
  education: 'from-orange-500 to-orange-600',
};

export default function CategoryFilter({ categories, selected, onSelect }) {
  const allCategories = [
    { id: 'all', label: '전체' },
    ...categories,
  ];
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {allCategories.map((category) => {
        const Icon = categoryIcons[category.id];
        const isSelected = selected === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
              isSelected
                ? `bg-gradient-to-r ${categoryColors[category.id]} text-white shadow-lg shadow-slate-200`
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Icon size={16} />
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
