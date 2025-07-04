import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Code, Boxes } from "lucide-react";
import { motion } from "framer-motion";

const CardProject = ({ Img, Title, Description, Link }) => (
  <div className="bg-gray-800 rounded-lg p-4 shadow-lg text-white">
    <img
      src={Img || "https://placehold.co/300x200?text=Project"}
      alt={Title}
      className="w-full h-40 object-cover rounded-md mb-4"
      onError={(e) => {
        if (e.target instanceof HTMLImageElement) {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x200?text=Image+Error";
        }
      }}
    />
    <h3 className="text-xl font-bold">{Title}</h3>
    <p className="text-gray-400 text-sm mt-2">{Description}</p>
    <a href={Link || "#"} className="text-purple-400 hover:underline mt-4 block">
      Lihat Proyek
    </a>
  </div>
);
CardProject.propTypes = {
  Img: PropTypes.string,
  Title: PropTypes.string,
  Description: PropTypes.string,
  Link: PropTypes.string,
};

const TechStackIcon = ({ TechStackIcon, Language }) => (
  <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-lg border border-white/10 hover:scale-105 transition-transform duration-300">
    <img
      src={`/${TechStackIcon}`}
      alt={Language}
      className="w-12 h-12 mb-2"
      onError={(e) => {
        if (e.target instanceof HTMLImageElement) {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/48x48?text=Icon";
        }
      }}
    />
    <span className="text-sm text-gray-300">{Language}</span>
  </div>
);
TechStackIcon.propTypes = {
  TechStackIcon: PropTypes.string.isRequired,
  Language: PropTypes.string.isRequired,
};

const Certificate = ({ ImgSertif }) => (
  <div className="bg-gray-800 rounded-lg p-4 shadow-lg text-white">
    <img
      src={ImgSertif || "https://placehold.co/300x200?text=Certificate"}
      alt="Sertifikat"
      className="w-full h-40 object-cover rounded-md mb-4"
      onError={(e) => {
        if (e.target instanceof HTMLImageElement) {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x200?text=Image+Error";
        }
      }}
    />
    <p className="text-gray-400 text-sm mt-2">Sertifikat Penyelesaian</p>
  </div>
);
Certificate.propTypes = {
  ImgSertif: PropTypes.string,
};

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300
      hover:text-white
      text-sm
      font-medium
      transition-all
      duration-300
      ease-in-out
      flex
      items-center
      gap-2
      bg-white/5
      hover:bg-white/10
      rounded-md
      border
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform
          duration-300
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);
ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "nodejs.svg", language: "Node JS" },
];

const experiencesData = [
  {
    role: "Leader Operasional Parking (Gandaria City)",
    company: "PT. CENTREPARK CITRA CORPORA",
    period: "September 2024 - Sekarang",
    tasks: [
      "Memimpin tim 25+ staff dalam operasional parkir di Gandaria City dengan kapasitas 2000+ kendaraan per hari.",
      "Mengoptimalkan sistem parkir yang menghasilkan peningkatan efisiensi waktu pelayanan sebesar 25%.",
      "Mengembangkan dan menerapkan SOP baru yang meningkatkan kepuasan pelanggan hingga 90%.",
      "Mengelola dan menyelesaikan keluhan pelanggan dengan tingkat resolusi 95% dalam 24 jam.",
      "Melakukan pelatihan rutin tim untuk meningkatkan standar pelayanan dan keselamatan."
    ]
  },
  {
    role: "Leader Operasional Parking (Distrik 8 SCBD)",
    company: "PT. CENTREPARK CITRA CORPORA",
    period: "Juli 2024 - September 2024",
    tasks: [
      "Mengelola operasional parkir premium di area SCBD dengan standar pelayanan tinggi.",
      "Mengimplementasikan sistem rotasi shift yang meningkatkan produktivitas tim sebesar 20%.",
      "Berkoordinasi dengan manajemen gedung untuk optimalisasi layanan valet dan parkir VIP.",
      "Mengurangi waktu tunggu pelanggan hingga 40% melalui perbaikan sistem antrian."
    ]
  },
  {
    role: "Kasir Parking (RS Medistra)",
    company: "PT. IPM",
    period: "Februari 2020 - Juli 2024",
    tasks: [
      "Mengelola transaksi pembayaran parkir dengan rata-rata 500+ kendaraan per hari.",
      "Memastikan akurasi 100% dalam pencatatan keuangan dan rekonsiliasi harian.",
      "Memberikan pelayanan prima kepada pengunjung rumah sakit dengan empati dan profesionalisme.",
      "Mengoptimalkan proses pembayaran untuk mengurangi waktu antrian di loket."
    ]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      <div className="text-center pb-10">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Tampilan Portofolio
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Jelajahi perjalanan saya melalui pengalaman kerja dan keahlian teknis.
          Setiap bagian mewakili tonggak penting dalam jalur pembelajaran berkelanjutan saya.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Work Experience"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 gap-5 w-full">
              {experiencesData.map((exp, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-purple-400">{exp.company} • {exp.period}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.tasks.map((task, i) => (
                      <li key={i} className="text-gray-300 flex items-start">
                        <span className="mr-2 text-purple-400">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {techStacks.map((stack, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}