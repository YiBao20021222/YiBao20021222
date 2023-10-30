package com.tjl.control;
import com.tjl.bean.Student;
import com.tjl.bean.User;
import com.tjl.bean.ConPreRe;
import com.tjl.bean.Teacher;
import com.tjl.dao.UseDAO;
import com.tjl.jdbc.JDBCUtils;
import com.tjl.out.UseOUT;
import com.tjl.view.view;
import com.poi.dao.useDao;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Control {
    private static final UseDAO useDao = new UseDAO();
    private static final useDao PoiUesDao=new useDao();
    private static final UseOUT useout=new UseOUT();

    //学生登录
    public static void studentLogin() {
        while(true) {
            int studentChoose = view.student_view();
            boolean flag1=false;
            switch (studentChoose) {
                case 0:
//退出
                    System.exit(0);
                    break;
                case 1:
//学生查询
                    while (!flag1) {
                        Student si = view.student_select();
                        ConPreRe ConPreRe =useDao.studentSelect(si);
                        ResultSet resultSet = ConPreRe.getResultSet();
                        if(resultSet!=null){
                            while (true) {
                                try {
                                    if (!resultSet.next()) break;
                                    System.out.println("学生编号:" + resultSet.getInt("student_id") + "\n" + "学生姓名:" + resultSet.getString("student_name") + "\n" + "学生密码:" + resultSet.getString("student_password") + "\n" + "学生科目:" + resultSet.getString("class_type") + "\n" + "学生老师:" + resultSet.getString("teacher_name") + "\n" + "学生成绩:" + resultSet.getFloat("score"));
                                } catch (SQLException e) {
                                    e.printStackTrace();
                                }
                            }
                            flag1=true;
                        }
                        JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
                    }
                    break;
                default:
                    break;
            }
        }
    }

    //老师登录
    public static void teacher_login() {
        while (true) {
            int teacherChoose = view.teacher_view();
            switch (teacherChoose) {
                case 0:
                    System.exit(0);
                     break;

                case 1:
//老师添加学生
                    Student student = view.teacher_add_student();
                    if (useDao.studentInsert(student)) {
                        System.out.println("ture");
                    } else {
                        System.out.println("false");
                    }
                    break;

                case 2:
//老师删除学生
                    String uname = view.teacher_delete_student();
                    if (useDao.studentDelete(uname)) {
                        System.out.println("ture");
                    } else {
                        System.out.println("false");
                    }
                    break;

                case 3:
//老师修改学生
                    boolean flag2 = false;
                    while (true) {
                        boolean flag1 = false;
                        String uName = null;
                        while (!flag2) {
                            uName = view.teacher_alter_student_indexView();
                            ConPreRe ConPreRe =useDao.studentAlter(uName);
                            ResultSet resultSet = ConPreRe.getResultSet();
                            if (resultSet != null) {
                                useout.studentAlterOut(resultSet);
                                flag2=true;
                            }
                            JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
                        }
                        int teacher_alter_student_view = view.teacher_alter_student_View();
                        switch (teacher_alter_student_view) {
                            case 0:
                                flag1=true;
                                break;
                            case 1:
//老师修改学生成绩
                                String Class = view.teacher_alter_student_score2();
                                int score = view.teacher_alter_student_score1();
                                if (useDao.studentAlterScore(score, uName, Class)) {
                                    System.out.println("ture");
                                } else {
                                    System.out.println("false");
                                }
                                break;

                            case 2:
//老师修改学生密码
                                String pass = view.teacher_alter_student_pass();
                                if (useDao.studentAlterPass(pass, uName)) {
                                    System.out.println("ture");
                                } else {
                                    System.out.println("false");
                                }

                                break;
                            case 3:
//老师修改学生名字
                                String name = view.teacher_alter_student_name();
                                if (useDao.studentAlterSName(uName, name)) {
                                    System.out.println("ture");
                                } else {
                                    System.out.println("false");
                                }

                                break;
                            case 4:
//老师修改学生科目
                                String class1 = view.teacher_alter_student_class();
                                String updateClass = view.teacher_alter_student_class2();
                                if (useDao.studentAlterClass(class1, uName, updateClass)) {
                                    System.out.println("ture");
                                } else {
                                    System.out.println("false");
                                }

                        }
                        if (flag1) {
                            break;
                        }

                    }
                    break;
                case 4:
//老师删除学生
                    String uName = view.teacher_select_student();
                    ConPreRe ConPreRe =useDao.teacherSelectStudent(uName);
                    ResultSet resultSet= ConPreRe.getResultSet();
                    if (resultSet!=null) {
                        useout.teacherSelectStudentOut(resultSet);
                    } else {
                        System.out.println("false");
                    }
                    JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
                    break;
                case 5:
//老师添加成绩
                    String student_id=view.score_add1();
                    int Class_id=useDao.classNameChangeId(view.score_add2());
                    int score=Integer.parseInt(view.score_add3());
                    if (useDao.scoreAdd(Integer.parseInt(student_id), Class_id, score)) {
                        System.out.println("ture");
                    } else {
                        System.out.println("false");
                    }
                    break;
                case 6:
//老师删除成绩
                    String student_id2=view.score_delete1();
                    int class_id2=useDao.classNameChangeId(view.score_delete2());
                    if (useDao.scoreDelete(student_id2, class_id2)) {
                        System.out.println("ture");
                    } else {
                        System.out.println("false");
                    }
                    break;
                case 7:
//老师查询成绩
                    String student_id3=view.score_select();
                    ConPreRe conPreRe1 =useDao.scoreSelect(student_id3);
                    ResultSet resultSet1= conPreRe1.getResultSet();
                    if (resultSet1!=null) {
                        useout.scoreSelectOut(resultSet1);
                    } else {
                        System.out.println("false");
                    }
                    JDBCUtils.close(conPreRe1.getConnection(), conPreRe1.getPreparedStatement(), conPreRe1.getResultSet());
                    break;
                case 8:
//老师加载学生表
                    if (PoiUesDao.load_student_sheet()) {
                        System.out.println("ture");
                    } else {
                        System.out.println("false");
                    }
                    break;
                case 9:
//老师加载成绩表
                    if (PoiUesDao.load_score_Sheet()) {
                        System.out.println("ture");
                    } else {
                        System.out.println("false");
                    }
                    break;


            }
        }
    }

    //管理员登录
    public static void manager_login() {
        boolean flag = false;
        while (!flag) {
            int manager = view.manager_view();
            switch (manager) {
                    case 0:
                        System.exit(0);
                        flag = true;
                        break;
//管理员添加学生
                    case 1:
                        Student student = view.teacher_add_student();
                        if (useDao.studentInsert(student)) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
                    case 2:
//管理员删除学生
                        String uname = view.teacher_delete_student();
                        if (useDao.studentDelete(uname)) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
                    case 3:
                        while (true) {
                            boolean flag1 = false;
                            boolean flag2 = false;
                            String uName = null;
                            while (!flag2) {
                                uName = view.teacher_alter_student_indexView();
                                ConPreRe ConPreRe =useDao.studentAlter(uName);
                                ResultSet resultSet= ConPreRe.getResultSet();
                                if(resultSet!=null) {
                                    useout.studentAlterOut(resultSet);
                                    flag2 = true;
                                }
                                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
                            }
                            int teacher_alter_student_view = view.teacher_alter_student_View();
                            switch (teacher_alter_student_view) {
                                case 0:
                                    flag1=true;
                                    break;
                                case 1:
//管理员修改学生成绩
                                    String Class = view.teacher_alter_student_score2();
                                    int score = view.teacher_alter_student_score1();
                                    if (useDao.studentAlterScore(score, uName, Class)) {
                                        System.out.println("ture");
                                    } else {
                                        System.out.println("false");
                                    }
                                    break;

                                case 2:
//管理员修改学生密码
                                    String pass = view.teacher_alter_student_pass();
                                    if (useDao.studentAlterPass(pass, uName)) {
                                        System.out.println("ture");
                                    } else {
                                        System.out.println("false");
                                    }

                                    break;
                                case 3:
//管理员修改学生名字
                                    String name = view.teacher_alter_student_name();
                                    if (useDao.studentAlterSName(uName, name)) {
                                        System.out.println("ture");
                                    } else {
                                        System.out.println("false");
                                    }

                                    break;
                                case 4:
//管理员修改学生科目
                                    String class1 = view.teacher_alter_student_class();
                                    String updateClass = view.teacher_alter_student_class2();
                                    if (useDao.studentAlterClass(class1, uName, updateClass)) {
                                        System.out.println("ture");
                                    } else {
                                        System.out.println("false");
                                    }
                                    break;

                            }
                            if (flag1) {
                                break;
                            }
                        }
                        break;
                    case 4:
//管理员搜索学生成绩
                        String uName = view.teacher_select_student();
                        ConPreRe ConPreRe =useDao.teacherSelectStudent(uName);
                        ResultSet resultSet= ConPreRe.getResultSet();
                        if (resultSet!=null) {
                            useout.teacherSelectStudentOut(resultSet);
                        } else {
                            System.out.println("false");
                        }
                        JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
                        break;
                    case 5:
//管理员添加老师
                        Teacher teacher = view.add_teacher();
                        if (useDao.teacherAdd(teacher.getTeacherId(),teacher.getTeacherName(), teacher.getTeacherPassword())) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
                    case 6:
//管理员删除老师
                        String t_name = view.teacher_delete_student();
                        if (useDao.teacherDelete(Integer.parseInt(t_name))) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
                    case 7:
//管理员修改老师信息
                        boolean flag3 = false;
                        while (!flag3) {
                            int choose = view.alter_teacher();
                            switch (choose) {
                                case 0:

                                    flag3=true;
                                    break;

                                case 1:
//管理员修改老师名字
                                    String t_id = view.teacher_alter_student_indexView();
                                    String teacher_name = view.teacher_alter_student_name();
                                    if (useDao.teacherAlterName(teacher_name, t_id)) {
                                        System.out.println("ture");
                                    } else {
                                        System.out.println("false");
                                    }
                                    break;
                                case 2:
//管理员修改老师密码
                                    String teac_id = view.teacher_alter_student_indexView();
                                    String teacher_password = view.teacher_alter_student_pass();
                                    if (useDao.teacherAlterPassword(teacher_password, teac_id)) {
                                        System.out.println("ture");
                                    } else {
                                        System.out.println("false");
                                    }
                                    break;
                            }

                        }
                        break;
                    case 8:
//管理员搜索老师
                        String teacher_id = view.teacher_select_student();
                        ConPreRe conPreRe1 =useDao.teacherSelect(Integer.parseInt(teacher_id));
                        ResultSet resultSet1= conPreRe1.getResultSet();
                        if (resultSet1!=null) {
                            useout.teacherSelectOut(resultSet1);
                        } else {
                            System.out.println("false");
                        }
                        JDBCUtils.close(conPreRe1.getConnection(), conPreRe1.getPreparedStatement(), conPreRe1.getResultSet());
                        break;

                    case 9:
//管理员添加科目
                        String Class = view.add_class();
                        if (useDao.addClass(Class)) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;

                    case 10:
//管理员删除科目
                        String Class2 = view.delete_class();
                        if (useDao.deleteClass(Class2)) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;

                    case 11:
//管理员修改科目
                        String Class3 = view.alter_class();
                        String Class4 = view.alter_class2();
                        if (useDao.alterClass(Class4, Class3)) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;

                    case 12:
//管理员搜索科目
                        view.select_class();
                        ConPreRe conPreRe2 =useDao.selectClass();
                        ResultSet resultSet2= conPreRe2.getResultSet();
                        if (resultSet2!=null) {
                            useout.selectClassOut(resultSet2);
                        } else {
                            System.out.println("false");
                        }
                        JDBCUtils.close(conPreRe2.getConnection(), conPreRe2.getPreparedStatement(), conPreRe2.getResultSet());
                        break;

                    case 13:
//管理员给老师选学生
                        int student_id = Integer.parseInt(view.fk_student_teacher());
                        int t_id = Integer.parseInt(view.fk_student_teacher2());
                        if (useDao.managerFkStudentTeacher(student_id, t_id)) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;

                    case 14:
//管理员给老师选科目
                        int tea_id = Integer.parseInt(view.fk_teacher_class());
                        String c_name = view.fk_teacher_class2();
                        int c_id = useDao.classNameChangeId(c_name);
                        if (c_id != -1) {
                            if (useDao.managerFkTeacherClass(tea_id, c_id)) {
                                System.out.println("ture");
                            } else {
                                System.out.println("false");
                            }
                        }
                        break;
                    case 15:
//管理员添加成绩
                        String student_id2 = view.score_add1();
                        int Class_id = useDao.classNameChangeId(view.score_add2());
                        int score = Integer.parseInt(view.score_add3());
                        if (useDao.scoreAdd(Integer.parseInt(student_id2), Class_id, score)) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
                    case 16:
//管理员删除成绩
                        String student_id3 = view.score_delete1();
                        int class_id2 = useDao.classNameChangeId(view.score_delete2());
                        if (useDao.scoreDelete(student_id3, class_id2)) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
                    case 17:
//管理员搜索成绩
                        String student_id4 = view.score_select();
                        ConPreRe conPreRe3 =useDao.scoreSelect(student_id4);
                        ResultSet resultSet3= conPreRe3.getResultSet();
                        if (resultSet3!=null) {
                            useout.scoreSelectOut(resultSet3);
                        } else {
                            System.out.println("false");
                        }
                        JDBCUtils.close(conPreRe3.getConnection(), conPreRe3.getPreparedStatement(), conPreRe3.getResultSet());
                        break;
//管理员加载学生表
                    case 18:

                        if (PoiUesDao.load_student_sheet()) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
//管理员加载老师表
                    case 19:
                        if (PoiUesDao.load_teacher_Sheet()) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
//管理员加载成绩表
                    case 20:
                        if (PoiUesDao.load_score_Sheet()) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
//管理员加载科目表
                    case 21:
                        if (PoiUesDao.load_class_Sheet()) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
//管理员加载学生与老师表
                    case 22:
                        if (PoiUesDao.load_fk_student_teacher()) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
//管理员加载老师与科目表
                    case 23:
                        if (PoiUesDao.load_fk_teacher_class()) {
                            System.out.println("ture");
                        } else {
                            System.out.println("false");
                        }
                        break;
//管理员查看所有学生的信息
                    case 24:
                        ConPreRe conPreRe4 = useDao.studentAllSelect();
                        ResultSet resultSet4= conPreRe4.getResultSet();
                        if (resultSet4!=null) {
                            useout.studentAllSelectOut(resultSet4);
                        } else {
                            System.out.println("false");
                        }
                        JDBCUtils.close(conPreRe4.getConnection(), conPreRe4.getPreparedStatement(), conPreRe4.getResultSet());
                        break;
//管理员查看所有老师的信息
                    case 25:
                        ConPreRe conPreRe5 =useDao.teacherAllSelect();
                        ResultSet resultSet5= conPreRe5.getResultSet();
                        if (resultSet5!=null) {
                            useout.teacherAllSelectOut(resultSet5);
                        } else {
                            System.out.println("false");
                        }
                        JDBCUtils.close(conPreRe5.getConnection(), conPreRe5.getPreparedStatement(), conPreRe5.getResultSet());
                        break;
                }

        }
    }

    public void Start(){
            int type = -1;
            while (type == -1) {
                User user = view.indexView();
                type = useDao.login(user);
            }
            switch (type) {
                case 1:
//学生登录
                    studentLogin();
                    break;
                case 2:
//老师登录
                    teacher_login();
                    break;
                case 3:
//管理员登录
                    manager_login();
                    break;

        }
    }

}
