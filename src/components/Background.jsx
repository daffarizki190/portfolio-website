import React from "react";
import PropTypes from 'prop-types';
import { motion, useScroll, useTransform } from "framer-motion";

const Blob = ({ className, style }) => (
    <motion.div
        className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 ${className}`}
        style={style}
    />
);

Blob.propTypes = {
    className: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired
};

const AnimatedBackground = () => {
    const { scrollYProgress } = useScroll();

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const x3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const x4 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <div className="fixed inset-0 bg-slate-900 overflow-hidden pointer-events-none -z-10">
            <div className="absolute inset-0">
                <Blob
                    className="w-[40rem] h-[40rem] bg-blue-500/20 top-0 -left-16"
                    style={{ x: x1, y: y1 }}
                />
                <Blob
                    className="w-[40rem] h-[40rem] bg-purple-500/20 top-0 -right-16 hidden sm:block"
                    style={{ x: x2, y: y2 }}
                />
                <Blob
                    className="w-[30rem] h-[30rem] bg-sky-500/15 -bottom-12 left-24"
                    style={{ x: x3, y: y3 }}
                />
                <Blob
                    className="w-[30rem] h-[30rem] bg-indigo-500/15 -bottom-16 right-24 hidden sm:block"
                    style={{ x: x4, y: y4 }}
                />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:36px_36px]"></div>
        </div>
    );
};

export default AnimatedBackground;
