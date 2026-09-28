import { useEffect, useRef } from 'react'

// Falling marigold & rose petals on a single canvas.
// Call `showerPetals(x, y)` from anywhere to burst extra petals at a point.
const COLORS = ['#f2cabd', '#e8a797', '#fbe4dc', '#d67564', '#e9c08c', '#fff6ef', '#f5b7a8']

export function showerPetals(x, y, count = 28) {
  window.dispatchEvent(new CustomEvent('petal-burst', { detail: { x, y, count } }))
}

function makePetal(w, h, burst) {
  const size = 7 + Math.random() * 9
  return {
    x: burst ? burst.x : Math.random() * w,
    y: burst ? burst.y : -20 - Math.random() * h,
    vx: burst ? (Math.random() - 0.5) * 7 : (Math.random() - 0.5) * 0.4,
    vy: burst ? -Math.random() * 7 - 2 : 0.6 + Math.random() * 0.9,
    size,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.05,
    flip: Math.random() * Math.PI * 2,
    vflip: 0.02 + Math.random() * 0.04,
    sway: Math.random() * Math.PI * 2,
    color: COLORS[(Math.random() * COLORS.length) | 0],
    burst: !!burst,
    life: 1,
  }
}

export default function Petals({ density = 10 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const petals = reduce ? [] : Array.from({ length: density }, () => makePetal(w, h))

    const onBurst = (e) => {
      const { x, y, count } = e.detail
      for (let i = 0; i < count; i++) petals.push(makePetal(w, h, { x, y }))
    }
    window.addEventListener('petal-burst', onBurst)

    const draw = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.scale(1, Math.abs(Math.cos(p.flip)) * 0.8 + 0.2)
      ctx.globalAlpha = 0.75 * p.life
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.moveTo(0, -p.size)
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.7, p.size * 0.7, 0, p.size)
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.7, -p.size * 0.9, -p.size * 0.6, 0, -p.size)
      ctx.fill()
      ctx.globalAlpha = 0.25 * p.life
      ctx.strokeStyle = '#9e4a3f'
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(0, -p.size * 0.8)
      ctx.lineTo(0, p.size * 0.8)
      ctx.stroke()
      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i]
        p.sway += 0.02
        if (p.burst) {
          p.vy += 0.12
          p.vx *= 0.985
          p.vy = Math.min(p.vy, 2.4)
        }
        p.x += p.vx + Math.sin(p.sway) * 0.5
        p.y += p.vy
        p.rot += p.vr
        p.flip += p.vflip
        if (p.y > h + 30) {
          if (p.burst) {
            petals.splice(i, 1)
            continue
          }
          Object.assign(p, makePetal(w, h), { y: -20 })
        }
        draw(p)
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('petal-burst', onBurst)
    }
  }, [density])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-40" aria-hidden="true" />
}
