import { render, screen } from '../../__tests__/test-utils'
import { Hero } from '../hero'
import profilePhoto from '@/assets/profile_photo.webp'

describe('Hero', () => {
  it('renders the name from resume data', () => {
    render(<Hero />)
    expect(screen.getByText('Sai Teja Mukkera')).toBeInTheDocument()
  })

  it('renders the greeting text', () => {
    render(<Hero />)
    expect(screen.getByText(/Hey there, I'm/)).toBeInTheDocument()
  })

  it('renders the summary', () => {
    render(<Hero />)
    expect(screen.getByText(/Backend Software Engineer/)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('View Projects')).toBeInTheDocument()
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  it('renders the profile photo', () => {
    render(<Hero />)
    const img = screen.getByAltText("Sai Teja Mukkera's profile photo")
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', profilePhoto)
  })

  it('renders current tech stack', () => {
    render(<Hero />)
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('Spring Boot')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('has a resume download link', () => {
    render(<Hero />)
    const link = screen.getByText('Resume').closest('a')
    expect(link).toHaveAttribute('href', '/resume.pdf')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('has a view projects link pointing to #projects', () => {
    render(<Hero />)
    const link = screen.getByText('View Projects').closest('a')
    expect(link).toHaveAttribute('href', '#projects')
  })

  it('shows open to work status', () => {
    render(<Hero />)
    expect(screen.getByText('Open to work')).toBeInTheDocument()
  })
})
