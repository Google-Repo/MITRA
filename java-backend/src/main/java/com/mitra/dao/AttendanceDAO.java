package com.mitra.dao;

import com.mitra.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

public class AttendanceDAO {
    
    public boolean saveAttendance(String subject, String date, Map<String, String> attendanceMap) {
        // Using ON DUPLICATE KEY UPDATE to overwrite if attendance is marked again on the same day
        String sql = "INSERT INTO attendance (student_id, subject, attendance_date, status) VALUES (?, ?, ?, ?) " +
                     "ON DUPLICATE KEY UPDATE status = VALUES(status)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            conn.setAutoCommit(false); // Use transaction for batch execution
            
            for (Map.Entry<String, String> entry : attendanceMap.entrySet()) {
                int studentId = Integer.parseInt(entry.getKey());
                String status = entry.getValue();
                
                pstmt.setInt(1, studentId);
                pstmt.setString(2, subject);
                pstmt.setString(3, date);
                pstmt.setString(4, status);
                pstmt.addBatch();
            }
            
            pstmt.executeBatch();
            conn.commit();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Map<String, String> getAttendanceByDate(String subject, String date) {
        Map<String, String> attendanceMap = new HashMap<>();
        String sql = "SELECT student_id, status FROM attendance WHERE subject = ? AND attendance_date = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, subject);
            pstmt.setString(2, date);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                attendanceMap.put(String.valueOf(rs.getInt("student_id")), rs.getString("status"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return attendanceMap;
    }

    public List<Map<String, Object>> getStudentAttendanceSummary(int studentId) {
        List<Map<String, Object>> summary = new ArrayList<>();
        String sql = "SELECT subject, COUNT(*) as total_classes, " +
                     "SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present_classes " +
                     "FROM attendance WHERE student_id = ? GROUP BY subject";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, studentId);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                row.put("subject", rs.getString("subject"));
                int total = rs.getInt("total_classes");
                int present = rs.getInt("present_classes");
                int absent = total - present;
                
                // Formula: +1 for Present, -1.5 for Absent, out of 21 total classes
                double score = present - (absent * 1.5);
                if (score < 0) score = 0.0; // Prevent negative percentage
                double percentage = Math.min((score / 21.0) * 100.0, 100.0);
                
                row.put("percentage", Math.round(percentage * 10.0) / 10.0); // round to 1 decimal place
                summary.add(row);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return summary;
    }

    public List<Map<String, Object>> getStudentAttendanceHistory(int studentId) {
        List<Map<String, Object>> history = new ArrayList<>();
        String sql = "SELECT subject, attendance_date, status FROM attendance WHERE student_id = ? ORDER BY attendance_date DESC LIMIT 50";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, studentId);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                row.put("subject", rs.getString("subject"));
                row.put("date", rs.getString("attendance_date"));
                row.put("status", rs.getString("status"));
                history.add(row);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return history;
    }
}