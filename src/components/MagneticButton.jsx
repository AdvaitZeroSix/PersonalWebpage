import useMagnetic from '../hooks/useMagnetic'

// Wrapper that makes any link/button magnetic and gives it a fill-sweep hover.
export default function MagneticButton({ as: Tag = 'a', variant = 'primary', strength = 0.3, className = '', children, ...rest }) {
  const ref = useMagnetic(strength)
  return (
    <Tag ref={ref} className={`btn btn-${variant} ${className}`} {...rest}>
      <span className="btn-fill" />
      <span className="btn-label">{children}</span>
    </Tag>
  )
}
