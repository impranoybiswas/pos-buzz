# POS Buzz 🛒

A modern Point of Sale (POS) system built with NestJS, React, and PostgreSQL. This application demonstrates production-level code quality with comprehensive features for product and sales management.

🌐 [[Live Demo](https://pos-buzz-frontend-pranoy.vercel.app/)]

## 🌟 Features

### ✅ Completed Features

- **Authentication System**
  - Email & password registration and login
  - JWT-based authentication
  - Protected API routes and frontend pages
  - Secure password hashing with bcrypt

- **Product Management**
  - Create, read, update, and delete products
  - Product fields: name, SKU, price, stock quantity
  - Real-time stock tracking
  - Redis caching for improved performance

- **Sales Management**
  - Create sales with automatic stock deduction
  - Transaction-based operations (atomicity guaranteed)
  - Stock validation (prevents overselling)
  - Sales history tracking with product details

- **Performance Optimization**
  - Redis caching layer for frequently accessed data
  - Automatic cache invalidation on data changes
  - Optimized database queries with Prisma

## 🏗️ Tech Stack

### Backend

- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Cache:** Redis (ioredis)
- **Authentication:** JWT (Passport)
- **Validation:** class-validator, class-transformer

### Frontend

- **Framework:** React 19 + Vite
- **UI Library:** Ant Design
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router v7
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **HTTP Client:** Axios

## 📁 Project Structure

```
pos-buzz/
├── backend/              # NestJS backend application
│   ├── src/
│   │   ├── auth/        # Authentication module
│   │   ├── products/    # Product management module
│   │   ├── sales/       # Sales management module
│   │   ├── users/       # User management module
│   │   ├── prisma/      # Prisma service
│   │   └── redis/       # Redis service
│   └── prisma/
│       └── schema.prisma
├── frontend/            # React frontend application
│   └── src/
│       ├── auth/        # Authentication pages
│       ├── pages/       # Application pages
│       ├── components/  # Reusable components
│       ├── hooks/       # Custom React hooks
│       ├── libs/        # API client libraries
│       └── types/       # TypeScript type definitions
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Redis 6+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/pos-buzz.git
   cd pos-buzz
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install

   # Configure environment variables
   cp .env.example .env
   # Edit .env with your database and Redis credentials

   # Run database migrations
   npx prisma migrate dev

   # Start the server
   npm run start:dev
   ```

3. **Setup Frontend**

   ```bash
   cd frontend
   npm install

   # Configure environment variables
   cp .env.example .env
   # Edit .env with your backend API URL

   # Start the development server
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api

## 📚 Documentation

- [Backend Documentation](./backend/README.md) - Detailed backend setup, API endpoints, and architecture
- [Frontend Documentation](./frontend/README.md) - Frontend setup, components, and state management

## 🔑 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/posbuzz"
REDIS_HOST="localhost"
REDIS_PORT=6379
JWT_SECRET="your-secret-key"
PORT=3000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage report
```

### Frontend Tests

```bash
cd frontend
npm run test
```

## 📦 Deployment

### Backend Deployment

The backend can be deployed to platforms like:

- Railway
- Render
- Heroku
- AWS EC2/ECS
- DigitalOcean

See [backend/README.md](./backend/README.md) for detailed deployment instructions.

### Frontend Deployment

The frontend can be deployed to:

- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

See [frontend/README.md](./frontend/README.md) for detailed deployment instructions.

## 🎯 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Products

- `GET /products` - List all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create new product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Sales

- `GET /sales` - List all sales
- `GET /sales/:id` - Get sale by ID
- `POST /sales` - Create new sale (with stock deduction)

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes with Passport guards
- Environment variable configuration
- CORS configuration
- Input validation and sanitization

## 🎨 UI Features

- Responsive design (mobile, tablet, desktop)
- Modern glassmorphism effects
- Real-time data updates with React Query
- Toast notifications for user feedback
- Loading states and error handling
- Interactive charts and statistics

## 📈 Performance

- Redis caching for frequently accessed data
- Optimistic UI updates
- Lazy loading and code splitting
- Database query optimization with Prisma
- Connection pooling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/YOUR_PROFILE)

## 🙏 Acknowledgments

- NestJS for the amazing backend framework
- Ant Design for the beautiful UI components
- Prisma for the excellent ORM
- TanStack Query for powerful data synchronization

---

**Live Demo:** [YOUR_LIVE_SITE_URL](YOUR_LIVE_SITE_URL)

**Note:** Replace `YOUR_USERNAME`, `YOUR_LIVE_SITE_URL`, and other placeholder values with your actual information.
