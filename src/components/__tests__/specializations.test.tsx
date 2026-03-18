import { render, screen } from '../../__tests__/test-utils'
import { Specializations } from '../specializations'

describe('Specializations', () => {
  it('renders section heading', () => {
    render(<Specializations />)
    expect(screen.getByText('Specializations')).toBeInTheDocument()
  })

  it('renders what I do label', () => {
    render(<Specializations />)
    expect(screen.getByText('What I Do')).toBeInTheDocument()
  })

  it('renders all specialization cards', () => {
    render(<Specializations />)
    expect(screen.getByText('API Design & Microservices')).toBeInTheDocument()
    expect(screen.getByText('Event-Driven Architecture')).toBeInTheDocument()
    expect(screen.getByText('Cloud & Infrastructure')).toBeInTheDocument()
    expect(screen.getByText('Performance Engineering')).toBeInTheDocument()
    expect(screen.getByText('CI/CD & Quality')).toBeInTheDocument()
  })

  it('renders specialization descriptions', () => {
    render(<Specializations />)
    expect(
      screen.getByText(/Scalable RESTful APIs and Spring Boot microservice/)
    ).toBeInTheDocument()
    expect(screen.getByText(/Apache Kafka and Amazon SQS/)).toBeInTheDocument()
  })

  it('renders the subtitle paragraph', () => {
    render(<Specializations />)
    expect(
      screen.getByText(/Backend-focused engineering/)
    ).toBeInTheDocument()
  })
})
