//模版导入
const express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { send } = require('process');
 //编码设置
 var key=parseInt(Math.floor(Math.random()*100),16);
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
const  TEACHER_HAVE="select * from teacher;"
const  TEACHER_ADD="insert into student_control_system.teacher(teacher_id,teacher_name,teacher_password,type) values(?,?,?,2);";
const  TEACHER_DELETE="delete from teacher where teacher_id=?;"
const  TEACHER_ALTER_NAME="update student_control_system.teacher set teacher_name=? where teacher_id=?;"
const  TEACHER_ALTER_PASSWORD="update student_control_system.teacher set teacher_password=? where teacher_id=?;"
const  TEACHER_ALTER_TEACHER_CLASS="update student_control_system.teacher_class set class_id=(select class_id from class where class_type=?) where teacher_id=? and class_id=(select class_id from class where class_type=?)"
const  TEACHER_CLASS_HAVE="select * from (select teacher_id,class_type from teacher_class tc left join class c on tc.class_id=c.class_id) tcc left join teacher t on tcc.teacher_id=t.teacher_id;"
const  TEACHER_CLASS_APPROVE="select (select (exists(select * from (select teacher_id,class_type from teacher_class tc left join class c on tc.class_id=c.class_id where class_type=?) tcc left join teacher t on tcc.teacher_id=t.teacher_id where t.teacher_id=?))) 'key'"
const  TEACHER_CLASS_CLASS_USED="select (select(exists(select * from student_control_system.teacher_class where class_id=(select class_id from class where class_type=?)))) 'key';"
const  TEACHER_CLASS_INSERT="insert into teacher_class(teacher_id,class_id) values(?,(select class_id from class where class_type=?));"
const  TEACHER_CLASS_DELETE="delete from teacher_class where teacher_id=? and class_id=(select class_id from class where class_type=?);"
const  SCORE_HAVE="select score,teacher_name,student_name,student_id from student_information";
const  SCORE_HAVE_INCLUDE_CLASS="select score,teacher_name,student_name,student_id,class_type from student_information";
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
    var data=[
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
            return newdata+"---"+key;
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
        `${student_new_class}`,
        `${student_id}`,
        `${student_old_class}`,

    ]
    /**学生姓名修改
     *  @returns bool 是否登录成功
     */
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
    var data=[
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
router.post("/TEACHER_HAVE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    con.query(TEACHER_HAVE,(err,result)=>{
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
router.post("/TEACHER_ADD",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var teacher_id=req.body.teacher_id;
    var teacher_name=req.body.teacher_name;
    var teacher_password=req.body.teacher_password;
    var data=[
        `${teacher_id}`,
        `${teacher_name}`,
        `${teacher_password}`,
    ]
    con.query(TEACHER_ADD,data,(err,result)=>{
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
router.post("/TEACHER_DELETE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var teacher_id=req.body.teacher_id;
    var data=[
        `${teacher_id}`,
    ]
    con.query(TEACHER_DELETE,data,(err,result)=>{
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
router.post("/TEACHER_ALTER_NAME",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var teacher_id=req.body.teacher_id;
    var teacher_name=req.body.teacher_name;
    var data=[
        `${teacher_name}`,
        `${teacher_id}`,
    ]
    con.query(TEACHER_ALTER_NAME,data,(err,result)=>{
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
router.post("/TEACHER_ALTER_PASSWORD",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var teacher_id=req.body.teacher_id;
    var teacher_password=req.body.teacher_password;
    var data=[
        `${teacher_password}`,
        `${teacher_id}`,
    ]
    con.query(TEACHER_ALTER_PASSWORD,data,(err,result)=>{
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
router.post("/TEACHER_ALTER_TEACHER_CLASS",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var teacher_old_class=req.body.teacher_old_class;
    var teacher_id=req.body.teacher_id;
    var teacher_new_class=req.body.teacher_new_class;
    var data=[
        `${teacher_new_class}`,
        `${teacher_id}`,
        `${teacher_old_class}`
    ]
    con.query(TEACHER_ALTER_TEACHER_CLASS,data,(err,result)=>{
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
router.post("/TEACHER_CLASS_HAVE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    con.query(TEACHER_CLASS_HAVE,(err,result)=>{
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
router.post("/TEACHER_CLASS_APPROVE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var class_type=req.body.class_type;
    var teacher_id=req.body.teacher_id;
    var data=[
        `${class_type}`,
        `${teacher_id}`
    ]
    con.query(TEACHER_CLASS_APPROVE,data,(err,result)=>{
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
router.post("/TEACHER_CLASS_CLASS_USED",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var class_type=req.body.class_type;
    var data=[
        `${class_type}`,
    ]
    console.log(data);
    con.query(TEACHER_CLASS_CLASS_USED,data,(err,result)=>{
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
router.post("/TEACHER_CLASS_INSERT",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var class_type=req.body.class_type;
    var teacher_id=req.body.teacher_id;
    var data=[
        `${teacher_id}`,
        `${class_type}`,
    ]
    console.log(data);
    con.query(TEACHER_CLASS_INSERT,data,(err,result)=>{
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
router.post("/TEACHER_CLASS_DELETE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    var class_type=req.body.class_type;
    var teacher_id=req.body.teacher_id;
    var data=[
        `${teacher_id}`,
        `${class_type}`,
    ]
    con.query(TEACHER_CLASS_DELETE,data,(err,result)=>{
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
router.post("/life",(req,res)=>{
    fs.readFile('com\\view\\life-expectancy-table.json.js', function (err, data) {
      if (err) return console.error(err);
      res.send(data);
    });
})
router.post("/SCORE_HAVE",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    con.query(SCORE_HAVE,(err,result)=>{
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
router.post("/SCORE_HAVE_INCLUDE_CLASS",(req,res)=>{
    var con=mysql.createConnection(mysqlLoginDate);
    con.query(SCORE_HAVE_INCLUDE_CLASS,(err,result)=>{
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