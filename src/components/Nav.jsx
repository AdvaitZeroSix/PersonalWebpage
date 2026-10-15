import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { scrollToTarget, stopScroll, startScroll } from '../lib/scroll'
import { profile } from '../data'
import useMagnetic from '../hooks/useMagnetic'

const links = [
  { href: '#about', label: 'About' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
]

export default function Nav({ ready }) {
  const root = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const cta = useMagnetic(0.25)

  useGSAP(
    () => {
      // slide in once the preloader is gone
      gsap.set(root.current, { yPercent: -120 })
      // scroll progress bar
      gsap.to('.nav-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      })
      // hide on scroll down, reveal on scroll up
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (self.scroll() < 120) return gsap.to(root.current, { yPercent: 0, duration: 0.4, overwrite: 'auto' })
          gsap.to(root.current, {
            yPercent: self.direction === 1 ? -120 : 0,
            duration: 0.4,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        },
      })
      // scroll spy
      // (elements, not selectors: useGSAP scopes selector strings to this header)
      links.forEach(({ href }) => {
        const section = document.querySelector(href)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(href),
          onLeaveBack: () => href === links[0].href && setActive(''),
        })
      })
    },
    { scope: root },
  )

  useGSAP(
    () => {
      if (ready) gsap.to(root.current, { yPercent: 0, duration: 1, ease: 'power4.out', delay: 0.3 })
    },
    { dependencies: [ready] },
  )

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    startScroll()
    scrollToTarget(href)
  }

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) stopScroll()
    else startScroll()
  }

  return (
    <>
    <header className={`nav ${open ? 'is-open' : ''}`} ref={root}>
      <div className="nav-progress" />
      <nav className="nav-inner">
        <a href="#top" className="nav-logo" onClick={(e) => go(e, 0)} aria-label="Back to top">
          Advait<span className="nav-logo-dot">.</span>
        </a>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={active === l.href ? 'is-active' : ''} onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a ref={cta} href={`mailto:${profile.email}`} className="nav-cta">
          Get in touch
        </a>
        <button className="nav-toggle" onClick={toggle} aria-label="Toggle menu" aria-expanded={open}>
          <span />
          <span />
        </button>
      </nav>
    </header>
    <div className={`nav-sheet ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      {links.map((l, i) => (
        <a key={l.href} href={l.href} style={{ '--i': i }} onClick={(e) => go(e, l.href)} tabIndex={open ? 0 : -1}>
          <span>0{i + 1}</span> {l.label}
        </a>
      ))}
      <a href={`mailto:${profile.email}`} style={{ '--i': links.length }} tabIndex={open ? 0 : -1}>
        <span>→</span> Say hello
      </a>
    </div>
    </>
  )
}
