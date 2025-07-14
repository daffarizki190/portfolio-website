import React, { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
} from "lucide-react";
 
import AOS from "aos";
import "aos/dist/aos.css";
import { SOCIAL_LINKS, TECH_STACK, TYPING_CONFIG } from '../constants';



const MainTitle = memo(function MainTitle() {
  return (
    <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
      <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
        <span className="relative inline-block">
          <span className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-20"></span>
          <span className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Manajemen
          </span>
        </span>
        <br />
        <div className="h-2 sm:h-4 md:h-6 lg:h-8"></div>
        <span className="relative inline-block">
          <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-500 blur-2xl opacity-20"></span>
          <span className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Operasional
          </span>
        </span>
      </h1>
    </div>
  );
});
MainTitle.displayName = "MainTitle";

function TechStack({ tech }) {
  return (
    <div className="px-4 py-2 hidden sm:block rounded-lg bg-black/20 backdrop-blur-sm border border-white/20 text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-300 shadow-sm">
      {tech}
    </div>
  );
}
TechStack.displayName = "TechStack";
TechStack.propTypes = {
  tech: PropTypes.string.isRequired,
};
const MemoizedTechStack = memo(TechStack);

function CTAButton({ href, text, icon: Icon }) {
  return (
    <a href={href} className="flex-shrink-0">
      <button className="group relative w-[160px] h-11">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-60 blur-md group-hover:opacity-100 transition-all duration-700"></div>
        <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-lg border border-gray-300 leading-none overflow-hidden flex items-center justify-center shadow-lg">
          <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-blue-500/20 to-purple-600/20"></div>
          <span className="relative flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-medium z-10">
              {text}
            </span>
            <Icon
              className={`w-4 h-4 text-gray-700 ${
                text === "Contact"
                  ? "group-hover:translate-x-1"
                  : "group-hover:rotate-45"
              } transform transition-all duration-300 z-10`}
            />
          </span>
        </div>
      </button>
    </a>
  );
}
CTAButton.displayName = "CTAButton";
CTAButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};
const MemoizedCTAButton = memo(CTAButton);

function SocialLinkComponent({ icon: Icon, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="group relative p-3">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
        <div className="relative rounded-xl bg-white/80 backdrop-blur-xl p-2 flex items-center justify-center border border-gray-300 group-hover:border-purple-600 transition-all duration-300 shadow-md">
          <Icon className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
        </div>
      </button>
    </a>
  );
}
SocialLinkComponent.displayName = "SocialLink";
SocialLinkComponent.propTypes = {
  icon: PropTypes.elementType.isRequired,
  link: PropTypes.string.isRequired,
};
const SocialLink = memo(SocialLinkComponent);

const SOCIAL_LINKS_WITH_ICONS = [
  { icon: Github, link: SOCIAL_LINKS.github },
  { icon: Linkedin, link: SOCIAL_LINKS.linkedin },
  { icon: Instagram, link: SOCIAL_LINKS.instagram },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
    });
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < TYPING_CONFIG.words[wordIndex].length) {
        setText((prev) => prev + TYPING_CONFIG.words[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), TYPING_CONFIG.pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % TYPING_CONFIG.words.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_CONFIG.typingSpeed : TYPING_CONFIG.erasingSpeed
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  return (
    <section id="Home" role="region" aria-labelledby="home-heading">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] pt-20 pb-8">
          <div className="flex flex-col lg:flex-row items-center justify-center md:justify-between gap-0 sm:gap-12 lg:gap-20">
            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-4 sm:space-y-6">
                <MainTitle />

                <div
                  className="h-8 flex items-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                  data-testid="typewriter-container"
                >
                  <span className="text-xl md:text-2xl text-slate-200 font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-blue-500 to-purple-600 ml-1 animate-blink"></span>
                </div>

                <p
                  className="text-base md:text-lg text-slate-200 max-w-xl font-light"
                >
                  Mengelola Operasional Parkir Secara Efisien dan Inovatif serta Menerapkan Teknologi Komputer untuk Solusi Cerdas dan Terintegrasi.
                </p>

                <div
                  className="flex flex-wrap gap-3 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <MemoizedTechStack key={index} tech={tech} />
                  ))}
                </div>

                <div
                  className="flex flex-row gap-3 w-full justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <MemoizedCTAButton
                    href="#Portofolio"
                    text="Experience"
                    icon={ExternalLink}
                  />
                  <MemoizedCTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                <div
                  className="hidden sm:flex gap-4 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  <span className="sr-only">Connect with me</span>
                  {SOCIAL_LINKS_WITH_ICONS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[400px] xl:h-[450px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full h-full max-w-md mx-auto">
                {/* Mengubah gradien blur di sekitar GIF untuk lebih menyatu */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-blue-500/40 to-purple-600/40 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-90 scale-105" : "opacity-50 scale-100"
                  }`}
                ></div>

                <div
                  className={`relative z-10 w-full h-full opacity-90 transform transition-transform duration-500 flex items-center justify-center ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}
                >
                  {/* Mengganti DotLottieReact dengan tag img untuk GIF lokal */}
                  <img
                    src="/Coding.gif"
                    alt="Coding Animation"
                    className="w-full h-full max-w-[320px] max-h-[320px] sm:max-w-[380px] sm:max-h-[380px] object-contain transition-all duration-500 group-hover:scale-102 rounded-3xl"
                  />
                </div>

                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}
                >
                  {/* Mengubah gradien blur yang berdenyut */}
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/40 to-purple-600/40 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110 opacity-70" : "scale-100 opacity-40"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Home);
