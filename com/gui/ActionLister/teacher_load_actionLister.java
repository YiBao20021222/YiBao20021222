package com.gui.ActionLister;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class teacher_load_actionLister extends driving_ActionLister implements ActionListener {
    public teacher_load_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(useDao.load_teacher_Sheet()){
            JOptionPane.showMessageDialog(jFrame,"老师表加载成功");
        }else{
            JOptionPane.showMessageDialog(jFrame,"老师表加载失败");
        }
    }
}
