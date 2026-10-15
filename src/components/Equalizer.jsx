// Four little bars that dance while music is playing.
export default function Equalizer({ playing }) {
  return (
    <span className={`eq ${playing ? 'is-playing' : ''}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}
