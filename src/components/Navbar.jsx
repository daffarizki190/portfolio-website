import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, CONTACT_INFO, APP_CONFIG } from '../constants';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const [visible, setVisible] = useState(false);
    const [time, setTime] = useState(new Date());

    const navItems = useMemo(() => NAV_ITEMS, []);
    const initials = APP_CONFIG.name.split(' ').map(w => w[0]).join('').slice(0, 2);

    useEffect(() => {
        const tick = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(tick);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Show dark navbar only after scrolling past the hero section
            const homeSection = document.querySelector('#Home');
            const homeHeight = homeSection ? homeSection.offsetHeight : window.innerHeight;
            setVisible(window.scrollY > homeHeight - 80);

            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section instanceof HTMLElement) {
                    return { id: item.href.replace("#", ""), offset: section.offsetTop - 100, height: section.offsetHeight };
                }
                return null;
            }).filter(Boolean);

            let currentActive = "Home";
            for (const section of sections) {
                if (window.scrollY >= section.offset && window.scrollY < section.offset + section.height) {
                    currentActive = section.id;
                    break;
                }
            }
            setActiveSection(currentActive);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [navItems]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section instanceof HTMLElement) {
            window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    const formatTime = d => d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const year = new Date().getFullYear();

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="fixed w-full top-0 z-50 bg-deep-black/95 backdrop-blur-md border-b border-off-white/5"
                >
                    <div className="px-8 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <a href="#Home" onClick={e => scrollToSection(e, '#Home')}
                                className="text-xl font-display font-black text-off-white uppercase">
                                {initials}
                            </a>

                            {/* Desktop left links */}
                            <div className="hidden md:flex items-center gap-2 mx-auto">
                                {navItems.map(item => (
                                    <a key={item.label} href={item.href} onClick={e => scrollToSection(e, item.href)}
                                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${activeSection === item.href.substring(1) ? 'text-lime-accent' : 'text-off-white/40 hover:text-off-white'
                                            }`}>
                                        {item.label}
                                    </a>
                                ))}
                            </div>

                            {/* Right — time info */}
                            <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-off-white/20">
                                <span className="font-mono">{formatTime(time)}</span>
                                <span>—</span>
                                <span>{year} © Edition</span>
                            </div>

                            {/* Mobile hamburger */}
                            <div className="md:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-off-white">
                                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-deep-black border-t border-off-white/5 overflow-hidden"
                            >
                                <div className="flex flex-col p-6 gap-6">
                                    {navItems.map((item, i) => (
                                        <motion.a key={item.label} href={item.href}
                                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.07 }}
                                            onClick={e => scrollToSection(e, item.href)}
                                            className={`text-4xl font-display font-black uppercase tracking-tighter ${activeSection === item.href.substring(1) ? 'text-lime-accent' : 'text-off-white/40'
                                                }`}>
                                            {item.label}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
