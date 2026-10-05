import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react'
import { config } from '../config'
import { onRelayout } from './ui'

/* Thin progress thread at the very top */
export function ScrollThread() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-blush-400 via-gold-300 to-blush-300" />
}

/* Floating bottom navigation (mobile-first) */
const NAV = [
  { id: 'home', label: 'Home', d: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { id: 'couple', label: 'Couple', d: 'M12 21s-7-4.6-9.5-9C.9 8.6 3 5 6.5 5c2 0 3.5 1.2 5.5 3.2C14 6.2 15.5 5 17.5 5 21 5 23.1 8.6 21.5 12 19 16.4 12 21 12 21z' },
  { id: 'events', label: 'Events', d: 'M7 2v3M17 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z' },
  { id: 'venue', label: 'Venue', d: 'M12 22s7-7.8 7-13a7 7 0 0 0-14 0c0 5.2 7 13 7 13zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z' },
  { id: 'aashirwad', label: 'Diyas', d: 'M12 3c2.5 3.2 3.5 5.4 3.5 7.2A3.5 3.5 0 0 1 12 13.7a3.5 3.5 0 0 1-3.5-3.5C8.5 8.4 9.5 6.2 12 3zM3 15c1.5 3.5 4.8 5.5 9 5.5s7.5-2 9-5.5c-2.8 1-5.8 1.5-9 1.5s-6.2-.5-9-1.5z' },
]

export function BottomNav({ visible }) {
  const [active, setActive] = useState('home')
  useEffect(() => {
    // Page anchors are zero-height markers in normal flow; cache their offsets
    // on relayout so scrolling itself never touches layout.
    let marks = []
    let vh = window.innerHeight
    const onScroll = () => {
      const y = window.scrollY + vh * 0.45
      let current = 'home'
      for (const [id, top] of marks) if (top <= y) current = id
      setActive(current)
    }
    const measure = () => {
      vh = window.innerHeight
      marks = [...document.querySelectorAll('[data-anchor]')].filter((el) => NAV.some((n) => n.id === el.id)).map((el) => [el.id, el.offsetTop])
      onScroll()
    }
    measure()
    const off = onRelayout(measure)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      off()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 24 }}
          className="pb-safe fixed inset-x-0 bottom-0 z-50 flex justify-center px-4"
        >
          <div className="flex w-full max-w-sm items-center justify-between rounded-full border border-gold-300/70 bg-ivory/95 px-2 py-1.5 shadow-[0_12px_40px_-8px_rgba(158,74,63,.35)]">
            {NAV.map((n) => {
              const on = active === n.id
              return (
                <a key={n.id} href={`#${n.id}`} className="relative flex flex-1 flex-col items-center gap-0.5 rounded-full py-2">
                  {on && <motion.span layoutId="nav" className="absolute inset-0 rounded-full bg-blush-100 ring-1 ring-blush-200" />}
                  <svg viewBox="0 0 24 24" className={`relative w-5 ${on ? 'text-blush-400' : 'text-gold-500/80'}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={n.d} />
                  </svg>
                  <span className={`relative font-display text-[8px] tracking-[0.12em] uppercase ${on ? 'text-blush-500' : 'text-cocoa-600/70'}`}>{n.label}</span>
                </a>
              )
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

/*
 * Background music. Tries to autoplay; browsers usually block sound until the
 * guest first touches the page, so it also starts on the first tap/key press.
 */
export function useMusic() {
  const audio = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const a = new Audio(config.music)
    a.loop = true
    a.volume = 0.45
    audio.current = a
    let userPaused = false

    const tryPlay = () => {
      if (userPaused) return
      a.play()
        .then(() => {
          setPlaying(true)
          detach()
        })
        .catch(() => {})
    }
    const events = ['pointerdown', 'touchend', 'keydown']
    const detach = () => events.forEach((e) => window.removeEventListener(e, tryPlay))
    events.forEach((e) => window.addEventListener(e, tryPlay, { passive: true }))
    a.addEventListener('error', () => {
      setAvailable(false)
      detach()
    })
    a.addEventListener('pause', () => setPlaying(false))
    a.addEventListener('play', () => setPlaying(true))
    a.userPaused = (v) => (userPaused = v)
    tryPlay()

    return () => {
      detach()
      a.pause()
    }
  }, [])

  const toggle = () => {
    const a = audio.current
    if (!a) return
    if (playing) {
      a.userPaused(true)
      a.pause()
    } else {
      a.userPaused(false)
      a.play().catch(() => {})
    }
  }
  const play = () => {
    const a = audio.current
    if (!a) return
    a.userPaused(false)
    a.play().catch(() => {})
  }
  return { playing, available, toggle, play }
}

export function MusicButton({ music, visible }) {
  if (!visible || !music.available) return null
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
      onClick={(e) => {
        e.stopPropagation()
        music.toggle()
      }}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={music.playing ? 'Pause music' : 'Play music'}
      className="fixed top-4 right-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-gold-300 bg-ivory/95 text-blush-400 shadow-lg"
    >
      {music.playing ? (
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span key={i} className="w-[3px] rounded-full bg-blush-400" animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" className="w-5" fill="currentColor" aria-hidden="true">
          <path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
        </svg>
      )}
    </motion.button>
  )
}
