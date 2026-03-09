import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { APP_CONFIG } from "../constants";

const firstName = APP_CONFIG.name.split(" ")[0];

const IntroSection = () => (
    <section className="relative bg-deep-black min-h-screen flex flex-col justify-center px-4 md:px-8 py-32 w-full overflow-hidden">
        <div className="max-w-5xl mx-auto">
            {/* Big intro paragraph */}
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-black text-off-white leading-tight tracking-tight text-center"
            >
                I'm {firstName} – a Full Stack Developer crafting fast, scalable,
                and immersive digital experiences that merge creativity
                with <span className="italic font-light">engineering precision.</span>
            </motion.h2>

            {/* Sub text */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                className="mt-12 text-base md:text-lg text-off-white/45 text-center max-w-2xl mx-auto leading-relaxed"
            >
                I specialize in developing scalable full-stack applications,
                mobile apps, and interactive UI experiences using technologies like{" "}
                <span className="text-off-white/70">React</span>,{" "}
                <span className="text-off-white/70">Node.js</span>, and{" "}
                <span className="text-off-white/70">Tailwind CSS</span>.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="flex items-center justify-center gap-3 mt-14"
            >
                <a
                    href="#About"
                    className="flex items-center gap-2 px-7 py-3.5 bg-lime-accent text-deep-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform"
                >
                    About Me
                </a>
                <a
                    href="#About"
                    className="flex items-center justify-center w-12 h-12 bg-lime-accent text-deep-black rounded-full hover:scale-105 transition-transform"
                >
                    <ArrowUpRight className="w-5 h-5" />
                </a>
            </motion.div>
        </div>

        {/* Bottom labels */}
        <div className="absolute bottom-8 left-4 md:left-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-off-white/25">
            <span>↓</span>
            <span>Scroll to Explore</span>
        </div>
        <div className="absolute bottom-8 right-4 md:right-8 text-[10px] font-bold uppercase tracking-widest text-off-white/25 hidden sm:block">
            My Short Story
        </div>
    </section>
);

export default IntroSection;
