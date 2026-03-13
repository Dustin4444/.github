"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  Shield,
  LogOut,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/admin/security", icon: Shield, label: "Security" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <aside className="w-64 border-r border-secondary bg-background h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-2 mb-10">
          <Shield className="text-primary" size={24} />
          <span className="text-lg font-bold text-primary">Admin</span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-secondary absolute bottom-0 w-full">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <LogOut size={20} />
          <span>Exit Admin</span>
        </Link>
      </div>
    </aside>
  )
}
