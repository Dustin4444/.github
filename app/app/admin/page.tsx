"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader, Users, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalUsers: number
  totalProjects: number
  totalTasks: number
  completedTasks: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [tasksRes, projectsRes] = await Promise.all([
          fetch("/api/tasks"),
          fetch("/api/projects"),
        ])

        let totalTasks = 0
        let completedTasks = 0
        let totalProjects = 0

        if (tasksRes.ok) {
          const data = await tasksRes.json()
          const tasks = data.data || []
          totalTasks = tasks.length
          completedTasks = tasks.filter((t: any) => t.status === "done").length
        }

        if (projectsRes.ok) {
          const data = await projectsRes.json()
          totalProjects = (data.data || []).length
        }

        setStats({
          totalUsers: 5,
          totalProjects,
          totalTasks,
          completedTasks,
        })
      } catch (error) {
        console.error("[v0] Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and management center</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-4 mb-10">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Total Users</p>
                        <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
                      </div>
                      <Users className="text-secondary opacity-50" size={40} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Projects</p>
                        <p className="text-3xl font-bold text-primary">{stats.totalProjects}</p>
                      </div>
                      <FileText className="text-secondary opacity-50" size={40} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Total Tasks</p>
                        <p className="text-3xl font-bold text-primary">{stats.totalTasks}</p>
                      </div>
                      <FileText className="text-secondary opacity-50" size={40} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">Completed</p>
                        <p className="text-3xl font-bold text-green-600">{stats.completedTasks}</p>
                      </div>
                      <CheckCircle className="text-green-600 opacity-50" size={40} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/admin/users">
                      <Button variant="outline" className="w-full">
                        Manage Users
                      </Button>
                    </Link>
                    <Link href="/admin/analytics">
                      <Button variant="outline" className="w-full">
                        View Analytics
                      </Button>
                    </Link>
                    <Link href="/admin/settings">
                      <Button variant="outline" className="w-full">
                        System Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
