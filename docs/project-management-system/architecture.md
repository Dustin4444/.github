# Architecture Overview

## System Architecture

The Project Management System is built with a modern, scalable architecture:

```
┌─────────────────────────────────────────────────┐
│           Browser / Client                      │
└────────────────┬────────────────────────────────┘
                 │
                 │ HTTP/HTTPS
                 │
┌─────────────────▼────────────────────────────────┐
│     Next.js Frontend (React)                    │
│  ├─ Pages (Dashboard, Projects, Tasks)         │
│  ├─ Components (UI, Cards, Forms)              │
│  └─ Client State (React Hooks)                 │
└────────────────┬────────────────────────────────┘
                 │
                 │ API Calls
                 │
┌─────────────────▼────────────────────────────────┐
│    Next.js API Routes (Backend)                 │
│  ├─ /api/projects                              │
│  ├─ /api/tasks                                 │
│  └─ /api/tasks/[id]                           │
└────────────────┬────────────────────────────────┘
                 │
                 │ SQL Queries
                 │
┌─────────────────▼────────────────────────────────┐
│      Database Layer (SQLite)                    │
│  ├─ Tables (users, projects, tasks, etc.)      │
│  ├─ Indexes                                    │
│  └─ Relationships                              │
└─────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: UI library with hooks
- **Next.js 15**: Framework with App Router
- **TypeScript**: Static typing for reliability
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: SVG icons

### Backend
- **Next.js API Routes**: Serverless functions
- **better-sqlite3**: Lightweight database library
- **TypeScript**: Type-safe backend code

### Database
- **SQLite**: Embedded relational database
- **Migration Scripts**: Schema management
- **Connection Pooling**: Efficient resource use

## Project Structure

```
project-management-system/
├── app/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Dashboard
│   │   ├── projects/
│   │   │   ├── page.tsx         # Projects list
│   │   │   ├── new/
│   │   │   │   └── page.tsx     # Create project
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Project details
│   │   ├── tasks/
│   │   │   ├── page.tsx         # Tasks list
│   │   │   ├── new/
│   │   │   │   └── page.tsx     # Create task
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Task details
│   │   └── api/
│   │       ├── projects/
│   │       │   └── route.ts     # Projects API
│   │       └── tasks/
│   │           ├── route.ts     # Tasks API
│   │           └── [id]/
│   │               └── route.ts # Task detail API
│   ├── components/              # React components
│   │   ├── ui/                 # UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── textarea.tsx
│   │   ├── navbar.tsx          # Navigation
│   │   ├── task-card.tsx       # Task display
│   │   └── project-card.tsx    # Project display
│   ├── lib/
│   │   ├── db.ts               # Database connection
│   │   ├── types.ts            # TypeScript types
│   │   └── utils.ts            # Utility functions
│   ├── public/                 # Static files
│   ├── package.json            # Dependencies
│   ├── tsconfig.json           # TypeScript config
│   ├── tailwind.config.ts      # Tailwind config
│   ├── postcss.config.js       # PostCSS config
│   └── next.config.js          # Next.js config
└── docs/                       # Documentation
    └── project-management-system/
        ├── getting-started.md
        ├── user-guide.md
        ├── api-reference.md
        ├── deployment.md
        └── architecture.md
```

## Database Schema

### Users Table
```sql
id TEXT PRIMARY KEY
name TEXT NOT NULL
email TEXT UNIQUE NOT NULL
role TEXT DEFAULT 'member'
created_at DATETIME
updated_at DATETIME
```

### Projects Table
```sql
id TEXT PRIMARY KEY
name TEXT NOT NULL
description TEXT
status TEXT DEFAULT 'active'
owner_id TEXT (FK → users)
created_at DATETIME
updated_at DATETIME
```

### Tasks Table
```sql
id TEXT PRIMARY KEY
project_id TEXT (FK → projects)
title TEXT NOT NULL
description TEXT
status TEXT DEFAULT 'todo'
priority TEXT DEFAULT 'medium'
assigned_to TEXT (FK → users)
due_date DATE
created_by TEXT (FK → users)
created_at DATETIME
updated_at DATETIME
```

### Comments Table
```sql
id TEXT PRIMARY KEY
task_id TEXT (FK → tasks)
user_id TEXT (FK → users)
content TEXT NOT NULL
created_at DATETIME
updated_at DATETIME
```

### Teams Table
```sql
id TEXT PRIMARY KEY
name TEXT NOT NULL
project_id TEXT (FK → projects)
created_at DATETIME
```

### Team Members Table
```sql
id TEXT PRIMARY KEY
team_id TEXT (FK → teams)
user_id TEXT (FK → users)
role TEXT DEFAULT 'member'
joined_at DATETIME
UNIQUE(team_id, user_id)
```

## Data Flow

### Creating a Task
1. User fills form on `/tasks/new`
2. Form submitted to `POST /api/tasks`
3. API validates input
4. Database inserts task
5. API returns task object
6. User redirected to dashboard

### Updating Task Status
1. User opens task details
2. User changes status dropdown
3. PATCH request sent to `/api/tasks/[id]`
4. API updates database
5. Updated task returned
6. UI reflects changes

## API Design

### RESTful Principles
- Resources: Projects, Tasks, Comments, Users
- Methods: GET, POST, PATCH, DELETE
- Status Codes: 200, 201, 400, 404, 500

### Response Format
All API responses follow:
```json
{
  "success": boolean,
  "data": T | null,
  "error": string | null
}
```

## Authentication & Authorization

*To be implemented*

- User authentication via email/password
- Session management with secure cookies
- Role-based access control (admin, member)
- Row-level security for data access

## Performance Considerations

### Caching
- Static page caching
- API response caching
- Client-side state with React

### Database Optimization
- Indexes on frequently queried columns
- Query optimization
- Connection pooling

### Frontend Optimization
- Code splitting
- Image optimization
- CSS optimization

## Security Architecture

### Frontend Security
- CSRF protection
- XSS prevention
- Secure headers

### Backend Security
- Input validation
- SQL injection prevention (parameterized queries)
- API rate limiting

### Data Security
- Encrypted connections (HTTPS)
- Secure password storage (bcrypt)
- Session management

## Error Handling

### Frontend
- User-friendly error messages
- Error boundaries
- Fallback UI

### Backend
- Validation errors
- Database errors
- API error responses

## Scalability Path

### Current (Single Server)
- SQLite database
- Single Node.js process
- Local file storage

### Phase 2 (Multiple Servers)
- PostgreSQL database
- Load balancer
- Session management

### Phase 3 (Enterprise)
- Managed database
- Microservices
- CDN for assets
- Message queue for async tasks

## Monitoring & Observability

### Logging
- Application logs
- API request logs
- Database query logs

### Metrics
- Response times
- Error rates
- Resource usage

### Alerting
- Performance degradation
- Error spikes
- Resource exhaustion

## Future Enhancements

1. **Real-time Collaboration**
   - WebSocket connections
   - Live task updates
   - Collaborative editing

2. **Advanced Features**
   - Kanban board view
   - Timeline/Gantt view
   - Time tracking
   - File attachments

3. **AI Integration**
   - Task suggestions
   - Priority recommendations
   - Automated assignments

4. **Analytics**
   - Productivity metrics
   - Burn-down charts
   - Custom reporting
