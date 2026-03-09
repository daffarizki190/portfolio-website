// mockAiLogic.js
// This creates a simulated AI response system based on keywords without needing a real LLM API Key.
// Perfect for frontend-only portfolio bots.

const responses = [
    {
        keywords: /(siapa|who|nama|identitas|profil)/i,
        answer: "Halo! Saya adalah Asisten AI Pribadi milik Daffa Rizki Ariyanto. Daffa adalah seorang Full Stack Developer dan Creative Coder asal Jakarta yang berfokus pada pengalaman web modern dan interaktif. Ada yang ingin kamu ketahui tentang skill atau proyeknya?"
    },
    {
        keywords: /(skill|kemampuan|bisa apa|teknologi|tech stack|bahasa pemrograman)/i,
        answer: "Daffa menguasai berbagai teknologi modern! Di bagian Frontend, ia ahli menggunakan React, Vite, Tailwind CSS, dan Framer Motion. Di Backend, ia menggunakan Node.js, Express, dan MongoDB. Ia juga berpengalaman dengan IoT lho!"
    },
    {
        keywords: /(proyek|project|karya|buat apa|portofolio)/i,
        answer: "Beberapa proyek unggulan Daffa meliputi:\n1. E-Commerce Platform (MERN Stack)\n2. Interactive 3D Portfolio (React + Framer Motion)\n3. Smart IoT Dashboard.\nKamu bisa klik ke tombol 'Portfolio' di atas untuk melihat detail lengkapnya!"
    },
    {
        keywords: /(kontak|hubungi|sosmed|instagram|github|linkedin|email)/i,
        answer: "Kamu bisa menghubungi Daffa melalui email di daffarizki190@gmail.com, atau lewat form kontak di bagian bawah website ini. Daffa juga aktif di GitHub (@daffarizki190) dan LinkedIn!"
    },
    {
        keywords: /(halo|hai|hey|hi|hello|pagi|siang|malam)/i,
        answer: "Halo! Bip bop... 🤖 Selamat datang di portofolio Daffa. Ketik 'skill' atau 'projek' kalau kamu ingin tahu kemampuan pencipta saya!"
    },
    {
        keywords: /(keren|bagus|mantap|cool|awesome|amazing)/i,
        answer: "Terima kasih banyak! Daffa sangat berdedikasi membangun website dengan desain yang estetis dan performa tinggi sekelas ini. Jangan ragu untuk menghubunginya ya!"
    },
    {
        keywords: /(pacar|cewek|pasangan|cinta|love)/i,
        answer: "Haha, sebagai AI, saya tidak diprogram untuk menjawab kehidupan asmara pencipta saya. Lebih baik tanya langsung ke orangnya lewat email! 😜"
    },
    {
        keywords: /(kamu siapa|apa ini|robot)/i,
        answer: "Saya hanyalah sebuah entitas digital, sebuah proyek kecil yang diciptakan untuk menemani penjelajahanmu di website ini. Saya tidak punya tubuh fisik, tapi saya punya informasi lengkap tentang Daffa!"
    }
];

export const getAiResponse = (userMessage) => {
    return new Promise((resolve) => {
        // Simulate thinking delay to make it feel like real AI
        setTimeout(() => {
            const lowerMessage = userMessage.toLowerCase();

            // Look for a matching keyword
            const match = responses.find(item => item.keywords.test(lowerMessage));

            if (match) {
                resolve(match.answer);
            } else {
                // Fallback response if no keywords matched
                resolve("Maaf, memori AI saya belum memuat jawaban untuk itu. 🤖 Kenapa tidak langsung kirim email ke Daffa di section kontak bawah? Dia akan dengan senang hati menjawabmu!");
            }
        }, 1200 + Math.random() * 1000); // Random delay between 1.2s and 2.2s
    });
};
