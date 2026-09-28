import { motion } from 'motion/react'
import { SectionTitle, Reveal, Parallax } from './ui'
import { EventIcon, Corner, GodnaBand, Mandala } from './Ornaments'
import { config } from '../config'

const fmtTime = (t) => {
  const [h, m] = t.split(':').map(Number)
  const suffix = h >= 12 ? 'PM' : 'AM'
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`
}
const fmtDate = (d) =>
  new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

const calendarLink = (e) => {
  const stamp = (t) => `${e.date.replace(/-/g, '')}T${t.replace(':', '')}00`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${e.title} · ${config.groom.name} & ${config.bride.name}`,
    dates: `${stamp(e.start)}/${stamp(e.end)}`,
    ctz: 'Asia/Kolkata',
    details: e.description,
    location: `${e.venue}, ${e.address}`,
  })
  return `https://calendar.google.com/calendar/render?${params}`
}
export const mapsLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export default function Events() {
  return (
    <div className="bg-champagne relative px-5 pt-20 pb-24">
      <GodnaBand className="absolute top-0 left-0" />
      <Parallax speed={-0.5} className="pointer-events-none absolute top-40 -right-40 h-80 w-80">
        <Mandala className="spin-slow h-full w-full opacity-25" />
      </Parallax>
      <Parallax speed={-0.3} className="pointer-events-none absolute bottom-20 -left-40 h-80 w-80">
        <Mandala className="spin-slower h-full w-full opacity-25" stroke="#d67564" />
      </Parallax>

      <SectionTitle kicker="Rituals & celebrations" hindi="कार्यक्रम" title="The Ceremonies" />

      <div className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
        {config.events.map((e, i) => (
            <Reveal key={e.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-t-[140px] rounded-b-3xl border border-gold-300 bg-ivory px-6 pt-10 pb-7 text-center shadow-[0_30px_60px_-28px_rgba(158,74,63,.45)]"
              >
                <div className="absolute inset-2 rounded-t-[132px] rounded-b-[20px] border border-blush-200" />
                <Corner className="absolute bottom-2 left-2 w-9 -scale-y-100" />
                <Corner className="absolute right-2 bottom-2 w-9 -scale-100" />

                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-blush-100 to-blush-300 text-blush-600 ring-1 ring-gold-300">
                  <EventIcon name={e.icon} className="w-12" />
                </div>
                <p className="relative mt-5 font-yatra text-lg text-blush-400">{e.hindi}</p>
                <h3 className="relative font-display text-2xl font-semibold text-cocoa-800">{e.title}</h3>

                <div className="relative mt-4 inline-flex flex-col gap-0.5 rounded-full bg-blush-50 px-5 py-2 ring-1 ring-blush-200">
                  <span className="font-display text-xs tracking-widest text-cocoa-800">{fmtDate(e.date)}</span>
                  <span className="font-display text-[11px] tracking-widest text-gold-500">
                    {fmtTime(e.start)} – {fmtTime(e.end)}
                  </span>
                </div>

                <p className="relative mt-4 font-serif text-[17px] leading-relaxed text-cocoa-700">{e.description}</p>
                <p className="relative mt-4 font-display text-sm tracking-wider text-cocoa-800">{e.venue}</p>
                <p className="relative font-serif text-sm text-cocoa-600 italic">{e.address}</p>

                <div className="relative mt-6 flex justify-center gap-3">
                  <a
                    href={calendarLink(e)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-gradient-to-b from-blush-300 to-blush-400 px-4 py-2.5 font-display text-[10px] font-semibold tracking-[0.2em] text-white uppercase shadow-[0_8px_20px_-8px_rgba(214,117,100,.8)] active:scale-95"
                  >
                    Save the date
                  </a>
                  <a
                    href={mapsLink(e.mapQuery)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-gold-400 px-4 py-2.5 font-display text-[10px] tracking-[0.2em] text-gold-600 uppercase active:scale-95"
                  >
                    Directions
                  </a>
                </div>
              </motion.article>
            </Reveal>
        ))}
      </div>
    </div>
  )
}
