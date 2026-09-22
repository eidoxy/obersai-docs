import { useEffect, useState } from "react"

export function useActiveSection(sectionIds: string[], defaultSection = "mulai") {
  const [activeSection, setActiveSection] = useState(defaultSection)

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.25, 0.5] }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
