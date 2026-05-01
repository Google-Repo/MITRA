package com.mitra.dao;

import com.mitra.model.Student;
import com.mitra.util.DBConnection;
import com.mitra.util.PasswordUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StudentDAO {

    /**
     * Create a new student (Signup)
     */
    public static Student createStudent(Student student) throws SQLException {
        String sql = "INSERT INTO students (name, email, password, roll_no, course) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            String hashedPassword = PasswordUtil.hashPassword(student.getPassword());
            
            pstmt.setString(1, student.getName());
            pstmt.setString(2, student.getEmail());
            pstmt.setString(3, hashedPassword);
            pstmt.setString(4, student.getRollNo());
            pstmt.setString(5, student.getCourse());
            
            int affectedRows = pstmt.executeUpdate();
            
            if (affectedRows == 0) {
                throw new SQLException("Creating student failed, no rows affected.");
            }
            
            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    student.setId(generatedKeys.getInt(1));
                }
            }
        }
        return student;
    }

    /**
     * Get student by email and password
     */
    public static Student loginStudent(String email, String password) throws SQLException {
        String sql = "SELECT * FROM students WHERE email = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, email);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    String hashedPassword = rs.getString("password");
                    if (PasswordUtil.verifyPassword(password, hashedPassword)) {
                        return mapResultSetToStudent(rs);
                    }
                }
            }
        }
        return null;
    }

    /**
     * Get student by ID
     */
    public static Student getStudentById(int id) throws SQLException {
        String sql = "SELECT * FROM students WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToStudent(rs);
                }
            }
        }
        return null;
    }

    /**
     * Get all students
     */
    public static List<Student> getAllStudents() throws SQLException {
        String sql = "SELECT * FROM students";
        List<Student> students = new ArrayList<>();
        
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                students.add(mapResultSetToStudent(rs));
            }
        }
        return students;
    }

    /**
     * Update student
     */
    public static Student updateStudent(int id, Student student) throws SQLException {
        String sql = "UPDATE students SET name = ?, email = ?, roll_no = ?, course = ? WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, student.getName());
            pstmt.setString(2, student.getEmail());
            pstmt.setString(3, student.getRollNo());
            pstmt.setString(4, student.getCourse());
            pstmt.setInt(5, id);
            
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Update failed, student not found.");
            }
        }
        student.setId(id);
        return student;
    }

    /**
     * Delete student
     */
    public static boolean deleteStudent(int id) throws SQLException {
        String sql = "DELETE FROM students WHERE id = ?";
        
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
        String sql = "SELECT COUNT(*) FROM students WHERE email = ?";
        
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

    private static Student mapResultSetToStudent(ResultSet rs) throws SQLException {
        Student student = new Student();
        student.setId(rs.getInt("id"));
        student.setName(rs.getString("name"));
        student.setEmail(rs.getString("email"));
        student.setPassword(rs.getString("password"));
        student.setRollNo(rs.getString("roll_no"));
        student.setCourse(rs.getString("course"));
        student.setCreatedAt(rs.getString("created_at"));
        return student;
    }
}
