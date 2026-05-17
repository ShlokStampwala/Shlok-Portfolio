import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Send data to Web3Forms API instead of our backend
      const payload = {
        ...formData,
        access_key: "2607e3b0-9b82-44cd-a43a-112c08e2b316"
      };

      const response = await axios.post('https://api.web3forms.com/submit', payload);

      if (response.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(response.data.message || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.response?.data?.message || err.message || 'Failed to send. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-section)' }}>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side — Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 italic t-primary">Let's Connect</h2>
            <p className="t-secondary mb-12 text-lg">
              Open for collaborations, interesting projects, or just a friendly chat.
              Let's build something extraordinary together.
            </p>

            <div className="space-y-8">
              {[
                { icon: <Mail size={24} />, label: "Email Me", value: "shlokstampwala@gmail.com", href: "mailto:shlokstampwala@gmail.com", color: "text-primary", bgHover: "hover:bg-primary/10" },
                { icon: <MessageSquare size={24} />, label: "WhatsApp", value: "+91 9313789605", href: "https://wa.me/919313789605", color: "text-secondary", bgHover: "hover:bg-secondary/10" },
                { icon: <MapPin size={24} />, label: "Location", value: "Anand, Gujarat, India", color: "text-accent", bgHover: "hover:bg-accent/10" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-6 group">
                  <div className={`w-14 h-14 glass rounded-2xl flex items-center justify-center ${item.color} ${item.bgHover} transition-all`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="t-muted text-xs uppercase tracking-widest font-bold mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className={`text-lg font-bold t-primary ${item.color} hover:opacity-80 transition-opacity`}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-bold t-primary">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side — Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <form onSubmit={handleSubmit} className="glass p-10 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold t-muted ml-1 block">NAME</label>
                  <input id="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold t-muted ml-1 block">EMAIL</label>
                  <input id="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold t-muted ml-1 block">MESSAGE</label>
                <textarea id="message" rows="5" required value={formData.message} onChange={handleChange} placeholder="Your message here..." className="resize-none" />
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center gap-2 text-green-500 font-bold py-5">
                    <CheckCircle2 size={20} /> Message sent successfully!
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center items-center gap-2 text-red-500 font-bold py-5 text-center">
                    <AlertCircle size={20} /> {errorMessage}
                  </motion.div>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-black font-bold py-5 rounded-xl shadow-lg shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {status === 'loading' ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <>Send Message <Send size={18} /></>}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
