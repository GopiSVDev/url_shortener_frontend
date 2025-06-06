# 🌐 URL Shortener Frontend 🚀

> A responsive React frontend for a complete URL shortening service. Create, manage, and analyze your links with ease. 🔗

---

## 📺 Live Demo

👉 **Check it out here:**  
🔗 [Shortener Frontend](https://url-shortener-frontend-lilac.vercel.app)

---

## ✨ Features ⭐

- 🔒 **User Authentication**: Sign up and log in with secure JWT-based authentication.
- 🔗 **URL Shortening**: Generate short links from long URLs. Optionally specify custom codes and expiration dates.
- 🗂️ **Link Management**: View, edit, and delete your short URLs in a clear dashboard.
- 📊 **Analytics Dashboard**: Track click counts, timestamps, geolocation (country, city), and device information for each link.
- 📱 **QR Code Generation**: Generate QR codes for your short URLs.
- 📱 **Responsive Design**: Mobile-first user interface built with Tailwind CSS.
- 🚨 **Robust Error Handling**: Loading indicators, validation feedback, and friendly error messages.

---

## 🛠️ Tech Stack 💻

| Category             | Technology                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------- |
| **Framework**        | React (TypeScript)                                                                        |
| **Build Tool**       | Vite                                                                                      |
| **Styling**          | Tailwind CSS                                                                              |
| **Routing**          | React Router                                                                              |
| **State Management** | React Context + Hooks                                                                     |
| **Authentication**   | JWT stored in `localStorage`                                                              |
| **Linting**          | ESLint + Prettier                                                                         |
| **Backend API**      | Spring Boot ([see backend code here](https://github.com/GopiSVDev/url_shortener_backend)) |

---

## 🚀 Installation & Setup 🔧

1. **Clone the Repository** 📥

   ```bash
   git clone https://github.com/GopiSVDev/url_shortener_frontend.git
   cd url_shortener_frontend
   ```

2. **Install Dependencies** 📥

   ```bash
   npm install
   ```

3. **Configure Environment Variables** 🛠️

   - Copy the example file:

     ```bash
     cp .env.example .env
     ```

   - Set the backend URL in `.env`:

     ```dotenv
     VITE_API_BASE_URL=http://localhost:8080
     ```

4. **Run the Development Server** 🏃‍♂️

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) to view the app.

5. **Build for Production** 📦

   ```bash
   npm run build
   ```

   Deploy the contents of the `dist/` directory to your hosting platform.

---

## 🔗 API Integration 🌐

The frontend communicates with the following backend endpoints (prefix with `VITE_API_BASE_URL`):

| Endpoint                  | Method | Description                                                             |
| ------------------------- | ------ | ----------------------------------------------------------------------- |
| `/auth/signup`            | POST   | 🛂 Register a new user (`{ username, password }`).                      |
| `/auth/login`             | POST   | 🔑 Authenticate user (`{ username, password }`). Returns JWT.           |
| `/shorten`                | POST   | ✂️ Create a short URL (`{ url, customCode?, expirationDate? }`).        |
| `/{shortCode}`            | GET    | 🔄 Redirect to original URL (handled by backend).                       |
| `/users/urls`             | GET    | 📦 Get all URLs for the authenticated user.                             |
| `/user/urls/{code}`       | PUT    | 📝 Update URL, Custom code or Expiration (`{ url?, expirationDate? }`). |
| `/user/urls/{code}`       | DELETE | 🗑️ Delete a specific short URL.                                         |
| `/user/urls/{code}/stats` | GET    | 📈 Get analytics data (click count, events).                            |

> **Note:** All `/user/*` routes require an `Authorization: Bearer <JWT>` header.

---

## 🔒 Security & Best Practices 🔐

- **JWT Storage**: 🔑 Tokens are stored in `localStorage` for persistent sessions.
- **Protected Routes**: 🛡️ Only authenticated users can access the dashboard and related pages.
- **CORS**: 🌐 Ensure backend is configured to allow requests from the frontend’s origin.
- **Input Validation**: ✅ Client-side validation for URLs and form inputs.
- **Error Feedback**: 🚨 Clear error messages and fallback UI for API errors.

---
