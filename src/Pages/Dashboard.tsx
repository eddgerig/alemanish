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

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    // Fetch unlocked status from localStorage
    const isFamiliaUnlocked = localStorage.getItem('unlocked_familia') === 'true';

    // Status logic
    const saludosStatus = isFamiliaUnlocked ? 'completed' : 'current';
    const familiaStatus = isFamiliaUnlocked ? 'current' : 'locked';

    return (
        <div className="min-h-screen bg-[#E5E9F0] flex flex-col items-center pb-24 relative overflow-x-hidden">

            {/* Background Image Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img
                    src="/ColoniaTovar_Background.jpg"
                    alt="Background Colonia Tovar"
                    className="w-full h-full object-cover opacity-80"
                />
            </div>
            {/* Overlay Gradient to ensure text readability */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-white/0 to-[#E5E9F0]/60"></div>

            {/* Header component */}
            <div className="w-full z-50 fixed top-0 left-0">
                <Header />
            </div>

            {/* Main Path Container */}
            <main className="w-full max-w-lg mt-24 flex flex-col items-center relative flex-1 px-4 z-10">

                {/* Background Vertical Line */}
                <div className="absolute top-0 bottom-0 w-4 bg-green-900 bg-opacity-10 rounded-full inset-x-0 mx-auto -z-10" style={{ height: 'calc(100% - 120px)' }}></div>

                {/* Nodes */}
                {/* Node 1: Current / Completed */}
                <Category
                    title="SALUDOS Y CORTESÍA"
                    icon={<HandshakeIcon fontSize="large" />}
                    status={saludosStatus}
                    offsetX={0}
                    onClick={() => navigate('/lesson/saludos')}
                />

                {/* Node 2: Locked / Current (shifted right) */}
                <Category
                    title="LA FAMILIA"
                    icon={<FamilyRestroomIcon fontSize="large" />}
                    status={familiaStatus}
                    offsetX={35}
                    onClick={() => isFamiliaUnlocked && navigate('/lesson/familia')}
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

        </div>
    );
};
