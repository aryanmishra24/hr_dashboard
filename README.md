# 💼 HR Dashboard (Advanced)

A comprehensive HR Performance Dashboard built with Next.js, featuring employee management, performance tracking, bookmarks, analytics, and authentication.

## 🚀 Features

### ✅ Core Features (Implemented)

#### 1. **Dashboard Homepage (`/`)**
- ✅ Fetch and display employee data from `https://dummyjson.com/users?limit=20`
- ✅ User cards with: Full Name, Email, Age, Department, Performance Rating (1-5 stars)
- ✅ Action buttons: View, Bookmark, Promote
- ✅ Responsive grid layout (1-4 columns based on screen size)

#### 2. **Search & Filter**
- ✅ Search bar to filter by name, email, or department (case-insensitive)
- ✅ Multi-select filter by department
- ✅ Multi-select filter by performance rating
- ✅ Real-time filtering with custom `useSearch` hook

#### 3. **Employee Details Page (`/employee/[id]`)**
- ✅ Dynamic routing with detailed employee profiles
- ✅ Tabbed interface: Overview, Projects, Feedback
- ✅ Mock data for: Address, Phone, Bio, Performance History
- ✅ Performance rating with color-coded badges
- ✅ Navigation from user cards

#### 4. **Bookmark Manager (`/bookmarks`)**
- ✅ List all bookmarked employees
- ✅ Remove from bookmarks functionality
- ✅ Clear all bookmarks option
- ✅ Persistent storage with Zustand
- ✅ Bookmark count display

#### 5. **Analytics Page (`/analytics`)**
- ✅ Chart.js integration for data visualization
- ✅ Department-wise average ratings (Bar Chart)
- ✅ Bookmark trends over time (Line Chart)
- ✅ Summary statistics cards
- ✅ Department performance details

### ✅ Advanced Features (Bonus)

#### 6. **Authentication System**
- ✅ NextAuth.js integration with credentials provider
- ✅ Login page with form validation
- ✅ Mock users: HR Manager & Admin
- ✅ Session management and protected routes
- ✅ User role display in navigation

#### 7. **Create User Modal**
- ✅ Form with validation for all required fields
- ✅ Department selection dropdown
- ✅ Rating slider with visual feedback
- ✅ Avatar generation using DiceBear API
- ✅ Add new employees to the dashboard

#### 8. **UI/UX Features**
- ✅ Dark/Light mode toggle with Zustand
- ✅ Responsive design (Mobile to Desktop)
- ✅ Loading and error states
- ✅ Reusable UI components (Button, Card, Badge, Modal, RatingStars)
- ✅ Smooth transitions and hover effects

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Authentication:** NextAuth.js
- **Charts:** Chart.js + react-chartjs-2
- **Icons:** Lucide React
- **UI Components:** Custom components with Headless UI patterns

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hr_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **HR Manager:** `hr@company.com` / `password123`
- **Admin:** `admin@company.com` / `admin123`

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/          # NextAuth.js API routes
│   ├── analytics/         # Analytics page
│   ├── bookmarks/         # Bookmarks page
│   ├── employee/[id]/     # Employee details page
│   ├── login/             # Login page
│   └── page.tsx           # Dashboard homepage
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── providers/        # Context providers
│   ├── AuthNav.tsx       # Authentication navigation
│   ├── CreateUserModal.tsx # Create user modal
│   └── UserCard.tsx      # Employee card component
├── hooks/                # Custom hooks
│   ├── useBookmarks.ts   # Bookmark state management
│   ├── useSearch.ts      # Search and filter logic
│   └── useTheme.ts       # Dark/light mode state
└── lib/                  # Utility libraries
    └── auth.ts           # NextAuth.js configuration
```

## 🎯 Key Features Explained

### State Management
- **Zustand stores** for bookmarks, theme, and authentication
- **Custom hooks** for search/filter and bookmarks
- **Persistent storage** for bookmarks and theme preferences

### Component Architecture
- **Reusable UI components** with TypeScript interfaces
- **Composition pattern** for flexible component usage
- **Responsive design** with Tailwind CSS utilities

### Data Flow
- **API integration** with dummyjson.com for user data
- **Mock data generation** for departments, ratings, and analytics
- **Real-time filtering** and search functionality

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- **Mobile:** 1 column layout
- **Tablet:** 2-3 column layout  
- **Desktop:** 4 column layout
- **Large screens:** Optimized spacing and typography

## 🎨 Customization

### Adding New Departments
Edit the `departments` array in:
- `src/app/page.tsx`
- `src/components/UserCard.tsx`
- `src/components/CreateUserModal.tsx`

### Styling
- Modify Tailwind classes in components
- Update color schemes in `tailwind.config.js`
- Customize dark mode colors

### Authentication
- Add new providers in `src/lib/auth.ts`
- Modify user roles and permissions
- Update login page styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Chart.js](https://www.chartjs.org/) for data visualization
- [DummyJSON](https://dummyjson.com/) for mock API data
