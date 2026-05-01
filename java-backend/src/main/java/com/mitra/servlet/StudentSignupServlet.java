package com.mitra.servlet;

import com.google.gson.JsonObject;
import com.mitra.dao.StudentDAO;
import com.mitra.model.Student;
import com.mitra.util.JWTUtil;
import com.mitra.util.JsonUtil;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class StudentSignupServlet extends HttpServlet {
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
            String rollNo = json.has("rollNo") ? json.get("rollNo").getAsString() : null;
            String course = json.has("course") ? json.get("course").getAsString() : null;
            
            if (name == null || email == null || password == null || rollNo == null || course == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Missing required fields\"}");
                return;
            }
            
            if (StudentDAO.emailExists(email)) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Student already exists with this email\"}");
                return;
            }
            
            Student student = new Student(name, email, password, rollNo, course);
            Student createdStudent = StudentDAO.createStudent(student);
            
            String token = JWTUtil.generateToken(createdStudent.getId(), "student");
            
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Student registered successfully");
            responseJson.addProperty("token", token);
            
            JsonObject studentJson = new JsonObject();
            studentJson.addProperty("id", createdStudent.getId());
            studentJson.addProperty("name", createdStudent.getName());
            studentJson.addProperty("email", createdStudent.getEmail());
            studentJson.addProperty("rollNo", createdStudent.getRollNo());
            studentJson.addProperty("course", createdStudent.getCourse());
            responseJson.add("student", studentJson);
            
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
