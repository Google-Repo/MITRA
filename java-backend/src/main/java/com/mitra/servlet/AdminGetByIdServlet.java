package com.mitra.servlet;

import com.google.gson.JsonObject;
import com.mitra.dao.AdminDAO;
import com.mitra.model.Admin;
import com.mitra.util.JsonUtil;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class AdminGetByIdServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        try {
            String idStr = request.getParameter("id");
            
            if (idStr == null || idStr.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Missing admin ID\"}");
                return;
            }
            
            int id = Integer.parseInt(idStr);
            Admin admin = AdminDAO.getAdminById(id);
            
            if (admin == null) {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print("{\"error\": \"Admin not found\"}");
                return;
            }
            
            JsonObject adminJson = new JsonObject();
            adminJson.addProperty("id", admin.getId());
            adminJson.addProperty("name", admin.getName());
            adminJson.addProperty("email", admin.getEmail());
            adminJson.addProperty("adminId", admin.getAdminId());
            adminJson.addProperty("createdAt", admin.getCreatedAt());
            
            out.print(adminJson.toString());
            
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print("{\"error\": \"Invalid admin ID\"}");
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject errorJson = new JsonObject();
            errorJson.addProperty("error", "Server error: " + e.getMessage());
            out.print(errorJson.toString());
            e.printStackTrace();
        }
    }
}
