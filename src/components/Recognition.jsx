import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { achievements, clubs } from '../data'
import SectionHead from './SectionHead'
import Icon from './Icon'

export default function Recognition() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.ach', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ach-list', start: 'top 82%', once: true },
      })
      gsap.from('.club', {
        x: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.club-list', start: 'top 85%', once: true },
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
    <section className="section" id="achievements" ref={root}>
      <div className="container two-col">
        <div>
          <SectionHead index="02" label="Recognition">
            Achievements
          </SectionHead>
          <ul className="ach-list">
            {achievements.map((a) => (
              <li className="ach" key={a.title} onMouseMove={onMove}>
                <div className="ach-icon">
                  <Icon name={a.icon} />
                </div>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHead index="03" label="Campus">
            Committees
          </SectionHead>
          <ul className="club-list">
            {clubs.map((c, i) => (
              <li className="club" key={c.name}>
                <span className="club-idx">0{i + 1}</span>
                <div>
                  <h3>{c.name}</h3>
                  <span className="club-role">{c.role}</span>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
