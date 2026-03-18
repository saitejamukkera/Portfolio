import { RESUME } from '../resume'

describe('RESUME data', () => {
  it('has a name', () => {
    expect(RESUME.name).toBeTruthy()
    expect(typeof RESUME.name).toBe('string')
  })

  it('has a summary', () => {
    expect(RESUME.summary).toBeTruthy()
    expect(RESUME.summary.length).toBeGreaterThan(10)
  })

  it('has valid contact info', () => {
    expect(RESUME.email).toMatch(/@/)
    expect(RESUME.github).toContain('github.com')
    expect(RESUME.linkedin).toContain('linkedin.com')
  })

  it('has at least one project', () => {
    expect(RESUME.projects.length).toBeGreaterThan(0)
  })

  it('each project has required fields', () => {
    RESUME.projects.forEach((project) => {
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.tech.length).toBeGreaterThan(0)
      expect(typeof project.featured).toBe('boolean')
    })
  })

  it('each project has themed image with light and dark variants', () => {
    RESUME.projects.forEach((project) => {
      expect(project.image).toBeDefined()
      expect(project.image).toHaveProperty('light')
      expect(project.image).toHaveProperty('dark')
    })
  })

  it('has at least one featured project', () => {
    const featured = RESUME.projects.filter((p) => p.featured)
    expect(featured.length).toBeGreaterThan(0)
  })

  it('has at least one experience entry', () => {
    expect(RESUME.experience.length).toBeGreaterThan(0)
  })

  it('each experience has required fields', () => {
    RESUME.experience.forEach((exp) => {
      expect(exp.company).toBeTruthy()
      expect(exp.role).toBeTruthy()
      expect(exp.period).toBeTruthy()
      expect(exp.description).toBeTruthy()
      expect(exp.highlights.length).toBeGreaterThan(0)
    })
  })

  it('has education entries', () => {
    expect(RESUME.education.length).toBeGreaterThan(0)
    RESUME.education.forEach((edu) => {
      expect(edu.school).toBeTruthy()
      expect(edu.degree).toBeTruthy()
      expect(edu.period).toBeTruthy()
      expect(edu.location).toBeTruthy()
    })
  })

  it('has skills across all categories', () => {
    expect(RESUME.skills.languages.length).toBeGreaterThan(0)
    expect(RESUME.skills.backend.length).toBeGreaterThan(0)
    expect(RESUME.skills.data.length).toBeGreaterThan(0)
    expect(RESUME.skills.devops.length).toBeGreaterThan(0)
    expect(RESUME.skills.testing.length).toBeGreaterThan(0)
    expect(RESUME.skills.frontend.length).toBeGreaterThan(0)
  })

  it('currentTechStack has icon and tech for each entry', () => {
    RESUME.currentTechStack.forEach((item) => {
      expect(item.tech).toBeTruthy()
      expect(item.icon).toBeTruthy()
    })
  })
})
