import { Hero } from '@/components/hero'
import { Specializations } from '@/components/specializations'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Experience } from '@/components/experience'
import { Contact } from '@/components/contact'
import { useScroll } from '@/context/scroll-context'

export function HomePage() {
  const { refs } = useScroll()

  return (
    <main className="mx-auto max-w-5xl space-y-20 px-4 pt-24 pb-16 md:px-8">
      <div ref={refs.hero}>
        <Hero />
      </div>
      <Specializations />
      <div ref={refs.projects}>
        <Projects />
      </div>
      <div ref={refs.skills}>
        <Skills />
      </div>
      <div ref={refs.experience}>
        <Experience />
      </div>
      <div ref={refs.contact}>
        <Contact />
      </div>
    </main>
  )
}
