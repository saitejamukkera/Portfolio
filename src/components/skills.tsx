import { useState } from 'react'
import {
  SiAmazonwebservices,
  SiApachekafka,
  SiCss3,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSonarqube,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'
import {
  LuCode,
  LuServer,
  LuDatabase,
  LuCloud,
  LuTestTube,
  LuLayers,
  LuLayoutGrid,
  LuShieldCheck,
  LuMessageSquare,
  LuFlaskConical,
  LuActivity,
  LuArrowDownUp,
} from 'react-icons/lu'
import { RESUME } from '@/data/resume'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const skillsData: Record<string, { icon: React.ElementType; color: string }> = {
  // Languages
  Java: { icon: FaJava, color: '#ED8B00' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  SQL: { icon: LuDatabase, color: '#4169E1' },
  Python: { icon: SiPython, color: '#4B8BBE' },
  // Backend
  'Spring Boot': { icon: SiSpringboot, color: '#6DB33F' },
  'Spring Security': { icon: SiSpringsecurity, color: '#6DB33F' },
  'Spring Data JPA': { icon: LuShieldCheck, color: '#6DB33F' },
  'Node.js': { icon: SiNodedotjs, color: '#68A063' },
  Express: { icon: SiExpress, color: '#FFFFFF' },
  Redis: { icon: SiRedis, color: '#DC382D' },
  // Data & Messaging
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  MongoDB: { icon: SiMongodb, color: '#4DB33D' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  Flyway: { icon: LuArrowDownUp, color: '#CC0200' },
  'Apache Kafka': { icon: SiApachekafka, color: '#231F20' },
  'Amazon SQS': { icon: LuMessageSquare, color: '#FF9900' },
  // Cloud & DevOps
  AWS: { icon: SiAmazonwebservices, color: '#FF9900' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Kubernetes: { icon: SiKubernetes, color: '#326CE5' },
  Git: { icon: SiGit, color: '#F05032' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF' },
  Jenkins: { icon: SiJenkins, color: '#D24939' },
  SonarQube: { icon: SiSonarqube, color: '#4E9BCD' },
  // Testing & Observability
  'JUnit 5': { icon: LuTestTube, color: '#25A162' },
  Mockito: { icon: LuFlaskConical, color: '#78A641' },
  Splunk: { icon: LuActivity, color: '#000000' },
  OpenTelemetry: { icon: LuActivity, color: '#F5A800' },
  // Frontend
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss3, color: '#1572B6' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38BDF8' },
}

type Category = 'all' | 'languages' | 'backend' | 'data' | 'devops' | 'testing' | 'frontend'

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All Skills', icon: LuLayoutGrid },
  { id: 'languages', label: 'Languages', icon: LuCode },
  { id: 'backend', label: 'Backend', icon: LuServer },
  { id: 'data', label: 'Data & Messaging', icon: LuDatabase },
  { id: 'devops', label: 'Cloud & DevOps', icon: LuCloud },
  { id: 'testing', label: 'Testing & Observability', icon: LuTestTube },
  { id: 'frontend', label: 'Frontend', icon: LuLayers },
]

const prioritySkills = new Set(['Java', 'Spring Boot'])

const allSkillsOrdered = (() => {
  const skills = [
    ...RESUME.skills.languages,
    ...RESUME.skills.backend,
    ...RESUME.skills.data,
    ...RESUME.skills.devops,
    ...RESUME.skills.testing,
    ...RESUME.skills.frontend,
  ]

  const others = skills.filter((skill) => !prioritySkills.has(skill))
  return ['Java', 'Spring Boot', ...others]
})()

const categoryCounts: Record<Category, number> = {
  all: allSkillsOrdered.length,
  languages: RESUME.skills.languages.length,
  backend: RESUME.skills.backend.length,
  data: RESUME.skills.data.length,
  devops: RESUME.skills.devops.length,
  testing: RESUME.skills.testing.length,
  frontend: RESUME.skills.frontend.length,
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const getSkillsByCategory = (category: Category): string[] => {
    if (category === 'all') {
      return allSkillsOrdered
    }
    return RESUME.skills[category] || []
  }

  const getCountByCategory = (category: Category): number => {
    return categoryCounts[category]
  }

  const currentSkills = getSkillsByCategory(activeCategory)

  return (
    <section
      id="skills"
      className="container mx-auto px-4 py-16 sm:px-8 md:px-24 md:py-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
      >
        Skills
      </motion.h2>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-8 flex flex-wrap gap-2"
      >
        {categories.map((category) => {
          const Icon = category.icon
          const count = getCountByCategory(category.id)
          const isActive = activeCategory === category.id

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-primary/10'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-xs',
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </motion.div>

      {/* Skills Grid */}
      <motion.div layout className="flex flex-wrap gap-3">
        <AnimatePresence mode="popLayout">
          {currentSkills.map((skill) => {
            const data = skillsData[skill]
            if (!data) return null
            const Icon = data.icon

            return (
              <motion.div
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="border-border bg-card hover:border-primary/50 hover:bg-primary/5 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300"
              >
                <div className="bg-background/50 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <Icon className="h-4 w-4" style={{ color: data.color }} />
                </div>
                <span className="cursor-default pr-1">{skill}</span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
