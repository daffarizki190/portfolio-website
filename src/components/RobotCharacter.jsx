import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import RobotChatBox from "./RobotChatBox";

const RobotCharacter = () => {
    const robotRef = useRef(null);
    const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const ctaMessages = [
        "Click me, please! ✨",
        "Let's chat! 🤖",
        "Tanya aku soal Daffa! 💡",
        "Hi there! 👋",
        "Aku tahu rahasia Daffa lho! 🤫",
        "Need a Developer? 💻"
    ];

    // Smooth spring for head tilt
    const rawTiltX = useMotionValue(0);
    const rawTiltY = useMotionValue(0);
    const tiltX = useSpring(rawTiltX, { stiffness: 40, damping: 15 });
    const tiltY = useSpring(rawTiltY, { stiffness: 40, damping: 15 });

    useEffect(() => {
        // Random blinking logic
        const blinkLoop = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
            setTimeout(blinkLoop, Math.random() * 4000 + 2000);
        };
        const timer = setTimeout(blinkLoop, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isChatOpen) return;
        const msgTimer = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % ctaMessages.length);
        }, 3000);
        return () => clearInterval(msgTimer);
    }, [isChatOpen, ctaMessages.length]);

    const handleClick = () => {
        setIsChatOpen(prev => !prev);
        if (isClicked) return;
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 1500);
    };

    useEffect(() => {
        const handleMouse = (e) => {
            if (!robotRef.current) return;
            const rect = robotRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Eye pupil offset — clamp to max 5px
            const maxPupil = 5;
            const ratio = Math.min(dist / 300, 1);
            setEyeOffset({
                x: (dx / dist || 0) * maxPupil * ratio,
                y: (dy / dist || 0) * maxPupil * ratio,
            });

            // Head tilt — subtle, clamp to ±10deg
            rawTiltX.set(Math.max(-10, Math.min(10, -dy / 30)));
            rawTiltY.set(Math.max(-10, Math.min(10, dx / 30)));
        };

        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [rawTiltX, rawTiltY]);

    return (
        <>
            <motion.div
                className="fixed bottom-4 right-4 z-50 pointer-events-auto"
                style={{
                    transform: "scale(0.25)",
                    transformOrigin: "bottom right"
                }}
            >
                <motion.div
                    ref={robotRef}
                    animate={{
                        y: isClicked ? [0, -40, 0, -20, 0] : [0, -10, 0],
                        rotate: isClicked ? [0, -10, 10, -5, 5, 0] : [0, 2, 0, -2, 0],
                    }}
                    transition={{
                        duration: isClicked ? 1.5 : 3,
                        repeat: isClicked ? 0 : Infinity,
                        ease: "easeInOut"
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative select-none flex flex-col items-center justify-center cursor-pointer origin-bottom"
                    style={{ width: 320, height: 380, perspective: 1200 }}
                >
                    {/* Animated Text Bubble */}
                    <AnimatePresence>
                        {!isChatOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: [0, -10, 0] }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
                                className="absolute -top-[120px] pointer-events-none z-20"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={messageIndex}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative whitespace-nowrap bg-[#b8f400] text-black px-6 py-3 rounded-2xl rounded-br-sm font-bold text-3xl shadow-[0_0_30px_rgba(184,244,0,0.5)]"
                                    >
                                        {ctaMessages[messageIndex]}
                                        {/* little triangle pointer */}
                                        <div className="absolute -bottom-3 right-6 w-6 h-6 bg-[#b8f400] rotate-45" />
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Massive Deep Space Glow Behind Robot */}
                    <div className="absolute inset-0 pointer-events-none z-0" style={{
                        background: "radial-gradient(circle at 50% 40%, rgba(184, 244, 0, 0.15) 0%, rgba(50, 255, 100, 0.05) 40%, transparent 70%)",
                        filter: "blur(40px)",
                        transform: "scale(1.8) translateZ(-100px)"
                    }} />

                    {/* ── LEFT LINGERING ARM ── */}
                    <motion.div
                        className="absolute top-[170px] -left-[10px] z-10"
                        animate={{ rotate: isClicked ? [0, -40, 40, -40, 40, 0] : [5, -5, 5] }}
                        transition={{ duration: isClicked ? 1.5 : 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 30, height: 90, originY: 0.1 }}
                    >
                        <div className="w-8 h-8 rounded-full bg-[#111] shadow-[inset_0_0_10px_#000,0_5px_10px_rgba(0,0,0,0.5)] border border-white/10" />
                        <div className="w-7 h-16 ml-0.5 -mt-2 rounded-full" style={{ background: "linear-gradient(180deg, #222, #0a0a0a)", boxShadow: "inset 2px 0 5px rgba(255,255,255,0.1), inset -2px 0 5px rgba(0,0,0,0.8)" }} />
                        <div className="w-8 h-8 rounded-full" style={{ background: isClicked ? "#ff0055" : "#b8f400", boxShadow: isClicked ? "0 0 15px #ff0055" : "0 0 15px #b8f400" }} />
                    </motion.div>

                    {/* ── RIGHT LINGERING ARM ── */}
                    <motion.div
                        className="absolute top-[170px] -right-[10px] z-10"
                        animate={{ rotate: isClicked ? [0, 40, -40, 40, -40, 0] : [-5, 5, -5] }}
                        transition={{ duration: isClicked ? 1.5 : 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 30, height: 90, originY: 0.1 }}
                    >
                        <div className="w-8 h-8 rounded-full bg-[#111] shadow-[inset_0_0_10px_#000,0_5px_10px_rgba(0,0,0,0.5)] border border-white/10 ml-auto" />
                        <div className="w-7 h-16 mr-0.5 -mt-2 rounded-full ml-auto" style={{ background: "linear-gradient(180deg, #222, #0a0a0a)", boxShadow: "inset -2px 0 5px rgba(255,255,255,0.1), inset 2px 0 5px rgba(0,0,0,0.8)" }} />
                        <div className="w-8 h-8 rounded-full ml-auto" style={{ background: isClicked ? "#ff0055" : "#b8f400", boxShadow: isClicked ? "0 0 15px #ff0055" : "0 0 15px #b8f400" }} />
                    </motion.div>

                    {/* ── LEFT WALKING LEG ── */}
                    <motion.div
                        className="absolute top-[280px] left-[90px] z-0"
                        animate={{ rotate: isClicked ? [0, -20, 20, -20, 20, 0] : [0, 0, 0], y: isClicked ? 0 : [0] }}
                        transition={{ duration: isClicked ? 1.5 : 1, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 40, height: 80, originY: 0.1 }}
                    >
                        <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border border-white/5 mx-auto" />
                        <div className="w-8 h-12 mx-auto -mt-2 rounded-full" style={{ background: "linear-gradient(180deg, #151515, #050505)", boxShadow: "0 10px 10px rgba(0,0,0,0.5)" }} />
                        <div className="w-10 h-6 mx-auto rounded-[50%_50%_10%_10%] bg-[#222] border-t border-white/10" />
                    </motion.div>

                    {/* ── RIGHT WALKING LEG ── */}
                    <motion.div
                        className="absolute top-[280px] right-[90px] z-0"
                        animate={{ rotate: isClicked ? [0, 20, -20, 20, -20, 0] : [0, 0, 0], y: isClicked ? 0 : [0] }}
                        transition={{ duration: isClicked ? 1.5 : 1, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 40, height: 80, originY: 0.1 }}
                    >
                        <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border border-white/5 mx-auto" />
                        <div className="w-8 h-12 mx-auto -mt-2 rounded-full" style={{ background: "linear-gradient(180deg, #151515, #050505)", boxShadow: "0 10px 10px rgba(0,0,0,0.5)" }} />
                        <div className="w-10 h-6 mx-auto rounded-[50%_50%_10%_10%] bg-[#222] border-t border-white/10" />
                    </motion.div>

                    {/* ── HEAD (Glassmorphic Mech Dome) ── */}
                    <motion.div
                        className="relative z-20"
                        style={{
                            width: 240, height: 160, marginTop: 10,
                            rotateX: tiltX,
                            rotateY: tiltY,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Back housing / Engine cooling fins */}
                        <div className="absolute -inset-4 rounded-[40px] opacity-80" style={{
                            background: "repeating-linear-gradient(90deg, #0a0a0a, #0a0a0a 4px, #1a1a1a 4px, #1a1a1a 8px)",
                            transform: "translateZ(-40px)",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
                        }} />

                        {/* Main Chrome/Metallic Shell */}
                        <div className="absolute inset-0 rounded-[35px]" style={{
                            background: "linear-gradient(135deg, #2a2a2a 0%, #111 40%, #050505 100%)",
                            boxShadow: "inset 2px 2px 4px rgba(255,255,255,0.1), inset -4px -4px 10px rgba(0,0,0,0.8), 0 30px 60px rgba(0,0,0,0.9)",
                            border: "1px solid rgba(255,255,255,0.05)"
                        }}>
                            {/* Top highlight */}
                            <div className="absolute top-0 left-[10%] right-[10%] h-8 rounded-t-[30px] opacity-30" style={{
                                background: "linear-gradient(180deg, #ffffff 0%, transparent 100%)",
                                filter: "blur(2px)"
                            }} />
                        </div>

                        {/* Side Antenna/Ears */}
                        <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-8 h-16 rounded-l-xl" style={{
                            background: "linear-gradient(90deg, #111, #333)",
                            boxShadow: "inset 2px 0 4px rgba(255,255,255,0.2), inset -2px 0 6px rgba(0,0,0,0.9)",
                            transform: "translateZ(-10px)"
                        }}>
                            <motion.div animate={{ opacity: [0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-2 left-2 w-2 h-2 rounded-full" style={{ background: isClicked ? "#ff0055" : "#b8f400", boxShadow: isClicked ? "0 0 10px #ff0055" : "0 0 10px #b8f400" }} />
                        </div>
                        <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-8 h-16 rounded-r-xl" style={{
                            background: "linear-gradient(-90deg, #111, #333)",
                            boxShadow: "inset -2px 0 4px rgba(255,255,255,0.2), inset 2px 0 6px rgba(0,0,0,0.9)",
                            transform: "translateZ(-10px)"
                        }} />

                        {/* Dark Glass Visor Screen */}
                        <div className="absolute inset-[14px] rounded-[24px] overflow-hidden" style={{
                            background: "linear-gradient(160deg, #050508 0%, #000000 100%)",
                            boxShadow: "inset 0 4px 15px rgba(0,0,0,1), inset 0 -2px 5px rgba(184,244,0,0.1)",
                            border: "2px solid rgba(184,244,0,0.05)",
                            transform: "translateZ(10px)"
                        }}>

                            {/* Visor Inner Glass Glare */}
                            <div className="absolute -top-10 -left-10 w-[200%] h-20 rotate-12 opacity-10 pointer-events-none" style={{
                                background: "linear-gradient(180deg, #ffffff, transparent)",
                                transform: "translateZ(1px)"
                            }} />

                            {/* Highly Realistic Camera Lens Eyes */}
                            <div className="absolute inset-0 flex items-center justify-center gap-12" style={{ paddingBottom: 10 }}>
                                {[0, 1].map(i => (
                                    <motion.div key={i}
                                        animate={{ scaleY: isBlinking ? 0.05 : 1 }}
                                        transition={{ duration: 0.1 }}
                                        className="relative flex items-center justify-center" style={{
                                            width: 50, height: 50, borderRadius: "50%",
                                            background: "radial-gradient(circle at 30% 30%, #2a2a2a, #000)",
                                            boxShadow: "0 0 20px rgba(0,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.9), 0 0 0 3px #111",
                                            border: "1px solid #333",
                                        }}>
                                        <div className="absolute inset-2 rounded-full border border-white/5" style={{ background: "radial-gradient(circle, #050505, #111)" }} />
                                        <div className="absolute inset-4 rounded-full" style={{ background: "#000", border: isClicked ? "1px solid rgba(255,0,85,0.2)" : "1px solid rgba(184,244,0,0.2)" }} />

                                        {/* The Floating Glowing Pupil */}
                                        <motion.div
                                            animate={{
                                                x: eyeOffset.x * 2,
                                                y: eyeOffset.y * 2,
                                                scale: isClicked ? 1.5 : (isHovered ? 1.2 : 1)
                                            }}
                                            transition={{ type: "spring", stiffness: 150, damping: 10 }}
                                            style={{
                                                position: "absolute",
                                                width: 14, height: 14,
                                                borderRadius: "50%",
                                                background: isClicked
                                                    ? "radial-gradient(circle at 40% 40%, #ffffff 0%, #ff0055 40%, #7a002a 100%)"
                                                    : "radial-gradient(circle at 40% 40%, #ffffff 0%, #b8f400 40%, #5a7a00 100%)",
                                                boxShadow: isClicked
                                                    ? "0 0 25px #ff0055, 0 0 50px rgba(255,0,85,0.6), inset 1px 1px 2px #fff"
                                                    : "0 0 15px #b8f400, 0 0 30px rgba(184,244,0,0.4), inset 1px 1px 2px #fff",
                                                transform: "translateZ(10px)"
                                            }}
                                        >
                                            <div className="absolute top-[2px] left-[2px] w-1.5 h-1.5 bg-white rounded-full opacity-80 blur-[0.5px]" />
                                        </motion.div>

                                        <div className="absolute inset-0 rounded-full pointer-events-none opacity-40" style={{
                                            background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 40%)"
                                        }} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Holographic scanning grid on visor */}
                            <motion.div
                                animate={{ y: ["-100%", "200%"] }}
                                transition={{ duration: isHovered ? 1.5 : 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-x-0 h-4 opacity-30"
                                style={{
                                    background: isClicked
                                        ? "linear-gradient(180deg, transparent, #ff0055, transparent)"
                                        : "linear-gradient(180deg, transparent, #b8f400, transparent)",
                                    boxShadow: isClicked ? "0 0 15px rgba(255,0,85,0.5)" : "0 0 15px rgba(184,244,0,0.5)"
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* ── METALLIC NECK JOINT ── */}
                    <div className="relative z-10" style={{
                        width: 40, height: 40, marginTop: -10, marginBottom: -15,
                        background: "repeating-linear-gradient(0deg, #111, #111 4px, #222 4px, #222 8px)",
                        boxShadow: "inset 5px 0 10px rgba(0,0,0,0.8), inset -5px 0 10px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.9)",
                        borderRadius: "4px"
                    }} />

                    {/* ── HEAVY PLATE CHEST/BODY ── */}
                    <div className="relative z-0 flex justify-center" style={{
                        width: 200, height: 130,
                        perspective: 800
                    }}>
                        <div className="absolute inset-0 rounded-[24px]" style={{
                            background: "linear-gradient(145deg, #252525 0%, #151515 45%, #050505 100%)",
                            boxShadow: "inset 2px 2px 5px rgba(255,255,255,0.1), inset -5px -5px 15px rgba(0,0,0,0.8), 0 40px 50px rgba(0,0,0,0.7)",
                            borderTop: "2px solid rgba(255,255,255,0.05)",
                            transform: "rotateX(15deg)",
                            transformStyle: "preserve-3d"
                        }}>
                            {/* Glowing Core Reactor */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center p-1" style={{
                                background: "#000",
                                boxShadow: "inset 0 0 15px rgba(0,0,0,1), 0 0 0 4px #1a1a1a, 0 5px 15px rgba(0,0,0,0.5)",
                                transform: "translateZ(15px)"
                            }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: isHovered ? 1 : 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-2 border-2 border-dashed rounded-full"
                                    style={{ borderColor: isClicked ? "rgba(255,0,85,0.8)" : "rgba(184,244,0,0.4)" }}
                                />
                                <motion.div
                                    animate={{
                                        scale: isClicked ? [1, 1.5, 1] : (isHovered ? [0.9, 1.1, 0.9] : [0.85, 1, 0.85]),
                                        opacity: isClicked ? [0.8, 1, 0.8] : [0.7, 1, 0.7]
                                    }}
                                    transition={{ duration: isClicked ? 0.3 : (isHovered ? 0.5 : 2), repeat: Infinity, ease: "easeInOut" }}
                                    className="w-10 h-10 rounded-full"
                                    style={{
                                        background: isClicked
                                            ? "radial-gradient(circle, #ffffff 0%, #ff0055 30%, #111 100%)"
                                            : "radial-gradient(circle, #ffffff 0%, #b8f400 30%, #111 100%)",
                                        boxShadow: isClicked ? "0 0 40px #ff0055, inset 0 0 10px #fff" : "0 0 20px #b8f400, inset 0 0 10px #fff"
                                    }}
                                />
                            </div>

                            <div className="absolute left-6 top-6 bottom-6 w-px bg-white/5 shadow-[1px_0_0_#000]" />
                            <div className="absolute right-6 top-6 bottom-6 w-px bg-white/5 shadow-[1px_0_0_#000]" />
                        </div>
                    </div>

                    <motion.div
                        animate={{ scale: [1, 0.8, 1], opacity: [0.5, 0.2, 0.5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-10 w-48 h-8 rounded-[100%] bg-black pointer-events-none blur-xl"
                    />
                </motion.div>
            </motion.div>
            <RobotChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
};

export default RobotCharacter;
