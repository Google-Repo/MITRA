package com.mitra.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.mitra.dao.AttendanceDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.Map;

@WebServlet("/api/attendance/upload")
public class AttendanceUploadServlet extends HttpServlet {
    private AttendanceDAO attendanceDAO;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        attendanceDAO = new AttendanceDAO();
        gson = new Gson();
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        try {
            BufferedReader reader = request.getReader();
            JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

            String subject = jsonObject.get("subject").getAsString();
            String dateStr = jsonObject.get("date").getAsString();
            JsonObject attendanceJson = jsonObject.getAsJsonObject("attendance");

            Type type = new TypeToken<Map<String, String>>(){}.getType();
            Map<String, String> attendanceMap = gson.fromJson(attendanceJson, type);

            boolean success = attendanceDAO.saveAttendance(subject, dateStr, attendanceMap);

            if (success) {
                out.print("{\"message\": \"Attendance saved successfully\"}");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                out.print("{\"error\": \"Failed to save attendance to database\"}");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.print("{\"error\": \"Server error: " + e.getMessage() + "\"}");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
}