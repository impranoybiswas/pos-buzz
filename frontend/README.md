# POS Buzz Frontend 🎨

Modern React-based frontend for the POS Buzz application with Ant Design, TanStack Query, and Tailwind CSS.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages and Components](#pages-and-components)
- [State Management](#state-management)
- [Deployment](#deployment)

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Language:** TypeScript 5.9
- **UI Library:** Ant Design 6
- **Styling:** Tailwind CSS 4
- **State Management:** TanStack Query (React Query) 5
- **Routing:** React Router 7
- **HTTP Client:** Axios
- **Charts:** Recharts 3
- **Notifications:** React Hot Toast

## ✨ Features

### User Interface

- Modern, responsive design (mobile, tablet, desktop)
- Glassmorphism effects and smooth animations
- Dark mode support (via Ant Design)
- Interactive charts and statistics
- Toast notifications for user feedback

### Authentication

- Login and registration pages
- JWT token management
- Protected routes
- Automatic token refresh
- Logout functionality

### Dashboard

- Real-time business metrics
- Product and stock statistics
- Sales analytics charts
- Inventory distribution visualization
- Responsive grid layout

### Product Management

- Product listing with search and filters
- Create new products
- Edit existing products
- Delete products with confirmation
- Real-time stock updates
- Form validation

### Sales Management

- Create sales with product selection
- Automatic stock deduction
- Stock availability validation
- Sales history
- Product relationship display

### Performance

- Optimistic UI updates
- Automatic cache invalidation
- Loading states and skeletons
- Error boundaries
- Code splitting and lazy loading

## 📁 Project Structure

```
frontend/
├── src/
│   ├── auth/                    # Authentication pages
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── pages/                   # Application pages
│   │   ├── Home.tsx            # Dashboard with charts
│   │   ├── Products.tsx        # Product management
│   │   └── Profile.tsx         # User profile
│   ├── components/              # Reusable components
│   │   └── Navbar.tsx          # Navigation bar
│   ├── hooks/                   # Custom React hooks
│   │   └── useProducts.ts      # Product CRUD hooks
│   ├── libs/                    # API client libraries
│   │   ├── axios.ts            # Axios instance
│   │   ├── products.api.ts     # Product API calls
│   │   └── sales.api.ts        # Sales API calls
│   ├── routes/                  # Routing configuration
│   │   ├── Routes.tsx          # Route definitions
│   │   └── PrivateRoute.tsx    # Protected route wrapper
│   ├── types/                   # TypeScript definitions
│   │   └── index.ts            # Type definitions
│   ├── utils/                   # Utility functions
│   ├── App.tsx                  # Root component
│   ├── main.tsx                # Application entry
│   └── global.css              # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running (see [backend README](../backend/README.md))

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
   VITE_API_URL=http://localhost:3000
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔐 Environment Variables

| Variable       | Description          | Example                 |
| -------------- | -------------------- | ----------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

## 📄 Pages and Components

### Authentication Pages

#### Login (`/login`)

- Email and password form
- JWT token storage
- Redirect to dashboard on success
- Error handling with toast notifications

#### Register (`/register`)

- Name, email, and password form
- Automatic login after registration
- Form validation
- Error handling

### Application Pages

#### Dashboard (`/`)

- Business intelligence overview
- Key statistics cards:
  - Total products
  - In-stock units
  - Gross revenue
  - Staff members
- Sales analytics chart (Area chart)
- Inventory distribution chart (Bar chart)
- Real-time data from backend

#### Products (`/products`)

- Product table with columns:
  - Name
  - SKU
  - Price
  - Stock quantity
  - Actions (Edit, Delete)
- Create product modal
- Edit product modal
- Delete confirmation
- Search and filter functionality
- Pagination

#### Profile (`/profile`)

- User information display
- Account settings
- Logout functionality

### Components

#### Navbar

- Responsive navigation
- Desktop horizontal menu
- Mobile drawer menu
- Active route highlighting
- Logout button
- Glassmorphism effect

#### PrivateRoute

- JWT authentication check
- Redirect to login if not authenticated
- Protect sensitive routes

## 🔄 State Management

### TanStack Query (React Query)

All data fetching and mutations use React Query for:

- Automatic caching
- Background refetching
- Optimistic updates
- Cache invalidation
- Loading and error states

#### Example: useProducts Hook

```typescript
const { productsQuery, createMutation, updateMutation, deleteMutation } =
  useProducts();

// Fetch products
const { data, isLoading, error } = productsQuery;

// Create product
createMutation.mutate({
  name: "New Product",
  sku: "SKU-001",
  price: 99.99,
  stockQuantity: 100,
});

// Update product
updateMutation.mutate({
  id: "product-id",
  data: { price: 89.99 },
});

// Delete product
deleteMutation.mutate("product-id");
```

### Query Keys

- `["products"]` - All products
- `["sales"]` - All sales
- `["user"]` - Current user

### Cache Invalidation

Mutations automatically invalidate related queries:

- Create/Update/Delete product → Invalidates `["products"]`
- Create sale → Invalidates `["sales"]` and `["products"]`

## 🎨 Styling

### Tailwind CSS

Custom configuration with:

- Extended color palette
- Custom spacing
- Responsive breakpoints
- Utility classes

### Ant Design Theme

Customized theme with:

- Primary color: Blue (#2563eb)
- Border radius: 8px
- Component size: Large
- Font family: Inter

### Custom Styles

Global styles in `global.css`:

- Glassmorphism effects (`.glass-card`)
- Smooth transitions
- Custom scrollbars
- Gradient backgrounds

## 📡 API Integration

### Axios Configuration

```typescript
// libs/axios.ts
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
```

### API Client Libraries

#### Products API (`libs/products.api.ts`)

```typescript
export const getProductsApi = async (): Promise<Product[]>
export const createProductApi = async (data: Omit<Product, "id">): Promise<Product>
export const updateProductApi = async (id: string, data: Partial<Omit<Product, "id">>): Promise<Product>
export const deleteProductApi = async (id: string): Promise<void>
```

#### Sales API (`libs/sales.api.ts`)

```typescript
export const getSalesApi = async (): Promise<Sale[]>
export const createSaleApi = async (data: SalePayload): Promise<Sale>
export const getSaleApi = async (id: string): Promise<Sale>
```

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard**
   - `VITE_API_URL` - Your production backend URL

### Netlify Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**

   ```bash
   netlify deploy --prod --dir=dist
   ```

3. **Configure environment variables**
   - Add `VITE_API_URL` in Netlify dashboard

### Build Configuration

The production build:

- Minifies JavaScript and CSS
- Optimizes images
- Generates source maps
- Code splits by route
- Tree shakes unused code

Build output directory: `dist/`

## 🧪 Testing

### Component Testing

```bash
npm run test
```

### E2E Testing

```bash
npm run test:e2e
```

## 🔧 Troubleshooting

### API Connection Issues

- Verify `VITE_API_URL` in `.env`
- Check backend is running
- Inspect network tab in browser DevTools

### Authentication Issues

- Clear localStorage: `localStorage.clear()`
- Check JWT token expiration
- Verify backend JWT_SECRET matches

### Build Issues

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Update dependencies: `npm update`

## 📱 Responsive Design

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Features

- Drawer navigation
- Touch-friendly buttons
- Optimized layouts
- Reduced chart complexity

## ⚡ Performance Optimization

### Implemented Optimizations

- Code splitting by route
- Lazy loading components
- Image optimization
- Memoization with React.memo
- Virtual scrolling for large lists
- Debounced search inputs

### Lighthouse Scores (Target)

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Ant Design Documentation](https://ant.design/)
- [TanStack Query Documentation](https://tanstack.com/query/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

See the main [README](../README.md) for contribution guidelines.

## 📄 License

MIT License - see the main [README](../README.md) for details.

---

**Live Demo:** [YOUR_LIVE_SITE_URL](YOUR_LIVE_SITE_URL)
