# 🛒 Order Management System

##  Project Overview
This is a full-stack order management system built using:
- Next.js (Frontend)
- Node.js + Express (Backend)
- MySQL (Database)
- Socket.IO (Real-time updates)

---

##  Features

- Create new orders
- View orders by store
- Update order status
- Real-time updates using WebSockets
- Analytics dashboard (orders, revenue, top products)

---

##  Project Structure

frontend/ → Next.js application  
backend/ → Node.js API server  

---

## API Endpoints

- POST /orders → Create order  
- GET /orders?store_id= → Get orders  
- PATCH /orders/:id/status → Update status  

---

##  How to Run Project

### Backend
```bash id="r3"
npm install
npm start