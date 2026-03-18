import { render, screen } from '../../__tests__/test-utils'
import userEvent from '@testing-library/user-event'
import { Skills } from '../skills'

describe('Skills', () => {
  it('renders section heading', () => {
    render(<Skills />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('renders category filter buttons', () => {
    render(<Skills />)
    expect(screen.getByText('All Skills')).toBeInTheDocument()
    expect(screen.getByText('Languages')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Data & Messaging')).toBeInTheDocument()
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument()
    expect(screen.getByText('Testing & Observability')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
  })

  it('shows all skills by default', () => {
    render(<Skills />)
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('Spring Boot')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('filters skills when a category is clicked', async () => {
    const user = userEvent.setup()
    render(<Skills />)

    await user.click(screen.getByText('Languages'))

    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
  })

  it('displays skill count badges', () => {
    render(<Skills />)
    const allSkillsBtn = screen.getByText('All Skills').closest('button')
    expect(allSkillsBtn?.textContent).toContain('All Skills')
  })

  it('reduces visible skills when filtering to a category', async () => {
    const user = userEvent.setup()
    render(<Skills />)

    const allSkillsBefore = screen.getAllByText(
      /^(Java|JavaScript|TypeScript|SQL|Python|Spring Boot|Docker|React|AWS|PostgreSQL|MongoDB|MySQL|Kubernetes|Git|Redis|Mockito|Splunk)$/
    )

    await user.click(screen.getByText('Languages'))

    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('SQL')).toBeInTheDocument()
  })

  it('clicking all skills shows everything again', async () => {
    const user = userEvent.setup()
    render(<Skills />)

    await user.click(screen.getByText('Languages'))
    await user.click(screen.getByText('All Skills'))

    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('shows frontend skills when Frontend filter is clicked', async () => {
    const user = userEvent.setup()
    render(<Skills />)

    await user.click(screen.getByText('Frontend'))

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('HTML5')).toBeInTheDocument()
    expect(screen.getByText('CSS3')).toBeInTheDocument()
  })

  it('shows Java and Spring Boot first in all skills', () => {
    render(<Skills />)
    const skillElements = screen.getAllByText(
      /^(Java|Spring Boot|JavaScript|TypeScript|SQL|Python)$/
    )
    expect(skillElements[0]).toHaveTextContent('Java')
    expect(skillElements[1]).toHaveTextContent('Spring Boot')
  })
})
