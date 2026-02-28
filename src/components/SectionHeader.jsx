import { motion } from 'framer-motion'

export default function SectionHeader({ label, title, subtitle, light = false, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      {label && (
        <p className="section-label mb-3">{label}</p>
      )}
      <h2 className={`section-title font-playfair ${light ? 'text-slate-900' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-slate-500' : 'text-slate-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
