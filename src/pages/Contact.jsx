import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiSend, FiCheck } from 'react-icons/fi'
import { FaPhoneAlt, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md'

const contactInfo = [
  { icon: <FaPhoneAlt size={15} />, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: <FaWhatsapp size={17} />, label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210' },
  { icon: <MdEmail size={17} />, label: 'Email', value: 'travel.antima@gmail.com', href: 'mailto:travel.antima@gmail.com' },
  { icon: <FaInstagram size={16} />, label: 'Instagram', value: '@travel_with_antima', href: 'https://www.instagram.com/travel_with_antima/' },
  { icon: <MdLocationOn size={18} />, label: 'Location', value: 'Pan-India Services', href: null },
  { icon: <MdAccessTime size={17} />, label: 'Working Hours', value: 'Mon–Sat · 9 AM to 8 PM', href: null },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1200))
    console.log('Contact form:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label mb-3">Get In Touch</p>
          <h1 className="font-playfair text-white font-black mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            Let's Plan Your Trip
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Reach out to Antima — we reply within 24 hours
          </p>
        </motion.div>
      </section>

      <section className="bg-brand-dark py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-white text-3xl font-bold mb-3">We'd Love to Hear from You</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Whether you have a dream destination in mind or need help deciding — Antima is here to craft the perfect journey, tailored just for you.
              </p>

              <div className="space-y-5">
                {contactInfo.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs font-semibold font-dm uppercase tracking-wide">{label}</div>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="text-white text-sm hover:text-brand-gold transition-colors no-underline">
                          {value}
                        </a>
                      ) : (
                        <div className="text-white text-sm">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick reach */}
              <div className="mt-8 p-5 bg-brand-navy border border-brand-gold/15 rounded-2xl">
                <p className="text-slate-300 text-sm font-semibold mb-3">Quickest way to reach Antima:</p>
                <a
                  href="https://wa.me/919876543210?text=Hi Antima! I'd like to enquire about a travel package."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-sm font-semibold font-dm hover:bg-green-500/20 transition-colors no-underline"
                >
                  <FaWhatsapp size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-3 bg-brand-navy border border-white/[0.07] rounded-3xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
                    <FiCheck size={36} className="text-green-400" />
                  </div>
                  <h3 className="font-playfair text-white text-2xl font-bold mb-3">Message Sent!</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Thank you for reaching out! Antima will get back to you within <span className="text-brand-gold font-semibold">24 hours</span>.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-ghost">Send Another</button>
                </div>
              ) : (
                <>
                  <h3 className="font-playfair text-white text-2xl font-bold mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                          Full Name <span className="text-brand-gold">*</span>
                        </label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="Your full name"
                          className="input-field"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                          Phone <span className="text-brand-gold">*</span>
                        </label>
                        <input
                          {...register('phone', {
                            required: 'Phone is required',
                            pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid mobile number' }
                          })}
                          placeholder="+91 98765 43210"
                          className="input-field"
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        {...register('email', {
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter valid email' }
                        })}
                        type="email"
                        placeholder="your@email.com"
                        className="input-field"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                        Destination / Package Interest
                      </label>
                      <input
                        {...register('destination')}
                        placeholder="E.g. Kerala, Golden Triangle, custom trip..."
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                        Your Message <span className="text-brand-gold">*</span>
                      </label>
                      <textarea
                        {...register('message', { required: 'Please write a message' })}
                        rows={4}
                        placeholder="Tell us about your dream trip, travel dates, group size..."
                        className="input-field resize-none"
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend size={14} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
