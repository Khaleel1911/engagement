import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SectionTitle, Parallax } from './ui'
import { Diya } from './Ornaments'
import { showerPetals } from './Petals'
import { celebrate } from './celebrate'

// Seven diyas: one for each vachan. Light them all to bless the couple.
const VACHANS = ['Love', 'Respect', 'Trust', 'Friendship', 'Patience', 'Joy', 'Togetherness']

export default function Aashirwad() {
  const [lit, setLit] = useState(0)
  const done = lit >= VACHANS.length

  const light = (i, e) => {
    if (i !== lit) return
    const r = e.currentTarget.getBoundingClientRect()
    showerPetals(r.left + r.width / 2, r.top, 10)
    navigator.vibrate?.(20)
    const next = lit + 1
    setLit(next)
    if (next === VACHANS.length) setTimeout(celebrate, 250)
  }

  return (
    <div className="bg-dusk relative flex flex-col justify-center px-5 py-24 text-center text-gold-100">
      {/* the night warms up as diyas are lit */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,rgba(255,200,130,var(--glow)),transparent_60%)] transition-all duration-700"
        style={{ '--glow': 0.04 + lit * 0.05 }}
      />
      {/* parallax stars */}
      <Parallax speed={-0.3} className="pointer-events-none absolute inset-0">
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            className="glow-pulse absolute h-1 w-1 rounded-full bg-gold-100"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 90}%`, animationDelay: `${(i % 7) * 0.4}s`, opacity: 0.6 }}
          />
        ))}
      </Parallax>

      <div className="relative">
        <SectionTitle dark kicker="An interactive blessing" title="Light Seven Diyas" />
        <p className="mx-auto -mt-4 max-w-xs font-serif text-lg text-gold-100/80 italic">
          One for each promise. Tap them one by one to send your blessing to the couple.
        </p>

        <div className="mx-auto mt-10 flex max-w-sm flex-wrap justify-center gap-y-6">
          {VACHANS.map((v, i) => (
            <motion.button
              key={v}
              onClick={(e) => light(i, e)}
              whileTap={{ scale: 0.9 }}
              animate={i === lit ? { y: [0, -6, 0] } : { y: 0 }}
              transition={i === lit ? { duration: 1.4, repeat: Infinity } : {}}
              className="flex w-1/4 flex-col items-center"
              aria-label={`Light diya of ${v}`}
            >
              <Diya lit={i < lit} className={`w-16 transition ${i < lit ? '' : 'opacity-60 grayscale-[.4]'}`} />
              <span className={`mt-1 font-display text-[9px] tracking-[0.15em] uppercase ${i < lit ? 'text-gold-100' : 'text-gold-300/50'}`}>{v}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {done && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
              <p className="font-script text-5xl text-foil">Blessings Showered</p>
              <p className="mt-2 font-serif text-lg text-blush-200 italic">May you always be happy, always together.</p>
              <button onClick={() => setLit(0)} className="mt-5 font-display text-[10px] tracking-[0.3em] text-gold-300 uppercase underline underline-offset-4">
                Light again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {!done && <p className="mt-8 font-display text-[10px] tracking-[0.3em] text-gold-300/80 uppercase">{lit} / 7 lit</p>}
      </div>
    </div>
  )
}
