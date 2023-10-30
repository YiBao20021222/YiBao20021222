package com.gui.ActionLister;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class class_load_actionLister extends driving_ActionLister implements ActionListener {
    public class_load_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(useDao.load_class_Sheet()){
            JOptionPane.showMessageDialog(jFrame,"科目表加载成功");
        }else{
            JOptionPane.showMessageDialog(jFrame,"科目表加载失败");
        }
    }
}
