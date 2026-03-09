import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { APP_CONFIG, CONTACT_INFO } from '../constants';

const navLinks = [
    { name: 'Home', href: '#Home' },
    { name: 'About', href: '#About' },
    { name: 'Works', href: '#Portofolio' },
    { name: 'Contact', href: '#Contact' }
];

const MenuOverlay = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/60 backdrop-blur-sm"
                >
                    {/* Main Modal Container */}
                    <motion.div
                        initial={{ scale: 0.95, y: 50, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 50, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-5xl bg-[#1c1c1c] rounded-[2rem] sm:rounded-[3rem] p-8 md:p-12 lg:p-16 h-full max-h-[85vh] flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                    >
                        {/* Continuous Ambient Background Glows */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.15, 0.1],
                                x: [0, 50, -50, 0],
                                y: [0, -30, 30, 0]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-lime-accent/30 blur-[120px] pointer-events-none z-0"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.05, 0.1, 0.05],
                                x: [0, -40, 40, 0],
                                y: [0, 40, -40, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[100px] pointer-events-none z-0"
                        />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 md:top-10 md:right-10 text-off-white/50 hover:text-white transition-colors p-2"
                        >
                            <X size={24} strokeWidth={1.5} />
                        </button>

                        <div className="flex flex-col md:flex-row justify-between h-full pt-10 md:pt-4 gap-12 md:gap-8 relative z-10">
                            {/* Left Side: Navigation Links */}
                            <motion.div
                                initial="hidden" animate="visible" exit="hidden"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
                                }}
                                className="flex flex-col justify-center gap-6 md:gap-8"
                            >
                                {navLinks.map((link, i) => (
                                    <div key={link.name} className="overflow-hidden py-1">
                                        <motion.a
                                            href={link.href}
                                            onClick={onClose}
                                            variants={{
                                                hidden: { opacity: 0, y: "100%" },
                                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                                            }}
                                            className="group flex items-center justify-between text-4xl sm:text-5xl md:text-6xl font-display font-medium text-off-white hover:text-white transition-colors w-full"
                                        >
                                            <div className="relative overflow-hidden h-[1.2em]">
                                                <div className="flex flex-col transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-1/2">
                                                    <span className="h-[1.2em]">{link.name}</span>
                                                    <span className="h-[1.2em] italic text-lime-accent">{link.name}</span>
                                                </div>
                                            </div>
                                            <span className="text-xl md:text-2xl text-off-white/30 group-hover:text-lime-accent transition-colors duration-500 transform group-hover:rotate-90">
                                                +
                                            </span>
                                        </motion.a>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Right Side: Welcome Message & Media */}
                            <div className="flex flex-col items-start md:items-end justify-center max-w-sm mt-8 md:mt-0">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-left md:text-right mb-8"
                                >
                                    <p className="text-white text-sm md:text-base font-medium mb-2">
                                        👋 Nice to see you!
                                    </p>
                                    <p className="text-off-white/50 text-xs md:text-sm leading-relaxed">
                                        I'm {APP_CONFIG.name}, Software Engineer based in {CONTACT_INFO.location}.
                                    </p>
                                </motion.div>

                                {/* Decorative 3D Glass Sphere / Blob container */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="w-full aspect-video rounded-3xl bg-[#efefef] flex items-center justify-center overflow-hidden"
                                >
                                    {/* White Venom Component */}
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 0.95, 1], rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-32 h-32 relative"
                                    >
                                        <motion.div
                                            animate={{
                                                borderRadius: [
                                                    "45% 55% 70% 35% / 50% 30% 70% 50%",
                                                    "30% 70% 50% 50% / 70% 50% 30% 50%",
                                                    "60% 40% 30% 70% / 40% 60% 70% 30%",
                                                    "50% 50% 70% 30% / 30% 70% 50% 50%",
                                                    "45% 55% 70% 35% / 50% 30% 70% 50%"
                                                ],
                                                boxShadow: [
                                                    "inset -30px -30px 60px rgba(0,0,0,0.1), inset 30px 30px 60px rgba(255,255,255,1)",
                                                    "inset -40px -20px 80px rgba(0,0,0,0.05), inset 20px 40px 80px rgba(255,255,255,0.9)",
                                                    "inset -20px -40px 60px rgba(0,0,0,0.1), inset 40px 20px 60px rgba(255,255,255,1)",
                                                    "inset -30px -30px 60px rgba(0,0,0,0.08), inset 30px 30px 60px rgba(255,255,255,0.95)"
                                                ]
                                            }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                            className="w-full h-full absolute inset-0 overflow-hidden bg-gradient-to-br from-white via-[#f0f0f5] to-[#e0e0e8]"
                                        >
                                            <motion.div
                                                className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] border-[40px] border-white mix-blend-overlay opacity-80"
                                                animate={{
                                                    rotate: [0, 90, 270, 360],
                                                    scale: [1, 1.25, 0.75, 1.2, 1],
                                                    borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "50% 50% 20% 80%", "40% 60% 70% 30%"],
                                                    x: [-10, 15, -10, -10],
                                                    y: [-10, 15, -10, -10],
                                                }}
                                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                                style={{ filter: "blur(5px)" }}
                                            />
                                            <motion.div
                                                className="absolute inset-[5%] w-[90%] h-[90%] border-[35px] border-[#f4f4f4] mix-blend-normal opacity-60"
                                                animate={{
                                                    rotate: [360, 180, 45, 0],
                                                    scale: [0.8, 1.3, 0.7, 1.2, 0.8],
                                                    borderRadius: ["50% 50% 50% 50%", "30% 70% 70% 30%", "70% 30% 30% 70%", "50% 50% 50% 50%"],
                                                    x: [15, -10, 10, -10, 15],
                                                    y: [10, -15, 15, 10],
                                                }}
                                                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                                                style={{ filter: "blur(6px)" }}
                                            />
                                            <motion.div
                                                className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-white mix-blend-overlay opacity-90"
                                                animate={{
                                                    rotate: [0, -120, -240, -360],
                                                    x: [0, -40, 20, -25, 0],
                                                    y: [0, -30, -40, -20, 0],
                                                    scale: [1, 1.6, 0.6, 1.5, 1],
                                                    borderRadius: ["30% 70% 70% 30%", "60% 40% 40% 60%", "50% 50% 20% 80%", "30% 70% 70% 30%"]
                                                }}
                                                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                                                style={{ filter: "blur(8px)" }}
                                            />

                                            {/* Orbiting Edge Colors */}
                                            <motion.div
                                                className="absolute inset-[-50%] w-[200%] h-[200%] pointer-events-none opacity-100 z-10"
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                                                style={{
                                                    background: "conic-gradient(from 0deg, #ff003c, #0055ff, #00ff22, #ffee00, #ff003c)",
                                                    WebkitMaskImage: "radial-gradient(circle, transparent 25%, #000 60%)",
                                                    maskImage: "radial-gradient(circle, transparent 25%, #000 60%)",
                                                    filter: "blur(10px) brightness(1.3) contrast(1.2)",
                                                    mixBlendMode: "normal"
                                                }}
                                            />

                                            {/* Sharp Specular Highlight Overlay */}
                                            <motion.div
                                                animate={{
                                                    borderRadius: [
                                                        "45% 55% 70% 35% / 50% 30% 70% 50%",
                                                        "30% 70% 50% 50% / 70% 50% 30% 50%",
                                                        "60% 40% 30% 70% / 40% 60% 70% 30%",
                                                        "50% 50% 70% 30% / 30% 70% 50% 50%",
                                                        "45% 55% 70% 35% / 50% 30% 70% 50%"
                                                    ],
                                                }}
                                                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] opacity-40 pointer-events-none"
                                                style={{
                                                    background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.0) 25%)",
                                                    mixBlendMode: "overlay"
                                                }}
                                            />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-between items-end mt-12 md:mt-0 pt-8 border-t border-off-white/5"
                        >
                            <p className="text-xs text-off-white/40 font-medium">
                                Made with <span className="text-red-500">❤️</span> by {APP_CONFIG.name.split(' ')[0]}
                            </p>

                            <div className="flex flex-col items-end gap-2 text-xs text-off-white/40 font-medium">
                                <p>© {new Date().getFullYear()}</p>
                                <div className="w-8 h-8 rounded-full border border-off-white/20 flex items-center justify-center text-lg mt-2 cursor-pointer hover:bg-white/10 transition-colors">
                                    ~
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MenuOverlay;
