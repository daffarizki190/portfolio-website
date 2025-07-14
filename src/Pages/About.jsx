import React, { useEffect } from 'react';
import { SKILLS } from '../constants';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  return (
    <section id="About" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-200">
            Tentang Saya
          </h2>
          <p className="mt-4 text-lg md:text-xl text-slate-300">
            Mengenal lebih jauh tentang perjalanan dan filosofi saya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6" data-aos="fade-right" data-aos-delay="200">
            <h3 className="text-2xl font-semibold text-slate-200">
              Latar Belakang & Filosofi
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Saya adalah seorang profesional di bidang Manajemen Operasional dengan minat yang mendalam pada Ilmu Komputer. Saya percaya bahwa efisiensi operasional dapat ditingkatkan secara signifikan melalui solusi teknologi yang cerdas dan terintegrasi.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Perjalanan saya dalam dunia teknologi dimulai dari keinginan untuk mengotomatisasi proses, menganalisis data, dan menciptakan sistem yang lebih intuitif. Saya terus belajar dan beradaptasi dengan teknologi terbaru untuk memberikan dampak positif.
            </p>
          </div>

          <div className="flex justify-center" data-aos="fade-left" data-aos-delay="400">
            {/* Menggunakan foto dari folder public dengan animasi AOS dan efek hover */}
            <img
              src="/Photo1.jpg"
              alt="Foto Profil Daffa Rizki Ariyanto"
              className="rounded-full object-cover w-64 h-64 md:w-80 md:h-80 border-4 border-slate-500 shadow-lg
                         transform transition-transform duration-300 hover:scale-105" /* Efek hover */
              data-aos="zoom-in" /* Animasi AOS */
              data-aos-delay="600" /* Delay animasi AOS */
            />
          </div>
        </div>

        <div className="mt-20 text-center" data-aos="fade-up" data-aos-delay="600">
          <h3 className="text-2xl font-semibold text-slate-100">
            Keterampilan & Nilai
          </h3>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Kombinasi unik antara pemikiran strategis operasional dan kemampuan teknis.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {SKILLS.map((skill, index) => (
              <div key={index} className={`p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/15 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                <h4 className="text-xl font-medium text-slate-200">{skill.name}</h4>
                       <p className="text-slate-300 text-sm mt-2">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
