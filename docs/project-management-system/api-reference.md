# API Reference

The Project Management System provides a RESTful API for programmatic access to projects, tasks, and other data.

## Base URL

```
http://localhost:3000/api
```

## Authentication

*Authentication will be implemented in future versions*

## Projects API

### List Projects

Get all active projects.

**Endpoint**: `GET /projects`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Project Name",
      "description": "Project description",
      "status": "active",
      "owner_id": "user-id",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Create Project

Create a new project.

**Endpoint**: `POST /projects`

**Request Body**:
```json
{
  "name": "New Project",
  "description": "Project description",
  "owner_id": "user-1"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Project",
    "description": "Project description",
    "status": "active",
    "owner_id": "user-1",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

## Tasks API

### List Tasks

Get tasks with optional filtering.

**Endpoint**: `GET /tasks`

**Query Parameters**:
- `projectId` (optional): Filter by project
- `status` (optional): Filter by status (todo, in_progress, done)

**Example**: `/tasks?projectId=uuid&status=in_progress`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "project_id": "project-uuid",
      "title": "Task Title",
      "description": "Task description",
      "status": "in_progress",
      "priority": "high",
      "assigned_to": "user-id",
      "due_date": "2024-01-15",
      "created_by": "user-1",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Create Task

Create a new task.

**Endpoint**: `POST /tasks`

**Request Body**:
```json
{
  "project_id": "project-uuid",
  "title": "New Task",
  "description": "Task description",
  "priority": "medium",
  "due_date": "2024-01-15",
  "assigned_to": null,
  "created_by": "user-1"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "task-uuid",
    "project_id": "project-uuid",
    "title": "New Task",
    "description": "Task description",
    "status": "todo",
    "priority": "medium",
    "assigned_to": null,
    "due_date": "2024-01-15",
    "created_by": "user-1",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### Get Task

Get a specific task by ID.

**Endpoint**: `GET /tasks/:id`

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "task-uuid",
    "project_id": "project-uuid",
    "title": "Task Title",
    "description": "Task description",
    "status": "in_progress",
    "priority": "high",
    "assigned_to": "user-id",
    "due_date": "2024-01-15",
    "created_by": "user-1",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

### Update Task

Update a task (partial update).

**Endpoint**: `PATCH /tasks/:id`

**Request Body** (send only fields to update):
```json
{
  "title": "Updated Title",
  "status": "done",
  "priority": "low",
  "assigned_to": "user-2"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "task-uuid",
    "title": "Updated Title",
    "status": "done",
    "priority": "low",
    "assigned_to": "user-2",
    "updated_at": "2024-01-02T00:00:00Z"
  }
}
```

### Delete Task

Delete a task.

**Endpoint**: `DELETE /tasks/:id`

**Response**:
```json
{
  "success": true,
  "data": null
}
```

## Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## Data Types

### Task Status
- `todo`: Not started
- `in_progress`: Currently being worked on
- `done`: Completed

### Priority
- `low`: Low priority
- `medium`: Medium priority
- `high`: High priority

### Project Status
- `active`: Active project
- `archived`: Archived project

## Rate Limiting

*Rate limiting will be implemented in production*

## Pagination

*Pagination will be added in future versions*

## Examples

### JavaScript/Node.js

```javascript
// Create a task
const response = await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    project_id: 'project-uuid',
    title: 'New Task',
    created_by: 'user-1'
  })
});

const data = await response.json();
console.log(data);
```

### cURL

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": "project-uuid",
    "title": "New Task",
    "created_by": "user-1"
  }'
```

## Webhooks

*Webhooks will be implemented in future versions*
