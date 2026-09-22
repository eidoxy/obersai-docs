import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.cssText = "position:fixed;opacity:0"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
  }
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const { t } = useI18n()

  const copy = async () => {
    await writeClipboard(value)
    setCopied(true)
    toast.success(t.common.copiedToast)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn("h-7 px-2 text-xs text-zinc-400 hover:bg-white/10 hover:text-white", className)}
      onClick={copy}
    >
      {copied ? <Check /> : <Copy />}
      {copied ? t.common.copied : t.common.copy}
    </Button>
  )
}
