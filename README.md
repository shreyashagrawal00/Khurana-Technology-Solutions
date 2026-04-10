# 🚀 AI Intern Tracker

A professional, high-performance web application designed to architect and manage the modern job search pipeline. Built with a focus on data-driven decision making and advanced AI integration, this platform transforms the chaotic process of job hunting into a streamlined, automated experience.

---

## 🏗️ Technical Architecture

This project follows a decoupled **MERN-style** architecture optimized for scalability and rapid development:
- **Frontend**: A highly interactive React 19 application utilizing **Vite** for optimized build cycles and **Tailwind CSS** for a premium, dark-mode-first UI.
- **Backend**: A robust Node.js/Express server written in **TypeScript**, ensuring type safety across the entire API surface.
- **AI Engine**: Leverages the **Google Gemini API** (via OpenAI-compatible layer) for low-latency intelligent parsing and generative content.
- **Database**: MongoDB Atlas for flexible, document-oriented storage of complex job metadata.

---

## ✨ Design Decisions & Decisions Made

To make this project stand out for the internship review, several key architectural decisions were made:

### 1. **AI-First Integration (Google Gemini)**
Instead of a simple CRUD app, we implemented a sophisticated AI proxy layer using **Google Gemini (gemini-2.5-flash)**. 
- **The Choice**: Gemini was chosen for its massive context window and speed, allowing for real-time parsing of long job descriptions into structured JSON.
- **The Implementation**: We built a custom shim to communicate with Google's OpenAI-compatible endpoint, demonstrating the ability to work across different API standards.

### 2. **Fluid Kanban UX (dnd-kit)**
We chose **@dnd-kit** over heavier alternatives like `react-beautiful-dnd`.
- **Reason**: It provides better performance on mobile and higher flexibility for custom draggable sensors.
- **Result**: A silky-smooth drag-and-drop experience that feels like a premium desktop application.

### 3. **Data Visualization (Recharts)**
To provide immediate value to the user, we integrated **Recharts** to create an **Executive Analytics Dashboard**.
- **Impact**: Instead of just listing jobs, we provide "physics" (conversion rates, pipeline health), demonstrating a product-focused engineering mindset.

---

## 🛠️ Environment Variables

To run this project, create a `.env` file in the `/backend` directory with the following variables:

| Variable | Description | Source |
| :--- | :--- | :--- |
| `MONGODB_URI` | Connection string for MongoDB Atlas | [MongoDB Atlas](https://cloud.mongodb.com/) |
| `JWT_SECRET` | Secret key for signing authentication tokens | User Generated (Any secure string) |
| `OPENAI_API_KEY` | Google Gemini API Key | [Google AI Studio](https://aistudio.google.com/) |
| `PORT` | Local server port (Default: 5000) | Optional |

---

## 🏃 Setup & Running the Project

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
# Ensure .env is set up correctly
npm run dev
```
*Note: We use `ts-node-dev` for the backend, so the server will automatically reload when you make changes.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Access the application at `http://localhost:5173`.*

---

## 🌐 Deployment Instructions

For production deployment, please refer to our internal [Deployment Guide](file:///C:/Users/shrey/.gemini/antigravity/brain/98027caf-93cf-4173-a2f9-001fcf538701/deployment_guide.md).
- **Backend**: Recommended hosting on **Render** or Railway.
- **Frontend**: Optimized for **Vercel** with Vite production builds.

---

> [!IMPORTANT]
> **API Key Guard**: This project includes configured `.gitignore` files to prevent sensitive API keys and secrets from being committed to version control. Always use the `.env.example` as a template for new environments.
node_modules/
