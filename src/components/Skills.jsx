import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { skills } from '../data'
import SectionHead from './SectionHead'

export default function Skills() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray('.sgroup').forEach((g) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: g, start: 'top 85%', once: true } })
        tl.from(g, { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out' }).from(
          g.querySelectorAll('.chip'),
          { y: 20, opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.05, ease: 'back.out(2)' },
          '-=0.5',
        )
      })
    },
    { scope: root },
  )

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section className="section" id="skills" ref={root}>
      <div className="container">
        <SectionHead
          index="06"
          label="Skills"
          sub="Languages and tools I have used in my projects."
        >
          What I work with
        </SectionHead>

        <div className="skills-grid">
          {skills.map((g, i) => (
            <div className={`sgroup sgroup-${i}`} key={g.label} onMouseMove={onMove}>
              <h3 className="sgroup-label">
                <span className="sgroup-idx">0{i + 1}</span>
                {g.label}
              </h3>
              <ul className="chips">
                {g.items.map((s) => (
                  <li className="chip" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
