package com.tjl.bean;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class ConPreRe {
    private final Connection connection;
    private final PreparedStatement preparedStatement;
    private ResultSet resultSet;

    public Connection getConnection() {
        return connection;
    }

    public PreparedStatement getPreparedStatement() {
        return preparedStatement;
    }

    public ResultSet getResultSet() {
        return resultSet;
    }


    public void setResultSet(ResultSet resultSet) {
        this.resultSet = resultSet;
    }
    public ConPreRe(Connection connection, PreparedStatement preparedStatement, ResultSet resultSet){
        this.connection=connection;
        this.preparedStatement=preparedStatement;
        this.resultSet=resultSet;
    }
}
