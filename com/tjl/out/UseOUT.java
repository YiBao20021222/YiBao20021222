package com.tjl.out;

import com.tjl.dao.UseDAO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UseOUT implements OUT {
    private static final UseDAO useDao=new UseDAO();
    @Override
    public void studentAlterOut(ResultSet resultSet) {
        try {
            System.out.println(
                    "学生id：" + resultSet.getInt("student_id") + "\t" +
                            "学生姓名：" + resultSet.getString("student_name") + "\t" +
                            "学生密码：" + resultSet.getString("student_password"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void teacherSelectStudentOut(ResultSet resultSet) {
        while (true) {
            try {
                if (!resultSet.next()) break;
                System.out.println("学生编号:" + resultSet.getInt("student_id") + "\n" + "学生姓名:" + resultSet.getString("student_name") + "\n" + "学生密码:" + resultSet.getString("student_password") + "\n" + "学生科目:" + resultSet.getString("class_type") + "\n" + "学生老师:" + resultSet.getString("teacher_name") + "\n" + "学生成绩:" + resultSet.getFloat("score"));
            } catch (SQLException e) {
                e.printStackTrace();
            }

        }
    }

    @Override
    public void teacherSelectOut(ResultSet resultSet) {
        try {
            resultSet.next();
            System.out.println("老师账号:" + resultSet.getInt("teacher_id") + "\t老师姓名:" + resultSet.getString("teacher_name") + "\t老师密码：" + resultSet.getString("teacher_password"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void selectClassOut(ResultSet resultSet) {
            try {
                while (resultSet.next()) {
                    System.out.println("科目编号：" + resultSet.getString("class_id") + "\t科目名称" + resultSet.getString("class_type"));
                }
            } catch (SQLException e) {
               e.printStackTrace();
            }
        }

    @Override
    public void scoreSelectOut(ResultSet resultSet) {
            try {
                while (resultSet.next()) {
                    System.out.println("学生编号：" + resultSet.getInt("student_id") + "\t科目编号:" + useDao.classIdChangeClassName(resultSet.getInt("class_id")) + "\t科目成绩：" + resultSet.getString("score"));
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    @Override
    public void studentAllSelectOut(ResultSet resultSet) {
        System.out.println("+---------------------------------------------------------------+");
        System.out.println("学生编号\t" + "学生姓名\t" + "学生密码 \t" + "学生科目\t" + "学生老师\t" + "学生成绩");
        while (true) {
            try {
                if (!resultSet.next()) break;
                System.out.println(
                        resultSet.getInt("student_id") + "\t" +
                                resultSet.getString("student_name") + " \t" +
                                resultSet.getString("student_password") + "\t" +
                                resultSet.getString("class_type") + "\t" +
                                resultSet.getString("teacher_name") + "\t" +
                                resultSet.getFloat("score"));
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        System.out.println("+---------------------------------------------------------------+");
}

    @Override
    public void teacherAllSelectOut(ResultSet resultSet) {
        System.out.println("+---------------------------------------------------------------+");
        System.out.println("老师编号\t" + "老师姓名\t" + "老师密码 \t");
        while (true) {
            try {
                if (!resultSet.next()) break;
                System.out.println(
                        resultSet.getInt("teacher_id") + "\t" +
                                resultSet.getString("teacher_name") + " \t" +
                                resultSet.getString("teacher_password") + "\t"
                );
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        System.out.println("+---------------------------------------------------------------+");
    }

}
