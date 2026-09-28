import { Reveal, Parallax } from './ui'
import { Ganesh, GodnaBand, Toran, Lotus } from './Ornaments'
import { config } from '../config'

export default function Footer() {
  return (
    <div className="bg-blush relative px-5 pb-28 text-center">
      <GodnaBand />
      <Toran count={9} />
      <Parallax speed={0.7} className="pointer-events-none absolute bottom-40 -left-8 w-32 opacity-80">
        <Lotus className="w-full" />
      </Parallax>
      <Parallax speed={0.9} className="pointer-events-none absolute -right-8 bottom-72 w-24 opacity-80">
        <Lotus className="w-full" />
      </Parallax>

      <Reveal className="relative">
        <Ganesh className="mx-auto h-32 w-28" />
        <p className="mt-5 font-deva text-lg text-blush-500">आप मन के अगोरा म</p>
        <p className="font-display text-[10px] tracking-[0.35em] text-gold-500 uppercase">Awaiting your gracious presence</p>
        <img src={config.images.logo} alt={`${config.groom.name} & ${config.bride.name}`} className="mx-auto mt-4 w-[min(86vw,380px)]" draggable={false} />
        <p className="font-display text-xs tracking-[0.25em] text-cocoa-700">{config.displayDate}</p>

        <div className="mx-auto mt-10 max-w-xs space-y-3">
          <p className="font-display text-[10px] tracking-[0.35em] text-gold-500 uppercase">For any queries</p>
          {config.rsvp.contacts.map((c, i) => (
            <a key={i} href={`tel:${c.phone.replace(/\s/g, '')}`} className="block rounded-full border border-gold-300 bg-ivory/70 px-4 py-3 font-serif text-base text-cocoa-800 active:scale-95">
              {c.name} · <span className="text-blush-500">{c.phone}</span>
            </a>
          ))}
        </div>

        <p className="mt-10 font-serif text-lg text-cocoa-700 italic">With love, {config.hostFamily}</p>
        <p className="mt-2 font-display text-sm tracking-[0.25em] text-gold-500">{config.hashtag}</p>
        <p className="mt-8 font-yatra text-2xl text-rose">॥ जय जोहार ॥</p>
      </Reveal>
    </div>
  )
}
