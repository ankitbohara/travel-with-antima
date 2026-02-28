import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import SectionHeader from '@/components/SectionHeader'

const stats = [
  { value: '500+', label: 'Happy Travellers' },
  { value: '50+', label: 'Destinations Covered' },
  { value: '100%', label: 'Personalised Trips' },
  { value: '24/7', label: 'Trip Support' },
]

const values = [
  { icon: '🎯', title: 'Personalised Touch', desc: 'No cookie-cutter itineraries. Every trip is designed from scratch around your interests, pace and budget.' },
  { icon: '🤝', title: 'Trust & Transparency', desc: 'What you see is what you pay. We believe in honest, upfront pricing with zero hidden charges.' },
  { icon: '🌍', title: 'Local Connections', desc: 'Years of building relationships with local guides, hoteliers and drivers so you get insider access everywhere.' },
  { icon: '💛', title: 'Genuine Care', desc: 'We treat your trip as if it were our own. Your happiness is our biggest reward.' },
]

export default function About() {
  const { openEnquiry } = useApp()

  return (
    <>
      {/* Hero */}
      <section className="page-hero px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="section-label mb-3">About Us</p>
          <h1 className="font-playfair text-white font-black mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            The Story Behind the Journey
          </h1>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Passionate about India, driven by wanderlust, powered by love for our travellers
          </p>
        </motion.div>
      </section>

      {/* Main story */}
      <section className="bg-brand-dark py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80"
                alt="Travel exploration"
                className="w-full rounded-3xl object-cover"
                style={{ height: 480 }}
              />
              <div className="absolute -bottom-5 -right-5 bg-gold-red rounded-2xl p-5 text-center shadow-2xl">
                <div className="font-playfair text-white text-4xl font-black">3+</div>
                <div className="text-white/85 text-xs mt-0.5">Years of Excellence</div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-label mb-4">Our Story</p>
              <h2 className="font-playfair text-white text-4xl font-bold mb-6 leading-tight">
                Passionate About Creating Perfect Memories
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                Travel with Antima was born from a deep love for India's incredible diversity — its landscapes, cultures, cuisines and people. Founded with a simple mission: to make authentic, stress-free travel accessible to everyone who dreams of exploring this extraordinary country.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Antima personally designs every itinerary, handpicks each stay, and remains your dedicated travel partner from the moment you enquire until you return home with a heart full of memories. No call centres, no chatbots — just a real person who genuinely cares about your experience.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map(({ value, label }) => (
                  <div key={label} className="bg-brand-gold/5 border border-brand-gold/15 rounded-xl p-4">
                    <div className="font-playfair text-brand-gold text-3xl font-black">{value}</div>
                    <div className="text-slate-500 text-xs mt-0.5 font-dm">{label}</div>
                  </div>
                ))}
              </div>

              <button onClick={() => openEnquiry()} className="btn-primary">
                Plan My Trip
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-navy py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Our Values"
            title="What Drives Us Every Day"
            subtitle="These principles guide every trip we plan"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-brand-gold/25 transition-all"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-playfair text-white text-xl font-bold mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-brand-dark py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: '🎯',
              title: 'Our Mission',
              text: 'To create deeply personal travel experiences that celebrate India\'s beauty — crafting journeys that go beyond sightseeing to genuine connection with places, people and culture.',
            },
            {
              icon: '🌟',
              title: 'Our Vision',
              text: 'To be the most trusted travel partner for every Indian explorer, known for our personal touch, transparent pricing, and the joy we bring to every single journey we craft.',
            },
          ].map(({ icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10"
            >
              <div className="text-5xl mb-5">{icon}</div>
              <h3 className="font-playfair text-white text-2xl font-bold mb-4">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-red py-16 px-6 text-center">
        <h2 className="font-playfair text-white font-bold text-3xl mb-4">Let's Start Your Journey</h2>
        <p className="text-white/80 mb-6">Reach out and let Antima plan the trip of your dreams</p>
        <button onClick={() => openEnquiry()} className="bg-white text-red-500 font-bold font-dm px-8 py-3 rounded-full cursor-pointer border-none hover:-translate-y-0.5 transition-all">
          Get in Touch
        </button>
      </section>
    </>
  )
}
