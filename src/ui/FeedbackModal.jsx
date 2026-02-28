import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../services/supabaseClient';
import { FiMessageSquare, FiX, FiCheckCircle } from 'react-icons/fi';
import Button from './Button';

const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        feedback: '',
        suggestion: '',
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If Supabase isn't configured, just simulate success for now
        if (!supabase) {
            setStatus('submitting');
            setTimeout(() => {
                setStatus('success');
                setTimeout(() => closeAndReset(), 3000);
            }, 1000);
            return;
        }

        setStatus('submitting');
        try {
            const { error } = await supabase
                .from('feedback')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    rating: parseInt(formData.rating),
                    feedback: formData.feedback,
                    suggestion: formData.suggestion,
                }]);

            if (error) throw error;
            setStatus('success');
            setTimeout(() => closeAndReset(), 3000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setStatus('error');
        }
    };

    const closeAndReset = () => {
        setIsOpen(false);
        setStatus('idle');
        setFormData({ name: '', email: '', rating: 5, feedback: '', suggestion: '' });
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 1 } }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255, 0, 85, 0.6)' }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-28 right-8 z-40 p-4 rounded-full bg-secondary/20 backdrop-blur-md border border-secondary/50 text-white shadow-[0_0_15px_rgba(255,0,85,0.3)] hover:bg-secondary hover:text-white transition-colors duration-300 focus:outline-none hidden md:flex"
                aria-label="Give Feedback"
            >
                <FiMessageSquare className="w-6 h-6" />
            </motion.button>

            {/* Modal Backdrop & Form */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeAndReset}
                            className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="glass border border-white/20 p-8 rounded-2xl relative w-full max-w-lg z-10 shadow-2xl"
                        >
                            <button
                                onClick={closeAndReset}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                title="Close"
                            >
                                <FiX size={24} />
                            </button>

                            <h2 className="text-2xl font-display font-bold text-white mb-2">We value your feedback</h2>
                            <p className="text-gray-400 text-sm mb-6">Help us improve the SSGPL tournament experience.</p>

                            {status === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-primary mb-4"
                                    >
                                        <FiCheckCircle size={64} />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
                                    <p className="text-gray-300">Your feedback has been submitted successfully.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary focus:bg-white/10 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Email</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary focus:bg-white/10 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Rating: {formData.rating}/10</label>
                                        <input
                                            type="range"
                                            name="rating"
                                            min="1"
                                            max="10"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            className="w-full accent-primary h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Feedback</label>
                                        <textarea
                                            required
                                            name="feedback"
                                            rows="3"
                                            value={formData.feedback}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary focus:bg-white/10 transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">Suggestions (Optional)</label>
                                        <textarea
                                            name="suggestion"
                                            rows="2"
                                            value={formData.suggestion}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-primary focus:bg-white/10 transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <p className="text-red-400 text-sm">Error submitting feedback. Please try again.</p>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full justify-center mt-2"
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                                    </Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FeedbackModal;
