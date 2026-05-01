package com.mitra.servlet;

import com.google.gson.JsonObject;
import com.mitra.dao.TeacherDAO;
import com.mitra.model.Teacher;
import com.mitra.util.JsonUtil;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class TeacherGetByIdServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        try {
            String idStr = request.getParameter("id");
            
            if (idStr == null || idStr.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Missing teacher ID\"}");
                return;
            }
            
            int id = Integer.parseInt(idStr);
            Teacher teacher = TeacherDAO.getTeacherById(id);
            
            if (teacher == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print("{\"error\": \"Teacher not found\"}");
                return;
            }
            
            JsonObject teacherJson = new JsonObject();
            teacherJson.addProperty("id", teacher.getId());
            teacherJson.addProperty("name", teacher.getName());
            teacherJson.addProperty("email", teacher.getEmail());
            teacherJson.addProperty("employeeId", teacher.getEmployeeId());
            teacherJson.addProperty("department", teacher.getDepartment());
            teacherJson.addProperty("subject", teacher.getSubject());
            teacherJson.addProperty("createdAt", teacher.getCreatedAt());
            
            out.print(teacherJson.toString());
            
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid teacher ID\"}");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject errorJson = new JsonObject();
            errorJson.addProperty("error", "Server error: " + e.getMessage());
            out.print(errorJson.toString());
            e.printStackTrace();
        }
    }
}
