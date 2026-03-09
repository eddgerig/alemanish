import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Confetti from 'react-confetti';

export const LessonCompleted: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const unlockedModuleTitle = location.state?.unlockedModuleTitle;
    const correctCount = location.state?.correctCount || 0;
    const incorrectCount = location.state?.incorrectCount || 0;

    const calculatedFresas = (correctCount * 20) - (incorrectCount * 10);
    const totalFresas = Math.max(0, calculatedFresas);
    const displayFresas = totalFresas > 0 ? `+${totalFresas}` : "0";

    // Track window dimensions for the confetti
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);

        // Play tada sound
        try {
            new Audio('/audios/tada.mp3').play();
        } catch (e) {
            console.error('Failed to play tada audio:', e);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

            <Confetti
                width={dimensions.width}
                height={dimensions.height}
                recycle={false}
                numberOfPieces={300}
                gravity={0.15}
            />

            {/* Background elements simulating confetti/glow could go here */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-400 opacity-10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-xl mx-auto w-full flex-1 flex flex-col items-center justify-center p-6 z-10 relative">

                {/* Trophy Illustration */}
                <div className="relative mb-10 w-48 h-48 md:w-56 md:h-56">
                    {/* Floating confetti dots */}
                    <div className="absolute -top-4 -left-4 w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="absolute top-10 -right-6 w-4 h-2 bg-red-400 rotate-45"></div>
                    <div className="absolute bottom-10 -left-8 w-2 h-2 rounded-full bg-orange-400"></div>

                    <div className="w-full h-full overflow-hidden flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                        <img
                            src="/Trofeo2.png"
                            alt="Alemanish Trophy"
                            className="max-w-full max-h-full object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 text-center drop-shadow-sm">
                    ¡Nivel Completado!
                </h1>
                <p className="text-white/70 font-semibold mb-10 text-center">
                    Has alcanzado un nuevo hito en tu aprendizaje de Alemán Coloniero.
                </p>

                {/* Stats Grid */}
                <div className="flex flex-col md:flex-row justify-center w-full gap-4 mb-10 text-center">
                    {/* Fresas Totales */}
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center shadow-[0_4px_0_0_rgba(255,255,255,0.1)] border border-white/20 flex-1 min-w-[140px]">
                        <p className="text-[10px] md:text-xs font-bold text-white/70 tracking-widest uppercase mb-2">
                            Fresas Totales
                        </p>
                        <div className={`flex items-center font-extrabold text-2xl md:text-3xl ${totalFresas > 0 ? 'text-green-400' : 'text-white/50'}`}>
                            <span role="img" aria-label="Strawberry" className="text-3xl mr-2 drop-shadow-sm">🍓</span>
                            {displayFresas}
                        </div>
                    </div>

                    {/* Palabras correctas */}
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center shadow-[0_4px_0_0_rgba(255,255,255,0.1)] border border-white/20 flex-1 min-w-[140px]">
                        <p className="text-[10px] md:text-xs font-bold text-white/70 tracking-widest uppercase mb-2">
                            Palabras Correctas ({correctCount})
                        </p>
                        <div className="text-green-400 font-extrabold text-lg md:text-xl">
                            +{correctCount * 20} fresas
                        </div>
                    </div>

                    {/* Palabras incorrectas */}
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center shadow-[0_4px_0_0_rgba(255,255,255,0.1)] border border-white/20 flex-1 min-w-[140px]">
                        <p className="text-[10px] md:text-xs font-bold text-white/70 tracking-widest uppercase mb-2">
                            Palabras Incorrectas ({incorrectCount})
                        </p>
                        <div className="text-red-400 font-extrabold text-lg md:text-xl">
                            -{incorrectCount * 10} fresas
                        </div>
                    </div>
                </div>

                {/* Unlocked Next Level Card */}
                {unlockedModuleTitle && correctCount > 0 && (
                    <div className="w-full bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_0_0_rgba(16,185,129,0.3)] border border-emerald-500/50 mb-12 text-center transform hover:scale-105 transition-transform">
                        <p className="text-[10px] md:text-xs font-bold text-white/70 tracking-widest uppercase mb-2">
                            ¡Siguiente nivel desbloqueado!
                        </p>
                        <h3 className="text-xl md:text-2xl font-extrabold text-emerald-400 drop-shadow-sm">
                            {unlockedModuleTitle}
                        </h3>
                    </div>
                )}

                {/* Continue Action */}
                {correctCount === 0 ? (
                    <button
                        onClick={() => location.state?.moduleId ? navigate(`/lesson/${location.state.moduleId}`) : navigate('/')}
                        className="w-full md:w-auto min-w-[280px] bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold py-4 px-8 rounded-xl shadow-[0_5px_0_0_#9a3412] active:shadow-none active:translate-y-1 transition-all flex justify-center items-center text-lg tracking-wide uppercase"
                    >
                        Volver a intentar
                    </button>
                ) : (
                    <button
                        onClick={() => navigate('/')}
                        className="w-full md:w-auto min-w-[280px] bg-[#166534] hover:bg-green-700 active:bg-green-800 text-white font-extrabold py-4 px-8 rounded-xl shadow-[0_5px_0_0_#14532d] active:shadow-none active:translate-y-1 transition-all flex justify-center items-center text-lg tracking-wide uppercase"
                    >
                        Continuar
                        <ArrowForwardIcon className="ml-2" />
                    </button>
                )}
            </div>

            {/* Footer Copyright */}
            <div className="w-full text-center p-6 text-[10px] text-white/40 font-medium z-10 relative">
                © 2024 Alemanish Language Learning. Todos los derechos reservados.
            </div>
        </div>
    );
};
