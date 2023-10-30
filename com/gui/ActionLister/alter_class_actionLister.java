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

public class alter_class_actionLister extends driving_ActionLister implements ActionListener {
    public alter_class_actionLister(JFrame jFrame, JPanel conjPanel) {
        super(jFrame, conjPanel);
    }

    @Override
    public void actionPerformed(ActionEvent e)  {
        JPanel jps=new JPanel(new BorderLayout());
        JLabel jLabel=new JLabel("修改科目");
        jLabel.setFont(new Font("微软雅黑", BOLD ,20));
        //west:

        JPanel jPanel=new JPanel(new GridLayout(2,2,10,5));
        JLabel jLabel1=new JLabel("科目修改后名称:");
        JTextField jTextField1=new JTextField(14);
        JLabel jLabel2=new JLabel("科目修改前名称:");

        JTextField jTextField2=new JTextField(14);
        jPanel.add(jLabel2); jPanel.add(jTextField2);
        jPanel.add(jLabel1); jPanel.add(jTextField1);


        //center:

        JLabel jLabel3=new JLabel("科目姓名:");
        JTextField jTextField3=new JTextField(14);
        JButton jButton1=new JButton("查询对应科目编号");
        JLabel jLabel4=new JLabel("科目编号:");
        JTextField jTextField4=new JTextField(14);

        Box vbox=Box.createVerticalBox();
        vbox.add(Box.createVerticalStrut(20));


        HBoxArray hBoxArray=new HBoxArray();
        hBoxArray
                .add(30,jLabel3).adds(jTextField3).adds(jButton1)
                .add(30,jLabel4).adds(jTextField4);
        hBoxArray.set(vbox);
        hBoxArray.clear();


        //east:

        TextArea textArea=new TextArea("",5,2,TextArea.SCROLLBARS_VERTICAL_ONLY);
        JButton jButton2=new JButton("科目范围查询");

        Box vBox1=Box.createVerticalBox();
        vBox1.add(Box.createVerticalStrut(10));
        Box hBox3=Box.createHorizontalBox();
        hBox3.add(Box.createHorizontalStrut(30));
        Box hBox4=Box.createHorizontalBox();
        hBox4.add(Box.createHorizontalStrut(30));

        hBoxArray
                .add(30,jButton2)
                .add(30,textArea);
        hBoxArray.set(vBox1);
        hBoxArray.clear();


        //south:

        JButton jButton=new JButton("修改科目");

        jps.add(BorderLayout.NORTH,jLabel);
        jps.add(BorderLayout.WEST,jPanel);
        jps.add(BorderLayout.CENTER,vbox);
        jps.add(BorderLayout.EAST,vBox1);
        jps.add(BorderLayout.SOUTH,jButton);

        jButton1.addActionListener(e120 -> {
            if(jTextField3.getText().equals("")){
                jTextField4.setText("");
                JOptionPane.showMessageDialog(jFrame,"科目名称为空");
            }
            else {
                int id = UseDao.classNameChangeId(jTextField3.getText());
                if (id == -1) {
                    jTextField4.setText("");
                    JOptionPane.showMessageDialog(jFrame, "没有该科目可以添加");
                } else {
                    jTextField4.setText(String.valueOf(id));
                }
            }
        });
        jButton2.addActionListener(e121 -> {
            ConPreRe ConPreRe =UseDao.selectClass();
            ResultSet resultSet= ConPreRe.getResultSet();
            textArea.setText("");
            while(true){
                try {
                    if (!resultSet.next()) break;
                    textArea.append(
                            resultSet.getString("class_id")+
                                    resultSet.getString("class_type")+"\n"
                    );
                } catch (SQLException ex) {
                    //ex.printStackTrace();
                    JOptionPane.showMessageDialog(jFrame,"查询范围为空");
                }

            }
            JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
        });
        jButton.addActionListener(e122 -> {
            if(UseDao.classNameChangeId(jTextField3.getText())!=-1) {
                if (UseDao.alterClass(jTextField1.getText(),jTextField2.getText())) {
                    JOptionPane.showMessageDialog(jFrame, "添加成功");
                } else {
                    JOptionPane.showMessageDialog(jFrame, "添加失败");
                }
            }else{
                JOptionPane.showMessageDialog(jFrame,"请先查询");
            }
        });

        conjPanel.removeAll();
        conjPanel.add(jps);
        conjPanel.revalidate();
        conjPanel.repaint();


    }
}
