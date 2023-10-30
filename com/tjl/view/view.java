package com.tjl.view;
import com.tjl.bean.Student;
import com.tjl.bean.User;
import com.tjl.bean.Teacher;

import java.util.Scanner;

public class view {
    //首页视图
    private static final Scanner input=new Scanner(System.in);
    /**首页视图
     *
     * @return User User 账号和密码
     */
    public static  User indexView(){

        System.out.println("********************************************************************");
        System.out.println("**********              学生成绩管理系统             ******************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入账号                  ******************");
        String uName=input.nextLine();
        System.out.println("**********              请输入密码                  ******************");
        String uPass=input.nextLine();
        System.out.println("**********              请输入姓名                  ******************");
        String Uname=input.nextLine();
        System.out.println("********************************************************************");
        return new User(uName,uPass,Uname);

    }
    /**老师视图
     *
     * @return int类型的变量 <br>
     * 0、退出<br>
     * 1、添加学生信息<br>
     * 2、删除学生信息<br>
     * 3、修改学生信息<br>
     * 4、查询学生信息<br>
     * 5、添加学生成绩<br>
     * 6、删除学生成绩<br>
     * 7、查询学生成绩<br>
     * 8、加载学生表<br>
     * 9、加载成绩表<br>
     */
    public static int teacher_view(){
        System.out.println("********************************************************************");
        System.out.println("**********               欢迎老师回家               ******************");
        System.out.println("**********               请根据提示操作              ******************");
        System.out.println("**********               0、退出                   ******************");
        System.out.println("**********               1、增加学生信息             ******************");
        System.out.println("**********               2、删除学生信息             ******************");
        System.out.println("**********               3、修改学生信息            ******************");
        System.out.println("**********               4、查询学生信息            ******************");
        System.out.println("**********               5、添加学生成绩           ******************");
        System.out.println("**********               6、删除学生成绩            ******************");
        System.out.println("**********               7、查找学生成绩            ******************");
        System.out.println("**********               8、加载学生表              ******************");
        System.out.println("**********               9、加载成绩表              ******************");
        int teacher_chose=Integer.parseInt(input.nextLine());
        if(!(teacher_chose>=0&&teacher_chose<=9)){
           return  teacher_view();
        }
        System.out.println("********************************************************************");
        return teacher_chose;
    }
    /**增加学生
     *
     * @return Student student类 包括学生姓名和密码。
     */
    public static Student teacher_add_student(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入学号                  ******************");
        int Uname=Integer.parseInt(input.nextLine());
        System.out.println("**********              请输入姓名                  ******************");
        String sName=input.nextLine();
        System.out.println("********************************************************************");
        System.out.println("**********              请输入密码                  ******************");
        String sPass=input.nextLine();
        System.out.println("********************************************************************");
        return new Student(Uname,sName,sPass);
    }

    /**删除学生
     *
     * @return string 学生账号
     */
    public static String teacher_delete_student(){
        System.out.println("*******************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              删除的账号                  ******************");
        String uName=input.nextLine();
        System.out.println("********************************************************************");
        return uName;
    }

    /**搜索学生的账号
     *
     * @return string 学生的账号
     */
    public static String teacher_alter_student_indexView(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              请输入账号                  ******************");
        return input.nextLine();
    }

    /**修改学生的选项
     *
     * @return int 修改学生信息选项
     */
    public static int teacher_alter_student_View(){
        System.out.println("*******************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********            0、退出                       ****************");
        System.out.println("**********            1、修改学生成绩                ****************");
        System.out.println("**********            2、修改学生密码                ****************");
        System.out.println("**********            3、修改学生姓名                ****************");
        System.out.println("**********            4、修改学生科目                ****************");
        int teacher_alter_chose=Integer.parseInt(input.nextLine());
        if(!(teacher_alter_chose>=0&&teacher_alter_chose<=4)){
            return  teacher_alter_student_View();
        }
        System.out.println("********************************************************************");
        return teacher_alter_chose;
    }

    /**修改学生的成绩
     *
     * @return int 学生分数
     */
    public static int teacher_alter_student_score1(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              请输入学生分数               ******************");
        return Integer.parseInt(input.nextLine());
    }
    public static String teacher_alter_student_score2(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              请输入学生科目              ******************");
        return input.nextLine();
    }

    /**修改学生的科目
     *
     * @return String 学生科目
     */
    public static String teacher_alter_student_class(){
        System.out.println("******************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              请输入要修改的学生科目名称     ******************");
        return input.nextLine();
    }
    public static String teacher_alter_student_class2(){
        System.out.println("******************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              修改后学生科目的名称          ******************");
        return input.nextLine();
    }

    /**修改学生的名字
     *
     * @return String 学生名字
     */
    public static String teacher_alter_student_name(){
        System.out.println("******************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              请输入修改后的姓名                  ******************");
        return input.nextLine();
    }

    /**修改学生的密码
     *
     * @return  String 学生密码
     */
    public static String teacher_alter_student_pass(){
        System.out.println("******************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              请输入密码                  ******************");
        return input.nextLine();
    }

    /**查找学生的信息
     *
     * @return string 学生账号
     */
    public static String teacher_select_student(){
        System.out.println("*******************************************************************");
        System.out.println("**********              请根据提示操作               *****************");
        System.out.println("**********              请输入账号                  ******************");
        String uName=input.nextLine();
        System.out.println("********************************************************************");
        return uName;
    }
    /**学生视图
     *
     * @return int 学生试图选项
     *
     */
    public static int student_view(){
        System.out.println("********************************************************************");
        System.out.println("**********               欢迎学生回家               ******************");
        System.out.println("**********               请根据提示操作              ******************");
        System.out.println("**********               0、退出                   ******************");
        System.out.println("**********               1、查找自己信息            ******************");
        int student_chose=Integer.parseInt(input.nextLine());
        if(!(student_chose>=0&&student_chose<=1)){
            return  teacher_view();
        }
        System.out.println("********************************************************************");
        return student_chose;
    }

    /**学生查询视图
     * @return Student 学生
     */
    public static Student student_select(){
        System.out.println("*******************************************************************");
        System.out.println("*                     请输入学生学号:                                *");
        int s_id=Integer.parseInt(input.nextLine());
        System.out.println("*                     请输入学生姓名:                                *");
        String s_name=input.nextLine();
        System.out.println("*                     请输入学生密码:                                *");
        String s_password=input.nextLine();
        System.out.println("*******************************************************************");
        return new Student(s_id,s_name,s_password);
    }

    /**管理员系统视图
     *
     * @return  int类型 <br>
     *  0、退出 <br>
     *  1、添加学生信息 <br>
     *  2、删除学生信息 <br>
     *  3、修改学生信息 <br>
     *  4、查询学生信息 <br>
     *  5、增加老师信息 <br>
     *  6、删除老师信息 <br>
     *  7、修改老师信息 <br>
     *  8、查询老师信息 <br>
     *  9、增加科目信息 <br>
     *  10、删除科目信息 <br>
     *  11、修改科目信息 <br>
     *  12、查询科目信息 <br>
     *  13、为学生分配老师 <br>
     *  14、给老师分配科目 <br>
     *  15、增加成绩 <br>
     *  16、删除成绩 <br>
     *  17、查询成绩 <br>
     *  18、加载学生表 <br>
     *  19、加载老师表 <br>
     *  20、加载成绩表 <br>
     *  22、加载学生授教表 <br>
     *  23、加载老师授课表 <br>
     *  24、管理员查看学生所有信息<br>
     *  25、管理员查看老师所有信息<br>
     */
    public static int manager_view(){
        System.out.println("********************************************************************");
        System.out.println("**********               欢迎管理员回家              ******************");
        System.out.println("**********               请根据提示操作              ******************");
        System.out.println("**********               0、退出                   ******************");
        System.out.println("**********               1、添加学生信息             ******************");
        System.out.println("**********               2、删除学生信息             ******************");
        System.out.println("**********               3、修改学生信息             ******************");
        System.out.println("**********               4、查询学生信息             ******************");
        System.out.println("**********               5、增加老师信息            ******************");
        System.out.println("**********               6、删除老师信息            ******************");
        System.out.println("**********               7、修改老师信息            ******************");
        System.out.println("**********               8、查询老师信息            ******************");
        System.out.println("**********               9、增加科目信息            ******************");
        System.out.println("**********               10、删除科目信息           ******************");
        System.out.println("**********               11、修改科目信息            ******************");
        System.out.println("**********               12、查询科目信息           ******************");
        System.out.println("**********               13、为学生分配老师          ******************");
        System.out.println("**********               14、给老师分配科目          ******************");
        System.out.println("**********               15、增加成绩               ******************");
        System.out.println("**********               16、删除成绩               ******************");
        System.out.println("**********               17、查询成绩               ******************");
        System.out.println("**********               18、加载学生表             ******************");
        System.out.println("**********               19、加载老师表             ******************");
        System.out.println("**********               20、加载成绩表             ******************");
        System.out.println("**********               21、加载科目表             ******************");
        System.out.println("**********               22、加载学生授教表          ******************");
        System.out.println("**********               23、加载老师授课表          ******************");
        System.out.println("*********                24、管理员查看学生所有信息    ******************");
        System.out.println("*********                25、管理员查看老师所有信息    ******************");
        int manager_chose=Integer.parseInt(input.nextLine());
        if(!(manager_chose>=0&&manager_chose<=25)){
            return  manager_view();
        }
        System.out.println("********************************************************************");
        return manager_chose;

    }

    /**添加老师视图
     *
     * @return teacher的名字和姓名
     */
    public static Teacher add_teacher(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入账号                                    ");
        String t_id=input.nextLine();
        System.out.println("**********              请输入姓名                  ******************");
        String tName=input.nextLine();
        System.out.println("********************************************************************");
        System.out.println("**********              请输入密码                  ******************");
        String tPass=input.nextLine();
        System.out.println("********************************************************************");
        return new Teacher(t_id,tName,tPass);
    }

    /**修改老师视图
     *
     * @return int
     * 0、退出
     * 1、修改老师的名字<br>
     * 2、修改老师的密码<br>
     */
    public static int alter_teacher(){
        System.out.println("********************************************************************");
        System.out.println("**********               请根据提示操作              ******************");
        System.out.println("**********               0、退出                   ******************");
        System.out.println("**********               1、修改老师名字             ******************");
        System.out.println("**********               2、修改老师密码             ******************");
        return  Integer.parseInt(input.nextLine());
    }

    /**添加科目
     *
     * @return String 科目名字
     */
    public static String add_class(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              科目名称                    ******************");
        return input.nextLine();
    }

    /**删除科目
     *
     * @return String 科目名称
     */
    public static String delete_class(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              科目名称                    ******************");
        return input.nextLine();
    }

    /**修改科目
     *
     * @return String 要修改的科目名称
     */
    public static String alter_class(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              要修改的科目名称              ******************");
        return input.nextLine();
    }

    /**修改科目2
     *
     * @return String 修改后的名称
     */
    public static String alter_class2(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              修改后的科目名称              ******************");
        return input.nextLine();
    }

    /**查询所有科目
     *
     */
    public static void select_class(){
        System.out.println("********************************************************************");
    }

    /**学生与老师
     *
     * @return String  学生账号
     */
    public static String fk_student_teacher(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入学生的账号             ******************");
        return input.nextLine();
    }

    /**学生与老师2
     *
     * @return String 老师账号
     */
    public static String fk_student_teacher2(){
        System.out.println("**********              请输入老师的账号             ******************");
        String id=input.nextLine();
        System.out.println("********************************************************************");
        return id;
    }

    /**老师与科目
     *
     * @return String 老师账号
     */
    public static String fk_teacher_class(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入老师的账号             ******************");
        return input.nextLine();
    }

    /**老师与科目2
     *
     * @return String科目名称
     */
    public static String fk_teacher_class2(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入科目的名称             ******************");
        return input.nextLine();
    }

    /**成绩添加
     *
     * @return  Stirng 学生编号
     */
    public static String score_add1(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入学生账号               ******************");
        return input.nextLine();
    }

    /**成绩添加2
     *
     * @return String 科目名称
     */
    public static String score_add2(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入科目名称               ******************");
        return input.nextLine();
    }

    /**成绩添加3
     *
     * @return String 添加分数
     */
    public static String score_add3(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入成绩                  ******************");
        return input.nextLine();
    }

    /**成绩删除
     *
     * @return String 学生张号
     */
    public static String score_delete1(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入学生账号               ******************");
        return input.nextLine();
    }

    /**成绩删除2
     *
     * @return String 科目名称
     */
    public static String score_delete2(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入科目名称               ******************");
        return input.nextLine();
    }

    /**成绩搜索
     * @return String 学生账号
     */
    public static String score_select(){
        System.out.println("********************************************************************");
        System.out.println("**********              请根据提示操作               ******************");
        System.out.println("**********              请输入学生账号              ******************");
        return input.nextLine();
    }
}
