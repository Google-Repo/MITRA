package com.mitra.servlet;

import com.google.gson.JsonObject;
import com.mitra.dao.StudentDAO;
import com.mitra.model.Student;
import com.mitra.util.JsonUtil;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class StudentUpdateServlet extends HttpServlet {
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        try {
            String idStr = request.getParameter("id");
            
            if (idStr == null || idStr.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Missing student ID\"}");
                return;
            }
            
            int id = Integer.parseInt(idStr);
            JsonObject json = JsonUtil.parseRequestBody(request);
            
            Student student = new Student();
            if (json.has("name")) student.setName(json.get("name").getAsString());
            if (json.has("email")) student.setEmail(json.get("email").getAsString());
            if (json.has("rollNo")) student.setRollNo(json.get("rollNo").getAsString());
            if (json.has("course")) student.setCourse(json.get("course").getAsString());
            
            Student updatedStudent = StudentDAO.updateStudent(id, student);
            
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Student updated successfully");
            
            JsonObject studentJson = new JsonObject();
            studentJson.addProperty("id", updatedStudent.getId());
            studentJson.addProperty("name", updatedStudent.getName());
            studentJson.addProperty("email", updatedStudent.getEmail());
            studentJson.addProperty("rollNo", updatedStudent.getRollNo());
            studentJson.addProperty("course", updatedStudent.getCourse());
            responseJson.add("student", studentJson);
            
            out.print(responseJson.toString());
            
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid student ID\"}");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject errorJson = new JsonObject();
            errorJson.addProperty("error", "Server error: " + e.getMessage());
            out.print(errorJson.toString());
            e.printStackTrace();
        }
    }
}
