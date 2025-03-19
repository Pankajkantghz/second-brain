# Second Brain App

## Overview
Second Brain App is a TypeScript-based web application that allows users to store and manage embedded YouTube and Twitter links. It provides a shareable content feature and secure authentication using JWT.

## Features
- **User Authentication**: Secure sign-in and sign-up using JWT.
- **Dashboard**: Manage stored embedded YouTube and Twitter links.
- **Content Management**: Add, organize, and view saved content.
- **Sharing**: Generate shareable links for stored content.
- **Tagging System**: Categorize content using tags.
- **Responsive UI**: User-friendly design with Tailwind CSS.
- **Secure API Communication**: Axios is used for making API requests securely.
- **Protected Routes**: Ensures only authenticated users can access their content.

## Tech Stack
- **Frontend**: React (TypeScript), Tailwind CSS, Axios
- **Backend**: Node.js, Express (TypeScript)
- **Database**: MongoDB
- **Authentication**: JWT-based authentication

## Installation
### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- A backend service running with the required API endpoints

### Steps
1. Clone the repository:
   ```sh
   git clone git@github.com-Pankajkantghz/second-brain.git
   ```
2. Navigate to the project directory:
   ```sh
   cd second-brain-app/frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the application:
   ```sh
   npm run dev
   ```

## Usage
### Authentication
- Navigate to the **Sign Up** page to create an account.
- Enter your username and password and submit the form.
- Once registered, sign in using the credentials.
- On successful authentication, you'll be redirected to the **Dashboard**.

### Managing Content
- Click the **Add Content** button to add new YouTube or Twitter links.
- Assign relevant **tags** to categorize your content.
- View all your saved embedded content in a card format.
- Click **Share Brain** to generate a shareable link.
- Copy and share the generated link with others.

## API Endpoints
The frontend interacts with the backend via the following API endpoints:
- `POST /api/v1/signup` → Registers a new user and returns a JWT token.
- `POST /api/v1/signin` → Authenticates a user and returns a JWT token.
- `POST /api/v1/brain/share` → Generates a shareable link for stored content.
- `GET /api/v1/brain/:shareLink` → Retrieves content for a given shareable link.
- `GET /api/v1/content` → Fetches stored YouTube and Twitter links.
- `POST /api/v1/content` → Adds new embedded content.
- `DELETE /api/v1/content` → Deletes specified content.
- `POST /api/v1/tags` → Creates new tags.
- `GET /api/v1/tags` → Fetches existing tags.

## Environment Variables
Create a `.env` file in the root of the frontend project and add:
```
VITE_BACKEND_URL=http://localhost:5000
JWT_PASSWORD=your_jwt_secret
```

Create a `.env` file in the root of the backend project and add:
```
MONGO_URI=your_mongodb_uri
JWT_PASSWORD=your_jwt_secret
PORT=3000
```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.


