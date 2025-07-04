import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";

function CommentItemComponent({ comment, formatDate }) {
    return (
        <div className="px-4 pt-4 pb-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-start gap-3">
                {comment.profileImage ? (
                    <img
                        src={comment.profileImage}
                        alt={`${comment.userName}'s profile`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30"
                        loading="lazy"
                        onError={(e) => {
                            if (e.target instanceof HTMLImageElement) {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/40x40?text=User";
                            }
                        }}
                    />
                ) : (
                    <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
                        <UserCircle2 className="w-5 h-5" />
                    </div>
                )}
                <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                        <h4 className="font-medium text-white truncate">{comment.userName}</h4>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatDate(comment.createdAt)}
                        </span>
                    </div>
                    <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">{comment.content}</p>
                </div>
            </div>
        </div>
    );
}
CommentItemComponent.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        profileImage: PropTypes.string,
        createdAt: PropTypes.object,
    }).isRequired,
    formatDate: PropTypes.func.isRequired,
};
const CommentItem = memo(CommentItemComponent);
CommentItem.displayName = "CommentItem";

function CommentFormComponent({ onSubmit, isSubmitting }) {
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file maksimal adalah 5MB.');
                if (fileInputRef.current) fileInputRef.current.value = '';
                setImagePreview(null);
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    }, []);

    const handleTextareaChange = useCallback((e) => {
        setNewComment(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim()) {
            alert('Nama dan Pesan wajib diisi.');
            return;
        }
        onSubmit({ newComment, userName, profileImage: imagePreview });
        setNewComment('');
        setUserName('');
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }, [newComment, userName, imagePreview, onSubmit]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1000">
                <label htmlFor="userName" className="block text-sm font-medium text-white">
                    Nama <span className="text-red-400">*</span>
                </label>
                <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Daffa Rizki Ariyanto"
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    required
                />
            </div>

            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1200">
                <label htmlFor="message" className="block text-sm font-medium text-white">
                    Pesan <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="message"
                    ref={textareaRef}
                    value={newComment}
                    onChange={handleTextareaChange}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]"
                    required
                />
            </div>

            <div className="space-y-2" data-aos="fade-up" data-aos-duration="1400">
                <label htmlFor="profilePhoto" className="block text-sm font-medium text-white">
                    Foto Profil <span className="text-gray-400">(opsional)</span>
                </label>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                    {imagePreview ? (
                        <div className="flex items-center gap-4">
                            <img
                                src={imagePreview}
                                alt="Pratinjau profil"
                                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all group"
                            >
                                <X className="w-4 h-4" />
                                <span>Hapus Foto</span>
                            </button>
                        </div>
                    ) : (
                        <div className="w-full">
                            <input
                                id="profilePhoto"
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all border border-dashed border-indigo-500/50 hover:border-indigo-500 group"
                            >
                                <ImagePlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Pilih Foto Profil</span>
                            </button>
                            <p className="text-center text-gray-400 text-sm mt-2">
                                Ukuran file maks: 5MB
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting || !newComment.trim() || !userName.trim()}
                data-aos="fade-up" data-aos-duration="1000"
                className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Memposting...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>Kirim Komentar</span>
                        </>
                    )}
                </div>
            </button>
        </form>
    );
}
CommentFormComponent.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
};
const CommentForm = memo(CommentFormComponent);
CommentForm.displayName = "CommentForm";

const Komentar = () => {
    const [comments, setComments] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        AOS.init({
            once: false,
            duration: 1000,
        });
    }, []);

    const handleCommentSubmit = useCallback(async ({ newComment, userName, profileImage }) => {
        setError('');
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newLocalComment = {
                id: Date.now().toString(),
                content: newComment,
                userName,
                profileImage: profileImage,
                createdAt: { toDate: () => new Date() },
            };

            setComments(prevComments => [newLocalComment, ...prevComments]);

        } catch (submitError) {
            setError('Gagal memposting komentar. Terjadi kesalahan lokal.');
            console.error('Error adding comment locally: ', submitError);
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const formatDate = useCallback((timestamp) => {
        if (!timestamp || typeof timestamp.toDate !== 'function') {
            return 'Memuat...';
        }
        const date = timestamp.toDate();
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
    }, []);

    return (
        <div className="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl" data-aos="fade-up" data-aos-duration="1000">
            <div className="p-6 border-b border-white/10" data-aos="fade-down" data-aos-duration="800">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-indigo-500/20">
                        <MessageCircle className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Komentar <span className="text-indigo-400">({comments.length})</span>
                    </h3>
                </div>
            </div>
            <div className="p-6 space-y-6">
                {error && (
                    <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl" data-aos="fade-in">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <div>
                    <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} />
                </div>

                <div className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar" data-aos="fade-up" data-aos-delay="200">
                    {comments.length === 0 ? (
                        <div className="text-center py-8" data-aos="fade-in">
                            <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
                            <p className="text-gray-400">Belum ada komentar. Mulai percakapan!</p>
                        </div>
                    ) : (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                formatDate={formatDate}
                            />
                        ))
                    )}
                </div>
            </div>
            <style>
            {`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.5);
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.7);
                }
            `}
            </style>
        </div>
    );
};

export default Komentar;