package com.gui.ActionLister;

import com.tjl.bean.ConPreRe;
import com.tjl.jdbc.JDBCUtils;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import java.sql.SQLException;

import static java.awt.Font.BOLD;

public class alter_teacher_actionLister extends driving_ActionLister implements ActionListener {
    public alter_teacher_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e)  {
        //总面板
        JPanel jps = new JPanel(new BorderLayout());
        //North：
        JLabel jLabel = new JLabel("修改老师");
        jLabel.setFont(new Font("微软雅黑", BOLD, 20));
        //west：
        //创建部件
        JPanel jp1 = new JPanel(new BorderLayout());
        JLabel jl1 = new JLabel("老师学号:");
        JTextField jtf1 = new JTextField(15);
        JButton jButton = new JButton("查询老师");
        JLabel label = new JLabel("老师的学号:");
        JTextField jTextField = new JTextField(15);
        JLabel label1 = new JLabel("老师的姓名:");
        JTextField jTextField1 = new JTextField(15);
        JLabel label2 = new JLabel("老师的密码:");
        JTextField jTextField2 = new JTextField(15);
        JLabel jLabel1 = new JLabel("修改老师密码为:");
        JButton jButton1 = new JButton("确认修改密码");
        JTextField jTextField3 = new JTextField(15);
        JLabel jLabel2 = new JLabel("修改老师姓名为");
        JButton jButton2 = new JButton("确认修改姓名");
        JTextField jTextField4 = new JTextField(15);

        //创建盒子
        Box vbox = Box.createVerticalBox();
        vbox.add(Box.createVerticalStrut(40));
        Box hBox = Box.createHorizontalBox();
        hBox.add(Box.createHorizontalStrut(40));
        Box hBox1 = Box.createHorizontalBox();
        hBox1.add(Box.createHorizontalStrut(40));
        Box hBox2 = Box.createHorizontalBox();
        hBox2.add(Box.createHorizontalStrut(40));
        Box hBox3 = Box.createHorizontalBox();
        hBox3.add(Box.createHorizontalStrut(40));
        Box hBox4 = Box.createHorizontalBox();
        hBox4.add(Box.createHorizontalStrut(40));
        Box hBox5 = Box.createHorizontalBox();
        hBox5.add(Box.createHorizontalStrut(40));
        Box hBox6 = Box.createHorizontalBox();
        hBox6.add(Box.createHorizontalStrut(40));
        Box hBox7 = Box.createHorizontalBox();
        hBox7.add(Box.createHorizontalStrut(40));
        Box hBox8 = Box.createHorizontalBox();
        hBox8.add(Box.createHorizontalStrut(40));

        //组件放入行盒子
        hBox.add(jl1);
        hBox.add(jtf1);
        hBox1.add(jButton);
        hBox2.add(label);
        hBox2.add(jTextField);
        hBox3.add(label1);
        hBox3.add(jTextField1);
        hBox4.add(label2);
        hBox4.add(jTextField2);
        hBox5.add(jLabel1);
        hBox5.add(jTextField3);
        hBox7.add(jLabel2);
        hBox7.add(jTextField4);
        hBox6.add(jButton1);
        hBox8.add(jButton2);

        vbox.add(hBox);
        vbox.add(hBox1);
        vbox.add(hBox2);
        vbox.add(hBox3);
        vbox.add(hBox4);
        vbox.add(hBox5);
        vbox.add(hBox6);
        vbox.add(hBox7);
        vbox.add(hBox8);

        //组件放入面板
        jp1.add(BorderLayout.CENTER, vbox);

        // 分面板放入总面板
        jps.add(BorderLayout.CENTER, jp1);
        jps.add(BorderLayout.NORTH, jLabel);

        //监听事件
        jButton.addActionListener(e13 -> {
            System.out.println(jtf1.getText());
            if (jtf1.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学号不能有空");
            } else {
                ConPreRe ConPreRe = UseDao.teacherSelect(Integer.parseInt(jtf1.getText()));
                ResultSet resultSet = ConPreRe.getResultSet();
                if (resultSet != null) {
                    try {
                        resultSet.next();
                        String uname = resultSet.getString("teacher_id");
                        jTextField.setText(uname);
                        String password = resultSet.getString("teacher_password");
                        jTextField2.setText(password);
                        String name = resultSet.getString("teacher_name");
                        jTextField1.setText(name);
                    } catch (SQLException ex) {
                        JOptionPane.showMessageDialog(jFrame, "查询为空");
                    }
                } else {
                    JOptionPane.showMessageDialog(jFrame, "查询失败");
                }
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        jButton2.addActionListener(e16 -> {
            if (jtf1.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学号不能有空");
            } else if (jTextField4.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "姓名不能有空");
            } else {
                if (UseDao.teacherAlterName(jTextField4.getText(), jTextField.getText())) {
                    JOptionPane.showMessageDialog(jFrame, "修改成功");
                } else {
                    JOptionPane.showMessageDialog(jFrame, "修改失败");
                }
            }
        });
        jButton1.addActionListener(e17 -> {
            if (jtf1.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学号不能有空");
            } else if (jTextField3.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "密码不能有空");
            } else {
                if (UseDao.teacherAlterPassword(jTextField3.getText(), jTextField.getText())) {
                    JOptionPane.showMessageDialog(jFrame, "修改成功");
                } else {
                    JOptionPane.showMessageDialog(jFrame, "修改失败");
                }
            }
        });
        // 面板切换
        conjPanel.removeAll();
        conjPanel.add(jps);
        conjPanel.validate();
        conjPanel.repaint();

    }
}
