"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { ArrowLeft, Loader } from "lucide-react"
import Link from "next/link"
import type { Task } from "@/lib/types"
import { formatDate } from "@/lib/utils"

interface TaskDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function TaskDetailsPage({ params }: TaskDetailsPageProps) {
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [id, setId] = useState<string>("")

  useEffect(() => {
    const unwrapParams = async () => {
      const { id } = await params
      setId(id)
    }
    unwrapParams()
  }, [params])

  useEffect(() => {
    if (!id) return

    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`)
        const data = await res.json()
        if (data.success) {
          setTask(data.data)
        }
      } catch (error) {
        console.error("[v0] Error fetching task:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleStatusChange = async (newStatus: string) => {
    if (!task) return

    setUpdating(true)
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        const data = await res.json()
        setTask(data.data)
      }
    } catch (error) {
      console.error("[v0] Error updating task:", error)
    } finally {
      setUpdating(false)
    }
  }

  const handlePriorityChange = async (newPriority: string) => {
    if (!task) return

    setUpdating(true)
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: newPriority }),
      })

      if (res.ok) {
        const data = await res.json()
        setTask(data.data)
      }
    } catch (error) {
      console.error("[v0] Error updating task:", error)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <Loader className="animate-spin text-primary" size={32} />
        </main>
      </>
    )
  }

  if (!task) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="max-w-2xl mx-auto px-4 py-10">
            <p className="text-muted-foreground">Task not found</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-10">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary mb-6 hover:opacity-80">
            <ArrowLeft size={20} />
            Back
          </Link>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-3xl">{task.title}</CardTitle>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Close
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {task.description || "No description provided"}
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <Select
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={updating}
                  options={[
                    { label: "To Do", value: "todo" },
                    { label: "In Progress", value: "in_progress" },
                    { label: "Done", value: "done" },
                  ]}
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Priority
                </label>
                <Select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                  disabled={updating}
                  options={[
                    { label: "Low", value: "low" },
                    { label: "Medium", value: "medium" },
                    { label: "High", value: "high" },
                  ]}
                />
              </div>

              {/* Metadata */}
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-secondary">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Due Date</p>
                  <p className="font-medium">
                    {task.due_date ? formatDate(task.due_date) : "No due date"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created</p>
                  <p className="font-medium">{formatDate(task.created_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
