"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { TaskCard } from "@/components/task-card"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Loader } from "lucide-react"
import Link from "next/link"
import type { Task, Project } from "@/lib/types"

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, projectsRes] = await Promise.all([
          fetch("/api/tasks"),
          fetch("/api/projects"),
        ])

        if (tasksRes.ok) {
          const data = await tasksRes.json()
          setTasks(data.data || [])
        }

        if (projectsRes.ok) {
          const data = await projectsRes.json()
          setProjects(data.data || [])
        }
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const inProgressTasks = tasks.filter((t) => t.status === "in_progress")
  const doneTasks = tasks.filter((t) => t.status === "done")

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's your project overview.
              </p>
            </div>
            <Link href="/tasks/new">
              <Button>
                <Plus size={20} />
                New Task
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-10">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {projects.length}
                      </div>
                      <p className="text-muted-foreground">Active Projects</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">
                        {inProgressTasks.length}
                      </div>
                      <p className="text-muted-foreground">In Progress</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {doneTasks.length}
                      </div>
                      <p className="text-muted-foreground">Completed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Projects Section */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Projects</h2>
                  <Link href="/projects/new">
                    <Button variant="outline" size="sm">
                      <Plus size={16} />
                      New Project
                    </Button>
                  </Link>
                </div>

                {projects.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-4">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-8 text-center">
                      <p className="text-muted-foreground mb-4">No projects yet</p>
                      <Link href="/projects/new">
                        <Button variant="outline">Create Your First Project</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Recent Tasks */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Recent Tasks</h2>
                {tasks.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {tasks.slice(0, 6).map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="pt-8 text-center">
                      <p className="text-muted-foreground mb-4">No tasks yet</p>
                      <Link href="/tasks/new">
                        <Button variant="outline">Create Your First Task</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
