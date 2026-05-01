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

public class TeacherUpdateServlet extends HttpServlet {
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
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
            JsonObject json = JsonUtil.parseRequestBody(request);
            
            Teacher teacher = new Teacher();
            if (json.has("name")) teacher.setName(json.get("name").getAsString());
            if (json.has("email")) teacher.setEmail(json.get("email").getAsString());
            if (json.has("employeeId")) teacher.setEmployeeId(json.get("employeeId").getAsString());
            if (json.has("department")) teacher.setDepartment(json.get("department").getAsString());
            if (json.has("subject")) teacher.setSubject(json.get("subject").getAsString());
            
            Teacher updatedTeacher = TeacherDAO.updateTeacher(id, teacher);
            
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Teacher updated successfully");
            
            JsonObject teacherJson = new JsonObject();
            teacherJson.addProperty("id", updatedTeacher.getId());
            teacherJson.addProperty("name", updatedTeacher.getName());
            teacherJson.addProperty("email", updatedTeacher.getEmail());
            teacherJson.addProperty("employeeId", updatedTeacher.getEmployeeId());
            teacherJson.addProperty("department", updatedTeacher.getDepartment());
            teacherJson.addProperty("subject", updatedTeacher.getSubject());
            responseJson.add("teacher", teacherJson);
            
            out.print(responseJson.toString());
            
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
