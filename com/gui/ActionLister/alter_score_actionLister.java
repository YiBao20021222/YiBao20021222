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

public class alter_score_actionLister extends driving_ActionLister implements ActionListener {
    public alter_score_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e)  {
        JPanel jps = new JPanel(new BorderLayout());
        JLabel jLabel = new JLabel("修改成绩");

        jLabel.setFont(new Font("微软雅黑", BOLD, 20));
        JPanel jp1 = new JPanel(new GridLayout(4, 2, 10, 10));//3行2列 水平间距20 垂直间距10
        //第一行
        JLabel label = new JLabel("相应学生成绩：");
        TextArea textArea1 = new TextArea("", 5, 3, TextArea.SCROLLBARS_VERTICAL_ONLY);
        jp1.add(label);
        jp1.add(textArea1);
        JLabel jl1 = new JLabel("学生学号:");
        //jl1.setHorizontalAlignment(SwingConstants.RIGHT);
        JTextField jtf1 = new JTextField(15);
        jtf1.setText("");
        jp1.add(jl1);
        jp1.add(jtf1);
        //第二行
        JLabel jl2 = new JLabel("科目:");
        //jl2.setHorizontalAlignment(SwingConstants.RIGHT);
        JTextField jtf2 = new JTextField(5);
        jtf2.setText("");
        jp1.add(jl2);
        jp1.add(jtf2);
        //第三行
        JLabel jl3 = new JLabel("成绩:");
        //jl3.setHorizontalAlignment(SwingConstants.RIGHT);
        JTextField jtf3 = new JTextField(15);
        jtf3.setText("");
        jp1.add(jl3);
        jp1.add(jtf3);
        jps.add(BorderLayout.WEST, jp1);
        JButton jButton = new JButton("修改学生");

        JLabel jlabel1 = new JLabel("学生学号:");
        JTextField jTextField1 = new JTextField(15);
        JButton jButton1 = new JButton("查询学生");
        JLabel label2 = new JLabel("学生学号:");
        JTextField jTextField2 = new JTextField(15);
        JLabel label3 = new JLabel("学生姓名:");
        JTextField jTextField3 = new JTextField(15);
        JLabel label4 = new JLabel("学生密码:");
        JTextField jTextField4 = new JTextField(15);

        JButton jButton2 = new JButton("查询范围科目:");
        JButton jButton3 = new JButton("查找相应学生的成绩");
        TextArea textArea = new TextArea("", 10, 2, TextArea.SCROLLBARS_VERTICAL_ONLY);

        Box vbox = Box.createVerticalBox();
        vbox.add(Box.createVerticalStrut(50));
        Box vbox1 = Box.createVerticalBox();
        vbox1.add(Box.createVerticalStrut(50));
        Box hBox = Box.createHorizontalBox();
        hBox.add(Box.createHorizontalStrut(40));
        Box hBox2 = Box.createHorizontalBox();
        hBox2.add(Box.createHorizontalStrut(40));
        Box hBox3 = Box.createHorizontalBox();
        hBox3.add(Box.createHorizontalStrut(40));
        Box hBox4 = Box.createHorizontalBox();
        hBox4.add(Box.createHorizontalStrut(40));
        Box hBox5 = Box.createHorizontalBox();
        hBox5.add(Box.createHorizontalStrut(10));
        Box hBox6 = Box.createHorizontalBox();
        hBox6.add(Box.createHorizontalStrut(10));
        Box hBox7 = Box.createHorizontalBox();
        hBox7.add(Box.createHorizontalStrut(10));


        hBox.add(jlabel1);
        hBox.add(jTextField1);
        hBox.add(jButton1);
        hBox2.add(label2);
        hBox2.add(jTextField2);
        hBox3.add(label3);
        hBox3.add(jTextField3);
        hBox4.add(label4);
        hBox4.add(jTextField4);
        hBox5.add(jButton2);
        hBox6.add(textArea);
        hBox7.add(jButton3);


        vbox.add(hBox);
        vbox.add(hBox2);
        vbox.add(hBox3);
        vbox.add(hBox4);
        vbox.add(hBox7);
        vbox1.add(hBox5);
        vbox1.add(hBox6);

        jButton1.addActionListener(e13 -> {
            if (jTextField1.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学号不能有空");
            } else {
                ConPreRe ConPreRe = UseDao.studentAlter(jTextField1.getText());
                ResultSet resultSet = ConPreRe.getResultSet();
                if (resultSet != null) {
                    try {
                        String uname = resultSet.getString("student_id");
                        jTextField2.setText(uname);
                        String password = resultSet.getString("student_password");
                        jTextField4.setText(password);
                        String name = resultSet.getString("student_name");
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
                JOptionPane.showMessageDialog(jFrame, "学生学号不能有空");
            } else if (jtf2.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学生科目不能有空");
            } else if (jtf3.getText().equals("")) {
                JOptionPane.showMessageDialog(jFrame, "学生成绩不能有空");
            } else if (jTextField2.getText().equals("") || jTextField3.getText().equals("") || jTextField4.getText().equals("") || ((ConPreRe = UseDao.studentAlter(jTextField1.getText())).getResultSet() == null)) {
                JOptionPane.showMessageDialog(jFrame, "请先查询");
            } else {
                if (UseDao.studentAlterScore(Integer.parseInt(jtf3.getText()), jtf1.getText(), jtf2.getText())) {
                    JOptionPane.showMessageDialog(jFrame, "插入成功");
                } else {
                    JOptionPane.showMessageDialog(jFrame, "插入失败");
                }
            }
            if (ConPreRe != null) {
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        jButton2.addActionListener(e112 -> {
            if (textArea.getText().equals("")) {
                ConPreRe ConPreRe = UseDao.selectClass();
                ResultSet resultSet = ConPreRe.getResultSet();
                while (true) {
                    try {
                        if (!resultSet.next()) break;
                        textArea.append(
                                resultSet.getString("class_id") + "\t" +
                                        resultSet.getString("class_type")
                                        + "\n");

                    } catch (SQLException e1) {
                        JOptionPane.showMessageDialog(jFrame, "查询为空或失败");
                    }
                }
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        jButton3.addActionListener(e113 -> {
            if (textArea1.getText().equals("")) {
                ConPreRe ConPreRe = UseDao.scoreSelect(jTextField1.getText());
                ResultSet resultSet = ConPreRe.getResultSet();
                while (true) {
                    try {
                        if (!resultSet.next()) break;
                        textArea1.append(
                                resultSet.getString("student_id") + "\t" +
                                        UseDao.classIdChangeClassName(Integer.parseInt(resultSet.getString("class_id")))
                                        + resultSet.getString("score")
                                        + "\n");
                    } catch (SQLException e1) {
                        JOptionPane.showMessageDialog(jFrame, "查询为空或失败");
                    }
                }
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        jps.add(BorderLayout.EAST, vbox1);
        jps.add(BorderLayout.CENTER, vbox);
        jps.add(BorderLayout.NORTH, jLabel);
        jps.add(BorderLayout.SOUTH, jButton);
        conjPanel.removeAll();
        conjPanel.add(jps);
        conjPanel.validate();
        conjPanel.repaint();
    }
}
