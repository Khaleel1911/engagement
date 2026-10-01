import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Ganesh, Corner } from './Ornaments'
import { ease } from './ui'
import { config } from '../config'

/*
 * Opening: a sealed envelope. Tapping "Open Invitation":
 *   seal cracks → flap flips open → card slides out → card grows to fill the
 *   screen while the envelope drops away, revealing the site behind it.
 * (seconds from the tap)
 */
const T = { flap: 0.35, card: 1.1, zoom: 2.0, done: 3.0 }

const drop = { y: 480, rotate: 6, opacity: 0 }
const dropTransition = { duration: 0.9, ease: [0.5, 0, 0.75, 0] }

function Seal({ broken }) {
  return (
    <motion.div
      className="absolute top-[52%] left-1/2 -mt-12 -ml-12 grid h-24 w-24 place-items-center"
      animate={broken ? { scale: [1, 1.18, 0], rotate: [0, -8, 20], opacity: [1, 1, 0] } : { scale: 1 }}
      transition={{ duration: 0.5, times: [0, 0.35, 1], ease: 'easeIn' }}
    >
      <svg viewBox="0 0 72 72" className="absolute inset-0 h-full w-full drop-shadow-[0_4px_6px_rgba(120,40,30,.45)]">
        <defs>
          <radialGradient id="wax" cx=".38" cy=".32" r=".75">
            <stop offset="0" stopColor="#ec9b88" />
            <stop offset=".55" stopColor="#c9604f" />
            <stop offset="1" stopColor="#99433a" />
          </radialGradient>
        </defs>
        <path
          d="M36 3c5 0 7 3 11 4s8 0 11 4 1 7 3 11 6 6 6 11-4 7-5 11 1 8-3 11-7 1-11 3-6 6-11 6-7-4-11-5-8 1-11-3-1-7-3-11-6-6-6-11 4-7 5-11-1-8 3-11 7-1 11-3S31 3 36 3z"
          fill="url(#wax)"
        />
        <circle cx="36" cy="36" r="25" fill="none" stroke="#7d352d" strokeOpacity=".35" strokeWidth="1" />
      </svg>
      <img
        src={config.images.monogram}
        alt="R N"
        draggable={false}
        className="relative h-[64%] w-[64%] rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,.05),0_0_0_1.5px_#e9c08c] select-none"
      />
    </motion.div>
  )
}

function Flap() {
  return (
    <>
      <svg viewBox="0 0 100 58" preserveAspectRatio="none" className="absolute inset-0 h-full w-full drop-shadow-[0_3px_4px_rgba(120,60,40,.18)] [backface-visibility:hidden]">
        <defs>
          <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbf3e8" />
            <stop offset="1" stopColor="#f1dfc8" />
          </linearGradient>
        </defs>
        <path d="M0 0 H100 L54 52 Q50 56 46 52 Z" fill="url(#env-flap)" />
        <path d="M0 0 L46 52 Q50 56 54 52 L100 0" fill="none" stroke="#d4a568" strokeWidth=".5" />
        <path d="M8 3 L48 48 M92 3 L52 48" stroke="#e9d5b8" strokeWidth=".25" />
      </svg>
      {/* inside of the flap (seen once it's flipped open) */}
      <svg viewBox="0 0 100 58" preserveAspectRatio="none" className="absolute inset-0 h-full w-full [transform:rotateX(180deg)] [backface-visibility:hidden]">
        <path d="M0 0 H100 L54 52 Q50 56 46 52 Z" fill="#e8a797" />
        <path d="M6 2 H94 L53 48 Q50 51 47 48 Z" fill="#f2cabd" />
      </svg>
    </>
  )
}

function Pocket() {
  return (
    <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="absolute inset-0 h-full w-full drop-shadow-[0_-2px_3px_rgba(120,60,40,.12)]">
      <defs>
        <linearGradient id="env-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f6e9da" />
          <stop offset="1" stopColor="#fbf4ea" />
        </linearGradient>
        <linearGradient id="env-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdf8f1" />
          <stop offset="1" stopColor="#f3e3cf" />
        </linearGradient>
      </defs>
      <path d="M0 2 L50 40 L0 70Z" fill="url(#env-side)" />
      <path d="M100 2 L50 40 L100 70Z" fill="url(#env-side)" />
      <path d="M0 70 L50 34 L100 70Z" fill="url(#env-bottom)" />
      <path d="M0 70 L50 34 L100 70" fill="none" stroke="#d4a568" strokeWidth=".35" />
      <path d="M0 2 L50 40 M100 2 L50 40" fill="none" stroke="#e8d3b5" strokeWidth=".3" />
      <rect x=".4" y=".4" width="99.2" height="69.2" rx="2.4" fill="none" stroke="#d4a568" strokeWidth=".6" />
      <text x="50" y="62" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="2.6" letterSpacing="1.1" fill="#b8894a">
        FOR OUR DEAREST FAMILY &amp; FRIENDS
      </text>
    </svg>
  )
}

/*
 * Layer order (back → front):
 *   back/liner (1) · flap once open (2) · card (3) · pocket (4) · flap while closed (5) · seal (6)
 *   while zooming the card jumps to the very front (10).
 */
function Envelope({ opening, zooming }) {
  const [flapOpen, setFlapOpen] = useState(false)
  return (
    <div className="relative mx-auto aspect-[10/7] w-[min(88vw,380px)] [perspective:1200px]">
      <motion.div className="absolute inset-0 z-[1]" animate={zooming ? drop : { y: 0 }} transition={dropTransition}>
        <div className="absolute inset-0 overflow-hidden rounded-[10px] bg-gradient-to-b from-blush-200 to-blush-300 shadow-[0_30px_60px_-20px_rgba(158,74,63,.55)]">
          <div className="bg-blush absolute inset-2 rounded-md opacity-80" />
        </div>
      </motion.div>

      {/* flap: in front while closed, behind the card once it has swung open */}
      <motion.div className="absolute inset-0" style={{ zIndex: flapOpen ? 2 : 5 }} animate={zooming ? drop : { y: 0 }} transition={dropTransition}>
        <motion.div
          className="absolute inset-x-0 top-0 h-[58%] origin-top [transform-style:preserve-3d]"
          animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ delay: T.flap, duration: 0.8, ease: [0.5, 0, 0.3, 1] }}
          onUpdate={(v) => {
            if (!flapOpen && parseFloat(v.rotateX) > 90) setFlapOpen(true)
          }}
        >
          <Flap />
        </motion.div>
      </motion.div>

      {/* the invitation card: slides out, then grows to fill the screen */}
      <motion.div
        className="absolute inset-x-[5%] top-[8%] bottom-[6%]"
        style={{ zIndex: zooming ? 10 : 3 }}
        animate={zooming ? { y: '-20%', scale: 7 } : opening ? { y: '-60%' } : { y: '0%' }}
        transition={zooming ? { duration: 1, ease: [0.7, 0, 0.3, 1] } : { delay: T.card, duration: 0.8, ease }}
      >
        <div className="relative h-full rounded-md border border-gold-300 bg-ivory shadow-[0_8px_20px_-8px_rgba(90,40,30,.4)]">
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center" animate={{ opacity: zooming ? 0 : 1 }} transition={{ duration: 0.25 }}>
            <Corner className="absolute top-1 left-1 w-7" />
            <Corner className="absolute top-1 right-1 w-7 -scale-x-100" />
            <Ganesh glow={false} className="h-12 w-12" />
            <p className="mt-1 font-script text-[1.9rem] leading-none text-rose">
              {config.groom.name} &amp; {config.bride.name}
            </p>
            <p className="mt-1 font-display text-[8px] tracking-[0.35em] text-gold-500 uppercase">Sagai · {config.displayDate}</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="pointer-events-none absolute inset-0 z-[4]" animate={zooming ? drop : { y: 0 }} transition={dropTransition}>
        <Pocket />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-[6]">
        <Seal broken={opening} />
      </div>
    </div>
  )
}

export default function EnvelopeIntro({ onOpenStart, onDone }) {
  const [opening, setOpening] = useState(false)
  const [zooming, setZooming] = useState(false)
  const [gone, setGone] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    navigator.vibrate?.(15)
    setTimeout(() => {
      setZooming(true)
      onOpenStart?.()
    }, T.zoom * 1000)
    setTimeout(() => {
      setGone(true)
      onDone?.()
    }, T.done * 1000)
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="fixed inset-0 z-[60] overflow-hidden" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          {/* backdrop: fades away as the card grows, revealing the site behind */}
          <motion.div className="bg-blush absolute inset-0" animate={{ opacity: zooming ? 0 : 1 }} transition={{ duration: 0.8, delay: 0.15 }} />

          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={opening ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
              transition={{ duration: opening ? 0.6 : 1, ease }}
            >
              <p className="font-display text-[11px] tracking-[0.3em] text-blush-500 uppercase">Shri Ganeshaya Namah</p>
              <Ganesh className="float mx-auto mt-2 h-32 w-28" />
              <p className="mt-3 font-display text-[10px] tracking-[0.45em] text-gold-500 uppercase">You have a special invitation</p>
            </motion.div>

            {/* the envelope floats gently until it's opened */}
            <motion.div
              className="mt-7 w-full cursor-pointer"
              onClick={open}
              initial={{ opacity: 0, y: 40 }}
              animate={opening ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 1, y: [0, -8, 0], rotate: [-1.2, 1.2, -1.2] }}
              transition={
                opening
                  ? { duration: 0.4 }
                  : { opacity: { duration: 1, delay: 0.3 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }
              }
            >
              <Envelope opening={opening} zooming={zooming} />
            </motion.div>

            <motion.div animate={{ opacity: opening ? 0 : 1, y: opening ? 20 : 0 }} transition={{ duration: 0.4 }} className="mt-10 flex flex-col items-center">
              <motion.button
                onClick={open}
                disabled={opening}
                className="relative rounded-full bg-gradient-to-b from-blush-300 to-blush-400 px-9 py-4 font-display text-xs font-semibold tracking-[0.3em] text-white uppercase shadow-[0_14px_30px_-10px_rgba(214,117,100,.9)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-blush-300/40 [animation-duration:2.2s]" />
                <span className="relative">Open Invitation</span>
              </motion.button>
              <motion.p className="mt-4 font-serif text-sm text-cocoa-600 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                or tap the seal
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
