import React from 'react';

interface ProgressBarProps {
    title: string;
    percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ title, percentage }) => {
    return (
        <div className="w-full px-6 py-2 mb-8 mt-2">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-white/70 tracking-widest uppercase">
                    LECCIÓN: {title}
                </span>
                <span className="text-sm font-bold text-emerald-400">
                    {percentage}%
                </span>
            </div>
            {/* Progress bar background */}
            <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
                {/* Progress bar fill */}
                <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};
