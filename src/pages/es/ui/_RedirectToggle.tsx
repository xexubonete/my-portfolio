import { Button } from '@/pages/en/ui/_button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/pages/en/ui/_dropdown-menu'
import { Globe } from 'lucide-react' // O cualquier ícono que prefieras para el botón

export function LanguageSwitcher() {
  const handleLanguageChange = (language: 'es' | 'en') => {
    const baseUrl = window.location.origin // Obtén la URL base del dominio
    window.location.href = `${baseUrl}/${language}` // Redirige a la URL con el idioma seleccionado
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
        <DropdownMenuItem onClick={() => handleLanguageChange('es')}>
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
