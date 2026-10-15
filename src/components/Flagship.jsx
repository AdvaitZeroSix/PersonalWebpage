import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { flagship } from '../data'
import SectionHead from './SectionHead'
import MagneticButton from './MagneticButton'
import Counter from './Counter'
import Icon from './Icon'

const SLIDE_MS = 4500

// One compact featured project: a screenshot slideshow that advances on its
// own (pauses on hover) with tabs to jump around.
export default function Flagship() {
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const paused = useRef(false)
  const n = flagship.chapters.length
  const cur = flagship.chapters[active]

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      if (!paused.current) setActive((v) => (v + 1) % n)
    }, SLIDE_MS)
    return () => clearInterval(id)
  }, [n])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.flag-left > *', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      })
      gsap.from('.flag-right', {
        x: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <section className="flag section" id="flagship" ref={root}>
      <div className="container flag-grid">
        <div className="flag-left">
          <SectionHead index="04" label="Featured project">
            Hopeless Opus
          </SectionHead>
          <p className="flag-tag">{flagship.tagline}</p>
          <p className="flag-role">{flagship.role}</p>

          <div className="flag-stats">
            {flagship.stats.map((s) => (
              <div className="flag-stat" key={s.label}>
                <Counter to={s.value} suffix={s.suffix} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flag-actions">
            <MagneticButton href={flagship.live} target="_blank" rel="noopener noreferrer" variant="primary" strength={0.25}>
              Visit the live site <Icon name="external" />
            </MagneticButton>
            <span className="flag-private">
              <Icon name="lock" /> Source code is in a private ISTE repo
            </span>
          </div>
          <p className="flag-built">{flagship.built}</p>
        </div>

        <div
          className="flag-right"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div className="browser" data-cursor="Live">
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span className="browser-url">
                <Icon name="lock" /> {flagship.live.replace('https://', '')}
              </span>
              <span className="browser-tag">{cur.kicker}</span>
            </div>
            <div className="screens">
              {flagship.chapters.map((c, i) => (
                <div className={`screen ${i === active ? 'is-active' : ''}`} key={c.id}>
                  <img src={c.image} alt={c.alt} />
                </div>
              ))}
            </div>
          </div>

          <div className="flag-caption" key={cur.id}>
            <h3>{cur.title}</h3>
            <p>{cur.text}</p>
          </div>

          <div className="flag-tabs" role="tablist">
            {flagship.chapters.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={i === active}
                className={`flag-tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span>{c.tab}</span>
                <i style={{ '--ms': `${SLIDE_MS}ms` }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
