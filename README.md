# AI-Assisted Job Application Tracker

A modern web application to track job applications on a Kanban board with AI-powered job description parsing and tailored resume suggestions.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, dnd-kit, React Query.
- **Backend**: Node.js, Express, TypeScript, MongoDB, JWT, OpenAI API.

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file based on `.env.example`.
4. Update `MONGODB_URI` and `OPENAI_API_KEY`.
5. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Key Features
- **Kanban Board**: Drag and drop applications across different stages.
- **AI JD Parser**: Automatically extracts company, role, location, and skills from a pasted job description.
- **AI Suggestions**: Generates 3-5 resume bullet points tailored specifically for the job role.
- **Secure Auth**: JWT-based authentication for user-specific data.
