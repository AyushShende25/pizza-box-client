# Pizza Box Client

A modern, responsive React application for ordering pizzas online with real-time order tracking and a delightful user experience.

## Live Demo

- **Client Application**: https://pizzabox.ayushshende.com

## Related Repositories

- **Backend API**: https://github.com/AyushShende25/pizza-box  
- **Admin Dashboard**: https://github.com/AyushShende25/pizza-box-admin

---

## Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Routing**: React Router
- **Server State**: TanStack Query (React Query)
- **Forms & Validation**: React Hook Form, Zod
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios
- **Real-time**: WebSockets
- **Linting & Formatting**: Biome

---

## Features

### Authentication & Account Management

- User registration with email verification
- Resend verification email if the token expires
- Login using JWT-based authentication
- Session management with access and refresh tokens and cookies
- Password reset support
- axios interceptors for refresh-token rotation

### Menu & Browsing

- Browse pizzas with infinite scrolling
- Filter by category (vegetarian / non-vegetarian)
- Search pizzas by name with debouncing support
- Sort pizzas by price
- Detailed pizza view with customization options
- Cached and paginated queries using TanStack Query

### Cart Management

- Guest cart support before login
- Automatic cart merge on login
- Add and remove items with optimistic UI updates
- Real-time cart total calculation
- Clear cart functionality
- Query invalidation and rollback on errors

### Checkout & Payments

- Manage multiple delivery addresses
- Select delivery address during checkout
- Add order notes
- Razorpay payment integration
- Cash on delivery option
- Secure payment verification

### Orders & Tracking

- Real-time order status updates via WebSockets
- Order history with filtering
- Detailed order view
- Order cancellation for eligible orders

### Address Management

- Add, edit, and delete delivery addresses
- Set default delivery address
- Address validation

---

## Technical Highlights

### Performance & UX

- Optimistic updates for cart operations
- Infinite scroll pagination
- Query caching and invalidation
- Debounced search
- Loading skeletons and graceful error states

### Performance, UX & Reliability

- Optimistic updates for instant user feedback
- Infinite scroll pagination for large datasets
- Query caching and background refetching
- Loading skeletons and graceful empty states
- Centralized API error handling with toast notifications
- Form-level validation with clear error messages
- Error boundaries for UI fault isolation
- Fully responsive, mobile-first design

---


## Prerequisites

- Node.js 18 or higher
- npm or yarn or pnpm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AyushShende25/pizza-box-client
cd pizza-box-client
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/api/v1
VITE_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

---

## Project Structure

```
pizza-box-client/
├── src/
│   ├── api/                # API client and query functions
│   ├── components/         # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── skeletons/      # Loading skeletons
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout components
│   ├── lib/                # Utilities and helpers
│   ├── pages/              # Route-level pages
│   ├── providers/          # Context providers
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/               
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```




