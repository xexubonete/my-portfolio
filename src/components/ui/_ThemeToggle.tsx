import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/_button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/_dropdown-menu'

type Theme = 'light' | 'dark' | 'system'

const LABELS = {
  es: { light: 'Claro', dark: 'Oscuro', system: 'Sistema', toggle: 'Cambiar tema' },
  en: { light: 'Light', dark: 'Dark', system: 'System', toggle: 'Toggle theme' },
}

function applyTheme(theme: Theme) {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = theme === 'dark' || (theme === 'system' && systemDark)
  document.documentElement.classList.toggle('dark', isDark)
}

export function ModeToggle({ lang = 'en' }: { lang?: 'es' | 'en' }) {
  const [theme, setThemeState] = React.useState<Theme>(() =>
    typeof localStorage !== 'undefined'
      ? ((localStorage.getItem('theme') as Theme) ?? 'system')
      : 'system',
  )

  React.useEffect(() => {
    applyTheme(theme)
    // Follow OS changes while in "system" mode.
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => {
      if ((localStorage.getItem('theme') ?? 'system') === 'system')
        applyTheme('system')
    }
    mq.addEventListener('change', onSystemChange)
    return () => mq.removeEventListener('change', onSystemChange)
  }, [theme])

  const onChangeTheme = (next: Theme) => {
    localStorage.setItem('theme', next)
    setThemeState(next)
  }

  const t = LABELS[lang]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="relative flex h-[1.2rem] w-[1.2rem] items-center justify-center">
            <Sun
              className="absolute h-[1.2rem] w-[1.2rem] shrink-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              strokeWidth={1.75}
            />
            <Moon
              className="absolute h-[1.2rem] w-[1.2rem] shrink-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              strokeWidth={1.75}
            />
          </span>
          <span className="sr-only">{t.toggle}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChangeTheme('light')}>
          {t.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeTheme('dark')}>
          {t.dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChangeTheme('system')}>
          {t.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
