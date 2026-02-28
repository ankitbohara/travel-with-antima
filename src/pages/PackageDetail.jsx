import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FiMapPin, FiClock, FiArrowLeft, FiArrowRight,
  FiCheck, FiX, FiCalendar, FiUsers,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { fetchPackageBySlug } from '@/services/api'
import { useApp } from '@/context/AppContext'

const tabs = ['Overview', 'Itinerary', 'Includes']

export default function PackageDetail() {
  const { slug } = useParams()
  const { openEnquiry } = useApp()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetchPackageBySlug(slug)
      .then(setPkg)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound || !pkg) return <Navigate to="/packages" replace />

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-4 no-underline transition-colors"
            >
              <FiArrowLeft size={14} /> Back to Packages
            </Link>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
                  <span className="flex items-center gap-1"><FiMapPin size={13} /> {pkg.location}</span>
                  <span className="flex items-center gap-1"><FiClock size={13} /> {pkg.duration}</span>
                </div>
                <h1 className="font-playfair text-white font-black" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                  {pkg.name}
                </h1>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-xs mb-1">Starting from</div>
                <div className="font-playfair text-brand-gold font-black text-5xl leading-none">{pkg.price}</div>
                <div className="text-slate-500 text-xs mt-1">per person</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/10 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-dm font-semibold border-b-2 -mb-px transition-all cursor-pointer bg-transparent
                    ${activeTab === tab
                      ? 'text-brand-gold border-brand-gold'
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === 'Overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-slate-400 leading-relaxed text-base mb-8">{pkg.desc}</p>

                {pkg.highlights?.length > 0 && (
                  <>
                    <h3 className="font-playfair text-white text-2xl font-bold mb-5">Trip Highlights</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                      {pkg.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-3 bg-brand-gold/5 border border-brand-gold/15 rounded-xl px-4 py-3">
                          <span className="text-brand-gold text-sm">✦</span>
                          <span className="text-slate-300 text-sm">{h}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {pkg.gallery?.length > 0 && (
                  <>
                    <h3 className="font-playfair text-white text-2xl font-bold mb-5">Photo Gallery</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {pkg.gallery.map((src, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
                          onClick={() => setLightbox(src)}>
                          <img src={src} alt={`gallery ${i}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Itinerary */}
            {activeTab === 'Itinerary' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {pkg.itinerary?.map((day, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-gold-red flex items-center justify-center text-white font-bold text-sm font-dm shadow-lg">
                        {i + 1}
                      </div>
                      {i < pkg.itinerary.length - 1 && (
                        <div className="w-px flex-1 bg-brand-gold/20 mt-2" />
                      )}
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mb-2 flex-1 hover:border-brand-gold/20 transition-all">
                      <div className="text-brand-gold text-xs font-semibold font-dm mb-1">{day.day}</div>
                      <div className="font-playfair text-white text-lg font-bold mb-2">{day.title}</div>
                      <p className="text-slate-400 text-sm leading-relaxed">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Includes */}
            {activeTab === 'Includes' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-playfair text-white text-xl font-bold mb-5 flex items-center gap-2">
                      <FiCheck className="text-green-400" /> What's Included
                    </h3>
                    <ul className="space-y-3">
                      {pkg.includes?.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-slate-300 text-sm pb-3 border-b border-white/5">
                          <span className="w-5 h-5 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                            <FiCheck size={11} className="text-green-400" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-playfair text-white text-xl font-bold mb-5 flex items-center gap-2">
                      <FiX className="text-red-400" /> What's Excluded
                    </h3>
                    <ul className="space-y-3">
                      {pkg.excludes?.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-slate-400 text-sm pb-3 border-b border-white/5">
                          <span className="w-5 h-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                            <FiX size={11} className="text-red-400" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div>
            <div className="sticky top-24 bg-brand-navy border border-brand-gold/20 rounded-3xl p-7">
              <h3 className="font-playfair text-white text-xl font-semibold mb-1">Book This Trip</h3>
              <div className="font-playfair text-brand-gold text-4xl font-black mb-1">{pkg.price}</div>
              <div className="text-slate-500 text-xs mb-6">per person · all taxes included</div>

              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <FiMapPin size={13} className="text-brand-gold" /> {pkg.location}
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <FiClock size={13} className="text-brand-gold" /> {pkg.duration}
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <FiCalendar size={13} className="text-brand-gold" /> Flexible start dates
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <FiUsers size={13} className="text-brand-gold" /> Solo, couple or group
                </div>
              </div>

              <button
                onClick={() => openEnquiry(pkg.name)}
                className="btn-primary w-full mb-3 flex items-center justify-center gap-2"
              >
                Enquire Now <FiArrowRight size={14} />
              </button>

              <a
                href={`https://wa.me/919876543210?text=Hi Antima! I'm interested in the ${pkg.name} package.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-sm font-semibold font-dm hover:bg-green-500/20 transition-colors no-underline"
              >
                <FaWhatsapp size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[90vh] rounded-2xl object-contain" />
        </div>
      )}
    </>
  )
}
