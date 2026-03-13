# Getting Started with Project Management System

Welcome to the Project Management System (PMS) documentation! This guide will help you get up and running with the application.

## Overview

The Project Management System is a modern web application built with Next.js that helps teams organize projects, manage tasks, and collaborate effectively. It provides a clean, intuitive interface for tracking work across multiple projects.

## Key Features

- **Project Management**: Create and organize multiple projects
- **Task Tracking**: Create tasks, assign them to team members, and track progress
- **Status Updates**: Move tasks through different states (To Do, In Progress, Done)
- **Priority Levels**: Set task priorities (Low, Medium, High)
- **Dashboard**: Get an overview of all your projects and tasks
- **Team Collaboration**: Comments and updates on tasks

## System Requirements

- Node.js 18+ 
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

### Option 1: Clone from GitHub

```bash
git clone https://github.com/yourusername/project-management-system.git
cd project-management-system/app
npm install
npm run dev
```

### Option 2: Using the provided files

1. Navigate to the `app` directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Dashboard page
│   ├── projects/          # Project pages
│   ├── tasks/             # Task pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # UI components (Button, Card, Input, etc.)
│   ├── navbar.tsx        # Navigation bar
│   ├── task-card.tsx     # Task card component
│   └── project-card.tsx  # Project card component
├── lib/
│   ├── db.ts            # Database initialization
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
├── public/              # Static files
└── package.json         # Dependencies
```

## Quick Start

1. **Access the Home Page**: Visit http://localhost:3000 to see the welcome screen
2. **Go to Dashboard**: Click "Go to Dashboard" to access the main interface
3. **Create a Project**: Click "New Project" to create your first project
4. **Create a Task**: Click "New Task" and assign it to the project
5. **Update Task Status**: Click on a task to open details and change its status

## Next Steps

- Read the [User Guide](./user-guide.md) for detailed feature documentation
- Check out the [API Reference](./api-reference.md) for backend integration details
- See [Configuration](./configuration.md) for customization options

## Support

For issues, feature requests, or contributions, please visit the project repository or contact the development team.
