import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '../theme-provider'
import { ModeToggle } from '../mode-toggle'

function ThemeDisplay() {
  const { theme } = useTheme()
  return <span data-testid="current-theme">{theme}</span>
}

function renderWithProvider() {
  return render(
    <ThemeProvider defaultTheme="dark" storageKey="test-toggle">
      <ModeToggle />
      <ThemeDisplay />
    </ThemeProvider>
  )
}

describe('ModeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the toggle button', () => {
    renderWithProvider()
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('has sr-only label text', () => {
    renderWithProvider()
    expect(screen.getByText('Toggle theme')).toBeInTheDocument()
  })

  it('switches from dark to light on click', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')

    await user.click(screen.getByRole('button', { name: /toggle theme/i }))

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
  })

  it('toggles back from light to dark', async () => {
    const user = userEvent.setup()
    renderWithProvider()
    const btn = screen.getByRole('button', { name: /toggle theme/i })

    await user.click(btn)
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')

    await user.click(btn)
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
  })
})
