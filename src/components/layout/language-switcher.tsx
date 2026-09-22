import { useEffect, useRef, useState } from "react"
import { Check, ChevronDown, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n, type Language } from "@/i18n"
import { cn } from "@/lib/utils"

const languages: Array<{ code: Language; label: string; short: string }> = [
  { code: "id", label: "Indonesia", short: "ID" },
  { code: "en", label: "English", short: "EN" },
]

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // ponytail: lightweight click-outside dropdown; add radix dropdown-menu if nested submenus needed.
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const current = languages.find((item) => item.code === language) || languages[0]

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-8 gap-2 px-2.5 text-xs font-semibold"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t.common.switchLanguage}
      >
        <Languages className="size-3.5 text-muted-foreground" />
        <span>{current.short}</span>
        <ChevronDown className={cn("size-3 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </Button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t.common.switchLanguage}
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[140px] rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
        >
          {languages.map((item) => {
            const isSelected = item.code === language
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLanguage(item.code)
                  setIsOpen(false)
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors hover:bg-muted hover:text-foreground",
                  isSelected && "bg-muted text-foreground font-semibold"
                )}
              >
                <span>{item.label}</span>
                {isSelected && <Check className="size-3.5 text-foreground" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
