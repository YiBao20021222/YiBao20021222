package com.tjl.dao;
import com.tjl.bean.User;
import com.tjl.bean.ConPreRe;
import com.tjl.bean.Student;
public interface DAO {
    /**登录系统
     *
     * @param user User 登录账号和密码
     * @return Int 登录权限
     */

    int login(User user);
    /**添加学生
     *
     * @param student Student 学生的姓名和密码
     * @return  boolean 是否添加成功
     */

    boolean studentInsert(Student student);
    /**删除学生
     *
     * @param uName String 学生的账号
     * @return  boolean 是否学生删除成功
     */

    boolean studentDelete(String uName);
    /**
     * 修改学生是否存在
     *
     * @param uName String 学生的账号
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */

    ConPreRe studentAlter(String uName);
    /**修改学生成绩
     * @param  score Int 修改成绩
     * @param  uName String 学生的账号
     * @param  cLass String 科目名称
     * @return boolean 执行成功了没有
     */

    boolean studentAlterScore(int score, String uName, String cLass);
    /**修改学生科目
     *
     * @param cLass String 要修改的科目名称
     * @param uName String 修改学生的账号
     * @param updateClass String 修改后的科目名称
     * @return boolean 修改是否成功
     */

    boolean studentAlterClass(String cLass, String uName, String updateClass);

    /**修改学生名字
     *
     * @param sName String 学生的名字
     * @param uName String 学生的账号
     * @return boolean 修改是否成功
     */
    boolean studentAlterSName(String sName, String uName);

    /**修改学生密码
     *
     * @param pass String 修改后的学生密码
     * @param uName String 学生账号
     * @return  boolean  是否修改成功
     */
    boolean studentAlterPass(String pass, String uName);

    /**
     * 搜索学生
     *
     * @param uName String 学生账号
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */
    ConPreRe teacherSelectStudent(String uName);

    /**
     * 学生自己搜索
     *
     * @param si Student 学生
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */

    ConPreRe studentSelect(Student si);

    /**增加老师
     *
     * @param  tId String 老师学号
     * @param tName String 老师名字
     * @param password String 老师密码
     * @return boolean 添加是否成功
     */
    boolean teacherAdd(String tId, String tName, String password);

    /**删除老师
     *
     * @param tId Int 老师的账号
     * @return  boolean 是否删除老师成功
     */

    boolean teacherDelete(int tId);

    /**修改老师的名字
     *
     * @param tName String 修改后的名字
     * @param tTd  String 修改老师的账号
     * @return boolean 是否修改成功
     */
    boolean teacherAlterName(String tName, String tTd);

    /**修改老师密码
     *
     * @param tPassword String 修改后的老师的密码
     * @param tId  String 老师的账号
     * @return  boolean 是否修改成功
     */
    boolean teacherAlterPassword(String tPassword, String tId);

    /**
     * 搜索老师的张号
     *
     * @param tId Int 老师的账号
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */

    ConPreRe teacherSelect(int tId);

    /**老师下的学生
     *
     * @param sId Int 学生的账号
     * @param tId Int 老师的账号
     * @return boolean 连接是否成功
     */
    boolean managerFkStudentTeacher(int sId, int tId);

    /**
     * 老师教的科目
     *
     * @param tId Int 老师的账号
     * @param cId Int 科目的编号
     * @return boolean 连接是否成功
     */
    boolean managerFkTeacherClass(int tId,int cId);

    /**
     * 科目添加
     *
     * @param classType String 科目的名字
     * @return boolean 是否添加成功
     */
    boolean addClass(String classType);

    /**
     * 删除科目
     *
     * @param classType String 科目的名字
     * @return boolean 是否删除成功
     */
    boolean deleteClass(String classType);

    /**
     * 修改科目名字
     *
     * @param classTypeBegin String 修改后科目的名称
     * @param classTypeAfter String 要修改科目的名称
     * @return boolean 是否修改成功
     */
    boolean alterClass(String classTypeBegin,String classTypeAfter);

    /**
     * 搜索科目
     *
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */
    ConPreRe selectClass();

    /**
     * 科目名称转换科目编号
     *
     * @param className String 科目名称
     * @return Int 科目编号
     */
    int classNameChangeId(String className);

    /**
     * 成绩添加
     *
     * @param studentId Int 学生编号
     * @param classId   Int 科目编号
     * @param score     float 成绩
     * @return boolean 是否添加成功
     */
    boolean scoreAdd(int studentId, int classId, float score);


    /**
     * 成绩删除
     *
     * @param studentId String 学生编号
     * @param cLass     Int 科目名称
     * @return boolean 是否删除成功
     */
    boolean scoreDelete(String studentId,int cLass);

    /**
     * 成绩搜索
     *
     * @param studentId String 学生编号
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */
    ConPreRe scoreSelect(String studentId);

    /** 搜索全部学生信息
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */
    ConPreRe studentAllSelect();

    /** 搜索全部老师信息
     * @return ConPreRe  Connection和PrepareStatement和resultSet构成的类
     */
    ConPreRe teacherAllSelect();

    /**
     * 科目编号转换为科目名称
     *
     * @param classId Int 科目编号
     * @return String 科目名称
     */
    String classIdChangeClassName(int classId);

    /**查询老师授课表
     *
     * @return  ConPreRe Connection和PrepareStatement和resultSet构成的类
     */
    ConPreRe selectTeacherAllClass();

    /**查询学生授讲表
     *
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     *
     */
    ConPreRe selectStudentAllTeacher();

    /**
     * 搜索指定的老师分配的科目
     *
     * @param teacherId String 老师的学号
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */
    ConPreRe selectTeacherClass(String teacherId);

    /**搜索指定的老师分配的学生
     *
     * @param  teacherId String 老师的学号
     * @return ConPreRe Connection和PrepareStatement和resultSet构成的类
     */

    ConPreRe selectStudentTeacher(String teacherId);

    /**
     * 增加学生授教表
     *
     * @param studentId String 学生学号
     * @param teacherId String 老师学号
     * @return boolean 是否执行成功
     */

    boolean studentTeacherAdd(String studentId,String teacherId);

    /**
     * 删除学生授教表
     *
     * @param studentId String 学生学号
     * @param teacherId String 老师学号
     * @return boolean 是否执行成功
     */
    boolean studentTeacherDelete(String studentId,String teacherId);

    /**
     * 增加老师授课表
     *
     * @param teacherId String 老师学号
     * @param classId   String 科目编号
     * @return boolean 是否执行成功
     */
    boolean teacherClassAdd(String teacherId,String classId);

    /**
     * 删除老师授课表
     *
     * @param teacherId String 老师学号
     * @param classId   String 科目编号
     * @return boolean 是否执行成功
     */
    boolean teacherClassDelete(String teacherId,String classId);
}
