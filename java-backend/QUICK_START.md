# MITRA Java Backend - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Start MySQL with XAMPP

1. Open XAMPP Control Panel
2. Click "Start" next to MySQL
3. You should see "MySQL" service running (check logs)

### Step 2: Create Database

1. Open http://localhost/phpmyadmin
2. Click "New" or create a new database named `mitra_db`
3. Click the SQL tab
4. Copy and paste entire content from `database-setup.sql`
5. Click "Go" or "Execute"

### Step 3: Build and Run Backend

```bash
cd f:\Mitra\MITRA\java-backend
mvn clean install
mvn tomcat7:run
```

Wait for the message: **"Server startup in X ms"**

The backend is now running at: `http://localhost:8080`

### Step 4: Test the API

Use Postman (import `MITRA_API.postman_collection.json`) or use cURL:

```bash
curl -X POST http://localhost:8080/api/student/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "rollNo": "ROLL001",
    "course": "Computer Science"
  }'
```

## 📝 Configuration

### Update Database Password (if needed)

Edit: `src/main/resources/database.properties`

```properties
db.url=jdbc:mysql://localhost:3306/mitra_db
db.username=root
db.password=your_xampp_password  # Leave empty if default
```

### Change JWT Secret (for production)

Edit: `src/main/resources/database.properties`

```properties
jwt.secret=your_new_secret_key_here
```

## 🔗 API Base URL

```
http://localhost:8080
```

All endpoints follow this pattern:

- `/api/student/*` - Student operations
- `/api/teacher/*` - Teacher operations
- `/api/admin/*` - Admin operations

## 📊 Database Structure

| Table    | Columns                                                                             |
| -------- | ----------------------------------------------------------------------------------- |
| students | id, name, email, password, roll_no, course, created_at, updated_at                  |
| teachers | id, name, email, password, employee_id, department, subject, created_at, updated_at |
| admins   | id, name, email, password, admin_id, created_at, updated_at                         |

## 🛠️ Troubleshooting

| Problem            | Solution                                  |
| ------------------ | ----------------------------------------- |
| MySQL not running  | Start MySQL in XAMPP Control Panel        |
| Port 8080 in use   | Edit pom.xml or kill process on port 8080 |
| Build errors       | Run `mvn clean install` again             |
| Connection timeout | Check database.properties configuration   |
| 404 errors         | Ensure server is running on port 8080     |

## 🎯 Next Steps

1. ✅ **Test all endpoints** with Postman collection
2. 🔄 **Update frontend** to point to `http://localhost:8080/api`
3. 🔐 **Implement token** validation on frontend
4. 📦 **Deploy** to production server

## 📚 File Structure

```
java-backend/
├── pom.xml                          # Dependencies & build config
├── database-setup.sql               # SQL database script
├── README.md                        # Full documentation
├── QUICK_START.md                   # This file
├── MITRA_API.postman_collection.json # Postman test collection
└── src/main/java/com/mitra/
    ├── servlet/                     # API endpoints (18 servlets)
    ├── model/                       # Data models (3 classes)
    ├── dao/                         # Database access (3 DAOs)
    └── util/                        # Utilities (JWT, Password, DB, JSON, CORS)
```

## 🧪 Example API Calls

### Student Signup

```bash
POST http://localhost:8080/api/student/signup
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "securepass123",
  "rollNo": "CS2024001",
  "course": "Computer Science"
}
```

### Student Login

```bash
POST http://localhost:8080/api/student/login
{
  "email": "alice@example.com",
  "password": "securepass123"
}
```

### Get All Students

```bash
GET http://localhost:8080/api/student
```

## 🔒 Security Features

✅ Password hashing with BCrypt  
✅ JWT token authentication  
✅ CORS enabled for frontend  
✅ Input validation  
✅ Connection pooling with HikariCP  
✅ Prepared statements (prevents SQL injection)

## ❓ Common Questions

**Q: Where is my data stored?**  
A: In MySQL database via XAMPP on `localhost:3306`

**Q: How do I change the API port?**  
A: Edit pom.xml, find `<port>8080</port>` and change it

**Q: Can I deploy this to cloud?**  
A: Yes, WAR file can be deployed to any Tomcat server

**Q: Where are the logs?**  
A: Check console output or Tomcat logs directory

## 💡 Pro Tips

1. Always start MySQL before running the backend
2. Use Postman collection for quick testing
3. Keep JWT secret secure in production
4. Monitor database connections in production
5. Back up your database regularly

---

**Ready to go!** Start the services and test your API. 🎉
