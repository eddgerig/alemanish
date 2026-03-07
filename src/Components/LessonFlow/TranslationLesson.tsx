import React, { useState } from 'react';
import { OptionCard } from './OptionCard';
import type { TranslationLessonData } from '../../types/lesson';

import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

interface TranslationLessonProps {
    data: TranslationLessonData;
    onOptionSelected: (value: string | null) => void;
}

// Helper to map icon names from JSON to actual MUI Components
const renderIcon = (iconName: string) => {
    switch (iconName) {
        case 'sun': return <WbSunnyOutlinedIcon fontSize="large" />;
        case 'hand': return <PanToolOutlinedIcon fontSize="large" />;
        case 'heart': return <FavoriteBorderOutlinedIcon fontSize="large" />;
        default: return <WbSunnyOutlinedIcon fontSize="large" />;
    }
};

export const TranslationLesson: React.FC<TranslationLessonProps> = ({ data, onOptionSelected }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (id: string) => {
        setSelectedOption(id);
        onOptionSelected(id);
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4 w-full mt-10 mb-20">
            {/* Question */}
            <h2 className="text-3xl font-extrabold text-slate-800 mb-12 text-center drop-shadow-sm">
                {data.questionPrefix} <span className="text-orange-400">{data.highlightedWord}</span>{data.questionSuffix}
            </h2>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl justify-items-center">
                {data.options.map((option) => (
                    <OptionCard
                        key={option.id}
                        id={option.id}
                        title={option.title}
                        subtitle={option.subtitle}
                        icon={renderIcon(option.iconName)}
                        isSelected={selectedOption === option.id}
                        onClick={handleOptionSelect}
                    />
                ))}
            </div>
        </div>
    );
};
