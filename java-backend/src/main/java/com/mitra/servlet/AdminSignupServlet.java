package com.mitra.servlet;

import com.google.gson.JsonObject;
import com.mitra.dao.AdminDAO;
import com.mitra.model.Admin;
import com.mitra.util.JWTUtil;
import com.mitra.util.JsonUtil;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AdminSignupServlet extends HttpServlet {
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
            String adminId = json.has("adminId") ? json.get("adminId").getAsString() : null;
            
            if (name == null || email == null || password == null || adminId == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Missing required fields\"}");
                return;
            }
            
            if (AdminDAO.emailExists(email)) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Admin already exists with this email\"}");
                return;
            }
            
            Admin admin = new Admin(name, email, password, adminId);
            Admin createdAdmin = AdminDAO.createAdmin(admin);
            
            String token = JWTUtil.generateToken(createdAdmin.getId(), "admin");
            
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Admin registered successfully");
            responseJson.addProperty("token", token);
            
            JsonObject adminJson = new JsonObject();
            adminJson.addProperty("id", createdAdmin.getId());
            adminJson.addProperty("name", createdAdmin.getName());
            adminJson.addProperty("email", createdAdmin.getEmail());
            adminJson.addProperty("adminId", createdAdmin.getAdminId());
            responseJson.add("admin", adminJson);
            
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
