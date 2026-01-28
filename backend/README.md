# POS Buzz Backend 🚀

NestJS-based backend API for the POS Buzz application with PostgreSQL, Prisma ORM, and Redis caching.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Deployment](#deployment)

## 🛠️ Tech Stack

- **Framework:** NestJS 11
- **Language:** TypeScript 5.7
- **Database:** PostgreSQL
- **ORM:** Prisma 6.19
- **Cache:** Redis (ioredis)
- **Authentication:** JWT with Passport
- **Password Hashing:** bcrypt
- **Validation:** class-validator, class-transformer

## ✨ Features

### Authentication

- User registration with email and password
- Secure password hashing using bcrypt
- JWT token generation and validation
- Protected routes with Passport JWT strategy

### Product Management

- Full CRUD operations for products
- Unique SKU validation
- Stock quantity tracking
- Redis caching for improved performance
- Automatic cache invalidation

### Sales Management

- Create sales with automatic stock deduction
- **Atomic transactions** using Prisma transactions
- Stock validation (prevents overselling)
- Sales history with product relationships
- Redis caching for sales data

### Performance

- Redis caching layer (1-hour TTL)
- Automatic cache invalidation on mutations
- Optimized database queries
- Connection pooling

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── auth.controller.ts   # Login/register endpoints
│   │   ├── auth.service.ts      # Auth business logic
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts      # JWT validation strategy
│   ├── products/                # Product management
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   ├── sales/                   # Sales management
│   │   ├── dto/
│   │   │   └── create-sale.dto.ts
│   │   ├── sales.controller.ts
│   │   ├── sales.service.ts
│   │   └── sales.module.ts
│   ├── users/                   # User management
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── prisma/                  # Prisma service
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── redis/                   # Redis service
│   │   ├── redis.service.ts
│   │   └── redis.module.ts
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Application entry point
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── test/                        # E2E tests
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL 14+
- Redis 6+

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/posbuzz"
   REDIS_HOST="localhost"
   REDIS_PORT=6379
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=3000
   ```

3. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

4. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`

### Available Scripts

```bash
npm run start          # Start production server
npm run start:dev      # Start development server with watch mode
npm run start:debug    # Start with debugging
npm run build          # Build for production
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm run test           # Run unit tests
npm run test:e2e       # Run E2E tests
npm run test:cov       # Generate test coverage
```

## 🔐 Environment Variables

| Variable       | Description                  | Example                                    |
| -------------- | ---------------------------- | ------------------------------------------ |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `REDIS_HOST`   | Redis server host            | `localhost`                                |
| `REDIS_PORT`   | Redis server port            | `6379`                                     |
| `JWT_SECRET`   | Secret key for JWT signing   | `your-secret-key`                          |
| `PORT`         | Server port                  | `3000`                                     |

## 🗄️ Database Schema

### User

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

### Product

```prisma
model Product {
  id            String   @id @default(uuid())
  name          String
  sku           String   @unique
  price         Float
  stockQuantity Int
  sales         Sale[]
  createdAt     DateTime @default(now())
}
```

### Sale

```prisma
model Sale {
  id        String   @id @default(uuid())
  productId String
  quantity  Int
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())
}
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Product Endpoints

All product endpoints require JWT authentication via `Authorization: Bearer <token>` header.

#### List Products

```http
GET /products
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "uuid",
    "name": "Product Name",
    "sku": "SKU-001",
    "price": 99.99,
    "stockQuantity": 50,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Product by ID

```http
GET /products/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "uuid",
  "name": "Product Name",
  "sku": "SKU-001",
  "price": 99.99,
  "stockQuantity": 50,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Create Product

```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Product",
  "sku": "SKU-002",
  "price": 149.99,
  "stockQuantity": 100
}

Response: 201 Created
{
  "id": "uuid",
  "name": "New Product",
  "sku": "SKU-002",
  "price": 149.99,
  "stockQuantity": 100,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Product

```http
PATCH /products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 129.99,
  "stockQuantity": 75
}

Response: 200 OK
{
  "id": "uuid",
  "name": "New Product",
  "sku": "SKU-002",
  "price": 129.99,
  "stockQuantity": 75,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Delete Product

```http
DELETE /products/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "uuid",
  "name": "New Product",
  ...
}
```

### Sales Endpoints

#### List Sales

```http
GET /sales
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "uuid",
    "productId": "product-uuid",
    "quantity": 5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "product": {
      "id": "product-uuid",
      "name": "Product Name",
      "sku": "SKU-001",
      "price": 99.99,
      "stockQuantity": 45
    }
  }
]
```

#### Get Sale by ID

```http
GET /sales/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "uuid",
  "productId": "product-uuid",
  "quantity": 5,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "product": { ... }
}
```

#### Create Sale

```http
POST /sales
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product-uuid",
  "quantity": 5
}

Response: 201 Created
{
  "id": "uuid",
  "productId": "product-uuid",
  "quantity": 5,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "product": {
    "id": "product-uuid",
    "name": "Product Name",
    "stockQuantity": 45  // Automatically deducted
  }
}

Error Response (Insufficient Stock): 400 Bad Request
{
  "statusCode": 400,
  "message": "Insufficient stock for product Product Name. Available: 3, Requested: 5"
}
```

## 🏗️ Architecture

### Layered Architecture

```
Controller Layer (HTTP)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Prisma ORM)
    ↓
Database (PostgreSQL)
```

### Key Design Patterns

1. **Dependency Injection**: NestJS built-in DI container
2. **Repository Pattern**: Prisma as data access layer
3. **DTO Pattern**: Data Transfer Objects for validation
4. **Guard Pattern**: JWT authentication guards
5. **Transaction Pattern**: Prisma transactions for atomic operations

### Caching Strategy

- **Cache Keys**:
  - `products:all` - All products list
  - `product:{id}` - Individual product
  - `sales:all` - All sales list
  - `sale:{id}` - Individual sale

- **TTL**: 1 hour (3600 seconds)

- **Invalidation**: Automatic on create, update, delete operations

### Error Handling

All services use try-catch blocks with appropriate NestJS exceptions:

- `NotFoundException` - Resource not found
- `BadRequestException` - Invalid input or business rule violation
- `InternalServerErrorException` - Unexpected errors

## 🚀 Deployment

### Railway Deployment

1. **Create a new project on Railway**

2. **Add PostgreSQL and Redis services**

3. **Set environment variables**

   ```
   DATABASE_URL (auto-generated by Railway)
   REDIS_HOST (auto-generated by Railway)
   REDIS_PORT (auto-generated by Railway)
   JWT_SECRET=your-secret-key
   PORT=3000
   ```

4. **Deploy**
   ```bash
   # Railway will auto-detect and run:
   npm install
   npx prisma migrate deploy
   npm run build
   npm run start:prod
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```

## 📝 Database Migrations

### Create a new migration

```bash
npx prisma migrate dev --name migration_name
```

### Apply migrations in production

```bash
npx prisma migrate deploy
```

### Reset database (development only)

```bash
npx prisma migrate reset
```

## 🔧 Troubleshooting

### Redis Connection Issues

- Ensure Redis is running: `redis-cli ping`
- Check REDIS_HOST and REDIS_PORT in .env

### Database Connection Issues

- Verify DATABASE_URL format
- Ensure PostgreSQL is running
- Check database credentials

### JWT Authentication Issues

- Verify JWT_SECRET is set
- Check token expiration
- Ensure Authorization header format: `Bearer <token>`

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Redis Documentation](https://redis.io/documentation)

## 🤝 Contributing

See the main [README](../README.md) for contribution guidelines.

## 📄 License

MIT License - see the main [README](../README.md) for details.
