import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { startMusic } from '../lib/music'
import Hud, { spinRings } from './Hud'

const greetingFor = (h) => (h >= 5 && h < 12 ? 'Good morning' : h >= 12 && h < 17 ? 'Good afternoon' : 'Good evening')

// One-off welcome after the loader. It first waits for a click on "Enter"
// (browsers only allow audio after a click, so this is also what starts the
// music), then reads the visitor's local time, greets them accordingly,
// introduces me and dissolves into the page.
//   onReveal  -> the page underneath may start its own entrance
//   onFinish  -> the overlay is gone and can be unmounted
export default function Welcome({ onReveal, onFinish }) {
  const root = useRef(null)
  const timeEl = useRef(null)
  const labelEl = useRef(null)
  const tl = useRef(null)
  const entered = useRef(false)

  const now = new Date()
  const greeting = greetingFor(now.getHours())
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase()
  const zone = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').replace(/_/g, ' ')

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onReveal()
        onFinish()
        return
      }

      spinRings(gsap)

      // the HUD and the gate appear straight away
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.w-hud', { scale: 0.55, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0)
        .from('.w-bracket', { opacity: 0, scale: 1.4, duration: 0.9, stagger: 0.08 }, 0.2)
        .from('.w-gate > *', { opacity: 0, y: 16, duration: 0.8, stagger: 0.12 }, 0.5)
      gsap.set('.w-status, .w-skip', { opacity: 0 })

      const lines = gsap.utils.toArray('.w-line')
      const splits = lines.map((l) => SplitText.create(l.querySelector('.w-t'), { type: 'chars' }))
      gsap.set(lines, { autoAlpha: 0 })

      const showLine = (t, i, at, hold) => {
        t.set(lines[i], { autoAlpha: 1 }, at)
          .from(splits[i].chars, { yPercent: 115, opacity: 0, duration: 0.8, stagger: 0.03, ease: 'power4.out' }, at)
          .to(splits[i].chars, { yPercent: -115, opacity: 0, duration: 0.5, stagger: 0.015, ease: 'power3.in' }, at + hold)
      }

      // scrambles the clock digits into the real time
      const scramble = { p: 0 }
      const draw = () => {
        timeEl.current.textContent = [...timeStr]
          .map((ch, i) => (/\d/.test(ch) && scramble.p < (i + 1) / timeStr.length ? String(Math.floor(Math.random() * 10)) : ch))
          .join('')
      }

      // main sequence: paused until the visitor clicks Enter
      const t = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
      tl.current = t
      t.to('.w-gate', { opacity: 0, y: -10, duration: 0.5, pointerEvents: 'none' }, 0)
        .to('.w-status, .w-skip', { opacity: 1, duration: 0.7 }, 0.3)
        .to(scramble, { p: 1.05, duration: 1.3, ease: 'none', onUpdate: draw }, 0.5)
        .add(() => {
          labelEl.current.textContent = 'Local time confirmed'
        }, 1.7)
      showLine(t, 0, 1.9, 1.0)
      showLine(t, 1, 3.4, 1.1)
      showLine(t, 2, 5.0, 1.0)
      t.addLabel('exit', 6.3)
        .add(() => onReveal(), 'exit')
        .to('.w-status', { opacity: 0, duration: 0.5 }, 'exit')
        .to('.w-hud', { scale: 2.2, opacity: 0, duration: 1.1, ease: 'power2.in' }, 'exit')
        .to('.w-bracket', { opacity: 0, duration: 0.5 }, 'exit')
        .to('.w-skip', { opacity: 0, duration: 0.3 }, 'exit')
        .to(root.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 'exit+=0.4')
        .add(() => onFinish(), 'exit+=1.3')
    },
    { scope: root },
  )

  const enter = (withMusic) => {
    if (entered.current || !tl.current) return
    entered.current = true
    if (withMusic) startMusic() // inside the click, so the browser allows audio
    tl.current.play()
  }

  const skip = () => {
    const t = tl.current
    if (entered.current && t && t.time() < t.labels.exit) {
      t.tweenTo('exit', { duration: 0.5, ease: 'power2.inOut', onComplete: () => t.play() })
    }
  }

  return (
    <div className="welcome" ref={root}>
      <div className="w-hud" aria-hidden="true">
        <div className="hud-inner">
          <Hud />
        </div>
      </div>
      <span className="bracket w-bracket b-tl" aria-hidden="true" />
      <span className="bracket w-bracket b-tr" aria-hidden="true" />
      <span className="bracket w-bracket b-bl" aria-hidden="true" />
      <span className="bracket w-bracket b-br" aria-hidden="true" />

      <div className="w-gate">
        <p className="w-gate-note">Best with sound on</p>
        <button className="w-enter" onClick={() => enter(true)} autoFocus>
          Enter
        </button>
        <button className="w-nosound" onClick={() => enter(false)}>
          Enter without music
        </button>
      </div>

      <div className="w-status">
        <p className="w-label">
          <span className="pulse" /> <span ref={labelEl}>Syncing local time</span>
        </p>
        <b className="w-time" ref={timeEl}>
          --:--
        </b>
        {zone && <span className="w-tz">{zone}</span>}
      </div>

      <div className="w-lines" aria-live="polite">
        <div className="w-line">
          <span className="w-t">{greeting}.</span>
        </div>
        <div className="w-line">
          <span className="w-t">Hi, I&apos;m Advait.</span>
        </div>
        <div className="w-line w-small">
          <span className="w-t">Welcome to my portfolio.</span>
        </div>
      </div>

      <button className="w-skip" onClick={skip}>
        Skip
      </button>
    </div>
  )
}
