import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'
import { frame, motion, motionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { Corner, Divider } from './Ornaments'

export const ease = [0.22, 1, 0.36, 1]

/* ───────────────────────── layout cache ─────────────────────────
 * Performance: nothing here reads layout during scroll. Positions are
 * measured once (and again only when the document resizes); every scroll
 * frame is then pure math on scrollY → transform/opacity, which the GPU
 * composites without layout or paint.
 */
const relayoutListeners = new Set()
let relayoutBound = false
let relayoutQueued = false
/* One shared scroll source for the whole site (a single passive listener). */
export const scrollYValue = motionValue(typeof window === 'undefined' ? 0 : window.scrollY)
/* Bumped after every re-measure so transforms recompute even without scrolling. */
const layoutVersion = motionValue(0)
if (typeof window !== 'undefined') {
  // Read scrollY in the frame loop's read phase (before any style writes) so it
  // never forces a synchronous style/layout recalculation.
  const read = () => scrollYValue.set(window.scrollY)
  window.addEventListener('scroll', () => frame.read(read), { passive: true })
}

function emitRelayout() {
  if (relayoutQueued) return
  relayoutQueued = true
  requestAnimationFrame(() => {
    relayoutQueued = false
    relayoutListeners.forEach((fn) => fn())
    layoutVersion.set(layoutVersion.get() + 1)
  })
}
export function onRelayout(fn) {
  relayoutListeners.add(fn)
  if (!relayoutBound) {
    relayoutBound = true
    new ResizeObserver(emitRelayout).observe(document.body)
    window.addEventListener('resize', emitRelayout)
    window.addEventListener('load', emitRelayout)
  }
  return () => relayoutListeners.delete(fn)
}

const PageCtx = createContext(null)

/** Static document Y of an element: offsetTop chain up to its Page, plus the page's anchor. */
function docTop(el, page) {
  let y = 0
  let n = el
  const section = page?.sectionRef.current
  while (n && n !== section) {
    y += n.offsetTop
    n = n.offsetParent
  }
  if (page?.anchorRef.current) return y + page.anchorRef.current.getBoundingClientRect().top + window.scrollY
  return y
}

/**
 * Cached { top, height, vh } for an element, refreshed on relayout.
 * Returns `scrollY`, a motion value that also re-emits when layout changes.
 */
function useMetrics(ref) {
  const page = useContext(PageCtx)
  const m = useRef({ top: 0, height: 0, vh: typeof window === 'undefined' ? 800 : window.innerHeight })
  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current
      if (!el) return
      m.current = { top: docTop(el, page), height: el.offsetHeight, vh: window.innerHeight }
    }
    measure()
    layoutVersion.set(layoutVersion.get() + 1)
    return onRelayout(measure)
  }, [ref, page])
  const scrollY = useTransform([scrollYValue, layoutVersion], ([v]) => v)
  return { m, scrollY }
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

/*
 * <Page>: a stacked "card" page.
 * It sticks when its bottom reaches the viewport bottom; the next page then
 * slides up over it while this one gently sinks back (scale + dim only).
 */
export function Page({ id, children, className = '', first = false, last = false, hold = 0 }) {
  const sectionRef = useRef(null)
  const anchorRef = useRef(null)
  const endRef = useRef(null)
  const [top, setTop] = useState(0)
  const ctx = useRef({ sectionRef, anchorRef }).current

  useLayoutEffect(() => {
    const update = () => setTop(Math.min(0, window.innerHeight - sectionRef.current.offsetHeight))
    update()
    return onRelayout(update)
  }, [])

  const { m, scrollY } = useMetrics(endRef)
  const start = useMetrics(anchorRef).m
  // 0 → 1 while the next page covers this one
  const cover = useTransform(scrollY, (y) => clamp(1 - (m.current.top - y) / m.current.vh, 0, 1))
  // Off-screen pages (covered, or still below the screen) aren't painted and
  // their CSS animations pause. DOM is only touched when the state flips.
  const stateRef = useRef('')
  const syncHidden = (y) => {
    const below = start.current.top - y > m.current.vh + 150
    const covered = !last && m.current.top - y <= 0
    const state = covered ? 'covered' : below ? 'below' : 'on'
    if (state === stateRef.current || !sectionRef.current) return
    stateRef.current = state
    sectionRef.current.style.visibility = state === 'on' ? '' : 'hidden'
    sectionRef.current.classList.toggle('page-hidden', state !== 'on')
  }
  useMotionValueEvent(scrollY, 'change', syncHidden)
  useLayoutEffect(() => syncHidden(scrollY.get()))
  const scale = useTransform(cover, [0, 1], [1, 0.92])
  const dim = useTransform(cover, [0, 1], [0, 0.5])
  const shiftY = useTransform(cover, [0, 1], [0, -40])

  return (
    <PageCtx.Provider value={ctx}>
      <div ref={anchorRef} id={id} data-anchor className="relative h-0" />
      <section ref={sectionRef} style={last ? { position: 'relative' } : { top, position: 'sticky' }} className="z-0">
        <motion.div
          style={last ? undefined : { scale, y: shiftY, transformOrigin: '50% calc(100% - 50svh)', willChange: 'transform' }}
          className={`relative grid min-h-lvh grid-cols-1 overflow-hidden ${first ? '' : 'rounded-t-[28px] shadow-[0_-18px_40px_-14px_rgba(59,42,36,.35)]'} ${className}`}
        >
          {children}
          {!last && <motion.div style={{ opacity: dim, willChange: 'opacity' }} className="pointer-events-none absolute inset-0 z-30 bg-cocoa-900" />}
        </motion.div>
      </section>
      {/* hold: extra scroll distance during which this page stays fully on screen before the next one slides over */}
      {hold > 0 && <div aria-hidden="true" style={{ height: `${hold * 100}lvh` }} />}
      <div ref={endRef} className="relative h-0" />
    </PageCtx.Provider>
  )
}

/* <Parallax>: moves its children at a different speed than the scroll. */
export function Parallax({ children, speed = 0.25, className = '', rotate = 0, style }) {
  const ref = useRef(null)
  const { m, scrollY } = useMetrics(ref)
  // -1 (element below viewport) → 1 (above), relative to the viewport centre
  const p = useTransform(scrollY, (y) => {
    const { top, height, vh } = m.current
    return clamp((y + vh / 2 - (top + height / 2)) / vh, -1.5, 1.5)
  })
  const ty = useTransform(p, (v) => v * speed * -300)
  const rot = useTransform(p, (v) => v * rotate)
  return (
    <motion.div ref={ref} style={{ y: ty, rotate: rotate ? rot : 0, willChange: 'transform', ...style }} className={className}>
      {children}
    </motion.div>
  )
}

/* Progress 0→1 of scrolling through an element (for the story thread). */
export function useScrollThrough(ref, startAt = 0.7) {
  const { m, scrollY } = useMetrics(ref)
  return useTransform(scrollY, (y) => {
    const { top, height, vh } = m.current
    return clamp((y + vh * startAt - top) / height, 0, 1)
  })
}

/*
 * Scroll-driven "in view" (fires once), from the cached layout + shared scroll
 * value, so it's deterministic and free of per-element IntersectionObservers.
 */
export function useScrollInView(ref, offset = 0.9) {
  const { m, scrollY } = useMetrics(ref)
  const [inView, setInView] = useState(false)
  const done = useRef(false)
  const check = (y) => {
    if (done.current || !m.current.height) return
    if (m.current.top - y < m.current.vh * offset) {
      done.current = true
      setInView(true)
    }
  }
  useMotionValueEvent(scrollY, 'change', check)
  useLayoutEffect(() => check(scrollY.get()))
  return inView
}

/* Drop-in for a motion element with whileInView: animates `initial` → `whileInView` once. */
export function InView({ as = 'div', initial, whileInView, children, ...rest }) {
  const ref = useRef(null)
  const inView = useScrollInView(ref)
  const Comp = motion[as]
  return (
    <Comp ref={ref} initial={initial} animate={inView ? whileInView : initial} {...rest}>
      {children}
    </Comp>
  )
}

export function Reveal({ children, delay = 0, y = 34, className = '', as = 'div' }) {
  return (
    <InView as={as} className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </InView>
  )
}

/* Title whose words rise out of a mask, one by one (trigger sits on the <h2>). */
const wordVariants = {
  hidden: { y: '110%' },
  shown: (i) => ({ y: 0, transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease } }),
}
function SplitTitle({ text, className }) {
  const words = text.split(' ')
  return (
    <InView as="h2" className={className} aria-label={text} initial="hidden" whileInView="shown">
      {words.map((w, wi) => (
        <span key={wi} className="inline-block overflow-hidden pb-1 align-bottom" aria-hidden="true">
          <motion.span className="inline-block" variants={wordVariants} custom={wi}>
            {w}
            {wi < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </InView>
  )
}

export function SectionTitle({ kicker, title, dark = false }) {
  return (
    <div className="mb-10 text-center">
      {kicker && (
        <Reveal y={12}>
          <p className={`font-display text-[11px] tracking-[0.35em] uppercase ${dark ? 'text-gold-300' : 'text-gold-500'}`}>{kicker}</p>
        </Reveal>
      )}
      <SplitTitle text={title} className={`mt-1 font-display text-[1.9rem] leading-tight font-semibold sm:text-4xl ${dark ? 'text-foil' : 'text-cocoa-800'}`} />
      <Reveal y={0} delay={0.3}>
        <Divider className="mt-4" color={dark ? '#e9c08c' : '#d4a568'} />
      </Reveal>
    </div>
  )
}

/* Framed portrait: gold border, ivory mat, filigree corners and a blush offset behind. */
export function Frame({ children, className = '', tilt = 0 }) {
  return (
    <div className={`relative ${className}`} style={{ rotate: `${tilt}deg` }}>
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[20px] bg-blush-200/80" />
      <div className="relative h-full rounded-[20px] bg-gradient-to-br from-gold-200 via-gold-400 to-gold-500 p-[3px] shadow-[0_28px_50px_-22px_rgba(158,74,63,.55)]">
        <div className="h-full rounded-[17px] bg-ivory p-2.5">
          <div className="relative h-full overflow-hidden rounded-[12px] ring-1 ring-gold-300/60">{children}</div>
        </div>
      </div>
      <Corner className="absolute -top-2.5 -left-2.5 w-12" />
      <Corner className="absolute -top-2.5 -right-2.5 w-12 -scale-x-100" />
      <Corner className="absolute -bottom-2.5 -left-2.5 w-12 -scale-y-100" />
      <Corner className="absolute -right-2.5 -bottom-2.5 w-12 -scale-100" />
    </div>
  )
}

// Image with an elegant placeholder if the file isn't there yet.
export function Photo({ src, alt, label, className = '', imgClassName = '', position }) {
  const [failed, setFailed] = useState(!src)
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!failed ? (
        <img src={src} alt={alt} loading="lazy" decoding="async" style={position ? { objectPosition: position } : undefined} className={`h-full w-full object-cover ${imgClassName}`} onError={() => setFailed(true)} draggable={false} />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush-100 via-ivory to-gold-100 p-4 text-center">
          <svg viewBox="0 0 48 48" className="w-10 text-gold-400" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="10" width="36" height="28" rx="4" />
              <circle cx="18" cy="21" r="4" />
              <path d="M6 34l11-10 9 8 6-5 10 9" />
            </g>
          </svg>
          <span className="font-display text-[10px] tracking-[0.2em] text-gold-500 uppercase">{label || 'Add Photo'}</span>
          {src && <span className="font-serif text-[11px] text-gold-500 italic">{src}</span>}
        </div>
      )}
    </div>
  )
}
