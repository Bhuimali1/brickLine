import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    primaryImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    quotePrimary:
      'Working with Bricklane was a fantastic experience from start to finish. They listened to exactly what I wanted, and within a few short weeks, I found my dream home.',
    quoteSecondary:
      'They went above and beyond to ensure everything went smoothly. Communication was always clear and timely.',
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
      'Bricklane turned our architectural vision into reality with remarkable precision. Every material choice and spatial detail exceeded our expectations.',
    quoteSecondary:
      'Their advisory team handled inspections, financing, and handover seamlessly from day one.',
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
      'From private viewings to closing the deal on our hillside residence, Bricklane delivered a level of discretion and expertise unmatched in luxury real estate.',
    quoteSecondary:
      'We felt guided and confident at every milestone of the acquisition.',
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

  // 2. Smooth slide-in transition for photos & client info on every slide change
  useEffect(() => {
    setAnimateSlide(false)
    const timer = setTimeout(() => {
      setAnimateSlide(true)
    }, 60)

    return () => clearTimeout(timer)
  }, [idx])

  // 3. Typewriter animation for both testimonial paragraphs on scroll-in & slide change
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
      charIdx += 1
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

  // 4. Automatic slide every 5.5 seconds (pauses when hovering over testimonial content)
  useEffect(() => {
    if (isPaused) return

    const autoTimer = setInterval(() => {
      setIdx((prev) => (prev + 1) % testimonials.length)
    }, 5500)

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
      className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16"
    >
      {/* Header Row with Scroll Reveal */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h2 className="text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
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

      {/* Asymmetric 3-Column Testimonial Layout */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`mt-8 grid grid-cols-1 items-start gap-8 transition-all delay-150 duration-700 ease-out lg:grid-cols-12 ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Left Column: Primary Architectural Photo + Client Author */}
        <div className="lg:col-span-3">
          <div className="group overflow-hidden rounded-[3px] bg-gray-100 shadow-xs">
            <img
              src={current.primaryImage}
              alt={`${current.name} residence`}
              className={`aspect-[4/3] w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                animateSlide ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          </div>

          <div
            className={`group mt-4 flex cursor-pointer items-center gap-3 transition-all duration-500 ease-out ${
              animateSlide
                ? 'translate-y-0 opacity-100'
                : 'translate-y-3 opacity-0'
            }`}
          >
            <img
              src={current.avatar}
              alt={current.name}
              className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-transparent transition-all duration-300 group-hover:scale-105 group-hover:ring-[#eb5e38]"
            />
            <div>
              <p className="text-xs font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38]">
                {current.name}
              </p>
              <p className="text-[11px] text-gray-500">{current.email}</p>
            </div>
          </div>
        </div>

        {/* Center Column: Typewriter Quote Paragraphs + Progress Slider Controls */}
        <div className="flex flex-col justify-between lg:col-span-5 lg:px-4 lg:pt-2">
          <div className="min-h-[8.5rem] space-y-4">
            <p className="text-xs leading-relaxed text-gray-800 sm:text-sm">
              {typedPrimary}
              {inView && typedPrimary.length < current.quotePrimary.length && (
                <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#eb5e38] align-middle" />
              )}
            </p>
            <p className="text-xs leading-relaxed text-gray-500 sm:text-[13px]">
              {typedSecondary}
              {inView &&
                typedPrimary.length === current.quotePrimary.length &&
                typedSecondary.length < current.quoteSecondary.length && (
                  <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#eb5e38] align-middle" />
                )}
            </p>
          </div>

          {/* Slider Progress Bar & Arrows */}
          <div className="mt-8 flex items-center gap-3">
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
                className="h-full bg-[#eb5e38] transition-all duration-500"
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
        </div>

        {/* Right Column: Secondary Offset Architectural Photo */}
        <div className="lg:col-span-4 lg:pt-8">
          <div className="group overflow-hidden rounded-[3px] bg-gray-100 shadow-xs">
            <img
              src={current.secondaryImage}
              alt="Featured client property"
              className={`aspect-[16/10] w-full object-cover transition-all delay-100 duration-700 ease-out group-hover:scale-105 ${
                animateSlide ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials