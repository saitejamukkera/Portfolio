import { render, screen } from '../../__tests__/test-utils'
import GuestbookPage from '../guestbook-page'

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
    }),
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
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
  getUserMeta: vi.fn(),
  ADMIN_USER_ID: undefined,
}))

describe('GuestbookPage', () => {
  it('renders the guestbook component', () => {
    render(<GuestbookPage />)
    expect(screen.getByText('Guestbook')).toBeInTheDocument()
  })

  it('renders sign in options', () => {
    render(<GuestbookPage />)
    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
  })

  it('renders within a main element', () => {
    render(<GuestbookPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
