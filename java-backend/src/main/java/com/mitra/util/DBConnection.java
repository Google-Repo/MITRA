package com.mitra.util;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {
    private static HikariDataSource dataSource;

    static {
        try {
            Properties props = new Properties();
            InputStream input = DBConnection.class.getClassLoader()
                    .getResourceAsStream("database.properties");
            props.load(input);

            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(props.getProperty("db.url"));
            config.setUsername(props.getProperty("db.username"));
            config.setPassword(props.getProperty("db.password"));
            config.setMaximumPoolSize(Integer.parseInt(props.getProperty("db.pool.max.size", "20")));
            config.setMinimumIdle(Integer.parseInt(props.getProperty("db.pool.size", "10")));
            config.setIdleTimeout(Long.parseLong(props.getProperty("db.pool.idle.timeout", "600000")));
            config.setConnectionTimeout(30000);
            config.setLeakDetectionThreshold(60000);

            dataSource = new HikariDataSource(config);
            System.out.println("Database Connection Pool initialized successfully!");
        } catch (Exception e) {
            System.err.println("Failed to initialize database connection pool: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        if (dataSource == null) {
            throw new SQLException("Connection pool not initialized");
        }
        return dataSource.getConnection();
    }

    public static void closePool() {
        if (dataSource != null && !dataSource.isClosed()) {
            dataSource.close();
        }
    }
}
