import { motion } from 'framer-motion'
// import { testimonials } from '@/data/testimonials'
import SectionHeader from '@/components/SectionHeader'
import { useApp } from '@/context/AppContext'
import { useEffect, useState } from 'react'
import { fetchTestimonials } from '../services/api'

export default function Testimonials() {
  const { openEnquiry } = useApp()
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] =  useState([])
  useEffect(() => {
    fetchTestimonials()
    .then(setTestimonials)
    .catch(console.error)
      .finally(() => setLoading(false))
  },[])
  return (
    <>
      {/* Hero */}
      <section className="page-hero px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label mb-3">Reviews</p>
          <h1 className="font-playfair text-white font-black mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            What Our Travellers Say
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Real stories from real explorers — unfiltered and from the heart
          </p>
        </motion.div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-brand-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Overall Rating */}
          <div className="text-center mb-14">
            <div className="inline-flex flex-col items-center bg-brand-navy border border-brand-gold/20 rounded-3xl px-12 py-8">
              <div className="font-playfair text-brand-gold text-6xl font-black mb-1">5.0</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xl">★</span>)}
              </div>
              <div className="text-slate-400 text-sm">Based on 500+ reviews</div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:border-brand-gold/20 hover:bg-brand-gold/[0.02] transition-all duration-300 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, s) => (
                    <span key={s} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>

                {/* Quote mark */}
                <div className="text-5xl text-brand-gold/20 font-playfair leading-none mb-2 font-black">"</div>

                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">{t.text}</p>

                {/* Footer */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white font-dm shadow-lg"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold font-dm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.city}</div>
                    </div>
                  </div>
                  <span
                    className="text-[11px] font-dm font-semibold px-2.5 py-1.5 rounded-lg"
                    style={{ background: `${t.color}18`, border: `1px solid ${t.color}30`, color: t.color }}
                  >
                    {t.trip}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 bg-brand-navy border border-brand-gold/15 rounded-3xl p-12">
            <h3 className="font-playfair text-white text-3xl font-bold mb-3">Join Our Happy Travellers</h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">Your perfect journey is just one enquiry away. Let's create your story.</p>
            <button onClick={() => openEnquiry()} className="btn-primary">
              Plan My Trip Now
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
