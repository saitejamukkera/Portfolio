import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from '../theme-provider'

function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('light', 'dark')
  })

  it('provides default theme', () => {
    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })

  it('exposes resolvedTheme matching theme when not system', () => {
    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
  })

  it('resolves system theme based on matchMedia', () => {
    render(
      <ThemeProvider defaultTheme="system" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('system')
    expect(screen.getByTestId('resolved')).toHaveTextContent('light')
  })

  it('allows changing theme', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByText('Set Light'))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(screen.getByTestId('resolved')).toHaveTextContent('light')
  })

  it('persists theme to localStorage', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByText('Set Light'))
    expect(localStorage.getItem('test-theme')).toBe('light')
  })

  it('reads theme from localStorage on mount', () => {
    localStorage.setItem('test-theme', 'light')
    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('adds dark class to document root when dark theme', () => {
    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('switches class on document root when theme changes', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="dark" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains('dark')).toBe(true)

    await user.click(screen.getByText('Set Light'))
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('returns default initialState when used outside provider', () => {
    render(<ThemeConsumer />)
    expect(screen.getByTestId('theme')).toHaveTextContent('system')
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark')
  })
})
