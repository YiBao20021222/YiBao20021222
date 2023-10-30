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

public class delete_student_teacher_actionLister extends driving_ActionLister implements ActionListener {
    public delete_student_teacher_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e){
        JPanel jps=new JPanel(new BorderLayout());
        //north：
        JLabel jLabel=new JLabel("授讲");
        jLabel.setFont(new Font("微软雅黑", BOLD,20));
        //west:
        JPanel jPanel=new JPanel(new GridLayout(2,1,5,5));
        JLabel jLabel1=new JLabel("学生编号");
        JTextField jTextField1=new JTextField(14);
        JLabel jLabel2=new JLabel("老师编号");
        JTextField jTextField2=new JTextField(14);
        jPanel.add(jLabel1); jPanel.add(jTextField1);
        jPanel.add(jLabel2); jPanel.add(jTextField2);
        //center:
        JPanel jPanel1=new JPanel(new GridLayout(2,1,5,5));
        JButton jButton=new JButton("查找老师的范围");
        TextArea textArea=new TextArea("",6,4,TextArea.SCROLLBARS_VERTICAL_ONLY);
        jPanel1.add(jButton); jPanel1.add(textArea);
        //east:
        JPanel jPanel2=new JPanel(new GridLayout(2,2,5,5));
        JLabel jLabel3=new JLabel("老师编号");
        JTextField jTextField4=new JTextField(15);
        JButton jButton1=new JButton("查找指定老师的学生");
        TextArea textArea1=new TextArea("",6,3,TextArea.SCROLLBARS_VERTICAL_ONLY);
        jPanel2.add(jLabel3); jPanel2.add(jTextField4);
        jPanel2.add(jButton1); jPanel2.add(textArea1);
        //south:
        JButton jButton2=new JButton("取消老师授讲");
        jps.add(BorderLayout.NORTH,jLabel);
        jps.add(BorderLayout.WEST,jPanel);
        jps.add(BorderLayout.CENTER,jPanel1);
        jps.add(BorderLayout.EAST,jPanel2);
        jps.add(BorderLayout.SOUTH,jButton2);

        jButton.addActionListener(e123 -> {
            ConPreRe ConPreRe =UseDao.teacherAllSelect();
            ResultSet resultSet= ConPreRe.getResultSet();
            textArea.setText("");
            while(true){
                try {
                    if (!resultSet.next()) break;
                    textArea.append(
                            resultSet.getString("teacher_id")+"\t"+
                                    resultSet.getString("teacher_name")+
                                    "\n"
                    );
                } catch (SQLException ex) {
                    JOptionPane.showMessageDialog(jFrame,"查询为空");
                }
            }
            JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
        });
        jButton1.addActionListener(e124 -> {
            ConPreRe ConPreRe =UseDao.selectStudentTeacher(jTextField4.getText());
            ResultSet resultSet= ConPreRe.getResultSet();
            textArea1.setText("");
            while(true){
                try {
                    if (!resultSet.next()) break;
                    ConPreRe conPreRe1 =UseDao.studentAlter(resultSet.getString("student_id"));
                    ConPreRe conPreRe2 =UseDao.teacherSelect(Integer.parseInt(resultSet.getString("teacher_id")));
                    ResultSet resultSet1= conPreRe1.getResultSet();
                    ResultSet resultSet2= conPreRe2.getResultSet();
                    resultSet2.next();
                    textArea1.append(resultSet1.getString("student_id")+"\t"+
                            resultSet1.getString("student_name")+"\t"+resultSet2.getString("teacher_name")+"\n"
                    );
                    JDBCUtils.close(conPreRe2.getConnection(), conPreRe2.getPreparedStatement(), conPreRe2.getResultSet());
                    JDBCUtils.close(conPreRe1.getConnection(), conPreRe1.getPreparedStatement(), conPreRe1.getResultSet());
                } catch (SQLException ex) {
                    ex.printStackTrace();
                    JOptionPane.showMessageDialog(jFrame,"查询为空");
                }
            }
            JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
        });
        jButton2.addActionListener(e125 -> {
            if(jTextField1.getText().equals("")){
                JOptionPane.showMessageDialog(jFrame,"老师编号不能为空");
            }else if(jTextField2.getText().equals("")){
                JOptionPane.showMessageDialog(jFrame,"科目姓名不能为空");
            }else {
                if (UseDao.studentTeacherDelete(jTextField1.getText(), jTextField2.getText())) {

                    JOptionPane.showMessageDialog(jFrame, "添加成功");
                } else {
                    JOptionPane.showMessageDialog(jFrame, "添加失败");
                }
            }
        });
        conjPanel.removeAll();
        conjPanel.add(jps);
        conjPanel.revalidate();
        conjPanel.repaint();

    }
}
