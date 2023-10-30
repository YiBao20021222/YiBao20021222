package com.tjl.out;

import java.sql.ResultSet;

public interface OUT {
    void studentAlterOut(ResultSet resultSet);
    void teacherSelectStudentOut(ResultSet resultSet);
    void teacherSelectOut(ResultSet resultSet);
    void selectClassOut(ResultSet resultSet);
    void scoreSelectOut(ResultSet resultSet);
    void studentAllSelectOut(ResultSet resultSet);
    void teacherAllSelectOut(ResultSet resultSet);
}
