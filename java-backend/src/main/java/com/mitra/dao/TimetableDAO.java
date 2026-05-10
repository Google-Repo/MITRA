package com.mitra.dao;

import com.mitra.util.DBConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TimetableDAO {

    public boolean addTimetableEntry(String course, String semester, String day, String time, String subject,
            String room, String type, String teacherName) throws SQLException {
        String sql = "INSERT INTO timetable (course, semester, day_of_week, time_slot, subject, room, class_type, teacher_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, course);
            pstmt.setString(2, semester);
            pstmt.setString(3, day);
            pstmt.setString(4, time);
            pstmt.setString(5, subject);
            pstmt.setString(6, room);
            pstmt.setString(7, type);
            pstmt.setString(8, teacherName);
            int rows = pstmt.executeUpdate();
            return rows > 0;
        }
    }

    // Get class schedule for the student by their course
    public List<Map<String, String>> getTimetable(String course) {
        List<Map<String, String>> list = new ArrayList<>();
        String sql = "SELECT * FROM timetable WHERE course = ? ORDER BY FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), time_slot";
        return executeTimetableQuery(sql, course);
    }

    // Get class schedule created by the teacher
    public List<Map<String, String>> getTeacherTimetable(String teacherName) {
        List<Map<String, String>> list = new ArrayList<>();
        String sql = "SELECT * FROM timetable WHERE teacher_name = ? ORDER BY FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'), time_slot";
        return executeTimetableQuery(sql, teacherName);
    }

    private List<Map<String, String>> executeTimetableQuery(String sql, String param) {
        List<Map<String, String>> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, param);
            ResultSet rs = pstmt.executeQuery();
            while (rs.next()) {
                Map<String, String> row = new HashMap<>();
                row.put("course", rs.getString("course"));
                row.put("day", rs.getString("day_of_week"));
                row.put("time", rs.getString("time_slot"));
                row.put("subject", rs.getString("subject"));
                row.put("room", rs.getString("room"));
                row.put("type", rs.getString("class_type"));
                row.put("teacher", rs.getString("teacher_name"));
                list.add(row);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }
}