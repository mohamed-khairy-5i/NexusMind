import React from 'react';

const Footer: React.FC<{ currentRoute: string }> = ({ currentRoute }) => {

    const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
        const isActive = currentRoute === href;
        return (
             <a href={href} className={isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white transition-colors"}>
                {children}
            </a>
        );
    };

    return (
        <footer className="bg-gray-900/70 border-t border-gray-700/50">
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-bold text-white">NexusMind</h3>
                        <p className="text-gray-400 text-sm">Visualize your ideas with the power of AI.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                        <div className="flex gap-6">
                            <FooterLink href="#/">Home</FooterLink>
                            <FooterLink href="#/features">Features</FooterLink>
                            <FooterLink href="#/app">Generator</FooterLink>
                        </div>
                        <p className="text-gray-500 text-sm mt-4 sm:mt-0">&copy; {new Date().getFullYear()} NexusMind. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;