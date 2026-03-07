import React, { useState } from 'react';
import { LessonHeader } from '../Components/LessonFlow/LessonHeader';
import { ProgressBar } from '../Components/LessonFlow/ProgressBar';
import { LessonFooter } from '../Components/LessonFlow/LessonFooter';
import { TranslationLesson } from '../Components/LessonFlow/TranslationLesson';
import { AudioImageLesson } from '../Components/LessonFlow/AudioImageLesson';
import { CompleteWordLesson } from '../Components/LessonFlow/CompleteWordLesson';
import mockLessonsData from '../data/mockLessons.json';
import type { LessonData } from '../types/lesson';

import { useNavigate } from 'react-router-dom';

const mockLessons = mockLessonsData as LessonData[];

export const LessonFlow: React.FC = () => {
    const navigate = useNavigate();
    const [lessonIndex, setLessonIndex] = useState(0);
    const [canCheck, setCanCheck] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [checkStatus, setCheckStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    // Get the current lesson based on index
    const currentLessonData = mockLessons[lessonIndex];

    const handleSkip = () => {
        const nextIndex = lessonIndex + 1;
        if (nextIndex >= mockLessons.length) {
            navigate('/completed');
            return;
        }

        // Move to next lesson
        setLessonIndex(nextIndex);
        setCanCheck(false); // Reset check state on new lesson
        setSelectedValue(null);
        setCheckStatus('idle');
    };

    const handleCheck = () => {
        // Si ya hay un estado (Correcto/Incorrecto), el botón actúa como Continuar
        if (checkStatus !== 'idle') {
            handleSkip();
            return;
        }

        if (!canCheck) return;

        let isCorrect = false;

        if (currentLessonData.type === 'translation' || currentLessonData.type === 'audioImage') {
            isCorrect = selectedValue === currentLessonData.correctOptionId;
        } else if (currentLessonData.type === 'completeWord') {
            isCorrect = selectedValue?.toUpperCase() === currentLessonData.targetWord.toUpperCase();
        }

        setCheckStatus(isCorrect ? 'correct' : 'incorrect');
    };

    const handleOptionSelected = (value: string | null) => {
        setSelectedValue(value);
        setCanCheck(value !== null);
    };

    // Compute dynamic progress percentage (e.g. 0%, 33%, 66%)
    const progressPercentage = Math.round((lessonIndex / mockLessons.length) * 100);

    return (
        <div className="min-h-screen bg-[#E5E9F0] flex flex-col font-sans">
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col pb-24">
                {/* Header Section */}
                <LessonHeader />
                <ProgressBar title="SALUDOS Y CORTESÍA" percentage={progressPercentage} />

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col w-full">
                    {currentLessonData && currentLessonData.type === 'translation' && (
                        <TranslationLesson key={lessonIndex} data={currentLessonData} onOptionSelected={handleOptionSelected} />
                    )}
                    {currentLessonData && currentLessonData.type === 'audioImage' && (
                        <AudioImageLesson key={lessonIndex} data={currentLessonData} onOptionSelected={handleOptionSelected} />
                    )}
                    {currentLessonData && currentLessonData.type === 'completeWord' && (
                        <CompleteWordLesson key={lessonIndex} data={currentLessonData} onOptionSelected={handleOptionSelected} />
                    )}
                </main>
            </div>


            {/* Footer */}
            <LessonFooter
                onSkip={handleSkip}
                onCheck={handleCheck}
                isCheckDisabled={!canCheck}
                status={checkStatus}
            />
        </div>
    );
};
