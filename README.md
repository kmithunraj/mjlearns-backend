# Workshops and Courses Backend

Production-style backend built with Express, PostgreSQL, and Sequelize for email/password auth, course/workshop registration, and Razorpay payments.

## Tech Stack

- Node.js + Express
- PostgreSQL + Sequelize ORM (migrations only, no `sync()`)
- Razorpay payment integration
- bcrypt password hashing
- JWT authentication
- Joi request validation
- Rate limiting (`express-rate-limit`) on auth routes

## Project Structure

`src/`
- `config/` logger, mailer, Razorpay client
- `controllers/` route handlers
- `middleware/` auth, role guard, validation, error handlers
- `models/` Sequelize models + associations
- `routes/` feature routes
- `services/` business logic
- `utils/` reusable helpers

`migrations/` Sequelize migration files

## Setup

1. Copy `.env.example` to `.env`
2. Install dependencies:
   - `npm install`
3. Run migrations:
   - `npm run db:migrate`
4. Start server:
   - `npm run dev`

Base URL: `http://localhost:4000/api`

## Authentication Flow

1. `POST /auth/register` with `email` + `password` (min 8 chars) — creates user, returns JWT.
2. `POST /auth/login` with `email` + `password` — returns JWT.
3. If a user row existed from the old OTP flow with no password yet, the first successful `register` with that email sets the password and signs them in.

## API Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`

### User
- `GET /courses`
- `GET /workshops`
- `POST /register` (JWT required)

### Payment
- `POST /payment/create-order` (JWT required)
- `POST /payment/verify` (JWT required)

### Admin (JWT + admin role required)
- `GET /admin/users?page=1&limit=20`
- `GET /admin/registrations?page=1&limit=20`
- `GET /admin/courses`
- `GET /admin/workshops`
- `POST /admin/course`
- `POST /admin/workshop`

## Registration + Payment Flow

1. User creates registration (`POST /register`) for either course or workshop.
2. Backend checks capacity against paid registrations.
3. User creates Razorpay order (`POST /payment/create-order`).
4. Backend stores `razorpayOrderId`.
5. Client submits payment identifiers and signature to `POST /payment/verify`.
6. Backend verifies signature and marks registration `paid` (or `failed` if invalid).

## Notes for Production

- Use real SMTP provider and verified sender.
- Restrict `CORS_ORIGIN` to trusted domains.
- Set strong `JWT_SECRET`.
- Add webhook verification for Razorpay as additional reconciliation.
- Configure structured logs and central monitoring.
