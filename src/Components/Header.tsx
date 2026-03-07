import React from 'react';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-gray-200 flex items-center justify-between px-6 md:px-12 py-3 shadow-sm">
            {/* Left side: Logo */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-7 rounded-sm border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                    <img src="/bandera.svg" alt="Alemanish Flag" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Alemanish</h1>
            </div>

            {/* Right side: Stats and Avatar */}
            <div className="flex items-center gap-4">
                {/* Strawberry Badge */}
                <div className="flex items-center bg-red-100 rounded-full px-3 py-1 text-red-600 font-bold border-2 border-transparent hover:bg-red-200 hover:border-red-300 transition-colors cursor-pointer">
                    <span role="img" aria-label="Strawberry" className="text-lg mr-1 drop-shadow-sm">🍓</span>
                    <span>150 Fresas</span>
                </div>

                {/* Level Badge */}
                <div className="flex items-center bg-red-100 rounded-full px-3 py-1 text-red-700 font-bold border-2 border-transparent hover:bg-red-200 hover:border-red-300 transition-colors cursor-pointer">
                    <WorkspacePremiumIcon fontSize="small" className="text-red-500 mr-1" />
                    <span>NIVEL 1</span>
                </div>

                {/* Avatar (Hidden for now) */}
                {/* 
                <div className="w-10 h-10 rounded-full border-2 border-gray-200 bg-orange-50 hover:bg-orange-100 cursor-pointer overflow-hidden flex items-center justify-center transition-colors">
                    <span role="img" aria-label="Avatar" className="text-2xl opacity-80">👶</span>
                </div> 
                */}
            </div>
        </header>
    );
};
