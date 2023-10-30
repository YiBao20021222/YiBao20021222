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

public class select_class_actionLister extends driving_ActionLister implements ActionListener {
    public select_class_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e)  {
        JPanel jps = new JPanel(new BorderLayout());
        JLabel jLabel = new JLabel("查询科目");

        jLabel.setFont(new Font("微软雅黑", BOLD, 20));

        TextArea jTextArea = new TextArea("", 40, 43, TextArea.SCROLLBARS_VERTICAL_ONLY);

        JButton jButton = new JButton("查询所有科目所有信息");

        jps.add(BorderLayout.NORTH, jLabel);
        jps.add(BorderLayout.SOUTH, jButton);
        jps.add(BorderLayout.CENTER, jTextArea);

        jButton.addActionListener(e13 -> {
            if (jTextArea.getText().equals("")) {
                ConPreRe ConPreRe = UseDao.selectClass();
                ResultSet resultSet = ConPreRe.getResultSet();
                jTextArea.append("科目编号\t" + "科目名称\t" + "\n");
                while (true) {
                    try {
                        if (!resultSet.next()) break;
                        jTextArea.append(
                                resultSet.getInt("class_id") + "\t" +
                                        resultSet.getString("class_type") + "\n");
                    } catch (SQLException e1) {
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
