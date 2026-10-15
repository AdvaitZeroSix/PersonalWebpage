// Small illustrated header for each project card. Anything with a live
// screenshot uses it; the rest get a hand-drawn, lightly animated SVG/HTML
// motif that hints at what the project does.

function Neural() {
  const sizes = [3, 5, 4, 1]
  const xs = [70, 150, 250, 330]
  const pos = sizes.map((n, li) =>
    Array.from({ length: n }, (_, i) => [xs[li], n === 1 ? 75 : 25 + (i * 100) / (n - 1)]),
  )
  return (
    <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" className="cv cv-neural">
      {pos.slice(0, -1).flatMap((layer, li) =>
        layer.flatMap(([x1, y1], i) =>
          pos[li + 1].map(([x2, y2], j) => (
            <line key={`${li}-${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} className="cv-edge" style={{ '--d': `${(i + j) * 0.18}s` }} />
          )),
        ),
      )}
      {pos.flatMap((layer, li) =>
        layer.map(([x, y], i) => <circle key={`n${li}-${i}`} cx={x} cy={y} r="6" className="cv-node" style={{ '--d': `${(li * 3 + i) * 0.2}s` }} />),
      )}
    </svg>
  )
}

function Equalizer() {
  const bars = Array.from({ length: 28 }, (_, i) => i)
  return (
    <div className="cv cv-eq">
      {bars.map((i) => (
        <i key={i} style={{ '--h': `${30 + ((i * 37) % 60)}%`, '--d': `${(i % 7) * 0.13}s` }} />
      ))}
    </div>
  )
}

function Finance() {
  return (
    <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" className="cv cv-fin">
      <defs>
        <linearGradient id="finArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[30, 60, 90, 120].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} className="cv-grid" />
      ))}
      <path d="M0 110 C40 100 60 70 100 80 S160 120 200 85 S270 30 320 50 S380 25 400 20 L400 150 L0 150Z" fill="url(#finArea)" />
      <path className="cv-line" d="M0 110 C40 100 60 70 100 80 S160 120 200 85 S270 30 320 50 S380 25 400 20" />
      <g className="cv-score">
        <circle cx="318" cy="50" r="22" />
        <text x="318" y="55" textAnchor="middle">
          82
        </text>
      </g>
    </svg>
  )
}

function Router() {
  const leaves = [
    { y: 30, t: 'PokeAPI' },
    { y: 75, t: 'Weather' },
    { y: 120, t: 'Gemini' },
  ]
  return (
    <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" className="cv cv-router">
      {leaves.map((l, i) => (
        <path key={l.t} d={`M120 75 C190 75 190 ${l.y} 260 ${l.y}`} className="cv-flow" style={{ '--d': `${i * 0.5}s` }} />
      ))}
      <rect x="40" y="58" width="82" height="34" rx="17" className="cv-pill" />
      <text x="81" y="79" textAnchor="middle">
        ask…
      </text>
      {leaves.map((l) => (
        <g key={l.t}>
          <rect x="260" y={l.y - 15} width="92" height="30" rx="15" className="cv-pill" />
          <text x="306" y={l.y + 4} textAnchor="middle">
            {l.t}
          </text>
        </g>
      ))}
    </svg>
  )
}

function Pitch() {
  const dots = [
    [70, 75],
    [130, 35],
    [130, 115],
    [215, 55],
    [215, 100],
    [300, 75],
    [335, 40],
    [335, 110],
  ]
  return (
    <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" className="cv cv-pitch">
      <rect x="14" y="10" width="372" height="130" rx="4" className="cv-field" />
      <line x1="200" y1="10" x2="200" y2="140" className="cv-field" />
      <circle cx="200" cy="75" r="26" className="cv-field" />
      <rect x="14" y="40" width="48" height="70" className="cv-field" />
      <rect x="338" y="40" width="48" height="70" className="cv-field" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" className="cv-player" style={{ '--d': `${i * 0.25}s` }} />
      ))}
    </svg>
  )
}

function Chroma() {
  return (
    <div className="cv cv-chroma">
      <div className="cv-chroma-green" />
      <div className="cv-chroma-bg" />
      <span className="cv-chroma-person" />
      <span className="cv-chroma-line" />
    </div>
  )
}

function Trail() {
  const pts = [
    [40, 120],
    [90, 80],
    [140, 52],
    [190, 42],
    [240, 55],
    [290, 85],
    [340, 125],
  ]
  return (
    <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" className="cv cv-trail">
      <path d="M40 120 C100 20 240 10 340 125" className="cv-arc" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3 + i * 1.2} className="cv-dot" style={{ '--d': `${i * 0.15}s` }} />
      ))}
      <rect x="318" y="92" width="52" height="52" rx="4" className="cv-box" />
    </svg>
  )
}

function Terminal({ lines }) {
  return (
    <div className="cv cv-term">
      <div className="cv-term-bar">
        <i />
        <i />
        <i />
      </div>
      {lines.map((l, i) => (
        <p key={i} style={{ '--d': `${i * 0.35}s` }}>
          {l}
        </p>
      ))}
    </div>
  )
}

export default function ProjectCover({ project }) {
  const { cover } = project
  let art = null
  if (cover === 'image') art = <img src={project.image} alt="" className="cv cv-img" />
  else if (cover === 'neural') art = <Neural />
  else if (cover === 'spotify') art = <Equalizer />
  else if (cover === 'finance') art = <Finance />
  else if (cover === 'router') art = <Router />
  else if (cover === 'pitch') art = <Pitch />
  else if (cover === 'chroma') art = <Chroma />
  else if (cover === 'trail') art = <Trail />
  else if (cover === 'ctf')
    art = <Terminal lines={['$ exiftool evidence.jpg', '> who is Sigma?', '> trail goes cold…', 'addyCTF{▒▒▒▒▒▒▒▒}']} />
  else if (cover === 'terminal')
    art = <Terminal lines={['$ binwalk -e file.png', '$ strings dump | grep pico', 'picoCTF{▒▒▒▒▒▒▒▒}', '✔ 10 solved']} />

  return <div className={`pcover pcover-${cover}`}>{art}</div>
}

