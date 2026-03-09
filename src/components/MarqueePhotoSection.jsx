import React, { useRef } from "react";
import { motion } from "framer-motion";
import InteractiveDeveloperAvatar from "./InteractiveDeveloperAvatar";

// Marquee photo section — exactly like the video:
// Giant horizontally scrolling text strip top + user photo centered + lime green curved line
const TICKER_ITEMS = [
    "FULL-STACK DEVELOPER",
    "🌸",
    "SOFTWARE ENGINEER",
    "🌸",
    "MOBILE DEVELOPER",
    "🌸",
    "CREATIVE CODER",
    "🌸",
];

const TickerRow = ({ direction = 1, speed = 35 }) => {
    const items = [...TICKER_ITEMS, ...TICKER_ITEMS]; // double for seamless loop
    return (
        <div className="flex overflow-hidden whitespace-nowrap select-none">
            <motion.div
                className="flex shrink-0 gap-8 items-center"
                animate={{ x: direction > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: speed, ease: "linear", repeat: Infinity }}
            >
                {items.map((item, i) => (
                    <span
                        key={i}
                        className={`text-[clamp(2rem,5vw,4rem)] font-display font-black tracking-tighter uppercase text-deep-black ${item === "🌸" ? "text-lime-accent text-2xl" : ""
                            }`}
                    >
                        {item === "🌸" ? (
                            <span className="text-lime-accent text-3xl md:text-4xl">✿</span>
                        ) : (
                            item
                        )}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};



const MarqueePhotoSection = () => (
    <section className="relative bg-[#EEEEE9] py-12 overflow-hidden flex flex-col items-center justify-center">
        {/* Top scrolling text */}
        <TickerRow direction={1} speed={30} />

        <div className="relative w-full h-[60vh] flex items-center justify-center -my-8 perspective-[1000px]">
            {/* Lime Green Animated Curved Background Line */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                preserveAspectRatio="none"
                viewBox="0 0 1024 400"
            >
                <motion.path
                    d="M0,300 C200,50 500,350 1024,100"
                    stroke="#b8f400"
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
            </svg>

            {/* Replaced static image with the awesome interactive 3D avatar */}
            <InteractiveDeveloperAvatar />
        </div>

        {/* Bottom scrolling text (reverse) */}
        <TickerRow direction={-1} speed={25} />
    </section>
);

export default MarqueePhotoSection;
