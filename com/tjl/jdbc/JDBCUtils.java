package com.tjl.jdbc;
import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class JDBCUtils {
    //封装JDBC工具类，连接、释放资源
    private static final String URL;
    private static final String USER;
    private static final String DRIVER;
    private static final String PASSWORD;

    //静态语句块
    static {
        InputStream inputStream=JDBCUtils.class.getClassLoader().getResourceAsStream("student_control_system.properties");
        Properties properties=new Properties();
        try {
            properties.load(inputStream);
            System.out.println("加载成功");
        } catch (IOException e) {
            System.out.println("加载失败");
            e.printStackTrace();
        }
         DRIVER =properties.getProperty("driver");
         URL =properties.getProperty("url");
         USER =properties.getProperty("user");
         PASSWORD =properties.getProperty("password");
        try {
            Class.forName(DRIVER);
            System.out.println("驱动成功");
        } catch (ClassNotFoundException e) {
            System.out.println("驱动失败");
            e.printStackTrace();
        }
    }
    public static Connection getConnection(){
        Connection connection=null;
        try {
            connection=DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("连接成功");
            return connection;
        } catch (SQLException e) {
            System.out.println("连接失败");
            e.printStackTrace();
        }
        return connection;
    }

    public static void close(Connection connection, PreparedStatement preparedstatement,ResultSet resultSet){
        try{
            if(resultSet!=null){
                resultSet.close();
            }
            if(preparedstatement!=null){
                preparedstatement.close();
            }
            if(connection!=null){
                connection.close();
            }
        } catch (SQLException e) {
            System.out.println("释放失败");
            e.printStackTrace();
        }
    }
}
