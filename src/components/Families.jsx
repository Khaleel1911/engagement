import { SectionTitle, Reveal, Photo, Parallax } from './ui'
import { Lotus, Corner, Divider } from './Ornaments'
import { config } from '../config'

function Portrait({ person, label }) {
  return (
    <div className="mx-auto w-full max-w-[150px]">
      {/* same gold frame as the couple's portraits, scaled down */}
      <div className="relative">
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[14px] bg-blush-200/80" />
        <div className="relative rounded-[14px] bg-gradient-to-br from-gold-200 via-gold-400 to-gold-500 p-[3px] shadow-[0_20px_36px_-18px_rgba(158,74,63,.6)]">
          <div className="rounded-[11px] bg-ivory p-1.5">
            <Photo src={person.photo} alt={person.name} label={`${label} photo`} position={person.photoPosition} className="aspect-[3/4] w-full rounded-[7px] ring-1 ring-gold-300/60" />
          </div>
        </div>
        <Corner className="absolute -top-1.5 -left-1.5 w-7" />
        <Corner className="absolute -top-1.5 -right-1.5 w-7 -scale-x-100" />
        <Corner className="absolute -bottom-1.5 -left-1.5 w-7 -scale-y-100" />
        <Corner className="absolute -right-1.5 -bottom-1.5 w-7 -scale-100" />
      </div>
      <p className="mt-4 font-display text-[9px] tracking-[0.35em] text-gold-500 uppercase">{label}</p>
    </div>
  )
}

function Side({ f, delay }) {
  return (
    <Reveal y={50} delay={delay} className="relative rounded-3xl border border-gold-300 bg-ivory px-5 pt-8 pb-7 text-center shadow-[0_30px_60px_-28px_rgba(158,74,63,.45)]">
      <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-blush-200" />
      <Corner className="absolute top-2 left-2 w-9" />
      <Corner className="absolute top-2 right-2 w-9 -scale-x-100" />

      <div className="relative">
        <p lang="hi" className="font-hindi text-lg font-bold text-blush-500">{f.sideHindi}</p>
        <h3 className="font-display text-[11px] tracking-[0.4em] text-gold-500 uppercase">{f.side}</h3>

        <div className="mt-6 grid grid-cols-2 items-start gap-4">
          <Portrait person={f.mother} label="Mother" />
          <Portrait person={f.father} label="Father" />
        </div>

        {/* father: post in the samaj first (largest), then his name, then the samaj */}
        <div lang="hi" className="mt-6 font-hindi font-bold">
          <p className="text-[26px] leading-snug text-blush-500">{f.father.title}</p>
          <p className="mt-1 text-xl leading-snug text-cocoa-800">{f.father.name}</p>
          <p className="mt-1 text-base text-gold-600">({f.father.org})</p>
        </div>
        {f.father.phone && (
          <a href={`tel:${f.father.phone.replace(/\s/g, '')}`} className="mt-3 inline-block rounded-full border border-gold-300 bg-gold-100/40 px-4 py-2 font-serif text-base text-blush-500 active:scale-95">
            {f.father.phone}
          </a>
        )}
        <Divider className="my-4" />
        <p lang="hi" className="font-hindi text-xl font-bold text-cocoa-800">{f.mother.name}</p>

        <div className="mt-6 grid gap-3 text-left">
          {f.addresses.map((a) => (
            <div key={a.place} className="flex gap-3 rounded-2xl border border-gold-200 bg-gold-100/40 p-4">
              <svg viewBox="0 0 24 24" className="mt-0.5 w-5 shrink-0 text-blush-400" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s7-7.8 7-13a7 7 0 0 0-14 0c0 5.2 7 13 7 13zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg>
              <div>
                <h4 className="font-display text-xs font-semibold tracking-[0.2em] text-cocoa-800 uppercase">{a.place}</h4>
                <p className="mt-1 font-serif text-[16px] leading-snug text-cocoa-700">
                  {a.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export default function Families() {
  return (
    <div className="bg-paper relative px-5 py-24">
      <Parallax speed={0.8} className="pointer-events-none absolute top-24 -left-10 w-32 opacity-70">
        <Lotus className="w-full" />
      </Parallax>

      <SectionTitle kicker="With the blessings of our parents" title="Our Families" />

      <div className="relative mx-auto grid max-w-md gap-8 md:max-w-4xl md:grid-cols-2">
        {config.families.map((f, i) => (
          <Side key={f.side} f={f} delay={i * 0.1} />
        ))}
      </div>
    </div>
  )
}
