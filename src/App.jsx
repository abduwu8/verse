import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const avatars = [
  {
    src: '/images/alien.jpg',
    title: 'Alien',
    description: 'Turned the country into Area 51',
  },
  {
    src: '/images/beggar.jpg',
    title: 'Beggar',
    description: 'Made the entire country beg',
  },
  {
    src: '/images/bollywood.jpg',
    title: 'Bollywood',
    description: 'Acting like a hero while the nation suffers',
  },
  {
    src: '/images/clown.jpg',
    title: 'Clown',
    description: "Running the world's biggest circus",
  },
  {
    src: '/images/cricketer.jpg',
    title: 'Cricketer',
    description: 'Master of duck outs and economic zeros',
  },
  {
    src: '/images/footballer.jpg',
    title: 'Footballer',
    description: 'Specialist in scoring own goals',
  },
  {
    src: '/images/jail.jpg',
    title: 'Jail',
    description: 'Locked up democracy and dissent',
  },
  {
    src: '/images/king.jpg',
    title: 'King',
    description: 'Emperor with no clothes',
  },
  {
    src: '/images/ninja.jpg',
    title: 'Ninja',
    description: 'Stealth assassin of institutions',
  },
  {
    src: '/images/pilot.jpg',
    title: 'Pilot',
    description: 'Crashing the economy in style',
  },
  {
    src: '/images/rapper.jpg',
    title: 'Rapper',
    description: 'Dropping broken promises bars',
  },
  {
    src: '/images/shiekh.jpg',
    title: 'Sheikh',
    description: "Oiling Adani's private jets",
  },
  {
    src: '/images/superhero.jpg',
    title: 'Superhero',
    description: 'Saving himself, not the people',
  },
  {
    src: '/images/demon.jpg',
    title: 'Demon',
    description: 'Possessed Indian democracy',
  },
  {
    src: '/images/dictator.jpg',
    title: 'Dictator',
    description: 'Ruling like a dictator while calling it a democracy',
  },
]

const SWIPE_THRESHOLD = 40

function NeoButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center whitespace-nowrap
        rounded-base text-sm font-base transition-all
        bg-secondary-background text-foreground
        border-2 border-border shadow-shadow
        hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
        active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
        touch-manipulation
        ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function Chevron({ dir }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 sm:w-6 sm:h-6"
    >
      {dir === 'left' ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const current = avatars[index]
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const didSwipe = useRef(false)

  // Splash: logo only for 2s
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  const prev = () => {
    setIndex((i) => (i === 0 ? avatars.length - 1 : i - 1))
  }

  const next = () => {
    setIndex((i) => (i === avatars.length - 1 ? 0 : i + 1))
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    didSwipe.current = false
  }

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    didSwipe.current = true
    if (dx < 0) next()
    else prev()
  }

  const openExpanded = () => {
    if (didSwipe.current) return
    setExpanded(true)
  }

  useEffect(() => {
    if (!expanded) return
    const onKey = (e) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  return (
    <div className="relative h-dvh w-full max-w-[100vw] bg-background overflow-hidden font-sans select-none">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="splash"
            className="absolute inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="/modilog.png"
              alt="Modiverse"
              draggable={false}
              className="w-[min(72vw,18rem)] sm:w-[min(50vw,20rem)] h-auto object-contain"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            className="h-full w-full flex flex-col items-center
                       justify-start sm:justify-center
                       gap-0 sm:gap-3
                       px-2 sm:px-4
                       pt-[max(0.25rem,env(safe-area-inset-top))]
                       pb-[max(0.5rem,env(safe-area-inset-bottom))]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
      {/* Logo — bigger on mobile, balanced on desktop */}
      <div className="shrink-0 flex items-center justify-center">
        <img
          src="/modilog.png"
          alt="Modiverse"
          className="h-32 sm:h-24 md:h-28 w-auto object-contain"
          draggable={false}
        />
      </div>

      {/* —— Desktop row: side arrows + image —— */}
      <div className="hidden sm:flex items-center gap-5 w-full max-w-4xl justify-center min-h-0 flex-1">
        <NeoButton
          onClick={prev}
          aria-label="Previous avatar"
          className="shrink-0 size-12 self-center"
        >
          <Chevron dir="left" />
        </NeoButton>

        <div
          className="relative flex flex-col items-center justify-start min-h-0"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Image size locked via CSS — does not reflow with text */}
          <div className="avatar-slot shrink-0">
            <button
              type="button"
              onClick={openExpanded}
              aria-label={`View ${current.title} larger`}
              className="avatar-frame touch-pan-y cursor-zoom-in
                         border-2 border-border rounded-base
                         bg-secondary-background shadow-shadow p-0 block"
            >
              <img
                src={current.src}
                alt={current.title}
                draggable={false}
                className="avatar-img pointer-events-none"
              />
            </button>
          </div>

          {/* Single neo card: blue header + description body */}
          <div
            className="shrink-0 mt-3 w-full max-w-[22rem] min-w-0 overflow-hidden
                       bg-secondary-background border-2 border-border rounded-base shadow-shadow
                       flex flex-col"
          >
            <div className="bg-main text-main-foreground border-b-2 border-border px-4 py-2 flex items-center justify-center">
              <h2 className="text-base font-bold tracking-tight m-0">
                {current.title}
              </h2>
            </div>
            <p className="desc-box w-full min-w-0 px-3 py-2 text-sm font-medium text-neutral-700 m-0">
              {current.description}
            </p>
          </div>
        </div>

        <NeoButton
          onClick={next}
          aria-label="Next avatar"
          className="shrink-0 size-12 self-center"
        >
          <Chevron dir="right" />
        </NeoButton>
      </div>

      {/* —— Mobile: fixed image size, fixed footer —— */}
      <div
        className="sm:hidden flex flex-col items-center w-full min-h-0 flex-1"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="avatar-slot shrink-0">
          <div className="relative">
            <button
              type="button"
              onClick={openExpanded}
              aria-label={`View ${current.title} larger`}
              className="avatar-frame touch-pan-y cursor-zoom-in
                         border-2 border-border rounded-base
                         bg-secondary-background p-0 block"
            >
              <img
                src={current.src}
                alt={current.title}
                draggable={false}
                className="avatar-img pointer-events-none"
              />
            </button>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous avatar"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                         size-9 rounded-full bg-white/95 border-2 border-border
                         flex items-center justify-center touch-manipulation
                         active:scale-95 shadow-sm"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next avatar"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                         size-9 rounded-full bg-white/95 border-2 border-border
                         flex items-center justify-center touch-manipulation
                         active:scale-95 shadow-sm"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        {/* Fixed-height footer: info card only */}
        <div className="shrink-0 w-full max-w-sm px-3 pt-2 pb-2 flex flex-col items-center bg-background">
          <div
            className="w-full min-w-0 overflow-hidden
                       bg-secondary-background border-2 border-border rounded-base shadow-shadow
                       flex flex-col"
          >
            <div className="bg-main text-main-foreground border-b-2 border-border px-3 py-1.5 flex items-center justify-center">
              <h2 className="text-sm font-bold tracking-tight m-0">
                {current.title}
              </h2>
            </div>
            <p className="desc-box w-full min-w-0 px-2.5 py-1.5 font-medium text-neutral-700 m-0">
              {current.description}
            </p>
          </div>
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/70 p-3 sm:p-6
                     pt-[max(0.75rem,env(safe-area-inset-top))]
                     pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} enlarged`}
        >
          <div
            className="relative flex flex-col items-center gap-3 max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="lightbox-frame border-2 border-border rounded-base
                         bg-secondary-background shadow-shadow overflow-hidden"
            >
              <img
                src={current.src}
                alt={current.title}
                draggable={false}
                className="lightbox-img"
              />
            </div>

            <div
              className="max-w-sm w-full overflow-hidden
                         bg-secondary-background border-2 border-border rounded-base shadow-shadow
                         flex flex-col"
            >
              <div className="bg-main text-main-foreground border-b-2 border-border px-4 py-2 flex items-center justify-center">
                <h2 className="text-base font-bold tracking-tight m-0">
                  {current.title}
                </h2>
              </div>
              <p className="desc-box w-full min-w-0 px-3 py-2 text-sm font-medium text-neutral-700 m-0">
                {current.description}
              </p>
            </div>

            <NeoButton
              onClick={() => setExpanded(false)}
              aria-label="Close"
              className="size-11"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </NeoButton>
          </div>
        </div>
      )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
