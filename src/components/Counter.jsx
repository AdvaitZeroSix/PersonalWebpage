import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

// Number that counts up from 0 the first time it scrolls into view.
export default function Counter({ to, decimals = 0, suffix = '' }) {
  const el = useRef(null)
  const fmt = (v) => v.toFixed(decimals) + suffix

  useGSAP(() => {
    if (prefersReducedMotion()) return
    const o = { v: 0 }
    el.current.textContent = fmt(0)
    gsap.to(o, {
      v: to,
      duration: 2,
      ease: 'power3.out',
      delay: 0.2,
      onUpdate: () => (el.current.textContent = fmt(o.v)),
      scrollTrigger: { trigger: el.current, start: 'top 95%', once: true },
    })
  })

  return (
    <strong className="counter" ref={el}>
      {fmt(to)}
    </strong>
  )
}
