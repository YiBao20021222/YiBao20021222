package com.poi.dao;

import org.apache.poi.ss.usermodel.Workbook;

public interface dao {
    /**提取表的类型
     * @return 提取表的类型名字 <br>
     * 1、xlsx
     * 2、lsx
     */
    Workbook load_workbook_type();
    /**加载学生表
     *
     * @return 学生表是否加载成功
     */
    boolean load_student_sheet();

    /**加载老师表
     *
     * @return 老师表是否加载成功
     */
    boolean load_teacher_Sheet();

    /**加载科目表
     *
     * @return 科目表是否加载成功
     */
    boolean load_class_Sheet();

    /**加载成绩表
     *
     * @return 成绩是否加载成功
     */
    boolean load_score_Sheet();

    /**加载学生授讲表
     *
     * @return 学生授讲是否加载成功
     */
    boolean load_fk_student_teacher();

    /**加载老师授课表
     *
     * @return 学生授讲是否成功
     */
    boolean load_fk_teacher_class();

}
