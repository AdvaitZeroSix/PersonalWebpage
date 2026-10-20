import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { profile, aboutFacts } from '../data'
import useISTClock from '../hooks/useISTClock'
import SectionHead from './SectionHead'
import Counter from './Counter'
import Icon from './Icon'

export default function About() {
  const root = useRef(null)
  const statement = useRef(null)
  const time = useISTClock()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // statement lights up word by word as you scroll through it
      SplitText.create(statement.current, {
        type: 'words',
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.12,
              scrollTrigger: { trigger: statement.current, start: 'top 82%', end: 'bottom 55%', scrub: 0.6 },
            },
          ),
      })

      gsap.from('.bento > *', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.bento', start: 'top 85%', once: true },
      })
      gsap.from('.sem-bar span', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.sem', start: 'top 90%', once: true },
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
    <section className="section" id="about" ref={root}>
      <div className="container">
        <SectionHead index="01" label="About me">
          A little about me
        </SectionHead>

        <p className="statement" ref={statement}>
          {profile.about}
        </p>

        <div className="bento">
          <div className="tile t-explore" onMouseMove={onMove}>
            <p className="tile-label">Learning right now</p>
            <ul className="chips">
              {aboutFacts.exploring.map((e) => (
                <li className="chip" key={e}>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="tile t-place" onMouseMove={onMove}>
            <p className="tile-label">Based in</p>
            <p className="tile-big">
              <Icon name="pin" /> Manipal
            </p>
            <p className="tile-sub">
              Karnataka, India · <span className="clock">{time} IST</span>
            </p>
          </div>

          <div className="tile t-learn" onMouseMove={onMove}>
            <p className="tile-label">How I learn</p>
            <p className="tile-quote">{aboutFacts.learn}</p>
          </div>

          <div className="tile t-give" onMouseMove={onMove}>
            <p className="tile-label">Volunteering</p>
            <p className="tile-sub tile-body">{aboutFacts.giving}</p>
          </div>

          <div className="tile t-design" onMouseMove={onMove}>
            <p className="tile-label">Design</p>
            <ul className="chips">
              {aboutFacts.design.map((d) => (
                <li className="chip" key={d}>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="tile t-grades sem" onMouseMove={onMove}>
            <p className="tile-label">Academics · MIT Manipal</p>
            <div className="grades-row">
              <div className="grades-big">
                <Counter to={8.09} decimals={2} />
                <span>CGPA</span>
              </div>
              <div className="sem-bars">
                {aboutFacts.semesters.map((s) => (
                  <div className="sem-bar" key={s.label}>
                    <label>
                      {s.label} <b>{s.value}</b>
                    </label>
                    <div className="sem-track">
                      <span style={{ width: `${(s.value / 10) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
