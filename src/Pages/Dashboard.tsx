import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@Components/Header';
import { Category } from '@Components/Category';
import { Section } from '@Components/Section';

// MUI Icons
import HandshakeIcon from '@mui/icons-material/Handshake';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#E5E9F0] flex flex-col items-center pb-24 relative overflow-x-hidden">
            {/* Header component */}
            <Header />

            {/* Main Path Container */}
            <main className="w-full max-w-lg mt-8 flex flex-col items-center relative flex-1 px-4">

                {/* Background Vertical Line */}
                <div className="absolute top-0 bottom-0 w-4 bg-green-900 bg-opacity-10 rounded-full inset-x-0 mx-auto z-0" style={{ height: 'calc(100% - 120px)' }}></div>

                {/* Nodes */}
                {/* Node 1: Current */}
                <Category
                    title="SALUDOS Y CORTESÍA"
                    icon={<HandshakeIcon fontSize="large" />}
                    status="current"
                    badge="1"
                    offsetX={0}
                    onClick={() => navigate('/lesson')}
                />

                {/* Node 2: Locked (shifted right) */}
                <Category
                    title="LA FAMILIA"
                    icon={<FamilyRestroomIcon fontSize="large" />}
                    status="locked"
                    offsetX={35}
                />

                {/* Node 3: Locked (shifted left) */}
                <Category
                    title="EL HOGAR"
                    icon={<HomeIcon fontSize="large" />}
                    status="locked"
                    offsetX={-40}
                />

                {/* Node 4: Locked (centered) */}
                <Category
                    title="ANIMALES"
                    icon={<PetsIcon fontSize="large" />}
                    status="locked"
                    offsetX={0}
                />

                {/* Node 5: Locked (shifted right) */}
                <Category
                    title="COMIDA"
                    icon={<RestaurantIcon fontSize="large" />}
                    status="locked"
                    offsetX={30}
                />

                {/* Section Diamond Node at the bottom */}
                <Section
                    title="SECCIÓN 1: EL BOSQUE"
                    subtitle="Completa todos los niveles para avanzar"
                    icon={<EmojiEventsIcon fontSize="large" className="text-orange-400 drop-shadow-md" />}
                />

            </main>

            {/* Floating Bottom Button */}
            <div className="fixed bottom-0 w-full bg-[#f4f6f8] border-t-2 border-gray-200 p-4 flex justify-center z-50">
                <button className="w-full max-w-sm bg-green-700 hover:bg-green-600 active:bg-green-800 text-white font-extrabold py-4 px-6 rounded-2xl shadow-[0_5px_0_0_#166534] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center uppercase tracking-wide text-lg">
                    <PlayArrowIcon className="mr-2" />
                    Continuar aprendiendo
                </button>
            </div>

        </div>
    );
};
