import React, { useState, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { APP_CONFIG, NAV_ITEMS } from '../constants';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    const navItems = useMemo(() => NAV_ITEMS, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section instanceof HTMLElement) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 550,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            
            let currentActiveSection = "Home";
            for (const section of sections) {
                if (currentPosition >= section.offset && currentPosition < section.offset + section.height) {
                    currentActiveSection = section.id;
                    break;
                }
            }
            setActiveSection(currentActiveSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navItems]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section instanceof HTMLElement) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-slate-900/90 opacity-100"
                    : scrolled
                    ? "bg-slate-900/70 backdrop-blur-xl"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                        >
                            {APP_CONFIG.name}
                        </a>
                    </div>
    
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className="group relative px-1 py-2 text-sm font-medium"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-semibold"
                                                : "text-gray-300 group-hover:text-purple-400"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
    
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-gray-300 hover:text-white transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
    
            <div
                className={`md:hidden h-screen fixed inset-0 bg-slate-900 transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-[-100%] pointer-events-none"
                }`}
                style={{ top: "64px" }}
            >
                <div className="flex flex-col h-full">
                    <div className="px-4 py-6 space-y-4 flex-1 overflow-y-auto">
                        {navItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${
                                    activeSection === item.href.substring(1)
                                        ? "bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-semibold"
                                        : "text-gray-300 hover:text-white"
                                }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                    opacity: isOpen ? 1 : 0,
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;