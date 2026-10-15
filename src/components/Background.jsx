import { useEffect, useRef } from 'react'
import { gsap, useGSAP, hasFinePointer, prefersReducedMotion } from '../lib/gsap'

// Fixed backdrop: a faint HUD grid, a cursor-following glow and a small
// particle constellation that reacts to the pointer.
export default function Background() {
  const root = useRef(null)
  const canvas = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      if (hasFinePointer()) {
        const x = gsap.quickTo('.spotlight', 'x', { duration: 0.9, ease: 'power3' })
        const y = gsap.quickTo('.spotlight', 'y', { duration: 0.9, ease: 'power3' })
        const move = (e) => {
          x(e.clientX)
          y(e.clientY)
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
      }
    },
    { scope: root },
  )

  useEffect(() => {
    const cv = canvas.current
    if (!cv || prefersReducedMotion()) return
    const ctx = cv.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    let w = 0
    let h = 0
    let raf = 0
    let particles = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      cv.width = w * dpr
      cv.height = h * dpr
      cv.style.width = `${w}px`
      cv.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.floor((w * h) / 20000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.5,
      }))
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
    }

    const LINK = 120
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        // gentle repulsion from the pointer
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 160 * 160) {
          const d = Math.sqrt(d2) || 1
          const f = (160 - d) / 160
          p.vx += (dx / d) * f * 0.06
          p.vy += (dy / d) * f * 0.06
        }
        p.vx *= 0.985
        p.vy *= 0.985
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(216, 236, 247, 0.45)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const ax = p.x - q.x
          const ay = p.y - q.y
          const dist = Math.sqrt(ax * ax + ay * ay)
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(77, 208, 255, ${(1 - dist / LINK) * 0.2})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="bg" ref={root} aria-hidden="true">
      <div className="hud-grid" />
      <div className="spotlight" />
      <canvas ref={canvas} className="bg-canvas" />
      <div className="grain" />
    </div>
  )
}
