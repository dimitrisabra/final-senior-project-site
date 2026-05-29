# 🍽️ AKU Smart Cafeteria

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, full-stack cafeteria ordering and management platform built for AKU university.

[Features](#-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure)

</div>

---

## 📋 Project Overview

**Smart Cafeteria** is a comprehensive university cafeteria platform developed as my final senior-year Computer Science project. This application demonstrates full-stack development expertise, modern web architecture, and practical problem-solving for real-world scenarios.

### 🎯 Key Highlights
- 🏆 **Academic Excellence**: Presented to class as final senior project
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔐 **Secure & Scalable**: Production-ready architecture
- 🤖 **AI Integration**: Smart assistant for user interactions
- 👥 **Multi-role Support**: Student, Admin, and Staff roles

---

## ✨ Features

### 👨‍💼 For Students/Users
- 🔍 **Browse Meals**: Explore today's menu with detailed descriptions
- 🛒 **Easy Ordering**: Seamless cart and checkout experience
- ❤️ **Favorites Management**: Save and quickly reorder favorite meals
- 🤖 **AI Assistant**: Get personalized recommendations and support
- 📱 **Responsive Experience**: Works on desktop, tablet, and mobile

### 👨‍💻 For Administrators
- 📊 **Order Management**: View and manage all orders in real-time
- 🍔 **Menu Management**: Add, edit, and remove menu items
- 📈 **Analytics Dashboard**: Track sales and popular items
- 👥 **User Management**: Manage user accounts and roles
- 📧 **Communication**: Built-in contact and notification system

### 🔧 Technical Features
- ✅ **Contact Form API**: Email integration for inquiries
- 🔐 **Authentication**: Secure user authentication system
- 📡 **RESTful APIs**: Clean, well-documented endpoints
- 💾 **Database Integration**: Persistent data storage
- ⚡ **Performance Optimized**: Fast load times and smooth interactions

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dimitrisabra/final-senior-project-site.git
   cd final-senior-project-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (Optional)
   
   Create a `.env.local` file for the contact form integration:
   ```env
   CONTACT_SENDER_EMAIL=you@example.com
   CONTACT_RECIPIENT_EMAIL=you@example.com
   CONTACT_APP_PASSWORD=your_app_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Visit [`http://localhost:3000`](http://localhost:3000) to see the application

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React, Next.js, TypeScript |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js, Next.js API Routes |
| **Database** | MongoDB / Firebase (configurable) |
| **Authentication** | JWT / NextAuth.js |
| **AI Integration** | OpenAI API |
| **Deployment** | Vercel / AWS |

---

## 📁 Project Structure

```
final-senior-project-site/
├── app/
│   ├── api/                 # API routes
│   │   ├── orders/         # Order management
│   │   ├── menu/           # Menu management
│   │   ├── contact/        # Contact form
│   │   └── admin/          # Admin endpoints
│   ├── components/         # Reusable React components
│   ├── pages/              # Application pages
│   └── styles/             # Global styles
├── public/                 # Static assets
├── .env.local             # Environment variables (local)
├── package.json           # Dependencies
└── README.md              # This file
```

---

## 📖 API Endpoints

### 🍔 Menu API
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add new menu item (Admin)
- `PUT /api/menu/:id` - Update menu item (Admin)
- `DELETE /api/menu/:id` - Delete menu item (Admin)

### 🛒 Orders API
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (Admin)

### 📧 Contact API
- `POST /api/contact` - Submit contact form

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to AWS
- Configure AWS credentials
- Use AWS Amplify or CloudFormation
- Set environment variables in AWS Console

---

## 👨‍💼 Project Details

This project demonstrates:
- ✅ **Full-Stack Development**: Frontend to backend integration
- ✅ **Database Design**: Efficient schema and relationships
- ✅ **API Development**: RESTful design principles
- ✅ **Authentication**: Secure user management
- ✅ **UI/UX Design**: Professional, user-friendly interface
- ✅ **Problem Solving**: Real-world cafeteria management challenges

---

## 📸 Screenshots

| View | Screenshot |
|------|-----------|
| **Menu Page** | Browse all available meals |
| **Admin Dashboard** | Manage orders and menu items |
| **Order Confirmation** | Real-time order tracking |

---

## 🤝 Contributing

This is an academic project, but suggestions and feedback are welcome!

---

## 📄 License

This project is for educational purposes as part of my senior-year Computer Science curriculum.

---

## 📞 Contact & Support

For questions or inquiries:
- 📧 **Email**: Use the contact form in the application
- 💬 **Issues**: Open an issue on GitHub
- 👤 **Author**: [Dimitris Abra](https://github.com/dimitrisabra)

---

<div align="center">

**Made with ❤️ for AKU University**

![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-Educational-blue?style=flat-square)

</div>
