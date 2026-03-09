import React, { useState } from 'react';
import { ImageOptionCard } from './ImageOptionCard';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import type { AudioImageLessonData } from '../../types/lesson';

interface AudioImageLessonProps {
    data: AudioImageLessonData;
    onOptionSelected: (value: string | null) => void;
}

export const AudioImageLesson: React.FC<AudioImageLessonProps> = ({ data, onOptionSelected }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (id: string) => {
        setSelectedOption(id);
        onOptionSelected(id);
    };

    const handlePlayAudio = () => {
        try {
            new Audio(data.audioUrl).play();
        } catch (e) {
            console.error('Failed to play audio:', e);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start px-4 w-full mt-10 mb-20 gap-8">
            {/* Instruction Title */}
            <h2 className="text-2xl font-extrabold text-white text-center drop-shadow-sm">
                {data.instruction}
            </h2>

            {/* Audio Play Button */}
            <div className="flex flex-col items-center gap-2">
                <button
                    onClick={handlePlayAudio}
                    className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-[0_4px_0_0_#065f46] hover:translate-y-1 hover:shadow-none"
                >
                    <VolumeUpIcon /> Reproducir Audio
                </button>

            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl justify-items-center mt-4">
                {data.options.map((option) => (
                    <ImageOptionCard
                        key={option.id}
                        id={option.id}
                        title={option.title}
                        imageSrc={option.imageUrl}
                        isSelected={selectedOption === option.id}
                        onClick={handleOptionSelect}
                    />
                ))}
            </div>
        </div>
    );
};
