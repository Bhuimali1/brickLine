import { useState, useEffect, useRef } from 'react'

function RecentProjects() {
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
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="recent"
      ref={sectionRef}
      className="mx-auto max-w-[1440px] px-4 pt-2 pb-10 sm:px-6 md:pt-4 md:pb-12 lg:px-8"
    >
      {/* Centered Header with Scroll Reveal */}
      <div
        className={`text-center transition-all duration-700 ease-out ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <span className="inline-block cursor-default rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1 text-[10px] font-semibold tracking-wider text-gray-600 uppercase transition-colors duration-300 hover:border-[#eb5e38] hover:text-[#eb5e38]">
          Recent Projects
        </span>
        <h2 className="mt-2.5 text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
          <span className="font-light text-gray-400">-</span> Redefining urban
          living <span className="font-light text-gray-400">-</span>
        </h2>
      </div>

      {/* 3-Column Asymmetric Showcase */}
      <div className="mt-7 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        {/* Left Card */}
        <div
          style={{ transitionDelay: inView ? '80ms' : '0ms' }}
          className={`group flex flex-col justify-between overflow-hidden rounded-[3px] border border-gray-100 bg-white transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#eb5e38]/30 hover:shadow-xl hover:shadow-black/5 lg:col-span-3 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div>
            <div className="overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=700&q=80"
                alt="Botaniq kitchen & restaurant"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38]">
                Botaniq kitchen &amp; restaurant
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">
                Eco-friendly space fueled by the sun and enriched with nature.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="flex cursor-pointer items-center justify-between bg-[#eb5e38] px-4 py-3 text-[10px] font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#d9502b] active:scale-[0.99]"
          >
            <span>VIEW DETAILS</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &gt;
            </span>
          </a>
        </div>

        {/* Center Wide Featured Card */}
        <div
          style={{ transitionDelay: inView ? '180ms' : '0ms' }}
          className={`group flex flex-col justify-between overflow-hidden rounded-[3px] border border-gray-100 bg-white transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#eb5e38]/30 hover:shadow-xl hover:shadow-black/5 lg:col-span-6 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div>
            <div className="relative overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=80"
                alt="Prime edge business park"
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Top-left Property Filter Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="rounded-[2px] bg-black/55 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-xs transition-transform duration-300 hover:-translate-y-0.5">
                  Rent{' '}
                  <strong className="ml-1 rounded-[2px] bg-white px-1.5 py-0.5 text-gray-900">
                    $150k
                  </strong>
                </span>
                <span className="rounded-[2px] bg-black/55 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-xs transition-transform duration-300 hover:-translate-y-0.5">
                  Rooms{' '}
                  <strong className="ml-1 rounded-[2px] bg-white px-1.5 py-0.5 text-gray-900">
                    Four
                  </strong>
                </span>
                <span className="rounded-[2px] bg-black/55 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-xs transition-transform duration-300 hover:-translate-y-0.5">
                  Place{' '}
                  <strong className="ml-1 rounded-[2px] bg-white px-1.5 py-0.5 text-gray-900">
                    Arizona
                  </strong>
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38]">
                Prime edge business park
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                It&apos;s an innovative business center created with a focus on
                sustainable development.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="flex cursor-pointer items-center justify-between border-t border-gray-100 bg-white px-5 py-3.5 text-[10px] font-bold tracking-wider text-gray-900 uppercase transition-all duration-300 group-hover:border-[#eb5e38] group-hover:bg-[#eb5e38] group-hover:text-white active:scale-[0.99]"
          >
            <span>VIEW DETAILS</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &gt;
            </span>
          </a>
        </div>

        {/* Right Card */}
        <div
          style={{ transitionDelay: inView ? '280ms' : '0ms' }}
          className={`group flex flex-col justify-between overflow-hidden rounded-[3px] border border-gray-100 bg-white transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#eb5e38]/30 hover:shadow-xl hover:shadow-black/5 lg:col-span-3 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div>
            <div className="overflow-hidden bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80"
                alt="Renewasphere district"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-[#eb5e38]">
                Renewasphere district
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">
                A circular economy in action — fully recycled, fully renewable.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="flex cursor-pointer items-center justify-between bg-[#eb5e38] px-4 py-3 text-[10px] font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-[#d9502b] active:scale-[0.99]"
          >
            <span>VIEW DETAILS</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &gt;
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default RecentProjects