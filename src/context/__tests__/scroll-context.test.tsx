import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ScrollProvider, useScroll } from '../scroll-context'

function ScrollConsumer() {
  const { refs, scrollToSection } = useScroll()
  return (
    <div>
      <div ref={refs.hero} data-testid="hero-section">Hero</div>
      <div ref={refs.projects} data-testid="projects-section">Projects</div>
      <div ref={refs.skills} data-testid="skills-section">Skills</div>
      <div ref={refs.experience} data-testid="experience-section">Experience</div>
      <div ref={refs.contact} data-testid="contact-section">Contact</div>
      <button onClick={() => scrollToSection('projects')}>Scroll to Projects</button>
      <button onClick={() => scrollToSection('contact')}>Scroll to Contact</button>
    </div>
  )
}

describe('ScrollProvider', () => {
  it('provides section refs to children', () => {
    render(
      <ScrollProvider>
        <ScrollConsumer />
      </ScrollProvider>
    )
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('projects-section')).toBeInTheDocument()
    expect(screen.getByTestId('skills-section')).toBeInTheDocument()
    expect(screen.getByTestId('experience-section')).toBeInTheDocument()
    expect(screen.getByTestId('contact-section')).toBeInTheDocument()
  })

  it('scrollToSection calls scrollIntoView on the target ref', async () => {
    const user = userEvent.setup()
    render(
      <ScrollProvider>
        <ScrollConsumer />
      </ScrollProvider>
    )

    await user.click(screen.getByText('Scroll to Projects'))

    const projectsEl = screen.getByTestId('projects-section')
    expect(projectsEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('scrollToSection works for different sections', async () => {
    const user = userEvent.setup()
    render(
      <ScrollProvider>
        <ScrollConsumer />
      </ScrollProvider>
    )

    await user.click(screen.getByText('Scroll to Contact'))

    const contactEl = screen.getByTestId('contact-section')
    expect(contactEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })
})

describe('useScroll', () => {
  it('throws when used outside ScrollProvider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<ScrollConsumer />)).toThrow(
      'useScroll must be used within a ScrollProvider'
    )

    consoleSpy.mockRestore()
  })
})
