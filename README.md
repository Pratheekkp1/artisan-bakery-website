# Artisan Bakery Website

A front-end prototype for a small-bakery storefront: a warm, minimalist product "shelf", a cart, and an **in-browser admin mode** that lets the owner manage the menu without touching code.

## Features

**Customer view**
- Product shelf grid with categories, descriptions and prices
- Add-to-cart with a running cart
- Sidebar navigation with smooth-scrolling sections and a contact section

**Admin mode** (demo)
- Add, edit and delete products: name, price, category, description, and an uploaded image or emoji
- Rename the bakery inline
- Edits apply instantly through React state

> This is a UI prototype. Admin access is a client-side demo gate, and data lives in memory. A production version would add a backend (e.g. Supabase or Firebase) for real authentication and persistence.

## Tech

React 18 · Vite · Tailwind CSS · Lucide icons

## Run

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
```
