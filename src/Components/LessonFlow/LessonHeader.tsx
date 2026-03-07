import React from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export const LessonHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="w-full flex items-center justify-between py-4 px-6 mb-2">
            {/* Left side: Logo Placeholder and Alemanish text */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-sm bg-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden">
                    <span role="img" aria-label="Pretzel" className="drop-shadow-sm">🥨</span>
                </div>
                <h1 className="text-xl font-extrabold text-green-800 tracking-tight">Alemanish</h1>
            </div>

            {/* Right side: Close and Avatar */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                    aria-label="Cerrar lección"
                >
                    <CloseIcon fontSize="small" />
                </button>
                <div className="w-8 h-8 rounded-full border-2 border-green-600 bg-orange-50 overflow-hidden flex items-center justify-center">
                    <span role="img" aria-label="Avatar" className="text-xl opacity-80">👶</span>
                </div>
            </div>
        </header>
    );
};
