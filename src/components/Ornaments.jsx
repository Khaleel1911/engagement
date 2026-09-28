import { useId } from 'react'
import { config } from '../config'

/* ─────────────────────────  Shri Ganesh  ───────────────────────── */
export function Ganesh({ className = '', glow = true }) {
  return (
    <div className={`relative ${className}`}>
      {glow && <div className="glow-pulse absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,214,140,.75),rgba(255,214,140,0)_70%)]" />}
      <img
        src={config.images.ganesh}
        alt="Shri Ganesh"
        className="relative h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(158,74,63,.28)] select-none"
        draggable={false}
      />
    </div>
  )
}

/* ─────────────────────────  Diya  ─────────────────────────
 * Flame and glow are separate HTML layers so their CSS animations run on the
 * compositor (animating shapes *inside* an SVG forces a repaint every frame).
 */
export function Diya({ className = '', lit = true, delay = 0 }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      {lit && (
        <span
          className="glow-pulse absolute top-[5%] left-[12%] h-[76%] w-[76%] rounded-full bg-[radial-gradient(circle,rgba(255,217,138,.75),rgba(255,217,138,0)_68%)]"
          style={{ animationDelay: `${delay}s` }}
        />
      )}
      {lit && (
        <svg viewBox="0 0 16 34" className="flame absolute top-[22%] left-[40%] h-[42%] w-[20%]" style={{ animationDelay: `${delay}s` }}>
          <defs>
            <radialGradient id={`d-f-${id}`} cx=".5" cy=".75" r=".7">
              <stop offset="0" stopColor="#fffbe8" />
              <stop offset=".35" stopColor="#ffd98a" />
              <stop offset=".8" stopColor="#f29a6a" />
              <stop offset="1" stopColor="#d67564" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M8 0 C14 10 16 16 16 22 C16 28 12 32 8 32 C4 32 0 28 0 22 C0 16 2 10 8 0 Z" fill={`url(#d-f-${id})`} />
        </svg>
      )}
      <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`d-b-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#efc79a" />
            <stop offset="1" stopColor="#b0674a" />
          </linearGradient>
        </defs>
        <path d="M40 44 L40 50" stroke="#4e3830" strokeWidth="1.5" />
        <path d="M10 50 C14 64 26 70 40 70 C54 70 66 64 70 50 C60 54 50 55 40 55 C30 55 20 54 10 50 Z" fill={`url(#d-b-${id})`} />
        <path d="M10 50 C20 54 30 55 40 55 C50 55 60 54 70 50 C62 48 52 47 40 47 C28 47 18 48 10 50 Z" fill="#7a4533" />
        <g fill="#fff4dd" opacity=".85">
          <circle cx="24" cy="60" r="1.4" />
          <circle cx="32" cy="63" r="1.4" />
          <circle cx="40" cy="64" r="1.4" />
          <circle cx="48" cy="63" r="1.4" />
          <circle cx="56" cy="60" r="1.4" />
        </g>
      </svg>
    </div>
  )
}

/* ─────────────────────────  Toran (jasmine, rose & sage leaves)  ───────────────────────── */
const BEADS = [
  'radial-gradient(circle at 35% 35%, #ffffff, #fbeee6 55%, #e6cfc2)', // mogra / jasmine
  'radial-gradient(circle at 35% 35%, #fbd3c7, #e8a797 55%, #c96f5f)', // rose
  'radial-gradient(circle at 35% 35%, #fff1d6, #e9c08c 55%, #b8894a)', // gold bead
]
function Leaf({ className, style, fill = '#8d9a6b' }) {
  return (
    <svg viewBox="0 0 20 34" className={className} style={style}>
      <path d="M10 0 C18 8 18 22 10 34 C2 22 2 8 10 0Z" fill={fill} />
      <path d="M10 2 L10 32" stroke="#c7cfaa" strokeWidth=".8" />
    </svg>
  )
}
function Strand({ length, delay, x }) {
  return (
    <div className="sway absolute top-0 flex flex-col items-center" style={{ left: x, animationDelay: `${delay}s` }}>
      <div className="h-2 w-px bg-gold-500" />
      {Array.from({ length }).map((_, i) => (
        <span
          key={i}
          className="-mt-0.5 block rounded-full shadow-[inset_-1px_-2px_3px_rgba(0,0,0,.12)]"
          style={{ width: 11 - i * 0.35, height: 11 - i * 0.35, background: BEADS[i % 3 === 2 ? 2 : i % 2] }}
        />
      ))}
      <Leaf className="-mt-0.5 w-4" />
    </div>
  )
}
export function Toran({ count = 11, className = '' }) {
  return (
    <div className={`pointer-events-none relative h-28 w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg className="absolute inset-x-0 top-0 h-6 w-full" preserveAspectRatio="none" viewBox="0 0 400 24">
        <path d="M0 4 Q200 16 400 4" fill="none" stroke="#b8894a" strokeWidth="2" />
      </svg>
      <div className="absolute inset-x-0 top-0 flex justify-between px-1">
        {Array.from({ length: count * 2 }).map((_, i) => (
          <Leaf key={i} className="w-3" fill={i % 2 ? '#8d9a6b' : '#a3ad85'} style={{ transform: `rotate(${i % 2 ? 18 : -18}deg)`, marginTop: 2 }} />
        ))}
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <Strand key={i} x={`${((i + 0.5) / count) * 100}%`} length={i % 2 ? 5 : 7} delay={(i % 4) * -0.9} />
      ))}
    </div>
  )
}

/* ─────────────────────────  Godna band (Chhattisgarhi tattoo motifs)  ───────────────────────── */
export function GodnaBand({ className = '', color = '#d4a568' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={`h-5 w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id={`godna-${id}`} width="40" height="20" patternUnits="userSpaceOnUse">
          <g fill={color}>
            <path d="M0 10 L6 4 L12 10 L6 16Z" />
            <circle cx="20" cy="10" r="1.6" />
            <circle cx="16" cy="6" r="1" />
            <circle cx="24" cy="14" r="1" />
            <circle cx="16" cy="14" r="1" />
            <circle cx="24" cy="6" r="1" />
            <path d="M28 10 L34 4 L40 10 L34 16Z" fillOpacity=".5" />
          </g>
          <path d="M0 1 H40 M0 19 H40" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="20" fill={`url(#godna-${id})`} />
    </svg>
  )
}

/* ─────────────────────────  Mandala  ───────────────────────── */
export function Mandala({ className = '', stroke = '#d4a568' }) {
  const petals = (n, r, len, w) =>
    Array.from({ length: n }).map((_, i) => (
      <path
        key={`${n}-${r}-${i}`}
        transform={`rotate(${(360 / n) * i} 100 100)`}
        d={`M100 ${100 - r} C${100 + w} ${100 - r - len * 0.4} ${100 + w * 0.6} ${100 - r - len} 100 ${100 - r - len} C${100 - w * 0.6} ${100 - r - len} ${100 - w} ${100 - r - len * 0.4} 100 ${100 - r}Z`}
      />
    ))
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke={stroke} strokeWidth=".6">
        <circle cx="100" cy="100" r="18" />
        <circle cx="100" cy="100" r="36" strokeDasharray="1 3" />
        <circle cx="100" cy="100" r="58" />
        <circle cx="100" cy="100" r="62" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="96" />
        {petals(12, 18, 18, 7)}
        {petals(24, 38, 20, 5)}
        {petals(36, 62, 30, 4)}
      </g>
      <g fill={stroke}>
        {Array.from({ length: 48 }).map((_, i) => (
          <circle key={i} cx={100 + 96 * Math.cos((i / 48) * Math.PI * 2)} cy={100 + 96 * Math.sin((i / 48) * Math.PI * 2)} r="1.2" />
        ))}
      </g>
    </svg>
  )
}

/* ─────────────────────────  Lotus & sprig (parallax decorations)  ───────────────────────── */
export function Lotus({ className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`lp-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe1d8" />
          <stop offset="1" stopColor="#e39a88" />
        </linearGradient>
      </defs>
      <g fill={`url(#lp-${id})`} stroke="#d4a568" strokeWidth=".8">
        <path d="M60 70 C30 64 8 50 2 36 C22 34 44 46 58 66Z" />
        <path d="M60 70 C90 64 112 50 118 36 C98 34 76 46 62 66Z" />
        <path d="M60 70 C40 58 28 38 30 16 C46 26 58 46 60 68Z" />
        <path d="M60 70 C80 58 92 38 90 16 C74 26 62 46 60 68Z" />
        <path d="M60 70 C50 50 50 24 60 4 C70 24 70 50 60 70Z" />
      </g>
      <path d="M20 74 Q60 82 100 74" fill="none" stroke="#a3ad85" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
export function Sprig({ className = '' }) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden="true">
      <path d="M30 118 C28 80 34 40 30 4" fill="none" stroke="#8d9a6b" strokeWidth="1.6" />
      {[20, 38, 56, 74, 92].map((y, i) => (
        <g key={y}>
          <path d={`M30 ${y} C${i % 2 ? 48 : 12} ${y - 6} ${i % 2 ? 54 : 6} ${y + 4} ${i % 2 ? 46 : 14} ${y + 12} C${i % 2 ? 40 : 20} ${y + 8} 32 ${y + 6} 30 ${y}Z`} fill={i % 2 ? '#a3ad85' : '#8d9a6b'} />
        </g>
      ))}
      <circle cx="30" cy="6" r="4" fill="#e8a797" />
      <circle cx="30" cy="6" r="1.6" fill="#fff4dd" />
    </svg>
  )
}

/* ─────────────────────────  Divider  ───────────────────────── */
export function Divider({ className = '', color = '#d4a568' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16" style={{ backgroundImage: `linear-gradient(to right, transparent, ${color})` }} />
      <svg viewBox="0 0 60 24" className="h-5 w-14">
        <g fill={color}>
          <path d="M30 2 C34 8 34 14 30 20 C26 14 26 8 30 2Z" />
          <path d="M28 18 C20 18 14 14 11 10 C18 9 24 12 28 16Z" fillOpacity=".7" />
          <path d="M32 18 C40 18 46 14 49 10 C42 9 36 12 32 16Z" fillOpacity=".7" />
          <circle cx="4" cy="14" r="1.6" />
          <circle cx="56" cy="14" r="1.6" />
        </g>
        <circle cx="30" cy="11" r="1.6" fill="#d67564" />
      </svg>
      <span className="h-px w-16" style={{ backgroundImage: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  )
}

/* ─────────────────────────  Corner filigree  ───────────────────────── */
export function Corner({ className = '', color = '#d4a568' }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.2">
        <path d="M2 58 V14 Q2 2 14 2 H58" />
        <path d="M8 58 V20 Q8 8 20 8 H58" strokeOpacity=".5" />
        <path d="M14 14 C22 14 26 20 22 26 C18 30 12 26 14 22" />
      </g>
      <g fill={color}>
        <circle cx="14" cy="14" r="2.4" />
        <path d="M30 2 L33 5 L30 8 L27 5Z" />
        <path d="M2 30 L5 33 L2 36 L-1 33Z" />
      </g>
    </svg>
  )
}

/* ─────────────────────────  Icons  ───────────────────────── */
export function EventIcon({ name, className = '' }) {
  if (name === 'rings') {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2.4">
          <circle cx="25" cy="38" r="14" />
          <circle cx="39" cy="38" r="14" />
        </g>
        <path d="M25 24 l-4 -6 h8 z M39 24 l-4 -6 h8 z" fill="currentColor" />
        <path d="M32 6 l2 4 4 .5 -3 3 .8 4 -3.8 -2 -3.8 2 .8 -4 -3 -3 4 -.5z" fill="currentColor" opacity=".7" />
      </svg>
    )
  }
  if (name === 'kalash') {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M20 26 h24 M22 26 c-10 8 -10 24 0 30 h20 c10 -6 10 -22 0 -30" />
          <path d="M24 26 v-4 h16 v4" />
          <path d="M22 44 h20" strokeDasharray="2 3" />
        </g>
        <ellipse cx="32" cy="15" rx="7" ry="8" fill="currentColor" />
        <path d="M24 22 C18 20 14 16 13 12 C19 13 23 16 26 21Z M40 22 C46 20 50 16 51 12 C45 13 41 16 38 21Z" fill="currentColor" opacity=".75" />
        <path d="M32 34 v6 M29 37 h6" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
  if (name === 'tilak') {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <path d="M22 10 C22 34 26 42 32 46 C38 42 42 34 42 10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M32 14 C36 24 38 30 38 36 A6 6 0 0 1 26 36 C26 30 28 24 32 14Z" fill="currentColor" />
        <g fill="currentColor" opacity=".7">
          <circle cx="20" cy="54" r="2" />
          <circle cx="32" cy="56" r="2" />
          <circle cx="44" cy="54" r="2" />
        </g>
      </svg>
    )
  }
  if (name === 'lotus') {
    return (
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M32 12 C40 22 40 34 32 46 C24 34 24 22 32 12Z" />
          <path d="M29 44 C18 42 10 34 8 26 C18 26 26 32 30 40" />
          <path d="M35 44 C46 42 54 34 56 26 C46 26 38 32 34 40" />
          <path d="M12 48 C22 52 42 52 52 48" />
        </g>
        <circle cx="32" cy="6" r="2" fill="currentColor" />
      </svg>
    )
  }
  return <Diya className={className} />
}
