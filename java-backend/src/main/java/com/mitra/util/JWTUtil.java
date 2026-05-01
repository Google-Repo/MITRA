package com.mitra.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.io.InputStream;
import java.util.Date;
import java.util.Properties;

public class JWTUtil {
    private static String JWT_SECRET;
    private static long JWT_EXPIRATION;

    static {
        try {
            Properties props = new Properties();
            InputStream input = JWTUtil.class.getClassLoader()
                    .getResourceAsStream("database.properties");
            props.load(input);

            JWT_SECRET = props.getProperty("jwt.secret", "your_super_secret_jwt_key_change_this_in_production");
            JWT_EXPIRATION = Long.parseLong(props.getProperty("jwt.expiration", "604800000")); // 7 days
        } catch (Exception e) {
            System.err.println("Failed to load JWT configuration: " + e.getMessage());
            JWT_SECRET = "your_super_secret_jwt_key_change_this_in_production";
            JWT_EXPIRATION = 604800000; // 7 days
        }
    }

    /**
     * Generate JWT token
     */
    public static String generateToken(int userId, String role) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            return JWT.create()
                    .withClaim("id", userId)
                    .withClaim("role", role)
                    .withIssuedAt(new Date())
                    .withExpiresAt(new Date(System.currentTimeMillis() + JWT_EXPIRATION))
                    .sign(algorithm);
        } catch (Exception e) {
            System.err.println("Error generating JWT token: " + e.getMessage());
            return null;
        }
    }

    /**
     * Verify and decode JWT token
     */
    public static DecodedJWT verifyToken(String token) throws JWTVerificationException {
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new JWTVerificationException("Invalid token: " + e.getMessage());
        }
    }

    /**
     * Get user ID from token
     */
    public static Integer getUserIdFromToken(String token) throws JWTVerificationException {
        DecodedJWT decodedJWT = verifyToken(token);
        return decodedJWT.getClaim("id").asInt();
    }

    /**
     * Get role from token
     */
    public static String getRoleFromToken(String token) throws JWTVerificationException {
        DecodedJWT decodedJWT = verifyToken(token);
        return decodedJWT.getClaim("role").asString();
    }
}
