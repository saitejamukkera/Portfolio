import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

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

vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}))

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Sai Teja Mukkera')).toBeInTheDocument()
  })

  it('renders the navbar', () => {
    render(<App />)
    expect(screen.getByLabelText('Home')).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<App />)
    const matches = screen.getAllByText(/Sai Teja Mukkera/)
    expect(matches.length).toBeGreaterThanOrEqual(2)
  })

  it('renders the home page by default', () => {
    render(<App />)
    expect(screen.getByText('Specializations')).toBeInTheDocument()
    const expMatches = screen.getAllByText('Experience')
    expect(expMatches.length).toBeGreaterThanOrEqual(1)
  })
})
