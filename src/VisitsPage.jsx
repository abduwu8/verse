import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  VISITS,
  UNVISITED_REGIONS,
  NOTABLE_UNVISITED,
  NOTABLE_NOTE,
} from './visits'
import FaceIcon from './FaceIcon.jsx'
import { getFlagUrl, getFlagSrcSet } from './countryFlags'

function CountryChip({ label }) {
  const flag = getFlagUrl(label, 40)
  const srcSet = getFlagSrcSet(label)

  return (
    <li
      className="inline-flex items-center gap-1.5 px-2 py-1 text-xs sm:text-sm font-medium
                 bg-background text-foreground
                 border-2 border-border rounded-base max-w-full"
    >
      {flag ? (
        <img
          src={flag}
          srcSet={srcSet || undefined}
          alt=""
          width={20}
          height={15}
          loading="lazy"
          decoding="async"
          className="w-5 h-[15px] object-cover shrink-0 rounded-[2px] border border-black/15"
        />
      ) : (
        <span
          className="w-5 h-[15px] shrink-0 rounded-[2px] border border-border bg-neutral-200"
          aria-hidden
        />
      )}
      <span className="leading-tight">{label}</span>
    </li>
  )
}

export default function VisitsPage() {
  return (
    <div className="min-h-dvh w-full bg-background font-sans select-none">
      <div
        className="w-full max-w-3xl mx-auto px-4 sm:px-6
                   pt-[max(1rem,env(safe-area-inset-top))]
                   pb-[max(2.5rem,env(safe-area-inset-bottom))]"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-8 sm:mb-10 sticky top-0 z-20
                        bg-background/90 backdrop-blur-sm py-3 -mx-1 px-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold
                       bg-secondary-background text-foreground
                       border-2 border-border rounded-base shadow-shadow
                       hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
                       transition-all"
          >
            ← Home
          </Link>
          <img
            src="/modilog.png"
            alt="Modiverse"
            className="h-11 sm:h-12 w-auto object-contain"
            draggable={false}
          />
          <span className="w-[4.5rem]" aria-hidden />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div
            className="inline-block px-4 py-2 bg-main text-main-foreground
                       border-2 border-border rounded-base shadow-shadow
                       text-lg sm:text-xl font-bold tracking-tight mb-2"
          >
            PM Visits
          </div>
          <p className="text-sm text-neutral-600 font-medium">
            Foreign visits by the goat (more than you ever will)
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[1.15rem] sm:left-1/2 sm:-translate-x-px top-2 bottom-2
                       w-0.5 bg-border"
            aria-hidden
          />

          <ol className="relative space-y-8 sm:space-y-12 list-none m-0 p-0">
            {VISITS.map((entry, i) => {
              const left = i % 2 === 0
              return (
                <motion.li
                  key={entry.year}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                    delay: Math.min(i * 0.03, 0.2),
                  }}
                  className="relative grid grid-cols-[2.5rem_1fr] sm:grid-cols-[1fr_2.75rem_1fr] gap-x-3 sm:gap-x-0 items-start"
                >
                  {/* Mobile: icon in col 1 · Desktop: centered icon */}
                  <div
                    className="row-start-1 col-start-1 sm:col-start-2
                               flex justify-center z-10 pt-1"
                  >
                    <div
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-full
                                 bg-secondary-background border-2 border-border shadow-shadow
                                 flex items-center justify-center overflow-hidden shrink-0"
                    >
                      <FaceIcon className="w-8 h-8 sm:w-10 sm:h-10 scale-110" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`row-start-1 col-start-2 sm:col-start-auto min-w-0
                      ${left ? 'sm:col-start-1 sm:pr-8 sm:text-right' : 'sm:col-start-3 sm:pl-8 sm:text-left'}`}
                  >
                    <div
                      className="overflow-hidden bg-secondary-background
                                 border-2 border-border rounded-base shadow-shadow
                                 text-left"
                    >
                      <div
                        className="bg-main text-main-foreground border-b-2 border-border
                                   px-3 sm:px-4 py-2 flex flex-wrap items-center gap-2
                                   justify-between"
                      >
                        <h2 className="text-base sm:text-lg font-bold tracking-tight m-0">
                          {entry.year}
                        </h2>
                        {entry.note && (
                          <span className="text-[11px] sm:text-xs font-medium text-white/85">
                            {entry.note}
                          </span>
                        )}
                        {!entry.note && entry.countries.length > 0 && (
                          <span className="text-[11px] sm:text-xs font-medium text-white/80 tabular-nums">
                            {entry.countries.length}{' '}
                            {entry.countries.length === 1 ? 'place' : 'places'}
                          </span>
                        )}
                      </div>

                      <div className="px-3 sm:px-4 py-3">
                        {entry.countries.length === 0 ? (
                          <p className="text-sm text-neutral-600 font-medium m-0 leading-snug">
                            {entry.note || 'No visits recorded'}
                          </p>
                        ) : (
                          <ul className="flex flex-wrap gap-1.5 sm:gap-2 m-0 p-0 list-none">
                            {entry.countries.map((c) => (
                              <CountryChip key={`${entry.year}-${c}`} label={c} />
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop empty spacer column for alternating layout */}
                  <div
                    className={`hidden sm:block row-start-1 ${left ? 'col-start-3' : 'col-start-1'}`}
                    aria-hidden
                  />
                </motion.li>
              )
            })}
          </ol>
        </div>

        {/* Countries not visited */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-20"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div
              className="inline-block px-4 py-2 bg-main text-main-foreground
                         border-2 border-border rounded-base shadow-shadow
                         text-lg sm:text-xl font-bold tracking-tight mb-2"
            >
              Countries not visited yet
            </div>
            <p className="text-sm text-neutral-600 font-medium">
              
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {UNVISITED_REGIONS.map((group, gi) => (
              <motion.div
                key={group.region}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: Math.min(gi * 0.04, 0.2) }}
                className="overflow-hidden bg-secondary-background border-2 border-border rounded-base shadow-shadow"
              >
                <div
                  className="bg-main text-main-foreground border-b-2 border-border
                             px-3 sm:px-4 py-2 flex items-center justify-between gap-2"
                >
                  <h3 className="text-sm sm:text-base font-bold tracking-tight m-0">
                    {group.region}
                  </h3>
                  <span className="text-[11px] sm:text-xs font-medium text-white/80 tabular-nums">
                    {group.countries.length}
                  </span>
                </div>
                <div className="px-3 sm:px-4 py-3">
                  <ul className="flex flex-wrap gap-1.5 sm:gap-2 m-0 p-0 list-none">
                    {group.countries.map((c) => (
                      <CountryChip key={`${group.region}-${c}`} label={c} />
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notable callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4 }}
            className="mt-6 sm:mt-8 overflow-hidden bg-secondary-background border-2 border-border rounded-base shadow-shadow"
          >
            <div className="bg-main text-main-foreground border-b-2 border-border px-3 sm:px-4 py-2">
              <h3 className="text-sm sm:text-base font-bold tracking-tight m-0">
                Notable still unvisited
              </h3>
            </div>
            <div className="px-3 sm:px-4 py-3 space-y-3">
              <p className="text-xs sm:text-sm text-neutral-600 font-medium m-0 leading-snug">
                {NOTABLE_NOTE}
              </p>
              <ul className="flex flex-wrap gap-1.5 sm:gap-2 m-0 p-0 list-none">
                {NOTABLE_UNVISITED.map((c) => (
                  <CountryChip key={`notable-${c}`} label={c} />
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
