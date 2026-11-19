import { useState, useRef, useEffect } from 'react'

const projectItems = [
  { label: 'Executed Projects', href: '#projects' },
  { label: 'In-Progress Developments', href: '#projects' },
  { label: 'Commercial Landmarks', href: '#recent' },
  { label: 'Sustainable Communities', href: '#recent' },
]

const propertyItems = [
  { label: 'Signature Homes', href: '#spotlight' },
  { label: 'Luxury Villas', href: '#projects' },
  { label: 'Urban Rentals', href: '#recent' },
  { label: 'Business Parks', href: '#recent' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<'projects' | 'properties' | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<'projects' | 'properties' | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinkClass =
    'relative py-1 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#eb5e38] after:transition-all after:duration-300 hover:text-white hover:after:w-full'

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 z-50 w-full border-b border-white/15 bg-black/15 backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Left Links */}
        <nav className="hidden items-center gap-7 text-[11px] font-medium tracking-wider text-white/90 uppercase lg:flex">
          {/* Projects Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('projects')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) => (prev === 'projects' ? null : 'projects'))
              }
              className={`flex cursor-pointer items-center gap-1 uppercase ${navLinkClass}`}
            >
              Projects{' '}
              <span
                className={`text-[9px] transition-transform duration-300 ${
                  openDropdown === 'projects' ? 'rotate-180 text-[#eb5e38]' : ''
                }`}
              >
                ▾
              </span>
            </button>

            {openDropdown === 'projects' && (
              <div className="absolute top-full left-0 w-56 pt-2">
                <div className="border border-white/25 bg-white/75 py-2 shadow-xl backdrop-blur-md">
                  {projectItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-center justify-between px-4 py-2.5 text-[11px] font-medium tracking-wide text-black transition-all duration-200 hover:bg-[#eb5e38] hover:pl-5 hover:text-white"
                    >
                      <span>{item.label}</span>
                      <span className="-translate-x-2 text-[10px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#highlights" className={navLinkClass}>
            Services
          </a>
          <a href="#testimonials" className={navLinkClass}>
            About Us
          </a>
        </nav>

        {/* Center Brand Wordmark */}
        <a
          href="#"
          className="text-lg font-extrabold tracking-widest text-white uppercase transition-opacity duration-300 hover:opacity-85 md:text-xl"
        >
          BRICKLINE.
        </a>

        {/* Right Links + CTA */}
        <div className="hidden items-center gap-7 text-[11px] font-medium tracking-wider text-white/90 uppercase lg:flex">
          {/* Properties Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('properties')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() =>
                setOpenDropdown((prev) =>
                  prev === 'properties' ? null : 'properties',
                )
              }
              className={`flex cursor-pointer items-center gap-1 uppercase ${navLinkClass}`}
            >
              Properties{' '}
              <span
                className={`text-[9px] transition-transform duration-300 ${
                  openDropdown === 'properties' ? 'rotate-180 text-[#eb5e38]' : ''
                }`}
              >
                ▾
              </span>
            </button>

            {openDropdown === 'properties' && (
              <div className="absolute top-full right-0 w-52 pt-2">
                <div className="border border-white/25 bg-white/75 py-2 shadow-xl backdrop-blur-md">
                  {propertyItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="group flex items-center justify-between px-4 py-2.5 text-[11px] font-medium tracking-wide text-black transition-all duration-200 hover:bg-[#eb5e38] hover:pl-5 hover:text-white"
                    >
                      <span>{item.label}</span>
                      <span className="-translate-x-2 text-[10px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#spotlight" className={navLinkClass}>
            Loan
          </a>
          <a
            href="#contact"
            className="cursor-pointer bg-[#eb5e38] px-4 py-2.5 text-[11px] font-semibold tracking-wider text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9502b] hover:shadow-lg hover:shadow-[#eb5e38]/30 active:scale-95"
          >
            CONTACT US
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="cursor-pointer rounded-xs border border-white/30 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:border-[#eb5e38] hover:bg-[#eb5e38] lg:hidden"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="border-t border-white/20 bg-black/55 px-4 py-5 text-xs font-medium tracking-wider text-white uppercase backdrop-blur-md sm:px-6 lg:hidden">
          <div className="flex flex-col space-y-3.5">
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileSubmenu((prev) =>
                    prev === 'projects' ? null : 'projects',
                  )
                }
                className="flex w-full cursor-pointer items-center justify-between uppercase"
              >
                <span>Projects</span>
                <span>{mobileSubmenu === 'projects' ? '▴' : '▾'}</span>
              </button>
              {mobileSubmenu === 'projects' && (
                <div className="mt-2.5 ml-3 flex flex-col space-y-2.5 border-l border-white/35 pl-3 text-[11px] text-white/90">
                  {projectItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="transition active:text-[#eb5e38] hover:text-[#eb5e38]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#highlights"
              onClick={() => setMobileOpen(false)}
              className="transition active:text-[#eb5e38] hover:text-[#eb5e38]"
            >
              Services
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileOpen(false)}
              className="transition active:text-[#eb5e38] hover:text-[#eb5e38]"
            >
              About Us
            </a>

            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileSubmenu((prev) =>
                    prev === 'properties' ? null : 'properties',
                  )
                }
                className="flex w-full cursor-pointer items-center justify-between uppercase"
              >
                <span>Properties</span>
                <span>{mobileSubmenu === 'properties' ? '▴' : '▾'}</span>
              </button>
              {mobileSubmenu === 'properties' && (
                <div className="mt-2.5 ml-3 flex flex-col space-y-2.5 border-l border-white/35 pl-3 text-[11px] text-white/90">
                  {propertyItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="transition active:text-[#eb5e38] hover:text-[#eb5e38]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#spotlight"
              onClick={() => setMobileOpen(false)}
              className="transition active:text-[#eb5e38] hover:text-[#eb5e38]"
            >
              Loan
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-block w-fit bg-[#eb5e38] px-4 py-2.5 font-semibold text-white transition hover:bg-[#d9502b]"
            >
              CONTACT US
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar