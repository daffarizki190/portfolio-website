import React from "react";
import { motion } from "framer-motion";

// Two diagonal crossed ribbon marquee strips — exactly like the video
// One strip tilts top-left to bottom-right, one tilts bottom-left to top-right
// Both have scrolling text: "INNOVATIVE SELF-MADE CREATIONS ✦ TAILORED WEB DEVELOPMENT FOR YOU ✦ DRIVEN BY PASSION ✦ BUILT FOR YOU"

const RIBBON_TEXT = [
    "INNOVATIVE SELF-MADE CREATIONS",
    "TAILORED WEB DEVELOPMENT FOR YOU",
    "DRIVEN BY PASSION",
    "BUILT FOR YOU",
];

const RibbonStrip = ({ rotate, direction = 1, speed = 25 }) => {
    const items = [...RIBBON_TEXT, ...RIBBON_TEXT, ...RIBBON_TEXT, ...RIBBON_TEXT];
    return (
        <div
            className="absolute left-[-30%] right-[-30%] overflow-hidden py-3"
            style={{
                transform: `rotate(${rotate}deg)`,
                backgroundColor: "#0a0a0a",
            }}
        >
            <motion.div
                className="flex shrink-0 gap-10 items-center whitespace-nowrap"
                animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: speed, ease: "linear", repeat: Infinity }}
            >
                {items.map((txt, i) => (
                    <React.Fragment key={i}>
                        <span className="text-sm md:text-base font-black uppercase tracking-widest text-white/90">
                            {txt}
                        </span>
                        <span className="text-lime-accent text-lg shrink-0">✦</span>
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
};

const DiagonalRibbonSection = () => (
    <section className="relative bg-[#EEEEE9] overflow-hidden" style={{ height: "55vh", minHeight: 300 }}>
        {/* Center container that holds the two crossed ribbons */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden w-full h-full">
            {/* Top-left to bottom-right ribbon */}
            <RibbonStrip rotate={-18} direction={1} speed={22} />
            {/* Bottom-left to top-right ribbon */}
            <RibbonStrip rotate={18} direction={-1} speed={28} />
        </div>
    </section>
);

export default DiagonalRibbonSection;
