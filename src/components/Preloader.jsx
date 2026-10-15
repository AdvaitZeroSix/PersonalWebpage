import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const num = useRef(null)

  useGSAP(
    () => {
      const counter = { v: 0 }
      const tl = gsap.timeline({ onComplete: onDone })

      if (prefersReducedMotion()) {
        tl.to(root.current, { opacity: 0, duration: 0.3 })
        return
      }

      tl.from('.pre-word span', { yPercent: 110, duration: 0.8, stagger: 0.08, ease: 'power4.out' })
        .to(
          counter,
          {
            v: 100,
            duration: 1.6,
            ease: 'power2.inOut',
            onUpdate: () => {
              num.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
            },
          },
          0.1,
        )
        .to('.pre-bar-fill', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0.1)
        .to('.pre-inner', { opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.15')
        .to(root.current, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, '-=0.1')
    },
    { scope: root },
  )

  return (
    <div className="preloader" ref={root}>
      <div className="pre-inner">
        <div className="pre-word">
          <span>Initializing</span> <span>portfolio</span>
        </div>
        <div className="pre-meta">
          <span>Advait Saxena · 2026</span>
          <span ref={num} className="pre-num">
            000
          </span>
        </div>
        <div className="pre-bar">
          <div className="pre-bar-fill" />
        </div>
      </div>
    </div>
  )
}
