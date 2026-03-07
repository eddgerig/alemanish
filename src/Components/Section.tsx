import React from 'react';

interface SectionProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, subtitle, icon }) => {
    return (
        <div className="relative flex flex-col items-center mt-12 mb-32 z-10 w-full">

            {/* Diamond Shaped Node Container */}
            <div className="relative w-24 h-24 mb-6 cursor-pointer transform hover:-translate-y-1 transition-transform group">
                {/* Diamond Node */}
                <div
                    className="absolute inset-0 bg-green-700 rounded-3xl shadow-[0_6px_0_0_#166534] flex items-center justify-center border-4 border-white border-opacity-25"
                    style={{ transform: 'rotate(45deg)' }}
                >
                    <div style={{ transform: 'rotate(-45deg)' }} className="text-white scale-125">
                        {icon}
                    </div>
                </div>
            </div>

            {/* Section Title and Subtitle */}
            <div className="text-center mt-4 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-sm border border-gray-100 max-w-xs transition-colors">
                <h2 className="text-sm font-extrabold text-green-700 tracking-wider uppercase mb-1 drop-shadow-sm">
                    {title}
                </h2>
                <p className="text-xs font-semibold text-gray-500">
                    {subtitle}
                </p>
            </div>

        </div>
    );
};
