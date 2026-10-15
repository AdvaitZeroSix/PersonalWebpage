import { useEffect, useRef } from 'react'
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/gsap'

// Pulls an element toward the cursor while it hovers nearby, then springs it back.
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.45)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.45)' })

    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [strength])

  return ref
}
