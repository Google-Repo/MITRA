# MITRA Java Backend

This is a Java Servlet-based backend for the MITRA system, replacing the previous Node.js/MongoDB setup.

## Prerequisites

- **Java 11 or higher**
- **Apache Maven 3.6 or higher**
- **Apache Tomcat 9 or higher** (for deployment)
- **MySQL 5.7 or higher**
- **XAMPP** (recommended for local MySQL setup)

## Installation & Setup

### 1. Database Setup with XAMPP

1. Install XAMPP from https://www.apachefriends.org/
2. Start XAMPP Control Panel and start MySQL
3. Open phpMyAdmin: http://localhost/phpmyadmin
4. Create a new database or run the SQL script:
   - Go to the SQL tab and paste contents of `database-setup.sql`
   - Click Execute

### 2. Configure Database Connection

Edit `src/main/resources/database.properties`:

```properties
db.driver=com.mysql.cj.jdbc.Driver
db.url=jdbc:mysql://localhost:3306/mitra_db?useSSL=false&serverTimezone=UTC
db.username=root
db.password=your_password_here
```

**Default XAMPP MySQL credentials:**

- Username: `root`
- Password: `` (empty by default)

### 3. Build the Project

```bash
cd java-backend
mvn clean install
```

### 4. Deploy to Tomcat

#### Option A: Using Maven Plugin

```bash
mvn tomcat7:run
```

The server will start at: http://localhost:8080

#### Option B: Manual Deployment

1. Build the WAR file:

   ```bash
   mvn clean package
   ```

2. Copy `target/mitra-backend-1.0.0.war` to Tomcat's `webapps` folder:

   ```
   TOMCAT_HOME/webapps/
   ```

3. Rename it to `ROOT.war` for root context or keep as is
4. Start Tomcat

## API Endpoints

### Student Endpoints

- **POST** `/api/student/signup` - Register new student
- **POST** `/api/student/login` - Login student
- **GET** `/api/student` - Get all students
- **GET** `/api/student/get?id=1` - Get student by ID
- **PUT** `/api/student/update?id=1` - Update student
- **DELETE** `/api/student/delete?id=1` - Delete student

### Teacher Endpoints

- **POST** `/api/teacher/signup` - Register new teacher
- **POST** `/api/teacher/login` - Login teacher
- **GET** `/api/teacher` - Get all teachers
- **GET** `/api/teacher/get?id=1` - Get teacher by ID
- **PUT** `/api/teacher/update?id=1` - Update teacher
- **DELETE** `/api/teacher/delete?id=1` - Delete teacher

### Admin Endpoints

- **POST** `/api/admin/signup` - Register new admin
- **POST** `/api/admin/login` - Login admin
- **GET** `/api/admin` - Get all admins
- **GET** `/api/admin/get?id=1` - Get admin by ID
- **PUT** `/api/admin/update?id=1` - Update admin
- **DELETE** `/api/admin/delete?id=1` - Delete admin

## Request/Response Examples

### Student Signup

**Request:**

```json
POST /api/student/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "rollNo": "ROLL001",
  "course": "Computer Science"
}
```

**Response:**

```json
{
  "message": "Student registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "rollNo": "ROLL001",
    "course": "Computer Science"
  }
}
```

### Student Login

**Request:**

```json
POST /api/student/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "student": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "rollNo": "ROLL001",
    "course": "Computer Science"
  }
}
```

## Project Structure

```
java-backend/
├── pom.xml                          # Maven configuration
├── database-setup.sql               # MySQL database setup script
├── README.md                        # This file
├── src/
│   ├── main/
│   │   ├── java/com/mitra/
│   │   │   ├── servlet/            # Servlet classes (API endpoints)
│   │   │   ├── model/              # Entity classes (Student, Teacher, Admin)
│   │   │   ├── dao/                # Data Access Objects (StudentDAO, TeacherDAO, AdminDAO)
│   │   │   └── util/               # Utility classes (JWT, Password hashing, DB connection)
│   │   ├── resources/
│   │   │   └── database.properties  # Database configuration
│   │   └── webapp/
│   │       └── WEB-INF/
│   │           └── web.xml         # Servlet configuration
│   └── test/                        # Test files (optional)
└── target/                          # Compiled output (generated)
```

## Key Features

- **JWT Authentication**: Token-based authentication for all users
- **Password Hashing**: BCrypt for secure password storage
- **Database Connection Pooling**: HikariCP for efficient database connections
- **CORS Support**: Cross-Origin Resource Sharing enabled
- **Error Handling**: Comprehensive error handling with meaningful messages
- **JSON API**: RESTful API with JSON request/response

## Troubleshooting

### MySQL Connection Error

- Ensure XAMPP MySQL is running
- Check `database.properties` configuration
- Verify database name exists

### Cannot Find Symbol Errors

- Run `mvn clean install` to download dependencies
- Ensure Java 11+ is installed

### Port Already in Use (8080)

- Change port in `pom.xml` (tomcat7-maven-plugin configuration)
- Or kill the process using port 8080

## Next Steps

1. Update frontend API URLs from `/api/...` to point to this Java backend
2. Test all endpoints using Postman or cURL
3. Implement JWT token validation middleware on frontend
4. Deploy to production server with XAMPP/MySQL

## Security Notes

⚠️ **Important for Production:**

- Change JWT secret in `database.properties`
- Use HTTPS instead of HTTP
- Implement proper authentication middleware
- Add input validation
- Use prepared statements (already done in this code)
- Keep dependencies updated
- Implement rate limiting

## Support

For issues or questions, refer to:

- Java Servlet API: https://tomcat.apache.org/
- MySQL Documentation: https://dev.mysql.com/doc/
- JWT Library: https://github.com/auth0/java-jwt
