import { useTheme } from '@/components/theme-provider'

type ThemedImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  lightSrc: string
  darkSrc: string
}

export function ThemedImage({ lightSrc, darkSrc, ...props }: ThemedImageProps) {
  const { resolvedTheme } = useTheme()
  return <img src={resolvedTheme === 'dark' ? darkSrc : lightSrc} {...props} />
}
