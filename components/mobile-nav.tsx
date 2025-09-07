"use client"
import { Menu, GraduationCap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, BarChart3, Settings, Home } from "lucide-react"
import { useState } from "react"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
  },
  {
    title: "Classes",
    url: "/classes",
    icon: BookOpen,
  },
  {
    title: "Grades",
    url: "/grades",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">EduManage</span>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          {/* Header with close button */}
          <div className="flex h-14 items-center justify-between border-b px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="font-semibold">EduManage</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close navigation menu</span>
            </Button>
          </div>

          {/* Navigation items */}
          <div className="flex flex-col p-4">
            {items.map((item) => (
              <a
                key={item.title}
                href={item.url}
                className="flex items-center gap-3 rounded-lg px-3 py-4 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
