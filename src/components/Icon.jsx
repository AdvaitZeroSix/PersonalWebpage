import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaCircleDot,
  FaCloud,
  FaCode,
  FaDiagramProject,
  FaEnvelope,
  FaFlag,
  FaFutbol,
  FaGithub,
  FaLock,
  FaMusic,
  FaCircleCheck,
  FaGraduationCap,
  FaLayerGroup,
  FaLinkedinIn,
  FaLocationDot,
  FaRobot,
  FaShieldHalved,
  FaTrophy,
  FaVideo,
} from 'react-icons/fa6'

const icons = {
  arrow: FaArrowRight,
  external: FaArrowUpRightFromSquare,
  dot: FaCircleDot,
  cloud: FaCloud,
  code: FaCode,
  diagram: FaDiagramProject,
  mail: FaEnvelope,
  futbol: FaFutbol,
  flag: FaFlag,
  lock: FaLock,
  music: FaMusic,
  check: FaCircleCheck,
  github: FaGithub,
  grad: FaGraduationCap,
  layers: FaLayerGroup,
  linkedin: FaLinkedinIn,
  pin: FaLocationDot,
  robot: FaRobot,
  shield: FaShieldHalved,
  trophy: FaTrophy,
  video: FaVideo,
}

export default function Icon({ name, ...props }) {
  const Cmp = icons[name]
  return Cmp ? <Cmp aria-hidden="true" {...props} /> : null
}
