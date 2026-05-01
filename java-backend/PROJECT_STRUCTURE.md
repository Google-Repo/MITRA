# MITRA Java Backend - Project Structure

## Complete Directory Layout

```
f:\Mitra\MITRA\java-backend\
│
├── 📄 pom.xml                                    # Maven configuration (18 dependencies)
├── 📄 database-setup.sql                        # MySQL database creation script
├── 📄 MIGRATION_SUMMARY.md                      # This migration summary
├── 📄 README.md                                 # Complete documentation
├── 📄 QUICK_START.md                            # 5-minute quick start guide
├── 📄 FRONTEND_INTEGRATION.md                   # Frontend code updates needed
├── 📄 MITRA_API.postman_collection.json        # Postman test collection
│
└── src/
    ├── main/
    │   ├── java/com/mitra/
    │   │   │
    │   │   ├── servlet/                         # [6 Servlets] - Student CRUD
    │   │   │   ├── StudentSignupServlet.java
    │   │   │   ├── StudentLoginServlet.java
    │   │   │   ├── StudentGetByIdServlet.java
    │   │   │   ├── StudentGetAllServlet.java
    │   │   │   ├── StudentUpdateServlet.java
    │   │   │   └── StudentDeleteServlet.java
    │   │   │
    │   │   ├── servlet/                         # [6 Servlets] - Teacher CRUD
    │   │   │   ├── TeacherSignupServlet.java
    │   │   │   ├── TeacherLoginServlet.java
    │   │   │   ├── TeacherGetByIdServlet.java
    │   │   │   ├── TeacherGetAllServlet.java
    │   │   │   ├── TeacherUpdateServlet.java
    │   │   │   └── TeacherDeleteServlet.java
    │   │   │
    │   │   ├── servlet/                         # [6 Servlets] - Admin CRUD
    │   │   │   ├── AdminSignupServlet.java
    │   │   │   ├── AdminLoginServlet.java
    │   │   │   ├── AdminGetByIdServlet.java
    │   │   │   ├── AdminGetAllServlet.java
    │   │   │   ├── AdminUpdateServlet.java
    │   │   │   └── AdminDeleteServlet.java
    │   │   │
    │   │   ├── model/                           # [3 Models] - Data entities
    │   │   │   ├── Student.java                 # Properties: id, name, email, password, rollNo, course, createdAt
    │   │   │   ├── Teacher.java                 # Properties: id, name, email, password, employeeId, department, subject, createdAt
    │   │   │   └── Admin.java                   # Properties: id, name, email, password, adminId, createdAt
    │   │   │
    │   │   ├── dao/                             # [3 DAOs] - Database access
    │   │   │   ├── StudentDAO.java              # Methods: create, login, getById, getAll, update, delete, emailExists
    │   │   │   ├── TeacherDAO.java              # Same methods as StudentDAO
    │   │   │   └── AdminDAO.java                # Same methods as StudentDAO
    │   │   │
    │   │   └── util/                            # [5 Utilities] - Helper classes
    │   │       ├── DBConnection.java            # HikariCP connection pool, getConnection()
    │   │       ├── JWTUtil.java                 # generateToken(), verifyToken(), getUserIdFromToken(), getRoleFromToken()
    │   │       ├── PasswordUtil.java            # hashPassword(), verifyPassword() using BCrypt
    │   │       ├── CORSFilter.java              # CORS configuration for frontend access
    │   │       └── JsonUtil.java                # parseRequestBody(), toJson(), fromJson()
    │   │
    │   ├── resources/
    │   │   └── database.properties               # DB configuration (URL, username, password, pool settings, JWT secret)
    │   │
    │   └── webapp/
    │       └── WEB-INF/
    │           └── web.xml                      # Servlet mappings for all 18 endpoints + CORS filter
    │
    └── test/                                     # Test files (optional, empty)
```

## 📊 Statistics

| Category               | Count  |
| ---------------------- | ------ |
| Java Servlet Classes   | 18     |
| Model Classes          | 3      |
| DAO Classes            | 3      |
| Utility Classes        | 5      |
| **Total Java Classes** | **29** |
| Database Tables        | 3      |
| Maven Dependencies     | 18     |
| API Endpoints          | 18     |
| Documentation Files    | 5      |

## 🔗 File Relationships

```
Request to /api/student/signup
    ↓
web.xml maps to StudentSignupServlet
    ↓
StudentSignupServlet
    ├─→ calls JsonUtil.parseRequestBody()
    ├─→ calls StudentDAO.createStudent()
    │   └─→ calls DBConnection.getConnection()
    │   └─→ calls PasswordUtil.hashPassword()
    └─→ calls JWTUtil.generateToken()
    ↓
Returns JSON response
```

## 📝 Key Files Explained

### 1. **pom.xml**

- Defines all Maven dependencies (MySQL, JWT, BCrypt, etc.)
- Configures Tomcat plugin for easy running
- Sets Java version to 11

### 2. **database-setup.sql**

- Creates database: `mitra_db`
- Creates 3 tables: students, teachers, admins
- Adds indexes for performance

### 3. **database.properties**

- MySQL connection: `localhost:3306/mitra_db`
- Credentials: `root` (user), empty password (default XAMPP)
- JWT secret and expiration settings

### 4. **web.xml**

- Maps all 18 servlet endpoints
- Configures CORS filter
- Defines request/response patterns

### 5. **Servlet Classes (18)**

Each follows pattern:

- Parse JSON request body
- Validate input
- Call appropriate DAO method
- Return JSON response

### 6. **DAO Classes (3)**

Each has methods:

- `create()` - Insert with hashed password
- `login()` - Query + password verification
- `getById()` - Fetch by ID
- `getAll()` - Fetch all records
- `update()` - Update record
- `delete()` - Delete record
- `emailExists()` - Check for duplicates

### 7. **Utility Classes (5)**

**DBConnection.java**

```
Creates HikariCP pool on startup
getConnection() - Returns pooled connection
closePool() - Closes all connections
```

**JWTUtil.java**

```
generateToken(userId, role) - Creates JWT
verifyToken(token) - Validates & decodes
getUserIdFromToken(token) - Extracts user ID
getRoleFromToken(token) - Extracts role
```

**PasswordUtil.java**

```
hashPassword(password) - BCrypt hashing
verifyPassword(password, hash) - Validation
```

**CORSFilter.java**

```
Allows cross-origin requests from frontend
Sets necessary CORS headers
```

**JsonUtil.java**

```
parseRequestBody(request) - Parse JSON
toJson(object) - Convert to JSON
fromJson(json, class) - Deserialize
```

## 🚀 Build Process

```
mvn clean install
    ├─→ Downloads dependencies from Maven Central
    ├─→ Compiles 29 Java classes
    ├─→ Runs any tests (if present)
    └─→ Creates WAR file in target/ folder

mvn tomcat7:run
    ├─→ Starts embedded Tomcat server
    ├─→ Deploys WAR file
    └─→ Server runs on http://localhost:8080
```

## 📡 Request/Response Flow

```
Client (Frontend)
    ↓
HTTP POST /api/student/login {email, password}
    ↓
CORSFilter (allows request)
    ↓
StudentLoginServlet (handles request)
    ├─→ Parse JSON body
    ├─→ Validate input
    └─→ Call StudentDAO.loginStudent(email, password)
        └─→ Query database
        └─→ Verify password with PasswordUtil
        └─→ Return Student object
    ├─→ Generate token with JWTUtil
    └─→ Return JSON response
    ↓
HTTP 200 OK + JSON {token, student}
    ↓
Client (Frontend)
    └─→ Stores token in localStorage
```

## 🔐 Security Flow

```
Password Input
    ↓
PasswordUtil.hashPassword() [BCrypt]
    ↓
Store hashed password in MySQL
    ↓
On Login:
  Input password → PasswordUtil.verifyPassword() → BCrypt compare
    ↓
Credentials valid → Generate JWT with JWTUtil
    ↓
Send token to frontend
```

## 💾 Database Schema

```
students TABLE
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── name (VARCHAR 255)
├── email (VARCHAR 255, UNIQUE, INDEXED)
├── password (VARCHAR 255, HASHED)
├── roll_no (VARCHAR 50, UNIQUE, INDEXED)
├── course (VARCHAR 100)
├── created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
└── updated_at (TIMESTAMP, AUTO UPDATE)

teachers TABLE
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── name (VARCHAR 255)
├── email (VARCHAR 255, UNIQUE, INDEXED)
├── password (VARCHAR 255, HASHED)
├── employee_id (VARCHAR 50, UNIQUE, INDEXED)
├── department (VARCHAR 100)
├── subject (VARCHAR 100)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

admins TABLE
├── id (INT, PRIMARY KEY, AUTO_INCREMENT)
├── name (VARCHAR 255)
├── email (VARCHAR 255, UNIQUE, INDEXED)
├── password (VARCHAR 255, HASHED)
├── admin_id (VARCHAR 50, UNIQUE, INDEXED)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## ✨ Features Implemented

✅ RESTful API with 18 endpoints  
✅ CRUD operations for 3 user types  
✅ JWT-based authentication  
✅ BCrypt password hashing  
✅ Connection pooling with HikariCP  
✅ CORS support for frontend  
✅ Prepared statements (prevents SQL injection)  
✅ Unique constraints on emails  
✅ Automatic timestamps  
✅ Comprehensive error handling  
✅ JSON request/response  
✅ Logging and debugging

---

**Ready to build!** Run `mvn clean install` to compile all 29 classes.
