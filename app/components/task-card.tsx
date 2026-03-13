"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import type { Task } from "@/lib/types"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

interface TaskCardProps {
  task: Task
}

const statusColors = {
  todo: "bg-secondary text-foreground",
  in_progress: "bg-blue-100 text-blue-900",
  done: "bg-green-100 text-green-900",
}

const priorityIcons = {
  low: <Clock size={16} />,
  medium: <AlertCircle size={16} />,
  high: <AlertCircle className="text-accent" size={16} />,
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link href={`/tasks/${task.id}`}>
      <Card className="hover:shadow-md transition cursor-pointer">
        <CardContent>
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-foreground flex-1 line-clamp-2">
              {task.title}
            </h3>
            {task.status === "done" && <CheckCircle className="text-green-600" size={20} />}
          </div>

          <CardDescription className="mb-3 line-clamp-2">
            {task.description || "No description"}
          </CardDescription>

          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                statusColors[task.status]
              }`}
            >
              {task.status.replace("_", " ")}
            </span>

            <div className="flex items-center gap-1 text-muted-foreground">
              {priorityIcons[task.priority]}
              <span className="text-xs">{task.priority}</span>
            </div>

            {task.due_date && (
              <span className="text-xs text-muted-foreground">
                {formatDate(task.due_date)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
