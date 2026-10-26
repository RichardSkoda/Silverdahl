export interface NavItem {
  label: string
  to: string
}

export const mainNavigation: NavItem[] = [
  { label: 'Domů', to: '/' },
  { label: 'Služby', to: '/sluzby' },
  { label: 'Case study', to: '/case-study' },
  { label: 'O nás', to: '/o-nas' },
  { label: 'Kontakt', to: '/kontakt' },
]
