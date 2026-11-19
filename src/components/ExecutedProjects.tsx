import { useState, useEffect, useRef } from 'react'
import ex1 from '../assets/ex1.png'
import ex2 from '../assets/ex2.png'
import ex3 from '../assets/ex3.png'
import ex4 from '../assets/ex4.png'
import ex5 from '../assets/ex5.png'

const rightProjects = [
  {
    name: 'Maison Noire',
    location: 'Oklahoma City, 2024',
    image: ex2,
  },
  {
    name: 'Villa Bellagio',
    location: 'San Francisco, 2024',
    image: ex3,
  },
  {
    name: 'The Cedar Atrium',
    location: 'Austin, 2025',
    image: ex4,
  },
  {
    name: 'Aurelia Residence',
    location: 'Seattle, 2025',
    image: ex5,
  },
]

const introParagraph =
  'Designed with innovation, built in prime locations, and rooted in sustainability—our projects redefine modern living with comfort and elegance.'

function ExecutedProjects() {
  const [startIdx, setStartIdx] = useState(0)
  const [inView, setInView] = useState(false)
  const [typedIntro, setTypedIntro] = useState('')
  const [isSliderHovered, setIsSliderHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  )
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      className="mx-auto max-w-[1440px] overflow-x-clip px-4 py-14 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Large Column */}
        <div
          className={`transition-all duration-700 ease-out lg:col-span-6 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl leading-[1.08] font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-[48px] lg:text-[54px] xl:text-[60px]">
            <span className="sm:whitespace-nowrap">Executed &amp; in-progress</span>
            <br />
            projects <span className="font-normal text-gray-400">-</span>
          </h2>

          <div className="group mt-10 cursor-pointer">
            {/* Peach Backdrop Card + Clean Cutout House (ex1) Popping Out Top Only */}
            <div className="relative aspect-[4/3] w-full [clip-path:inset(-25%_0_0_0)]">
              <div className="absolute inset-x-0 top-[26%] bottom-0 rounded-[3px] bg-[#f6e3db] transition-colors duration-300 group-hover:bg-[#f2d6ca]" />

              <img
                src={ex1}
                alt="Golden Horizon Villa"
                className="relative z-10 h-full w-full origin-bottom object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-gray-200/70 pb-3 transition-colors duration-300 group-hover:border-[#eb5e38]/40">
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

        {/* Right Offset Column */}
        <div
          className={`flex flex-col justify-between transition-all delay-150 duration-700 ease-out lg:col-span-6 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div>
            {/* Typewriter Intro Paragraph */}
            <p className="min-h-[3.5rem] max-w-md text-xs leading-relaxed text-gray-600 sm:text-sm">
              {typedIntro}
              {inView && typedIntro.length < introParagraph.length && (
                <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#eb5e38] align-middle" />
              )}
            </p>

            {/* Full-Width Slider Controls */}
            <div className="mt-6 flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-xs text-gray-700 transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
              >
                ←
              </button>

              <div className="h-[2px] flex-1 bg-gray-200">
                <div
                  className="h-full bg-gray-700 transition-all duration-500"
                  style={{
                    width: `${((startIdx + 1) / rightProjects.length) * 100}%`,
                  }}
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 text-xs text-gray-700 transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
              >
                →
              </button>
            </div>

            {/* Centered Underlined Link Below Progress Bar */}
            <div className="mt-3 text-center">
              <a
                href="#recent"
                className="inline-block text-xs text-gray-700 transition-colors duration-300 hover:text-[#eb5e38]"
              >
                <span className="font-medium text-gray-900 underline decoration-gray-400 underline-offset-4">
                  Explore more project
                </span>{' '}
                <span>that we have done</span>
              </a>
            </div>
          </div>

          {/* 4 Auto-Sliding 3D Cutout Cards: 1-by-1 on Mobile, 2 Side-by-Side on Desktop */}
          <div
            onMouseEnter={() => setIsSliderHovered(true)}
            onMouseLeave={() => setIsSliderHovered(false)}
            className="mt-8 overflow-x-clip pt-6"
          >
            <div
              className="flex transition-transform duration-700 ease-in-out sm:-mx-3.5"
              style={{
                transform: `translateX(-${startIdx * (isMobile ? 100 : 50)}%)`,
              }}
            >
              {[...rightProjects, rightProjects[0]].map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="group w-full shrink-0 cursor-pointer transition-transform duration-300 hover:-translate-y-1 sm:w-1/2 sm:px-3.5"
                >
                  {/* 72% Peach Backdrop Card + Zoomed House Clipped Cleanly on Left/Right/Bottom */}
                  <div className="relative aspect-[4/3] w-full [clip-path:inset(-25%_0_0_0)] sm:aspect-[11/10]">
                    <div className="absolute inset-x-0 top-[28%] bottom-0 rounded-[3px] bg-[#f6e3db] transition-colors duration-300 group-hover:bg-[#f2d6ca]" />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative z-10 h-full w-full origin-bottom scale-[1.18] object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.24] sm:scale-[1.24] sm:group-hover:scale-[1.30]"
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