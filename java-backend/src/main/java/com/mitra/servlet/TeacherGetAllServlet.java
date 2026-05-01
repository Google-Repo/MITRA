package com.mitra.servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mitra.dao.TeacherDAO;
import com.mitra.model.Teacher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class TeacherGetAllServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        try {
            List<Teacher> teachers = TeacherDAO.getAllTeachers();
            
            JsonArray jsonArray = new JsonArray();
            for (Teacher teacher : teachers) {
                JsonObject teacherJson = new JsonObject();
                teacherJson.addProperty("id", teacher.getId());
                teacherJson.addProperty("name", teacher.getName());
                teacherJson.addProperty("email", teacher.getEmail());
                teacherJson.addProperty("employeeId", teacher.getEmployeeId());
                teacherJson.addProperty("department", teacher.getDepartment());
                teacherJson.addProperty("subject", teacher.getSubject());
                teacherJson.addProperty("createdAt", teacher.getCreatedAt());
                jsonArray.add(teacherJson);
            }
            
            out.print(jsonArray.toString());
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject errorJson = new JsonObject();
            errorJson.addProperty("error", "Server error: " + e.getMessage());
            out.print(errorJson.toString());
            e.printStackTrace();
        }
    }
}
