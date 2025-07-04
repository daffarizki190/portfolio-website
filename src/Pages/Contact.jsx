import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";

const SocialLinks = () => (
  <div className="flex flex-wrap justify-center gap-4 text-gray-400">
    <a href="https://www.linkedin.com/in/daffa-rizki-ariyanto-4931a7150" target="_blank" rel="noopener noreferrer" className="hover:text-[#6366f1] transition-colors flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/></svg>
      LinkedIn
    </a>
    <a href="mailto:youremail@example.com" className="hover:text-[#6366f1] transition-colors flex items-center gap-1">
      <Mail className="w-5 h-5" />
      Email
    </a>
    <a href="https://github.com/daffarizki190" target="_blank" rel="noopener noreferrer" className="hover:text-[#6366f1] transition-colors flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.5 0 4.1-1.7 4.1-3.6 0-1.2-.5-2.2-1.3-3 0 0-1.7-.5-5.5 1.3-.5-.2-1.2-.3-1.9-.3-.7 0-1.4.1-1.9.3-3.8-1.8-5.5-1.3-5.5-1.3-.8.8-1.3 1.8-1.3 3 0 1.9.6 3.6 4.1 3.6a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.5 1.2-4.5 4.5-5 5"/><path d="M15 18c4.5 1.2 4.5 4.5 5 5"/></svg>
      GitHub
    </a>
    <a href="https://www.instagram.com/daffa_rizki190/" target="_blank" rel="noopener noreferrer" className="hover:text-[#6366f1] transition-colors flex items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>
      Instagram
    </a>
  </div>
);

const Komentar = () => {
  const [commentName, setCommentName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentName && commentMessage) {
      setComments([...comments, { name: commentName, message: commentMessage }]);
      setCommentName("");
      setCommentMessage("");
      alert("Komentar berhasil ditambahkan!");
    } else {
      alert("Nama dan pesan komentar tidak boleh kosong.");
    }
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Comments ({comments.length})
        </h3>
      </div>

      <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
        <div className="relative group">
          <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
          <input
            type="text"
            placeholder="Name"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30"
            required
          />
        </div>
        <div className="relative group">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
          <textarea
            placeholder="Write your message here..."
            value={commentMessage}
            onChange={(e) => setCommentMessage(e.target.value)}
            className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[8rem]"
            required
          />
        </div>
        <div className="text-center text-gray-500 text-sm">
          Profile Photo (optional)
        </div>
        <button
          type="button"
          className="w-full bg-white/10 text-gray-400 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          Choose Profile Photo
        </button>
        <p className="text-gray-500 text-xs text-center mt-1">Max file size: 5MB</p>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Post Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-white/10">
            <div className="flex-shrink-0">
              <img
                src={`https://placehold.co/40x40/${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}/ffffff?text=${comment.name.charAt(0).toUpperCase()}`}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-white">{comment.name}</p>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>
              <p className="text-gray-300 text-sm mt-1">{comment.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Preparing email...', formData);
    alert('Preparing email... Please confirm in your email client.');

    try {
      const { name, email, message } = formData;
      const subject = encodeURIComponent(`Message from ${name} (${email})`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      // Replace 'kabirsingh@gmail.com' with your actual email address
      const mailtoUrl = `mailto:kabirsingh@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      await new Promise(resolve => setTimeout(resolve, 500));

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      console.log('Email client should have opened.');
    } catch (error) {
      console.error('Error opening email client:', error);
      alert('Error! Could not open email client. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question? Send me a message, and I&apos;ll get back to you soon.
        </p>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          <div
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Have something to discuss? Send me a message and let&apos;s talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
            </div>

            <form
              onSubmit={handleSubmit} // Form submission handled by JS
              className="space-y-6"
            >
              {/* Removed hidden inputs for FormSubmit as we are using mailto now */}
              <div
                className="relative group"
              >
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                className="relative group"
              >
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                  required
                />
              </div>
              <div
                className="relative group"
              >
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Preparing Email...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-300 hover:shadow-[#6366f1]/10">
            <Komentar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
