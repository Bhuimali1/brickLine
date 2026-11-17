import { useState, useEffect } from 'react'

const heroSlides = [
  {
    badge: 'Signature home',
    title: 'Your high-end\nHaven awaits',
    subtitle:
      'Discover lavish interiors, curated design, premium amenities, and personalized services that define an elevated lifestyle.',
    caption:
      'Unlock the potential of real estate with strategic insights, innovative solutions, and exceptional service.',
    tag: 'Heat resistance',
    image:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1800&q=80',
  },
  {
    badge: 'Architectural luxury',
    title: 'Modern living\nreimagined',
    subtitle:
      'Bespoke residences crafted with timeless stone, warm timber, and panoramic natural light.',
    caption:
      'Experience end-to-end architectural planning, sustainable engineering, and curated property management.',
    tag: 'Solar glazed',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80',
  },
]

function Hero() {
  const [index, setIndex] = useState(0)
  const [typedSubtitle, setTypedSubtitle] = useState('')
  const [typedCaption, setTypedCaption] = useState('')
  const slide = heroSlides[index]

  // Automatic slide every 4 seconds (resets timer after manual arrow click)
  useEffect(() => {
    const autoTimer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length)
    }, 4000)

    return () => clearInterval(autoTimer)
  }, [index])

  // Typewriter animation triggered on mount and every slide change
  useEffect(() => {
    setTypedSubtitle('')
    setTypedCaption('')

    let subChar = 0
    let capChar = 0

    const subInterval = setInterval(() => {
      subChar += 1
      setTypedSubtitle(slide.subtitle.slice(0, subChar))
      if (subChar >= slide.subtitle.length) {
        clearInterval(subInterval)
      }
    }, 18)

    const capInterval = setInterval(() => {
      capChar += 1
      setTypedCaption(slide.caption.slice(0, capChar))
      if (capChar >= slide.caption.length) {
        clearInterval(capInterval)
      }
    }, 20)

    return () => {
      clearInterval(subInterval)
      clearInterval(capInterval)
    }
  }, [index, slide.subtitle, slide.caption])

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % heroSlides.length)

  return (
    <section className="relative w-full">
      {/* Main Hero Frame */}
      <div className="relative min-h-[580px] w-full overflow-hidden bg-gray-900 md:min-h-[660px]">
        {/* Sliding & Crossfading Background Track */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroSlides.map((item, idx) => (
            <div key={item.title} className="relative h-full w-full shrink-0">
              <img
                src={item.image}
                alt={item.badge}
                className={`h-full w-full object-cover object-center transition-transform duration-[4000ms] ease-out ${
                  idx === index ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Subtle top & bottom gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/65" />

        <div className="relative z-10 mx-auto flex min-h-[580px] max-w-7xl flex-col justify-between px-4 pt-28 pb-10 md:min-h-[660px] md:px-10 md:pt-36">
          {/* Upper Content Row */}
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-lg">
              <span className="inline-block cursor-default rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[11px] font-medium text-white backdrop-blur-xs transition-all duration-300 hover:border-[#eb5e38] hover:bg-[#eb5e38]/80">
                {slide.badge}
              </span>

              <h1
                key={slide.title}
                className="mt-4 whitespace-pre-line text-4xl leading-[1.12] font-medium tracking-tight text-white transition-all duration-500 sm:text-5xl md:text-[56px]"
              >
                {slide.title}
              </h1>

              {/* Typewriter Subtitle Paragraph */}
              <p className="mt-4 min-h-[3.75rem] max-w-sm text-xs leading-relaxed text-white/85 sm:text-sm">
                {typedSubtitle}
                <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-[#eb5e38] align-middle" />
              </p>
            </div>

            {/* Floating Feature Tag over House */}
            <div className="self-start md:mt-6 md:mr-28 md:self-center">
              <span className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/35 bg-black/35 px-4 py-1.5 text-[11px] font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#eb5e38] hover:bg-black/60 hover:shadow-lg">
                <span className="h-2 w-2 rounded-full bg-[#eb5e38] transition-transform duration-300 group-hover:scale-125" />
                <span>{slide.tag}</span>
              </span>
            </div>
          </div>

          {/* Bottom Controls Row */}
          <div className="mt-12 grid grid-cols-1 items-end gap-6 md:grid-cols-12">
            {/* Left CTA */}
            <div className="md:col-span-3">
              <a
                href="#recent"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-[2px] bg-white px-5 py-3 text-[11px] font-bold tracking-wider text-gray-900 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eb5e38] hover:text-white hover:shadow-xl active:scale-95"
              >
                <span>FIND PROPERTY</span>
                <span className="-translate-y-[1px] transition-transform duration-300 group-hover:translate-x-1">
                  &gt;
                </span>
              </a>
            </div>

            {/* Center Slider Progress & Typewriter Caption */}
            <div className="md:col-span-6 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/40 text-xs text-white transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
                >
                  ←
                </button>
                <div className="h-[2px] flex-1 bg-white/30">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{
                      width: `${((index + 1) / heroSlides.length) * 100}%`,
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/40 text-xs text-white transition-all duration-300 hover:scale-110 hover:border-[#eb5e38] hover:bg-[#eb5e38] hover:text-white active:scale-90"
                >
                  →
                </button>
              </div>
              <p className="mt-3 min-h-[2.5rem] text-center text-[11px] leading-relaxed text-white/85 sm:text-xs">
                {typedCaption}
              </p>
            </div>

            {/* Spacer for Overlapping Consultation Card */}
            <div className="hidden md:col-span-3 md:block" />
          </div>
        </div>
      </div>

      {/* Overlapping Bottom-Right Consultation Card */}
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <div className="group relative z-20 mx-auto -mt-10 w-full max-w-[290px] rounded-[3px] bg-white shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl md:-mt-28 md:mr-0 md:ml-auto md:max-w-[260px]">
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 bg-[#eb5e38] px-4 py-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#d9502b] active:scale-95"
          >
            <span className="transition-transform duration-300 group-hover:rotate-12">
              📞
            </span>
            <span>Book a Consultation</span>
          </a>
          <div className="flex items-center gap-3 p-3">
            <div className="overflow-hidden rounded-xs">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
                alt="Lead Property Advisor"
                className="h-24 w-20 object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38]">
                Daniel Mercer
              </p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                Senior Estates Advisor
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#eb5e38]">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#eb5e38]" />
                Available Today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero