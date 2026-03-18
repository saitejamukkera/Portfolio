import { render, screen, waitFor } from '../../__tests__/test-utils'
import userEvent from '@testing-library/user-event'
import { Guestbook } from '../guestbook'

const { mockGetSession, mockInsert } = vi.hoisted(() => ({
  mockGetSession: vi.fn().mockResolvedValue({ data: { session: null } }),
  mockInsert: vi.fn().mockResolvedValue({ error: null }),
}))

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: [
            {
              id: '1',
              user_id: 'user-1',
              user_name: 'Alice Johnson',
              avatar_url: 'https://example.com/alice.jpg',
              message: 'Great portfolio!',
              created_at: new Date().toISOString(),
            },
            {
              id: '2',
              user_id: 'user-2',
              user_name: 'Bob Smith',
              avatar_url: null,
              message: 'Awesome work!',
              created_at: new Date(Date.now() - 86400000).toISOString(),
            },
          ],
          error: null,
        }),
      }),
      insert: mockInsert,
    }),
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
    }),
    removeChannel: vi.fn(),
  },
  signInWithProvider: vi.fn(),
  signOut: vi.fn(),
  getUserMeta: vi.fn().mockReturnValue({
    name: 'Test User',
    avatarUrl: 'https://example.com/test.jpg',
  }),
  ADMIN_USER_ID: undefined,
}))

beforeEach(() => {
  mockGetSession.mockResolvedValue({ data: { session: null } })
  mockInsert.mockResolvedValue({ error: null })
})

describe('Guestbook - unauthenticated', () => {
  it('renders guestbook heading', () => {
    render(<Guestbook />)
    expect(screen.getByText('Guestbook')).toBeInTheDocument()
  })

  it('renders sign in prompt when not authenticated', () => {
    render(<Guestbook />)
    expect(screen.getByText('Sign the Guestbook')).toBeInTheDocument()
  })

  it('renders sign in buttons', () => {
    render(<Guestbook />)
    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<Guestbook />)
    expect(screen.getByText(/Leave your mark/)).toBeInTheDocument()
  })

  it('loads and displays guestbook entries', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('Great portfolio!')).toBeInTheDocument()
      expect(screen.getByText('Awesome work!')).toBeInTheDocument()
    })
  })

  it('displays entry author names', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
      expect(screen.getByText('Bob Smith')).toBeInTheDocument()
    })
  })

  it('shows message count after loading', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('2 messages')).toBeInTheDocument()
    })
  })

  it('renders avatar fallback initials', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('AJ')).toBeInTheDocument()
      expect(screen.getByText('BS')).toBeInTheDocument()
    })
  })

  it('displays loading state initially', () => {
    render(<Guestbook />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows sign in description text', () => {
    render(<Guestbook />)
    expect(screen.getByText(/Sign in to leave a message/)).toBeInTheDocument()
  })
})

describe('Guestbook - authenticated', () => {
  beforeEach(() => {
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: {
            id: 'session-user-1',
            user_metadata: {
              full_name: 'Test User',
              avatar_url: 'https://example.com/test.jpg',
            },
          },
        },
      },
    })
  })

  it('shows the message form when signed in', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Leave a message...')).toBeInTheDocument()
    })
  })

  it('shows user name when signed in', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument()
    })
  })

  it('shows signing as yourself text', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('Signing as yourself')).toBeInTheDocument()
    })
  })

  it('shows sign out button', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('Sign out')).toBeInTheDocument()
    })
  })

  it('shows sign guestbook submit button', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('Sign Guestbook')).toBeInTheDocument()
    })
  })

  it('shows character counter', async () => {
    render(<Guestbook />)
    await waitFor(() => {
      expect(screen.getByText('0/500')).toBeInTheDocument()
    })
  })

  it('updates character counter when typing', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Guestbook />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Leave a message...')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText('Leave a message...'), 'Hello!')
    expect(screen.getByText('6/500')).toBeInTheDocument()
  })

  it('submits a message successfully', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Guestbook />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Leave a message...')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText('Leave a message...'), 'Test message here')
    await user.click(screen.getByText('Sign Guestbook'))

    await waitFor(() => {
      expect(screen.getByText('Signed!')).toBeInTheDocument()
    })
  })

  it('shows error on submit failure', async () => {
    mockInsert.mockResolvedValue({
      error: { message: 'Server error', code: '500' },
    })

    const user = userEvent.setup({ delay: null })
    render(<Guestbook />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Leave a message...')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText('Leave a message...'), 'Test message here')
    await user.click(screen.getByText('Sign Guestbook'))

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Try again.')).toBeInTheDocument()
    })
  })

  it('shows rate limit error on policy violation', async () => {
    mockInsert.mockResolvedValue({
      error: { message: 'policy violation', code: '42501' },
    })

    const user = userEvent.setup({ delay: null })
    render(<Guestbook />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Leave a message...')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText('Leave a message...'), 'Test message here')
    await user.click(screen.getByText('Sign Guestbook'))

    await waitFor(() => {
      expect(
        screen.getByText('Please wait a couple minutes before posting again.')
      ).toBeInTheDocument()
    })
  })

  it('calls signOut when sign out button is clicked', async () => {
    const user = userEvent.setup({ delay: null })
    const { signOut } = await import('@/lib/supabase')

    render(<Guestbook />)

    await waitFor(() => {
      expect(screen.getByText('Sign out')).toBeInTheDocument()
    })

    await user.click(screen.getByText('Sign out'))
    expect(signOut).toHaveBeenCalled()
  })
})
