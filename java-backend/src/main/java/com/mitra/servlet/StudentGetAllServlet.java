package com.mitra.servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mitra.dao.StudentDAO;
import com.mitra.model.Student;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class StudentGetAllServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        try {
            List<Student> students = StudentDAO.getAllStudents();
            
            JsonArray jsonArray = new JsonArray();
            for (Student student : students) {
                JsonObject studentJson = new JsonObject();
                studentJson.addProperty("id", student.getId());
                studentJson.addProperty("name", student.getName());
                studentJson.addProperty("email", student.getEmail());
                studentJson.addProperty("rollNo", student.getRollNo());
                studentJson.addProperty("course", student.getCourse());
                studentJson.addProperty("createdAt", student.getCreatedAt());
                jsonArray.add(studentJson);
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
