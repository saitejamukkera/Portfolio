import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollProvider } from '@/context/scroll-context'
import { Navbar } from '@/components/navbar'
import { HomePage } from '@/pages/home-page'
import { Footer } from './components/Footer'

const GuestbookPage = lazy(() => import('@/pages/guestbook-page'))
const ProjectsPage = lazy(() => import('@/pages/projects-page'))
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ScrollProvider>
          <div className="text-foreground selection:bg-foreground selection:text-background relative min-h-screen font-sans antialiased">
            <div className="fixed inset-0 -z-10 transition-colors duration-300 ease-in-out bg-white dark:bg-black">
              {/* Light grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-size-[40px_40px] transition-opacity duration-300 ease-in-out dark:opacity-0" />
              {/* Dark grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-size-[40px_40px] opacity-0 transition-opacity duration-300 ease-in-out dark:opacity-100" />
              <div className="absolute inset-0 transition-colors duration-300 ease-in-out bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
            </div>
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            <ScrollToTop />
            <Navbar />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/guestbook" element={<GuestbookPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </ScrollProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
