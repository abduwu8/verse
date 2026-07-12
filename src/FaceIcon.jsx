import { useEffect, useState } from 'react'

const FACE_SRC = '/images/face.jpg'

/** Face cutout with white background removed — for timeline dots etc. */
export default function FaceIcon({ className = 'w-10 h-10' }) {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const c = document.createElement('canvas')
        c.width = img.naturalWidth || 256
        c.height = img.naturalHeight || 256
        const ctx = c.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0)
        const data = ctx.getImageData(0, 0, c.width, c.height)
        const d = data.data
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i]
          const g = d[i + 1]
          const b = d[i + 2]
          if (r > 235 && g > 235 && b > 235) d[i + 3] = 0
          else if (r > 210 && g > 210 && b > 210) {
            const avg = (r + g + b) / 3
            d[i + 3] = Math.max(0, Math.min(255, (255 - avg) * 6))
          }
        }
        ctx.putImageData(data, 0, 0)
        if (!cancelled) setSrc(c.toDataURL('image/png'))
      } catch {
        if (!cancelled) setSrc(FACE_SRC)
      }
    }
    img.onerror = () => {
      if (!cancelled) setSrc(FACE_SRC)
    }
    img.src = FACE_SRC
    return () => {
      cancelled = true
    }
  }, [])

  if (!src) {
    return (
      <span
        className={`inline-block rounded-full bg-main/20 border-2 border-border ${className}`}
        aria-hidden
      />
    )
  }

  return (
    <img
      src={src}
      alt=""
      draggable={false}
      className={`object-cover object-top select-none pointer-events-none ${className}`}
    />
  )
}
