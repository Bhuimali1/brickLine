import { useState, useEffect, useRef } from 'react'

const spotlights = [
  {
    location: 'Arizona, United States',
    name: 'Stillwater Retreat',
    headline: 'Where every home lives in\nbalance with nature',
    spec: '4 BHK RENTAL',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=80',
  },
  {
    location: 'Colorado, United States',
    name: 'Timberline Estate',
    headline: 'Crafted timber sanctuaries\nbuilt for quiet luxury',
    spec: '5 BHK VILLA',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80',
  },
  {
    location: 'California, United States',
    name: 'Crestview Pavilion',
    headline: 'Sunlit coastal architecture\ndesigned for modern living',
    spec: '6 BHK PENTHOUSE',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80',
  },
]

function PropertySpotlight() {
  const [idx, setIdx] = useState(0)
  const [inView, setInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [animateContent, setAnimateContent] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const current = spotlights[idx]

  // 1. Scroll-reveal observer (triggers both scrolling down and scrolling back up)
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

  // 2. Guaranteed slide-in animation for all texts & buttons on every slide change
  useEffect(() => {
    setAnimateContent(false)
    const timer = setTimeout(() => {
      setAnimateContent(true)
    }, 60)

    return () => clearTimeout(timer)
  }, [idx])

  // 3. Automatic slide every 4.5 seconds (pauses when hovering controls)
  useEffect(() => {
    if (isPaused) return

    const autoTimer = setInterval(() => {
      setIdx((prev) => (prev + 1) % spotlights.length)
    }, 4500)

    return () => clearInterval(autoTimer)
  }, [idx, isPaused])

  const prevSlide = () =>
    setIdx((prev) => (prev === 0 ? spotlights.length - 1 : prev - 1))
  const nextSlide = () =>
    setIdx((prev) => (prev + 1) % spotlights.length)

  return (
    <section
      id="spotlight"
      ref={sectionRef}
      className="relative my-2 w-full overflow-hidden bg-gray-900"
    >
      {/* Horizontal Sliding Background Track */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {spotlights.map((item, slideIndex) => (
          <div key={item.name} className="relative h-full w-full shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className={`h-full w-full object-cover object-center transition-transform duration-[4500ms] ease-out ${
                slideIndex === idx ? 'scale-105' : 'scale-100'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/50" />

      {/* Foreground Content with Scroll-Up/Down Reveal */}
      <div
        className={`relative z-10 mx-auto flex min-h-[420px] max-w-7xl flex-col justify-between px-4 py-10 transition-all duration-700 ease-out md:min-h-[480px] md:px-10 md:py-12 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Top-Right Location Badge & Property Name (Slides Down & Fades In) */}
        <div
          className={`group self-end text-right text-white transition-all duration-500 ease-out ${
            animateContent
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
          }`}
        >
          <span className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3.5 py-1 text-[10px] text-white/90 backdrop-blur-xs transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#eb5e38] group-hover:bg-black/65">
            <span>📍</span>
            <span>{current.location}</span>
          </span>
          <p className="mt-1.5 text-sm font-semibold transition-colors duration-300 group-hover:text-[#eb5e38] sm:text-base">
            {current.name}
          </p>
        </div>

        {/* Center-Left Pill & Headline (Slides Up & Fades In) */}
        <div className="my-8 max-w-xl">
          <span
            className={`inline-block cursor-default rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[10px] font-medium text-white backdrop-blur-xs transition-all duration-500 hover:border-[#eb5e38] hover:bg-[#eb5e38]/80 ${
              animateContent
                ? 'translate-x-0 opacity-100'
                : '-translate-x-4 opacity-0'
            }`}
          >
            Property spotlight
          </span>
          <h2
            className={`mt-3 whitespace-pre-line text-3xl leading-tight font-medium text-white transition-all delay-100 duration-600 ease-out sm:text-4xl md:text-[42px] ${
              animateContent
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            {current.headline}
          </h2>
        </div>

        {/* Bottom Controls (Pauses Auto-Slide on Hover) */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          {/* Spec Pill + FIND PROPERTY Button (Both Animate In on Slide Change) */}
          <div
            className={`flex flex-wrap items-center gap-3 transition-all delay-200 duration-500 ease-out ${
              animateContent
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            <span className="cursor-default rounded-[3px] border border-white/40 bg-black/35 px-4 py-2.5 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-xs transition-all duration-300 hover:border-[#eb5e38] hover:bg-black/60">
              • {current.spec}
            </span>
            <a
              href="#contact"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-[3px] bg-white px-5 py-2.5 text-[10px] font-bold tracking-wider text-gray-900 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eb5e38] hover:text-white hover:shadow-xl active:scale-95"
            >
              <span>FIND PROPERTY</span>
              <span className="-translate-y-[1px] transition-transform duration-300 group-hover:translate-x-1">
                &gt;
              </span>
            </a>
          </div>

          {/* Slide Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous spotlight"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/45 bg-black/30 text-xs text-white transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
            >
              ←
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next spotlight"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#eb5e38] text-xs text-white transition-all duration-300 hover:scale-110 hover:bg-[#d9502b] hover:shadow-lg hover:shadow-[#eb5e38]/40 active:scale-90"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertySpotlight