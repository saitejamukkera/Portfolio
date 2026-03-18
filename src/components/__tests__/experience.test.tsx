import { render, screen } from '../../__tests__/test-utils'
import { Experience } from '../experience'

describe('Experience', () => {
  it('renders section heading', () => {
    render(<Experience />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders education heading', () => {
    render(<Experience />)
    expect(screen.getByText('Education')).toBeInTheDocument()
  })

  it('renders all experience entries', () => {
    render(<Experience />)
    expect(screen.getByText('Software Engineer (Contract)')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Associate Software Engineer')).toBeInTheDocument()
  })

  it('renders company names', () => {
    render(<Experience />)
    expect(screen.getByText('Saayam For All Org')).toBeInTheDocument()
    expect(screen.getByText('Cognizant (Truist Financial)')).toBeInTheDocument()
    expect(screen.getByText('Cognizant (UnitedHealth Group / Optum)')).toBeInTheDocument()
  })

  it('renders experience periods', () => {
    render(<Experience />)
    expect(screen.getByText('Jan 2026 – Present')).toBeInTheDocument()
    expect(screen.getByText('Apr 2021 – Dec 2023')).toBeInTheDocument()
  })

  it('renders experience highlights', () => {
    render(<Experience />)
    expect(
      screen.getByText(/Implemented Redis caching for volunteer discovery/)
    ).toBeInTheDocument()
  })

  it('renders education entries', () => {
    render(<Experience />)
    expect(screen.getByText('University of Central Missouri')).toBeInTheDocument()
    expect(screen.getByText('Guru Nanak Institute of Technology')).toBeInTheDocument()
  })

  it('renders education degrees', () => {
    render(<Experience />)
    expect(
      screen.getByText(/Master of Science in Computer Science/)
    ).toBeInTheDocument()
  })

  it('renders education locations', () => {
    render(<Experience />)
    expect(screen.getByText('Warrensburg, MO')).toBeInTheDocument()
    expect(screen.getByText('Hyderabad, India')).toBeInTheDocument()
  })
})
