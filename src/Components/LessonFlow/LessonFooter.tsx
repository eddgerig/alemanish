import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface LessonFooterProps {
    onSkip: () => void;
    onCheck: () => void;
    isCheckDisabled: boolean;
    status: 'idle' | 'correct' | 'incorrect';
}

export const LessonFooter: React.FC<LessonFooterProps> = ({ onSkip, onCheck, isCheckDisabled, status }) => {
    const isCorrect = status === 'correct';
    const isIncorrect = status === 'incorrect';
    const isIdle = status === 'idle';

    // Dynamic classes
    const wrapperBg = isCorrect ? 'bg-green-100 border-green-200' : isIncorrect ? 'bg-red-100 border-red-200' : 'bg-white border-gray-200';

    const btnText = isCorrect ? 'Continuar' : isIncorrect ? 'Entendido' : 'Comprobar';
    const btnColor = isCorrect
        ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_5px_0_0_#16a34a]'
        : isIncorrect
            ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_5px_0_0_#dc2626]'
            : 'bg-green-700 hover:bg-green-600 active:bg-green-800 text-white shadow-[0_5px_0_0_#166534] active:shadow-none active:translate-y-1';

    return (
        <div className={`fixed bottom-0 w-full border-t-2 p-6 flex flex-col justify-center items-center z-50 transition-colors duration-300 ${wrapperBg}`}>
            <div className="max-w-4xl w-full flex justify-between items-center px-4 relative">

                {/* Result Message Area (Left side) */}
                <div className={`flex items-center gap-4 transition-all duration-500 transform ${isIdle ? 'translate-y-10 opacity-0 absolute' : 'translate-y-0 opacity-100 relative'}`}>
                    {isCorrect && (
                        <>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm">
                                <CheckCircleOutlineIcon fontSize="large" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-green-700 drop-shadow-sm">¡Correcto!</h3>
                        </>
                    )}
                    {isIncorrect && (
                        <>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 shadow-sm">
                                <CancelOutlinedIcon fontSize="large" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-red-700 drop-shadow-sm">Respuesta incorrecta</h3>
                        </>
                    )}
                </div>

                {/* Skip Button (Only visible in idle) */}
                {isIdle && (
                    <button
                        onClick={onSkip}
                        className="text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest text-sm"
                    >
                        Saltar
                    </button>
                )}

                {/* Main Action Button */}
                <button
                    onClick={onCheck}
                    disabled={isCheckDisabled && isIdle} // Allow clicking continue/ entendido even if initially disabled Check
                    className={`
                        font-extrabold py-3 px-10 rounded-2xl uppercase tracking-wide text-lg transition-all ml-auto
                        ${(isCheckDisabled && isIdle)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                            : btnColor
                        }
                    `}
                >
                    {btnText}
                </button>
            </div>
        </div>
    );
};
