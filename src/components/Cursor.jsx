import { useRef } from 'react'
import { gsap, useGSAP, hasFinePointer } from '../lib/gsap'

// Custom cursor: a precise dot plus a lagging ring that grows on interactive
// elements and shows a label on anything tagged data-cursor="Label".
export default function Cursor() {
  const root = useRef(null)
  const label = useRef(null)

  useGSAP(
    () => {
      if (!hasFinePointer()) return
      document.documentElement.classList.add('has-cursor')

      gsap.set('.cursor-dot, .cursor-ring', { xPercent: -50, yPercent: -50, x: -100, y: -100 })
      const dx = gsap.quickTo('.cursor-dot', 'x', { duration: 0.12, ease: 'power3' })
      const dy = gsap.quickTo('.cursor-dot', 'y', { duration: 0.12, ease: 'power3' })
      const rx = gsap.quickTo('.cursor-ring', 'x', { duration: 0.5, ease: 'power3' })
      const ry = gsap.quickTo('.cursor-ring', 'y', { duration: 0.5, ease: 'power3' })

      const move = (e) => {
        dx(e.clientX)
        dy(e.clientY)
        rx(e.clientX)
        ry(e.clientY)
      }

      const over = (e) => {
        const t = e.target.closest?.('[data-cursor], a, button')
        const ring = root.current
        if (!t) {
          ring.classList.remove('is-hover', 'is-label')
          return
        }
        const text = t.getAttribute('data-cursor')
        if (text) {
          label.current.textContent = text
          ring.classList.add('is-label')
          ring.classList.remove('is-hover')
        } else {
          ring.classList.add('is-hover')
          ring.classList.remove('is-label')
        }
      }

      const down = () => root.current.classList.add('is-down')
      const up = () => root.current.classList.remove('is-down')

      window.addEventListener('mousemove', move)
      window.addEventListener('mouseover', over)
      window.addEventListener('mousedown', down)
      window.addEventListener('mouseup', up)
      return () => {
        document.documentElement.classList.remove('has-cursor')
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseover', over)
        window.removeEventListener('mousedown', down)
        window.removeEventListener('mouseup', up)
      }
    },
    { scope: root },
  )

  return (
    <div className="cursor" ref={root} aria-hidden="true">
      <div className="cursor-ring">
        <span ref={label} className="cursor-label" />
      </div>
      <div className="cursor-dot" />
    </div>
  )
}
