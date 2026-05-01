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

public class AdminLoginServlet extends HttpServlet {
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
            
            Admin admin = AdminDAO.loginAdmin(email, password);
            
            if (admin == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                out.print("{\"error\": \"Invalid email or password\"}");
                return;
            }
            
            String token = JWTUtil.generateToken(admin.getId(), "admin");
            
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Login successful");
            responseJson.addProperty("token", token);
            
            JsonObject adminJson = new JsonObject();
            adminJson.addProperty("id", admin.getId());
            adminJson.addProperty("name", admin.getName());
            adminJson.addProperty("email", admin.getEmail());
            adminJson.addProperty("adminId", admin.getAdminId());
            responseJson.add("admin", adminJson);
            
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
