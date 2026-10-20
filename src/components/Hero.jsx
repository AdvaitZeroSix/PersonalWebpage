import { useEffect, useRef } from 'react'
import { gsap, SplitText, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/gsap'
import { profile, projects, achievements, positions } from '../data'
import MagneticButton from './MagneticButton'
import Hud, { spinRings } from './Hud'
import Icon from './Icon'
import Counter from './Counter'

// The first thing visitors see once the welcome sequence ends: who I am.
export default function Hero({ ready }) {
  const root = useRef(null)
  const entrance = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      spinRings(gsap)

      // entrance, held until the welcome sequence hands over
      const split = SplitText.create('.intro-name', { type: 'chars' })
      entrance.current = gsap
        .timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .from('.intro-eyebrow', { y: 20, opacity: 0, duration: 0.8 })
        .from(split.chars, { yPercent: 100, opacity: 0, duration: 0.9, stagger: 0.03 }, '-=0.5')
        .from('.intro-bio', { y: 22, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.intro-actions > *', { y: 20, opacity: 0, duration: 0.7, stagger: 0.07 }, '-=0.5')
        .from('.photo-wrap', { scale: 0.9, opacity: 0, duration: 1.2, ease: 'expo.out' }, 0.1)
        .from('.readout', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.8)
        .from('.stat', { y: 24, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.7)

      // gentle tilt on the photo
      if (hasFinePointer()) {
        const frame = root.current.querySelector('.photo-frame')
        gsap.set(frame, { transformPerspective: 900 })
        const rx = gsap.quickTo(frame, 'rotationX', { duration: 0.8, ease: 'power3' })
        const ry = gsap.quickTo(frame, 'rotationY', { duration: 0.8, ease: 'power3' })
        const move = (e) => {
          const r = root.current.getBoundingClientRect()
          rx(-((e.clientY - r.top) / r.height - 0.5) * 10)
          ry(((e.clientX - r.left) / r.width - 0.5) * 12)
        }
        root.current.addEventListener('mousemove', move)
        return () => root.current?.removeEventListener('mousemove', move)
      }
    },
    { scope: root },
  )

  useEffect(() => {
    if (ready) entrance.current?.play()
  }, [ready])

  const projectCount = projects.filter((p) => p.id !== 'picoctf').length + 1

  return (
    <section className="intro" id="top" ref={root}>
      <div className="container intro-grid">
        <div className="intro-copy">
          <p className="intro-eyebrow">
            <span className="pulse" /> Second-year CS student · MIT Manipal
          </p>
          <h1 className="intro-name" aria-label={profile.name}>
            {profile.name}
          </h1>

          <p className="intro-bio">{profile.bio}</p>

          <div className="intro-actions">
            <MagneticButton href={`mailto:${profile.email}`} variant="primary">
              <Icon name="mail" /> Email me
            </MagneticButton>
            <MagneticButton href={profile.socials.github} target="_blank" rel="noopener noreferrer" variant="ghost">
              <Icon name="github" /> GitHub
            </MagneticButton>
            <MagneticButton href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" variant="ghost">
              <Icon name="linkedin" /> LinkedIn
            </MagneticButton>
            <MagneticButton href={profile.socials.leetcode} target="_blank" rel="noopener noreferrer" variant="ghost">
              <Icon name="code" /> LeetCode
            </MagneticButton>
          </div>
        </div>

        <div className="intro-visual">
          <div className="photo-wrap">
            <div className="hero-hud" aria-hidden="true">
              <Hud />
            </div>
            <div className="photo-frame" data-cursor="Hey!">
              <img src="/photo.jpeg" alt="Advait Saxena" width="736" height="736" />
              <span className="corner c1" />
              <span className="corner c2" />
              <span className="corner c3" />
              <span className="corner c4" />
            </div>
          </div>
          <div className="readouts">
            <div className="readout">
              <b>Manipal, India</b>
              <span>Based in</span>
            </div>
            <div className="readout">
              <b>B.Tech CSE</b>
              <span>FinTech · Studying</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container stats">
        <div className="stat">
          <Counter to={8.09} decimals={2} />
          <span>CGPA</span>
        </div>
        <div className="stat">
          <Counter to={projectCount} />
          <span>Projects built</span>
        </div>
        <div className="stat">
          <Counter to={achievements.length} />
          <span>Achievements</span>
        </div>
        <div className="stat">
          <Counter to={positions.length} />
          <span>Clubs</span>
        </div>
      </div>
    </section>
  )
}
