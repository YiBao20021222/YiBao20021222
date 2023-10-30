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

public class add_teacher_actionLister extends driving_ActionLister implements ActionListener {
    public add_teacher_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e)  {
        JPanel jps = new JPanel(new BorderLayout());
        JLabel jLabel = new JLabel("添加老师");

        jLabel.setFont(new Font("微软雅黑", BOLD, 20));
        JPanel jp1 = new JPanel(new GridLayout(3, 2, 10, 10));//3行2列 水平间距20 垂直间距10
        //第一行
        JLabel jl1 = new JLabel("老师学号:");
        //jl1.setHorizontalAlignment(SwingConstants.RIGHT);
        JTextField jtf1 = new JTextField(15);
        jtf1.setText("");
        jp1.add(jl1);
        jp1.add(jtf1);
        //第二行
        JLabel jl2 = new JLabel("老师姓名:");
        //jl2.setHorizontalAlignment(SwingConstants.RIGHT);
        JTextField jtf2 = new JTextField(5);
        jtf2.setText("");
        jp1.add(jl2);
        jp1.add(jtf2);
        //第三行
        JLabel jl3 = new JLabel("老师密码:");
        //jl3.setHorizontalAlignment(SwingConstants.RIGHT);
        JTextField jtf3 = new JTextField(15);
        jtf3.setText("");
        jp1.add(jl3);
        jp1.add(jtf3);
        jps.add(BorderLayout.CENTER, jp1);
        JButton jButton = new JButton("添加老师");

        JLabel jlabel1 = new JLabel("老师学号:");
        JTextField jTextField1 = new JTextField(15);
        JButton jButton1 = new JButton("查询老师");
        JLabel label2 = new JLabel("老师的学号:");
        JTextField jTextField2 = new JTextField(15);
        JLabel label3 = new JLabel("老师的姓名:");
        JTextField jTextField3 = new JTextField(15);
        JLabel label4 = new JLabel("老师的密码:");
        JTextField jTextField4 = new JTextField(15);

        Box vbox = Box.createVerticalBox();
        vbox.add(Box.createVerticalStrut(50));

        HBoxArray hBoxArray=new HBoxArray();
        hBoxArray
                .add(40,jlabel1).adds(jTextField1).adds(jButton1)
                .add(40,label2).adds(jTextField2)
                .add(40,label3).adds(jTextField3)
                .add(40,label4).adds(jTextField4);
        hBoxArray.set(vbox);
        hBoxArray.clear();

        jButton1.addActionListener(e13 -> {
            if (jTextField1.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学号不能有空");
            } else {
                ConPreRe ConPreRe = UseDao.teacherSelect(Integer.parseInt(jTextField1.getText()));
                ResultSet resultSet = ConPreRe.getResultSet();
                if (resultSet != null) {
                    try {
                        resultSet.next();
                        String uname = resultSet.getString("teacher_id");
                        jTextField2.setText(uname);
                        String password = resultSet.getString("teacher_password");
                        jTextField4.setText(password);
                        String name = resultSet.getString("teacher_name");
                        jTextField3.setText(name);
                    } catch (SQLException ex) {
                        jTextField2.setText("");
                        jTextField3.setText("");
                        jTextField4.setText("");
                        JOptionPane.showMessageDialog(jFrame, "查询为空可以插入该学号");

                    }
                } else {
                    JOptionPane.showMessageDialog(jFrame, "查询失败");
                }
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        jButton.addActionListener(e1 -> {
            ConPreRe ConPreRe = null;
            if (jtf1.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学号不能有空");
            } else if (jtf2.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "姓名不能有空");
            } else if (jtf3.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "密码不能有空");
            } else if (!jTextField2.getText().equals("") || !jTextField3.getText().equals("") || !jTextField4.getText().equals("") && !((ConPreRe = UseDao.teacherSelect(Integer.parseInt(jTextField1.getText()))).getResultSet() == null)) {
                JOptionPane.showMessageDialog(jFrame, "请先查询");
            } else {
                if (UseDao.teacherAdd(jtf1.getText(), jtf2.getText(), jtf3.getText())) {
                    JOptionPane.showMessageDialog(jFrame, "插入成功");
                } else {
                    JOptionPane.showMessageDialog(jFrame, "插入失败");
                }
            }
            if (ConPreRe != null) {
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        jps.add(BorderLayout.EAST, vbox);
        jps.add(BorderLayout.NORTH, jLabel);
        jps.add(BorderLayout.SOUTH, jButton);
        conjPanel.removeAll();
        conjPanel.add(jps);
        conjPanel.validate();
        conjPanel.repaint();
    }
}
