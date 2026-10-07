import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mandala, Corner } from './Ornaments'
import { ease } from './ui'
import { config } from '../config'

/*
 * Opening: two carved doors, each covering half the screen. Tapping them:
 *   the crest and text fade → both doors swing inwards on their outer hinges
 *   while light spills through the gap, revealing the site behind them.
 * (seconds from the tap)
 */
const T = { swing: 0.3, done: 2.4 }
const SWING = 1.9

function Door({ side, open }) {
  const left = side === 'left'
  return (
    <motion.div
      className={`door absolute inset-y-0 w-1/2 ${left ? 'left-0 origin-left' : 'right-0 origin-right'}`}
      animate={{ rotateY: open ? (left ? 108 : -108) : 0 }}
      transition={{ delay: T.swing, duration: SWING, ease: [0.6, 0, 0.2, 1] }}
    >
      {/* gold frame; the seam side stays tight so the two doors read as one pair */}
      <div className={`absolute inset-y-3 flex flex-col gap-3 border border-gold-400/70 p-2.5 ${left ? 'right-1.5 left-3' : 'right-3 left-1.5'}`}>
        <Corner className={`absolute top-0 w-9 ${left ? 'left-0' : 'right-0 -scale-x-100'}`} color="#e9c08c" />
        <Corner className={`absolute bottom-0 w-9 -scale-y-100 ${left ? 'left-0' : 'right-0 -scale-x-100'}`} color="#e9c08c" />

        {/* carved panels */}
        <div className="door-panel relative flex-[1.5] overflow-hidden rounded-t-full">
          <Mandala className="absolute top-1/2 left-1/2 w-[150%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-30" stroke="#e9c08c" />
        </div>
        <div className="door-panel relative flex-1 overflow-hidden">
          <Mandala className="absolute top-1/2 left-1/2 w-[120%] max-w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-25" stroke="#e9c08c" />
        </div>
      </div>

      {/* brass studs along the seam + ring handle */}
      <div className={`absolute inset-y-8 flex flex-col justify-between ${left ? 'right-3.5' : 'left-3.5'}`}>
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="stud block h-2 w-2 rounded-full" />
        ))}
      </div>
      <div className={`absolute top-[64%] ${left ? 'right-7' : 'left-7'}`}>
        <span className="stud block h-4 w-4 rounded-full" />
        <span className="absolute top-2 left-1/2 block h-10 w-8 -translate-x-1/2 rounded-full border-[3px] border-gold-400 shadow-[0_3px_4px_rgba(0,0,0,.35)]" />
      </div>
    </motion.div>
  )
}

export default function DoorsIntro({ onOpenStart, onDone }) {
  const [opening, setOpening] = useState(false)
  const [gone, setGone] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    navigator.vibrate?.(15)
    onOpenStart?.()
    setTimeout(() => {
      setGone(true)
      onDone?.()
    }, T.done * 1000)
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[60] cursor-pointer overflow-hidden [perspective:1600px]"
          onClick={open}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* light spilling through the gap as the doors part */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-1/2 w-[70vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,244,221,.95),rgba(255,214,140,.5)_40%,transparent_70%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: opening ? [0, 1, 0] : 0 }}
            transition={{ delay: T.swing, duration: SWING, times: [0, 0.35, 1] }}
          />

          <Door side="left" open={opening} />
          <Door side="right" open={opening} />

          {/* crest + text sit across the seam and fade as the doors start to move */}
          <motion.div
            className="relative flex h-full flex-col items-center justify-between px-6 py-[9svh] text-center"
            animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.96 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
              <p className="font-display text-base font-semibold tracking-[0.25em] text-gold-100 uppercase [text-shadow:0_1px_4px_rgba(0,0,0,.55)]">Shri Ganeshaya Namah</p>
              <p className="mt-2.5 font-display text-[13px] font-semibold tracking-[0.25em] text-gold-200 uppercase [text-shadow:0_1px_4px_rgba(0,0,0,.55)]">You have a special invitation</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 1, ease }}>
              <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 p-1 shadow-[0_14px_30px_-8px_rgba(0,0,0,.6)]">
                <img src={config.images.monogram} alt="R N" draggable={false} className="h-full w-full rounded-full bg-ivory select-none" />
              </div>
              <p className="text-foil mt-5 font-script text-5xl leading-none">
                {config.groom.name} &amp; {config.bride.name}
              </p>
              <p className="mt-4 font-display text-[13px] font-semibold tracking-[0.2em] text-gold-100 uppercase [text-shadow:0_1px_4px_rgba(0,0,0,.55)]">Sagai · {config.displayDate}</p>
            </motion.div>

            <div className="flex flex-col items-center">
              <motion.button
                disabled={opening}
                className="relative rounded-full bg-gradient-to-b from-gold-200 to-gold-400 px-9 py-4 font-display text-xs font-semibold tracking-[0.3em] text-cocoa-900 uppercase shadow-[0_14px_30px_-10px_rgba(0,0,0,.7)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-200/40 [animation-duration:2.2s]" />
                <span className="relative">Open Invitation</span>
              </motion.button>
              <motion.p className="mt-4 font-serif text-sm text-gold-100/80 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                or tap the doors
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
