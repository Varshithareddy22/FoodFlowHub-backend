# FOODIO - Food Delivery Platform
# FOODIO - Backend Documentation
FOODIO is a comprehensive food delivery platform that connects customers with local restaurants through an intuitive interface. The platform is built with TypeScript and follows modern web development practices.
## Overview
FOODIO is a food delivery platform built with TypeScript and Express.js, featuring a robust backend architecture for managing restaurants, menus, orders, and user authentication.
## Backend Architecture
### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: Passport.js with local strategy
- **Data Storage**: In-memory storage (development) / PostgreSQL (production)
- **API Design**: RESTful architecture
- **Type Safety**: TypeScript
- **Validation**: Zod
- **ORM**: Drizzle
### Core Components
-1+1
3. **Data Storage** (`server/storage.ts`)
   - In-memory data management
   - CRUD operations for all entities
   - CRUD operations
   - Session management
   - Sample data initialization
-0+9
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders` - Get user's order history
## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: Passport.js with local strategy
- **Data Storage**: In-memory storage (development) / PostgreSQL (production)
- **Type Safety**: TypeScript
- **Validation**: Zod
- **ORM**: Drizzle
## Setup Instructions
1. Clone the repository:
-20+20
npm install
```
3. Start the development server:
3. Set environment variables:
```env
SESSION_SECRET=your_session_secret
DATABASE_URL=your_database_url (for PostgreSQL setup)
```
4. Start the development server:
```bash
npm run dev
```
The server will start on port 5000.
## Development
## Development Guidelines
### Environment Variables
```
SESSION_SECRET=your_session_secret
DATABASE_URL=your_database_url (for PostgreSQL setup)
```
### Code Organization
- All backend code resides in the `server` directory
- Shared types and schemas are in `shared` directory
- Database schema and types in `shared/schema.ts`
- API routes in `server/routes.ts`
- Authentication logic in `server/auth.ts`
### Database Setup
The project uses in-memory storage by default for development. For PostgreSQL setup:
1. Create a PostgreSQL database
2. Update the DATABASE_URL in environment variables
3. Run migrations:
```bash
npm run db:push
```
## Type Safety
### Type Safety
The project uses TypeScript and Zod for complete type safety:
- Database schema types are automatically generated
- API request/response types are validated
- Shared types between frontend and backend
### Error Handling
- Global error handler for consistent error responses
- Request logging for debugging
- Type-safe error handling with TypeScript
## Contributing
