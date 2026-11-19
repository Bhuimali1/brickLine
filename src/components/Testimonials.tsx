import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    primaryImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    quotePrimary:
      'Working with Brickline was a fantastic experience from start to finish. They listened carefully to our architectural preferences, lifestyle requirements, and long-term investment goals, presenting curated properties that truly matched our vision within a few short weeks.',
    quoteSecondary:
      'They went above and beyond at every stage—from private site walkthroughs and structural assessments to contract negotiations and seamless final handover. Communication was always transparent, proactive, and reassuring.',
    name: 'Gregg Bergstrom',
    email: 'bergstrom@gmail.com',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    primaryImage:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    quotePrimary:
      'Brickline turned our architectural vision into reality with remarkable precision and care. Every material choice, natural light angle, and spatial detail exceeded our expectations, giving our family a timeless residence built for modern living.',
    quoteSecondary:
      'Their advisory and legal team handled inspections, custom financing, and final closing effortlessly from day one, keeping us informed with clear updates and thoughtful guidance throughout the entire journey.',
    name: 'Elena Vance',
    email: 'elena.vance@studio.co',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    primaryImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    quotePrimary:
      'From private viewings to closing the deal on our hillside residence, Brickline delivered a level of discretion, market insight, and architectural expertise unmatched in luxury real estate. Their portfolio stood out immediately for quality and sustainability.',
    quoteSecondary:
      'We felt guided, heard, and completely confident at every milestone of the acquisition—from initial valuation and interior customization to the day we stepped inside our new home.',
    name: 'Marcus Sterling',
    email: 'm.sterling@ventures.io',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
]

function Testimonials() {
  const [idx, setIdx] = useState(0)
  const [inView, setInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [animateSlide, setAnimateSlide] = useState(true)
  const [typedPrimary, setTypedPrimary] = useState('')
  const [typedSecondary, setTypedSecondary] = useState('')
  const sectionRef = useRef<HTMLElement>(null)
  const current = testimonials[idx]

  // 1. Scroll-reveal observer
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

  // 2. Smooth slide-in transition for photos & client info
  useEffect(() => {
    setAnimateSlide(false)
    const timer = setTimeout(() => {
      setAnimateSlide(true)
    }, 60)

    return () => clearTimeout(timer)
  }, [idx])

  // 3. Typewriter animation for both testimonial paragraphs
  useEffect(() => {
    if (!inView) {
      setTypedPrimary('')
      setTypedSecondary('')
      return
    }

    setTypedPrimary('')
    setTypedSecondary('')

    let charIdx = 0
    const primaryText = current.quotePrimary
    const secondaryText = current.quoteSecondary
    const totalLength = primaryText.length + secondaryText.length

    const typeTimer = setInterval(() => {
      charIdx += 2
      if (charIdx <= primaryText.length) {
        setTypedPrimary(primaryText.slice(0, charIdx))
      } else {
        setTypedPrimary(primaryText)
        setTypedSecondary(secondaryText.slice(0, charIdx - primaryText.length))
      }

      if (charIdx >= totalLength) {
        clearInterval(typeTimer)
      }
    }, 16)

    return () => clearInterval(typeTimer)
  }, [idx, inView, current.quotePrimary, current.quoteSecondary])

  // 4. Automatic slide every 6 seconds
  useEffect(() => {
    if (isPaused) return

    const autoTimer = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(autoTimer)
  }, [idx, isPaused])

  const prevSlide = () =>
    setIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  const nextSlide = () =>
    setIdx((prev) => (prev + 1) % testimonials.length)

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 md:py-20 lg:px-8"
    >
      {/* Header Row */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h2 className="text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl md:text-[42px]">
          Our client testimonial
        </h2>
        <a
          href="#contact"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-[3px] border border-gray-300 bg-white px-4 py-2 text-[10px] font-bold tracking-wider text-gray-800 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white hover:shadow-md active:scale-95"
        >
          <span>OUR CLIENTS</span>
          <span className="-translate-y-[1px] transition-transform duration-300 group-hover:translate-x-1">
            &gt;
          </span>
        </a>
      </div>

      {/* Balanced Asymmetric Reference Layout */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`mt-9 grid grid-cols-1 items-start gap-10 transition-all delay-150 duration-700 ease-out lg:grid-cols-12 lg:gap-12 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Left Column (4 cols): Compact Architectural Photo + Client Author */}
        <div className="lg:col-span-4">
          <div className="group relative overflow-hidden rounded-[3px] bg-[#f6e3db] shadow-xs">
            <img
              src={current.primaryImage}
              alt={`${current.name} residence`}
              className={`aspect-[4/3] w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                animateSlide ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          </div>

          <div
            className={`group mt-5 flex cursor-pointer items-center gap-3.5 transition-all duration-500 ease-out ${
              animateSlide
                ? 'translate-y-0 opacity-100'
                : 'translate-y-3 opacity-0'
            }`}
          >
            <img
              src={current.avatar}
              alt={current.name}
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-transparent transition-all duration-300 group-hover:scale-105 group-hover:ring-[#eb5e38]"
            />
            <div>
              <p className="text-xs font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38] sm:text-sm">
                {current.name}
              </p>
              <p className="text-[11px] text-gray-500">{current.email}</p>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Fuller Quote Paragraphs Top + Controls & Large Secondary Photo Bottom */}
        <div className="flex flex-col justify-between lg:col-span-8 lg:pt-2">
          {/* Typewriter Quote Paragraphs */}
          <div className="min-h-[10.5rem] max-w-3xl space-y-5">
            <p className="text-sm leading-relaxed text-gray-800 sm:text-[15px]">
              {typedPrimary}
              {inView && typedPrimary.length < current.quotePrimary.length && (
                <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#eb5e38] align-middle" />
              )}
            </p>
            <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
              {typedSecondary}
              {inView &&
                typedPrimary.length === current.quotePrimary.length &&
                typedSecondary.length < current.quoteSecondary.length && (
                  <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#eb5e38] align-middle" />
                )}
            </p>
          </div>

          {/* Bottom Row: Slider Controls on Left + Substantial Secondary Photo on Right */}
          <div className="mt-8 flex flex-col-reverse justify-between gap-8 sm:flex-row sm:items-end">
            {/* Slider Progress Bar & Arrows */}
            <div className="flex flex-1 items-center gap-3 pb-3">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous testimonial"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
              >
                ←
              </button>

              <div className="h-[2px] flex-1 bg-gray-200">
                <div
                  className="h-full bg-gray-800 transition-all duration-500"
                  style={{
                    width: `${((idx + 1) / testimonials.length) * 100}%`,
                  }}
                />
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next testimonial"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-700 transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
              >
                →
              </button>
            </div>

            {/* Larger Secondary Architectural Photo Matching Left Visual Scale */}
            <div className="group relative w-full overflow-hidden rounded-[3px] bg-[#f6e3db] shadow-xs sm:w-72 md:w-80 lg:w-[340px]">
              <img
                src={current.secondaryImage}
                alt="Featured client property"
                className={`aspect-[4/3] w-full object-cover transition-all delay-100 duration-700 ease-out group-hover:scale-105 ${
                  animateSlide ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials