import { render, screen } from '../../__tests__/test-utils'
import { Projects } from '../projects'

describe('Projects', () => {
  it('renders section heading', () => {
    render(<Projects />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders featured work label', () => {
    render(<Projects />)
    expect(screen.getByText('Featured Work')).toBeInTheDocument()
  })

  it('renders only featured projects', () => {
    render(<Projects />)
    expect(screen.getByText('TrackHire AI')).toBeInTheDocument()
    expect(screen.getByText('Job Radar')).toBeInTheDocument()
    expect(screen.queryByText('Portfolio Website')).not.toBeInTheDocument()
  })

  it('renders project descriptions', () => {
    render(<Projects />)
    expect(screen.getByText(/AI-powered job application platform/)).toBeInTheDocument()
  })

  it('renders tech badges for projects', () => {
    render(<Projects />)
    expect(screen.getByText('Spring Boot')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
  })

  it('renders source and live demo links', () => {
    render(<Projects />)
    const sourceLinks = screen.getAllByText('Source')
    expect(sourceLinks.length).toBeGreaterThan(0)

    const liveLinks = screen.getAllByText('Live Demo')
    expect(liveLinks.length).toBeGreaterThan(0)
  })

  it('renders view more CTA', () => {
    render(<Projects />)
    expect(screen.getByText('Want to see more projects?')).toBeInTheDocument()
  })

  it('view more links to /projects', () => {
    render(<Projects />)
    const link = screen.getByText('Want to see more projects?').closest('a')
    expect(link).toHaveAttribute('href', '/projects')
  })
})
