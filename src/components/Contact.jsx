import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { profile } from '../data'
import { scrollToTarget } from '../lib/scroll'
import MagneticButton from './MagneticButton'
import useMagnetic from '../hooks/useMagnetic'
import useISTClock from '../hooks/useISTClock'
import Icon from './Icon'

function Social({ href, label, icon }) {
  const ref = useMagnetic(0.45)
  return (
    <a ref={ref} className="social" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon name={icon} />
    </a>
  )
}

export default function Contact() {
  const root = useRef(null)
  const big = useRef(null)
  const time = useISTClock()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      SplitText.create(big.current, {
        type: 'lines,words',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.06,
            ease: 'power4.out',
            scrollTrigger: { trigger: big.current, start: 'top 80%', once: true },
          }),
      })
      gsap.from('.contact-actions > *, .socials > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-actions', start: 'top 90%', once: true },
      })
      // footer wordmark slides in with scroll
      gsap.fromTo(
        '.footer-word',
        { xPercent: -8 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <section className="section contact" id="contact">
        <div className="container">
          <p className="sh-eyebrow">
            <span className="sh-index">09</span>
            <span className="sh-rule" />
            Contact
          </p>
          <h2 className="contact-big" ref={big}>
            Have an idea? Let's build something together.
          </h2>

          <div className="contact-actions">
            <MagneticButton href={`mailto:${profile.email}`} variant="primary" className="btn-lg" strength={0.25}>
              <Icon name="mail" /> {profile.email}
            </MagneticButton>
          </div>

          <div className="socials">
            <Social href={profile.socials.github} label="GitHub" icon="github" />
            <Social href={profile.socials.linkedin} label="LinkedIn" icon="linkedin" />
            <Social href={profile.socials.leetcode} label="LeetCode" icon="code" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-word" aria-hidden="true">
          Advait Saxena
        </div>
        <div className="container footer-row">
          <p>
            <Icon name="pin" /> {profile.location} · {time} IST
          </p>
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <button className="to-top" onClick={() => scrollToTarget(0)}>
            Back to top <span>↑</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
