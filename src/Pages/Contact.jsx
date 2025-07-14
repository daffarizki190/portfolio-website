import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Mail, Phone, MapPin, Send, Loader2, UserCircle2, Github, Linkedin, Instagram } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [submittedMessages, setSubmittedMessages] = useState([]);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setStatusMessage('Nama, Email, dan Pesan wajib diisi.');
        setIsSubmitting(false);
        return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newMessage = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date(),
      };

      setSubmittedMessages(prevMessages => [newMessage, ...prevMessages]);
      setStatusMessage('Pesan Anda telah terkirim dan ditampilkan di bawah!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatusMessage('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatMessageDate = (date) => {
    if (!date) return '';
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return 'Baru saja';
    if (diffMinutes < 60) return `${diffMinutes}m lalu`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}j lalu`;
    if (diffMinutes < 10080) return `${Math.floor(diffMinutes / 1440)}h lalu`;

    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
  };

  return (
    <section id="Contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Hubungi Saya
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Mari berkolaborasi atau sekadar menyapa!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8" data-aos="fade-right" data-aos-delay="200">
            {/* Bagian Informasi Kontak */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Informasi Kontak</h3>
                <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-300 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-400/20 flex items-center space-x-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-blue-100 text-blue-600">
                    <Mail className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">{CONTACT_INFO.email}</p>
                </div>
                </div>

                <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-300 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-400/20 flex items-center space-x-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-purple-100 text-purple-600">
                    <Phone className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">Telepon</h4>
                    <p className="text-gray-600">{CONTACT_INFO.phone}</p>
                </div>
                </div>

                <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-300 hover:border-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-400/20 flex items-center space-x-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-indigo-100 text-indigo-600">
                    <MapPin className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-800">Lokasi</h4>
                    <p className="text-gray-600">{CONTACT_INFO.location}</p>
                </div>
                </div>
            </div>

            {/* Bagian Tautan Sosial Media */}
            <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Media Sosial</h3>
                <div className="flex flex-wrap gap-4 justify-start">
                    <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-300 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center group">
                        <Github className="w-7 h-7 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </a>
                    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-300 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 flex items-center justify-center group">
                        <Linkedin className="w-7 h-7 text-blue-600 group-hover:text-purple-600 transition-colors" />
                    </a>
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-300 hover:border-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 flex items-center justify-center group">
                        <Instagram className="w-7 h-7 text-purple-600 group-hover:text-indigo-600 transition-colors" />
                    </a>
                </div>
            </div>
          </div>

          {/* Bagian Formulir Kirim Pesan */}
          <div className="p-8 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-300 shadow-lg" data-aos="fade-left" data-aos-delay="400">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Pesan Anda</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-sm resize-y"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Memposting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" /> Kirim Pesan
                  </>
                )}
              </button>
              {statusMessage && (
                <p className={`mt-4 text-center text-sm ${statusMessage.includes('Gagal') ? 'text-red-400' : 'text-green-400'}`}>
                  {statusMessage}
                </p>
              )}
            </form>

            {/* Bagian untuk menampilkan pesan yang dikirim - Disesuaikan untuk presisi dan keseimbangan */}
            <div className="mt-8 pt-8 border-t border-gray-300 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pesan Terkirim ({submittedMessages.length})</h3>
                {submittedMessages.length === 0 ? (
                    <div className="text-center py-4 text-gray-600">Belum ada pesan terkirim.</div>
                ) : (
                    <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                        {submittedMessages.map((msg) => (
                            <div key={msg.id} className="p-4 bg-white/80 rounded-lg border border-gray-300 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <UserCircle2 className="w-8 h-8 text-gray-600 flex-shrink-0" /> {/* Menambahkan flex-shrink-0 */}
                                    <div className="flex-grow"> {/* Memastikan div ini mengisi ruang yang tersedia */}
                                        <h4 className="font-medium text-gray-800">{msg.name}</h4>
                                        <p className="text-xs text-gray-600">{msg.email}</p>
                                    </div>
                                    <span className="ml-auto text-xs text-gray-500 whitespace-nowrap">{formatMessageDate(msg.createdAt)}</span> {/* Menambahkan whitespace-nowrap */}
                                </div>
                                <p className="text-gray-700 text-sm break-words">{msg.message}</p> {/* Menambahkan break-words */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
       <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(100, 100, 100, 0.5);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(100, 100, 100, 0.7);
                }
            `}</style>
    </section>
  );
};

export default Contact;
