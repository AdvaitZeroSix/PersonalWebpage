import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { profile } from '../data'
import SectionHead from './SectionHead'
import Icon from './Icon'

const USER = 'AdvaitZeroSix'
const API = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`

const fmtDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

// Group the flat day list into week columns (Sunday first), like GitHub does.
function toWeeks(days) {
  const weeks = []
  let week = []
  days.forEach((d, i) => {
    const dow = new Date(d.date + 'T00:00:00').getDay()
    if (i === 0) week = Array(dow).fill(null)
    week.push(d)
    if (dow === 6) {
      weeks.push(week)
      week = []
    }
  })
  if (week.length) weeks.push(week)
  return weeks
}

export default function Activity() {
  const root = useRef(null)
  const [state, setState] = useState({ status: 'loading', days: [], total: 0 })
  const [tip, setTip] = useState(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(API, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then((data) =>
        setState({ status: 'ok', days: data.contributions, total: data.total?.lastYear ?? 0 }),
      )
      .catch((e) => e.name !== 'AbortError' && setState({ status: 'error', days: [], total: 0 }))
    return () => ctrl.abort()
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion() || state.status !== 'ok') return
      gsap.from('.heat-cell', {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'back.out(2)',
        stagger: { amount: 1.4 },
        scrollTrigger: { trigger: '.heat', start: 'top 85%', once: true },
      })
      gsap.from('.heat-total strong', {
        textContent: 0,
        snap: { textContent: 1 },
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.heat', start: 'top 85%', once: true },
      })
    },
    { scope: root, dependencies: [state.status] },
  )

  const weeks = state.status === 'ok' ? toWeeks(state.days) : []

  return (
    <section className="section" id="activity" ref={root}>
      <div className="container">
        <SectionHead index="08" label="Activity" sub="How much I've been coding over the past year.">
          GitHub contributions
        </SectionHead>

        <div className="heat-card">
          {state.status === 'loading' && <div className="heat-skeleton" aria-busy="true" />}

          {state.status === 'ok' && (
            <>
              <div className="heat-top">
                <p className="heat-total">
                  <strong>{state.total}</strong> contributions in the last year
                </p>
                <div className="heat-legend" aria-hidden="true">
                  Less
                  {[0, 1, 2, 3, 4].map((l) => (
                    <i key={l} className={`lv lv-${l}`} />
                  ))}
                  More
                </div>
              </div>
              <div className="heat-scroll">
                <div className="heat" onMouseLeave={() => setTip(null)}>
                  {weeks.map((w, wi) => (
                    <div className="heat-col" key={wi}>
                      {w.map((d, di) =>
                        d ? (
                          <i
                            key={d.date}
                            className={`heat-cell lv-${d.level}`}
                            onMouseEnter={(e) => {
                              const r = e.currentTarget.getBoundingClientRect()
                              setTip({ x: r.left + r.width / 2, y: r.top, d })
                            }}
                          />
                        ) : (
                          <i key={`e${di}`} className="heat-cell is-empty" />
                        ),
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {state.status === 'error' && (
            <img
              className="heat-fallback"
              src={`https://ghchart.rshah.org/4dd0ff/${USER}`}
              alt="GitHub contribution graph"
             
            />
          )}

          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="heat-link">
            <Icon name="github" /> View full profile <Icon name="external" />
          </a>
        </div>
      </div>

      {tip && (
        <div className="heat-tip" style={{ left: tip.x, top: tip.y }}>
          <strong>
            {tip.d.count} contribution{tip.d.count === 1 ? '' : 's'}
          </strong>
          <span>{fmtDate(tip.d.date)}</span>
        </div>
      )}
    </section>
  )
}
