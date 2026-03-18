import { render, screen } from '../../__tests__/test-utils'
import ProjectsPage from '../projects-page'

describe('ProjectsPage', () => {
  it('renders the page heading', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders all work label', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('All Work')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ProjectsPage />)
    expect(
      screen.getByText(/Everything I've built/)
    ).toBeInTheDocument()
  })

  it('renders all projects including non-featured', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('TrackHire AI')).toBeInTheDocument()
    expect(screen.getByText('Job Radar')).toBeInTheDocument()
    expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
  })

  it('shows featured badge on featured projects', () => {
    render(<ProjectsPage />)
    const badges = screen.getAllByText('Featured')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('renders tech badges', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Vite')).toBeInTheDocument()
  })
})
