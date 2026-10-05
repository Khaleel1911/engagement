import { motion } from 'motion/react'
import { Ganesh, Mandala, Toran, Lotus, Sprig, BandhaniBand } from './Ornaments'
import { showerPetals } from './Petals'
import { Parallax, ease } from './ui'
import { config } from '../config'

export default function Hero({ ready }) {
  const show = (d, y = 28) => ({
    initial: { opacity: 0, y },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { delay: d, duration: 1.3, ease },
  })

  const bless = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    showerPetals(r.left + r.width / 2, r.top + r.height / 3, 40)
  }

  return (
    <div className="bg-paper relative flex min-h-svh flex-col items-center overflow-hidden text-center">
      <Toran className="absolute top-0 z-20" />

      {/* ── back layer: slow mandala + blush glow ── */}
      <Parallax speed={-0.35} className="pointer-events-none absolute top-[24%] left-1/2 -ml-[210px] h-[420px] w-[420px]">
        <Mandala className="spin-slower h-full w-full opacity-40" />
      </Parallax>
      <div className="pointer-events-none absolute top-[30%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blush-200/50 blur-3xl" />

      {/* ── side sprigs ── */}
      <Parallax speed={0.5} rotate={-8} className="pointer-events-none absolute top-[38%] -left-3 w-14 opacity-80">
        <Sprig className="w-full" />
      </Parallax>
      <Parallax speed={0.7} rotate={8} className="pointer-events-none absolute top-[52%] -right-3 w-12 -scale-x-100 opacity-80">
        <Sprig className="w-full" />
      </Parallax>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-10">
        {/* ── mid layer: Ganesh ji ── */}
        <Parallax speed={-0.15}>
          <motion.p {...show(0.1)} className="font-display text-[11px] tracking-[0.3em] text-blush-500 uppercase">
            Shri Ganeshaya Namah
          </motion.p>
          <motion.button {...show(0.2)} onClick={bless} aria-label="Tap Ganesh ji for blessings" whileTap={{ scale: 0.95 }} className="relative mx-auto mt-3 block">
            <Ganesh className="float relative h-[min(40svh,330px)] w-[min(35svh,290px)]" />
          </motion.button>
          <motion.p {...show(0.3)} lang="sa" className="mx-auto mt-4 max-w-xs font-hindi text-[17px] leading-relaxed font-bold text-blush-500">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </motion.p>
          <motion.p {...show(0.35)} className="mx-auto mt-2 max-w-xs font-serif text-[15px] leading-relaxed text-cocoa-700 italic">
            O Lord Ganesha, radiant as a million suns,<br />
            remove every obstacle from our path, always.
          </motion.p>
        </Parallax>

        {/* ── front layer: RN logo ── */}
        <Parallax speed={0.12} className="mt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.6, ease }}
          >
            <img src={config.images.logo} alt={`${config.groom.name} & ${config.bride.name}`} className="w-[min(92vw,460px)] select-none" draggable={false} />
          </motion.div>
        </Parallax>

        <Parallax speed={0.25}>
          <motion.p {...show(0.9)} className="font-display text-[11px] tracking-[0.4em] text-gold-500 uppercase">
            invite you to their Sagai
          </motion.p>
          <motion.div {...show(1.05)} className="mt-4 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-400/70" />
            <div>
              <p className="font-display text-sm tracking-[0.18em] text-cocoa-800">{config.displayDate}</p>
            </div>
            <span className="h-px w-10 bg-gold-400/70" />
          </motion.div>
          <motion.p {...show(1.2)} className="mt-2 font-serif text-lg text-cocoa-600 italic">
            {config.city}
          </motion.p>
        </Parallax>
      </div>

      {/* ── foreground lotuses: move fastest ── */}
      <Parallax speed={0.9} className="pointer-events-none absolute bottom-10 -left-6 z-10 w-36">
        <Lotus className="w-full" />
      </Parallax>
      <Parallax speed={1.1} className="pointer-events-none absolute -right-8 bottom-24 z-10 w-28">
        <Lotus className="w-full" />
      </Parallax>

      <motion.a
        href="#invite"
        className="relative z-10 mb-4 flex flex-col items-center gap-2 font-display text-[10px] tracking-[0.3em] text-gold-500 uppercase"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-gold-400 to-transparent" />
      </motion.a>
      <BandhaniBand className="relative z-10" />
    </div>
  )
}
