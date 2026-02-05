# 📚 Library Management API

> REST API for library management built with Node.js, TypeScript, Prisma, and PostgreSQL

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748.svg)](https://www.prisma.io/)

## 📖 About

This is a REST API for managing a library system. It was created as a learning project to understand backend architecture, Object-Oriented Programming (OOP), and modern development practices with Node.js and TypeScript.

The project uses:
- ✅ Layered architecture (Repository, Service, Controller)
- ✅ Object-Oriented Programming
- ✅ Dependency Injection pattern
- ✅ Data validation with Zod
- ✅ JWT Authentication (Access + Refresh tokens)
- ✅ Prisma ORM
- ✅ PostgreSQL database with Docker

## 🎯 Why This Project?

I created this project to:
- Learn how to build a REST API from scratch
- Move from functional programming to OOP
- Understand backend architecture with layers
- Practice TypeScript with Node.js
- Prepare for building an e-commerce API in the future

## 🛠️ Technologies

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL** - Relational database
- **Zod** - Schema validation
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Docker** - Database containerization

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18 or higher
- Docker and Docker Compose
- npm or yarn

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/KoryCarrera/library_management_api.git
cd library_management_api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder:

```env
#Database
DATABASE_URL="postgresql://example:example123@localhost:5432/biblioteca?schema=public"

#Port
PORT=8080

#JWT Secrets
JWT_ACCESS_SECRET="your_access_secret_here_change_in_production"
JWT_REFRESH_SECRET="your_refresh_secret_here_change_in_production"
```

> **Note:** You can copy `.env.example` and fill in your values.

### 4. Start the database with Docker

```bash
docker compose up -d
```

### 5. Run database migrations

```bash
npm run db:migrate
```

Or use push (for development):

```bash
npx prisma db push
```

### 6. (Optional) Seed the database with test data

```bash
npm run db:seed
```

This will create:
- 2 roles (Admin and Student)
- 1 section (Systems)
- 1 author (Gabriel García Márquez)
- 1 genre (Fiction)
- 1 user (Kory)
- 1 book (Cien años de soledad)

### 7. Start the development server

```bash
npm run dev
```

The server will run at `http://localhost:8080`

## 🏗️ Project Structure

```
library_management_api/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Test data
├── src/
│   ├── config/             # Configuration files
│   │   └── prisma.ts       # Prisma client instance
│   ├── controllers/        # Request/Response handlers
│   │   └── authController.ts
│   ├── repositories/       # Database access layer
│   │   ├── baseRepository.ts
│   │   ├── userRepository.ts
│   │   ├── bookRepository.ts
│   │   ├── authorRepository.ts
│   │   ├── genreRepository.ts
│   │   ├── rolRepository.ts
│   │   ├── sectionRepository.ts
│   │   └── borrowedRepository.ts
│   ├── routes/             # API routes
│   │   ├── index.ts
│   │   └── authRouter.ts
│   ├── schemas/            # Zod validation schemas
│   │   └── userSchema.ts
│   ├── service/            # Business logic
│   │   └── authService.ts
│   ├── types/              # TypeScript types
│   │   └── userType.ts
│   ├── app.ts              # Express app setup
│   └── server.ts           # Server entry point
├── RequesteExample/        # Bruno API examples
├── docker-compose.yml      # Docker configuration
├── package.json
└── tsconfig.json
```

### How a Request Works

```
Client (Frontend)
      ↓
   Router (Express)
      ↓
  Controller (validates data with Zod, handles request/response)
      ↓
   Service (business logic)
      ↓
  Repository (database operations with Prisma)
      ↓
  Database (PostgreSQL)
```

## 📡 API Endpoints

### Authentication

Currently implemented:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and get tokens | No |

### Example: Login Request

**Request:**
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "kory@biblioteca.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "name": "Kory",
      "rol": 1
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Example: Register Request

**Request:**
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "rolId": 2,
  "sectionId": 1,
  "salary": 0
}
```

> **Note:** See the `RequestExample/` folder for more examples using Bruno or another API client.

## 🔐 Authentication

The system uses **JWT with two tokens**:

### Access Token
- Duration: 2 hours
- Used for API requests
- Sent in header: `Authorization: Bearer <token>`
- Contains: `{ id, rol }`

### Refresh Token
- Duration: 7 days (168 hours)
- Stored in database
- Used to get a new access token when it expires

## 🗄️ Database Schema

### Main Tables

- **User** - System users (admin, worker, student)
- **Book** - Books in the library
- **Author** - Book authors
- **Genre** - Book genres
- **Borrowed** - Borrowing records
- **Rol** - User roles
- **Section** - Work sections

### Enums

```typescript
enum bookState {
  AVAILABLE  // Book can be borrowed
  BORROWED   // Book is currently borrowed
  LOST       // Book is lost
}

enum stateUser {
  ACTIVE     // User is active
  DISABLE    // User is disabled
}
```

See the complete schema in `prisma/schema.prisma`

## 📦 Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run db:migrate   # Run database migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio (visual database editor)
npm run db:seed      # Seed database with test data
```

## 🎓 What I Learned

This project helped me learn:

### 1. Object-Oriented Programming
- Classes and inheritance (BaseRepository)
- Encapsulation
- Dependency injection

### 2. Layered Architecture
- Separation of concerns
- Repository pattern for database access
- Service layer for business logic
- Controllers as HTTP handlers

### 3. Advanced TypeScript
- Generic types (`BaseRepository<T>`)
- Type inference with Zod (`z.infer`)
- Integration with Prisma

### 4. Best Practices
- Data validation at the edge (Zod)
- Password hashing before saving
- JWT for stateless authentication
- Environment variables for configuration
- Dependency injection for testability

## 🚀 Next Steps

Future improvements planned:

- [ ] Add more endpoints (books, authors, borrowing)
- [ ] Implement authorization middleware
- [ ] Add unit and integration tests
- [ ] Add pagination to list endpoints
- [ ] Implement search and filters
- [ ] Add API documentation (Swagger)
- [ ] Add request rate limiting
- [ ] Deploy to production

## 🤝 Contributing

This is a learning project, but suggestions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Kory Carrera**

- GitHub: [@KoryCarrera](https://github.com/KoryCarrera)
- Repository: [library_management_api](https://github.com/KoryCarrera/library_management_api)

## 🙏 Acknowledgments

- [Prisma](https://www.prisma.io/) for their excellent ORM
- [Zod](https://zod.dev/) for schema validation
- The TypeScript and Node.js communities

---

⭐ If this project helped you learn, consider giving it a star!

**Built with ❤️ as a learning project to master backend development with Node.js and TypeScript**