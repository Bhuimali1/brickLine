import { useState, useEffect, useRef } from 'react'

const rightProjects = [
  {
    name: 'Maison Noire',
    location: 'Oklahoma City, 2024',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Villa Bellagio',
    location: 'San Francisco, 2024',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'The Cedar Atrium',
    location: 'Austin, 2025',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
  },
]

const introParagraph =
  'Designed with innovation, built in prime locations, and rooted in sustainability—our projects redefine modern living with comfort and elegance.'

function ExecutedProjects() {
  const [startIdx, setStartIdx] = useState(0)
  const [inView, setInView] = useState(false)
  const [typedIntro, setTypedIntro] = useState('')
  const [isSliderHovered, setIsSliderHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  // 2. Typewriter animation on the selected intro paragraph whenever scrolled into view
  useEffect(() => {
    if (!inView) {
      setTypedIntro('')
      return
    }

    let charIndex = 0
    const timer = setInterval(() => {
      charIndex += 1
      setTypedIntro(introParagraph.slice(0, charIndex))
      if (charIndex >= introParagraph.length) {
        clearInterval(timer)
      }
    }, 18)

    return () => clearInterval(timer)
  }, [inView])

  // 3. Automatic slide every 3.5 seconds (pauses when hovering over the slide images)
  useEffect(() => {
    if (isSliderHovered) return

    const autoSlide = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % rightProjects.length)
    }, 3500)

    return () => clearInterval(autoSlide)
  }, [startIdx, isSliderHovered])

  const handlePrev = () =>
    setStartIdx((prev) => (prev === 0 ? rightProjects.length - 1 : prev - 1))
  const handleNext = () =>
    setStartIdx((prev) => (prev + 1) % rightProjects.length)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="mx-auto max-w-7xl overflow-hidden px-4 py-14 md:px-10 md:py-20"
    >
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Left Large Column with Scroll Reveal */}
        <div
          className={`transition-all duration-700 ease-out lg:col-span-6 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl leading-tight font-medium tracking-tight text-gray-900 sm:text-4xl md:text-[42px]">
            Executed &amp; in-progress
            <br />
            projects <span className="font-light text-gray-400">-</span>
          </h2>

          <div className="group mt-8 cursor-pointer overflow-hidden">
            <div className="overflow-hidden rounded-[3px] bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1000&q=80"
                alt="Golden Horizon Villa"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-gray-100 pb-3 transition-colors duration-300 group-hover:border-[#eb5e38]/40">
              <h3 className="text-base font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38] sm:text-lg">
                Golden Horizon Villa
              </h3>
              <span className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-800">
                South carolina, 2025
              </span>
            </div>

            <p className="mt-2.5 max-w-md text-xs leading-relaxed text-gray-500">
              Experience elevated living in luxury high-rise apartments offering
              stunning views, modern comforts, and convenience.
            </p>
          </div>
        </div>

        {/* Right Offset Column with Scroll Reveal */}
        <div
          className={`flex flex-col justify-between transition-all delay-150 duration-700 ease-out lg:col-span-6 lg:pt-12 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div>
            {/* Typewriter Intro Paragraph */}
            <p className="min-h-[3.75rem] max-w-md text-xs leading-relaxed text-gray-600 sm:text-sm">
              {typedIntro}
              {inView && typedIntro.length < introParagraph.length && (
                <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#eb5e38] align-middle" />
              )}
            </p>

            {/* Slider Controls + Animated Underlined Link */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-xs text-gray-700 transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
              >
                ←
              </button>

              <a
                href="#recent"
                className="relative py-1 text-center text-xs font-medium text-gray-800 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-gray-300 after:transition-colors after:duration-300 hover:text-[#eb5e38] hover:after:bg-[#eb5e38]"
              >
                Explore more project that we have done
              </a>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-xs text-gray-700 transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
              >
                →
              </button>
            </div>
          </div>

          {/* Two Auto-Sliding Vertical Cards (Pauses on Hover) */}
          <div
            onMouseEnter={() => setIsSliderHovered(true)}
            onMouseLeave={() => setIsSliderHovered(false)}
            className="mt-8 overflow-hidden"
          >
            <div
              className="-mx-2.5 flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${startIdx * 50}%)`,
              }}
            >
              {[...rightProjects, rightProjects[0]].map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="group w-full shrink-0 cursor-pointer px-2.5 transition-transform duration-300 hover:-translate-y-1 sm:w-1/2"
                >
                  <div className="overflow-hidden rounded-[3px] bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38]">
                      {item.name}
                    </h4>
                    <span className="-translate-x-1.5 text-xs text-[#eb5e38] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                    {item.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExecutedProjects