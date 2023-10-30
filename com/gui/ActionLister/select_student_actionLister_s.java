package com.gui.ActionLister;

import com.tjl.bean.ConPreRe;
import com.tjl.bean.Student;
import com.tjl.jdbc.JDBCUtils;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;
import java.sql.SQLException;

public class select_student_actionLister_s extends driving_ActionLister implements ActionListener {

    public select_student_actionLister_s(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        {
            JPanel jps=new JPanel(new BorderLayout());
            TextArea textArea=new TextArea("",10,12,TextArea.SCROLLBARS_VERTICAL_ONLY);
            JPanel jPanel=new JPanel(new GridLayout(3,2,10,10));
            JTextField student_id=new JTextField(15);
            JTextField student_name=new JTextField(15);
            JPasswordField student_password=new JPasswordField(15);
            jPanel.add(new JLabel("学生账号：")); jPanel.add(student_id);
            jPanel.add(new JLabel("学生姓名：")); jPanel.add(student_name);
            jPanel.add(new JLabel("学生密码：")); jPanel.add(student_password);
            JButton jButton=new JButton("查询成绩");

            jButton.addActionListener(e1 -> {
                ConPreRe ConPreRe =UseDao.studentSelect(new Student(Integer.parseInt(student_id.getText()),student_name.getText(),String.valueOf(student_password.getPassword())));
                ResultSet resultSet= ConPreRe.getResultSet();
                textArea.setText("");
                while(true){
                    try {
                        if (!resultSet.next()) break;
                    } catch (SQLException ex) {
                        JOptionPane.showMessageDialog(jFrame,"查询为空");
                    }
                    try {
                        textArea.append(
                                resultSet.getInt("student_id") + "\t" +
                                        resultSet.getString("student_name") + " \t" +
                                        resultSet.getString("class_type") + "\t" +
                                        resultSet.getString("teacher_name") + "\t" +
                                        resultSet.getFloat("score")+"\n"
                        );
                    } catch (SQLException ex) {
                        ex.printStackTrace();
                        throw new RuntimeException(ex);
                    }
                }
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            });
            jps.add(BorderLayout.SOUTH,jButton);
            jps.add(BorderLayout.CENTER,textArea);
            jps.add(BorderLayout.EAST,jPanel);

            conjPanel.removeAll();
            conjPanel.add(jps);
            conjPanel.revalidate();
            conjPanel.repaint();
        }
    }
}
