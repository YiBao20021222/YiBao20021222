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

public class delete_teacher_actionLister extends driving_ActionLister implements ActionListener {
    public delete_teacher_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e)  {
        JPanel jps = new JPanel(new BorderLayout());
        JLabel jLabel = new JLabel("删除老师");

        jLabel.setFont(new Font("微软雅黑", BOLD, 20));
        JPanel jp1 = new JPanel(new GridLayout(1, 2, 10, 10));//3行2列 水平间距20 垂直间距10
        //第一行
        JLabel jl1 = new JLabel("删除老师学号:");
        //jl1.setHorizontalAlignment(SwingConstants.RIGHT);
        JTextField jtf1 = new JTextField(15);
        jtf1.setText("");
        jp1.add(jl1);
        jp1.add(jtf1);
        JButton jButton = new JButton("删除老师");


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
        Box hBox = Box.createHorizontalBox();
        hBox.add(Box.createHorizontalStrut(40));
        Box hBox2 = Box.createHorizontalBox();
        hBox2.add(Box.createHorizontalStrut(40));
        Box hBox3 = Box.createHorizontalBox();
        hBox3.add(Box.createHorizontalStrut(40));
        Box hBox4 = Box.createHorizontalBox();
        hBox4.add(Box.createHorizontalStrut(40));

        hBox.add(jlabel1);
        hBox.add(jTextField1);
        hBox.add(jButton1);
        hBox2.add(label2);
        hBox2.add(jTextField2);
        hBox3.add(label3);
        hBox3.add(jTextField3);
        hBox4.add(label4);
        hBox4.add(jTextField4);

        vbox.add(hBox);
        vbox.add(hBox2);
        vbox.add(hBox3);
        vbox.add(hBox4);

        jps.add(BorderLayout.EAST, vbox);
        jps.add(BorderLayout.NORTH, jLabel);
        jps.add(BorderLayout.SOUTH, jButton);
        jps.add(BorderLayout.CENTER, jp1);

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
                        JOptionPane.showMessageDialog(jFrame, "查询为空");
                    }
                } else {
                    JOptionPane.showMessageDialog(jFrame, "查询失败");
                }
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        jButton.addActionListener(e12 -> {
            ConPreRe ConPreRe = null;
            if (jtf1.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学号不能有空");
            } else if (jTextField2.getText().equals("") || jTextField3.getText().equals("") || jTextField4.getText().equals("") || (ConPreRe = UseDao.teacherSelect(Integer.parseInt(jTextField2.getText()))).getResultSet() == null) {
                JOptionPane.showMessageDialog(jFrame, "没有该学生，请先搜索学生");
            } else {
                if (UseDao.teacherDelete(Integer.parseInt(jtf1.getText()))) {
                    JOptionPane.showMessageDialog(jFrame, "删除成功");
                } else {
                    JOptionPane.showMessageDialog(jFrame, "删除失败");
                }
            }
            if (ConPreRe != null) {
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        conjPanel.removeAll();
        conjPanel.add(jps);
        conjPanel.validate();
        conjPanel.repaint();
    }
}
