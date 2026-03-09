import React, { useState, useEffect, useRef, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, MapPin } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_INFO, APP_CONFIG } from '../constants';
import RobotCharacter from '../components/RobotCharacter';

// Holographic 3D Iridescent Glass Sphere
const InteractiveBlob = () => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 12 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 12 });

  const rotateX = useTransform(springY, [-300, 300], [45, -45]);
  const rotateY = useTransform(springX, [-300, 300], [-45, 45]);
  const moveX = useTransform(springX, [-300, 300], [-60, 60]);
  const moveY = useTransform(springY, [-300, 300], [-60, 60]);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div ref={ref} className="relative flex items-center justify-center pointer-events-none z-0"
      style={{ width: "min(65vw, 600px)", height: "min(65vw, 600px)" }}>

      {/* Main Holographic Morphing Container (Venom Style) */}
      <motion.div
        style={{ rotateX, rotateY, x: moveX, y: moveY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
        animate={{ scale: [1, 1.05, 0.95, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full relative"
      >
        {/* Core Black Slime Sphere */}
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
          {/* Internal Viscous Slime Highlights - White/Silver */}
          <motion.div
            className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] border-[40px] border-white mix-blend-overlay opacity-80"
            animate={{
              rotate: [0, 90, 270, 360],
              scale: [1, 1.25, 0.75, 1.2, 1],
              borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "50% 50% 20% 80%", "40% 60% 70% 30%"],
              x: [-40, 50, -30, -40],
              y: [-35, 45, -40, -35],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(20px)" }}
          />
          <motion.div
            className="absolute inset-[5%] w-[90%] h-[90%] border-[35px] border-[#f4f4f4] mix-blend-normal opacity-60"
            animate={{
              rotate: [360, 180, 45, 0],
              scale: [0.8, 1.3, 0.7, 1.2, 0.8],
              borderRadius: ["50% 50% 50% 50%", "30% 70% 70% 30%", "70% 30% 30% 70%", "50% 50% 50% 50%"],
              x: [45, -40, 35, -30, 45],
              y: [35, -45, 40, 35],
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(25px)" }}
          />

          <motion.div
            className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-white mix-blend-overlay opacity-90"
            animate={{
              rotate: [0, -120, -240, -360],
              x: [0, -180, 80, -100, 0],
              y: [0, -120, -180, -80, 0],
              scale: [1, 1.6, 0.6, 1.5, 1],
              borderRadius: ["30% 70% 70% 30%", "60% 40% 40% 60%", "50% 50% 20% 80%", "30% 70% 70% 30%"]
            }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(30px)" }}
          />

          {/* Orbiting Edge Colors (Warna bergerak di sisi) */}
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

          {/* Sharp Specular Highlight Overlay (Wet Look) */}
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
    </div>
  );
};

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const initials = APP_CONFIG.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <section id="Home" className="min-h-screen relative bg-[#F5F5F5] w-full overflow-hidden flex flex-col">

      {/* ── Navbar ── */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-8">
        {/* Logo */}
        <a href="#Home" className="text-3xl font-display font-black text-deep-black uppercase select-none tracking-tighter hover:scale-105 transition-transform">
          D
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Works'].map(item => (
            <a key={item} href={`#${item === 'Works' ? 'Portofolio' : item}`}
              className="text-sm font-medium text-deep-black/60 hover:text-deep-black transition-colors">
              {item}
            </a>
          ))}
          <a href="#Contact"
            className="ml-4 flex items-center gap-2 px-6 py-2.5 bg-deep-black text-white text-sm font-medium rounded-full hover:scale-105 transition-transform duration-300">
            Contact
            <span className="bg-white/20 rounded-full p-1 leading-none text-[10px] flex items-center justify-center">↗</span>
          </a>
        </div>
        {/* Mobile */}
        <a href="#Contact" className="md:hidden flex items-center gap-2 px-5 py-2 bg-deep-black text-white text-xs font-medium rounded-full">
          Contact ↗
        </a>
      </nav>

      {/* ── Main Content: Blob fills screen, text floats ON TOP ── */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Blob — behind text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="relative z-0"
        >
          <motion.div variants={itemVariants}>
            <InteractiveBlob />
          </motion.div>
        </motion.div>

        {/* Text OVERLAID ON the blob — exactly like the video */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4"
        >
          <motion.p variants={itemVariants}
            className="text-xs sm:text-sm font-medium text-deep-black/50 mb-2">
            Hi! I'm {APP_CONFIG.name.split(' ')[0]}
          </motion.p>
          <motion.div variants={itemVariants} className="text-center w-full px-4 overflow-visible z-10">
            <motion.h1
              animate={{ y: [0, -8, 0], rotate: [0, -0.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[10vw] sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-deep-black leading-none whitespace-normal break-words inline-block"
            >
              Full-stack Developer
            </motion.h1>
            <br />
            <motion.h1
              animate={{ y: [0, 8, 0], rotate: [0, 0.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="text-[10vw] sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-deep-black leading-none whitespace-normal break-words inline-block mt-2"
            >
              Mobile Developer.
            </motion.h1>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll down — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-deep-black/30"
      >
        <p className="text-[9px] font-bold uppercase tracking-[0.25em]">scroll down</p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-5 h-5 rounded-full border border-deep-black/25 flex items-center justify-center"
        >
          <div className="w-1 h-1 rounded-full bg-deep-black/30" />
        </motion.div>
      </motion.div>

      {/* ── Minimalist Sidebar (Left Edge) ── */}
      <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6">
        {/* Vertical Line Scroll Indicator */}
        <div className="h-24 w-[1px] bg-deep-black/20 relative flex justify-center">
          <div className="w-1 h-1 rounded-full bg-deep-black absolute -top-1" />
          <div className="w-1 h-1 rounded-full bg-deep-black absolute -bottom-1" />
          <motion.div
            animate={{ y: [0, 96, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] h-8 bg-deep-black absolute top-0"
          />
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-6 mt-4">
          {[
            { Icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'li' },
            { href: `https://wa.me/${CONTACT_INFO.phone?.replace(/\D/g, '')}`, label: 'wa', isWa: true },
            { Icon: Github, href: SOCIAL_LINKS.github, label: 'gh' },
          ].map(({ Icon, href, isWa }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              className="text-deep-black/40 hover:text-deep-black hover:scale-110 transition-all duration-300">
              {isWa ? (
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              ) : (
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              )}
            </a>
          ))}
        </div>
      </div>

      {/* ── INTERACTIVE ROBOT CHARACTER ── */}
      <RobotCharacter />
    </section>
  );
};

export default memo(Home);
