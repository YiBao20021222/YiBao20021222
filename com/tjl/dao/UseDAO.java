package com.tjl.dao;

import com.tjl.bean.Student;
import com.tjl.bean.User;
import com.tjl.bean.ConPreRe;
import com.tjl.jdbc.JDBCUtils;

import java.sql.*;

public class UseDAO implements DAO {
    private static final String STUDENT_SELECT ="select * from student_information where student_id=? and student_password=? and student_name=?;";
    private static final String SQL_USER_LOGIN ="select type from user where  user_id=? and user_password=? and user_name=?;";
    private static final String STUDENT_INSERT ="insert into student_control_system.Student(student_id,student_name, student_password, type) VALUES (?,?,?,1);";
    private static final String STUDENT_DELETE ="delete from student_control_system.Student where student_id=?;";
    private static final String STUDENT_ALTER="select * from student_control_system.Student where student_id=?;";
    private static final String STUDENT_ALTER_SCORE ="update student_control_system.score set score=? where student_id=? and class_id=(select class_id from student_control_system.class where class_type=?);";
    private static final String STUDENT_ALTER_CLASS ="update student_control_system.score set class_id=(select class_id from student_control_system.class where class_type=?) where student_id=? and class_id=(select class_id from student_control_system.class where class_type=?); ";
    private static final String STUDENT_ALTER_S_NAME ="update student_control_system.Student set student_name=? where student_id=?;";
    private static final String STUDENT_ALTER_PASS ="update student_control_system.Student set student_password=? where student_id=?;";
    private static final String TEACHER_SELECT_STUDENT ="select * from student_information where student_id=?";
    private static final String TEACHER_ADD ="insert into student_control_system.Teacher(teacher_id,teacher_name,teacher_password,type)values(?,?,?,2);";
    private static final String TEACHER_DELETE ="delete from student_control_system.Teacher where teacher_id=?;";
    private static final String TEACHER_ALTER_T_NAME ="update student_control_system.Teacher set teacher_name=? where teacher_id=?;";
    private static final String TEACHER_ALTER_T_PASSWORD ="update student_control_system.Teacher set teacher_password=? where teacher_id=?;";
    private static final String TEACHER_SELECT ="select * from student_control_system.Teacher t left join student_control_system.teacher_class tc on tc.teacher_id=t.teacher_id left join student_control_system.class c on c.class_id=tc.class_id where t.teacher_id=?;";
    private static final String FK_TEACHER_STUDENT ="insert into student_control_system.student_teacher(student_id,teacher_id) values (?,?);";
    private static final String FK_TEACHER_CLASS ="insert into student_control_system.teacher_class(teacher_id,class_id) values(?,?);";
    private static final String CLASS_ADD ="insert into student_control_system.class(class_type) values(?);";
    private static final String CLASS_DELETE ="delete from student_control_system.class where class_type=?;";
    private static final String CLASS_ALTER_TYPE ="update student_control_system.class set class_type=?  where class_type=?;";
    private static final String CLASS_SELECT ="select * from student_control_system.class;";
    private static final String CLASS_SELECT_ID ="select class_id from student_control_system.class where class_type=?;";
    private static final String SCORE_ADD ="insert into student_control_system.score(student_id,class_id,score) values(?,?,?);";
    private static final String SCORE_DELETE ="delete from student_control_system.score where student_id=? and class_id=?";
    private static final String SCORE_SELECT ="select * from student_control_system.score where student_id=?;";
    private static final String STUDENT_ALL_SELECT ="select * from student_control_system.student_information;";
    private static final String TEACHER_ALL_SELECT ="select * from student_control_system.Teacher;";
    private static final String CLASS_ID_CHANGE_CLASS_NAME ="select * from student_control_system.class where class_id=?;";
    private static final String TEACHER_CLASS_ALL_SELECT ="select * from student_control_system.teacher_class;";
    private static final String STUDENT_TEACHER_ALL_SELECT ="select * from student_control_system.student_teacher;";
    private static final String TEACHER_CLASS_SELECT ="select * from student_control_system.teacher_class where teacher_id=?;";
    private static final String STUDENT_TEACHER_SELECT ="select * from student_control_system.student_teacher where teacher_id=?;";
    private static final String TEACHER_CLASS_ADD ="insert into student_control_system.teacher_class(teacher_id,class_id) values(?,?);";
    private static final String TEACHER_CLASS_DELETE ="delete from student_control_system.teacher_class where teacher_id=? and class_id=?;";
    private static final String STUDENT_TEACHER_ADD ="insert into student_control_system.student_teacher(student_id,teacher_id) values(?,?);";
    private static final String STUDENT_TEACHER_DELETE ="delete from student_control_system.student_teacher where student_id=? and teacher_id=?;";
    @Override
    public int login(User user) {
        //连接数据库，创建连接对象connection
        Connection connection = JDBCUtils.getConnection();
        //执行编译环境 statement
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        int type = -1;
        assert connection != null;
        try {
            preparedStatement = connection.prepareStatement(SQL_USER_LOGIN);
            preparedStatement.setString(1, user.getuId());
            preparedStatement.setString(2, user.getuPass());
            preparedStatement.setString(3, user.getUname());
            //执行sql语句Query,得到结果对象result
            resultSet = preparedStatement.executeQuery();
            if (resultSet != null) {
                resultSet.next();
                type = resultSet.getInt("type");
            } else {
                System.out.println("密码或者账号输入错误");
            }
        } catch (SQLException e) {
            System.out.println("密码或者账号输入错误");
        } finally {
            JDBCUtils.close(connection, preparedStatement, resultSet);
        }
        return type;
    }

    @Override
    public boolean studentInsert(Student student) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_INSERT);
            preparedStatement.setString(1, String.valueOf(student.getuName()));
            preparedStatement.setString(2, student.getsName());
            preparedStatement.setString(3, student.getsPass());
            int line = preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return line > 0;
        } catch (SQLException e) {
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("添加错误:可能原因为已有该学生无法添加");
            return false;
        }
    }

    @Override
    public boolean studentDelete(String uName) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_DELETE);
            preparedStatement.setString(1, uName);
            int line = preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return line > 0;
        } catch (SQLException e) {
            System.out.println("删除错误");
            JDBCUtils.close(connection, preparedStatement, null);
            return false;
        }
    }

    @Override
    public ConPreRe studentAlter(String uName) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_ALTER);
            preparedStatement.setString(1, uName);
            resultSet = preparedStatement.executeQuery();
            resultSet.next();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询学生搜索失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public boolean studentAlterScore(int score, String uName, String cLass) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_ALTER_SCORE);
            preparedStatement.setString(1, String.valueOf(score));
            preparedStatement.setString(2, uName);
            preparedStatement.setString(3, cLass);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("修改成功");
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("修改成绩失败");
            JDBCUtils.close(connection, preparedStatement, null);
            return false;
        }
    }

    @Override
    public boolean studentAlterClass(String cLass, String uName, String updateClass) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_ALTER_CLASS);
            preparedStatement.setString(1, updateClass);
            preparedStatement.setString(2, uName);
            preparedStatement.setString(3, cLass);
            System.out.println("修改之前的科目名称：" + updateClass + "\t" + "修改的学生id" + uName + "\t" + "修改之后的科目名称：" + cLass);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("修改科目失败");
            JDBCUtils.close(connection, preparedStatement, null);
            return false;
        }
    }

    @Override
    public boolean studentAlterSName(String sName, String uName) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_ALTER_S_NAME);
            preparedStatement.setString(1, sName);
            preparedStatement.setString(2, uName);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("修改学生名字失败");
            return false;
        }
    }

    @Override
    public boolean studentAlterPass(String pass, String uName) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_ALTER_PASS);
            preparedStatement.setString(1, pass);
            preparedStatement.setString(2, uName);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("修改密码失败");
            return false;
        }
    }

    @Override
    public ConPreRe teacherSelectStudent(String uName) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_SELECT_STUDENT);
            preparedStatement.setString(1, uName);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("搜索失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);

    }

    @Override
    public ConPreRe studentSelect(Student si) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_SELECT);
            preparedStatement.setInt(1, si.getuName());
            preparedStatement.setString(2, si.getsPass());
            preparedStatement.setString(3, si.getsName());
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("搜索失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public boolean teacherAdd(String tId, String tName, String password) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_ADD);
            preparedStatement.setString(1, tId);
            preparedStatement.setString(2, tName);
            preparedStatement.setString(3, password);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            System.out.println("增加老师失败可能原因是有该学生");
            return false;
        }finally {
            JDBCUtils.close(connection, preparedStatement, null);
        }
    }

    @Override
    public boolean teacherDelete(int tId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_DELETE);
            preparedStatement.setInt(1, tId);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("删除老师失败");
            JDBCUtils.close(connection, preparedStatement, null);
            return false;
        }
    }

    @Override
    public boolean teacherAlterName(String tName, String tTd) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_ALTER_T_NAME);
            preparedStatement.setString(1, tName);
            preparedStatement.setString(2, tTd);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("修改名字失败");
            JDBCUtils.close(connection, preparedStatement, null);
            return false;
        }
    }

    @Override
    public boolean teacherAlterPassword(String tPassword, String tId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_ALTER_T_PASSWORD);
            preparedStatement.setString(1, tPassword);
            preparedStatement.setString(2, tId);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("修改密码失败");
            return false;
        }
    }

    @Override
    public ConPreRe teacherSelect(int tId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet= null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_SELECT);
            preparedStatement.setInt(1, tId);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询老师失败或者没有该老师");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public boolean managerFkStudentTeacher(int sId, int tId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        boolean flag=false;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(FK_TEACHER_STUDENT);
            preparedStatement.setInt(1, sId);
            preparedStatement.setInt(2, tId);
            preparedStatement.executeUpdate();
            System.out.println("学生编号:" + sId + "老师编号" + tId);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("老师分配学生失败");
        }finally {
            JDBCUtils.close(connection, preparedStatement, null);
        }
        return flag;
    }

    @Override
    public boolean managerFkTeacherClass(int tId, int cId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(FK_TEACHER_CLASS);
            preparedStatement.setInt(1, tId);
            preparedStatement.setInt(2, cId);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            System.out.println("老师分配科目失败原因可能为已经存在这个分配");
            JDBCUtils.close(connection, preparedStatement, null);
            return false;
        }
    }

    @Override
    public boolean addClass(String classType) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(CLASS_ADD);
            preparedStatement.setString(1, classType);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            System.out.println("添加科目失败");
            JDBCUtils.close(connection, preparedStatement, null);
            return false;
        }
    }

    @Override
    public boolean deleteClass(String classType) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(CLASS_DELETE);
            preparedStatement.setString(1, classType);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("删除科目失败");
            return false;
        }
    }

    @Override
    public boolean alterClass(String classTypeBegin, String classTypeAfter) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        boolean flag=false;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(CLASS_ALTER_TYPE);
            preparedStatement.setString(1, classTypeBegin);
            preparedStatement.setString(2, classTypeAfter);
            if(preparedStatement.executeUpdate()>0) {
                JDBCUtils.close(connection, preparedStatement, null);
            }else {
                System.out.println("没有该科目");
            }
            flag=true;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("修改科目失败");
        }finally {
            JDBCUtils.close(connection, preparedStatement, null);
        }
        return flag;
    }

    @Override
    public ConPreRe selectClass() {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(CLASS_SELECT);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询科目失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public int classNameChangeId(String className) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        int classId=-1;
        assert connection != null;
        try {
            preparedStatement = connection.prepareStatement(CLASS_SELECT_ID);
            preparedStatement.setString(1, className);
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                classId=resultSet.getInt("class_id");
            }
        } catch (SQLException e) {
            System.out.println("查询科目失败");
        }
        finally {
            JDBCUtils.close(connection, preparedStatement, resultSet);
        }
        return classId;
    }

    @Override
    public boolean scoreAdd(int studentId, int classId, float score) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(SCORE_ADD);
            preparedStatement.setInt(1, studentId);
            preparedStatement.setInt(2, classId);
            preparedStatement.setFloat(3, score);
            preparedStatement.executeUpdate();
            System.out.println("学生编号：" + studentId + "\n" + "科目编号:" + classId + "\n" + "学生成绩" + score + "\n");
            System.out.println("添加成功");
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            System.out.println("学生编号：" + studentId + "\n" + "科目编号:" + classId + "\n" + "学生成绩" + score + "\n");
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("增加成绩失败");
        }
        return false;
    }

    @Override
    public boolean scoreDelete(String studentId, int classId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(SCORE_DELETE);
            preparedStatement.setString(1, studentId);
            preparedStatement.setInt(2, classId);
            preparedStatement.executeUpdate();
            JDBCUtils.close(connection, preparedStatement, null);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("删除成绩失败");
        }
        return false;
    }

    @Override
    public ConPreRe scoreSelect(String studentId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(SCORE_SELECT);
            preparedStatement.setString(1, studentId);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("搜索成绩失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public ConPreRe studentAllSelect() {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_ALL_SELECT);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询学生全体失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public ConPreRe teacherAllSelect() {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_ALL_SELECT);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询老师全体失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public String classIdChangeClassName(int classId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(CLASS_ID_CHANGE_CLASS_NAME);
            preparedStatement.setString(1, String.valueOf(classId));
            ResultSet resultSet = preparedStatement.executeQuery();
            resultSet.next();
            String str = resultSet.getString("class_type");
            JDBCUtils.close(connection, preparedStatement, resultSet);
            return str;
        } catch (SQLException e) {
            JDBCUtils.close(connection, preparedStatement, null);
            System.out.println("查询失败");
        }
        return null;
    }

    @Override
    public ConPreRe selectTeacherAllClass() {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_CLASS_ALL_SELECT);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询老师课程表失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public ConPreRe selectStudentAllTeacher() {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_TEACHER_ALL_SELECT);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询学生授讲表失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public ConPreRe selectTeacherClass(String teacherId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_CLASS_SELECT);
            preparedStatement.setString(1, teacherId);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询指定老师授课表失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public ConPreRe selectStudentTeacher(String teacherId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_TEACHER_SELECT);
            preparedStatement.setString(1, teacherId);
            resultSet = preparedStatement.executeQuery();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("查询指定老师授讲表失败");
        }
        return new ConPreRe(connection,preparedStatement,resultSet);
    }

    @Override
    public boolean studentTeacherAdd(String studentId, String teacherId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_TEACHER_ADD);
            preparedStatement.setString(1, studentId);
            preparedStatement.setString(2, teacherId);
            int line=preparedStatement.executeUpdate();
            JDBCUtils.close(connection,preparedStatement,null);
            if(line>0){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection,preparedStatement,null);
            System.out.println("增加指定老师授讲表失败");
        }
        return false;
    }

    @Override
    public boolean studentTeacherDelete(String studentId, String teacherId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(STUDENT_TEACHER_DELETE);
            preparedStatement.setString(1, studentId);
            preparedStatement.setString(2, teacherId);
            int line=preparedStatement.executeUpdate();
            JDBCUtils.close(connection,preparedStatement,null);
            if(line>0){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection,preparedStatement,null);
            System.out.println("删除指定老师授讲表失败");
        }
        return false;
    }

    @Override
    public boolean teacherClassAdd(String teacherId, String classId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_CLASS_ADD);
            preparedStatement.setString(1, teacherId);
            preparedStatement.setString(2, classId);
            int line=preparedStatement.executeUpdate();
            JDBCUtils.close(connection,preparedStatement,null);
            if(line>0){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection,preparedStatement,null);
            System.out.println("增加指定老师授课表失败");
        }
        return false;
    }

    @Override
    public boolean teacherClassDelete(String teacherId, String classId) {
        Connection connection = JDBCUtils.getConnection();
        PreparedStatement preparedStatement = null;
        try {
            assert connection != null;
            preparedStatement = connection.prepareStatement(TEACHER_CLASS_DELETE);
            preparedStatement.setString(1, teacherId);
            preparedStatement.setString(2, classId);
            int line=preparedStatement.executeUpdate();
            JDBCUtils.close(connection,preparedStatement,null);
            if(line>0){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JDBCUtils.close(connection,preparedStatement,null);
            System.out.println("删除指定老师授课表失败");
        }
        return false;
    }


}
