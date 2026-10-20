import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, hasFinePointer } from '../lib/gsap'
import { projects } from '../data'
import SectionHead from './SectionHead'
import Icon from './Icon'
import ProjectCover from './ProjectCover'

const pad = (n) => String(n).padStart(2, '0')

function ProjectCard({ p, i }) {
  const ref = useRef(null)

  // pointer-driven spotlight + subtle 3D tilt
  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    if (hasFinePointer()) {
      gsap.to(el.querySelector('.card-inner'), {
        rotationY: (x - 0.5) * 8,
        rotationX: (0.5 - y) * 8,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }
  const onLeave = () =>
    gsap.to(ref.current.querySelector('.card-inner'), { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'elastic.out(1,0.6)' })

  return (
    <article className="pcard" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="card-inner">
        <div className="pcard-glow" />
        <div className="pcover-wrap">
          <ProjectCover project={p} />
          <span className="pcard-num">{pad(i + 1)}</span>
          {p.status && <span className="pcard-status">{p.status}</span>}
        </div>

        <div className="pcard-body">
          <p className="pcard-kind">
            <Icon name={p.icon} /> {p.kind}
          </p>
          <h3 className="pcard-title">{p.title}</h3>
          <p className="pcard-desc">{p.desc}</p>

          <ul className="pcard-tags">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="pcard-links">
            {p.live && (
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="plink plink-main">
                Live demo <Icon name="external" />
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="plink">
                <Icon name="github" /> Code
              </a>
            )}
            {p.private && (
              <span className="plink plink-private" title="The source is in a private repository">
                <Icon name="lock" /> Private repo
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: pin the section and scrub the card track sideways.
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = root.current.querySelector('.ptrack')
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 1)
        const counter = root.current.querySelector('.pcount-current')

        const move = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current.querySelector('.ppin'),
            pin: true,
            scrub: 0.7,
            start: 'top top',
            end: () => `+=${dist() * 1.1}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set('.pbar-fill', { scaleX: self.progress })
              const idx = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1)
              if (counter.textContent !== pad(idx)) counter.textContent = pad(idx)
            },
          },
        })

        gsap.utils.toArray('.pcard').forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.25, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: move,
                start: 'left 95%',
                end: 'left 55%',
                scrub: true,
              },
            },
          )
        })
        // big ghost heading drifts slower than the cards for depth
        gsap.to('.pghost', {
          x: () => -dist() * 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current.querySelector('.ppin'),
            start: 'top top',
            end: () => `+=${dist() * 1.1}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })

      // Mobile / reduced motion: plain vertical stack with reveal-on-scroll.
      mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        ScrollTrigger.batch('.pcard', {
          start: 'top 90%',
          once: true,
          onEnter: (els) =>
            gsap.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }),
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="projects" ref={root}>
      <div className="ppin">
        <div className="pghost" aria-hidden="true">
          Selected Work
        </div>
        <div className="container phead">
          <SectionHead index="05" label="Projects">
            Other things I've built
          </SectionHead>
          <div className="pmeta">
            <p className="pintro">
              Full-stack apps, ML and FinTech tools, computer vision and security work. Live demos where they exist, code
              wherever it is public.
            </p>
            <div className="pcount" aria-hidden="true">
              <span className="pcount-current">01</span>
              <span className="pcount-sep" />
              <span>{pad(projects.length)}</span>
            </div>
          </div>
        </div>

        <div className="ptrack-wrap">
          <div className="ptrack">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i} />
            ))}
            <div className="pend">
              <p>More on</p>
              <a href="https://github.com/AdvaitZeroSix" target="_blank" rel="noopener noreferrer" data-cursor="Open">
                GitHub <Icon name="external" />
              </a>
            </div>
          </div>
        </div>

        <div className="pbar" aria-hidden="true">
          <div className="pbar-fill" />
        </div>
      </div>
    </section>
  )
}
