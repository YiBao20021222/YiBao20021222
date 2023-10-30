package com.gui.ActionLister;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

public class open_excel_actionLister extends driving_ActionLister implements ActionListener {
    public open_excel_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        Runtime runtime=Runtime.getRuntime();
        try {
            runtime.exec("cmd /c start com//poi//workbook//test.xlsx");
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
