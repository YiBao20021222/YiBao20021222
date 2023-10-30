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

public class delete_teacher_class_actionLister extends driving_ActionLister implements ActionListener {
    public delete_teacher_class_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        JPanel jps=new JPanel(new BorderLayout());
        //north：
        JLabel jLabel=new JLabel("授课");
        jLabel.setFont(new Font("微软雅黑", BOLD,20));
        //west:
        JPanel jPanel=new JPanel(new GridLayout(2,1,5,5));
        JLabel jLabel1=new JLabel("老师编号");
        JTextField jTextField1=new JTextField(14);
        JLabel jLabel2=new JLabel("科目名称");
        JTextField jTextField2=new JTextField(14);
        jPanel.add(jLabel1); jPanel.add(jTextField1);
        jPanel.add(jLabel2); jPanel.add(jTextField2);
        //center:
        JPanel jPanel1=new JPanel(new GridLayout(2,1,5,5));
        JButton jButton=new JButton("查找科目的范围");
        TextArea textArea=new TextArea("",6,4,TextArea.SCROLLBARS_VERTICAL_ONLY);
        jPanel1.add(jButton); jPanel1.add(textArea);
        //east:
        JPanel jPanel2=new JPanel(new GridLayout(2,2,5,5));
        JLabel jLabel3=new JLabel("老师编号");
        JTextField jTextField4=new JTextField(15);
        JButton jButton1=new JButton("查找指定老师的科目");
        TextArea textArea1=new TextArea("",6,3,TextArea.SCROLLBARS_VERTICAL_ONLY);
        jPanel2.add(jLabel3); jPanel2.add(jTextField4);
        jPanel2.add(jButton1); jPanel2.add(textArea1);
        //south:
        JButton jButton2=new JButton("取消老师授课");
        jps.add(BorderLayout.NORTH,jLabel);
        jps.add(BorderLayout.WEST,jPanel);
        jps.add(BorderLayout.CENTER,jPanel1);
        jps.add(BorderLayout.EAST,jPanel2);
        jps.add(BorderLayout.SOUTH,jButton2);

        jButton.addActionListener(e123 -> {
            ConPreRe ConPreRe =UseDao.selectClass();
            ResultSet resultSet= ConPreRe.getResultSet();
            textArea.setText("");
            while(true){
                try {
                    if (!resultSet.next()) break;
                    textArea.append(
                            resultSet.getString("class_id")+"\t"+
                                    resultSet.getString("class_type")+"\n"
                    );
                } catch (SQLException ex) {
                    JOptionPane.showMessageDialog(jFrame,"查询为空");
                }
            }
            JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
        });
        jButton1.addActionListener(e124 -> {
            ConPreRe ConPreRe =UseDao.selectTeacherClass(jTextField4.getText());
            ResultSet resultSet= ConPreRe.getResultSet();
            textArea1.setText("");
            while(true){
                try {
                    if (!resultSet.next()) break;
                    textArea1.append(
                            resultSet.getString("teacher_id")+"\t"+
                                    UseDao.classIdChangeClassName(Integer.parseInt(resultSet.getString("class_id")))+"\n"
                    );
                } catch (SQLException ex) {
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
                if (UseDao.teacherClassDelete(jTextField1.getText(), String.valueOf(UseDao.classNameChangeId(jTextField2.getText())))) {

                    JOptionPane.showMessageDialog(jFrame, "删除成功");
                } else {
                    JOptionPane.showMessageDialog(jFrame, "删除失败");
                }
            }
        });
        conjPanel.removeAll();
        conjPanel.add(jps);
        conjPanel.revalidate();
        conjPanel.repaint();

    }
}
