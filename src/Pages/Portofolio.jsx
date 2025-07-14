import React from "react";
import { Tab } from "@headlessui/react";
import { Code, Boxes } from "lucide-react";
import { motion } from "framer-motion";
import { techStacks, experiencesData } from "../constants/portofolio"; // Import data from constants/portofolio.js
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
          <p className="mt-4 text-lg md:text-xl text-gray-300">My Work Experience & Tech Skills</p>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-700/50 p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-sky-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-sky-600 text-white shadow'
                      : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2">
                    <Code size={16} />
                    <span>Work Experience</span>
                  </div>
                  <p className="text-xs text-gray-400">My Professional Journey</p>
                </div>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-sky-500 ring-white ring-opacity-60',
                    selected
                      ? 'bg-sky-600 text-white shadow'
                      : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2">
                    <Boxes size={16} />
                    <span>Tech Stack</span>
                  </div>
                  <p className="text-xs text-gray-400">Technologies I Work With</p>
                </div>
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              {/* Work Experience Panel */}
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-gray-800/30 p-3',
                  'focus:outline-none'
                )}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-8"
                >
                  {experiencesData.map((exp, index) => (
                    <motion.div key={index} variants={itemVariants} className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2">{exp.role}</h3>
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
                    </motion.div>
                  ))}
                </motion.div>
              </Tab.Panel>

              {/* Tech Stack Panel */}
              <Tab.Panel
                className={classNames(
                  'rounded-xl bg-gray-800/30 p-3',
                  'focus:outline-none'
                )}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                >
                  {techStacks.map((tech, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <div className="flex flex-col items-center">
                        {/* Displaying the icons */}
                        <img
                          src={`/${tech.icon}`} // Icons are in public folder root
                          alt={tech.language}
                          className="h-12 w-12"
                        />
                        <p className="text-sm text-gray-200 mt-2">{tech.language}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;