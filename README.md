# DevMatcher Backend

A Node.js backend API for a developer matching platform built with Express.js and MongoDB.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **User Management**: Create and manage user profiles
- **Password Security**: Bcrypt-based password hashing
- **Data Validation**: Comprehensive input validation using validator.js
- **Cookie Management**: Secure cookie handling for authentication
- **MongoDB Integration**: Mongoose ODM for database operations

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt for password hashing, cookie-parser for secure sessions
- **Validation**: Validator.js for input validation
- **Development**: Nodemon for auto-restart during development

## 📁 Project Structure

```
BE/
├── config/
│   └── db.js              # Database connection configuration
├── models/
│   ├── connection.js        # MongoDB connection setup
│   └── user.js            # User model schema
├── routes/
│   ├── authRouter.js      # Authentication routes (signup, login, logout)
│   └── userRoutes.js      # User management routes
├── utils/
│   ├── helper.js          # Validation and utility functions
│   └── middleware.js      # Custom middleware functions
├── constants.js           # Application constants (JWT labels, cookie options)
├── index.js               # Main application entry point
├── .env                   # Environment variables
└── package.json           # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/devmatcher
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on your system or use a cloud instance like MongoDB Atlas.

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm start
   
   # Or directly with Node.js
   node index.js
   ```

The server will start on the port specified in your `.env` file (default: 3000).

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

- **POST** `/api/auth/signup` - Register a new user
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "age": 25,
    "gender": "male"
  }
  ```

- **POST** `/api/auth/login` - Login existing user
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```

- **POST** `/api/auth/logout` - Logout user (clears JWT cookie)

### User Routes (`/api/user`)

- **GET** `/api/user/feed` - Get user feed (protected route)

## 🧪 Validation Rules

### User Signup Validation
- **Email**: Must be a valid email format
- **Password**: Minimum 8 characters (validation rules commented out in helper.js)
- **First Name**: 2-30 characters required
- **Last Name**: 2-30 characters required
- **Age**: Must be a number between 13-120
- **Gender**: Must be one of: "male", "female", or "other"

## 🔧 Development

### Available Scripts

- `npm start` - Start development server with nodemon
- `npm test` - Run tests (placeholder script)

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `NODE_ENV` | Environment mode | `development` |

## 🐛 Common Issues

1. **MongoDB Connection Errors**: Ensure MongoDB is running and the connection string is correct
2. **JWT Token Issues**: Check that `JWT_SECRET` is properly set in your `.env` file
3. **Port Already in Use**: Change the `PORT` in `.env` or kill the process using the port
4. **Validation Errors**: Check the validation rules in `utils/helper.js`

## 📋 API Documentation

The API follows RESTful conventions and returns JSON responses:

- **Success Response**: `200 OK` with JSON data
- **Error Response**: `400 Bad Request` with error details
- **Authentication Required**: `401 Unauthorized` for protected routes

### Error Response Format
```json
{
  "error": "Error message here"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ using Node.js, Express.js, and MongoDB**