import { aboutFacts } from '../data'
import useMusic from '../hooks/useMusic'
import { toggleMusic } from '../lib/music'
import Equalizer from './Equalizer'
import Icon from './Icon'

// Small now-playing control that stays in the corner while you browse.
export default function MusicDock({ show }) {
  const { playing, enabled } = useMusic()
  const { title, artist } = aboutFacts.music

  return (
    <button
      className={`dock ${show ? 'is-visible' : ''} ${playing ? 'is-playing' : ''}`}
      onClick={toggleMusic}
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
      tabIndex={show ? 0 : -1}
    >
      <Equalizer playing={playing} />
      <span className="dock-text">
        <b>{playing || enabled ? title : 'Music off'}</b>
        <span>{playing || enabled ? artist : 'Click to play'}</span>
      </span>
      <span className="dock-btn">
        <Icon name={playing ? 'pause' : 'play'} />
      </span>
    </button>
  )
}
