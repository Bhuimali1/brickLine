import { useState, useEffect, useRef } from 'react'

const highlights = [
  {
    title: 'Anywhere feels\nlike home',
    description:
      'Every home is thoughtfully equipped for immediate comfort, offering a space where no detail is left to chance.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
        <path d="M9.5 20v-6h5v6" />
      </svg>
    ),
  },
  {
    title: 'Live securely without\nboundaries',
    description:
      'Each residence is crafted to provide immediate comfort, where every element is purposefully chosen.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0" />
      </svg>
    ),
  },
  {
    title: 'Just a click away\nthe world',
    description:
      'Step into a home where comfort greets you instantly and every detail reflects refined & solid taste.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
        <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
]

function Highlights() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll-reveal observer (triggers both scrolling down and scrolling back up)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="mx-auto max-w-7xl px-4 pt-2 pb-12 md:px-10 md:pt-4 md:pb-16"
    >
      {/* Section Header with Scroll Reveal */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          Outstanding highlights
        </h2>
        <a
          href="#contact"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-[3px] border border-gray-300 bg-white px-4 py-2 text-[10px] font-bold tracking-wider text-gray-800 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-md active:scale-95"
        >
          <span>GET STARTED</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &gt;
          </span>
        </a>
      </div>

      {/* 3 Feature Cards with Staggered Scroll Reveal & Icon Hover Animations */}
      <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
        {highlights.map((item, idx) => (
          <div
            key={item.title}
            style={{ transitionDelay: inView ? `${idx * 120}ms` : '0ms' }}
            className={`group flex cursor-pointer flex-col justify-between rounded-[3px] border border-transparent bg-[#faf7f5] p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#eb5e38]/30 hover:bg-white hover:shadow-xl hover:shadow-black/5 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div>
              {/* Animated Icon Container */}
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-[3px] bg-[#eb5e38]/10 text-[#eb5e38] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-[#eb5e38] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#eb5e38]/25">
                {item.icon}
              </div>

              <h3 className="whitespace-pre-line text-lg leading-snug font-medium text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38]">
                {item.title}
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
                {item.description}
              </p>
            </div>

            <a
              href="#recent"
              className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold tracking-wider text-gray-900 uppercase transition-colors duration-300 group-hover:text-[#eb5e38]"
            >
              <span>LEARN MORE</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Highlights