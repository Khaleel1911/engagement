import { SectionTitle, Reveal, Parallax, InView } from './ui'
import { EventIcon, Lotus } from './Ornaments'

const rituals = [
  {
    title: 'Gol Dhana',
    icon: 'kalash',
    text: 'Jaggery and coriander seeds are shared between both families, a sweet Gujarati custom that says “from today, we are one.”',
  },
  {
    title: 'Chandlo',
    icon: 'tilak',
    text: 'A chandlo of kumkum and akshat on the forehead, with the blessings of the elders. The bond between families is sealed.',
  },
  {
    title: 'Vinti Vidhi',
    icon: 'rings',
    text: 'Before Ganesh ji, the couple exchange rings. It is a quiet promise that everything to come will be shared.',
  },
  {
    title: 'Aashirvad',
    icon: 'lotus',
    text: 'Elders shower akshat and flowers on the couple. In every Gujarati home, the blessing of the vadil (elders) is everything.',
  },
]

const heritage = [
  { k: 'Patola', v: 'The double-ikat silk of Patan, woven thread by thread over months and treasured for generations.' },
  { k: 'Bandhani', v: 'Tie-dye dots of Kutch and Jamnagar, the colours of every Gujarati celebration.' },
  { k: 'Garba', v: 'Circles of dance around the lamp-lit garbo, clapping and twirling until the night runs out.' },
  { k: 'Jai Shri Krishna', v: 'The everyday Gujarati greeting, said with folded hands and a warm smile.' },
]

const words = ['Sagai', 'Blessings', 'Gol Dhana', 'Two Hearts', 'One Family', 'Togetherness', 'Forever', 'Love']

export default function Parampara() {
  return (
    <div className="bg-paper relative py-24">
      <Parallax speed={0.8} className="pointer-events-none absolute top-24 -left-10 w-32 opacity-70">
        <Lotus className="w-full" />
      </Parallax>

      <div className="px-5">
        <SectionTitle kicker="Gujarati traditions" title="Rituals of the Day" />
      </div>

      {/* stacked cards: each one slides in from alternating sides as you scroll */}
      <div className="mx-auto grid max-w-md gap-5 px-5 sm:max-w-3xl sm:grid-cols-2">
        {rituals.map((r, i) => (
          <InView as="div"
            key={r.title}
            initial={{ opacity: 0, x: i % 2 ? 50 : -50, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-4 rounded-3xl border border-blush-200 bg-gradient-to-br from-ivory to-blush-50 p-5 text-left shadow-[0_20px_40px_-25px_rgba(158,74,63,.5)]"
          >
            <span className="absolute top-3 right-5 font-display text-4xl text-blush-100">{String(i + 1).padStart(2, '0')}</span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-100 to-gold-300 text-blush-600 ring-1 ring-gold-400">
              <EventIcon name={r.icon} className="w-8" />
            </span>
            <div className="relative">
              <h3 className="font-display text-lg leading-tight font-semibold text-blush-500">{r.title}</h3>
              <p className="mt-2 font-serif text-[16px] leading-relaxed text-cocoa-800/85">{r.text}</p>
            </div>
          </InView>
        ))}
      </div>

      {/* marquee ribbon */}
        <div className="relative my-14 -rotate-2 overflow-hidden bg-gradient-to-r from-blush-400 via-blush-300 to-blush-400 py-3 shadow-[0_12px_30px_-12px_rgba(214,117,100,.7)]">
          <div className="marquee flex w-max gap-8 whitespace-nowrap">
            {[...words, ...words].map((w, i) => (
              <span key={i} className="flex items-center gap-8 font-display text-lg tracking-[0.2em] text-ivory uppercase">
                {w} <span className="text-sm text-gold-100">✦</span>
              </span>
            ))}
          </div>
        </div>

      <div className="mx-auto max-w-md px-5">
        <Reveal className="text-center">
          <p className="font-display text-[11px] tracking-[0.35em] text-gold-500 uppercase">The soul of Gujarat</p>
          <p className="mt-2 font-script text-3xl text-blush-500">Colour, warmth &amp; togetherness</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {heritage.map((h, i) => (
              <Reveal key={h.k} delay={i * 0.08} className="h-full rounded-2xl border border-gold-200 bg-gold-100/40 p-4">
                <h4 className="font-display text-base font-semibold text-cocoa-800">{h.k}</h4>
                <p className="mt-1.5 font-serif text-[15px] leading-snug text-cocoa-800/75">{h.v}</p>
              </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
