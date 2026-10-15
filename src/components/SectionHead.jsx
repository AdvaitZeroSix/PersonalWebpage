import { useRef } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'

// Section eyebrow + title. Title words rise in when scrolled into view.
export default function SectionHead({ index, label, children, sub, align = 'left' }) {
  const title = useRef(null)
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      SplitText.create(title.current, {
        type: 'words',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 90,
            opacity: 0,
            rotate: 5,
            stagger: 0.07,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: title.current, start: 'top 88%', once: true },
          }),
      })
      gsap.from('.sh-eyebrow, .sh-sub', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 88%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <header className={`section-head align-${align}`} ref={root}>
      <p className="sh-eyebrow">
        <span className="sh-index">{index}</span>
        <span className="sh-rule" />
        {label}
      </p>
      <h2 className="sh-title" ref={title}>
        {children}
      </h2>
      {sub && <p className="sh-sub">{sub}</p>}
    </header>
  )
}
