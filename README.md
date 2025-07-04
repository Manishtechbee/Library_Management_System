# Smart Library Management System- Frontend

A modern, scalable, and role-based library management system built using **React**, **Tailwind CSS**, **Chart.js**, and **Node.js/Express**. This project provides real-time notifications, advanced analytics, QR/Barcode integration, file management, and user-specific dashboards for Admins, Librarians, and Students.

---

## Key Features

### Authentication & Role Management

* Secure JWT-based login and signup system.
* Role-based dashboards:

  * **Admin:** Full system control and analytics.
  * **Librarian:** Book management and user activity tracking.
  * **Student:** Personalized dashboard with borrowed book records and history.

### Real-Time Notifications

* Notifications for overdue books, upcoming due dates, and other critical alerts.
* Real-time updates using WebSocket or polling.
* Toast notifications using React Toastify.

### Advanced Analytics Dashboard

* Interactive charts and graphs using Recharts or Chart.js.
* Detailed insights:

  * Most issued books.
  * Most active users.
  * Issued and returned trends over time.
  * Branch, year, and subject-specific records.
  * Defaulter analysis and overdue reports.
* Export analytics and reports as Excel or PDF.

### QR & Barcode Integration

* Automatic QR/Barcode generation for books and student IDs.
* Integrated webcam scanning for quick data retrieval.

### Search and Filter System

* Advanced book search by title, author, category, and availability.
* React-based filters with debouncing and pagination for smooth experience.

### Dark Mode & Theme Management

* Full dark mode and theme switching support.
* Theme preferences stored in local storage for persistence.

### File Uploads

* Upload book cover images or PDF versions of eBooks.
* Real-time preview of files before submission.

### Export Features

* Export issued books, student activity logs, and defaulter lists to Excel or PDF.
* Allow users to download eBooks, lecture slides, and video tutorials within the application.

### Student Dashboard

* Borrowed book history and summaries.
* Real-time due date alerts.
* Fine tracking and future fine payment integration.
* Book suggestion system with community voting.

### Faculty Dashboard

* Manage recommended reading lists.
* Upload course materials and resources.
* Track student engagement and book usage statistics.

---

## Project Structure

```
src/
│
├── assets/             # Images, logos, static files
├── components/         # Reusable UI components (Navbar, Sidebar, Charts, Cards)
├── layouts/            # Separate layouts for Admin, Faculty, and Student dashboards
├── hooks/              # Custom hooks (e.g., useAuth)
├── pages/              # Route pages (Home, Login, Dashboards, Analytics, etc.)
├── utils/              # Utility functions (API services, role handlers, etc.)
├── App.jsx             # Main application routes and layout rendering
└── index.css           # Global styles
```

---

## Tech Stack

* **Frontend:** React, Tailwind CSS, Chart.js, Framer Motion
* **Backend:** Node.js, Express (not part of this repository)
* **Authentication:** JWT-based secure token system
* **State Management:** React Context API
* **Routing:** React Router v6
* **Notifications:** React Toastify
* **QR/Barcode:** QRCode.react, react-webcam
* **Export Tools:** xlsx, jsPDF
* **Deployment:** Vite development server

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-library-management.git
cd smart-library-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Backend Setup

Ensure you have a Node.js/Express backend running that handles:

* Authentication
* Role-based API access
* Book, user, and file management

---

## Folder Breakdown for Role-Based Dashboards

* **Admin Dashboard**

  * Full system controls
  * Sidebar: Analytics, Book Management, User Management, Notifications, Export

* **Librarian Dashboard**

  * Book issuance and returns
  * Sidebar: Book Management, Notifications, Search

* **Student Dashboard**

  * Personal activity, book suggestions
  * Sidebar: My Books, Suggested Books, Notifications

---

## Additional Notes

* This project is designed for scalability and can be extended with:

  * Fine payment integrations
  * LMS features for faculty
  * Offline QR code scanning
* Backend API structure and database design should align with the role-based architecture and real-time update requirements.

---






# Smart Library Management System - Backend (Node.js/Express)

This is the backend API for the Smart Library Management System, providing secure authentication, role-based access control, book and user management, file handling, and real-time features.

---

## Tech Stack

* **Node.js** with **Express**
* **MongoDB** with **Mongoose**
* **JWT** for authentication
* **bcrypt** for password hashing
* **Multer** for file uploads
* **WebSocket / Socket.IO** for real-time notifications
* **CORS** enabled for frontend integration

---

## Project Structure

```
backend/
│
├── controllers/       # Business logic for routes
├── middleware/        # Auth, role, and error handling middleware
├── models/            # Mongoose schemas (User, Book, Issuance, Suggestion)
├── routes/            # API route definitions
├── uploads/           # Uploaded files (book images, PDFs)
├── utils/             # Helper functions (token generation, QR utilities)
├── server.js          # Entry point of the server
├── .env               # Environment variables
└── package.json
```

---

## Key Features

### Authentication & Role Management

* JWT-based login and signup
* Secure password hashing with bcrypt
* Role-based access: Admin, Librarian, Student

### Book & Issuance Management

* Add, update, delete books
* Book issuance, return, and due date tracking
* Automatic fine calculation (optional)

### File Uploads

* Upload book cover images and PDF eBooks
* Files stored in `uploads/` directory or cloud storage (extendable)

### QR/Barcode Support

* Generate QR/Barcode for books and student IDs (utility provided)
* Data retrievable through scan endpoints

### Real-Time Notifications

* WebSocket (Socket.IO) based notifications for:

  * Overdue books
  * Book return reminders
  * System announcements

### Book Suggestions & Voting

* Students can suggest books
* Voting system for suggestion prioritization

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-library-backend.git
cd smart-library-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the Server

```bash
npm run dev
```

---

## Example API Routes

### Authentication

* `POST /api/auth/register` — User registration
* `POST /api/auth/login` — User login
* `GET /api/auth/profile` — Get user profile (protected)

### Books

* `GET /api/books` — Get all books
* `POST /api/books` — Add new book (Admin/Librarian)
* `PUT /api/books/:id` — Update book details
* `DELETE /api/books/:id` — Remove book

### Issuance

* `POST /api/issuance/issue` — Issue book to user
* `POST /api/issuance/return` — Mark book as returned
* `GET /api/issuance/history/:userId` — Get user's book history

### Suggestions

* `POST /api/suggestions` — Suggest a new book
* `PUT /api/suggestions/vote/:id` — Vote for a suggestion
* `GET /api/suggestions` — List all suggestions

### Notifications (Example)

* WebSocket events:

  * `overdue_alert`
  * `book_due_reminder`
  * `system_announcement`

---

## Suggested Enhancements

* Fine payment gateway integration
* Admin analytics endpoints (most issued books, defaulters, etc.)
* Email/SMS reminders
* Cloud storage for files (AWS S3, Cloudinary)
* Secure file serving for PDFs and eBooks

---

## Notes

* Frontend must send JWT token in `Authorization` header for protected routes.
* CORS configured to allow requests from your frontend domain.
* Database design accommodates role-specific features.
* Extendable for LMS or faculty performance tracking.
