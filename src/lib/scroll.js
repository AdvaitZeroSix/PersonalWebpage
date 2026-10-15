// Shared handle to the Lenis instance so any component can scroll to an anchor.
let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export const scrollToTarget = (target, offset = 0) => {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 })
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()
