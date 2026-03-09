import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Languages, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <section id="About" className="py-24 bg-deep-black text-off-white overflow-hidden border-t border-off-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-3xl bg-off-white/5">
              <img
                src="/Photo1.jpg"
                alt="Daffa Rizki Ariyanto"
                className="w-full h-full object-cover object-center group-hover:scale-105 hover:scale-105 transition-all duration-700"
              />
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full -z-0"
              style={{
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                opacity: 0.5, filter: "blur(40px)"
              }}
            />
            <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-lime-accent rounded-full -z-0 opacity-50" />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-10 relative">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-6xl md:text-7xl font-display font-black tracking-tighter uppercase leading-none">
                ABOUT{" "}
                <span className="text-lime-accent">ME</span>
              </h2>
              <p className="text-xl text-off-white/60 font-medium leading-relaxed">
                Computer Science student at Universitas Cakrawala, passionate about
                bridging operational efficiency with innovative technology.
              </p>
              <p className="text-lg text-off-white/30 font-medium">
                With a background in parking operations management, I build web apps
                and IoT systems that solve real-world problems.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-3 relative z-10"
              >
                <div className="flex items-center gap-3">
                  <Languages className="w-4 h-4 text-lime-accent" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-off-white/30">Languages</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Indonesian (Native)', 'English (Intermediate)'].map((lang, i) => (
                    <span key={i} className="px-4 py-2 border border-off-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-off-white/50">
                      {lang}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-lime-accent" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-off-white/30">Soft Skills</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Leadership', 'Communication', 'Problem Solving', 'Teamwork'].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 px-5 py-2.5 border border-off-white/10 rounded-full group hover:border-lime-accent/50 hover:bg-lime-accent/5 transition-all">
                    <ArrowRight className="w-3 h-3 text-lime-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-off-white/60">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
