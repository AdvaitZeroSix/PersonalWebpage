// Background music via Spotify's embed player API.
//
// Browsers block audio until the visitor interacts with the page, so playback
// is started from a click (the "Enter" button in the welcome, or the music
// dock). The embed lives in an off-screen host so a custom UI can drive it.
// Visitors who are not logged in to Spotify get a 30-second preview, which is
// restarted automatically so it keeps playing.
let controller = null
let wantPlay = false
let started = false
let restarting = false
const subs = new Set()
let snapshot = { ready: false, playing: false, enabled: false }

const emit = (patch) => {
  snapshot = { ...snapshot, ...patch }
  subs.forEach((fn) => fn())
}

export const subscribe = (fn) => {
  subs.add(fn)
  return () => subs.delete(fn)
}
export const getSnapshot = () => snapshot

export function initMusic(trackId) {
  if (started || typeof document === 'undefined') return
  started = true

  const host = document.createElement('div')
  host.setAttribute('aria-hidden', 'true')
  host.style.cssText = 'position:fixed;left:-320px;bottom:0;width:300px;height:80px;opacity:0;pointer-events:none'
  const mount = document.createElement('div')
  host.appendChild(mount)
  document.body.appendChild(host)

  window.onSpotifyIframeApiReady = (api) => {
    api.createController(mount, { uri: `spotify:track:${trackId}`, width: 300, height: 80 }, (c) => {
      controller = c
      // the embed is created with loading="lazy"; make sure it loads even though it is off-screen
      host.querySelector('iframe')?.setAttribute('loading', 'eager')
      c.addListener('ready', () => {
        emit({ ready: true })
        if (wantPlay) c.play()
      })
      c.addListener('playback_update', (e) => {
        const d = e.data
        emit({ playing: !d.isPaused })
        // loop: when the track (or the 30s preview) ends, start it again
        if (wantPlay && !restarting && d.duration > 0 && d.position >= d.duration - 400) {
          restarting = true
          c.restart()
          setTimeout(() => (restarting = false), 2000)
        }
      })
    })
  }

  const script = document.createElement('script')
  script.src = 'https://open.spotify.com/embed/iframe-api/v1'
  script.async = true
  document.body.appendChild(script)
}

// call from a click handler
export function startMusic() {
  wantPlay = true
  emit({ enabled: true })
  controller?.play()
}

export function toggleMusic() {
  if (snapshot.playing) {
    wantPlay = false
    controller?.pause()
    emit({ playing: false })
  } else {
    startMusic()
  }
}
