// The rotating HUD rings, shared by the welcome sequence and the hero backdrop.
// Callers animate .ring-a .. .ring-d (see Welcome.jsx / Hero.jsx).
const polar = (r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180
  return [Math.cos(a) * r, Math.sin(a) * r]
}
const arc = (r, from, to) => {
  const [x1, y1] = polar(r, from)
  const [x2, y2] = polar(r, to)
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

const ticks = Array.from({ length: 120 }, (_, i) => {
  const long = i % 10 === 0
  const [x1, y1] = polar(long ? 262 : 270, i * 3)
  const [x2, y2] = polar(282, i * 3)
  return { x1, y1, x2, y2, long }
})

export default function Hud() {
  return (
    <svg viewBox="-300 -300 600 600" aria-hidden="true">
      <g className="ring-a">
        <circle r="290" className="hud-line" />
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={t.long ? 'hud-tick long' : 'hud-tick'} />
        ))}
      </g>
      <g className="ring-b">
        <circle r="244" className="hud-dash" />
      </g>
      <g className="ring-c">
        <path d={arc(206, 10, 100)} className="hud-arc" />
        <path d={arc(206, 130, 190)} className="hud-arc" />
        <path d={arc(206, 215, 300)} className="hud-arc" />
        <path d={arc(206, 320, 350)} className="hud-arc" />
      </g>
      <g className="ring-d">
        <circle r="166" className="hud-dash fine" />
        <path d={arc(150, 40, 140)} className="hud-arc thin" />
        <path d={arc(150, 220, 320)} className="hud-arc thin" />
      </g>
      <circle r="118" className="hud-line faint" />
    </svg>
  )
}

export const spinRings = (gsap) => {
  gsap.to('.ring-a', { rotation: 360, svgOrigin: '0 0', duration: 140, repeat: -1, ease: 'none' })
  gsap.to('.ring-b', { rotation: -360, svgOrigin: '0 0', duration: 90, repeat: -1, ease: 'none' })
  gsap.to('.ring-c', { rotation: 360, svgOrigin: '0 0', duration: 50, repeat: -1, ease: 'none' })
  gsap.to('.ring-d', { rotation: -360, svgOrigin: '0 0', duration: 30, repeat: -1, ease: 'none' })
}
