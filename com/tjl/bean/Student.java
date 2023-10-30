package com.tjl.bean;

public class Student {
    private final  int uName;
    private final String sName;
    private final String sPass;

    public int getuName() {
        return uName;
    }
    public Student(int uName, String sName, String sPass) {
        this.uName = uName;
        this.sName=sName;
        this.sPass=sPass;
    }
    public String getsName() {
        return sName;
    }

    public String getsPass() {
        return sPass;
    }

}
