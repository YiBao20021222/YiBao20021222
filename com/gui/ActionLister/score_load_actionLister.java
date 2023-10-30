package com.gui.ActionLister;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class score_load_actionLister extends driving_ActionLister implements ActionListener {
    public score_load_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if(useDao.load_score_Sheet()){
            JOptionPane.showMessageDialog(jFrame,"成绩表加载成功");
        }else{
            JOptionPane.showMessageDialog(jFrame,"成绩表加载失败");
        }
    }
}
