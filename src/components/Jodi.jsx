import { Reveal, Parallax, Frame, InView } from './ui'
import { Divider, Lotus, Sprig } from './Ornaments'
import { config } from '../config'

// Featured couple portrait in a gold frame, with parallax inside the frame.
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

      <InView as="div"
        className="relative mt-8"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Frame className="h-[min(60svh,470px)] w-[min(80vw,340px)]">
          <div className="relative h-full w-full overflow-hidden bg-ivory">
            <Parallax speed={-0.12} className="absolute -inset-y-[12%] inset-x-0">
              <img src={config.images.couple1} alt={`${config.groom.name} & ${config.bride.name}`} className="h-full w-full object-cover object-[50%_25%]" draggable={false} />
            </Parallax>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cocoa-900/55 to-transparent" />
            <p className="absolute inset-x-0 bottom-5 font-script text-5xl text-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,.4)]">
              {config.groom.name} &amp; {config.bride.name}
            </p>
          </div>
        </Frame>
      </InView>

      <Reveal delay={0.2} className="mt-10 max-w-xs">
        <p className="font-serif text-xl leading-relaxed text-cocoa-700 italic">“Two hearts, one journey, written in the stars and blessed by our elders.”</p>
        <Divider className="mt-5" />
      </Reveal>
    </div>
  )
}
