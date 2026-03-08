import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@Components/Header';
import { Category } from '@Components/Category';
import { Section } from '@Components/Section';
import mockLessonsData from '../data/mockLessons.json';
import type { LessonModule } from '../types/lesson';

// MUI Icons
import HandshakeIcon from '@mui/icons-material/Handshake';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const modulesArray = mockLessonsData as LessonModule[];

const getIconForModule = (moduleId: string) => {
    switch (moduleId) {
        case 'saludos': return <HandshakeIcon fontSize="large" />;
        case 'familia': return <FamilyRestroomIcon fontSize="large" />;
        case 'comida': return <RestaurantIcon fontSize="large" />;
        case 'otros': return <HomeIcon fontSize="large" />;
        case 'animales': return <PetsIcon fontSize="large" />;
        case 'colores': return <ColorLensIcon fontSize="large" />;
        default: return <EmojiEventsIcon fontSize="large" />;
    }
};

const getOffsetX = (index: number) => {
    // A nice alternating wave pattern for the tree nodes: [center, right, left, right, left, center]
    const offsets = [0, 35, -40, 30, -35, 0];
    return offsets[index % offsets.length];
};

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();

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

                {/* Nodes mapped dynamically from the JSON file */}
                {modulesArray.map((module, index) => {
                    // The first module in the array is always unlocked by default
                    const isUnlocked = index === 0 || localStorage.getItem(`unlocked_${module.moduleId}`) === 'true';
                    // Check if the SUBSEQUENT module is unlocked (if so, this current one is considered 'completed')
                    const isNextUnlocked = localStorage.getItem(`unlocked_${modulesArray[index + 1]?.moduleId}`) === 'true';

                    let status: "locked" | "current" | "completed" = "locked";
                    if (isUnlocked) {
                        status = isNextUnlocked ? "completed" : "current";
                    }

                    return (
                        <Category
                            key={module.moduleId}
                            title={module.title.toUpperCase()}
                            icon={getIconForModule(module.moduleId)}
                            status={status}
                            offsetX={getOffsetX(index)}
                            onClick={() => isUnlocked && navigate(`/lesson/${module.moduleId}`)}
                        />
                    );
                })}

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
