import { SectionTitle, Reveal, Photo, Parallax, Frame, InView } from './ui'
import { Sprig } from './Ornaments'
import { config } from '../config'

function Person({ p, role, tilt = 0 }) {
  return (
    <Reveal y={50} className="flex flex-col items-center text-center">
      <Frame className="h-[320px] w-[240px]" tilt={tilt}>
        <Photo src={p.photo} alt={p.fullName} label={`${role} photo`} position={p.photoPosition} className="h-full w-full" />
      </Frame>
      <p className="mt-9 font-display text-[10px] tracking-[0.4em] text-gold-500 uppercase">{role}</p>
      <h3 className="mt-1 font-script text-6xl text-rose">{p.name}</h3>
      <p className="mt-1 font-display text-sm tracking-wider text-cocoa-700">{p.fullName}</p>
      <p className="mt-3 font-display text-[10px] tracking-[0.3em] text-blush-500 uppercase">{p.relation}</p>
      <p className="font-serif text-base text-cocoa-700 italic">{p.parents}</p>
      <p className="mt-4 max-w-xs font-serif text-[17px] leading-relaxed text-cocoa-800/80">{p.about}</p>
    </Reveal>
  )
}

export default function Couple() {
  return (
    <div className="bg-paper relative px-5 py-24">
      <Parallax speed={0.7} rotate={-10} className="pointer-events-none absolute top-[30%] -left-3 w-12 opacity-70">
        <Sprig className="w-full" />
      </Parallax>
      <Parallax speed={0.5} rotate={10} className="pointer-events-none absolute top-[70%] -right-3 w-12 -scale-x-100 opacity-70">
        <Sprig className="w-full" />
      </Parallax>

      <SectionTitle kicker="Two hearts · One promise" title="The Couple" />
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 md:flex-row md:items-start md:justify-center">
        <Person p={config.groom} role="The Groom" tilt={-2} />

        {/* the rings, floating between them */}
        <Parallax speed={-0.3} className="md:mt-40">
          <InView as="img"
            src={config.images.rings}
            alt="Engagement rings"
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="float w-56 drop-shadow-[0_20px_25px_rgba(158,74,63,.25)] select-none md:w-48"
            draggable={false}
          />
        </Parallax>

        <Person p={config.bride} role="The Bride" tilt={2} />
      </div>
    </div>
  )
}
