import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ImageOptionCardProps {
    id: string;
    imageSrc: string;
    title: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

export const ImageOptionCard: React.FC<ImageOptionCardProps> = ({ id, imageSrc, title, isSelected, onClick }) => {
    return (
        <button
            onClick={() => onClick(id)}
            className={`
                relative flex flex-col items-center justify-between p-2 rounded-xl w-full max-w-[200px] h-[240px]
                transition-all duration-200 transform hover:-translate-y-1 bg-white overflow-hidden
                ${isSelected ? 'border-2 border-emerald-600 shadow-[0_4px_0_0_#059669] !bg-emerald-50/20' : 'border-2 border-transparent shadow-[0_4px_0_0_#e5e7eb]'}
            `}
        >
            {/* Checkmark icon for selected state */}
            {isSelected && (
                <div className="absolute top-4 right-4 text-emerald-600 z-10 bg-white rounded-full">
                    <CheckCircleIcon fontSize="small" />
                </div>
            )}

            {/* Image Container */}
            <div className="w-full h-4/5 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100/50 mb-2">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Title / Label */}
            <h3 className="text-lg font-extrabold text-slate-800 mb-2">{title}</h3>

            {/* Optional green indicator line at bottom if selected matching design */}
            {isSelected && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-[3px] bg-emerald-600 rounded-full" />
            )}
        </button>
    );
};
