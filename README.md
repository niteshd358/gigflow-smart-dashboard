# GigFlow – Smart Leads Dashboard

A full-stack Lead Management Dashboard built using the MERN stack with TypeScript.

## Live Demo

Frontend:
https://gigflow-smart-dashboard-five.vercel.app

Backend:
https://gigflow-smart-dashboard-925n.onrender.com

---

## Features

### Authentication
- JWT Authentication
- User Registration & Login
- Protected Routes
- Password Hashing with bcrypt

### Leads Management
- Create Lead
- Edit Lead
- Delete Lead
- View Leads
- Role-Based Access Control

### Dashboard Features
- Search Leads
- Filter by Status
- Filter by Source
- Sorting
- Backend Pagination
- CSV Export
- Analytics Charts
- Dark Mode

### UI/UX
- Responsive Design
- Loading States
- Empty States
- Form Validation
- Toast Notifications

---

## Tech Stack

### Frontend
- React
- TypeScript
- TailwindCSS
- React Query
- Zustand
- Recharts
- Framer Motion

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Zod

---

## Folder Structure

```bash
frontend/
backend/
docker-compose.yml

```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/niteshd358/gigflow-smart-dashboard.git
```

---

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Docker Setup

```bash
docker compose up --build
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---|---|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Leads

| Method | Endpoint |
|---|---|
| GET | /api/leads |
| POST | /api/leads |
| PUT | /api/leads/:id |
| DELETE | /api/leads/:id |

---

## Author

Nitesh Chakravarti