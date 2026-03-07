import React, { useState } from 'react';
import { LessonHeader } from '../Components/LessonFlow/LessonHeader';
import { ProgressBar } from '../Components/LessonFlow/ProgressBar';
import { LessonFooter } from '../Components/LessonFlow/LessonFooter';
import { TranslationLesson } from '../Components/LessonFlow/TranslationLesson';
import { AudioImageLesson } from '../Components/LessonFlow/AudioImageLesson';
import { CompleteWordLesson } from '../Components/LessonFlow/CompleteWordLesson';
import mockLessonsData from '../data/mockLessons.json';
import type { LessonModule } from '../types/lesson';
import { useNavigate, useParams } from 'react-router-dom';

const modulesArray = mockLessonsData as LessonModule[];

export const LessonFlow: React.FC = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams<{ moduleId: string }>();

    // Load dynamic module from URL
    const currentModule = modulesArray.find(m => m.moduleId === moduleId) || modulesArray[0];
    const moduleLessons = currentModule.lessons;
    const [lessonIndex, setLessonIndex] = useState(0);
    const [canCheck, setCanCheck] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [checkStatus, setCheckStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    // Get the current lesson based on index
    const currentLessonData = moduleLessons[lessonIndex];

    const handleSkip = () => {
        const nextIndex = lessonIndex + 1;
        if (nextIndex >= moduleLessons.length) {
            // Check unlocking conditions
            if (currentModule.moduleId === 'saludos') {
                localStorage.setItem('unlocked_familia', 'true');
            }

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
    const progressPercentage = Math.round((lessonIndex / moduleLessons.length) * 100);

    return (
        <div className="min-h-screen bg-[#E5E9F0] flex flex-col font-sans">
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col pb-24">
                {/* Header Section */}
                <LessonHeader />
                <ProgressBar title={currentModule.title} percentage={progressPercentage} />

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
