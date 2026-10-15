import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap'

const rowA = ['React', 'GSAP', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Tailwind CSS', 'Vite']
const rowB = ['Python', 'Scikit-learn', 'OpenCV', 'NumPy', 'FastAPI', 'Flask', 'CTF', 'Java']

function Row({ items }) {
  // content is duplicated so a -50% shift loops seamlessly
  const list = [...items, ...items]
  return (
    <div className="marquee-row">
      <div className="marquee-track">
        {list.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t}
            <span className="marquee-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// Two skill tickers moving in opposite directions. Scrolling speeds them up
// and flips them to follow the scroll direction.
export default function Marquee() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tracks = gsap.utils.toArray('.marquee-track')
      const tweens = tracks.map((t, i) => {
        const dir = i % 2 === 0 ? -1 : 1
        return gsap.fromTo(
          t,
          { xPercent: dir === -1 ? 0 : -50 },
          { xPercent: dir === -1 ? -50 : 0, duration: 38, ease: 'none', repeat: -1 },
        )
      })

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 6)
          tweens.forEach((tw) => {
            gsap.to(tw, { timeScale: self.direction * boost, duration: 0.25, overwrite: true })
            gsap.to(tw, { timeScale: self.direction, duration: 1.2, delay: 0.25, overwrite: false })
          })
        },
      })
    },
    { scope: root },
  )

  return (
    <section className="marquee" ref={root} aria-hidden="true">
      <Row items={rowA} />
      <Row items={rowB} />
    </section>
  )
}
