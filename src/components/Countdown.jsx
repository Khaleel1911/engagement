import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionTitle, Reveal, Parallax } from './ui'
import { Diya, GodnaBand, Mandala } from './Ornaments'
import { config } from '../config'

function diff(target) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    done: ms === 0,
    Days: Math.floor(ms / 864e5),
    Hours: Math.floor(ms / 36e5) % 24,
    Minutes: Math.floor(ms / 6e4) % 60,
    Seconds: Math.floor(ms / 1e3) % 60,
  }
}

function Digit({ value }) {
  const v = String(value).padStart(2, '0')
  return (
    <span className="relative inline-flex h-12 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={v}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block tabular-nums"
        >
          {v}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Countdown() {
  const [t, setT] = useState(() => diff(config.mainDate))
  useEffect(() => {
    const i = setInterval(() => setT(diff(config.mainDate)), 1000)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="bg-champagne relative flex flex-col justify-center px-5 pt-20 pb-20">
      <GodnaBand className="absolute top-0 left-0" />
      <Parallax speed={-0.4} className="pointer-events-none absolute top-1/2 left-1/2 -mt-[180px] -ml-[180px] h-[360px] w-[360px]">
        <Mandala className="spin-slow h-full w-full opacity-30" />
      </Parallax>

      <div className="relative">
        <SectionTitle kicker="The auspicious muhurat" hindi="शुभ घड़ी के अगोरा" title="Counting Every Moment" />

        {t.done ? (
          <Reveal className="text-center font-script text-5xl text-rose">The day is here!</Reveal>
        ) : (
          <Reveal className="mx-auto grid max-w-md grid-cols-4 gap-2.5">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((u) => (
              <div key={u} className="arch flex flex-col items-center border border-gold-300 bg-ivory/80 px-1 pt-5 pb-3 shadow-[0_18px_30px_-18px_rgba(158,74,63,.4)]">
                <span className="font-display text-[2rem] leading-[3rem] font-semibold text-blush-400">
                  <Digit value={t[u]} />
                </span>
                <span className="mt-1 font-display text-[9px] tracking-[0.2em] text-gold-500 uppercase">{u}</span>
              </div>
            ))}
          </Reveal>
        )}

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="font-display text-sm tracking-[0.22em] text-cocoa-700">{config.displayDate}</p>
        </Reveal>

        <div className="mt-10 flex justify-center gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Diya key={i} className="w-10" delay={i * 0.3} />
          ))}
        </div>
      </div>
    </div>
  )
}
