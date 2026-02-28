import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [enquiryPackage, setEnquiryPackage] = useState('')

  const openEnquiry = (packageName = '') => {
    setEnquiryPackage(packageName)
    setEnquiryOpen(true)
  }

  const closeEnquiry = () => {
    setEnquiryOpen(false)
    setEnquiryPackage('')
  }

  return (
    <AppContext.Provider value={{ enquiryOpen, enquiryPackage, openEnquiry, closeEnquiry }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
