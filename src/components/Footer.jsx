import { Link } from 'react-router-dom'
import { FaInstagram, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail, MdLocationOn } from 'react-icons/md'

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/packages', label: 'Packages' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/testimonials', label: 'Reviews' },
  { path: '/contact', label: 'Contact' },
]

const popularPackages = [
  { path: '/packages/golden-triangle', label: 'Golden Triangle' },
  { path: '/packages/kerala-backwaters', label: 'Kerala Backwaters' },
  { path: '/packages/rajasthan-royale', label: 'Rajasthan Royale' },
  { path: '/packages/himalayan-escape', label: 'Himalayan Escape' },
  { path: '/packages/goa-beach-bliss', label: 'Goa Beach Bliss' },
]

export default function Footer() {
  return (
    <footer className="bg-[#060d18] border-t border-white/5 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-red flex items-center justify-center text-xl">✈</div>
              <div>
                <div className="font-playfair text-lg font-bold text-white leading-none">Travel with</div>
                <div className="font-playfair text-xl font-black text-brand-gold leading-none">Antima</div>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 max-w-xs">
              Crafting unforgettable journeys across India's most beautiful destinations. Your personal travel curator, available 24/7.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              <a href="https://www.instagram.com/travel_with_antima/" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-gold hover:border-brand-gold/30 transition-all">
                <FaInstagram size={16} />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-green-400 hover:border-green-400/30 transition-all">
                <FaWhatsapp size={16} />
              </a>
              <a href="tel:+919876543210"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-gold hover:border-brand-gold/30 transition-all">
                <FaPhoneAlt size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="text-slate-500 text-sm hover:text-brand-gold transition-colors font-dm">
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="font-playfair text-white text-lg font-semibold mb-4">Popular Packages</h4>
            <ul className="space-y-2">
              {popularPackages.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="text-slate-500 text-sm hover:text-brand-gold transition-colors font-dm">
                    → {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-white text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-4">
              {[
                { icon: <FaPhoneAlt size={13} />, text: '+91 98765 43210' },
                { icon: <MdEmail size={15} />, text: 'travel.antima@gmail.com' },
                { icon: <FaWhatsapp size={15} />, text: 'WhatsApp Available' },
                { icon: <MdLocationOn size={16} />, text: 'Pan-India Services' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-slate-500 text-sm">
                  <span className="text-brand-gold flex-shrink-0">{icon}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Travel with Antima. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Made with ❤️ for passionate Indian travellers</p>
        </div>
      </div>
    </footer>
  )
}
