import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RESUME } from '@/data/resume'
import profilePhoto from '@/assets/profile_photo.webp'

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-auto flex-col justify-center py-8 sm:py-12 md:min-h-[85vh] md:py-24"
    >
      {/* Custom animations */}
      <style>{`
        @keyframes wave-and-shrink {
          0% { transform: rotate(0deg) scale(2); }
          5% { transform: rotate(14deg) scale(2); }
          10% { transform: rotate(-8deg) scale(2); }
          15% { transform: rotate(14deg) scale(2); }
          20% { transform: rotate(-4deg) scale(2); }
          25% { transform: rotate(10deg) scale(2); }
          30% { transform: rotate(0deg) scale(2); }
          35% { transform: rotate(14deg) scale(1.8); }
          40% { transform: rotate(-8deg) scale(1.6); }
          45% { transform: rotate(14deg) scale(1.4); }
          50% { transform: rotate(-4deg) scale(1.2); }
          55% { transform: rotate(10deg) scale(1.1); }
          60% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotate-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .wave-hand {
          animation: wave-and-shrink 2.5s ease-out 0.3s forwards;
          transform-origin: 70% 70%;
          display: inline-block;
          transform: scale(2);
        }
      `}</style>

      <div className="flex flex-col-reverse items-center gap-6 sm:gap-8 md:flex-row md:items-center md:gap-12 lg:gap-14">
        {/* Text Content */}
        <div className="animate-in fade-in slide-in-from-left-8 flex-1 space-y-3 text-center duration-700 sm:space-y-4 md:space-y-6 md:text-left">
          {/* Greeting with animated waving hand that shrinks */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:justify-start">
            <span className="wave-hand text-xl sm:text-2xl md:text-4xl">
              👋
            </span>
            <span className="text-muted-foreground text-base font-medium sm:text-lg md:text-xl">
              Hey there, I'm
            </span>
          </div>

          {/* Name with gradient effect */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-7xl">
            <span className="from-foreground via-foreground/80 to-foreground bg-linear-to-r bg-clip-text">
              {RESUME.name}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-shadow-muted font- mx-auto max-w-[600px] text-lg text-zinc-500 md:mx-0 md:text-xl">
            {RESUME.summary}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground mx-auto max-w-[600px] text-sm font-medium tracking-wider uppercase sm:text-xs md:mx-0">
              Currently shipping with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {RESUME.currentTechStack.map((techStack, index) => (
                <span
                  key={index}
                  className="border-border/60 bg-card/50 dark:bg-card/30 hover:border-primary/40 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[13px] font-medium backdrop-blur-sm transition-colors sm:px-3 sm:py-1.5 sm:text-sm"
                >
                  <span className="flex shrink-0 items-center [&>svg]:h-4 [&>svg]:w-4">
                    {techStack.icon}
                  </span>
                  {techStack.tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2 sm:gap-4 sm:pt-4 md:justify-start">
            <Button
              asChild
              size="default"
              className="group relative h-10 overflow-hidden rounded-full px-6 text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:h-11 sm:px-8 sm:text-base"
            >
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="default"
              className="group h-10 rounded-full border-2 px-6 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:h-11 sm:px-8 sm:text-base"
            >
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Profile Photo with Clean Geometric Design */}
        <div className="animate-in fade-in slide-in-from-right-8 relative shrink-0 duration-700 md:-mt-18 md:-ml-4">
          {/* Outer rotating ring with dots - hidden on small mobile, visible from sm up */}
          <div
            className="border-muted-foreground/20 absolute -inset-3 hidden rounded-full border-2 border-dashed sm:-inset-5 sm:block md:-inset-6"
            style={{ animation: 'rotate-slow 30s linear infinite' }}
          >
            {/* Corner dots */}
            <div className="bg-foreground/60 absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-2 sm:w-2"></div>
            <div className="bg-foreground/60 absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full sm:h-2 sm:w-2"></div>
            <div className="bg-foreground/60 absolute top-1/2 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-2 sm:w-2"></div>
            <div className="bg-foreground/60 absolute top-1/2 right-0 h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 rounded-full sm:h-2 sm:w-2"></div>
          </div>

          {/* Inner counter-rotating dotted ring - hidden on small mobile */}
          <div
            className="border-muted-foreground/30 absolute -inset-2 hidden rounded-full border border-dotted sm:-inset-3 sm:block md:-inset-3"
            style={{ animation: 'rotate-reverse 20s linear infinite' }}
          ></div>

          {/* Accent corner brackets - smaller on mobile */}
          <div className="border-foreground/40 absolute -top-2 -left-2 h-4 w-4 rounded-tl-lg border-t-2 border-l-2 sm:-top-3 sm:-left-3 sm:h-5 sm:w-5 md:-top-5 md:-left-5 md:h-6 md:w-6"></div>
          <div className="border-foreground/40 absolute -top-2 -right-2 h-4 w-4 rounded-tr-lg border-t-2 border-r-2 sm:-top-3 sm:-right-3 sm:h-5 sm:w-5 md:-top-5 md:-right-5 md:h-6 md:w-6"></div>
          <div className="border-foreground/40 absolute -bottom-2 -left-2 h-4 w-4 rounded-bl-lg border-b-2 border-l-2 sm:-bottom-3 sm:-left-3 sm:h-5 sm:w-5 md:-bottom-5 md:-left-5 md:h-6 md:w-6"></div>
          <div className="border-foreground/40 absolute -right-2 -bottom-2 h-4 w-4 rounded-br-lg border-r-2 border-b-2 sm:-right-3 sm:-bottom-3 sm:h-5 sm:w-5 md:-right-5 md:-bottom-5 md:h-6 md:w-6"></div>

          {/* Main photo container */}
          <div className="relative">
            {/* Clean border */}
            <div className="border-foreground/20 absolute -inset-1 rounded-full border-2"></div>

            {/* Photo - smaller on mobile */}
            <div className="border-background relative h-24 w-24 overflow-hidden rounded-full border-4 shadow-xl transition-transform duration-500 hover:scale-105 sm:h-32 sm:w-32 md:h-48 md:w-48 lg:h-56 lg:w-56">
              <img
                src={profilePhoto}
                alt={`${RESUME.name}'s profile photo`}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Status badge - smaller on mobile */}
            <div className="bg-card border-border absolute -right-1 -bottom-1 flex items-center gap-1 rounded-full border px-2 py-0.5 shadow-lg sm:-right-2 sm:-bottom-2 sm:gap-2 sm:px-4 sm:py-2">
              <span className="relative flex h-1.5 w-1.5 sm:h-3 sm:w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500 sm:h-3 sm:w-3"></span>
              </span>
              <span className="text-[10px] font-medium sm:text-sm">
                Open to work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
