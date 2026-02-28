import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi'
import { useApp } from '@/context/AppContext'

export default function PackageCard({ pkg, index = 0 }) {
  const { openEnquiry } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />

        {/* Tag */}
        <span
          className="absolute top-3 left-3 text-white text-[11px] font-bold font-dm px-3 py-1 rounded-full"
          style={{ backgroundColor: pkg.tagColor }}
        >
          {pkg.tag}
        </span>

        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-brand-dark/90 text-brand-gold font-playfair text-lg font-black px-3 py-1.5 rounded-xl">
          {pkg.price}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1.5">
          <FiMapPin size={11} />
          {pkg.location}
        </div>

        <h3 className="font-playfair text-white text-xl font-bold mb-1">{pkg.name}</h3>

        <div className="flex items-center gap-1.5 text-brand-gold text-xs mb-3">
          <FiClock size={11} />
          {pkg.duration}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">{pkg.desc}</p>

        {/* Highlights preview */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pkg.highlights.slice(0, 3).map((h) => (
            <span key={h} className="text-[11px] text-slate-400 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
              {h}
            </span>
          ))}
          {pkg.highlights.length > 3 && (
            <span className="text-[11px] text-brand-gold/70 px-2 py-1">+{pkg.highlights.length - 3} more</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <Link
            to={`/packages/${pkg.slug}`}
            className="flex-1 btn-ghost text-sm text-center flex items-center justify-center gap-1.5 no-underline"
          >
            View Details <FiArrowRight size={13} />
          </Link>
          <button
            onClick={() => openEnquiry(pkg.name)}
            className="flex-1 btn-primary text-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}
