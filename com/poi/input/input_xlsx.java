package com.poi.input;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class input_xlsx {
    private static final String workbook_type;
    private static final int student_sheet_index;
    private static final int teacher_sheet_index;
    private static final int class_sheet_index;
    private static final int score_sheet_index;
    private static final int manager_sheet_index;
    private static final int student_teacher_index;
    private static final int teacher_class_index;

    private static final String workbook_address;

    static {
        InputStream inputStream=input_xlsx.class.getClassLoader().getResourceAsStream("student_control_system.properties");
        Properties properties=new Properties();
        try {
            properties.load(inputStream);
            workbook_type=properties.getProperty("workbook_type");
            workbook_address=properties.getProperty("workbook_address");
            student_sheet_index=Integer.parseInt(properties.getProperty("student_sheet_index"));
            teacher_sheet_index=Integer.parseInt(properties.getProperty("teacher_sheet_index"));
            class_sheet_index=Integer.parseInt(properties.getProperty("class_sheet_index"));
            score_sheet_index=Integer.parseInt(properties.getProperty("score_sheet_index"));
            manager_sheet_index=Integer.parseInt(properties.getProperty("manager_sheet_index"));
            student_teacher_index=Integer.parseInt(properties.getProperty("student_teacher_sheet_index"));
            teacher_class_index=Integer.parseInt(properties.getProperty("teacher_class_sheet_index"));

        } catch (IOException e) {
            System.out.println("驱动失败");
            throw new RuntimeException(e);
        }
    }

    public static String getWorkbook_address() {
        System.out.println(workbook_address);
        return workbook_address;
    }

    public static String getWorkbook_type() {
        return workbook_type;
    }

    public static int getManager_sheet_index() {
        return manager_sheet_index;
    }

    public static int getClass_sheet_index() {
        return class_sheet_index;
    }

    public static int getStudent_sheet_index() {
        return student_sheet_index;
    }

    public static int getScore_sheet_index() {
        return score_sheet_index;
    }

    public static int getTeacher_sheet_index() {
        return teacher_sheet_index;
    }

    public static int getStudent_teacher_index() {
        return student_teacher_index;
    }

    public static int getTeacher_class_index() {
        return teacher_class_index;
    }
}
