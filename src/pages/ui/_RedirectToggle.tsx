import { Button } from '@/pages/ui/_button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/pages/ui/_dropdown-menu'
import { Globe } from 'lucide-react'
export function LanguageSwitcher() {
  const handleLanguageChange = (language: 'es' | 'en') => {
    const baseUrl = window.location.origin
    window.location.href = `${baseUrl}/${language}`
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-xs sm:text-sm"
          onClick={() => handleLanguageChange('es')}
        >
          Español
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs sm:text-sm"
          onClick={() => handleLanguageChange('en')}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
