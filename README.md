# SuperLabs Product Management Client

A premium, responsive frontend interface for the SuperLabs Product Management system, built with React and Tailwind CSS.

## Features

- **Product Showcase**: A clean grid layout for browsing high-end products.
- **Dynamic Search**: Real-time search filtering.
- **Detailed Views**: Dedicated product detail pages for in-depth information.
- **Admin Management**: Intuitive interface for product creation, editing, and deletion.
- **Premium UI**: Modern aesthetic with smooth animations and high-quality iconography.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

## Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v18+)
- Backend server running on `http://localhost:5000`

### Installation

1. Navigate to the client directory:
   ```bash
   cd product-management-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the Development Server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/pages`: Application views (Home, Product Details).
- `src/components`: Reusable UI components (ProductCard, Modal, etc.).
- `src/services`: API integration and data fetching logic.
- `src/types`: TypeScript interfaces for consistent data structures.
- `src/index.css`: Global styles and Tailwind configuration.
