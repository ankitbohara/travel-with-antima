import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PackageCard from '@/components/PackageCard'
import SectionHeader from '@/components/SectionHeader'
import { fetchPackages } from '@/services/api'

const categories = ['All', 'Heritage', 'Nature', 'Adventure', 'Beach', 'Offbeat']

export default function Packages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    fetchPackages()
      .then(setPackages)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered =
    activeCategory === 'All'
      ? packages
      : packages.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="page-hero px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="section-label mb-3">Explore</p>
          <h1 className="font-playfair text-white font-black mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            All Travel Packages
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Discover your perfect Indian adventure — each trip personally curated by Antima
          </p>
        </motion.div>
      </section>

      {/* Packages */}
      <section className="bg-brand-dark py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-dm font-semibold transition-all duration-200 cursor-pointer border
                  ${activeCategory === cat
                    ? 'bg-gold-red text-white border-transparent shadow-[0_4px_15px_rgba(245,158,11,0.4)]'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card h-80 animate-pulse bg-white/5 rounded-2xl" />
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((pkg, i) => (
                <PackageCard key={pkg._id} pkg={pkg} index={i} />
              ))}
            </motion.div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No packages found. Check back soon!
            </div>
          )}
        </div>
      </section>
    </>
  )
}
