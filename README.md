# Second Brain App

Second Brain App is a full-stack web application for saving and organizing useful online content in one place. Users can store YouTube videos, Twitter/X posts, and websites, organize them with tags, and share collections using public links.

## Features

* Authentication with JWT
* Save YouTube, Twitter/X, and website links
* Organize content using tags
* Filter by content type or tags
* Share saved content publicly
* Responsive dashboard with collapsible sidebar
* Add, edit, and delete content

## Tech Stack

### Frontend

* React (TypeScript)
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js (TypeScript)
* JWT Authentication
* Bcrypt

### Database

* MongoDB with Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render

## Project Structure

```txt
second-brain/
├── frontend/
└── backend/
```

## Installation

### Clone Repository

```bash
git clone git@github.com:Pankajkantghz/second-brain.git
cd second-brain
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_PASSWORD=your_secret_key
PORT=3000
```

## API Endpoints

### Authentication

```http
POST /api/v1/signup
POST /api/v1/signin
```

### Content

```http
GET    /api/v1/content
POST   /api/v1/content
PUT    /api/v1/content
DELETE /api/v1/content
```

### Share Brain

```http
POST /api/v1/brain/share
GET  /api/v1/brain/:shareLink
```

## Future Improvements

* Search functionality
* Dark mode
* Better content organization
* AI-powered summaries

## Author

Pankaj Yadav

Built with MERN and TypeScript.
