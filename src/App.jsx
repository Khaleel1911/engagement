import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import EnvelopeIntro from './components/Envelope'
import Petals, { showerPetals } from './components/Petals'
import Hero from './components/Hero'
import Invite from './components/Invite'
import Jodi from './components/Jodi'
import Countdown from './components/Countdown'
import Couple from './components/Couple'
import Story from './components/Story'
import Events from './components/Events'
import Parampara from './components/Parampara'
import Gallery from './components/Gallery'
import Venue from './components/Venue'
import Aashirwad from './components/Aashirwad'
import Footer from './components/Footer'
import { Page } from './components/ui'
import { BottomNav, MusicButton, ScrollThread, useMusic } from './components/Chrome'

function App() {
  const [revealed, setRevealed] = useState(false) // envelope card is growing, site shows through
  const [ready, setReady] = useState(false) // envelope fully gone
  const music = useMusic()
  const lenisRef = useRef(null)

  // Buttery smooth scrolling + smooth anchor links
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: 0 } })
    lenisRef.current = lenis
    lenis.stop()
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  // Lock scroll until the envelope is gone
  useEffect(() => {
    document.body.classList.toggle('locked', !ready)
    if (ready) lenisRef.current?.start()
    else lenisRef.current?.stop()
  }, [ready])

  const onOpenStart = useCallback(() => {
    setRevealed(true)
    setTimeout(() => {
      const w = window.innerWidth
      showerPetals(w * 0.15, window.innerHeight * 0.35, 30)
      showerPetals(w * 0.85, window.innerHeight * 0.35, 30)
    }, 700)
  }, [])
  const onDone = useCallback(() => setReady(true), [])

  return (
    <>
      <EnvelopeIntro onOpenStart={onOpenStart} onDone={onDone} />
      <Petals />
      <ScrollThread />
      <MusicButton music={music} visible={revealed} />

      <main className="relative">
        <Page id="home" first>
          <Hero ready={revealed} />
        </Page>
        <Page id="invite">
          <Invite />
        </Page>
        <Page id="jodi">
          <Jodi />
        </Page>
        <Page id="countdown">
          <Countdown />
        </Page>
        <Page id="couple">
          <Couple />
        </Page>
        <Page id="story">
          <Story />
        </Page>
        <Page id="events">
          <Events />
        </Page>
        <Page id="parampara">
          <Parampara />
        </Page>
        <Page id="gallery">
          <Gallery />
        </Page>
        <Page id="venue">
          <Venue />
        </Page>
        {/* hold: the diya page stays fully on screen for a while so guests can light all seven */}
        <Page id="aashirwad" hold={0.7}>
          <Aashirwad />
        </Page>
        <Page id="footer" last>
          <Footer />
        </Page>
      </main>

      <BottomNav visible={revealed} />
    </>
  )
}

export default App
