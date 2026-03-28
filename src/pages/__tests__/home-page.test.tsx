import { render, screen, waitFor } from '../../__tests__/test-utils'
import { HomePage } from '../home-page'

vi.mock('@/components/ui/moving-border', () => ({
  MovingBorder: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}))

describe('HomePage', () => {
  it('renders the hero section', () => {
    render(<HomePage />)
    expect(screen.getByText('Sai Teja Mukkera')).toBeInTheDocument()
  })

  it('renders the specializations section', async () => {
    render(<HomePage />)
    await waitFor(
      () => {
        expect(screen.getByText('Specializations')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })

  it('renders the projects section', async () => {
    render(<HomePage />)
    await waitFor(
      () => {
        expect(screen.getByText('Featured Work')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })

  it('renders the skills section', async () => {
    render(<HomePage />)
    await waitFor(
      () => {
        expect(screen.getByText('All Skills')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })

  it('renders the experience section', async () => {
    render(<HomePage />)
    await waitFor(
      () => {
        expect(screen.getByText('Experience')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })

  it('renders the contact section', async () => {
    render(<HomePage />)
    await waitFor(
      () => {
        expect(screen.getByText('Get In Touch')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })
})
