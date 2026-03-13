import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import type { ApiResponse, Task } from "@/lib/types"

type RouteParams = {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<Task>>> {
  try {
    const { id } = await params
    const db = getDb()
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task | undefined

    if (!task) {
      return NextResponse.json(
        { success: false, error: "Task not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: task })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch task" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<Task>>> {
  try {
    const { id } = await params
    const body = await request.json()
    const db = getDb()

    const now = new Date().toISOString()
    const updates: string[] = []
    const values: (string | null)[] = []

    if (body.title !== undefined) {
      updates.push("title = ?")
      values.push(body.title)
    }
    if (body.status !== undefined) {
      updates.push("status = ?")
      values.push(body.status)
    }
    if (body.priority !== undefined) {
      updates.push("priority = ?")
      values.push(body.priority)
    }
    if (body.assigned_to !== undefined) {
      updates.push("assigned_to = ?")
      values.push(body.assigned_to)
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: "No fields to update" },
        { status: 400 }
      )
    }

    updates.push("updated_at = ?")
    values.push(now)
    values.push(id)

    const query = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ?`
    db.prepare(query).run(...values)

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task

    return NextResponse.json({ success: true, data: task })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update task" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { id } = await params
    const db = getDb()

    db.prepare("DELETE FROM comments WHERE task_id = ?").run(id)
    db.prepare("DELETE FROM tasks WHERE id = ?").run(id)

    return NextResponse.json({ success: true, data: null })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete task" },
      { status: 500 }
    )
  }
}
