# MITRA Frontend - Java Backend Integration Guide

## 🔄 API URL Changes

Update all API calls in your frontend from MongoDB endpoints to MySQL endpoints.

### Old API Base URL (Node.js/MongoDB)

```javascript
const API_BASE_URL = "http://localhost:5000";
```

### New API Base URL (Java/MySQL)

```javascript
const API_BASE_URL = "http://localhost:8080";
```

## 📝 File Changes Required

### 1. Update API Service Configuration

**File: `src/services/api.js` or similar**

```javascript
// OLD (MongoDB setup)
export const API_BASE_URL = "http://localhost:5000";

// NEW (MySQL + Java setup)
export const API_BASE_URL = "http://localhost:8080/api";
```

### 2. Student Login/Signup Endpoints

**Login Request:**

```javascript
// OLD - POST /student/login
// NEW - POST /api/student/login (same endpoint, new base URL)

const response = await fetch(`${API_BASE_URL}/student/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});
```

**Signup Request:**

```javascript
// OLD - POST /student/signup
// NEW - POST /api/student/signup (same endpoint, new base URL)

const response = await fetch(`${API_BASE_URL}/student/signup`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name,
    email,
    password,
    rollNo,
    course,
  }),
});
```

### 3. Teacher Endpoints

Same pattern - just change base URL and ensure `/api` prefix:

```javascript
// Get all teachers
fetch(`${API_BASE_URL}/teacher`)

// Get specific teacher
fetch(`${API_BASE_URL}/teacher/get?id=1`)

// Login teacher
fetch(`${API_BASE_URL}/teacher/login`, { method: 'POST', body: JSON.stringify({...}) })

// Signup teacher
fetch(`${API_BASE_URL}/teacher/signup`, { method: 'POST', body: JSON.stringify({...}) })
```

### 4. Admin Endpoints

```javascript
// Admin login
fetch(`${API_BASE_URL}/admin/login`, { method: 'POST', body: JSON.stringify({...}) })

// Admin signup
fetch(`${API_BASE_URL}/admin/signup`, { method: 'POST', body: JSON.stringify({...}) })

// Get all admins
fetch(`${API_BASE_URL}/admin`)
```

## 🔑 JWT Token Handling

The token response format is the same:

```javascript
// Response structure (same as before)
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

**Store and use token:**

```javascript
// Save token
localStorage.setItem("token", response.data.token);

// Use in requests
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};
```

## ✅ Quick Checklist

- [ ] Update `API_BASE_URL` to `http://localhost:8080/api`
- [ ] Update all student endpoints
- [ ] Update all teacher endpoints
- [ ] Update all admin endpoints
- [ ] Test login/signup in Postman first
- [ ] Verify token handling in frontend
- [ ] Test all CRUD operations
- [ ] Check localStorage for token storage
- [ ] Verify console for any CORS errors

## 🚀 Testing Steps

1. **Start Java Backend**

   ```bash
   cd java-backend
   mvn tomcat7:run
   ```

2. **Start Frontend**

   ```bash
   npm start
   ```

3. **Open browser** to `http://localhost:3000` (or your frontend port)

4. **Test signup flow:**
   - Fill in signup form
   - Submit
   - Check browser console for response
   - Verify token is saved to localStorage

5. **Test login flow:**
   - Fill in login form
   - Submit
   - Verify redirect to dashboard

## 🔍 Debugging

**Check API calls in browser:**

1. Open DevTools (F12)
2. Go to Network tab
3. Perform a login/signup action
4. Look for the request to `http://localhost:8080/api/...`
5. Check response status and body

**Common Issues:**

| Error              | Fix                                         |
| ------------------ | ------------------------------------------- |
| 404 Not Found      | Check API URL and endpoint path             |
| CORS Error         | Enable CORS (already done in Java backend)  |
| 500 Server Error   | Check Java backend console for errors       |
| Connection Refused | Ensure Java backend is running on port 8080 |

## 📋 Endpoint Comparison

| Operation      | Old Endpoint         | New Endpoint                    |
| -------------- | -------------------- | ------------------------------- |
| Student Signup | POST /student/signup | POST /api/student/signup        |
| Student Login  | POST /student/login  | POST /api/student/login         |
| Get Students   | GET /student         | GET /api/student                |
| Get Student    | GET /student/:id     | GET /api/student/get?id=1       |
| Update Student | PUT /student/:id     | PUT /api/student/update?id=1    |
| Delete Student | DELETE /student/:id  | DELETE /api/student/delete?id=1 |

## 💾 Complete Example - Login Component

**Old (MongoDB/Node.js):**

```javascript
const handleLogin = async (email, password) => {
  const res = await fetch("http://localhost:5000/student/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  localStorage.setItem("token", data.token);
};
```

**New (MySQL/Java):**

```javascript
const handleLogin = async (email, password) => {
  const res = await fetch("http://localhost:8080/api/student/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  localStorage.setItem("token", data.token);
};
```

**Only difference:** API URL changed from `localhost:5000` to `localhost:8080/api`

---

**Done!** Your frontend should now work with the Java backend. Test thoroughly and update any remaining hardcoded URLs.
