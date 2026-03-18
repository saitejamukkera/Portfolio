import { motion } from 'framer-motion'
import { LuServer, LuZap, LuCloud, LuGauge, LuGitBranch } from 'react-icons/lu'

const specializations = [
  {
    icon: LuServer,
    title: 'API Design & Microservices',
    description:
      'Scalable RESTful APIs and Spring Boot microservice architectures handling 10K+ daily requests with idempotency and validation.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: LuZap,
    title: 'Event-Driven Architecture',
    description:
      'Apache Kafka and Amazon SQS pipelines for asynchronous payment processing, notifications, and settlement workflows.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: LuCloud,
    title: 'Cloud & Infrastructure',
    description:
      'AWS cloud services (EC2, S3, RDS, API Gateway) with Docker containerization and Kubernetes orchestration.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: LuGauge,
    title: 'Performance Engineering',
    description:
      'Redis caching reducing DB load by 55%, PostgreSQL query optimization, and P95 latency improvements from 850ms to 500ms.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: LuGitBranch,
    title: 'CI/CD & Quality',
    description:
      'Automated pipelines with GitHub Actions and Docker, 90%+ test coverage, SonarQube analysis, and OpenTelemetry observability.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Specializations() {
  return (
    <section className="py-16 md:py-24">
      <div className="space-y-10">
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
              What I Do
            </span>
            <div className="via-foreground/20 h-px flex-1 bg-linear-to-r from-transparent to-transparent" />
          </div>
          <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Specializations
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
            Backend-focused engineering with hands-on experience across the full
            software delivery lifecycle.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {specializations.map((spec) => {
            const Icon = spec.icon
            return (
              <motion.div
                key={spec.title}
                variants={cardVariants}
                className="border-border bg-card hover:border-primary/30 dark:border-border/50 dark:bg-card/30 dark:hover:bg-card/50 group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative space-y-3">
                  <div
                    className={`${spec.bg} inline-flex rounded-xl p-2.5`}
                  >
                    <Icon className={`h-5 w-5 ${spec.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {spec.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {spec.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
