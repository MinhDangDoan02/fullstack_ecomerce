# 🛒 Ecomerce_FullStack

Một website ecommerce fullstack được xây dựng với ReactJS và NodeJS, cho phép người dùng mua sắm, quản lý sản phẩm, đọc blog và tương tác thông qua hệ thống bình luận phân cấp.

---

# 🌟 Tính năng

## 👤 User

* 🔐 Đăng ký / Đăng nhập với JWT Authentication
* 🛍️ Xem danh sách sản phẩm
* ❤️ Wishlist sản phẩm yêu thích
* 🛒 Thêm sản phẩm vào Cart
* 💳 Checkout / Đặt hàng
* 📰 Xem blog
* 💬 Bình luận blog có phân cấp (Nested Comment)
* 👤 Quản lý thông tin cá nhân
* 📦 Xem lịch sử đơn hàng

---

## 🛠️ Admin

* 📦 CRUD sản phẩm
* 👥 Quản lý user
* 📋 Quản lý order
* 📰 Quản lý blog
* 💬 Quản lý bình luận
* 📊 Dashboard thống kê

---

# 🛠️ Công nghệ sử dụng

## Frontend

* ReactJS
* Redux Toolkit
* React Router DOM
* Bootstrap 5
* Axios

---

## Backend

* NodeJS
* ExpressJS
* Prisma ORM
* MySQL
* JWT Authentication
* Multer Upload

---

# 📁 Cấu trúc Project

```txt id="1rrqsv"
Ecomerce_FullStack/
│
├── backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# 🚀 Cài đặt và Chạy Project

## 1. Clone Repository

```bash id="zjl1bi"
git clone https://github.com/yourusername/Ecomerce_FullStack.git
```

---

# ⚙️ Backend Setup

## Cài dependencies

```bash id="12icwp"
cd backend
npm install
```

## Cấu hình .env

```env id="krb8kg"
DATABASE_URL="mysql://root:password@localhost:3306/ecommerce_db"

JWT_SECRET=your_jwt_secret
PORT=5000
```

## Prisma migrate

```bash id="0x9mzr"
npx prisma migrate dev
```

## Run backend

```bash id="pj8jvr"
npm start
```

Backend chạy tại:

```txt id="xwmyd5"
http://localhost:5000
```

---

# 💻 Frontend Setup

## Cài dependencies

```bash id="jlwm5"
cd frontend
npm install
```

## Run frontend

```bash id="jlwm6"
npm start
```

Frontend chạy tại:

```txt id="jlwm7"
http://localhost:3000
```

---

# 🔑 API Features

## Authentication

```txt id="jlwm8"
/register
/login
/profile
```

## Product

```txt id="jlwm9"
/product/list
/product/detail/:id
```

## Cart

```txt id="jlwm10"
/cart
/cart/add
```

## Wishlist

```txt id="jlwm11"
/wishlist
```

## Blog

```txt id="jlwm12"
/blog/list
/blog/comment
```

---

# 📸 Features Overview

* Responsive UI
* JWT Authentication
* Role-based Authorization
* Soft Delete Product
* Nested Comment System
* File Upload
* RESTful API

---

# 👨‍💻 Author

* GitHub: https://github.com/MinhDangDoan02

---
# 📄 License

Project for learning and portfolio purposes.
