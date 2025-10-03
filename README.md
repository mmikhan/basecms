<div align="center">
  <img src="https://res.cloudinary.com/dpvyuluiq/image/upload/q_auto/f_auto/wave-flow_hjnjtt" alt="Base CMS Logo" width="200" />
</div>

# _Base_ CMS

A barebone CMS based on **Payload CMS** and **Next.js** designed as a starter template for modern web applications. Base CMS comes with minimal styles and a powerful block-based architecture, giving you full control over your content and UI through the Payload dashboard.

## ✨ Features

- **Block-Based Content Management**: Flexible block system for building dynamic pages
- **Headless CMS**: Powered by Payload CMS with a modern admin interface
- **Next.js Frontend**: Server-side rendering and optimal performance
- **Multi-language Support**: Built-in internationalization (i18n)
- **Authentication & User Management**: Complete user authentication system
- **Media Management**: Advanced media handling with Cloudinary integration
- **E-commerce Ready**: Stripe integration for payments and subscriptions
- **SEO Optimized**: Built-in SEO fields and meta generation
- **Form Builder**: Dynamic form creation and management
- **Minimal Styling**: Clean, minimal design ready for customization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database

### Environment Setup

1. **Create a new project from this template**

   **Option A: Using GitHub Web Interface**
   - Click the "Use this template" button on the GitHub repository page
   - Choose "Create a new repository"
   - Fill in your repository name and settings
   - Clone your new repository:
   ```bash
   git clone <your-new-repo-url>
   cd your-project-name
   ```

   **Option B: Using GitHub CLI**
   ```bash
   gh repo create your-project-name --template mmikhan/basecms --clone
   cd your-project-name
   ```

2. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Configure your `.env` file** (see [Environment Variables](#environment-variables) section below)

4. **Install dependencies**
   ```bash
   pnpm install
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Access your application**
   - Frontend: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`

### First Time Setup

1. Navigate to `http://localhost:3000/admin`
2. Create your first admin user account
3. Start building your content using the block-based system!

## 🔧 Environment Variables

Create a `.env` file in your project root with the following variables:

### Required Variables

```bash
# Application URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Database Configuration
DATABASE_URI=postgres://username:password@localhost:5432/your_database_name

# Payload CMS Secret (generate a secure random string)
PAYLOAD_SECRET=your-super-secret-key-here

# Preview Secret (for draft preview functionality)
PREVIEW_SECRET=your-preview-secret-here

# Environment
NODE_ENV=development
```

### Optional Integrations

```bash
# Stripe (for e-commerce features)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOKS_ENDPOINT_SECRET=whsec_...

# Cloudinary (for advanced media management)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Resend (for email functionality)
RESEND_API_KEY=re_...
```

### Setting Up Your Database

**Option 1: Local PostgreSQL**
1. Install PostgreSQL on your system
2. Create a new database: `createdb your_database_name`
3. Update `DATABASE_URI` in your `.env` file

**Option 2: Docker**
```bash
# Start PostgreSQL with Docker
docker run --name basecms-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:15

# Update your .env
DATABASE_URI=postgres://postgres:password@localhost:5432/postgres
```

## 🏗️ Project Structure

Base CMS follows a modular architecture:

```
src/
├── blocks/           # Content blocks (CallToAction, Hero, Content, etc.)
├── collections/      # Payload collections (Pages, Posts, Users, Media)
├── components/       # Reusable React components
├── globals/          # Global configurations (Header, Footer, General)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and helpers
├── plugins/         # Payload plugins configuration
├── app/             # Next.js app directory
│   ├── (frontend)/  # Public-facing pages
│   └── (payload)/   # Admin panel routes
└── payload.config.ts # Main Payload configuration
```

## 🧱 Available Blocks

Base CMS comes with a comprehensive set of pre-built blocks:

- **Hero Blocks**: High, Medium, and Low impact hero sections
- **Content Block**: Rich text content with media
- **Call to Action**: Conversion-focused sections
- **Media Block**: Image and video display
- **Banner**: Announcement and promotional banners
- **Code Block**: Syntax-highlighted code snippets
- **Form Block**: Dynamic form builder
- **Archive Block**: Content listing and filtering
- **Accordion**: Collapsible content sections
- **Carousel**: Image and content sliders
- **Pricing Table**: Subscription and pricing display
- **Authentication Blocks**: Login, Register, Password Reset

## 📚 Collections

### Content Collections
- **Pages**: Dynamic page builder with blocks
- **Posts**: Blog posts and articles
- **Categories**: Content categorization
- **Media**: File and image management

### E-commerce Collections
- **Orders**: Order management
- **Customers**: Customer data
- **Dashboard**: Analytics and reporting

### System Collections
- **Users**: User authentication and roles

## 🎨 Customization

Base CMS is designed to be easily customizable:

1. **Styling**: Modify the minimal CSS in `src/components/ui/`
2. **Blocks**: Create new blocks in `src/blocks/`
3. **Collections**: Add new collections in `src/collections/`
4. **Components**: Build custom components in `src/components/`

## 🔧 Development Commands

```bash
# Development
pnpm dev              # Start development server
pnpm devsafe          # Clean start (removes .next)
pnpm dev:prod         # Production simulation

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm payload          # Payload CLI commands
pnpm dev:seed         # Seed development data

# Code Quality
pnpm lint             # ESLint
pnpm typecheck        # TypeScript checking
pnpm test             # Run all tests
pnpm test:e2e         # End-to-end tests
pnpm test:int         # Integration tests
```

## 🚀 Deployment

Base CMS can be deployed to various platforms:

- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Static and serverless deployment
- **Railway**: Full-stack deployment with database
- **Self-hosted**: Docker support included

### Docker Deployment

```bash
# Build and run with Docker
docker-compose up --build

# Or build individually
docker build -t basecms .
docker run -p 3000:3000 basecms
```

## 📖 Documentation

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Block Development Guide](./docs/blocks.md) _(coming soon)_
- [Customization Guide](./docs/customization.md) _(coming soon)_

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

If you have any questions or need help:

- [Create an issue](https://github.com/your-username/basecms/issues)
- [Join the Payload Discord](https://discord.com/invite/payload)
- [Payload CMS Discussions](https://github.com/payloadcms/payload/discussions)
