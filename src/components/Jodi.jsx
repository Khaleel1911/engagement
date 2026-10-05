import { Reveal, Parallax, Frame, Photo, InView } from './ui'
import { Divider, Lotus, Sprig } from './Ornaments'
import { config } from '../config'

/* Two overlapping hearts, in the blush and gold of the logo */
function TwinHearts({ className = '' }) {
  const heart = 'M12 21s-7-4.6-9.5-9C.9 8.6 3 5 6.5 5c2 0 3.5 1.2 5.5 3.2C14 6.2 15.5 5 17.5 5 21 5 23.1 8.6 21.5 12 19 16.4 12 21 12 21z'
  return (
    <svg viewBox="0 0 40 30" className={className} role="img" aria-label="Two hearts">
      <defs>
        <linearGradient id="heart-blush" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8a797" />
          <stop offset="1" stopColor="#c05f50" />
        </linearGradient>
        <linearGradient id="heart-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1d3a2" />
          <stop offset="1" stopColor="#b8894a" />
        </linearGradient>
      </defs>
      <path d={heart} transform="translate(15 5) rotate(12 12 13)" fill="url(#heart-gold)" stroke="#fdfaf5" strokeWidth="1.2" />
      <path d={heart} transform="translate(1 1) rotate(-12 12 13)" fill="url(#heart-blush)" stroke="#fdfaf5" strokeWidth="1.2" />
    </svg>
  )
}

function Portrait({ p, tilt, from }) {
  return (
    <InView as="div"
      initial={{ opacity: 0, x: from, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <Frame className="aspect-[3/4] w-[min(39vw,230px)]" tilt={tilt}>
        <Photo src={p.photo} alt={p.fullName} position={p.photoPosition} className="h-full w-full" />
      </Frame>
      {/* spacing lives on the wrapper: .text-rose sets its own margin, which overrides mt-* */}
      <div className="relative pt-12">
        <p className="font-script text-4xl text-rose">{p.name}</p>
      </div>
    </InView>
  )
}

// The groom's and bride's own portraits side by side, joined by two hearts.
export default function Jodi() {
  return (
    <div className="bg-paper relative flex flex-col items-center justify-center px-5 py-20 text-center">
      <Parallax speed={0.7} rotate={-10} className="pointer-events-none absolute top-[18%] -left-3 w-12 opacity-70">
        <Sprig className="w-full" />
      </Parallax>
      <Parallax speed={0.9} className="pointer-events-none absolute -right-8 bottom-12 z-10 w-32">
        <Lotus className="w-full" />
      </Parallax>

      <Reveal y={12}>
        <p className="font-display text-[11px] tracking-[0.35em] text-gold-500 uppercase">Made for Each Other</p>
        <p className="mt-2 font-script text-3xl text-blush-400">Two hearts, one life</p>
      </Reveal>

      <div className="relative mt-10 flex items-start justify-center gap-[5vw] md:gap-12">
        <Portrait p={config.groom} tilt={-3} from={-40} />
        <Portrait p={config.bride} tilt={3} from={40} />
        {/* hearts sit over the gap between the two frames */}
        <InView as="div"
          className="absolute top-[34%] left-1/2 z-10 -ml-9 w-[72px] drop-shadow-[0_6px_10px_rgba(158,74,63,.4)]"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 220, damping: 12 }}
        >
          <TwinHearts className="glow-pulse w-full" />
        </InView>
      </div>

      <Reveal delay={0.2} className="mt-10 max-w-xs">
        <p className="font-serif text-xl leading-relaxed text-cocoa-700 italic">“Two hearts, one journey, written in the stars and blessed by our elders.”</p>
        <Divider className="mt-5" />
      </Reveal>
    </div>
  )
}
