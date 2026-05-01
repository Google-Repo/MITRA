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

public class AdminUpdateServlet extends HttpServlet {
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
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
            JsonObject json = JsonUtil.parseRequestBody(request);
            
            Admin admin = new Admin();
            if (json.has("name")) admin.setName(json.get("name").getAsString());
            if (json.has("email")) admin.setEmail(json.get("email").getAsString());
            if (json.has("adminId")) admin.setAdminId(json.get("adminId").getAsString());
            
            Admin updatedAdmin = AdminDAO.updateAdmin(id, admin);
            
            JsonObject responseJson = new JsonObject();
            responseJson.addProperty("message", "Admin updated successfully");
            
            JsonObject adminJson = new JsonObject();
            adminJson.addProperty("id", updatedAdmin.getId());
            adminJson.addProperty("name", updatedAdmin.getName());
            adminJson.addProperty("email", updatedAdmin.getEmail());
            adminJson.addProperty("adminId", updatedAdmin.getAdminId());
            responseJson.add("admin", adminJson);
            
            out.print(responseJson.toString());
            
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
