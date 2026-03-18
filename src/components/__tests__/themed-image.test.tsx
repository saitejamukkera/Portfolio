import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../theme-provider'
import { ThemedImage } from '../themed-image'

function renderWithTheme(defaultTheme: 'light' | 'dark') {
  return render(
    <ThemeProvider defaultTheme={defaultTheme} storageKey="test-themed-img">
      <ThemedImage
        lightSrc="/light.jpg"
        darkSrc="/dark.jpg"
        alt="test image"
      />
    </ThemeProvider>
  )
}

describe('ThemedImage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders an img element', () => {
    renderWithTheme('light')
    expect(screen.getByAltText('test image')).toBeInTheDocument()
  })

  it('uses lightSrc when theme is light', () => {
    renderWithTheme('light')
    expect(screen.getByAltText('test image')).toHaveAttribute('src', '/light.jpg')
  })

  it('uses darkSrc when theme is dark', () => {
    renderWithTheme('dark')
    expect(screen.getByAltText('test image')).toHaveAttribute('src', '/dark.jpg')
  })

  it('passes additional img props through', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-themed-img">
        <ThemedImage
          lightSrc="/light.jpg"
          darkSrc="/dark.jpg"
          alt="test"
          className="custom-class"
          width={200}
        />
      </ThemeProvider>
    )
    const img = screen.getByAltText('test')
    expect(img).toHaveClass('custom-class')
    expect(img).toHaveAttribute('width', '200')
  })
})
