import React, { useState, useRef, useEffect } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import type { CompleteWordLessonData } from '../../types/lesson';

interface CompleteWordLessonProps {
    data: CompleteWordLessonData;
    onOptionSelected: (value: string | null) => void;
}

export const CompleteWordLesson: React.FC<CompleteWordLessonProps> = ({ data, onOptionSelected }) => {
    // Determine how many characters are missing
    const initialLetter = data.targetWord.substring(0, data.visibleCharacters);
    const missingLettersCount = data.targetWord.length - data.visibleCharacters;

    // Initialize letters based on new data if it changes
    const [letters, setLetters] = useState<string[]>(Array(missingLettersCount).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        setLetters(Array(data.targetWord.length - data.visibleCharacters).fill(''));
        inputRefs.current = [];
    }, [data.targetWord, data.visibleCharacters]);

    const handlePlayAudio = () => {
        console.log("Play audio clicked");
        // Implementar reproducción de audio aquí
    };

    const handleChange = (index: number, value: string) => {
        // Tomar solo el último caracter ingresado
        const char = value.slice(-1).toUpperCase();

        const newLetters = [...letters];
        newLetters[index] = char;
        setLetters(newLetters);

        // Notificar al padre para habilitar el botón "Comprobar" si todas las letras están llenas
        const isComplete = newLetters.every(l => l !== '');
        if (isComplete) {
            onOptionSelected(initialLetter + newLetters.join(''));
        } else {
            onOptionSelected(null);
        }

        // Mover el foco al siguiente input si se ingresó un caracter
        if (char && index < missingLettersCount - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Regresar al input anterior al presionar Backspace si el actual está vacío
        if (e.key === 'Backspace' && !letters[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-start px-4 w-full mt-4 mb-20 gap-8">
            {/* Imagen del perro */}
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-sm">
                <img
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500" // Golden retriever placeholder
                    alt="Animal"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Botón de Audio Naranja */}
            <button
                onClick={handlePlayAudio}
                className="flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-[0_4px_0_0_#B45309] hover:translate-y-1 hover:shadow-none"
            >
                <VolumeUpIcon fontSize="small" /> Escucha la palabra
            </button>

            {/* Separador y Sección de completar */}
            <div className="w-full max-w-xl border-t border-gray-100 pt-10 mt-2 flex flex-col items-center bg-white rounded-3xl pb-8 shadow-sm">
                <p className="text-xs font-extrabold tracking-widest text-slate-400 mb-8 uppercase">
                    Completa la palabra
                </p>

                <div className="flex items-center gap-2 md:gap-3">
                    {/* Letra inicial fija */}
                    <span className="text-4xl md:text-5xl font-extrabold text-[#164e2e] mr-2 md:mr-4">
                        {initialLetter}
                    </span>

                    {/* Inputs de letras faltantes */}
                    {letters.map((letter, index) => (
                        <div key={index} className="relative">
                            <input
                                ref={el => { inputRefs.current[index] = el; }}
                                type="text"
                                value={letter}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`
                                    w-10 h-14 md:w-14 md:h-16 text-center text-2xl md:text-3xl font-bold bg-white rounded-lg
                                    border-b-[3px] focus:outline-none transition-all
                                    ${letter ? 'border-b-[#164e2e] text-slate-800' : 'border-b-gray-300'}
                                    focus:border-b-[#F59E0B] focus:bg-orange-50/30
                                `}
                            />
                            {/* Cursor personalizado de flecha hacia abajo si está enfocado y vacío (simulado) */}
                            {/* CSS adicional podría requerirse para hacer un diseño pixel perfect al placeholder */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
