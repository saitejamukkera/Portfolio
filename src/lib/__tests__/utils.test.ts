import { cn } from '../utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false, 'visible')).toBe('base visible')
  })

  it('deduplicates tailwind conflicts', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8')
  })

  it('handles undefined and null gracefully', () => {
    expect(cn('base', undefined, null)).toBe('base')
  })

  it('returns empty string with no args', () => {
    expect(cn()).toBe('')
  })

  it('merges responsive variants', () => {
    expect(cn('text-sm', 'md:text-lg')).toBe('text-sm md:text-lg')
  })
})
