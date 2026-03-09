import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Instagram } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS, APP_CONFIG } from '../constants';
import RobotCharacter from '../components/RobotCharacter';

const Contact = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });

  const socials = [
    { label: "Instagram", href: SOCIAL_LINKS.instagram },
    { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { label: "Github", href: SOCIAL_LINKS.github },
    { label: "Email", href: `mailto:${CONTACT_INFO.email}` },
    { label: "WhatsApp", href: `https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, '')}` },
  ];

  const contactLinks = [
    { label: "Home", href: "#Home" },
    { label: "About", href: "#About" },
    { label: "Work", href: "#Portofolio" },
    { label: "Contact", href: "#Contact" },
  ];

  return (
    <footer id="Contact" className="relative bg-deep-black w-full overflow-hidden border-t border-off-white/5">

      {/* ── Top info bar — matching TikTok reference ── */}
      <div className="border-b border-off-white/5 px-6 md:px-10 py-3 flex items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-off-white/25">
        {/* Links column header */}
        <div className="hidden md:flex items-center gap-8">
          <span className="text-off-white/15">LINKS</span>
          <div className="flex gap-4">
            {contactLinks.map(l => (
              <a key={l.label} href={l.href} className="hover:text-off-white/60 transition-colors">{l.label}</a>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <span className="text-off-white/15">SOCIALS</span>
          <div className="flex gap-4">
            {socials.slice(0, 3).map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="hover:text-off-white/60 transition-colors">{s.label}</a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 ml-auto">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-off-white/15">LOCAL TIME</span>
            <span className="tabular-nums">{formatTime(time)}&nbsp;UTC+7</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-off-white/15">VERSION</span>
            <span>2026 © EDITION</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative px-6 md:px-10 pt-16 pb-12 min-h-[80vh] flex flex-col justify-between">

        {/* Watermark name */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none -mb-8 flex justify-center">
          <h1 className="text-[18vw] md:text-[22vw] font-display font-black leading-none uppercase text-off-white/[0.03] whitespace-nowrap tracking-tighter">
            {APP_CONFIG.name.split(' ')[0]}
          </h1>
        </div>

        {/* Floating robot — right-center */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
        >
          <RobotCharacter />
        </motion.div>

        {/* LET'S TALK heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 relative z-20"
        >
          <h2 className="text-6xl sm:text-7xl md:text-[10vw] font-display font-black tracking-tighter uppercase leading-none text-off-white">
            LET'S<br />
            <span className="text-lime-accent">TALK</span>
          </h2>
          <p className="text-base md:text-lg text-off-white/35 font-medium mt-4 max-w-sm">
            Have a project in mind or just want to say hi?<br />Feel free to reach out.
          </p>
        </motion.div>

        {/* Contact + Social rows side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-3xl">

          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
              { icon: Phone, label: "Phone", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
              { icon: MapPin, label: "Location", value: CONTACT_INFO.location, href: "#" },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex items-center gap-4"
              >
                <div className="p-3 border border-off-white/10 text-lime-accent rounded-full group-hover:border-lime-accent transition-all shrink-0">
                  <item.icon size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-off-white/20 mb-0.5">{item.label}</p>
                  <p className="text-sm font-bold text-off-white/60 group-hover:text-lime-accent transition-colors">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social links */}
          <div className="space-y-3">
            {socials.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + idx * 0.07 }}
                className="group flex items-center justify-between p-4 border border-off-white/5 rounded-xl hover:border-lime-accent/30 hover:bg-lime-accent/5 transition-all"
              >
                <span className="font-display font-black uppercase tracking-tight text-sm text-off-white/50 group-hover:text-lime-accent transition-colors">
                  {link.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-off-white/15 transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-lime-accent transition-all" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-auto pt-8 border-t border-off-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-off-white/20">
            © {new Date().getFullYear()} {APP_CONFIG.name}. All Rights Reserved.
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-off-white/20">
            Built with React &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
