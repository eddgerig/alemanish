import React from 'react';

interface OptionCardProps {
    id: string;
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    imageUrl?: string;
    audioUrl?: string;
    isSelected: boolean;
    onClick: (id: string) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({ id, icon, title, subtitle, imageUrl, audioUrl, isSelected, onClick }) => {
    const handleClick = () => {
        try {
            const audioPath = audioUrl || `/audios/${id}.mp3`;
            const audio = new Audio(audioPath);
            audio.play().catch(e => console.log('Audio play failed:', e));
        } catch (e) {
            console.log('Audio system error:', e);
        }
        onClick(id);
    };

    return (
        <button
            onClick={handleClick}
            className={`
                flex flex-col items-center justify-center p-6 rounded-2xl w-full max-w-[200px] h-[220px]
                transition-all duration-200 transform hover:-translate-y-1 bg-white
                ${isSelected ? 'border-2 border-orange-400 shadow-[0_4px_0_0_#fb923c] !bg-orange-50/30' : 'border-2 border-transparent shadow-[0_4px_0_0_#e5e7eb]'}
            `}
        >
            {imageUrl ? (
                <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                </div>
            ) : icon ? (
                <div className="w-16 h-16 flex-shrink-0 rounded-full bg-orange-100 flex items-center justify-center mb-6 text-orange-500">
                    {icon}
                </div>
            ) : null}
            <h3 className="text-xl font-bold text-slate-800 mb-1">{title}</h3>
            {subtitle && <p className="text-sm font-semibold text-slate-500 italic">{subtitle}</p>}

        </button>
    );
};
