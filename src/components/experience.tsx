import { RESUME } from '@/data/resume'
import { LocationIcon } from '@/Icons/LocationIcon'
import { motion } from 'framer-motion'

export function Experience() {
  return (
    <section id="experience" className="space-y-16 py-16 md:py-24">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
          Experience
        </h2>
        <div className="space-y-8">
          {RESUME.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-muted relative border-l-2 pl-6"
            >
              <div className="bg-background border-primary absolute top-0 -left-[9px] h-4 w-4 rounded-full border-2" />

              <div className="space-y-3">
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-muted-foreground font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-sm tabular-nums">
                    {exp.period}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-1">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground/90 flex items-start gap-2 text-sm leading-relaxed"
                      >
                        <span className="bg-primary/60 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
          Education
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {RESUME.education.map((edu, index) => (
            <div
              key={index}
              className="group border-border bg-card hover:border-primary/50 dark:border-border/50 dark:bg-card/50 relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-6"
            >
              <div className="from-primary/5 absolute inset-0 bg-linear-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {edu.school}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {edu.degree}
                  </p>
                </div>

                <div className="bg-border/50 h-px w-full" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground tabular-nums">
                    {edu.period}
                  </span>
                  <div className="text-muted-foreground flex items-center gap-1.5">
                    <LocationIcon className="h-4 w-4" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
