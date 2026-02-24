🏥 Schedula Backend API

A scalable backend API for managing Doctors, Patients, and Users, built using NestJS, TypeORM, and JWT Authentication.

This project was developed as part of a backend internship to implement real-world API architecture, authentication, and relational database modeling.

🚀 Tech Stack

NestJS – Scalable Node.js backend framework

TypeScript

TypeORM

PostgreSQL

JWT Authentication

Passport.js

Jest (E2E testing)

📌 Features
🔐 Authentication & Authorization

User Signup

User Login

JWT-based authentication

Role-based access control

Protected routes using JWT Guards

👨‍⚕️ Doctor Management

Create doctor

Update doctor

Retrieve doctor data

🧑‍⚕️ Patient Management

Create patient

Retrieve patient details

Associate patients with doctors

🗄 Database & Migrations

Entity-based schema design

TypeORM configuration

Versioned database migrations

Role column migration support

🧪 Testing

E2E testing scaffold using Jest

🏗 Architecture Overview

The application follows a modular architecture:
src/
│
├── config/               # TypeORM configuration
├── entities/             # Database entities
├── migrations/           # Version-controlled DB migrations
├── modules/
│   ├── auth/             # Authentication module
│   ├── doctor/           # Doctor module
│   └── patient/          # Patient module
│
└── main.ts               # Application bootstrap
Design Principles Used:

Separation of concerns

DTO-based request validation

Service-based business logic

Guard-based route protection

Migration-driven schema evolution

🗄 Database Entities
User

id

email

password (hashed)

role

Doctor

id

name

specialization

associated user (optional)

Patient

id

name

associated doctor

medical details

🔐 Authentication Flow

User registers via Signup endpoint

Password is securely stored

User logs in

JWT token is generated

Protected routes require valid JWT

Role-based checks restrict access where needed

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/ki3ki/schedula-backend.git
cd schedula-backend
2️⃣ Install Dependencies
npm install
3️⃣ Configure Environment Variables

Create a .env file:
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=schedula
JWT_SECRET=your_secret_key
4️⃣ Run Database Migrations
npm run typeorm migration:run
5️⃣ Start Development Server
npm run start:dev
Server will run on:
http://localhost:3000
📡 API Modules
Auth Module

POST /auth/signup

POST /auth/login

Doctor Module

POST /doctor

GET /doctor

PATCH /doctor/:id

Patient Module

POST /patient

GET /patient

(Exact routes may vary based on implementation.)
