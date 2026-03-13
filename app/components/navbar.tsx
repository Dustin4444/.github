"use client"

import Link from "next/link"
import { Menu } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b border-secondary bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Menu className="text-primary" size={24} />
          <span className="text-xl font-bold text-primary">PMS</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition">
            Dashboard
          </Link>
          <Link href="/projects" className="text-muted-foreground hover:text-foreground transition">
            Projects
          </Link>
        </div>
      </div>
    </nav>
  )
}
