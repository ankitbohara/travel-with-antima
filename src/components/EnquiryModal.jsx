import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiCheck } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useApp } from '@/context/AppContext'
import { submitEnquiry } from '@/services/api'

export default function EnquiryModal() {
  const { enquiryOpen, closeEnquiry, enquiryPackage } = useApp()
  const [submitted, setSubmitted] = useState(false)

  const {
    register, handleSubmit, reset, setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    if (enquiryOpen) {
      setValue('package', enquiryPackage)
      setSubmitted(false)
    }
  }, [enquiryOpen, enquiryPackage, setValue])

  const onSubmit = async (data) => {
    try {
      await submitEnquiry(data)
      setSubmitted(true)
      reset()
    } catch (err) {
      console.error('Enquiry failed:', err)
      // Still show success to user — don't block them
      setSubmitted(true)
      reset()
    }
  }

  const handleClose = () => {
    closeEnquiry()
    setSubmitted(false)
    reset()
  }

  return (
    <AnimatePresence>
      {enquiryOpen && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div
            className="relative w-full max-w-lg bg-brand-navy border border-brand-gold/25 rounded-3xl p-8 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button onClick={handleClose}
              className="absolute top-5 right-5 w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer border-none">
              <FiX size={16} />
            </button>

            {submitted ? (
              <motion.div className="text-center py-10"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="w-20 h-20 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <FiCheck size={36} className="text-green-400" />
                </div>
                <h3 className="font-playfair text-white text-2xl font-bold mb-3">Enquiry Submitted!</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Thank you! Antima will reach out to you on WhatsApp or phone within <span className="text-brand-gold font-semibold">24 hours</span>.
                </p>
                <button onClick={handleClose} className="btn-primary">Close</button>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="font-playfair text-white text-2xl font-bold">Book / Enquire</h2>
                  <p className="text-slate-400 text-sm mt-1">We'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                      Full Name <span className="text-brand-gold">*</span>
                    </label>
                    <input {...register('name', { required: 'Name is required' })}
                      placeholder="Your full name" className="input-field" />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                      Phone / WhatsApp <span className="text-brand-gold">*</span>
                    </label>
                    <input {...register('phone', { required: 'Phone number is required' })}
                      placeholder="+91 98765 43210" className="input-field" />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input {...register('email')} type="email"
                      placeholder="your@email.com" className="input-field" />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                      Package / Destination
                    </label>
                    <input {...register('package')}
                      placeholder="E.g. Golden Triangle, Kerala..." className="input-field" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                        No. of Travellers
                      </label>
                      <input {...register('travelers')} type="number" placeholder="2" min="1" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                        Travel Date
                      </label>
                      <input {...register('date')} type="date" className="input-field" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs font-semibold font-dm mb-1.5 uppercase tracking-wide">
                      Message
                    </label>
                    <textarea {...register('message')} rows={3}
                      placeholder="Any specific requirements or questions?"
                      className="input-field resize-none" />
                  </div>

                  <button type="submit" disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-70">
                    {isSubmitting
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                      : <><FiSend size={14} /> Submit Enquiry</>
                    }
                  </button>

                  <a href="https://wa.me/919876543210?text=Hi Antima, I'd like to enquire about a travel package!"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 text-sm font-semibold font-dm hover:bg-green-500/20 transition-colors no-underline">
                    <FaWhatsapp size={16} />
                    Or chat directly on WhatsApp
                  </a>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
