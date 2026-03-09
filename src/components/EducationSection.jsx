import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EducationSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const yOffset = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const pathLength = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]); // Draw line based on scroll
    const dotPosition = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative bg-[#1A1F1C] min-h-[120vh] w-full overflow-hidden flex flex-col items-center justify-center py-32 z-10 border-t border-off-white/5">

            {/* ── Background Grid & Vignette ── */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1A1F1C_100%)] pointer-events-none" />

            {/* ── Headline Title ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative z-20 text-center mb-32 max-w-4xl px-4"
            >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-off-white tracking-tight leading-tight">
                    Explore my journey and the <br className="hidden md:block" />
                    technologies that define my craft.
                </h2>
            </motion.div>

            {/* ── The Center Animated Curve (TikTok Reference Line) ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none flex justify-center items-center opacity-80 z-0">
                <svg viewBox="0 0 1000 600" className="w-[120%] h-full max-w-none text-lime-accent" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Faded Background path */}
                    <path d="M -200,400 Q 300,-100 800,200 T 1200,600" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="opacity-10" />

                    {/* Animated Draw Path */}
                    <motion.path
                        d="M -200,400 Q 300,-100 800,200 T 1200,600"
                        stroke="currentColor" strokeWidth="12" strokeLinecap="round"
                        style={{ pathLength }}
                    />

                    {/* Scrolling Dot tracker */}
                    <motion.circle
                        r="8"
                        fill="#b8f400"
                        style={{
                            filter: "drop-shadow(0 0 15px #b8f400)",
                            offsetPath: "path('M -200,400 Q 300,-100 800,200 T 1200,600')",
                            offsetDistance: dotPosition
                        }}
                    />
                </svg>
            </div>

            {/* ── Education Timelines Container ── */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-32">

                {/* Item 1: High School - Positioned Left */}
                <motion.div
                    style={{ y: yOffset }}
                    className="flex flex-col items-end text-right md:pr-16"
                >
                    {/* Vertical connecting line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="w-0.5 bg-lime-accent mb-4 origin-top hidden md:block"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-off-white mb-2 leading-none">
                            SMAS Adi Luhur<br />Jakarta
                        </h3>
                        <p className="text-lg md:text-xl text-off-white/50 font-medium mb-4">
                            Science Student<br />(Ilmu Pengetahuan Alam)
                        </p>
                        <p className="text-xs md:text-sm text-off-white/40 max-w-sm ml-auto leading-relaxed">
                            Strengthening fundamental analytical skills through rigorous science and mathematics coursework, building a foundation for logical problem-solving and software development.
                        </p>
                        <p className="text-[10px] text-lime-accent font-bold uppercase tracking-[0.2em] mt-6">
                            2016 - 2019
                        </p>
                    </motion.div>
                </motion.div>

                {/* Item 2: University - Positioned Right */}
                <motion.div
                    className="flex flex-col items-start text-left md:pl-16 md:mt-48"
                >
                    {/* Vertical connecting line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="w-0.5 bg-lime-accent mb-4 origin-top hidden md:block"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-off-white mb-2 leading-none">
                            Universitas<br />Cakrawala
                        </h3>
                        <p className="text-lg md:text-xl text-off-white/50 font-medium mb-4">
                            Computer Science Student<br />(Teknik Informatika)
                        </p>
                        <p className="text-xs md:text-sm text-off-white/40 max-w-sm mr-auto leading-relaxed">
                            Advancing software engineering capabilities through hands-on projects, collaborative development environments, and continuous exploration in modern web, backend, and integrated technologies.
                        </p>
                        <p className="text-[10px] text-lime-accent font-bold uppercase tracking-[0.2em] mt-6">
                            AUG 2024 - PRESENT
                        </p>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default EducationSection;
