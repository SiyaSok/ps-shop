<!-- @format -->

# Shopping List App

This repository contains examples of Next.js API routes for common CRUD (Create, Read, Update, Delete) operations, authentication, product management, and a Shopping List App. It demonstrates how to connect to a MongoDB database using Mongoose, handle requests, validate data, manage user authentication with JWTs (JSON Web Tokens) and bcrypt for password hashing, and implement features for a shopping list application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Shopping List App](#shopping-list-app)

## Introduction

This project showcases best practices for building robust and secure API endpoints in a Next.js application, including a practical example of a Shopping List App. It covers essential aspects of API development, including database interaction, data validation, user authentication, error handling, and client-side state management for a shopping list.

## Features

- **User Management:**
  - Create, read, update, and delete users.
  - Secure password storage using bcrypt hashing.
  - User authentication with JWTs.
- **Product Management:**
  - Create, read, update, and delete products.
  - Product search by keywords, date range, and category.
  - Pagination and sorting for product listings.
- **Category Management:**
  - Create and read categories.
- **Cart Management:**
  - Add, remove, and update items in a user's cart.
  - Retrieve the user's cart.
- **Authentication:**
  - User login with JWT generation.
- **Shopping List App:**
  - Add, update, and delete shopping list items.
  - Item search functionality.
  - Mark items as "Out of Stock".
  - Sort by category.
  - Add/remove items from cart.
  - Local-first cart persistence before syncing with the server.

## Technologies

- Next.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken (JWT)
- (Potentially add client-side state management library like Redux, Zustand, or Context API if used)

## Installation

1. Clone the repository:

```bash
git clone [https://github.com/your-username/your-repo.git](https://github.com/your-username/your-repo.git)  # Replace with your repo URL
```

2. Navigate to the project directory:

```bash
cd your-repo
```

3. Install dependencies:

```bash
npm install # Or yarn install
```

## Create a .env file:

3.Create a .env file in the root directory and add your environment variables:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# ... other environment variables
```

Usage

1. Start the development server:

```bash
npm run dev # Or yarn dev
```

2. Access the API endpoints at http://localhost:3000/api/...

3. Access the Shopping List App (if it has a separate frontend) at http://localhost:3000 (or the appropriate port).
   API Endpoints
   This section provides a brief overview of the API endpoints. Refer to the code for detailed information on request/response formats.

## API Endpoints

This section provides a brief overview of the API endpoints. Refer to the code for detailed information on request/response formats.

**Users:**

- GET /api/users: Retrieve all users.
- POST /api/users: Create a new user.
- PATCH /api/users: Update a user.
- DELETE /api/users: Delete a user.

**Products:**

- GET /api/products: Retrieve products (with search, filter, pagination, and sorting).
- POST /api/products: Create a new product.
- GET /api/products/[id]: Retrieve a specific product.
- PATCH /api/products/[id]: Update a specific product.
- DELETE /api/products/[id]: Delete a specific product.

**Categories:**

- GET /api/categories: Retrieve all categories.
- POST /api/categories: Create a new category.
- GET /api/categories/[id]/products: Retrieve products by category.

**Cart:**

- GET /api/cart: Retrieve the user's cart.

- POST /api/cart: Update the user's cart.

**Authentication:**

POST /api/auth/login: User login.

## Shopping List App

This application allows users to manage their shopping lists efficiently. It includes the following features:

- **Add Item:** Add new items to the shopping list, specifying details like name, category, and quantity.
- **Update Item:** Modify existing items on the list.
- **Delete Item:** Remove items from the list.
- **Search:** Quickly find items by name.
- **Out of Stock:** Mark items as "Out of Stock" to indicate they are currently unavailable.
- **Sort by Category:** Organize the shopping list by category for easier navigation.
- **Add to Cart:** Move items from the shopping list to the user's cart.
- **Local Cart Persistence:** The cart is stored locally in the browser's local - storage, ensuring that items are not lost if the user refreshes the page or closes the browser. The local cart can be synced with the server when the user logs in or updates the cart.
