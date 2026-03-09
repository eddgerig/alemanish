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
                transition-all duration-200 transform hover:-translate-y-1 bg-black/40 backdrop-blur-md overflow-hidden
                ${isSelected ? 'border-2 border-emerald-500 shadow-[0_4px_0_0_#10b981] !bg-emerald-500/20' : 'border-2 border-white/20 shadow-[0_4px_0_0_rgba(255,255,255,0.2)]'}
            `}
        >
            {/* Checkmark icon for selected state */}
            {isSelected && (
                <div className="absolute top-4 right-4 text-emerald-400 z-10 bg-black/50 backdrop-blur-sm rounded-full">
                    <CheckCircleIcon fontSize="small" />
                </div>
            )}

            {/* Image Container */}
            <div className="w-full h-4/5 rounded-lg overflow-hidden flex items-center justify-center bg-black/30 mb-2">
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Title / Label */}
            <h3 className="text-lg font-extrabold text-white mb-2">{title}</h3>

            {/* Optional green indicator line at bottom if selected matching design */}
            {isSelected && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-[3px] bg-emerald-500 rounded-full" />
            )}
        </button>
    );
};
