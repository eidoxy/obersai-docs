import type { ReactNode } from "react"

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="my-5 grid gap-2.5">
      {items.map((item, index) => (
        <li className="flex items-center gap-3 text-xs text-muted-foreground" key={index}>
          <span className="grid size-6 shrink-0 place-items-center rounded-md border bg-muted font-mono text-xs text-foreground">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}
