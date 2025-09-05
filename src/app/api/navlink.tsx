import { NavLinks } from '@/types/navlink'

export const navLinks: NavLinks[] = [
  { label: 'Inicio', href: '/', role: 'todos' },
  { label: 'Propiedades', href: '/properties', role: 'todos' },
  { label: 'Gestión Contactos', href: '/propiedades', role: 'admin' },
  { label: 'Blog', href: '/blogs', role: 'todos' },
  { label: 'Contacto', href: '/contactus', role: 'todos' },
  { label: 'Gestión Contactos', href: '/contactos', role: 'admin' },
  //{ label: 'Cerrar Sesión', href: '/signin', role: 'todos' },
]
