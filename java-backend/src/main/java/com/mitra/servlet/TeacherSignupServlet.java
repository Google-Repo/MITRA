package com.mitra.servlet;

import com.google.gson.JsonObject;
import com.mitra.dao.TeacherDAO;
import com.mitra.model.Teacher;
import com.mitra.util.JWTUtil;
import com.mitra.util.JsonUtil;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class TeacherSignupServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        try {
            JsonObject json = JsonUtil.parseRequestBody(request);
            
            String name = json.has("name") ? json.get("name").getAsString() : null;
            String email = json.has("email") ? json.get("email").getAsString() : null;
            String password = json.has("password") ? json.get("password").getAsString() : null;
            String employeeId = json.has("employeeId") ? json.get("employeeId").getAsString() : null;
            String department = json.has("department") ? json.get("department").getAsString() : null;
            String subject = json.has("subject") ? json.get("subject").getAsString() : null;
            
            if (name == null || email == null || password == null || employeeId == null || 
                department == null || subject == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Missing required fields\"}");
                return;
            }
            
            if (TeacherDAO.emailExists(email)) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Teacher already exists with this email\"}");
                return;
            }
            
            Teacher teacher = new Teacher(name, email, password, employeeId, department, subject);
            Teacher createdTeacher = TeacherDAO.createTeacher(teacher);
            
            String token = JWTUtil.generateToken(createdTeacher.getId(), "teacher");
            
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Teacher registered successfully");
            responseJson.addProperty("token", token);
            
            JsonObject teacherJson = new JsonObject();
            teacherJson.addProperty("id", createdTeacher.getId());
            teacherJson.addProperty("name", createdTeacher.getName());
            teacherJson.addProperty("email", createdTeacher.getEmail());
            teacherJson.addProperty("employeeId", createdTeacher.getEmployeeId());
            teacherJson.addProperty("department", createdTeacher.getDepartment());
            teacherJson.addProperty("subject", createdTeacher.getSubject());
            responseJson.add("teacher", teacherJson);
            
            response.setStatus(HttpServletResponse.SC_CREATED);
            out.print(responseJson.toString());
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject errorJson = new JsonObject();
            errorJson.addProperty("error", "Server error: " + e.getMessage());
            out.print(errorJson.toString());
            e.printStackTrace();
        }
    }
}
