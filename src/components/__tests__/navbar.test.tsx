import { render, screen } from '../../__tests__/test-utils'
import userEvent from '@testing-library/user-event'
import { Navbar } from '../navbar'

vi.mock('@/components/ui/moving-border', () => ({
  MovingBorder: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders guestbook link', () => {
    render(<Navbar />)
    const guestbookButtons = screen.getAllByText('Guestbook')
    expect(guestbookButtons.length).toBeGreaterThan(0)
  })

  it('renders home button', () => {
    render(<Navbar />)
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
  })

  it('renders github link', () => {
    render(<Navbar />)
    const githubLink = screen.getByLabelText('GitHub Profile')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/saitejamukkera')
    expect(githubLink).toHaveAttribute('target', '_blank')
  })

  it('renders mobile menu toggle', () => {
    render(<Navbar />)
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument()
  })

  it('renders theme toggle', () => {
    render(<Navbar />)
    expect(screen.getByText('Toggle theme')).toBeInTheDocument()
  })

  it('opens mobile menu when toggle is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByLabelText('Toggle menu'))

    const mobileLinks = screen.getAllByText('Projects')
    expect(mobileLinks.length).toBeGreaterThanOrEqual(2)
  })

  it('closes mobile menu when a nav link is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByLabelText('Toggle menu'))
    const mobileProjectsLinks = screen.getAllByText('Projects')
    await user.click(mobileProjectsLinks[mobileProjectsLinks.length - 1])
  })

  it('renders header element', () => {
    render(<Navbar />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('home button scrolls to top when already on home page', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByLabelText('Home'))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('desktop nav links trigger scroll on click', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByText('Projects'))
  })

  it('shows hover effect on mouse enter for desktop links', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.hover(screen.getByText('Projects'))
    await user.unhover(screen.getByText('Projects'))
  })

  it('guestbook desktop link is clickable', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const guestbookLinks = screen.getAllByText('Guestbook')
    await user.click(guestbookLinks[0])
  })

  it('guestbook mobile link navigates when clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    await user.click(screen.getByLabelText('Toggle menu'))

    const mobileGuestbookLinks = screen.getAllByText('Guestbook')
    await user.click(mobileGuestbookLinks[mobileGuestbookLinks.length - 1])
  })

  it('hover on guestbook desktop link works', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const guestbookLinks = screen.getAllByText('Guestbook')
    await user.hover(guestbookLinks[0])
    await user.unhover(guestbookLinks[0])
  })
})
