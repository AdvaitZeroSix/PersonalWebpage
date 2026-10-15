import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { education } from '../data'
import SectionHead from './SectionHead'

export default function Education() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = root.current.querySelector('.tl')

      // the spine draws itself as you scroll through the timeline
      gsap.fromTo(
        '.tl-spine-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: tl, start: 'top 60%', end: 'bottom 60%', scrub: 0.4 },
        },
      )

      gsap.utils.toArray('.tl-item').forEach((item, i) => {
        const fromX = window.innerWidth >= 900 ? (i % 2 === 0 ? -70 : 70) : 40
        gsap.from(item.querySelector('.tl-card'), {
          x: fromX,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        })
        gsap.fromTo(
          item.querySelector('.tl-dot'),
          { scale: 0.4, backgroundColor: 'var(--bg)' },
          {
            scale: 1,
            backgroundColor: 'var(--accent)',
            duration: 0.5,
            ease: 'back.out(3)',
            scrollTrigger: { trigger: item, start: 'top 60%', toggleActions: 'play none none reverse' },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section className="section" id="education" ref={root}>
      <div className="container">
        <SectionHead index="07" label="Background">
          Where I've studied
        </SectionHead>

        <div className="tl">
          <div className="tl-spine">
            <div className="tl-spine-fill" />
          </div>
          {education.map((e) => (
            <div className={`tl-item ${e.current ? 'is-current' : ''}`} key={e.school}>
              <span className="tl-dot" />
              <div className="tl-card">
                <div className="tl-date">{e.date}</div>
                <h3>{e.school}</h3>
                <p className="tl-sub">{e.sub}</p>
                {e.badges.length > 0 && (
                  <div className="tl-badges">
                    {e.badges.map((b, i) => (
                      <span key={b} className={`badge ${e.current && i === 0 ? 'badge-hot' : ''}`}>
                        {b}
                      </span>
                    ))}
                    {e.current && <span className="badge badge-live">Current</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
