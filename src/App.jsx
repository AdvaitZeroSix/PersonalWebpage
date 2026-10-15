import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './lib/gsap'
import { setLenis, startScroll, stopScroll } from './lib/scroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Background from './components/Background'
import Nav from './components/Nav'
import Welcome from './components/Welcome'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Flagship from './components/Flagship'
import Projects from './components/Projects'
import Education from './components/Education'
import Skills from './components/Skills'
import Activity from './components/Activity'
import Recognition from './components/Recognition'
import Contact from './components/Contact'
import MusicDock from './components/MusicDock'
import { initMusic } from './lib/music'
import { aboutFacts } from './data'

export default function App() {
  // loading -> welcome (greeting overlay) -> ready (page revealed)
  const [stage, setStage] = useState('loading')
  const [welcomeOpen, setWelcomeOpen] = useState(true)
  const ready = stage === 'ready'

  // Smooth scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    if (prefersReducedMotion()) {
      setLenis(null)
      return
    }
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    stopScroll() // locked until the preloader finishes
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    if (ready) startScroll()
  }, [ready])

  // load the music player early so it is ready when the visitor clicks Enter
  useEffect(() => {
    initMusic(aboutFacts.music.trackId)
  }, [])

  // Layout shifts (webfonts, images, pin spacers) -> recalc trigger positions.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      {stage === 'loading' && <Preloader onDone={() => setStage('welcome')} />}
      {stage !== 'loading' && welcomeOpen && (
        <Welcome onReveal={() => setStage('ready')} onFinish={() => setWelcomeOpen(false)} />
      )}
      <Cursor />
      <Background />
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Recognition />
        <div id="projects">
          <Flagship />
          <Projects />
        </div>
        <Skills />
        <Education />
        <Activity />
      </main>
      <Contact />
      <MusicDock show={ready} />
    </>
  )
}
