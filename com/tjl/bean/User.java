package com.tjl.bean;

public class User {
    private final String uId;
    private final String uPass;
    private final String uname;
    public User(String uId,String uPass,String uname){
        this.uId=uId;
        this.uPass=uPass;
        this.uname=uname;
    }
    public String getuId() {
        return uId;
    }
    public String getuPass() {
        return uPass;
    }

    public String getUname() {
        return uname;
    }
}
