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

public class select_student_teacher_actionLister extends driving_ActionLister implements ActionListener {
    public select_student_teacher_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e)  {
        JPanel jps = new JPanel(new BorderLayout());
        JLabel jLabel = new JLabel("查询老师授讲");

        jLabel.setFont(new Font("微软雅黑", BOLD, 20));

        TextArea jTextArea = new TextArea("", 40, 43, TextArea.SCROLLBARS_VERTICAL_ONLY);

        JButton jButton = new JButton("查询所有授课信息");

        jps.add(BorderLayout.NORTH, jLabel);
        jps.add(BorderLayout.SOUTH, jButton);
        jps.add(BorderLayout.CENTER, jTextArea);

        jButton.addActionListener(e13 -> {
            if (jTextArea.getText().equals("")) {
                ConPreRe ConPreRe = UseDao.selectStudentAllTeacher();
                ResultSet resultSet = ConPreRe.getResultSet();
                jTextArea.append("学生编号"+"\t"+"学生姓名"+"\t"+"老师编号\t"+"老师姓名\t"+"\n");
                while (true) {
                    try {
                        if (!resultSet.next()) break;
                        ConPreRe conPreRe1 =UseDao.studentAlter(resultSet.getString("student_id"));
                        ConPreRe conPreRe2 =UseDao.teacherSelect(Integer.parseInt(resultSet.getString("teacher_id")));
                        ResultSet resultSet1= conPreRe1.getResultSet();
                        ResultSet resultSet2= conPreRe2.getResultSet();
                        resultSet2.next();
                        jTextArea.append(resultSet1.getString("student_id")+"\t"+
                                resultSet1.getString("student_name")+"\t"+
                                resultSet2.getString("teacher_id")+"\t"+
                                resultSet2.getString("teacher_name")+"\n"
                        );
                        JDBCUtils.close(conPreRe2.getConnection(), conPreRe2.getPreparedStatement(), conPreRe2.getResultSet());
                    } catch (SQLException e1) {
                        e1.printStackTrace();
                        JOptionPane.showMessageDialog(jFrame, "查询为空或失败");
                    }
                }
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }
        });
        conjPanel.removeAll();
        conjPanel.add(jps);
        conjPanel.validate();
        conjPanel.repaint();
    }
}
