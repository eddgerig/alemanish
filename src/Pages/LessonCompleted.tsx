import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FlagIcon from '@mui/icons-material/Flag';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const LessonCompleted: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] flex flex-col font-sans relative overflow-hidden">
            {/* Background elements simulating confetti/glow could go here */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-400 opacity-10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-xl mx-auto w-full flex-1 flex flex-col items-center justify-center p-6 z-10 relative">

                {/* Trophy Illustration */}
                <div className="relative mb-10 w-48 h-48 md:w-56 md:h-56">
                    {/* Floating confetti dots */}
                    <div className="absolute -top-4 -left-4 w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="absolute top-10 -right-6 w-4 h-2 bg-red-400 rotate-45"></div>
                    <div className="absolute bottom-10 -left-8 w-2 h-2 rounded-full bg-orange-400"></div>

                    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rotate-3">
                        <img
                            src="https://images.unsplash.com/photo-1563505391550-14227c4fbbe1?auto=format&fit=crop&q=80&w=400"
                            alt="Trophy"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 text-center">
                    ¡Nivel Completado!
                </h1>
                <p className="text-slate-500 font-semibold mb-10 text-center">
                    Has alcanzado un nuevo hito en tu aprendizaje de alemán.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 w-full mb-10">
                    <div className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm border border-gray-100">
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
                            Experiencia Ganada
                        </p>
                        <div className="flex items-center text-[#F59E0B] font-extrabold text-2xl md:text-3xl">
                            <BoltIcon fontSize="inherit" className="mr-1" />
                            +50 XP
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center shadow-sm border border-gray-100">
                        <p className="text-[10px] md:text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
                            Racha Actual
                        </p>
                        <div className="flex items-center text-[#F97316] font-extrabold text-2xl md:text-3xl">
                            <LocalFireDepartmentIcon fontSize="inherit" className="mr-1" />
                            7 Días
                        </div>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-12">
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">
                        Progreso del Nivel
                    </p>
                    <div className="flex justify-between items-end mb-3">
                        <span className="text-sm md:text-base font-extrabold text-slate-800">
                            Nivel B1.1
                        </span>
                        <span className="font-extrabold text-emerald-600 text-lg">
                            75%
                        </span>
                    </div>

                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>

                    <div className="flex items-center justify-center text-slate-400 text-xs font-semibold">
                        <FlagIcon fontSize="small" className="mr-1 opacity-70" />
                        Siguiente objetivo: B1.2
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
