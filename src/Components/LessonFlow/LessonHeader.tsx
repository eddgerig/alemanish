import React from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export const LessonHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="w-full flex items-center justify-between py-4 px-6 mb-2">
            {/* Left side: Logo Placeholder and Alemanish text */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-7 rounded-sm border border-white/20 flex items-center justify-center shadow-sm overflow-hidden">
                    <img src="/bandera.svg" alt="Alemanish Flag" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-xl font-extrabold text-white tracking-tight">Alemanish</h1>
            </div>

            {/* Right side: Close and Avatar */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="text-white/70 hover:text-white transition-colors p-1"
                    aria-label="Cerrar lección"
                >
                    <CloseIcon fontSize="small" />
                </button>
                {/* Avatar (Hidden for now) */}
                {/* 
                <div className="w-8 h-8 rounded-full border-2 border-green-600 bg-orange-50 overflow-hidden flex items-center justify-center">
                    <span role="img" aria-label="Avatar" className="text-xl opacity-80">👶</span>
                </div> 
                */}
            </div>
        </header>
    );
};
