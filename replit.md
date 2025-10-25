# TaskFlow - Advanced Task Management Application

## Overview
TaskFlow is a comprehensive task management application built with modern technologies, featuring multiple view modes and advanced collaboration features. This project was migrated from a Figma design and transformed into a fully functional task management system superior to Monday.com, with the clean aesthetics of UseMotion and the modern appeal of Rambox.

## Recent Changes (January 2025)
- Migrated from Figma landing page to full-featured task management application
- Implemented comprehensive database schema with PostgreSQL
- Created multiple view modes: Kanban, List, Calendar, Timeline, and Table
- Added real-time collaboration with WebSocket support
- Implemented drag-and-drop functionality for task management
- Created modern, responsive UI with Tailwind CSS and shadcn/ui components

## Project Architecture

### Backend (Server)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL (Neon-backed) with Drizzle ORM
- **Real-time**: WebSocket Server for live updates
- **API**: RESTful API with comprehensive endpoints for:
  - Workspaces management
  - Projects management
  - Boards/columns management
  - Tasks CRUD operations
  - Labels and comments
  - User management

### Frontend (Client)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **Real-time**: WebSocket integration for live updates

### Database Schema
The application uses a comprehensive relational database with the following main entities:
- **Users**: Authentication and user profiles
- **Workspaces**: Top-level organization containers
- **Projects**: Individual projects within workspaces
- **Boards**: Kanban-style columns for organizing tasks
- **Tasks**: The core entity with rich metadata (priority, status, due dates, assignees, custom fields)
- **Labels**: Categorization and tagging system
- **Comments**: Task collaboration and discussions
- **Attachments**: File management for tasks
- **Activities**: Audit log for all actions

## Key Features

### Multiple View Modes
1. **Kanban Board**: Drag-and-drop interface with customizable columns
2. **List View**: Clean, organized list with checkboxes and filtering
3. **Calendar View**: Month view with task visualization by due date
4. **Timeline View**: Gantt-style view for project planning
5. **Table View**: Spreadsheet-like view with sortable columns

### Advanced Features
- **Real-time Collaboration**: WebSocket-powered live updates
- **Drag-and-Drop**: Intuitive task management across boards
- **Search & Filter**: Quick task finding across projects
- **Priority System**: Low, Medium, High, Urgent with visual indicators
- **Status Tracking**: Todo, In Progress, In Review, Done, Archived
- **Custom Fields**: Extensible task metadata (JSON-based)
- **Team Collaboration**: Workspace members with role-based access
- **Activity Tracking**: Complete audit log of all changes

### Security & Best Practices
- **Client/Server Separation**: Clear separation of concerns
- **Type Safety**: Full TypeScript coverage
- **SQL Injection Protection**: Drizzle ORM with prepared statements
- **Input Validation**: Zod schemas for all API inputs
- **Error Handling**: Comprehensive error handling with proper status codes

## Project Structure
```
├── client/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable UI components (shadcn/ui)
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utilities (API client, WebSocket, query client)
│       ├── pages/       # Page components
│       │   └── views/   # Different view modes (Kanban, List, etc.)
│       └── App.tsx      # Main application component
├── server/
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes & WebSocket setup
│   ├── storage.ts       # Database operations layer
│   ├── db.ts            # Database connection
│   └── vite.ts          # Vite dev server integration
├── shared/
│   └── schema.ts        # Shared database schema & types
└── package.json         # Dependencies and scripts
```

## Development Workflow

### Running the Application
```bash
npm run dev          # Start development server (port 5000)
npm run build        # Build for production
npm start            # Start production server
```

### Database Management
```bash
npm run db:push      # Push schema changes to database
npm run check        # TypeScript type checking
```

### Environment Variables
The application uses the following environment variables (automatically configured in Replit):
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

## Technical Highlights

### Database Schema Design
- Uses PostgreSQL enums for type safety (priority, status, roles, view types)
- Comprehensive foreign key relationships with cascade deletes
- Timestamps for all entities (created_at, updated_at)
- JSON fields for extensibility (custom_fields, metadata)
- Self-referential relationships for subtasks

### API Design
- RESTful endpoints with consistent patterns
- Proper HTTP status codes (200, 201, 204, 400, 404, 500)
- Request validation with Zod schemas
- WebSocket integration for real-time updates
- Error handling middleware

### Frontend Architecture
- Component-based architecture with React
- Custom hooks for WebSocket and state management
- TanStack Query for server state management
- Optimistic updates for better UX
- Responsive design with mobile support

## Future Enhancements (Potential)
- File attachments with object storage
- Advanced search with full-text search
- Email notifications
- Custom workflows and automation
- API integrations (Slack, GitHub, etc.)
- Mobile apps (React Native)
- Advanced analytics and reporting

## Notes
- The application uses Replit's built-in PostgreSQL database
- WebSocket path is `/api/ws` (separate from Vite HMR)
- All IDs use UUID (varchar) for distributed system compatibility
- The demo uses a hardcoded user ID for simplicity
