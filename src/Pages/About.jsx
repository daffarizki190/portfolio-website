import React, { useEffect } from 'react';
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
            Mengenal lebih jauh tentang perjalanan, pendidikan, dan keahlian saya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6" data-aos="fade-right" data-aos-delay="200">
            <h3 className="text-2xl font-semibold text-slate-200">
              Latar Belakang Profesional
            </h3>
            <div className="text-slate-300 leading-relaxed text-justify space-y-4">
              <p>
                Saya adalah mahasiswa Ilmu Komputer di Universitas Bumigora yang memiliki minat besar pada integrasi teknologi informasi dan efisiensi operasional.
              </p>
              <p>
                Berbekal pengalaman profesional di bidang manajemen operasional parkir, saya kini fokus mengembangkan keahlian dalam pembangunan aplikasi web menggunakan React & Node.js serta sistem IoT. Saya percaya bahwa inovasi terbaik lahir dari pemahaman mendalam terhadap kendala nyata di lapangan.
              </p>
            </div>

            <div className="pt-6 space-y-6 border-t border-slate-700/50">
              <div>
                <h4 className="text-xl font-semibold text-slate-200 mb-3">Pendidikan</h4>
                <div className="flex items-center space-x-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700">
                  <div className="bg-sky-500/20 p-2 rounded-lg">🎓</div>
                  <div>
                    <p className="font-medium text-slate-200">Universitas Bumigora</p>
                    <p className="text-sm text-slate-400">S1, Ilmu Komputer (Sekarang)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-200 mb-3">Bahasa</h4>
                  <div className="flex flex-col gap-2">
                    <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-medium w-fit">🇮🇩 Indonesia - Proficient</span>
                    <span className="px-3 py-1.5 bg-slate-700/50 text-slate-300 border border-slate-600 rounded-full text-sm font-medium w-fit">🇬🇧 English - Intermediate</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-200 mb-3">Hobi</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Photography', 'Swimming', 'Open Source'].map((hobby) => (
                      <span key={hobby} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-medium">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-12" data-aos="fade-left" data-aos-delay="400">
            {/* Menggunakan foto dari folder public dengan animasi AOS dan efek hover */}
            <div className="relative group">
              <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
              <img
                src="/Photo1.jpg"
                alt="Foto Profil Daffa Rizki Ariyanto"
                className="relative rounded-full object-cover w-64 h-64 md:w-80 md:h-80 border-4 border-slate-700 shadow-2xl
                           transform transition-transform duration-500 group-hover:scale-[1.02]"
                data-aos="zoom-in"
                data-aos-delay="600"
              />
            </div>

            <div className="w-full max-w-sm">
              <h3 className="text-xl font-semibold text-slate-100 text-center mb-6">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration'].map((skill, index) => (
                  <div key={index} className="px-4 py-3 bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/50 text-center hover:border-sky-500/50 hover:bg-slate-800/60 transition-all shadow-sm">
                    <h4 className="text-sm font-medium text-slate-300">{skill}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
