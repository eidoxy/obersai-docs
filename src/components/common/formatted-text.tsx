import type { ReactNode } from "react"

export function FormattedText({ text }: { text: string }): ReactNode {
  // ponytail: basic markdown bold/code parser; add remark/rehype when complex markdown needed.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={index} className="text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={index}>{part.slice(1, -1)}</code>
        }
        return part
      })}
    </>
  )
}