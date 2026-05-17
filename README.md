# Shlok Stampwala - 3D Interactive Portfolio 🚀

Welcome to my personal portfolio repository! This is a modern, high-performance, and visually stunning Full-Stack web portfolio built to showcase my projects, skills, and experience as a Creative Developer and Computer Engineering student.

## ✨ Features
* **Immersive 3D Hero Section:** Built with `Three.js` and `@react-three/fiber` featuring a dynamic daytime scene (birds, procedural clouds, glowing sun) and a nighttime scene (twinkling starfield, silver moon).
* **Flawless Dark/Light Mode:** Completely custom CSS-variable driven theme switching that propagates seamlessly across the entire application.
* **Premium Glassmorphism UI:** Elegant, translucent, frosted-glass design language across components (Skills, Projects, Contact).
* **Performant Animations:** Powered by `Framer Motion` for smooth page transitions, scroll-triggered fade-ins, and micro-interactions.
* **Integrated Backend:** A custom `Node.js` + `Express` backend utilizing `Nodemailer` to handle direct emails from the Contact Form without relying on paid third-party API services.

## 🛠️ Tech Stack
**Frontend:**
* React.js (Vite)
* Three.js & React Three Fiber (3D graphics)
* Tailwind CSS (Styling)
* Framer Motion (Animations)
* Lucide React (Icons)

**Backend:**
* Node.js & Express.js
* Nodemailer (Email service integration)
* CORS & Dotenv

## 📂 Project Structure
```text
Portfolio/
├── backend/               # Node.js + Express API server
│   ├── server.js          # Main server & Nodemailer logic
│   ├── .env               # Environment secrets (Email config)
│   └── package.json       # Backend dependencies
├── src/                   # React Frontend
│   ├── components/        # UI Components (Hero, About, Projects, etc.)
│   ├── index.css          # Global CSS variables & Theme logic
│   ├── App.jsx            # Main application layout
│   └── main.jsx           # React DOM rendering
├── public/                # Static assets (Resume, Images)
├── package.json           # Frontend dependencies & Root build scripts
└── vite.config.js         # Vite dev & proxy configuration
```

## 🚀 Getting Started (Local Development)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Installation
Clone the repository and install all dependencies for both the frontend and the backend.
```bash
git clone https://github.com/ShlokStampwala/Portfolio.git
cd Portfolio

# Install root/frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file inside the `backend/` directory and add your email credentials:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
RECIPIENT_EMAIL=your_email@gmail.com
PORT=5000
```
*(Note: Use a 16-character Google App Password, not your real password.)*

### 3. Run the Development Server
You can launch both the React frontend and Express backend concurrently from the root directory:
```bash
# Make sure you are in the root directory (Portfolio/)
npm run dev:full
```
* **Frontend:** `http://localhost:5173`
* **Backend:** `http://localhost:5000`

## 🌍 Deployment (Render)
This project is configured as a Monolith for easy deployment on [Render](https://render.com). The Express backend serves the built static files of the React frontend.

1. Connect the repository to Render as a **Web Service**.
2. **Build Command:** `npm install && npm run build`
3. **Start Command:** `npm start`
4. Add your `.env` variables in Render's "Environment Variables" section.
5. Deploy!

## 🤝 Let's Connect
Feel free to reach out if you'd like to collaborate on exciting projects!
* **LinkedIn:** [Shlok Stampwala](https://www.linkedin.com/in/shlok-stampwala-538785307/)
* **Email:** [shlokstampwala@gmail.com](mailto:shlokstampwala@gmail.com)

---
*Designed & Built by Shlok Stampwala © 2026*
