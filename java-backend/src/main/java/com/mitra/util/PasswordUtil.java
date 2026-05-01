package com.mitra.util;

import at.favre.lib.crypto.bcrypt.BCrypt;

public class PasswordUtil {
    
    /**
     * Hash a password using BCrypt
     */
    public static String hashPassword(String password) {
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        return BCrypt.withDefaults().hashToString(12, password.toCharArray());
    }
    
    /**
     * Verify a password against its hash
     */
    public static boolean verifyPassword(String password, String hash) {
        if (password == null || hash == null) {
            return false;
        }
        BCrypt.Result result = BCrypt.verifyer().verify(password.toCharArray(), hash);
        return result.validFormat && result.verified;
    }
}
