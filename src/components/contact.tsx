import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Mail from 'lucide-react/dist/esm/icons/mail'
import Send from 'lucide-react/dist/esm/icons/send'
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle'
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FaXTwitter } from 'react-icons/fa6'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import {
  emailLink,
  gitHubLink,
  linkedInLink,
  twitterLink,
} from '@/lib/static-links'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
})

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitStatus('loading')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
          to_name: 'Sai Teja',
        },
        EMAILJS_PUBLIC_KEY
      )

      setSubmitStatus('success')
      form.reset()

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      if (import.meta.env.DEV) console.error('EmailJS Error:', error)
      setSubmitStatus('error')

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const socialLinks = [
    {
      href: emailLink,
      icon: Mail,
      label: 'Email',
      external: false,
      color: 'group-hover:text-red-500',
    },
    {
      href: linkedInLink,
      icon: FaLinkedin,
      label: 'LinkedIn',
      external: true,
      color: 'group-hover:text-blue-500',
    },
    {
      href: gitHubLink,
      icon: FaGithub,
      label: 'GitHub',
      external: true,
      color: 'group-hover:text-foreground',
    },
    {
      href: twitterLink,
      icon: FaXTwitter,
      label: 'X (Twitter)',
      external: true,
      color: 'group-hover:text-black dark:group-hover:text-white',
    },
  ]

  return (
    <section id="contact" className="py-16 md:py-32">
      <div className="space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="via-foreground/20 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
            <span className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
              Get In Touch
            </span>
            <div className="via-foreground/20 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Contact
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
            Have a project in mind or just want to chat? I'd love to hear from
            you.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a question, want to collaborate on a project,
                or just want to say hi — my inbox is always open. I'll try my
                best to get back to you as soon as possible!
              </p>
            </div>

            {/* Social Links */}
            <TooltipProvider delayDuration={100}>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                        className="group border-border bg-card hover:border-primary/50 hover:bg-card/80 dark:bg-card/50 flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        aria-label={link.label}
                      >
                        <link.icon
                          className={`text-muted-foreground h-5 w-5 transition-colors ${link.color}`}
                        />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
              <div className="border-border bg-card dark:border-border/50 dark:bg-card/50 relative overflow-hidden rounded-2xl border p-4 shadow-lg md:p-8">
              {/* Gradient accent */}
              <div className="from-primary/10 via-primary/5 absolute inset-0 bg-linear-to-br to-transparent" />

              <div className="relative">
                <h3 className="mb-6 text-xl font-semibold">Send a Message</h3>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            Name
                            <sup className="ml-1 text-xl text-red-500">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="border-border/50 bg-background/50 focus:border-primary mt-2.5 h-11 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            Email
                            <sup className="ml-1 text-xl text-red-500">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your@email.com"
                              className="border-border/50 bg-background/50 focus:border-primary mt-2 h-11 transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">
                            Message
                            <sup className="ml-1 text-xl text-red-500">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What's on your mind?"
                              className="border-border/50 bg-background/50 focus:border-primary mt-2 min-h-[140px] resize-none transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button with States */}
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 h-12 w-full cursor-pointer text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                      disabled={submitStatus === 'loading'}
                    >
                      {submitStatus === 'loading' && (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      )}
                      {submitStatus === 'idle' && (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                      {submitStatus === 'success' && (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Message Sent!
                        </>
                      )}
                      {submitStatus === 'error' && (
                        <>
                          <AlertCircle className="mr-2 h-5 w-5" />
                          Failed to Send
                        </>
                      )}
                    </Button>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-sm text-green-600 dark:text-green-400"
                      >
                        Thanks for reaching out! I'll get back to you soon.
                      </motion.p>
                    )}
                    {submitStatus === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-sm text-red-600 dark:text-red-400"
                      >
                        Something went wrong. Please try again or email me
                        directly.
                      </motion.p>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
