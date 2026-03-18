import {
  gitHubLink,
  linkedInLink,
  twitterLink,
  emailLink,
  jobRadarLink,
  portfolioLink,
  gitLinkForPortfolio,
  gitLinkForJobRadar,
  trackHireLiveLink,
  trackHireGithubLink,
} from '../static-links'

describe('static-links', () => {
  it('exports all links as strings', () => {
    const links = [
      gitHubLink,
      linkedInLink,
      twitterLink,
      emailLink,
      jobRadarLink,
      portfolioLink,
      gitLinkForPortfolio,
      gitLinkForJobRadar,
      trackHireLiveLink,
      trackHireGithubLink,
    ]

    links.forEach((link) => {
      expect(typeof link).toBe('string')
      expect(link.length).toBeGreaterThan(0)
    })
  })

  it('has valid URLs for web links', () => {
    const webLinks = [
      gitHubLink,
      linkedInLink,
      twitterLink,
      jobRadarLink,
      portfolioLink,
      gitLinkForPortfolio,
      gitLinkForJobRadar,
      trackHireLiveLink,
      trackHireGithubLink,
    ]

    webLinks.forEach((link) => {
      expect(link).toMatch(/^https?:\/\//)
    })
  })

  it('email link uses mailto protocol', () => {
    expect(emailLink).toMatch(/^mailto:/)
  })

  it('github links point to github.com', () => {
    expect(gitHubLink).toContain('github.com')
    expect(gitLinkForPortfolio).toContain('github.com')
    expect(gitLinkForJobRadar).toContain('github.com')
    expect(trackHireGithubLink).toContain('github.com')
  })

  it('linkedin link points to linkedin.com', () => {
    expect(linkedInLink).toContain('linkedin.com')
  })
})
