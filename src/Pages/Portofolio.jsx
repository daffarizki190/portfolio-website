import React from "react";
import { Tab } from "@headlessui/react";
import { Code, Boxes, FolderGit2, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { techStacks, experiencesData, projectsData } from "../constants/portofolio"; // Import data from constants/portofolio.js
import { useAnimation } from "../hooks/useAnimation";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Portfolio = () => {
  const { containerVariants, itemVariants } = useAnimation();

  return (
    <section id="Portofolio" className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Portfolio</h2>
          <p className="mt-4 text-lg md:text-xl text-gray-300">My Work Experience, Tech Skills & Projects</p>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <Tab.Group>
            <Tab.List className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded-xl bg-gray-700/50 p-2">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all duration-300',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-sky-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-sky-600 text-white shadow-lg scale-[1.02]'
                      : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Code size={18} />
                    <span className="font-semibold text-base">Work Experience</span>
                  </div>
                  <p className="text-xs opacity-80">My Professional Journey</p>
                </div>
              </Tab>

              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all duration-300',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-sky-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-sky-600 text-white shadow-lg scale-[1.02]'
                      : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <FolderGit2 size={18} />
                    <span className="font-semibold text-base">My Projects</span>
                  </div>
                  <p className="text-xs opacity-80">Selected Web Projects</p>
                </div>
              </Tab>

              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all duration-300',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-sky-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-sky-600 text-white shadow-lg scale-[1.02]'
                      : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Boxes size={18} />
                    <span className="font-semibold text-base">Tech Stack</span>
                  </div>
                  <p className="text-xs opacity-80">Technologies I Work With</p>
                </div>
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-8">
              {/* Work Experience Panel */}
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-gray-800/30 p-6 shadow-xl',
                  'focus:outline-none border border-slate-700/50'
                )}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-0 relative border-l border-gray-600 ml-4 lg:ml-8"
                >
                  {experiencesData.map((exp, index) => (
                    <motion.div key={index} variants={itemVariants} className="relative pl-8 py-6 group">
                      {/* Timeline Dot */}
                      <div className="absolute w-4 h-4 bg-gray-700 rounded-full -left-[8.5px] top-8 border-2 border-gray-900 group-hover:bg-sky-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(56,189,248,0)] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.6)]"></div>

                      {/* Card Content */}
                      <div className="bg-gray-800/60 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-sky-500/50 hover:bg-gray-800 transition-all duration-300">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                          <p className="text-sky-400 font-semibold text-lg">{exp.company}</p>
                          <p className="text-gray-400 text-sm mt-1">{exp.period}</p>
                        </div>
                        <ul className="space-y-3 text-gray-300 leading-relaxed">
                          {exp.tasks.map((task, i) => (
                            <li key={i} className="text-sm md:text-base flex items-start">
                              <span className="text-sky-400 mr-3 mt-1 flex-shrink-0">•</span>
                              <span className="text-justify">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Tab.Panel>

              {/* GitHub Projects Panel */}
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-gray-800/30 p-6 shadow-xl',
                  'focus:outline-none border border-slate-700/50'
                )}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                >
                  {projectsData.map((project, index) => (
                    <motion.div key={index} variants={itemVariants} className="h-full">
                      <div className="bg-gray-800/80 rounded-xl border border-gray-700 hover:border-sky-500/50 transition-all duration-300 h-full flex flex-col group relative overflow-hidden shadow-lg">
                        {/* Soft glow effect on hover */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

                        <div className="relative z-10 flex flex-col h-full bg-gray-800/90 rounded-xl overflow-hidden">
                          {/* Image Thumbnail Section */}
                          <div className="w-full h-48 sm:h-56 relative border-b border-gray-700 bg-gray-900 overflow-hidden group-hover:bg-gray-800 transition-colors">
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90 pointer-events-none"></div>

                            {/* Live Demo Link on Top Right (Conditional) */}
                            {project.live_demo && (
                              <div className="absolute top-4 right-4">
                                <a href={project.live_demo} target="_blank" rel="noopener noreferrer"
                                  className="bg-sky-500/20 text-sky-300 hover:bg-sky-500 hover:text-white backdrop-blur-md p-2 rounded-full transition-all duration-300 flex items-center shadow-lg border border-sky-500/30"
                                  title="View Live Demo">
                                  <ExternalLink size={16} />
                                </a>
                              </div>
                            )}

                          </div>

                          <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors mb-3 line-clamp-2">
                              {project.name}
                            </h3>

                            <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                              {project.description}
                            </p>

                            <div className="mt-auto pt-5 border-t border-gray-700/60">
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-slate-700 hover:bg-sky-600/90 py-2.5 rounded-lg transition-all duration-300 shadow hover:shadow-sky-500/20"
                              >
                                <Github size={18} />
                                View Source Code
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Tab.Panel>

              {/* Tech Stack Panel */}
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-gray-800/30 p-8 shadow-xl',
                  'focus:outline-none border border-slate-700/50'
                )}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                  {techStacks.map((tech, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-sky-500 hover:bg-gray-800 transition-all duration-300 cursor-pointer group hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="h-16 w-16 mb-4 flex items-center justify-center">
                        <img
                          src={`/${tech.icon}`}
                          alt={tech.language}
                          className="max-h-full max-w-full drop-shadow-md group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all"
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors text-center">{tech.language}</p>
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