package com.gui.ActionLister;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class student_teacher_load_actionLister extends driving_ActionLister implements ActionListener {
    public student_teacher_load_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(useDao.load_fk_student_teacher()){
            JOptionPane.showMessageDialog(jFrame,"学生受教表加载成功");
        }else{
            JOptionPane.showMessageDialog(jFrame,"学生受教表加载失败");
        }
    }
}
