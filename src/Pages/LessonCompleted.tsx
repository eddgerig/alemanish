import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Confetti from 'react-confetti';

export const LessonCompleted: React.FC = () => {
    const navigate = useNavigate();

    // Track window dimensions for the confetti
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] flex flex-col font-sans relative overflow-hidden">
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
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 text-center">
                    ¡Nivel Completado!
                </h1>
                <p className="text-slate-500 font-semibold mb-10 text-center">
                    Has alcanzado un nuevo hito en tu aprendizaje de Alemán Coloniero.
                </p>

                {/* Stats Grid */}
                <div className="flex justify-center w-full mb-10">
                    <div className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm border border-gray-100 min-w-[220px]">
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
                            Fresas Recolectadas
                        </p>
                        <div className="flex items-center text-red-500 font-extrabold text-2xl md:text-3xl">
                            <span role="img" aria-label="Strawberry" className="text-3xl mr-2 drop-shadow-sm">🍓</span>
                            +50
                        </div>
                    </div>
                </div>



                {/* Continue Action */}
                <button
                    onClick={() => navigate('/')}
                    className="w-full md:w-auto min-w-[280px] bg-[#166534] hover:bg-green-700 active:bg-green-800 text-white font-extrabold py-4 px-8 rounded-xl shadow-[0_5px_0_0_#14532d] active:shadow-none active:translate-y-1 transition-all flex justify-center items-center text-lg tracking-wide uppercase"
                >
                    Continuar
                    <ArrowForwardIcon className="ml-2" />
                </button>
            </div>

            {/* Footer Copyright */}
            <div className="w-full text-center p-6 text-[10px] text-slate-400 font-medium">
                © 2024 Alemanish Language Learning. Todos los derechos reservados.
            </div>
        </div>
    );
};
