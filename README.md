# Foodgram

A modern web application for sharing and discovering food-related content, built with Next.js and Express.

## Project Structure

The project is divided into two main parts:

- `frontend/`: Next.js application with TypeScript and Tailwind CSS
- `backend/`: Express.js server with TypeScript and MongoDB

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- Zustand for state management
- React Hook Form with Zod validation

### Backend
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- MongoDB
- npm 

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd foodgram
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Environment Setup

1. Backend (.env):
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

2. Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running the Application

1. Start the backend server:
```bash
# Development mode
cd backend
npm run dev

# Production mode
cd backend
npm run build
npm run serve
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Features

- User authentication and authorization
- Modern UI with responsive design
- Real-time updates
- Secure API endpoints
- Form validation
- State management
- Theme customization

## Development

- Frontend development server runs on port 3000
- Backend server runs on port 5000
- API endpoints are prefixed with `/api`
- TypeScript is used for type safety
- Tailwind CSS for styling
- ESLint and Prettier for code formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
