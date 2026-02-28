# ✈ Travel with Antima — Website

A modern, full-featured travel agency website built with **Vite + React**, **Tailwind CSS**, **shadcn/ui**, **React Router DOM**, **React Hook Form**, and **Framer Motion**.

---

## 📁 Project Structure

```
travel-with-antima/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky navbar with mobile menu
│   │   ├── Footer.jsx          # Footer with links & social
│   │   ├── PackageCard.jsx     # Reusable package card
│   │   ├── EnquiryModal.jsx    # Book Now / Enquiry popup (React Hook Form)
│   │   └── SectionHeader.jsx  # Reusable section heading
│   ├── context/
│   │   └── AppContext.jsx      # Global state (enquiry modal)
│   ├── data/
│   │   ├── packages.js         # All 6 travel packages data
│   │   ├── testimonials.js     # Customer reviews
│   │   └── gallery.js          # Gallery images data
│   ├── lib/
│   │   └── utils.js            # cn() utility (clsx + tailwind-merge)
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── About.jsx           # About Us page
│   │   ├── Packages.jsx        # All packages with category filter
│   │   ├── PackageDetail.jsx   # Individual package (Overview/Itinerary/Includes tabs)
│   │   ├── Gallery.jsx         # Masonry photo gallery with lightbox
│   │   ├── Testimonials.jsx    # Customer reviews grid
│   │   └── Contact.jsx         # Contact form (React Hook Form)
│   ├── App.jsx                 # React Router setup
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind + global styles
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Setup & Installation

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **Vite + React 18** | Frontend framework & build tool |
| **Tailwind CSS v3** | Utility-first styling |
| **React Router DOM v6** | Client-side routing |
| **React Hook Form v7** | Form validation (Enquiry & Contact) |
| **Framer Motion v11** | Animations & page transitions |
| **React Icons v5** | Icon library |
| **clsx + tailwind-merge** | Conditional class utility |

---

## 📄 Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/packages` | All Packages (with filter) |
| `/packages/:slug` | Package Detail |
| `/gallery` | Photo Gallery |
| `/testimonials` | Customer Reviews |
| `/contact` | Contact Form |

---

## ✏️ Customisation

### Update contact details
Edit the following files with Antima's real info:
- `src/pages/Contact.jsx` — phone, email, WhatsApp link
- `src/components/Footer.jsx` — social links, phone
- `src/components/EnquiryModal.jsx` — WhatsApp link

### Add / edit packages
Edit `src/data/packages.js` — each package has:
- Basic info (name, price, duration, location)
- Highlights, itinerary, includes/excludes
- Gallery images

### Add gallery photos
Edit `src/data/gallery.js` — add image URLs and categories.

### Update branding
- Logo/colours in `tailwind.config.js`
- Global fonts in `index.html` (Google Fonts link)

---

## 📱 Features

- ✅ Fully responsive (mobile-first)
- ✅ Smooth animations with Framer Motion
- ✅ Sticky transparent-to-solid navbar
- ✅ Package filter by category
- ✅ Package detail with tabs (Overview / Itinerary / Includes)
- ✅ Masonry gallery with lightbox
- ✅ Enquiry modal with form validation
- ✅ Contact form with validation
- ✅ WhatsApp direct chat integration
- ✅ Scroll-to-top on route change
- ✅ Custom scrollbar styling

---

*Built with ❤️ for Travel with Antima*
