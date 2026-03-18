import { render } from '@testing-library/react'
import { LocationIcon } from '../LocationIcon'

describe('LocationIcon', () => {
  it('renders an svg element', () => {
    const { container } = render(<LocationIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('uses default size-6 className', () => {
    const { container } = render(<LocationIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('size-6')
  })

  it('accepts a custom className', () => {
    const { container } = render(<LocationIcon className="h-4 w-4" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('h-4 w-4')
    expect(svg).not.toHaveClass('size-6')
  })

  it('contains path elements', () => {
    const { container } = render(<LocationIcon />)
    const paths = container.querySelectorAll('path')
    expect(paths.length).toBe(2)
  })
})
