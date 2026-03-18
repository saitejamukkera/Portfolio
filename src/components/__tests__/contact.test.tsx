import { render, screen, waitFor } from '../../__tests__/test-utils'
import userEvent from '@testing-library/user-event'
import { Contact } from '../contact'

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn().mockResolvedValue({ status: 200, text: 'OK' }),
  },
}))

describe('Contact', () => {
  it('renders section heading', () => {
    render(<Contact />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders the get in touch label', () => {
    render(<Contact />)
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('renders connect description', () => {
    render(<Contact />)
    expect(screen.getByText("Let's Connect")).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<Contact />)
    expect(screen.getByText('Send a Message')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText("What's on your mind?")).toBeInTheDocument()
  })

  it('renders form labels', () => {
    render(<Contact />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Message')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Contact />)
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Contact />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('X (Twitter)')).toBeInTheDocument()
  })

  it('social links have correct hrefs', () => {
    render(<Contact />)
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/saitejamukkera'
    )
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/saitejamukkera/'
    )
  })

  it('shows validation error for short name', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your name'), 'A')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com')
    await user.type(screen.getByPlaceholderText("What's on your mind?"), 'Hello this is a test!')
    await user.click(screen.getByText('Send Message'))

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters.')).toBeInTheDocument()
    })
  })

  it('shows validation error for short message', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your name'), 'John')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'test@example.com')
    await user.type(screen.getByPlaceholderText("What's on your mind?"), 'Hi')
    await user.click(screen.getByText('Send Message'))

    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters.')).toBeInTheDocument()
    })
  })

  it('submit button is disabled while loading', async () => {
    const emailjs = await import('@emailjs/browser')
    vi.mocked(emailjs.default.send).mockImplementation(
      () => new Promise(() => {})
    )

    const user = userEvent.setup({ delay: null })
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText("What's on your mind?"), 'Hello this is a test message for you!')
    await user.click(screen.getByText('Send Message'))

    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled()
    })
  })

  it('shows success message after successful submit', async () => {
    const emailjs = await import('@emailjs/browser')
    vi.mocked(emailjs.default.send).mockResolvedValue({ status: 200, text: 'OK' })

    const user = userEvent.setup({ delay: null })
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText("What's on your mind?"), 'Hello this is a test message for you!')
    await user.click(screen.getByText('Send Message'))

    await waitFor(() => {
      expect(screen.getByText('Message Sent!')).toBeInTheDocument()
      expect(screen.getByText(/Thanks for reaching out/)).toBeInTheDocument()
    })
  })

  it('shows error message when emailjs fails', async () => {
    const emailjs = await import('@emailjs/browser')
    vi.mocked(emailjs.default.send).mockRejectedValue(new Error('Network error'))

    const user = userEvent.setup({ delay: null })
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText("What's on your mind?"), 'Hello this is a test message for you!')
    await user.click(screen.getByText('Send Message'))

    await waitFor(() => {
      expect(screen.getByText('Failed to Send')).toBeInTheDocument()
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument()
    })
  })
})
