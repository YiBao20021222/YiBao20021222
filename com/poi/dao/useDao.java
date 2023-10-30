package com.poi.dao;
import com.poi.input.input_xlsx;
import com.tjl.bean.ConPreRe;
import com.tjl.bean.Student;
import com.tjl.dao.UseDAO;
import com.tjl.jdbc.JDBCUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.*;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
public class useDao implements dao{
    @Override
    public Workbook load_workbook_type() {
        Workbook workbook = null;
        switch (input_xlsx.getWorkbook_type()) {
            case "xlsx" -> {
                try {
                    workbook = new XSSFWorkbook(input_xlsx.getWorkbook_address());
                    return  workbook;
                } catch (IOException e) {
                    e.printStackTrace();
                }
                System.out.println("地址错误或者类型错误");
            }
            case "lsx" -> {
                try {
                    FileInputStream is = new FileInputStream(input_xlsx.getWorkbook_address());
                    POIFSFileSystem fs = new POIFSFileSystem(is);
                    workbook = new HSSFWorkbook(fs);
                    workbook.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                return workbook;
            }
            default -> {
                System.out.println("无对应类型");
                return null;
            }
        }
        try {
            if (workbook != null) {
                workbook.close();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public boolean load_student_sheet() {
        Workbook workbook=load_workbook_type();
        UseDAO UseDao=new UseDAO();
        Sheet sheet=workbook.getSheetAt(input_xlsx.getStudent_sheet_index());
        Row row=sheet.getRow(0);
        Map<Integer,String> map=new HashMap<>();
        for(int i=0;i<row.getLastCellNum();i++){
            map.put(i,row.getCell(i).getStringCellValue());
        }
        for(int i=1;i<=sheet.getLastRowNum();i++){
            row=sheet.getRow(i);
            int id=0;
            String password=null,name = null;
            for(int j=0;j<row.getLastCellNum();j++) {
                switch (map.get(j)) {
                    case "密码":
                        try {
                            password = String.valueOf(row.getCell(j).getStringCellValue());
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    case "学号":
                        try {
                        id = (int) row.getCell(j).getNumericCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    case "姓名":
                        try {
                        name = row.getCell(j).getStringCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    default:
                        break;
                }
            }
            System.out.println(id);
            ConPreRe ConPreRe =UseDao.teacherSelectStudent(String.valueOf(id));
            if(ConPreRe.getResultSet()!=null) {
                Student student = new Student(id,name, password);
                UseDao.studentInsert(student);
                JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
            }else{
                System.out.println("已有该学号了");
            }

        }
        try {
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    @Override
    public boolean load_teacher_Sheet(){
        Workbook workbook=load_workbook_type();
        UseDAO UseDao=new UseDAO();
        Sheet sheet=workbook.getSheetAt(input_xlsx.getTeacher_sheet_index());
        Row row=sheet.getRow(0);
        Map<Integer,String> map=new HashMap<>();
        for(int i=0;i<row.getLastCellNum();i++){
            map.put(i,row.getCell(i).getStringCellValue());
        }
        for(int i=1;i<=sheet.getLastRowNum();i++){
            row=sheet.getRow(i);
            int id=0;
            String password=null,name = null;
            for(int j=0;j<row.getLastCellNum();j++) {
                switch (map.get(j)) {
                    case "密码":
                        try {
                        password = String.valueOf(row.getCell(j).getStringCellValue());
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    case "学号":
                        try {
                        id = (int) row.getCell(j).getNumericCellValue();
                        break;
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                    case "姓名":
                        try {
                        name = row.getCell(j).getStringCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    default:
                        break;
                }
            }
            ConPreRe ConPreRe =UseDao.teacherSelect(id);
            ResultSet resultSet= ConPreRe.getResultSet();
            if(resultSet!=null) {
                UseDao.teacherAdd(String.valueOf(id),name,password);
            }else{
                System.out.println("已有该学号了");
            }
            JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
        }
        try {
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    @Override
    public boolean load_class_Sheet() {
        Workbook workbook=load_workbook_type();
        UseDAO UseDao=new UseDAO();
        Sheet sheet=workbook.getSheetAt(input_xlsx.getClass_sheet_index());
        Row row=sheet.getRow(0);
        Map<Integer,String> map=new HashMap<>();
        for(int i=0;i<row.getLastCellNum();i++){
            map.put(i,row.getCell(i).getStringCellValue());
        }
        for(int i=1;i<=sheet.getLastRowNum();i++){
            row=sheet.getRow(i);
            int id=0;
            String name = null;
            for(int j=0;j<row.getLastCellNum();j++) {
                switch (map.get(j)) {
                    case "编号":
                        try {
                        id = (int) row.getCell(j).getNumericCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    case "科目名称":
                        try {
                        name = row.getCell(j).getStringCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    default:
                        break;
                }
            }
            System.out.println(id);
            if(UseDao.classNameChangeId(name)==-1) {
                UseDao.addClass(name);
            }else{
                System.out.println("已有该学号了");
            }
        }
        try {
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    @Override
    public boolean load_score_Sheet() {
        Workbook workbook=load_workbook_type();
        UseDAO UseDao=new UseDAO();
        Sheet sheet=workbook.getSheetAt(input_xlsx.getScore_sheet_index());
        Row row=sheet.getRow(0);
        Map<Integer,String> map=new HashMap<>();
        for(int i=0;i<row.getLastCellNum();i++){
            map.put(i,row.getCell(i).getStringCellValue());
        }
        for(int i=1;i<=sheet.getLastRowNum();i++){
            row=sheet.getRow(i);
            int id=0;
            int student_id = -1,class_id=-1;
            float score = -1;
            for(int j=0;j<row.getLastCellNum();j++) {
                switch (map.get(j)) {
                    case "学生学号":
                        try {
                        student_id = (int) row.getCell(j).getNumericCellValue();
                        break;
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                    case "科目编号":
                        try {
                        class_id = (int) row.getCell(j).getNumericCellValue();
                        break;
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                    case "学生成绩":
                        try {
                        score=(float) row.getCell(j).getNumericCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                    default:
                        break;
                }
            }
            ConPreRe ConPreRe =UseDao.scoreSelect(String.valueOf(id));
            ResultSet resultSet= ConPreRe.getResultSet();
            if(resultSet!=null) {
                UseDao.scoreAdd(student_id,class_id,score);
            }else{
                System.out.println("已有该学号了");
            }
            JDBCUtils.close(ConPreRe.getConnection(), ConPreRe.getPreparedStatement(), ConPreRe.getResultSet());
        }
        try {
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    @Override
    public boolean load_fk_student_teacher() {
        Workbook workbook=load_workbook_type();
        UseDAO UseDao=new UseDAO();
        Sheet sheet=workbook.getSheetAt(input_xlsx.getStudent_teacher_index());
        Row row=sheet.getRow(0);
        Map<Integer,String> map=new HashMap<>();
        for(int i=0;i<row.getLastCellNum();i++){
            map.put(i,row.getCell(i).getStringCellValue());
        }
        for(int i=1;i<=sheet.getLastRowNum();i++){
            row=sheet.getRow(i);
            int student_id = -1,teacher_id=-1;
            for(int j=0;j<row.getLastCellNum();j++) {
                switch (map.get(j)) {
                    case "学生学号":
                        try {
                        student_id = (int) row.getCell(j).getNumericCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    case "老师学号":
                        try {
                        teacher_id = (int) row.getCell(j).getNumericCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    default:
                        break;
                }
            }
            if(UseDao.managerFkStudentTeacher(student_id,teacher_id)) {
               System.out.println("学生和老师匹配成功");
            }else{
                System.out.println("已有该连接");
            }
        }
        try {
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    @Override
    public boolean load_fk_teacher_class() {
        Workbook workbook=load_workbook_type();
        UseDAO UseDao=new UseDAO();
        Sheet sheet=workbook.getSheetAt(input_xlsx.getTeacher_class_index());
        Row row=sheet.getRow(0);
        Map<Integer,String> map=new HashMap<>();
        for(int i=0;i<row.getLastCellNum();i++){
            map.put(i,row.getCell(i).getStringCellValue());
        }
        for(int i=1;i<=sheet.getLastRowNum();i++){
            row=sheet.getRow(i);
            int teacher_id = -1,class_id=-1;
            for(int j=0;j<row.getLastCellNum();j++) {
                switch (map.get(j)) {
                    case "老师学号":
                        try {
                        teacher_id = (int) row.getCell(j).getNumericCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    case "科目编号":
                        try {
                        class_id = (int) row.getCell(j).getNumericCellValue();
                        }catch (Exception e){
                            System.out.println("完成全部或者可能excel表里面多了其他值");
                            return true;
                        }
                        break;
                    default:
                        break;
                }
            }
            if(UseDao.managerFkTeacherClass(teacher_id,class_id)) {
                System.out.println("老师和科目匹配成功");
            }else{
                System.out.println("已有该学号了");
            }
        }
        try {
            workbook.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

}
