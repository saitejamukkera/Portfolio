import { render, screen } from '../../__tests__/test-utils'
import { HomePage } from '../home-page'

describe('HomePage', () => {
  it('renders the hero section', () => {
    render(<HomePage />)
    expect(screen.getByText('Sai Teja Mukkera')).toBeInTheDocument()
  })

  it('renders the specializations section', () => {
    render(<HomePage />)
    expect(screen.getByText('Specializations')).toBeInTheDocument()
  })

  it('renders the projects section', () => {
    render(<HomePage />)
    expect(screen.getByText('Featured Work')).toBeInTheDocument()
  })

  it('renders the skills section', () => {
    render(<HomePage />)
    expect(screen.getByText('All Skills')).toBeInTheDocument()
  })

  it('renders the experience section', () => {
    render(<HomePage />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders the contact section', () => {
    render(<HomePage />)
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })
})
