package com.gui.dao;
import com.gui.ActionLister.*;
import com.gui.control.control;
import com.tjl.bean.User;
import com.tjl.dao.UseDAO;

import javax.swing.*;
import java.awt.*;
import java.io.IOException;

import static java.awt.Font.*;

public class UseDao implements dao {
    static UseDAO UseDao=new UseDAO();
    @Override
    public  void indexJFrame() {
        final int WIDTH = 400;
        final int HEIGHT = 200;
        JFrame jFrame=new JFrame("学生成绩管理系统登录界面");
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        int sw = screenSize.width;
        int sh = screenSize.height;
        //设置界面居中显示
        jFrame.setBounds((sw - WIDTH) / 2, (sh - HEIGHT) / 2, WIDTH, HEIGHT);
        jFrame.setResizable(false);
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jFrame.setLayout(new FlowLayout());
        //组件
        Box vBox=Box.createVerticalBox();
        Box uBox=Box.createHorizontalBox();
        JLabel uLabel=new JLabel("学号:");
        JTextField uTextField=new JTextField(15);
        //在布局中添加组件，并使用占位符（以下同理）
        uBox.add(uLabel);
        uBox.add(Box.createHorizontalStrut(20));
        uBox.add(uTextField);
        Box nBox=Box.createHorizontalBox();
        JLabel nLabel=new JLabel("姓名:");
        JTextField nTextField=new JTextField(5);

        nBox.add(nLabel);
        nBox.add(Box.createHorizontalStrut(20));
        nBox.add(nTextField);
        Box pBox=Box.createHorizontalBox();
        JLabel pLabel=new JLabel("密码:");
        JPasswordField jPasswordField=new JPasswordField(15);
        pBox.add(pLabel);
        pBox.add(Box.createHorizontalStrut(20));
        pBox.add(jPasswordField);
        Box btnBox = Box.createHorizontalBox();
        //添加button和监听事件
        JButton loginBtn = new JButton("登录");
        JButton webBtn=new JButton("前往web端登录");
        loginBtn.setName("loginBtn");
        loginBtn.addActionListener(e -> {
            JButton button = (JButton) e.getSource();
            String name = button.getName();
            if ("loginBtn".equals(name)) {//使用消息对话框
                String uid = uTextField.getText();
                String uname = nTextField.getText();
                String uPassword = String.valueOf(jPasswordField.getPassword());
                User user = new User(uid, uPassword, uname);
                int type = UseDao.login(user);
                if (type != -1) {
                    JOptionPane.showMessageDialog(jFrame, "登录成功");
                    jPasswordField.setText(null);
                    jFrame.dispose();
                    jFrame.setVisible(false);
                    control.indexControl(type);
                } else {
                    JOptionPane.showMessageDialog(jFrame, "密码或账号输入错误");
                    jPasswordField.setText(null);
                }
            }
        });
        webBtn.addActionListener(e -> {
            Runtime runtime=Runtime.getRuntime();
            try{
                runtime.exec("cmd /c node com/view/node_submit.js");
                runtime.exec("cmd /c start com/view/index/index.html");
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });
        btnBox.add(loginBtn);
        btnBox.add(Box.createHorizontalStrut(80));
        Box HBox=Box.createHorizontalBox();
        JLabel jLabel=new JLabel("学生管理系统登录界面");
        jLabel.setFont(new Font("微软雅黑", BOLD,20));
        jLabel.setPreferredSize(new Dimension(250,45));
        HBox.add(jLabel);
        HBox.add(Box.createHorizontalStrut(250));
        Box LBox=Box.createHorizontalBox();
        LBox.add(Box.createHorizontalStrut(300));
        LBox.add(HBox);
        vBox.add(Box.createHorizontalStrut(100));
        vBox.add(uBox);
        vBox.add(nBox);
        vBox.add(pBox);
        Box bBox=Box.createHorizontalBox();
        bBox.add(Box.createHorizontalStrut(65));
        bBox.setPreferredSize(new Dimension(200,45));
        bBox.add(btnBox);
        jFrame.add(LBox);
        jFrame.add(vBox);
        jFrame.add(bBox);
        jFrame.add(webBtn);
        jFrame.setVisible(true);
    }

    @Override
    public void managerFrame() {
        final int WIDTH = 800;
        final int HEIGHT = 700;
        JFrame jFrame = new JFrame("管理员操作系统");
        JPanel conjPanel = new JPanel();
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        int sw = screenSize.width;
        int sh = screenSize.height;
        //设置界面居中显示
        jFrame.setBounds((sw - WIDTH) / 2, (sh - HEIGHT) / 2, WIDTH, HEIGHT);
        jFrame.setResizable(false);
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jFrame.setLayout(new BorderLayout());
        JMenuBar menuBar = new JMenuBar();
        //大标题
        JMenu student_M = new JMenu("学生");
        JMenu teacher_M = new JMenu("老师");
        JMenu score_M = new JMenu("成绩");
        JMenu class_M = new JMenu("科目");
        JMenu tea_cla_M = new JMenu("老师授课表");
        JMenu stu_tea_M = new JMenu("学生受教");
        JMenu open_exc_M=new JMenu("打开excel表");
        JMenu add_exc_M = new JMenu("加载excel");
        //学生分标题
        JMenuItem add_stu = new JMenuItem("添加学生");
        JMenuItem delete_stu = new JMenuItem("删除学生");
        JMenuItem alter_stu = new JMenuItem("修改学生");
        JMenuItem select_stu = new JMenuItem("查找学生");
        //老师分标题
        JMenuItem add_tea = new JMenuItem("添加老师");
        JMenuItem delete_tea = new JMenuItem("删除老师");
        JMenuItem alter_tea = new JMenuItem("修改老师");
        JMenuItem select_tea = new JMenuItem("查询老师");
        //成绩分标题
        JMenuItem add_sco = new JMenuItem("添加成绩");
        JMenuItem delete_sco = new JMenuItem("删除成绩");
        JMenuItem alter_sco = new JMenuItem("修改成绩");
        JMenuItem select_sco = new JMenuItem("查询成绩");
        //科目分标题
        JMenuItem add_cla = new JMenuItem("添加科目");
        JMenuItem delete_cla = new JMenuItem("删除科目");
        JMenuItem alter_cla = new JMenuItem("修改科目");
        JMenuItem select_cla = new JMenuItem("查找科目");
        //老师科目分标题
        JMenuItem teacher_class_add=new JMenuItem("添加老师授课表");
        JMenuItem teacher_class_delete=new JMenuItem("删除老师授课表");
        JMenuItem teacher_class_select=new JMenuItem("搜索老师授课表");
        //学生老师分标题
        JMenuItem student_teacher_add=new JMenuItem("添加学生授讲表");
        JMenuItem student_teacher_delete=new JMenuItem("删除学生授讲表");
        JMenuItem student_teacher_select=new JMenuItem("搜索学生授讲表");
        //加载Excel表
        JMenuItem student_load=new JMenuItem("加载学生表");
        JMenuItem teacher_load=new JMenuItem("加载老师表");
        JMenuItem class_load=new JMenuItem("加载科目表");
        JMenuItem score_load=new JMenuItem("加载成绩表");
        JMenuItem student_teacher_load=new JMenuItem("加载学生老师表");
        JMenuItem teacher_class_load=new JMenuItem("加载老师和科目表");
        //打开excel
        JMenuItem open_excel=new JMenuItem("打开excel表");
        //老师分标题进大标题
        teacher_M.addSeparator();
        teacher_M.add(add_tea);
        teacher_M.addSeparator();
        teacher_M.add(delete_tea);
        teacher_M.addSeparator();
        teacher_M.add(alter_tea);
        teacher_M.addSeparator();
        teacher_M.add(select_tea);
        teacher_M.addSeparator();
        //学生分标题进大标题
        student_M.addSeparator();
        student_M.add(add_stu);
        student_M.addSeparator();
        student_M.add(delete_stu);
        student_M.addSeparator();
        student_M.add(alter_stu);
        student_M.addSeparator();
        student_M.add(select_stu);
        student_M.addSeparator();
        //成绩分标签进大标题
        score_M.addSeparator();
        score_M.add(add_sco);
        score_M.addSeparator();
        score_M.add(delete_sco);
        score_M.addSeparator();
        score_M.add(alter_sco);
        score_M.addSeparator();
        score_M.add(select_sco);
        score_M.addSeparator();
        //科目分标签进大标题
        class_M.addSeparator();
        class_M.add(add_cla);
        class_M.addSeparator();
        class_M.add(delete_cla);
        class_M.addSeparator();
        class_M.add(alter_cla);
        class_M.addSeparator();
        class_M.add(select_cla);
        class_M.addSeparator();
        //老师授课分标题进大标题
        tea_cla_M.addSeparator();
        tea_cla_M.add(teacher_class_add);
        tea_cla_M.addSeparator();
        tea_cla_M.add(teacher_class_delete);
        tea_cla_M.addSeparator();
        tea_cla_M.add(teacher_class_select);
        tea_cla_M.addSeparator();
        //学生授讲分标题进大标题
        stu_tea_M.addSeparator();
        stu_tea_M.add(student_teacher_add);
        stu_tea_M.addSeparator();
        stu_tea_M.add(student_teacher_delete);
        stu_tea_M.addSeparator();
        stu_tea_M.add(student_teacher_select);
        stu_tea_M.addSeparator();
        //打开分标题进入大标题
        open_exc_M.add(open_excel);
        //加载分标题进入大标题
        add_exc_M.addSeparator();
        add_exc_M.add(student_load);
        add_exc_M.addSeparator();
        add_exc_M.add(teacher_load);
        add_exc_M.addSeparator();
        add_exc_M.add(class_load);
        add_exc_M.addSeparator();
        add_exc_M.add(score_load);
        add_exc_M.addSeparator();
        add_exc_M.add(teacher_class_load);
        add_exc_M.addSeparator();
        add_exc_M.add(student_teacher_load);
        add_exc_M.addSeparator();
        //大标题进容器
        menuBar.add(student_M);
        menuBar.add(teacher_M);
        menuBar.add(score_M);
        menuBar.add(class_M);
        menuBar.add(tea_cla_M);
        menuBar.add(stu_tea_M);
        menuBar.add(open_exc_M);
        menuBar.add(add_exc_M);
        //窗口加入容器
        jFrame.add(BorderLayout.NORTH, menuBar);
        jFrame.add(BorderLayout.CENTER, conjPanel);
        jFrame.setVisible(true);
        //添加学生面板
        add_stu.addActionListener(new add_student_actionLister(jFrame,conjPanel));

        delete_stu.addActionListener(new delete_student_actionLister(jFrame,conjPanel));

        alter_stu.addActionListener(new alter_student_actionLister(jFrame,conjPanel));

        select_stu.addActionListener(new select_student_actionLister(jFrame,conjPanel));

        add_tea.addActionListener(new add_teacher_actionLister(jFrame,conjPanel));

        delete_tea.addActionListener(new delete_teacher_actionLister(jFrame,conjPanel));

        alter_tea.addActionListener(new alter_teacher_actionLister(jFrame,conjPanel));

        select_tea.addActionListener(new select_teacher_actionLister(jFrame,conjPanel));

        add_sco.addActionListener(new add_score_actionLister(jFrame,conjPanel));

        delete_sco.addActionListener(new delete_score_actionLister(jFrame,conjPanel));

        alter_sco.addActionListener(new alter_score_actionLister(jFrame,conjPanel));

        select_sco.addActionListener(new select_score_actionLister(jFrame,conjPanel));

        add_cla.addActionListener(new add_class_actionLister(jFrame,conjPanel));

        delete_cla.addActionListener(new delete_class_actionLister(jFrame,conjPanel));

        alter_cla.addActionListener(new alter_class_actionLister(jFrame,conjPanel));

        select_cla.addActionListener(new select_class_actionLister(jFrame,conjPanel));

        teacher_class_add.addActionListener(new add_teacher_class_actionLister(jFrame,conjPanel));

        teacher_class_delete.addActionListener(new delete_teacher_class_actionLister(jFrame,conjPanel));

        teacher_class_select.addActionListener(new select_teacher_class_actionLister(jFrame,conjPanel));

        student_teacher_add.addActionListener(new add_student_teacher_actionLister(jFrame,conjPanel));

        student_teacher_delete.addActionListener(new delete_student_teacher_actionLister(jFrame,conjPanel));

        student_teacher_select.addActionListener(new select_student_teacher_actionLister(jFrame,conjPanel));

        student_load.addActionListener(new stuednt_load_actionLister(jFrame,conjPanel));

        teacher_load.addActionListener(new teacher_load_actionLister(jFrame,conjPanel));

        class_load.addActionListener(new class_load_actionLister(jFrame,conjPanel));

        score_load.addActionListener(new score_load_actionLister(jFrame,conjPanel));

        teacher_class_load.addActionListener(new teacher_class_load_actionLister(jFrame,conjPanel));

        student_teacher_load.addActionListener(new student_teacher_load_actionLister(jFrame,conjPanel));

        open_excel.addActionListener(new open_excel_actionLister(jFrame,conjPanel));
    }

    @Override
    public void studentFrame() {
        final int WIDTH = 800;
        final int HEIGHT = 700;
        JFrame jFrame = new JFrame("学生操作系统");
        JPanel conjPanel = new JPanel();
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        int sw = screenSize.width;
        int sh = screenSize.height;
        //设置界面居中显示
        jFrame.setBounds((sw - WIDTH) / 2, (sh - HEIGHT) / 2, WIDTH, HEIGHT);
        jFrame.setResizable(false);
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jFrame.setLayout(new BorderLayout());
        JMenuBar menuBar = new JMenuBar();
        JMenu jMenu=new JMenu("成绩");
        JMenuItem jMenuItem=new JMenuItem("查询成绩");
        jMenu.add(jMenuItem);
        menuBar.add(jMenu);
        jFrame.add(BorderLayout.NORTH,menuBar);
        jFrame.add(conjPanel);
        jMenuItem.addActionListener(new select_student_actionLister_s(jFrame,conjPanel));
        jFrame.setVisible(true);
    }

    @Override
    public void teacherFrame()  {
        final int WIDTH = 800;
        final int HEIGHT = 700;
        JFrame jFrame = new JFrame("老师操作系统");
        JPanel conjPanel = new JPanel();
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        int sw = screenSize.width;
        int sh = screenSize.height;
        //设置界面居中显示
        jFrame.setBounds((sw - WIDTH) / 2, (sh - HEIGHT) / 2, WIDTH, HEIGHT);
        jFrame.setResizable(false);
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jFrame.setLayout(new BorderLayout());
        JMenuBar menuBar = new JMenuBar();
        //大标题
        JMenu student_M = new JMenu("学生");
        JMenu teacher_M = new JMenu("老师");
        JMenu score_M = new JMenu("成绩");
        JMenu class_M = new JMenu("科目");
        JMenu tea_cla_M = new JMenu("老师授课表");
        JMenu stu_tea_M = new JMenu("学生受教");
        JMenu open_exc_M=new JMenu("打开excel表");
        //学生分标题
        JMenuItem add_stu = new JMenuItem("添加学生");
        JMenuItem delete_stu = new JMenuItem("删除学生");
        JMenuItem alter_stu = new JMenuItem("修改学生");
        JMenuItem select_stu = new JMenuItem("查找学生");
        //老师分标题
        JMenuItem select_tea = new JMenuItem("查询老师");
        //成绩分标题
        JMenuItem add_sco = new JMenuItem("添加成绩");
        JMenuItem delete_sco = new JMenuItem("删除成绩");
        JMenuItem alter_sco = new JMenuItem("修改成绩");
        JMenuItem select_sco = new JMenuItem("查询成绩");
        //科目分标题
        JMenuItem select_cla = new JMenuItem("查找科目");
        //老师科目分标题
        JMenuItem teacher_class_select=new JMenuItem("搜索老师授课表");
        //学生老师分标题
        JMenuItem student_teacher_add=new JMenuItem("添加学生授讲表");
        JMenuItem student_teacher_delete=new JMenuItem("删除学生授讲表");
        JMenuItem student_teacher_select=new JMenuItem("搜索学生授讲表");
        //加载Excel表
        JMenuItem student_load=new JMenuItem("加载学生表");
        JMenuItem teacher_load=new JMenuItem("加载老师表");
        JMenuItem class_load=new JMenuItem("加载科目表");
        JMenuItem score_load=new JMenuItem("加载成绩表");
        JMenuItem student_teacher_load=new JMenuItem("加载学生老师表");
        JMenuItem teacher_class_load=new JMenuItem("加载老师和科目表");
        //打开excel
        JMenuItem open_excel=new JMenuItem("打开excel表");
        //老师分标题进大标题
        teacher_M.addSeparator();
        teacher_M.add(select_tea);
        teacher_M.addSeparator();
        //学生分标题进大标题
        student_M.addSeparator();
        student_M.add(add_stu);
        student_M.addSeparator();
        student_M.add(delete_stu);
        student_M.addSeparator();
        student_M.add(alter_stu);
        student_M.addSeparator();
        student_M.add(select_stu);
        student_M.addSeparator();
        //成绩分标签进大标题
        score_M.addSeparator();
        score_M.add(add_sco);
        score_M.addSeparator();
        score_M.add(delete_sco);
        score_M.addSeparator();
        score_M.add(alter_sco);
        score_M.addSeparator();
        score_M.add(select_sco);
        score_M.addSeparator();
        //科目分标签进大标题

        class_M.addSeparator();
        class_M.add(select_cla);
        class_M.addSeparator();
        //老师授课分标题进大标题
        tea_cla_M.addSeparator();
        tea_cla_M.add(teacher_class_select);
        tea_cla_M.addSeparator();
        //学生授讲分标题进大标题
        stu_tea_M.addSeparator();
        stu_tea_M.add(student_teacher_add);
        stu_tea_M.addSeparator();
        stu_tea_M.add(student_teacher_delete);
        stu_tea_M.addSeparator();
        stu_tea_M.add(student_teacher_select);
        stu_tea_M.addSeparator();
        //打开分标题进入大标题
        open_exc_M.add(open_excel);
        //加载分标题进入大标题

        //大标题进容器
        menuBar.add(student_M);
        menuBar.add(teacher_M);
        menuBar.add(score_M);
        menuBar.add(class_M);
        menuBar.add(tea_cla_M);
        menuBar.add(stu_tea_M);
        menuBar.add(open_exc_M);

        //窗口加入容器
        jFrame.add(BorderLayout.NORTH, menuBar);
        jFrame.add(BorderLayout.CENTER, conjPanel);
        jFrame.setVisible(true);
        //添加学生面板
        add_stu.addActionListener(new add_student_actionLister(jFrame,conjPanel));

        delete_stu.addActionListener(new delete_student_actionLister(jFrame,conjPanel));

        alter_stu.addActionListener(new alter_student_actionLister(jFrame,conjPanel));

        select_stu.addActionListener(new select_student_actionLister(jFrame,conjPanel));

        select_tea.addActionListener(new select_teacher_actionLister(jFrame,conjPanel));

        add_sco.addActionListener(new add_score_actionLister(jFrame,conjPanel));

        delete_sco.addActionListener(new delete_score_actionLister(jFrame,conjPanel));

        alter_sco.addActionListener(new alter_score_actionLister(jFrame,conjPanel));

        select_sco.addActionListener(new select_score_actionLister(jFrame,conjPanel));


        select_cla.addActionListener(new select_class_actionLister(jFrame,conjPanel));


        teacher_class_select.addActionListener(new select_teacher_class_actionLister(jFrame,conjPanel));

        student_teacher_add.addActionListener(new add_student_teacher_actionLister(jFrame,conjPanel));

        student_teacher_delete.addActionListener(new delete_student_teacher_actionLister(jFrame,conjPanel));

        student_teacher_select.addActionListener(new select_student_teacher_actionLister(jFrame,conjPanel));

        student_load.addActionListener(new stuednt_load_actionLister(jFrame,conjPanel));

        teacher_load.addActionListener(new teacher_load_actionLister(jFrame,conjPanel));

        class_load.addActionListener(new class_load_actionLister(jFrame,conjPanel));

        score_load.addActionListener(new score_load_actionLister(jFrame,conjPanel));

        teacher_class_load.addActionListener(new teacher_class_load_actionLister(jFrame,conjPanel));

        student_teacher_load.addActionListener(new student_teacher_load_actionLister(jFrame,conjPanel));

        open_excel.addActionListener(new open_excel_actionLister(jFrame,conjPanel));
    }
}
