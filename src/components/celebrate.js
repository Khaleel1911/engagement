import confetti from 'canvas-confetti'

const COLORS = ['#e9c08c', '#d67564', '#f2cabd', '#fff4dd', '#d4a568', '#e8a797']

// A layered burst of blush-and-gold confetti.
export function celebrate() {
  const fire = (ratio, opts) => confetti({ origin: { y: 0.7 }, colors: COLORS, particleCount: Math.floor(180 * ratio), ...opts })
  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
}
