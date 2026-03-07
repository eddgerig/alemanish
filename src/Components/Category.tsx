import React from 'react';

type CategoryStatus = 'completed' | 'current' | 'locked';

interface CategoryProps {
    title: string;
    icon: React.ReactNode;
    status: CategoryStatus;
    badge?: string;
    offsetX?: number; // Tailwind translate-x class or pixel offset
    onClick?: () => void;
}

export const Category: React.FC<CategoryProps> = ({ title, icon, status, badge, offsetX = 0, onClick }) => {
    // Determine styles based on status
    const isCompleted = status === 'completed';
    const isCurrent = status === 'current';

    const bgColorClass = isCompleted || isCurrent ? 'bg-green-700' : 'bg-gray-300';
    const shadowClass = isCompleted || isCurrent ? 'shadow-[0_4px_0_0_#166534]' : 'shadow-[0_4px_0_0_#9ca3af]'; // darker green shadow vs darker gray
    const titleColor = isCurrent ? 'text-green-700' : 'text-gray-400';
    const iconColor = isCompleted || isCurrent ? 'text-white' : 'text-gray-500';

    return (
        <div
            className="relative flex flex-col items-center my-6 z-10"
            style={{ transform: `translateX(${offsetX}px)` }}
        >
            {/* Title Tag */}
            <div className={`mb-3 px-4 py-1.5 bg-white rounded-xl ${isCurrent ? 'shadow-sm' : 'opacity-70'} border-2 ${isCurrent ? 'border-gray-200' : 'border-transparent'}`}>
                <span className={`text-xs font-bold tracking-wider ${titleColor} uppercase`}>
                    {title}
                </span>
            </div>

            {/* Circular Node */}
            <div className="relative">
                <button
                    onClick={onClick}
                    className={`
            w-16 h-16 rounded-full flex items-center justify-center 
            transition-transform transform hover:-translate-y-1 active:translate-y-1 active:shadow-none
            ${bgColorClass} ${shadowClass} border-4 border-white border-opacity-30
          `}
                >
                    <div className={iconColor}>
                        {icon}
                    </div>
                </button>

                {/* Optional Badge (e.g. red crown/number) */}
                {badge && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-red-700 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm z-20">
                        {badge}
                    </div>
                )}
            </div>
        </div>
    );
};
