# Project Management System (PMS)

A modern, full-stack project management application built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

✨ **Core Features**
- 📊 Dashboard with project and task statistics
- 🗂️ Project management with descriptions
- ✅ Task creation and tracking
- 🏷️ Task status management (Todo, In Progress, Done)
- 🎯 Priority levels (Low, Medium, High)
- 📅 Due date management
- 👥 Team assignment (coming soon)
- 💬 Comments on tasks (coming soon)

🚀 **Planned Features**
- Kanban board view
- Timeline/Gantt charts
- Real-time collaboration
- File attachments
- Advanced filtering and search
- Custom workflows
- Time tracking
- Analytics and reporting

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone or Download the Repository**
   ```bash
   cd project-management-system/app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Visit http://localhost:3000

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - SVG icons

### Backend
- **Next.js API Routes** - Serverless backend
- **better-sqlite3** - Lightweight database
- **TypeScript** - Type-safe backend code

### Database
- **SQLite** - Embedded relational database (easily upgrade to PostgreSQL)

## Project Structure

```
app/
├── app/                   # Next.js App Router
│   ├── dashboard/        # Dashboard page
│   ├── projects/         # Project pages
│   ├── tasks/            # Task pages
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/              # UI components (Button, Card, Input, etc.)
│   ├── navbar.tsx       # Navigation bar
│   ├── task-card.tsx    # Task component
│   └── project-card.tsx # Project component
├── lib/
│   ├── db.ts            # Database connection & schema
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.ts   # Tailwind CSS config
└── next.config.js       # Next.js config
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

## Usage

### Home Page
Visit http://localhost:3000 for an overview and quick links to the dashboard.

### Dashboard
The dashboard displays:
- Active projects count
- In-progress tasks
- Completed tasks
- List of projects
- Recent tasks

### Create Project
1. Click "New Project" button
2. Enter project name and description
3. Click "Create Project"

### Create Task
1. Click "New Task" button
2. Select a project
3. Enter task title and description
4. Set priority and due date
5. Click "Create Task"

### Update Task
1. Click on any task card
2. Change status using the dropdown
3. Update priority as needed
4. Changes save automatically

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project

### Tasks
- `GET /api/tasks` - List all tasks (with optional filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/[id]` - Get specific task
- `PATCH /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

See [API Reference](./docs/project-management-system/api-reference.md) for detailed documentation.

## Database Schema

The system includes 6 main tables:

- **users** - User accounts
- **projects** - Projects with metadata
- **tasks** - Individual tasks with status and priority
- **comments** - Task comments (coming soon)
- **teams** - Team organization (coming soon)
- **team_members** - Team membership (coming soon)

## Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Deploy via Vercel dashboard
# Visit vercel.com/import and select your repository
```

### Self-Hosted
```bash
npm run build
npm start
```

See [Deployment Guide](./docs/project-management-system/deployment.md) for detailed instructions.

## Documentation

- [Getting Started](./docs/project-management-system/getting-started.md) - Setup and initial usage
- [User Guide](./docs/project-management-system/user-guide.md) - Feature documentation
- [API Reference](./docs/project-management-system/api-reference.md) - API documentation
- [Architecture](./docs/project-management-system/architecture.md) - System design
- [Deployment](./docs/project-management-system/deployment.md) - Deployment guide

## Development

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling
- React hooks for state management
- Functional components

### Best Practices
- Component-based architecture
- Reusable UI components
- Type-safe API calls
- Error handling throughout

## Database Upgrade Path

The system currently uses SQLite. To upgrade to PostgreSQL:

1. Install Prisma: `npm install prisma`
2. Configure PostgreSQL connection string
3. Run migrations
4. Update database connection in `lib/db.ts`

## Performance

- Dashboard loads all projects and tasks
- Client-side state management with React
- API caching with SWR (planned)
- Database indexes on key columns

## Security Notes

*Security features to be implemented:*
- User authentication
- Password hashing with bcrypt
- Session management with secure cookies
- Role-based access control
- HTTPS in production
- SQL injection prevention
- CSRF protection

## Troubleshooting

### Port 3000 is in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Database errors
- Ensure `data/` directory exists
- Check file permissions
- Verify database file isn't corrupted

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues:
1. Check the [Documentation](./docs/project-management-system/)
2. Review [API Reference](./docs/project-management-system/api-reference.md)
3. Open an issue on GitHub
4. Contact the development team

## Future Roadmap

- 📅 **v1.1**: Kanban board view, advanced filtering
- 🔄 **v1.2**: Real-time collaboration, file attachments
- 📊 **v1.3**: Analytics dashboard, time tracking
- 🤖 **v1.4**: AI-powered features, automation
- 📱 **v1.5**: Mobile app

## Authors

Built with ❤️ using Next.js and modern web technologies.

---

**Ready to get started?** [Quick Start Guide](./docs/project-management-system/getting-started.md)
