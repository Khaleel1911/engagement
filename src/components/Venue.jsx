import { useRef, useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { SectionTitle, Reveal, Parallax, useScrollInView } from './ui'
import { GodnaBand, Lotus } from './Ornaments'
import { mapsLink } from './Events'
import { config } from '../config'

/*
 * A hand-drawn storybook map instead of a live map. When it scrolls into view
 * the route draws itself from the start point to the venue, then a little diya
 * keeps travelling along it. Tapping the map opens real directions.
 */
const ROUTE = 'M44 252 C 92 254, 96 214, 128 204 S 170 196, 182 170 S 196 128, 226 116 S 256 96, 266 86'
const W = 340
const H = 300

function Tree({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="9" rx="6" ry="1.6" fill="#8a6a5c" opacity=".15" />
      <path d="M0 -10 C6 -10 8 -3 6 2 C8 6 4 10 0 9 C-4 10 -8 6 -6 2 C-8 -3 -6 -10 0 -10Z" fill="#a3ad85" />
      <path d="M0 -6 C3 -5 4 -1 2 2" fill="none" stroke="#e1e5d2" strokeWidth=".8" />
      <path d="M0 9 V13" stroke="#8a6a5c" strokeWidth="1.2" />
    </g>
  )
}

function Temple({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="15" rx="15" ry="2.5" fill="#8a6a5c" opacity=".15" />
      <rect x="-12" y="4" width="24" height="10" fill="#f7ecd9" stroke="#b8894a" strokeWidth=".8" />
      <path d="M-8 4 L0 -14 L8 4Z" fill="#f2cabd" stroke="#b8894a" strokeWidth=".8" />
      <path d="M0 -14 V-20 M0 -20 L5 -18 L0 -16" stroke="#d67564" strokeWidth=".9" fill="#d67564" />
      <path d="M-3 14 V8 A3 3 0 0 1 3 8 V14" fill="#d4a568" />
    </g>
  )
}

function Label({ x, y, en, hi, anchor = 'middle' }) {
  return (
    <g>
      {hi && (
        <text x={x} y={y} textAnchor={anchor} fontFamily="'Tiro Devanagari Hindi', serif" fontSize="8.5" fill="#c05f50">
          {hi}
        </text>
      )}
      <text x={x} y={y + (hi ? 9 : 0)} textAnchor={anchor} fontFamily="Cinzel, serif" fontSize="6" letterSpacing="1.2" fill="#8f6634">
        {en.toUpperCase()}
      </text>
    </g>
  )
}

function IllustratedMap({ drawn }) {
  const v = config.venue
  const labels = { start: 'City Centre', landmark: 'Mandir', pond: 'Talab', river: 'Nadi', station: 'Station', ...v.mapLabels }
  const [travelling, setTravelling] = useState(false)
  useEffect(() => {
    if (!drawn) return
    const t = setTimeout(() => setTravelling(true), 2300)
    return () => clearTimeout(t)
  }, [drawn])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Illustrated map to ${v.name}`}>
      <defs>
        <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 H0 V20" fill="none" stroke="#d4a568" strokeOpacity=".14" strokeWidth=".6" />
        </pattern>
        <radialGradient id="map-vignette" cx=".5" cy=".5" r=".75">
          <stop offset=".6" stopColor="#fdfaf5" stopOpacity="0" />
          <stop offset="1" stopColor="#e9c08c" stopOpacity=".35" />
        </radialGradient>
        <mask id="route-reveal">
          <motion.path
            d={ROUTE}
            fill="none"
            stroke="#fff"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{ duration: 2.2, ease: [0.45, 0, 0.25, 1], delay: 0.3 }}
          />
        </mask>
      </defs>

      {/* paper */}
      <rect width={W} height={H} fill="#fdfaf5" />
      <rect width={W} height={H} fill="url(#map-grid)" />

      {/* fields & hills */}
      <path d="M0 150 C40 130 80 150 110 138 C130 130 150 150 150 175 C120 190 60 185 0 200Z" fill="#e1e5d2" opacity=".75" />
      <path d="M210 190 C250 180 300 195 340 185 V260 C300 270 250 255 220 262 C200 240 200 210 210 190Z" fill="#e1e5d2" opacity=".6" />
      <path d="M150 0 C170 30 230 20 250 0Z" fill="#f2cabd" opacity=".35" />

      {/* river (Nadi) */}
      <path d="M-10 70 C40 60 70 95 110 92 S170 60 205 72 S270 130 350 118" fill="none" stroke="#d7e4df" strokeWidth="18" strokeLinecap="round" />
      <path d="M-10 70 C40 60 70 95 110 92 S170 60 205 72 S270 130 350 118" fill="none" stroke="#e8f0ed" strokeWidth="9" strokeLinecap="round" />
      {[[40, 70], [150, 76], [300, 116]].map(([x, y]) => (
        <path key={x} d={`M${x - 6} ${y} q3 -3 6 0 t6 0`} fill="none" stroke="#a9c3bb" strokeWidth=".9" />
      ))}

      {/* lotus pond (Talab) */}
      <ellipse cx="236" cy="226" rx="30" ry="15" fill="#d7e4df" stroke="#a9c3bb" strokeWidth=".8" />
      {[[226, 222], [246, 230], [238, 219]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <ellipse rx="4" ry="2" fill="#a3ad85" />
          <path d="M0 -1 C1.6 -4 1.6 -6 0 -8 C-1.6 -6 -1.6 -4 0 -1Z" fill="#e8a797" />
        </g>
      ))}

      {/* railway */}
      <path d="M200 300 C230 280 290 270 340 272" fill="none" stroke="#8a6a5c" strokeWidth="1.2" />
      <path d="M200 300 C230 280 290 270 340 272" fill="none" stroke="#8a6a5c" strokeWidth="5" strokeDasharray="1 5" />

      {/* roads */}
      {[
        'M0 238 C60 240 100 230 130 204 S176 150 200 60 S214 10 222 -10',
        'M130 204 C170 214 250 190 350 206',
        'M182 170 C220 160 280 150 350 160',
        'M226 116 C240 70 280 40 350 36',
      ].map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke="#e9d5b8" strokeWidth="11" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#fffaf2" strokeWidth="8" strokeLinecap="round" />
        </g>
      ))}
      {/* bridge over the river */}
      <path d="M192 64 h18 M192 80 h18" stroke="#b8894a" strokeWidth="1.4" />

      {/* trees */}
      {[
        [22, 176], [40, 188], [60, 170], [300, 60], [318, 78], [286, 84], [150, 250], [168, 262], [312, 232], [20, 110], [120, 150], [270, 170],
      ].map(([x, y], i) => (
        <Tree key={i} x={x} y={y} s={0.85 + (i % 3) * 0.12} />
      ))}

      <Temple x={82} y={128} />

      {/* the route: solid under-glow + dashed line, revealed by the mask as it draws */}
      <g mask="url(#route-reveal)">
        <path d={ROUTE} fill="none" stroke="#f2cabd" strokeWidth="7" strokeLinecap="round" />
        <path d={ROUTE} fill="none" stroke="#d67564" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="6 5" />
      </g>

      {/* a little diya travelling the route */}
      {travelling && (
        <g>
          <circle r="7" fill="#ffd98a" opacity=".45">
            <animateMotion dur="5.5s" repeatCount="indefinite" path={ROUTE} rotate="0" />
          </circle>
          <g>
            <animateMotion dur="5.5s" repeatCount="indefinite" path={ROUTE} rotate="0" />
            <path d="M-4 1 C-3 4 3 4 4 1Z" fill="#c9784f" />
            <path d="M0 -5 C2 -2 2 0 0 1 C-2 0 -2 -2 0 -5Z" fill="#f29a6a" />
          </g>
        </g>
      )}

      {/* start point */}
      <g transform="translate(44 252)">
        <circle r="9" fill="#e9c08c" opacity=".35" />
        <circle r="4.5" fill="#fdfaf5" stroke="#b8894a" strokeWidth="1.6" />
      </g>
      <Label x={48} y={276} en={labels.start} />

      {/* venue pin */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={drawn ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 2.2, type: 'spring', stiffness: 260, damping: 14 }}
        style={{ originX: '266px', originY: '86px', transformBox: 'view-box' }}
      >
        <circle cx="266" cy="86" r="10" fill="none" stroke="#d67564" strokeWidth="1.2">
          <animate attributeName="r" values="8;20" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".7;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <ellipse cx="266" cy="88" rx="7" ry="2.2" fill="#6a4c40" opacity=".25" />
        <path d="M266 88 C262 80 252 74 252 63 A14 14 0 0 1 280 63 C280 74 270 80 266 88Z" fill="#d67564" stroke="#fff4dd" strokeWidth="1.4" />
        <circle cx="266" cy="63" r="8.5" fill="#fdfaf5" />
        <text x="266" y="66.4" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="8.5" fontWeight="600" fill="#b8894a">
          RN
        </text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: drawn ? 1 : 0 }} transition={{ delay: 2.6, duration: 0.6 }}>
        <rect x="190" y="18" width="116" height="24" rx="12" fill="#fdfaf5" stroke="#d4a568" strokeWidth=".8" />
        <text x="248" y="33.5" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7.5" letterSpacing=".6" fill="#4e3830">
          {v.name.length > 22 ? `${v.name.slice(0, 21)}…` : v.name}
        </text>
        <path d="M252 42 L258 50 L262 44" fill="none" stroke="#d4a568" strokeWidth=".8" />
      </motion.g>

      <Label x={82} y={158} en={labels.landmark} hi="मंदिर" />
      <Label x={236} y={252} en={labels.pond} hi="तालाब" />
      <Label x={30} y={56} en={labels.river} hi="नदी" anchor="start" />
      <Label x={322} y={264} en={labels.station} anchor="end" />

      {/* compass rose */}
      <g transform="translate(312 190)" opacity=".85">
        <circle r="13" fill="#fdfaf5" stroke="#d4a568" strokeWidth=".8" />
        <path d="M0 -11 L3 0 L0 11 L-3 0Z" fill="#d4a568" />
        <path d="M0 -11 L3 0 L-3 0Z" fill="#d67564" />
        <path d="M-11 0 L0 -2.5 L11 0 L0 2.5Z" fill="#e9c08c" opacity=".7" />
        <text y="-15.5" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="6" fill="#8f6634">
          N
        </text>
      </g>

      <rect width={W} height={H} fill="url(#map-vignette)" pointerEvents="none" />
    </svg>
  )
}

export default function Venue() {
  const v = config.venue
  const mapRef = useRef(null)
  const drawn = useScrollInView(mapRef, 0.75)

  return (
    <div className="bg-paper relative flex flex-col justify-center px-5 pt-20 pb-24">
      <GodnaBand className="absolute top-0 left-0" />
      <Parallax speed={1} className="pointer-events-none absolute -right-8 bottom-16 w-32 opacity-80">
        <Lotus className="w-full" />
      </Parallax>
      <SectionTitle kicker="Where hearts meet" hindi="स्थान" title="The Venue" />

      <Reveal className="mx-auto w-full max-w-md">
        <a
          ref={mapRef}
          href={mapsLink(v.mapQuery)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open directions to ${v.name}`}
          className="group relative block rotate-[-1deg] rounded-[26px] bg-gradient-to-br from-gold-200 via-gold-400 to-gold-500 p-[3px] shadow-[0_28px_50px_-22px_rgba(158,74,63,.55)] transition active:scale-[.98]"
        >
          <div className="overflow-hidden rounded-[23px] bg-ivory p-2">
            <div className="overflow-hidden rounded-[17px] ring-1 ring-gold-300/70">
              <IllustratedMap drawn={drawn} />
            </div>
          </div>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-gold-300 bg-ivory px-4 py-1 font-display text-[9px] tracking-[0.3em] text-gold-600 uppercase shadow-sm">
            नक्शा · The Way
          </span>
          <span className="absolute right-4 bottom-4 rounded-full bg-cocoa-900/70 px-3 py-1.5 font-display text-[8px] tracking-[0.2em] text-ivory uppercase">
            Tap for directions
          </span>
        </a>

        <div className="mt-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-cocoa-800">{v.name}</h3>
          <p className="mt-2 font-serif text-lg text-cocoa-700 italic">{v.address}</p>
          <p className="mt-4 font-serif text-base text-cocoa-600">{v.notes}</p>
          <a
            href={mapsLink(v.mapQuery)}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-blush-300 to-blush-400 px-7 py-3.5 font-display text-[11px] font-semibold tracking-[0.25em] text-white uppercase shadow-[0_12px_30px_-10px_rgba(214,117,100,.8)] active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
            Get Directions
          </a>
        </div>
      </Reveal>
    </div>
  )
}
