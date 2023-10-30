package com.tjl.bean;

public class Teacher {
    private final  String teacherId;
    private final String teacherName;
    private final String teacherPassword;

    public Teacher(String teacherId, String teacherName, String teacherPassword){
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.teacherPassword = teacherPassword;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public String getTeacherPassword() {
        return teacherPassword;
    }

    public String getTeacherId() {
        return teacherId;
    }
}
