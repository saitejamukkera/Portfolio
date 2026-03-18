import { createClient } from '@supabase/supabase-js'
import type { Provider, Session, User } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabasePublishableKey = import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_KEY as string

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

export type GuestbookEntry = {
  id: string
  user_id: string
  user_name: string
  avatar_url: string | null
  message: string
  created_at: string
}

export const ADMIN_USER_ID = import.meta.env.VITE_ADMIN_USER_ID as string | undefined

export async function signInWithProvider(provider: Provider) {
  return supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${window.location.origin}/guestbook` },
  })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export function getUserMeta(user: User) {
  const meta = user.user_metadata
  return {
    name: (meta?.full_name || meta?.name || meta?.user_name || 'Anonymous') as string,
    avatarUrl: (meta?.avatar_url || meta?.picture || null) as string | null,
  }
}

export type { Session, User }
