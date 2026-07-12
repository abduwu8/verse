import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TENOR_MODI_GIFS, downloadGif } from './tenorGifs'

export default function GifGallery() {
  const gifs = TENOR_MODI_GIFS
  const [expanded, setExpanded] = useState(null)
  const [downloading, setDownloading] = useState(null)

  const handleDownload = async (e, gif) => {
    e.stopPropagation()
    setDownloading(gif.id)
    await downloadGif(gif.url, gif.filename || `${gif.id}.gif`)
    setDownloading(null)
  }

  return (
    <div className="min-h-dvh w-full bg-background font-sans select-none">
      <div
        className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-10
                   pt-[max(1rem,env(safe-area-inset-top))]
                   pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
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
            className="h-12 sm:h-14 w-auto object-contain"
            draggable={false}
          />
          <span className="w-[4.5rem]" aria-hidden />
        </div>

        <div className="flex flex-col items-center gap-2 mb-6 sm:mb-8">
          <div
            className="px-4 py-2 bg-main text-main-foreground
                       border-2 border-border rounded-base shadow-shadow
                       text-lg sm:text-xl font-bold tracking-tight"
          >
            Modi GIFs
          </div>
          <p className="text-sm text-neutral-600 text-center font-medium max-w-md">
            Tap a GIF to enlarge · use Download to save
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {gifs.map((gif, i) => (
            <motion.div
              key={gif.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
              className="flex flex-col gap-2"
            >
              <button
                type="button"
                onClick={() => setExpanded(gif)}
                className="group relative aspect-square overflow-hidden
                           bg-secondary-background border-2 border-border rounded-base shadow-shadow
                           p-0 cursor-pointer
                           hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
                           transition-all"
              >
                <img
                  src={gif.url}
                  alt={gif.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>

              <button
                type="button"
                onClick={(e) => handleDownload(e, gif)}
                disabled={downloading === gif.id}
                className="w-full py-1.5 px-2 text-xs sm:text-sm font-bold
                           bg-main text-main-foreground
                           border-2 border-border rounded-base shadow-shadow
                           hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
                           active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none
                           transition-all disabled:opacity-60"
              >
                {downloading === gif.id ? 'Saving…' : 'Download'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-black/75 p-4
                     pt-[max(0.75rem,env(safe-area-inset-top))]
                     pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          onClick={() => setExpanded(null)}
          role="dialog"
          aria-modal="true"
          aria-label={expanded.title}
        >
          <div
            className="relative max-w-lg w-full flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full overflow-hidden border-2 border-border rounded-base shadow-shadow bg-secondary-background">
              <img
                src={expanded.url}
                alt={expanded.title}
                className="w-full h-auto max-h-[70dvh] object-contain mx-auto"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => handleDownload(e, expanded)}
                disabled={downloading === expanded.id}
                className="px-4 py-2 bg-main text-main-foreground border-2 border-border rounded-base shadow-shadow
                           font-bold text-sm
                           hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
                           transition-all disabled:opacity-60"
              >
                {downloading === expanded.id ? 'Saving…' : 'Download'}
              </button>
              <button
                type="button"
                onClick={() => setExpanded(null)}
                className="px-4 py-2 bg-secondary-background border-2 border-border rounded-base shadow-shadow
                           font-bold text-sm
                           hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none
                           transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
