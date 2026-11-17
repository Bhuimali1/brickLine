import { useState, useEffect, useRef, type FormEvent } from 'react'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#highlights' },
  { label: 'Properties', href: '#recent' },
  { label: 'Home Loan', href: '#spotlight' },
]

const companyLinks = [
  { label: 'About Us', href: '#testimonials' },
  { label: 'Client Stories', href: '#testimonials' },
  { label: 'Book Consultation', href: '#contact' },
  { label: 'Privacy Policy', href: '#contact' },
]

const socials = [
  {
    name: 'LinkedIn',
    href: '#contact',
    hoverClass:
      'hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:shadow-[#0A66C2]/40',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#contact',
    hoverClass:
      'hover:border-[#E4405F] hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:shadow-[#DD2A7B]/40',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: '#contact',
    hoverClass: 'hover:border-white hover:bg-black hover:shadow-white/20',
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#contact',
    hoverClass:
      'hover:border-[#FF0000] hover:bg-[#FF0000] hover:shadow-[#FF0000]/40',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

function Footer() {
  const [inView, setInView] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  // Scroll-reveal observer (triggers both scrolling down and scrolling back up)
  useEffect(() => {
    const el = footerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="w-full bg-[#18191b] text-white"
    >
      {/* Top Newsletter Strip (Compact Padding) */}
      <div className="border-b border-white/10">
        <div
          className={`mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 py-7 transition-all duration-700 ease-out md:flex-row md:items-center md:px-10 md:py-8 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div>
            <h3 className="text-lg font-medium tracking-tight text-white sm:text-2xl">
              Stay updated on signature properties
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Receive private invitations to new architectural launches and
              consultations.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:gap-0"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (subscribed) setSubscribed(false)
              }}
              placeholder={
                subscribed
                  ? 'Thank you — you are on our private list.'
                  : 'Enter your email'
              }
              aria-label="Email address"
              className="w-full rounded-[3px] bg-white px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#eb5e38] sm:rounded-r-none"
            />
            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-[3px] bg-[#eb5e38] px-6 py-2.5 text-[11px] font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#d9502b] hover:shadow-lg hover:shadow-[#eb5e38]/30 active:scale-95 sm:rounded-l-none"
            >
              {subscribed ? 'SUBSCRIBED ✓' : 'SUBSCRIBE'}
            </button>
          </form>
        </div>
      </div>

      {/* Main 4-Column Footer Links (Responsive Mobile Grid) */}
      <div
        className={`mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-9 transition-all delay-150 duration-700 ease-out md:px-10 md:py-10 lg:grid-cols-12 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        {/* Brand Column */}
        <div className="col-span-2 lg:col-span-4">
          <a
            href="#"
            className="inline-block text-lg font-extrabold tracking-widest text-white uppercase transition-colors duration-300 hover:text-[#eb5e38]"
          >
            BRICKLINE.
          </a>
          <p className="mt-2.5 max-w-xs text-xs leading-relaxed text-gray-400">
            Curated luxury residences, commercial landmarks, and sustainable
            architectural developments.
          </p>
        </div>

        {/* Navigation Column */}
        <div className="col-span-1 lg:col-span-3">
          <h4 className="text-[11px] font-bold tracking-wider text-white uppercase">
            Navigation
          </h4>
          <ul className="mt-3.5 space-y-2 text-xs">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group inline-flex items-center gap-1.5 text-gray-400 transition-all duration-200 hover:translate-x-1 hover:text-[#eb5e38]"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div className="col-span-1 lg:col-span-3">
          <h4 className="text-[11px] font-bold tracking-wider text-white uppercase">
            Company
          </h4>
          <ul className="mt-3.5 space-y-2 text-xs">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group inline-flex items-center gap-1.5 text-gray-400 transition-all duration-200 hover:translate-x-1 hover:text-[#eb5e38]"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect Column with Authentic SVG Icons & Brand Hover Colors */}
        <div className="col-span-2 lg:col-span-2">
          <h4 className="text-[11px] font-bold tracking-wider text-white uppercase">
            Connect
          </h4>
          <div className="mt-3.5 flex items-center gap-2.5">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-label={item.name}
                title={item.name}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-white hover:shadow-lg active:scale-95 ${item.hoverClass}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
          <a
            href="mailto:hello@brickline.estates"
            className="mt-3.5 inline-block text-xs text-gray-400 transition-colors duration-300 hover:text-[#eb5e38]"
          >
            hello@brickline.estates
          </a>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-[11px] text-gray-500 md:px-10">
          © 2026 Brickline Estates. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer