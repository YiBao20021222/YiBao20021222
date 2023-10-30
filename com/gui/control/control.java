package com.gui.control;
public class control {
    private static final com.gui.dao.UseDao UseDao = new com.gui.dao.UseDao();

    //管理员登录
    public void Start() {
        UseDao.indexJFrame();
    }

    public static void indexControl(int type) {
        switch (type) {
            case 1 ->
//学生登录
                    UseDao.studentFrame();
            case 2 ->
//老师登录
                    UseDao.teacherFrame();
            case 3 ->
//管理员登录
                    UseDao.managerFrame();
            default ->
                    UseDao.indexJFrame();
        }
    }
}
