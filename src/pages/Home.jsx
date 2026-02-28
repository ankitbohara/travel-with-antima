import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import PackageCard from '@/components/PackageCard'
import SectionHeader from '@/components/SectionHeader'
import { fetchPackages, fetchTestimonials } from '@/services/api'
import { useApp } from '@/context/AppContext'

const stats = [
  { value: '500+', label: 'Happy Travellers' },
  { value: '50+', label: 'Destinations' },
  { value: '5★', label: 'Average Rating' },
  { value: '3+', label: 'Years Experience' },
]

const whyUs = [
  { icon: '🗺️', title: 'Personalised Plans', desc: 'Every itinerary tailored to your preferences, budget and dream destination.' },
  { icon: '🏨', title: 'Curated Stays', desc: 'Handpicked hotels from heritage palaces to charming boutique homestays.' },
  { icon: '📱', title: '24/7 Support', desc: 'Antima is always just a WhatsApp away during your entire journey.' },
  { icon: '💰', title: 'Best Value', desc: 'Transparent pricing with zero hidden charges. Always honest.' },
  { icon: '🎯', title: 'Local Expertise', desc: 'Deep destination knowledge ensures authentic, off-the-beaten-path experiences.' },
  { icon: '🌟', title: 'Memories Made', desc: 'Over 500 happy travellers and counting. Your story begins here.' },
]

export default function Home() {
  const { openEnquiry } = useApp()
  const [packages, setPackages] = useState([])
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    fetchPackages({ featured: true }).then(setPackages).catch(console.error)
    fetchTestimonials({ featured: true }).then(setTestimonials).catch(console.error)
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=80')",
            filter: 'brightness(0.3)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent" />
        <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full border border-brand-gold/15 animate-float hidden lg:block" />
        <div className="absolute top-1/3 right-16 w-48 h-48 rounded-full border border-brand-gold/10 animate-float hidden lg:block" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand-gold/15 border border-brand-gold/35 rounded-full px-4 py-2 mb-7">
              <span className="text-brand-gold text-xs">✈</span>
              <span className="text-brand-gold text-xs font-semibold tracking-widest uppercase">India's Most Trusted Travel Partner</span>
            </motion.div>

            <h1 className="font-playfair font-black text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
              Discover the<br />
              <span className="shimmer-text">Magic of India</span>
            </h1>

            <p className="text-slate-400 max-w-xl leading-relaxed mb-10"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
              Handcrafted journeys across India's most breathtaking destinations.
              Expert curation by Antima — your personal travel partner.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link to="/packages" className="btn-primary flex items-center gap-2 text-base no-underline">
                Explore Packages <FiArrowRight />
              </Link>
              <button onClick={() => openEnquiry()} className="btn-outline text-base">
                Get Free Quote
              </button>
            </div>

            <div className="flex flex-wrap gap-12">
              {stats.map(({ value, label }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}>
                  <div className="font-playfair text-brand-gold text-4xl font-black leading-none">{value}</div>
                  <div className="text-slate-500 text-xs mt-1 font-dm">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Packages ── */}
      <section className="bg-brand-dark py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Packages" title="Handpicked Experiences"
            subtitle="Every journey curated with love, local expertise and an eye for detail" />
          {packages.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {[...Array(3)].map((_, i) => <div key={i} className="card h-80 animate-pulse bg-white/5 rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {packages.slice(0, 3).map((pkg, i) => <PackageCard key={pkg._id} pkg={pkg} index={i} />)}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/packages" className="btn-primary inline-flex items-center gap-2 no-underline">
              View All Packages <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-brand-navy py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Why Travel with Antima" title="Your Journey, Our Passion"
            subtitle="We go beyond booking — we create experiences worth remembering" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-brand-gold/25 hover:bg-brand-gold/[0.03] transition-all duration-300">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-playfair text-white text-lg font-bold mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <section className="bg-brand-dark py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader label="Reviews" title="What Our Travellers Say"
              subtitle="Real stories from real explorers" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div key={t._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-7">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => <span key={s} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-4">"{t.text}"</p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: t.color }}>{t.avatar}</div>
                      <div>
                        <div className="text-white text-sm font-semibold">{t.name}</div>
                        <div className="text-slate-500 text-xs">{t.city}</div>
                      </div>
                    </div>
                    <span className="text-xs text-brand-gold/70 bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-lg">{t.trip}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/testimonials" className="btn-ghost inline-flex items-center gap-2 no-underline">
                See All Reviews <FiArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="bg-gold-red py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-playfair text-white font-black mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Ready for Your Dream Vacation?
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-lg mx-auto">
            Let Antima plan the perfect trip for you — stress-free, personalised, and unforgettable
          </p>
          <button onClick={() => openEnquiry()}
            className="bg-white text-red-500 font-bold font-dm text-lg px-10 py-3.5 rounded-full hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer border-none">
            Start Planning Today
          </button>
        </motion.div>
      </section>
    </>
  )
}
