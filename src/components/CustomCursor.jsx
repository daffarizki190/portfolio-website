import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Custom cursor — circular outline that follows mouse, like in the video
const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { stiffness: 120, damping: 20 });
    const springY = useSpring(cursorY, { stiffness: 120, damping: 20 });

    useEffect(() => {
        const move = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
            style={{ x: springX, y: springY }}
        >
            <div
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.9)",
                    backgroundColor: "transparent",
                }}
            />
        </motion.div>
    );
};

export default CustomCursor;
