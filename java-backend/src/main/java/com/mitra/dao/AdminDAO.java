package com.mitra.dao;

import com.mitra.model.Admin;
import com.mitra.util.DBConnection;
import com.mitra.util.PasswordUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AdminDAO {

    /**
     * Create a new admin (Signup)
     */
    public static Admin createAdmin(Admin admin) throws SQLException {
        String sql = "INSERT INTO admins (name, email, password, admin_id) VALUES (?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            String hashedPassword = PasswordUtil.hashPassword(admin.getPassword());
            
            pstmt.setString(1, admin.getName());
            pstmt.setString(2, admin.getEmail());
            pstmt.setString(3, hashedPassword);
            pstmt.setString(4, admin.getAdminId());
            
            int affectedRows = pstmt.executeUpdate();
            
            if (affectedRows == 0) {
                throw new SQLException("Creating admin failed, no rows affected.");
            }
            
            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    admin.setId(generatedKeys.getInt(1));
                }
            }
        }
        return admin;
    }

    /**
     * Get admin by email and password
     */
    public static Admin loginAdmin(String email, String password) throws SQLException {
        String sql = "SELECT * FROM admins WHERE email = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, email);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    String hashedPassword = rs.getString("password");
                    if (PasswordUtil.verifyPassword(password, hashedPassword)) {
                        return mapResultSetToAdmin(rs);
                    }
                }
            }
        }
        return null;
    }

    /**
     * Get admin by ID
     */
    public static Admin getAdminById(int id) throws SQLException {
        String sql = "SELECT * FROM admins WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setInt(1, id);
            
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToAdmin(rs);
                }
            }
        }
        return null;
    }

    /**
     * Get all admins
     */
    public static List<Admin> getAllAdmins() throws SQLException {
        String sql = "SELECT * FROM admins";
        List<Admin> admins = new ArrayList<>();
        
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                admins.add(mapResultSetToAdmin(rs));
            }
        }
        return admins;
    }

    /**
     * Update admin
     */
    public static Admin updateAdmin(int id, Admin admin) throws SQLException {
        String sql = "UPDATE admins SET name = ?, email = ?, admin_id = ? WHERE id = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, admin.getName());
            pstmt.setString(2, admin.getEmail());
            pstmt.setString(3, admin.getAdminId());
            pstmt.setInt(4, id);
            
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Update failed, admin not found.");
            }
        }
        admin.setId(id);
        return admin;
    }

    /**
     * Delete admin
     */
    public static boolean deleteAdmin(int id) throws SQLException {
        String sql = "DELETE FROM admins WHERE id = ?";
        
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
        String sql = "SELECT COUNT(*) FROM admins WHERE email = ?";
        
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

    private static Admin mapResultSetToAdmin(ResultSet rs) throws SQLException {
        Admin admin = new Admin();
        admin.setId(rs.getInt("id"));
        admin.setName(rs.getString("name"));
        admin.setEmail(rs.getString("email"));
        admin.setPassword(rs.getString("password"));
        admin.setAdminId(rs.getString("admin_id"));
        admin.setCreatedAt(rs.getString("created_at"));
        return admin;
    }
}
