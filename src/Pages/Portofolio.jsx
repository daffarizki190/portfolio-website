import React from "react";
import { Tab } from "@headlessui/react";
import { Code, Boxes, FolderGit2, Github, ExternalLink, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { techStacks, experiencesData, projectsData } from "../constants/portofolio";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Interactive 3D Card for Projects
const Project3DCard = ({ project, index }) => {
  const ref = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group cursor-pointer perspective-[1000px] relative z-10"
    >
      <div
        className="relative aspect-video rounded-3xl overflow-hidden bg-white/5 mb-6 border border-white/5 group-hover:border-lime-accent/30 transition-colors duration-500"
        style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />

        {/* Dynamic Glare Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-3xl mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            left: "-50%", right: "-50%", top: "-50%", bottom: "-50%",
            x: glareX, y: glareY
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div
          className="absolute top-6 right-6 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
          style={{ transform: "translateZ(50px)" }}
        >
          {project.live_demo && (
            <a href={project.live_demo} target="_blank" rel="noopener noreferrer" className="p-3 bg-lime-accent text-deep-black rounded-full hover:scale-110 transition-transform">
              <ExternalLink size={18} />
            </a>
          )}
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md text-off-white rounded-full hover:bg-white/30 transition-all">
            <Github size={18} />
          </a>
        </div>
      </div>

      <div className="space-y-3" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-3xl font-display font-black tracking-tight uppercase group-hover:text-lime-accent transition-colors">
          {project.name}
        </h3>
        <p className="text-off-white/40 font-medium line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  return (
    <section id="Portofolio" className="py-24 bg-deep-black text-off-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase mb-4"
            >
              SELECTED <span className="text-lime-accent">WORKS</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-off-white/60 font-medium"
            >
              A collection of my professional journey, technical projects, and the tools I use to build digital experiences.
            </motion.p>
          </div>
        </div>

        <div className="w-full">
          <Tab.Group>
            <Tab.List className="flex flex-wrap gap-4 mb-12">
              {[
                { label: "Experience", icon: Code },
                { label: "Projects", icon: FolderGit2 },
                { label: "Tech Stack", icon: Boxes }
              ].map((tab, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    classNames(
                      'px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 outline-none',
                      selected
                        ? 'bg-lime-accent text-deep-black'
                        : 'bg-white/5 text-off-white/40 hover:bg-white/10 hover:text-off-white'
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <tab.icon size={14} />
                    {tab.label}
                  </div>
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel className="outline-none">
                <div className="space-y-12">
                  {experiencesData.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12"
                    >
                      <div className="text-off-white/40 text-sm font-bold uppercase tracking-widest pt-1">
                        {exp.period}
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h3 className="text-3xl font-display font-black tracking-tight uppercase group-hover:text-lime-accent transition-colors">
                            {exp.role}
                          </h3>
                          <span className="text-lime-accent font-bold uppercase tracking-widest text-xs px-3 py-1 bg-lime-accent/10 rounded-full">
                            {exp.company}
                          </span>
                        </div>
                        <ul className="space-y-4 text-off-white/60 font-medium">
                          {exp.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-4">
                              <ArrowRight size={16} className="mt-1 flex-shrink-0 text-lime-accent" />
                              <span className="leading-relaxed">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Tab.Panel>

              <Tab.Panel className="outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {projectsData.map((project, index) => (
                    <Project3DCard key={index} project={project} index={index} />
                  ))}
                </div>
              </Tab.Panel>

              <Tab.Panel className="outline-none">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {techStacks.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-lime-accent/50 transition-all group"
                    >
                      <img
                        src={`/${tech.icon}`}
                        alt={tech.language}
                        className="w-12 h-12 object-contain mb-4 grayscale group-hover:grayscale-0 transition-all"
                      />
                      <span className="text-[10px] font-black uppercase tracking-widest text-off-white/40 group-hover:text-lime-accent">
                        {tech.language}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
