package com.mitra.servlet;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mitra.dao.AdminDAO;
import com.mitra.model.Admin;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class AdminGetAllServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        try {
            List<Admin> admins = AdminDAO.getAllAdmins();
            
            JsonArray jsonArray = new JsonArray();
            for (Admin admin : admins) {
                JsonObject adminJson = new JsonObject();
                adminJson.addProperty("id", admin.getId());
                adminJson.addProperty("name", admin.getName());
                adminJson.addProperty("email", admin.getEmail());
                adminJson.addProperty("adminId", admin.getAdminId());
                adminJson.addProperty("createdAt", admin.getCreatedAt());
                jsonArray.add(adminJson);
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
