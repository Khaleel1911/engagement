import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { SectionTitle, Photo, Parallax, InView } from './ui'
import { Sprig } from './Ornaments'
import { config } from '../config'

const tilts = [-4, 3, -2, 4, -3, 2]

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const items = config.gallery

  return (
    <div className="bg-blush relative py-24">
      <Parallax speed={0.6} rotate={-12} className="pointer-events-none absolute top-16 -right-2 w-12 -scale-x-100 opacity-70">
        <Sprig className="w-full" />
      </Parallax>
      <div className="px-5">
        <SectionTitle kicker="Captured with love" hindi="यादें" title="Moments" />
      </div>

      {/* two-column polaroid wall; every photo reveals as it scrolls into view */}
      <div className="mx-auto grid max-w-md grid-cols-2 gap-x-4 gap-y-8 px-5 pt-2 pb-6 sm:max-w-3xl sm:grid-cols-4">
        {items.map((g, i) => (
          <InView as="button"
            key={i}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilts[i % tilts.length] }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: (i % 2) * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`relative bg-white p-2 pb-9 text-left shadow-[0_20px_40px_-20px_rgba(158,74,63,.5)] ${i % 2 ? 'mt-10' : ''}`}
          >
            <Photo src={g.src} alt={g.caption} label={`Photo ${i + 1}`} className="aspect-[3/4] w-full" position={g.position} />
            <p className="absolute right-0 bottom-1.5 left-0 text-center font-script text-2xl text-blush-500">{g.caption}</p>
          </InView>
        ))}
      </div>
      <p className="text-center font-display text-[9px] tracking-[0.3em] text-gold-500 uppercase">Tap a photo to view</p>

      {createPortal(
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-cocoa-900/85 p-6 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div initial={{ scale: 0.85, rotate: -3 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.85, opacity: 0 }} className="bg-white p-3 pb-12" onClick={(e) => e.stopPropagation()}>
              <Photo src={items[open].src} alt={items[open].caption} label={`Photo ${open + 1}`} className="h-[60svh] w-[78vw] max-w-md" />
              <p className="mt-3 text-center font-script text-3xl text-blush-500">{items[open].caption}</p>
            </motion.div>
            <button className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-gold-300 text-gold-100" aria-label="Close">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </div>
  )
}
