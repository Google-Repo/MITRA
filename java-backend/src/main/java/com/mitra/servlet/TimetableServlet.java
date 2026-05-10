package com.mitra.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mitra.dao.TimetableDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@WebServlet("/api/timetable")
public class TimetableServlet extends HttpServlet {
    private TimetableDAO timetableDAO;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        timetableDAO = new TimetableDAO();
        gson = new Gson();
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setCorsHeaders(response);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        try {
            String course = request.getParameter("course");
            String teacherName = request.getParameter("teacherName");

            List<Map<String, String>> timetable;
            if (teacherName != null) {
                timetable = timetableDAO.getTeacherTimetable(teacherName);
            } else if (course != null) {
                timetable = timetableDAO.getTimetable(course);
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print("{\"error\": \"Missing course or teacherName parameter\"}");
                return;
            }

            out.print(gson.toJson(timetable));
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print("{\"error\": \"Server error: " + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setCorsHeaders(response);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        try {
            BufferedReader reader = request.getReader();
            JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

            String course = jsonObject.get("course").getAsString();
            String semester = jsonObject.get("semester").getAsString();
            String day = jsonObject.get("day").getAsString();
            String time = jsonObject.get("time").getAsString();
            String subject = jsonObject.get("subject").getAsString();
            String room = jsonObject.get("room").getAsString();
            String type = jsonObject.get("type").getAsString();
            String teacherName = jsonObject.get("teacherName").getAsString();

            boolean success = timetableDAO.addTimetableEntry(course, semester, day, time, subject, room, type,
                    teacherName);

            if (success) {
                out.print("{\"message\": \"Timetable entry added successfully\"}");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                out.print("{\"error\": \"Failed to add timetable entry\"}");
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.print("{\"error\": \"Server error: " + e.getMessage().replace("\"", "\\\"") + "\"}");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
}