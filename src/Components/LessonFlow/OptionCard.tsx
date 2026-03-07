import React from 'react';

interface OptionCardProps {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({ id, icon, title, subtitle, isSelected, onClick }) => {
    return (
        <button
            onClick={() => onClick(id)}
            className={`
                flex flex-col items-center justify-center p-6 rounded-2xl w-full max-w-[200px] h-[220px]
                transition-all duration-200 transform hover:-translate-y-1 bg-white
                ${isSelected ? 'border-2 border-orange-400 shadow-[0_4px_0_0_#fb923c] !bg-orange-50/30' : 'border-2 border-transparent shadow-[0_4px_0_0_#e5e7eb]'}
            `}
        >
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-orange-500">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm font-semibold text-slate-500 italic">{subtitle}</p>
        </button>
    );
};
