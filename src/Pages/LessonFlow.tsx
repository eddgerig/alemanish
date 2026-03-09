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
import { useUser } from '../context/UserContext';

const modulesArray = mockLessonsData as LessonModule[];

export const LessonFlow: React.FC = () => {
    const navigate = useNavigate();
    const { moduleId } = useParams<{ moduleId: string }>();
    const { addFresas } = useUser();

    // Load dynamic module from URL
    const currentModule = modulesArray.find(m => m.moduleId === moduleId) || modulesArray[0];
    const moduleLessons = currentModule.lessons;
    const [lessonIndex, setLessonIndex] = useState(0);
    const [canCheck, setCanCheck] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [checkStatus, setCheckStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    // Get the current lesson based on index
    const currentLessonData = moduleLessons[lessonIndex];

    const handleSkip = () => {
        const nextIndex = lessonIndex + 1;
        if (nextIndex >= moduleLessons.length) {
            // Check dynamic unlocking conditions
            const currentModuleIndex = modulesArray.findIndex(m => m.moduleId === currentModule.moduleId);
            let unlockedModuleTitle = '';

            if (currentModuleIndex >= 0 && currentModuleIndex < modulesArray.length - 1) {
                const nextModule = modulesArray[currentModuleIndex + 1];

                // Only mark as unlocked if it isn't already
                if (localStorage.getItem(`unlocked_${nextModule.moduleId}`) !== 'true') {
                    localStorage.setItem(`unlocked_${nextModule.moduleId}`, 'true');
                    unlockedModuleTitle = nextModule.title;
                }
            }

            const calculatedFresas = (correctCount * 20) - (incorrectCount * 10);
            const totalFresas = Math.max(0, calculatedFresas);

            // Add earned fresas to global state
            if (totalFresas > 0) {
                addFresas(totalFresas);
            }

            navigate('/completed', { state: { unlockedModuleTitle, correctCount, incorrectCount, moduleId: currentModule.moduleId } });
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

        if (isCorrect) {
            try {
                new Audio('/audios/correct.mp3').play();
            } catch (e) {
                console.error('Audio error:', e);
            }
            setCheckStatus('correct');
            setCorrectCount(prev => prev + 1);
        } else {
            try {
                new Audio('/audios/incorrect.mp3').play();
            } catch (e) {
                console.error('Audio error:', e);
            }
            setCheckStatus('incorrect');
            setIncorrectCount(prev => prev + 1);
        }
    };

    const handleOptionSelected = (value: string | null) => {
        setSelectedValue(value);
        setCanCheck(value !== null);
    };

    // Compute dynamic progress percentage (e.g. 0%, 33%, 66%)
    const progressPercentage = Math.round((lessonIndex / moduleLessons.length) * 100);

    return (
        <div className="min-h-screen bg-black flex flex-col font-sans relative overflow-x-hidden">
            {/* Background Image Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden">
                <img
                    src="/ColoniaTovar_Background.jpg"
                    alt="Background Colonia Tovar"
                    className="w-full h-full object-cover opacity-70 blur-sm scale-105"
                />
            </div>
            {/* Overlay Gradient to ensure text readability */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/20 via-black/40 to-black/95"></div>

            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col pb-24 z-10 relative">
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
