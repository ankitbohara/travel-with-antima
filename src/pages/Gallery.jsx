import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryImages, galleryCategories } from '@/data/gallery'
import { fetchGallery } from '../services/api'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)
useEffect(() => {
  fetchGallery()
},[])
  const filtered =
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="page-hero px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="section-label mb-3">Gallery</p>
          <h1 className="font-playfair text-white font-black mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            Moments Captured
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            A glimpse into the journeys, memories and magic we've created
          </p>
        </motion.div>
      </section>

      <section className="bg-brand-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-dm font-semibold transition-all cursor-pointer border
                  ${activeCategory === cat
                    ? 'bg-gold-red text-white border-transparent'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setLightbox(img)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <span className="text-xs text-brand-gold bg-brand-gold/15 border border-brand-gold/30 px-2.5 py-1 rounded-full font-dm">
                        {img.category}
                      </span>
                      <p className="text-white text-sm font-dm mt-2">{img.alt}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-white/70 text-sm font-dm">{lightbox.alt}</span>
                <span className="ml-3 text-xs text-brand-gold bg-brand-gold/15 border border-brand-gold/30 px-2.5 py-1 rounded-full font-dm">
                  {lightbox.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
