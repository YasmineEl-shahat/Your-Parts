# Your Parts App

A modern Next.js application for managing parts inventory with full CRUD operations, internationalization, and comprehensive testing.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete parts
- **Multi-language Support**: English/Arabic RTL/LTR support
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Testing**: Unit tests with Vitest, component tests with Storybook
- **State Management**: React Query for server state management
- **Form Validation**: Zod schema validation with react-hook-form

## Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: @tanstack/react-query
- **Testing**: Vitest, Storybook, Testing Library
- **i18n**: i18next, react-i18next
- **Linting**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- Bun 1.0+ (or npm 9+)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YasmineEl-shahat/Your-Parts.git
   cd your-parts-app
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or with npm
   npm install
   ```

### Running the Application

#### Development Server

```bash
bun run dev
# or
npm run dev
```

#### Production Build

```bash
bun run build
bun run start
```

### Testing

#### Run Unit Tests

```bash
bun test
```

#### Generate Coverage Report

```bash
bun test --coverage
```

#### Component Stories

```bash
bun run storybook
```

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `bun run dev`       | Start development server |
| `bun run build`     | Create production build  |
| `bun start`         | Start production server  |
| `bun test`          | Run unit tests           |
| `bun lint`          | Run ESLint               |
| `bun run storybook` | Launch Storybook         |

## Deployment

Easily deploy to Vercel:

[Deploy with Vercel](https://your-parts-kappa.vercel.app/)

## Project Structure

```
your-parts-app/
├── src/
│   ├── app/               # Next.js app router
│   ├── components/        # Reusable UI components
│   ├── lib/               # Shared utilities/config
│   └── stories/           # documented Storybook stories
├── .storybook/            # Storybook configuration
└── public/                # Static assets
```
