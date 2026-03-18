import { render, screen } from '../../__tests__/test-utils'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('renders copyright text with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('renders copyright with name', () => {
    render(<Footer />)
    expect(screen.getByText(/Sai Teja Mukkera/)).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Footer />)
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('X(Twitter)')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('github link opens in new tab', () => {
    render(<Footer />)
    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/saitejamukkera')
  })

  it('linkedin link opens in new tab', () => {
    render(<Footer />)
    const link = screen.getByLabelText('LinkedIn')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('email link uses mailto', () => {
    render(<Footer />)
    const link = screen.getByLabelText('Email')
    expect(link).toHaveAttribute('href', 'mailto:saitejamukkera@gmail.com')
  })
})
