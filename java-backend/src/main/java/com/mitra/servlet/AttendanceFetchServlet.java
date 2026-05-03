package com.mitra.servlet;

import com.google.gson.Gson;
import com.mitra.dao.AttendanceDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@WebServlet("/api/attendance")
public class AttendanceFetchServlet extends HttpServlet {
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
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        try {
            String subject = request.getParameter("subject");
            String date = request.getParameter("date");

            if (subject == null || date == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Missing subject or date parameter\"}");
                return;
            }

            Map<String, String> attendanceMap = attendanceDAO.getAttendanceByDate(subject, date);
            out.print(gson.toJson(attendanceMap));
            response.setStatus(HttpServletResponse.SC_OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"Server error: " + e.getMessage() + "\"}");
        }
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
}