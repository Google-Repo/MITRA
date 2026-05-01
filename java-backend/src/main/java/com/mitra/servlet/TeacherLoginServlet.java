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

public class TeacherLoginServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        try {
            JsonObject json = JsonUtil.parseRequestBody(request);
            
            String email = json.has("email") ? json.get("email").getAsString() : null;
            String password = json.has("password") ? json.get("password").getAsString() : null;
            
            if (email == null || password == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Please provide email and password\"}");
                return;
            }
            
            Teacher teacher = TeacherDAO.loginTeacher(email, password);
            
            if (teacher == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                out.print("{\"error\": \"Invalid email or password\"}");
                return;
            }
            
            String token = JWTUtil.generateToken(teacher.getId(), "teacher");
            
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Login successful");
            responseJson.addProperty("token", token);
            
            JsonObject teacherJson = new JsonObject();
            teacherJson.addProperty("id", teacher.getId());
            teacherJson.addProperty("name", teacher.getName());
            teacherJson.addProperty("email", teacher.getEmail());
            teacherJson.addProperty("employeeId", teacher.getEmployeeId());
            teacherJson.addProperty("department", teacher.getDepartment());
            teacherJson.addProperty("subject", teacher.getSubject());
            responseJson.add("teacher", teacherJson);
            
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
