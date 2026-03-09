import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const InteractiveDeveloperAvatar = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 15 });

    // Parallax movement values based on mouse position
    const headX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
    const headY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);
    const bodyX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
    const glowX = useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]);
    const glowY = useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 w-full h-full max-w-[450px] aspect-square min-w-[250px] cursor-none group mx-auto"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
            <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible drop-shadow-2xl">
                <defs>
                    <filter id="neonGlow">
                        <feGaussianBlur stdDeviation="30" />
                    </filter>
                </defs>

                {/* Interactive Glowing Aura */}
                <motion.circle
                    cx="250" cy="250" r="140"
                    fill="#b8f400" opacity="0.15"
                    filter="url(#neonGlow)"
                    style={{ x: glowX, y: glowY }}
                />

                {/* Floating Tech Element Left */}
                <motion.g
                    animate={{ y: [-15, 10, -15], rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                    <rect x="20" y="140" width="90" height="55" rx="8" fill="#1A1F1C" stroke="#b8f400" strokeWidth="2" />
                    <line x1="35" y1="155" x2="85" y2="155" stroke="#b8f400" strokeWidth="4" strokeLinecap="round" />
                    <line x1="35" y1="175" x2="65" y2="175" stroke="#b8f400" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
                </motion.g>

                {/* Floating Tech Element Right */}
                <motion.g
                    animate={{ y: [15, -10, 15], rotate: [2, -2, 2] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                >
                    <rect x="390" y="240" width="70" height="80" rx="8" fill="#1A1F1C" stroke="#b8f400" strokeWidth="2" />
                    <circle cx="425" cy="265" r="14" stroke="#b8f400" strokeWidth="3" fill="none" />
                    <line x1="405" y1="300" x2="445" y2="300" stroke="#b8f400" strokeWidth="3" strokeLinecap="round" />
                </motion.g>

                {/* Body (Hoodie) */}
                <motion.g style={{ x: bodyX }}>
                    <path d="M 120 480 C 120 330, 170 260, 250 260 C 330 260, 380 330, 380 480 Z" fill="#1A1A1A" />
                    {/* Hoodie Details / Stitching */}
                    <path d="M 230 280 L 230 380" stroke="#2A2A2A" strokeWidth="6" strokeLinecap="round" />
                    <path d="M 270 280 L 270 380" stroke="#2A2A2A" strokeWidth="6" strokeLinecap="round" />
                </motion.g>

                {/* Head Group (Moves significantly with Parallax) */}
                <motion.g style={{ x: headX, y: headY }}>
                    {/* Neck */}
                    <rect x="230" y="240" width="40" height="40" rx="10" fill="#EAC19E" />

                    {/* Face Base */}
                    <rect x="175" y="110" width="150" height="155" rx="60" fill="#F8D3B4" />

                    {/* Minimalist Hair (Messy Fade Top) */}
                    <path d="M 155 140 C 155 70, 200 40, 250 40 C 300 40, 345 70, 345 140 C 345 120, 300 90, 250 90 C 200 90, 155 120, 155 140 Z" fill="#111" />
                    {/* Hair Tufts */}
                    <path d="M 210 90 Q 220 120 250 100 Q 275 125 300 90" fill="#111" />

                    {/* Headphones Band */}
                    <path d="M 160 120 C 160 50, 340 50, 340 120" fill="none" stroke="#222" strokeWidth="16" />
                    {/* Earpads */}
                    <rect x="145" y="110" width="28" height="65" rx="12" fill="#1A1A1A" />
                    <rect x="327" y="110" width="28" height="65" rx="12" fill="#1A1A1A" />
                    {/* Lime Accent on Headphones */}
                    <rect x="140" y="130" width="8" height="25" rx="4" fill="#b8f400" />
                    <rect x="352" y="130" width="8" height="25" rx="4" fill="#b8f400" />

                    {/* Glasses */}
                    <rect x="185" y="145" width="55" height="35" rx="10" stroke="#111" strokeWidth="5" fill="none" />
                    <rect x="260" y="145" width="55" height="35" rx="10" stroke="#111" strokeWidth="5" fill="none" />
                    {/* Glasses Bridge & Arms */}
                    <line x1="240" y1="160" x2="260" y2="160" stroke="#111" strokeWidth="5" />
                    <line x1="170" y1="160" x2="185" y2="160" stroke="#111" strokeWidth="6" />
                    <line x1="315" y1="160" x2="330" y2="160" stroke="#111" strokeWidth="6" />

                    {/* Eyes - Animated Blinking */}
                    <motion.g
                        animate={{ scaleY: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 4.5, times: [0, 0.04, 0.08] }}
                    >
                        <circle cx="212" cy="162" r="6" fill="#111" />
                        <circle cx="287" cy="162" r="6" fill="#111" />
                    </motion.g>

                    {/* Confident Smile */}
                    <path d="M 235 210 Q 250 222 265 210" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
                </motion.g>

                {/* Laptop Lid Covering Bottom */}
                <rect x="110" y="380" width="280" height="150" rx="20" fill="#E8EBEC" className="drop-shadow-2xl" />
                {/* Glowing Laptop Logo */}
                <motion.circle
                    cx="250" cy="450" r="18" fill="#b8f400"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="drop-shadow-[0_0_15px_rgba(184,244,0,0.8)]"
                />
            </svg>
        </motion.div>
    );
};

export default InteractiveDeveloperAvatar;
