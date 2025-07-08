import {
  Code,
  Cookie,
  Github,
  Linkedin,
  Mail,
  MonitorSmartphone,
  PencilRuler,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

type IconMap = {
  [key: string]: React.FC<LucideProps>
}

// Define the mapping between strings and icons
const iconMap: IconMap = {
  code: Code,
  monitorSmartphone: MonitorSmartphone,
  pencilRuler: PencilRuler,
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  cookie: Cookie,
}

type IconProps = {
  iconName: string
  color?: string
  size?: number
  className?: string
}

const MapIcon = ({
  iconName,
  color = '#000',
  size = 24,
  className,
}: IconProps) => {
  const Icon = iconMap[iconName]

  if (!Icon) return null

  return (
    <Icon
      color={color}
      style={{ width: size, height: size }}
      className={className}
    />
  )
}

export default MapIcon
