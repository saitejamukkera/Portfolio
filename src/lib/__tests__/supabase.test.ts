import { getUserMeta, signInWithProvider, signOut, supabase } from '../supabase'
import type { User } from '../supabase'

describe('supabase client', () => {
  it('exports a supabase client object', () => {
    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
  })
})

describe('signInWithProvider', () => {
  it('calls supabase.auth.signInWithOAuth with github', async () => {
    const spy = vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValue({
      data: { provider: 'github', url: 'https://github.com/login' },
      error: null,
    })

    await signInWithProvider('github')

    expect(spy).toHaveBeenCalledWith({
      provider: 'github',
      options: { redirectTo: expect.stringContaining('/guestbook') },
    })

    spy.mockRestore()
  })

  it('calls supabase.auth.signInWithOAuth with google', async () => {
    const spy = vi.spyOn(supabase.auth, 'signInWithOAuth').mockResolvedValue({
      data: { provider: 'google', url: 'https://accounts.google.com' },
      error: null,
    })

    await signInWithProvider('google')

    expect(spy).toHaveBeenCalledWith({
      provider: 'google',
      options: { redirectTo: expect.stringContaining('/guestbook') },
    })

    spy.mockRestore()
  })
})

describe('signOut', () => {
  it('calls supabase.auth.signOut', async () => {
    const spy = vi.spyOn(supabase.auth, 'signOut').mockResolvedValue({ error: null })

    await signOut()

    expect(spy).toHaveBeenCalled()

    spy.mockRestore()
  })
})

describe('getUserMeta', () => {
  it('extracts name from full_name metadata', () => {
    const user = {
      user_metadata: { full_name: 'John Doe', avatar_url: 'https://example.com/avatar.jpg' },
    } as unknown as User

    const meta = getUserMeta(user)
    expect(meta.name).toBe('John Doe')
    expect(meta.avatarUrl).toBe('https://example.com/avatar.jpg')
  })

  it('falls back to name when full_name is missing', () => {
    const user = {
      user_metadata: { name: 'Jane', picture: 'https://example.com/pic.jpg' },
    } as unknown as User

    const meta = getUserMeta(user)
    expect(meta.name).toBe('Jane')
    expect(meta.avatarUrl).toBe('https://example.com/pic.jpg')
  })

  it('falls back to user_name', () => {
    const user = {
      user_metadata: { user_name: 'jdoe' },
    } as unknown as User

    const meta = getUserMeta(user)
    expect(meta.name).toBe('jdoe')
  })

  it('returns Anonymous when no name metadata exists', () => {
    const user = {
      user_metadata: {},
    } as unknown as User

    const meta = getUserMeta(user)
    expect(meta.name).toBe('Anonymous')
  })

  it('returns null avatarUrl when no avatar metadata exists', () => {
    const user = {
      user_metadata: { full_name: 'Test' },
    } as unknown as User

    const meta = getUserMeta(user)
    expect(meta.avatarUrl).toBeNull()
  })
})
