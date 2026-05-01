package com.mitra.dao;

import com.mitra.model.Teacher;
import com.mitra.util.DBConnection;
import com.mitra.util.PasswordUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TeacherDAO {

    /**
     * Create a new teacher (Signup)
     */
    public static Teacher createTeacher(Teacher teacher) throws SQLException {
        String sql = "INSERT INTO teachers (name, email, password, employee_id, department, subject) VALUES (?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            String hashedPassword = PasswordUtil.hashPassword(teacher.getPassword());
            
            pstmt.setString(1, teacher.getName());
            pstmt.setString(2, teacher.getEmail());
            pstmt.setString(3, hashedPassword);
            pstmt.setString(4, teacher.getEmployeeId());
            pstmt.setString(5, teacher.getDepartment());
            pstmt.setString(6, teacher.getSubject());
            
            int affectedRows = pstmt.executeUpdate();
            
            if (affectedRows == 0) {
                throw new SQLException("Creating teacher failed, no rows affected.");
            }
            
            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    teacher.setId(generatedKeys.getInt(1));
                }
            }
        }
        return teacher;
    }

    /**
     * Get teacher by email and password
     */
    public static Teacher loginTeacher(String email, String password) throws SQLException {
        String sql = "SELECT * FROM teachers WHERE email = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, email);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    String hashedPassword = rs.getString("password");
                    if (PasswordUtil.verifyPassword(password, hashedPassword)) {
                        return mapResultSetToTeacher(rs);
                    }
                }
            }
        }
        return null;
    }

    /**
     * Get teacher by ID
     */
    public static Teacher getTeacherById(int id) throws SQLException {
        String sql = "SELECT * FROM teachers WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToTeacher(rs);
                }
            }
        }
        return null;
    }

    /**
     * Get all teachers
     */
    public static List<Teacher> getAllTeachers() throws SQLException {
        String sql = "SELECT * FROM teachers";
        List<Teacher> teachers = new ArrayList<>();
        
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                teachers.add(mapResultSetToTeacher(rs));
            }
        }
        return teachers;
    }

    /**
     * Update teacher
     */
    public static Teacher updateTeacher(int id, Teacher teacher) throws SQLException {
        String sql = "UPDATE teachers SET name = ?, email = ?, employee_id = ?, department = ?, subject = ? WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, teacher.getName());
            pstmt.setString(2, teacher.getEmail());
            pstmt.setString(3, teacher.getEmployeeId());
            pstmt.setString(4, teacher.getDepartment());
            pstmt.setString(5, teacher.getSubject());
            pstmt.setInt(6, id);
            
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Update failed, teacher not found.");
            }
        }
        teacher.setId(id);
        return teacher;
    }

    /**
     * Delete teacher
     */
    public static boolean deleteTeacher(int id) throws SQLException {
        String sql = "DELETE FROM teachers WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            int affectedRows = pstmt.executeUpdate();
            return affectedRows > 0;
        }
    }

    /**
     * Check if email exists
     */
    public static boolean emailExists(String email) throws SQLException {
        String sql = "SELECT COUNT(*) FROM teachers WHERE email = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, email);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1) > 0;
                }
            }
        }
        return false;
    }

    private static Teacher mapResultSetToTeacher(ResultSet rs) throws SQLException {
        Teacher teacher = new Teacher();
        teacher.setId(rs.getInt("id"));
        teacher.setName(rs.getString("name"));
        teacher.setEmail(rs.getString("email"));
        teacher.setPassword(rs.getString("password"));
        teacher.setEmployeeId(rs.getString("employee_id"));
        teacher.setDepartment(rs.getString("department"));
        teacher.setSubject(rs.getString("subject"));
        teacher.setCreatedAt(rs.getString("created_at"));
        return teacher;
    }
}
