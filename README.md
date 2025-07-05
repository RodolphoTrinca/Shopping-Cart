# Shopping Cart

A modern, responsive Shopping Cart web application built with **Next.js**, **React**, and **TypeScript**.  
Features a Material UI-inspired design, robust state management with React Context, API integration, and comprehensive testing.

## Features

- **Product Listing**: Responsive grid, pagination, search, and Material UI-like cards.
- **Product Details**: Dynamic, accessible, and modern product page with images, colors, and features.
- **Shopping Cart**: Add, update, and remove items; persistent state with React Context.
- **Checkout**: User-friendly checkout flow.
- **API Integration**: Fetches products from [Fake Store API](https://fakestoreapi.com/products).
- **Modern UI/UX**: Material-inspired, accessible, and responsive layouts.
- **Testing**: Unit and edge case tests with Jest and React Testing Library.
- **TypeScript**: Type-safe, maintainable codebase.

## Technologies Used

- [Next.js](https://nextjs.org/) (App Directory)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (for styling)
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)
- [Axios](https://axios-http.com/) (for API calls)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

- `src/app/` – Next.js app directory (pages, layouts)
- `src/components/` – Reusable UI components
- `src/context/` – React Context for cart and search state
- `src/services/` – API integration logic
- `src/__tests__/` – Unit tests
- `public/` – Static assets

## Testing

- **Run all tests:**
  ```bash
  npm test
  ```
- Tests cover all main components, pages, and edge cases.

## Customization

- Update API endpoints in `src/services/productService.ts` as needed.
- Extend cart, checkout, or product features in context and components.
- Adjust styling in `globals.css` or Tailwind config.

## Accessibility & Best Practices

- All interactive elements are keyboard accessible.
- Uses semantic HTML and ARIA attributes where appropriate.
- Follows modular, scalable React and Next.js patterns.

## Improvements
- **Home Page**: The "Add to Cart" button on the home page has been redesigned to be more visually appealing and intuitive, encouraging users to add items to their cart more easily.

- **Cart Page**: The cart page now displays the price, quantity, and total for each item, making it easier for users to understand the cost breakdown and calculate their total expenditure per product.

- **Product Details Page**: The product details page is designed to showcase each item in the best possible light, providing great images, detailed descriptions, and clear feature highlights. As a seller, this page allows you to present your products with multiple images, color and size options, and comprehensive information to help buyers make informed decisions. The layout emphasizes accessibility and modern design, ensuring that your products are both attractive and easy to explore, ultimately increasing the likelihood of conversions.
