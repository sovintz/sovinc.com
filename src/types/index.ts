export interface Project {
  title: string
  description: string
  image: string
  altText: string
  link?: string
}

export interface SocialIcon {
  icon: string
  href: string
  label: string
}

export interface Competence {
  title: string
  description: string
  icon: string
}

export interface NavItem {
  title: string
  to: string
}
