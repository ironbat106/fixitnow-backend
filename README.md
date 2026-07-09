# FixItNow Backend API
 
FixItNow is a backend REST API for a home service marketplace. Customers can browse services, book technicians, pay through Stripe, track bookings, and leave reviews. Technicians can manage their service profile, availability, services, and booking status. Admins can manage users, bookings, payments, and service categories.
 
## Live Submission Links
 
Backend Repo     : https://github.com/ironbat106/fixitnow-backend
Live API         : https://fixitnow-backend-rust.vercel.app
API Docs         : https://github.com/ironbat106/fixitnow-backend/tree/main/postman
Demo Video       : https://drive.google.com/file/d/1Yy99WfNza-BYuDeRdvOdQSM0c5r5oD11/view?usp=sharing
Admin Email      : admin@fixitnow.com
Admin Password   : admin123
 
## Tech Stack
 
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT authentication
- Zod validation
- Stripe Checkout payment
- Vercel deployment
 
## User Roles
 
- CUSTOMER: browse services, book technicians, pay for accepted bookings, track bookings, leave reviews.
- TECHNICIAN: update profile, set availability, manage own services, accept/decline jobs, mark jobs in progress/completed.
- ADMIN: manage users, categories, bookings, and payments.
 
## Main Features
 
- User registration and login with JWT.
- Role-based route protection for customer, technician, and admin.
- Public category, service, and technician browsing.
- Service filtering by search term, category, location, price, page, limit, sortBy, and sortOrder.
- Technician filtering by search term, skill, location, rating, page, limit, sortBy, and sortOrder.
- Booking flow: REQUESTED -> ACCEPTED/DECLINED -> PAID -> IN_PROGRESS -> COMPLETED.
- Stripe Checkout payment after technician accepts a booking.
- Stripe webhook updates payment status and booking status.
- Review system after completed jobs.
- Structured error response format.
- Zod input validation.
 
## Admin and Demo Credentials
 
Admin:
- Email: admin@fixitnow.com
- Password: admin123
 
Seeded customer:
- Email: customer@fixitnow.com
- Password: customer123
 
Seeded technician:
- Email: technician@fixitnow.com
- Password: technician123
 
Seeded demo service ID:
- 11111111-1111-4111-8111-111111111111
