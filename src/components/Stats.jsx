import React from "react";
import { motion } from "framer-motion";

const stats = [
    { value: "10+", label: "Technologies Mastered", desc: "Including leading frameworks like React, Node.js, and Tailwind CSS" },
    { value: "5+", label: "Projects Built", desc: "From highly interactive 3D portfolios to functional E-Commerce and IoT systems" },
    { value: "4th", label: "Semester Student", desc: "Actively pursuing Computer Science degree with high dedication" },
    { value: "100%", label: "Commitment", desc: "To creating fast, responsive, and aesthetically pleasing web experiences" },
];

const Stats = () => {
    return (
        <section className="py-24 bg-deep-black border-t border-off-white/5">
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-off-white/30 mb-4">Proven Impact</p>
                    <h2 className="text-5xl md:text-6xl font-display font-black tracking-tighter uppercase text-off-white">
                        RESULTS THAT <span className="text-lime-accent">MATTER</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 border border-off-white/5 rounded-3xl bg-off-white/[0.02] hover:bg-off-white/[0.06] hover:border-lime-accent/30 transition-all duration-500 cursor-default"
                        >
                            <div
                                className="text-6xl md:text-7xl font-display font-black tracking-tighter mb-4"
                                style={{
                                    background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {stat.value}
                            </div>
                            <p className="text-sm font-black uppercase tracking-widest text-off-white mb-2">
                                {stat.label}
                            </p>
                            <p className="text-xs text-off-white/30 font-medium leading-relaxed">
                                {stat.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
