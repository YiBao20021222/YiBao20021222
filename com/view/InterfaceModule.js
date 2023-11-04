//模版导入
const express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
 //编码设置
 var datastr="";
 var key=null;
 function setkey(){
    fs.readFile('com/view/key.js', function (err,data) {
        if (err) return console.error(err);
        datastr=data.toString();
        dataArray=datastr.split("\n");
        key=parseInt(Math.floor(Math.random()*100),16);
        dataArray[0]=`var key=${key}`;
        datastr=dataArray.join("\n");
        console.log(key);
        fs.writeFile('com/view/key.js',datastr, function (err) {
            if (err) return console.error(err);
        });
    });
 }
 setkey()
//路由创建
const router = express.Router();
//允许body的使用
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//初始化数据库连接配置
const mysqlLoginDate={
    host: "127.0.0.1",
    database: "student_control_system",
    port: "3306",
    user: "root2",
    password: "123",
}
//mysql查询语句
const  SQL_USER_LOGIN ="select type from user where  user_id=? and user_password=? and user_name=?;"
const  STUDENT_SELECT="select * from student_information where student_id=? and student_password=? and student_name=?;"
const  TEACHER_SELECT_STUDENT ="select * from student_information where student_id=?";
const  STUDENT_EXISTS="select (select (exists(select * from student where student_id=?))) 'key' ;"
const  TEACHER_SELECT_STUDENT_NORMAL_INFORMATION="select * from student where student_id=?";
const  STUDENT_INSERT ="insert into student_control_system.Student(student_id,student_name, student_password, type) VALUES (?,?,?,1);";
const  STUDENT_DELETE ="delete from student_control_system.Student where student_id=?;";
const  STUDENT_ALTER_PASS ="update student_control_system.Student set student_password=? where student_id=?;";
const  STUDENT_ALTER_S_NAME ="update student_control_system.Student set student_name=? where student_id=?;";
const  STUDENT_ALTER_CLASS ="update student_control_system.score set class_id=(select class_id from student_control_system.class where class_type=?) where student_id=? and class_id=(select class_id from student_control_system.class where class_type=?); ";
const  CLASS_EXISTS="select (select(exists(select * from student_control_system.class where class_type=?))) 'key';"
const  SCORE_ADD ="insert into student_control_system.score(student_id,class_id,score) values(?,(select class_id from student_control_system.class where class_type=?),?);";
const  STUDENT_ALTER_SCORE ="update student_control_system.score set score=? where student_id=? and class_id=(select class_id from student_control_system.class where class_type=?);";
const  TEACHER_EXISTS="select (select (exists(select * from teacher where teacher_id=?))) 'key' ;"
const  TEACHER_HAVE_STUDENT="select * from student_control_system.student_information s right join (select teacher_name from student_control_system.teacher where teacher_id=?) st  on s.teacher_name=st.teacher_name;"
const  TEACHER_APPROVE="select (select (exists(select * from teacher where teacher_id=? and teacher_password=?))) 'key' ;"
const  SCORE_ADD_ABLE="select (select (exists(select * from score where student_id=? and class_id=(select class_id from class where class_type=?)))) 'key' "
const  MANAGER_APPROVE="select (select (exists(select * from manager where manager_id=? and manager_password=?))) 'key' ;"
const  CLASS_ADD ="insert into student_control_system.class(class_type) values(?);";
const  CLASS_HAVE="select * from class;"
const  DELETE_CLASS="delete from class where class_type=?;"
var time=null;
router.get('/SQL_USER_LOGIN', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
        if (err) throw err;
        console.log("连接成功");
    }); 
    //url参数提取
    var user_id=req.query.user_id;
    var user_name=req.query.user_name;
    var user_password=req.query.user_password;
    //构成数组
    data=[
        `${user_id}`,
        `${user_password}`,
        `${user_name}`,
    ]
    /**登录查询
     * @returns bool 是否搜索成功
     */
    con.query(SQL_USER_LOGIN,data,(err,result)=>{
        function keyen(data) {
            var newdata="";
            for(var i=0;i<data.length;i++){
                var j=i;
                while(j>key.length){
                    j=i%(key.length);
                }
                newdata+=String.fromCharCode(data.charCodeAt(i)^key)
            }
            return newdata;
        }
        if(err) {
            console.log(err.message);
            con.destroy()
            return false;
        };
        var type="-1";
        if(result[0]){
            switch(result[0].type){
                case "1":
                    type=keyen("../student/student.html");
                    break;
                case "2":
                    type=keyen("../teacher/teacher.html");
                    break;
                case "3":
                    type=keyen("../manager/manager.html");
                    break
                default:
                    type="-1";
                    break;
            }
        }
        res.send(type);
        con.destroy()
        return  true;
    });
    }
)
router.post('/STUDENT_SELECT', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    var student_name=req.body.student_name;
    var student_password=req.body.student_password;
    //构成数组
    data=[
        `${student_id}`,
        `${student_password}`,
        `${student_name}`,
    ]

    /**学生信息查询
     *  @returns bool 是否登录成功
     */
    con.query(STUDENT_SELECT,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
    
})
router.post('/TEACHER_SELECT_STUDENT', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    //构成数组
    data=[
        `${student_id}`,
    ]

    /**老师搜索学生信息
     *  @returns bool 是否登录成功
     */
    con.query(TEACHER_SELECT_STUDENT,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
    
})
router.post('/STUDENT_EXISTS', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    //构成数组
    data=[
        `${student_id}`,
    ]

    /**学生是否存在
     *  @returns bool 是否登录成功
     */
    con.query(STUDENT_EXISTS,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
})
router.post('/TEACHER_SELECT_STUDENT_NORMAL_INFORMATION', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    //构成数组
    data=[
        `${student_id}`,
    ]

    /**老师查询学生一般信息
     *  @returns bool 是否登录成功
     */
    con.query(TEACHER_SELECT_STUDENT_NORMAL_INFORMATION,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
})
router.post('/STUDENT_INSERT', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    var student_name=req.body.student_name;
    var student_password=req.body.student_password;
    //构成数组
    data=[
        `${student_id}`,
        `${student_name}`,
        `${student_password}`
    ]
    /**学生插入
     *  @returns bool 是否登录成功
     */
    con.query(STUDENT_INSERT,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
    
})
router.post('/STUDENT_DELETE', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    //构成数组
    data=[
        `${student_id}`,
    ]

    /**学生删除
     *  @returns bool 是否登录成功
     */
    con.query(STUDENT_DELETE,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
    
})
router.post('/STUDENT_ALTER_PASS', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    var student_password=req.body.student_password;
    //构成数组
    data=[
        `${student_password}`,
        `${student_id}`
    ]
    /**学生密码修改
     *  @returns bool 是否登录成功
     */
    con.query(STUDENT_ALTER_PASS,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
})
router.post('/STUDENT_ALTER_S_NAME', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    var student_name=req.body.student_name;
    //构成数组
    data=[
        `${student_name}`,
        `${student_id}`
    ]
    /**学生姓名修改
     *  @returns bool 是否登录成功
     */
    con.query(STUDENT_ALTER_S_NAME,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
})
router.post('/STUDENT_ALTER_CLASS', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_new_class=req.body.student_new_class;
    var student_old_class=req.body.student_old_class;
    var student_id=req.body.student_id;
    //构成数组
    data=[
        `${student_new_class}`,
        `${student_id}`,
        `${student_old_class}`,

    ]
    /**学生姓名修改
     *  @returns bool 是否登录成功
     */
    console.log(data);
    con.query(STUDENT_ALTER_CLASS,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
})
router.post('/CLASS_EXISTS', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var class_type=req.body.class_type;
    //构成数组
    data=[
        `${class_type}`,
    ]
    /**学生姓名修改
     *  @returns bool 是否登录成功
     */
    con.query(CLASS_EXISTS,data,(err,result)=>{
        if(err) {
            console.log(err.message)
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
    
})
router.post('/STUDENT_ALTER_SCORE', (req, res) => {
    //数据库连接
    var con = mysql.createConnection(mysqlLoginDate);
    con.connect(function(err) {
            if (err) throw err;
            console.log("连接成功");
    });
     //url参数提取
    var student_id=req.body.student_id;
    var class_type=req.body.class_type;
    var score=req.body.score;
    //构成数组
    data=[
        `${score}`,
        `${student_id}`,
        `${class_type}`
       
    ]
    /**学生姓名修改
     *  @returns bool 是否登录成功
     */
    con.query(STUDENT_ALTER_SCORE,data,(err,result)=>{
        if(err) {
            console.log(err.message);
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    });
    
})
router.post('/TEACHER_EXISTS',(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    
    con.connect(function(err) {
             if (err) throw err;
            console.log("连接成功");
    });
    var teacher_id=req.body.teacher_id;
    data=[
        `${teacher_id}`
    ]
    con.query(TEACHER_EXISTS,data,(err,result)=>{
        if(err) {
            console.log(err.message);
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    })
});
router.post('/TEACHER_HAVE_STUDENT',(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    
    con.connect(function(err) {
             if (err) throw err;
            console.log("连接成功");
    });
    var teacher_id=req.body.teacher_id;
    data=[
        `${teacher_id}`
    ]
    con.query(TEACHER_HAVE_STUDENT,data,(err,result)=>{
        if(err) {
            console.log(err.message);
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    })
});
router.post('/TEACHER_APPROVE',(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    
    con.connect(function(err) {
             if (err) throw err;
            console.log("连接成功");
    });
    var teacher_id=req.body.teacher_id;
    var teacher_password=req.body.teacher_password;
    data=[
        `${teacher_id}`,
        `${teacher_password}`
    ]
    con.query(TEACHER_APPROVE,data,(err,result)=>{
        if(err) {
            console.log(err.message);
            con.destroy()
            return false
        };
        res.send(result);
        con.destroy()
        return true
    })
});
router.post('/SCORE_ADD',(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var class_type=req.body.class_type;
    var student_id=req.body.student_id;
    var score=req.body.score;
    data=[
        `${student_id}`,
        `${class_type}`,
        `${score}`
    ]
    con.query(SCORE_ADD,data,(err,result)=>{
        if(err){
            console.log(err.message);
            con.destroy()
            return false
        }
        res.send(result);
        con.destroy()
        return true
    })
});
router.post("/SCORE_ADD_ABLE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var student_id=req.body.student_id;
    var class_type=req.body.class_type;
    data=[
        `${student_id}`,
        `${class_type}`,
    ]
    con.query(SCORE_ADD_ABLE,data,(err,result)=>{
        if(err){
            console.log(err.message);
            con.destroy()
            return false
        }
        res.send(result);
        con.destroy()
        return true
    })

})
router.post("/MANAGER_APPROVE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var manager_id=req.body.manager_id;
    var manager_password=req.body.manager_password;
    data=[
        `${manager_id}`,
        `${manager_password}`,
    ]
    con.query(MANAGER_APPROVE,data,(err,result)=>{
        if(err){
            console.log(err.message);
            con.destroy()
            return false
        }
        res.send(result);
        con.destroy()
        return true
    })

})
router.post("/CLASS_ADD",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var class_type=req.body.class_type;
    data=[
        `${class_type}`,
    ]
    con.query(CLASS_ADD,data,(err,result)=>{
        if(err){
            console.log(err.message);
            con.destroy()
            return false
        }
        res.send(result);
        con.destroy()
        return true
    })

})
router.post("/CLASS_HAVE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var class_type=req.body.class_type;
    data=[
        `${class_type}`,
    ]
    con.query(CLASS_HAVE,data,(err,result)=>{
        if(err){
            console.log(err.message);
            con.destroy()
            return false
        }
        res.send(result);
        con.destroy()
        return true
    })

})
router.post("/DELETE_CLASS",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var class_type=req.body.class_type;
    data=[
        `${class_type}`,
    ]
    con.query(DELETE_CLASS,data,(err,result)=>{
        if(err){
            console.log(err.message);
            con.destroy()
            return false
        }
        res.send(result);
        con.destroy()
        return true
    })

})

module.exports=router;