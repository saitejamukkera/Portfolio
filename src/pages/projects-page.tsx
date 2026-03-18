import Github from 'lucide-react/dist/esm/icons/github'
import Globe from 'lucide-react/dist/esm/icons/globe'
import ExternalLink from 'lucide-react/dist/esm/icons/external-link'
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RESUME } from '@/data/resume'
import { ThemedImage } from '@/components/themed-image'

const gradientSchemes = [
  'from-violet-600 via-purple-500 to-fuchsia-500',
  'from-cyan-500 via-blue-500 to-indigo-600',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-orange-500 via-red-500 to-pink-500',
  'from-indigo-500 via-purple-500 to-pink-500',
  'from-yellow-400 via-orange-500 to-red-500',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pt-28 pb-16 md:px-8">
      <div className="space-y-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="via-foreground/20 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
            <span className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
              All Work
            </span>
            <div className="via-foreground/20 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Projects
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
            Everything I've built — from production apps to side projects and
            experiments.
          </p>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-6"
        >
          {RESUME.projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`group relative w-full max-w-sm sm:w-[calc(50%-12px)] ${
                RESUME.projects.length % 3 === 0
                  ? 'lg:w-[calc(33.333%-16px)]'
                  : 'lg:w-[calc(50%-12px)]'
              }`}
            >
              <div className="border-border bg-card dark:border-border/50 dark:bg-card/30 hover:shadow-primary/5 dark:hover:bg-card/50 relative h-full overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-500 hover:shadow-2xl">
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden">
                  {project.image !== null ? (
                    <>
                      <ThemedImage
                        lightSrc={project.image.light}
                        darkSrc={project.image.dark}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/5" />
                    </>
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${gradientSchemes[index % gradientSchemes.length]} opacity-80`}
                      />
                      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-white/10 blur-xl transition-transform duration-700 group-hover:scale-150" />
                        <div className="absolute bottom-4 left-4 h-32 w-32 rounded-full bg-white/5 blur-2xl transition-transform delay-100 duration-500 group-hover:scale-125" />
                        <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-xl transition-transform duration-600 group-hover:scale-110" />
                      </div>
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                          backgroundSize: '20px 20px',
                        }}
                      />
                    </>
                  )}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary/90 text-primary-foreground border-0 text-xs backdrop-blur-sm">
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 translate-y-2 transform rounded-full bg-white/10 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-secondary/80 px-2.5 py-0.5 text-xs font-normal transition-colors"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="group/btn border-border/50 hover:border-border hover:bg-muted/50 flex-1"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Github className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                          <span>Source</span>
                        </a>
                      </Button>
                    )}
                    {project.link && (
                      <Button
                        size="sm"
                        asChild
                        className="bg-foreground text-background hover:bg-foreground/90 flex-1"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          <span>Live Demo</span>
                          <ExternalLink className="h-3 w-3 opacity-70" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="from-primary/20 absolute -inset-px -z-10 rounded-2xl bg-linear-to-r via-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
