import { useRef } from 'react'
import { motion } from 'motion/react'
import { SectionTitle, Reveal, Parallax, useScrollThrough, InView } from './ui'
import { Lotus } from './Ornaments'
import { config } from '../config'

export default function Story() {
  const ref = useRef(null)
  const scaleY = useScrollThrough(ref, 0.7)

  return (
    <div className="bg-blush relative px-5 py-24">
      <Parallax speed={0.9} className="pointer-events-none absolute -right-10 bottom-10 w-36 opacity-80">
        <Lotus className="w-full" />
      </Parallax>

      <SectionTitle kicker="How it all began" title="Our Story" />
      <div ref={ref} className="relative mx-auto max-w-md pl-10">
        {/* the sacred thread (mauli) */}
        <div className="absolute top-0 bottom-0 left-[15px] w-[3px] rounded-full bg-blush-200" />
        <motion.div
          style={{ scaleY }}
          className="absolute top-0 bottom-0 left-[15px] w-[3px] origin-top rounded-full bg-[repeating-linear-gradient(to_bottom,#d67564_0_10px,#e9c08c_10px_20px)]"
        />
        {config.story.map((s, i) => (
          <Reveal key={i} delay={0.05 * i} className="relative mb-10 last:mb-0">
            <span className="absolute top-1 -left-[34px] grid h-7 w-7 place-items-center rounded-full border-2 border-gold-300 bg-ivory shadow">
              <span className="h-2.5 w-2.5 rotate-45 bg-blush-400" />
            </span>
            <div className="rounded-2xl border border-blush-200 bg-ivory p-5 shadow-[0_15px_35px_-20px_rgba(158,74,63,.35)]">
                <p className="font-display text-[11px] tracking-[0.3em] text-gold-500">{s.year}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-cocoa-800">{s.title}</h3>
                <p className="mt-2 font-serif text-[17px] leading-relaxed text-cocoa-800/80">{s.text}</p>
              </div>
          </Reveal>
        ))}
      </div>

      {/* and now… the B&W portrait closes the story */}
      <InView as="figure"
        className="relative mx-auto mt-14 w-[min(76vw,300px)] rotate-2 bg-white p-3 pb-12 shadow-[0_25px_45px_-20px_rgba(158,74,63,.55)]"
        initial={{ opacity: 0, y: 50, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: 2 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={config.images.couple2} alt={`${config.groom.name} & ${config.bride.name}`} className="aspect-[4/5] w-full object-cover object-top" loading="lazy" draggable={false} />
        <figcaption className="absolute inset-x-0 bottom-3 font-script text-3xl text-blush-500">…and forever begins</figcaption>
        <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-blush-200/80" />
      </InView>
    </div>
  )
}
