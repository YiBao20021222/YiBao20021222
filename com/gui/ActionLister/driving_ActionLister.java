package com.gui.ActionLister;

import com.gui.control.control;
import com.poi.dao.useDao;
import com.tjl.dao.UseDAO;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class driving_ActionLister extends HBoxArray {
    protected JFrame jFrame;
    protected JPanel conjPanel;
    static UseDAO UseDao=new UseDAO();
    static com.gui.control.control control=new control();
    static com.poi.dao.useDao useDao=new useDao();

    public void setjFrame(JFrame jFrame) {
        this.jFrame = jFrame;
    }

    public JFrame getjFrame() {
        return jFrame;
    }

    public JPanel getConjPanel() {
        return conjPanel;
    }

    public void setConjPanel(JPanel conjPanel) {
        this.conjPanel = conjPanel;
    }
    public driving_ActionLister(JFrame jFrame,JPanel conjPanel){
        this.jFrame=jFrame;
        this.conjPanel=conjPanel;
    }
}
class HBoxArray{
    private ArrayList<Box> arrayList;
    private Box nowBox;
    public HBoxArray(){
        this.arrayList=new ArrayList<>();
    }

    public void setArrayList(ArrayList<Box> arrayList) {
        this.arrayList = arrayList;
    }
    public  HBoxArray add(int Width, Component comp){
        Box HBox=null;
        try {
            HBox = Box.createHorizontalBox();
            HBox.add(Box.createHorizontalStrut(Width));
            HBox.add(comp);
            setNowBox(HBox);
            this.arrayList.add(HBox);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return this;
    }

    public  HBoxArray adds(Component comp){
        Box HBox=getNowBox();
        try {
            HBox.add(comp);
            this.arrayList.add(HBox);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
        return this;
    }

    public List<Box> getArrayList() {
        return arrayList;
    }

    public void setArrayList(List<Box> arrayList) {
        this.arrayList = (ArrayList<Box>) arrayList;
    }
    public boolean set(Box VBox){
        try {
            for (Box HBox : this.arrayList) {
                VBox.add(HBox);
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public Box getNowBox() {
        return nowBox;
    }

    public void setNowBox(Box nowBox) {
        this.nowBox = nowBox;
    }
    public void clear(){
        arrayList.clear();
    }
}

