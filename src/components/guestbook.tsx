import { useState, useEffect, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  BookOpen,
  LogOut,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaGoogle } from 'react-icons/fa'

import {
  supabase,
  signInWithProvider,
  signOut,
  getUserMeta,
  ADMIN_USER_ID,
  type GuestbookEntry,
  type Session,
} from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const formSchema = z.object({
  message: z
    .string()
    .min(3, { message: 'Message must be at least 3 characters.' })
    .max(500, { message: 'Message must be under 500 characters.' }),
})

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const AVATAR_GRADIENTS = [
  'from-violet-500 to-purple-600',
  'from-cyan-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-orange-400 to-red-500',
  'from-pink-400 to-rose-500',
  'from-amber-400 to-orange-500',
  'from-indigo-400 to-violet-500',
  'from-teal-400 to-cyan-500',
]

function getAvatarGradient(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length]
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [charCount, setCharCount] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
  })

  const fetchEntries = useCallback(async () => {
    const { data, error } = await supabase
      .from('guestbook_entries')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setEntries(data)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })

    fetchEntries()

    const channel = supabase
      .channel('guestbook-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guestbook_entries' },
        (payload) => {
          setEntries((prev) => [payload.new as GuestbookEntry, ...prev])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
      supabase.removeChannel(channel)
    }
  }, [fetchEntries])

  const userMeta = session?.user ? getUserMeta(session.user) : null

  const sortedEntries = useMemo(() => {
    if (!ADMIN_USER_ID) return entries
    const pinned = entries.filter((e) => e.user_id === ADMIN_USER_ID)
    const rest = entries.filter((e) => e.user_id !== ADMIN_USER_ID)
    return [...pinned, ...rest]
  }, [entries])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session?.user) return

    setSubmitStatus('loading')
    setErrorMessage('')

    const { name, avatarUrl } = getUserMeta(session.user)

    const { error } = await supabase.from('guestbook_entries').insert([
      {
        user_name: name,
        avatar_url: avatarUrl,
        message: values.message.trim(),
      },
    ])

    if (error) {
      if (import.meta.env.DEV) console.error('Supabase Error:', error)
      setSubmitStatus('error')
      if (error.code === '42501' || error.message?.includes('policy')) {
        setErrorMessage('Please wait a couple minutes before posting again.')
      } else {
        setErrorMessage('Something went wrong. Try again.')
      }
      setTimeout(() => setSubmitStatus('idle'), 4000)
      return
    }

    setSubmitStatus('success')
    form.reset()
    setCharCount(0)
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  return (
    <section id="guestbook" className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Guestbook
        </h1>
        <p className="text-muted-foreground text-md max-w-[700px] md:text-base">
          Leave your mark. Sign in with GitHub or Google and share a message.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="group/card relative"
      >
        <div className="from-primary/20 absolute -inset-px -z-10 rounded-2xl bg-linear-to-r via-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover/card:opacity-100" />

        <div className="border-border dark:border-border/50 dark:bg-card/30 relative overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-xl">
          <div className="from-primary via-primary/80 h-px w-full bg-linear-to-r to-purple-500" />

          <div className="p-10 sm:p-6">
            {!session ? (
              /* Sign-in state */
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Sign the Guestbook</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Sign in to leave a message. Your name and avatar come from
                    your account.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => signInWithProvider('github')}
                    className="h-11 cursor-pointer gap-2.5 rounded-xl bg-[#24292e] px-5 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#24292e]/90 hover:shadow-xl"
                  >
                    <FaGithub className="h-5 w-5" />
                    Sign in with GitHub
                  </Button>
                  <Button
                    onClick={() => signInWithProvider('google')}
                    variant="outline"
                    className="h-11 cursor-pointer gap-2.5 rounded-xl border-2 px-5 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <FaGoogle className="h-4 w-4" />
                    Sign in with Google
                  </Button>
                </div>
              </div>
            ) : (
              /* Signed-in: message form */
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="border-border/50 h-9 w-9 border">
                      {userMeta?.avatarUrl && (
                        <AvatarImage
                          src={userMeta.avatarUrl}
                          alt={userMeta.name}
                        />
                      )}
                      <AvatarFallback
                        className={`bg-linear-to-br ${getAvatarGradient(userMeta?.name || '')} text-xs font-bold text-white`}
                      >
                        {getInitials(userMeta?.name || '?')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{userMeta?.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Signing as yourself
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-muted-foreground hover:text-foreground h-9 cursor-pointer gap-1.5 rounded-lg text-xs"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </Button>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Textarea
                                placeholder="Leave a message..."
                                className="border-border/50 bg-background/50 focus:border-primary/50 dark:bg-background/20 focus:ring-primary/20 min-h-[100px] rounded-xl pr-16 text-base transition-all focus:ring-1"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e)
                                  setCharCount(e.target.value.length)
                                }}
                              />
                              <span
                                className={`absolute right-3 bottom-3 text-xs font-medium transition-colors ${charCount > 450 ? 'text-red-500' : 'text-muted-foreground/50'}`}
                              >
                                {charCount}/500
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between gap-4">
                      <Button
                        type="submit"
                        className="bg-foreground text-background hover:bg-foreground/90 h-11 cursor-pointer rounded-xl px-6 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        disabled={submitStatus === 'loading'}
                      >
                        {submitStatus === 'loading' && (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing...
                          </>
                        )}
                        {submitStatus === 'idle' && (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Sign Guestbook
                          </>
                        )}
                        {submitStatus === 'success' && (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Signed!
                          </>
                        )}
                        {submitStatus === 'error' && (
                          <>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Failed
                          </>
                        )}
                      </Button>

                      <AnimatePresence>
                        {submitStatus === 'success' && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-medium text-green-600 dark:text-green-400"
                          >
                            Thanks for signing!
                          </motion.span>
                        )}
                        {submitStatus === 'error' && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm font-medium text-red-600 dark:text-red-400"
                          >
                            {errorMessage}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <div className="via-foreground/20 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
        <div className="flex items-center gap-2">
          <BookOpen className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            {isLoading
              ? 'Loading...'
              : `${sortedEntries.length} message${sortedEntries.length !== 1 ? 's' : ''}`}
          </span>
        </div>
        <div className="via-foreground/20 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
      </motion.div>

      {/* Messages */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-border/50 dark:bg-card/20 animate-pulse rounded-2xl border bg-white/50 p-5"
            >
              <div className="flex items-start gap-3.5">
                <div className="bg-muted h-10 w-10 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted h-4 w-28 rounded-md" />
                    <div className="bg-muted h-3 w-16 rounded-md" />
                  </div>
                  <div className="bg-muted h-4 w-4/5 rounded-md" />
                  <div className="bg-muted h-4 w-2/5 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && sortedEntries.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border-border/50 flex flex-col items-center rounded-2xl border-2 border-dashed py-20"
        >
          <div className="bg-muted/50 mb-4 rounded-2xl p-4">
            <BookOpen className="text-muted-foreground/60 h-8 w-8" />
          </div>
          <p className="text-muted-foreground text-lg font-semibold">
            No messages yet
          </p>
          <p className="text-muted-foreground/60 mt-1 text-sm">
            Be the first to sign the guestbook!
          </p>
        </motion.div>
      )}

      {!isLoading && sortedEntries.length > 0 && (
        <div className="animate-in fade-in space-y-3 duration-500">
          {sortedEntries.map((entry) => {
            const isAdmin = !!ADMIN_USER_ID && entry.user_id === ADMIN_USER_ID

            return (
              <div
                key={entry.id}
                className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/10 ${
                  isAdmin
                    ? 'border-primary/30 bg-primary/3 hover:border-primary/50 dark:bg-primary/5 dark:hover:bg-primary/8'
                    : 'border-border/50 hover:border-border dark:bg-card/20 dark:hover:bg-card/40 bg-white/50'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    isAdmin ? 'from-primary/10' : 'from-primary/5'
                  }`}
                />

                <div className="relative flex items-start gap-3.5">
                  <Avatar
                    className={`h-10 w-10 shrink-0 border ${isAdmin ? 'border-primary/40 ring-primary/20 ring-2' : 'border-border/30'}`}
                  >
                    {entry.avatar_url && (
                      <AvatarImage
                        src={entry.avatar_url}
                        alt={entry.user_name}
                      />
                    )}
                    <AvatarFallback
                      className={`bg-linear-to-br ${getAvatarGradient(entry.user_name)} text-xs font-bold text-white`}
                    >
                      {getInitials(entry.user_name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold">
                        {entry.user_name}
                      </span>
                      {isAdmin && (
                        <Badge className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/10 px-2 py-0 text-[10px] font-bold tracking-wide uppercase">
                          Admin
                        </Badge>
                      )}
                      <span className="text-muted-foreground/50 shrink-0 text-xs">
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                      {entry.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
