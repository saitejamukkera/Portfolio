import { Suspense, lazy } from 'react'
import { Hero } from '@/components/hero'
import { useScroll } from '@/context/scroll-context'

const Specializations = lazy(() =>
  import('@/components/specializations').then((m) => ({
    default: m.Specializations,
  }))
)
const Projects = lazy(() =>
  import('@/components/projects').then((m) => ({ default: m.Projects }))
)
const Skills = lazy(() =>
  import('@/components/skills').then((m) => ({ default: m.Skills }))
)
const Experience = lazy(() =>
  import('@/components/experience').then((m) => ({ default: m.Experience }))
)
const Contact = lazy(() =>
  import('@/components/contact').then((m) => ({ default: m.Contact }))
)

export function HomePage() {
  const { refs } = useScroll()

  return (
    <main className="mx-auto max-w-5xl space-y-20 px-4 pt-24 pb-16 md:px-8">
      <div ref={refs.hero}>
        <Hero />
      </div>
      <Suspense fallback={null}>
        <Specializations />
      </Suspense>
      <Suspense fallback={null}>
        <div ref={refs.projects}>
          <Projects />
        </div>
      </Suspense>
      <Suspense fallback={null}>
        <div ref={refs.skills}>
          <Skills />
        </div>
      </Suspense>
      <Suspense fallback={null}>
        <div ref={refs.experience}>
          <Experience />
        </div>
      </Suspense>
      <Suspense fallback={null}>
        <div ref={refs.contact}>
          <Contact />
        </div>
      </Suspense>
    </main>
  )
}
