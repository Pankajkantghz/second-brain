# Second Brain App

## Overview

Second Brain App is a full-stack web application built to help users save, organize, and manage useful online content in one place. Users can store YouTube videos, Twitter/X posts, and websites, organize them using tags, and share collections through public links.

The goal of the application is to act as a personal knowledge management system — a digital "second brain" for useful resources.

---

## Live Demo

### Frontend

Add your deployed frontend URL here:

```txt
https://your-frontend.vercel.app
```

### Backend API

```txt
https://second-brain-vw16.onrender.com
```

---

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Protected routes for authenticated users
* Persistent login using tokens

### Dashboard

* Store useful resources in one place
* Clean card-based interface
* Responsive layout for different screen sizes

### Content Management

Users can save:

* YouTube videos
* Twitter/X posts
* Websites

Users can also:

* Add content
* Edit saved content
* Delete content
* View embedded content directly

### Tagging System

* Add custom tags to content
* Filter content using tags
* Better organization of saved resources

### Filtering

Content can be filtered by:

* All
* YouTube
* Twitter/X
* Website
* Tags

### Shareable Brain

Users can generate a public share link to share their saved resources.

Example:

```txt
/share/abc123
```

### Responsive Design

* Desktop-friendly interface
* Responsive layout
* Collapsible sidebar navigation

---

## Tech Stack

### Frontend

* React (TypeScript)
* Tailwind CSS
* Axios
* React Router DOM
* React Toastify

### Backend

* Node.js
* Express.js (TypeScript)
* JWT Authentication
* Bcrypt

### Database

* MongoDB
* Mongoose

### Deployment

* Frontend deployed on Vercel
* Backend deployed on Render

---

## Project Structure

```txt
second-brain/
│── frontend/
│   ├── src/
│   ├── components/
│   ├── Pages/
│   ├── hooks/
│   └── config/
│
│── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
```

---

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:Pankajkantghz/second-brain.git
```

### 2. Navigate to Project Directory

```bash
cd second-brain
```

---

## Frontend Setup

Move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

---

## Backend Setup

Move into the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_PASSWORD=your_secret_key
PORT=3000
```

Start the development server:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/v1/signup
```

Create a new account.

```http
POST /api/v1/signin
```

Authenticate a user.

---

### Content

```http
GET /api/v1/content
```

Fetch saved content.

```http
POST /api/v1/content
```

Add new content.

```http
PUT /api/v1/content
```

Update existing content.

```http
DELETE /api/v1/content
```

Delete content.

---

### Share Brain

```http
POST /api/v1/brain/share
```

Generate a public share link.

```http
GET /api/v1/brain/:shareLink
```

Fetch shared content.

---

## Environment Variables

### Frontend

```env
VITE_BACKEND_URL=http://localhost:3000
```

### Backend

```env
MONGO_URI=your_mongodb_uri
JWT_PASSWORD=your_secret_key
PORT=3000
```

---

## Future Improvements

Potential improvements for future versions:

* Search functionality
* Dark mode
* Better content organization
* Bookmarking or favorites
* AI-powered summaries
* Drag-and-drop arrangement

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "added feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## Author

Pankaj Yadav

Built using the MERN stack with TypeScript.
