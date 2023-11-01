//全局配置
var TEACHER_URL_HOST_PORT="http://127.0.0.1:3000" //设置老师的通信协议、地址、端口


var TEACHER_SELECT_STUDENT_TABLE1=null;   //防抖:学生成绩柱状图 位置: hide3 panle1 
var TEACHER_SELECT_STUDENT_TABLE2=null;   //防抖:学生成绩雷达图 位置: hide3 panle1

$(".TEACHER_SELECT_STUDENT").submit(function (e) { 
// echerts
    //获得echerts对象学生成绩柱状图,没有则初始化,有则不初始化
        
        var myChart1= echarts.getInstanceByDom(document.querySelector(".student_select_echarts_p1_1")); //有的话就获取已有echarts实例的DOM节点。
        if(myChart1==null){
            TEACHER_SELECT_STUDENT_TABLE1=echarts.init(document.querySelector(".student_select_echarts_p1_1"));
        }

    //学生成绩柱状图的基本配置初始化
        
        var TEACHER_SELECT_STUDENT_OPTION_TABLE1={
            title: {
                text: '学生各科成绩图'
                },
            tooltip: {
                    trigger: 'axis',
            },
            grid: {
                right: '10%'
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: []
                },
            xAxis: {
                data: []
                },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'score',
                    type: 'bar',
                    data: []
                }
                ]
        };

    //获得echerts对象获得学生成绩雷达图,没有则初始化,有则不初始化

        var myChart2= echarts.getInstanceByDom(document.querySelector(".student_select_echarts_p1_2")); //有的话就获取已有echarts实例的DOM节点。
        if(myChart2==null){
            TEACHER_SELECT_STUDENT_TABLE2=echarts.init(document.querySelector(".student_select_echarts_p1_2"));
        }

    //学生成绩雷达图的基本配置初始化

        var TEACHER_SELECT_STUDENT_OPTION_TABLE2={
            title: {
              text: '成绩分析'
            },
            legend: {
              data: ['第一次成绩'],
              left: 'right'  
            },
            radar: {
              // shape: 'circle',
              indicator: [
              ]
            },
            series: [
              {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                  {
                    value: [],
                    name: '第一次成绩'
                  }
                ]
              }
            ]
          };

    //获得ajax基本数据配置
    var data=$(e.target).serialize();
    e.preventDefault();
    //发送ajax请求
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT",
        data: data,
        success: function (data) {
                //学生成绩雷达图的基本配置填入数据
                for(var i=0;i<data.length;i++){
                    var namei=`{"name": "${data[i].class_type}","max": 100}`;
                    TEACHER_SELECT_STUDENT_OPTION_TABLE1.xAxis.data.push(data[i].class_type);
                    TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[0].data.push(data[i].score);
                    TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data[0].value.push(data[i].score);
                    TEACHER_SELECT_STUDENT_OPTION_TABLE2.radar.indicator.push(JSON.parse(namei));
                }
                if(data.length==0){
                    TEACHER_SELECT_STUDENT_TABLE2.clear();
                }else{
                    TEACHER_SELECT_STUDENT_TABLE2.setOption(TEACHER_SELECT_STUDENT_OPTION_TABLE2);
                }
                TEACHER_SELECT_STUDENT_TABLE1.setOption(TEACHER_SELECT_STUDENT_OPTION_TABLE1);

                //table
                var items="";
                for(var i=0;i<data.length;i++){
                var item=template("student_information_item_template",data[i]);
                items=items+item;
                }
                $("#student_information_item").html(items);
        },
        error : function(jqXHR, textStatus, errorThrown){
            console.log(errorThrown.message);
            TEACHER_SELECT_STUDENT_OPTION_TABLE1.xAxis.data=[];
            TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[0].data=[];
            TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data[0].value=[];
            TEACHER_SELECT_STUDENT_OPTION_TABLE2.radar.indicator=[];
        }
         
    });
});
$(".SQL_USER_LOGIN").submit(function (e) { 
    //获得ajax基本数据配置
    var data=$(e.target).serialize();
    e.preventDefault();
    $.ajax({
        type: "get",
        url: TEACHER_URL_HOST_PORT+"/SQL_USER_LOGIN",
        data: data,
        success: function (data) {
            if(data[0].type==2){
                $(".teacher_login_box").hide();
                $(".open_teacher_priv").show();
            }
        }
    });
});
var timeStudentExists=null;
$(".STUDENT_EXISTS input").on("keyup", function (e) {
    clearTimeout(timeStudentExists);
    timeStudentExists=setTimeout(function(){
        var student_id=$(e.target).val();
        var data=`student_id=${student_id}`;
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/STUDENT_EXISTS",
            data: data,
            success: function (response) {
            var li=$(e.target).parent().parent().parent();
            var value=response[0]['key'];
                if(value){
                    $($(e.target).prev().prev()).css("background","green").text("pass");
                    var fadein=".panel"+li.attr("index");
                    if(fadein==".panel2"){
                        $(fadein).children(".input-group-submit").children("button").prop("disabled","false");
                    }else{
                        $(fadein).children(".input-group-submit").children("button").prop("disabled","");
                    }
                }else{
                    $($(e.target).prev().prev()).css("background","red").text("danger");
                    var fadeout=".panel"+li.attr("index");
                    if(fadeout==".panel2"){
                        $(fadeout).children(".input-group-submit").children("button").prop("disabled","");
                    }else{
                        $(fadeout).children(".input-group-submit").children("button").prop("disabled","false");
                    }
                   
                }
            }
            
        });
    },1000)
    
});

$(".STUDENT_EXISTS").submit(function (e) { 
    var data=$(e.target).serialize();
    e.preventDefault();
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_EXISTS",
        data: data,
        success: function (response) {
           var value=response[0]['key'];
            if(value){
                $($($(e.target).children()[0]).children()[0]).css("background","green").text("pass");
                
            }else{
                $($($(e.target).children()[0]).children()[0]).css("background","red").text("danger");
            }

        }
        
    });
});
$(".TEACHER_SELECT_STUDENT_NORMAL_INFORMATION button").click(function (e) { 
    var input=$(e.target).parent().prev().children("input");
    var data="student_id="+input.val();
    $.ajax({
      type: "post",
      url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT_NORMAL_INFORMATION",
      data: data,
      success: function (response) {
        var index=$(e.target).parent().parent().parent().attr("index")
        var table=".panel"+index;
        var tbody=$(table).children("table").children("#student_information_item");
        var html=template("student_information_normal_template",response[0]);
        tbody.html(html);

      }
    });
    e.preventDefault();
    
  });
  $("#STUDENT_INSERT").click(function (e) { 
    var student_id=$("#INPUT_STUDENT_INSERT_ID").val();
    var student_name=$("#INPUT_STUDENT_INSERT_NAME").val();
    var student_password=$("#INPUT_STUDENT_INSERT_PASSWORD").val();
    data={
        student_id:`${student_id}`,
        student_name:`${student_name}`,
        student_password:`${student_password}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_INSERT",
        data: data,
        success: function (response) {
  
        }
      });
    e.preventDefault();
    
  });
  $("#STUDENT_DELETE").click(function (e) { 
    var student_id=$("#INPUT_STUDENT_DELETE_ID").val();
    data="student_id="+`${student_id}`,
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_DELETE",
        data: data,
        success: function (response) {
            console.log(response);
        }
      });
    e.preventDefault();
    
  });
  $("#STUDENT_ALTER_PASS").click(function (e) { 
    var student_id=$("#INPUT_STUDENT_ALTER_ID").val();
    var student_password=$("#INPUT_STUDENT_ALTER_PASS_PASSWORD").val();
    data={
        student_password:`${student_password}`,
        student_id:`${student_id}`
       
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_ALTER_PASS",
        data: data,
        success: function (response) {
            console.log(response);
        }
      });
    e.preventDefault();
    
  });
  $("#STUDENT_ALTER_S_NAME").click(function (e) { 
    var student_name=$("#INPUT_STUDENT_ALTER_S_NAME_NAME").val();
    var student_id=$("#INPUT_STUDENT_ALTER_ID").val();
    data={
        student_name:`${student_name}`,
        student_id:`${student_id}`
       
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_ALTER_S_NAME",
        data: data,
        success: function (response) {
            console.log(response);
        }
      });
    e.preventDefault();
 });
 $(".TEACHER_SELECT_STUDENT_BIG_INFORMATION button").click(function (e) { 
    var input=$(e.target).parent().prev().children("input");
    var data="student_id="+input.val();
    $.ajax({
      type: "post",
      url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT",
      data: data,
      success: function (response) {
        var index=$(e.target).parent().parent().parent().attr("index")
        var table=".panel"+index;
        var tbody=$(table).children("table").children("#student_information_item");
        var htmls="";
        for(var i=0;i<response.length;i++){
            var html=template("student_information_big_template",response[i]);
            htmls=html+htmls;
        }
        tbody.html(htmls);

      }
    });
    e.preventDefault();
    
  });
  $("#STUDENT_ALTER_CLASS").click(function (e) { 
    var student_old_class=$("#INPUT_STUDENT_ALTER_CLASS_OLD_CLASS").val();
    var student_id=$("#INPUT_STUDENT_ALTER_ID").val();
    var student_new_class=$("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").val();

    data={
        student_old_class:`${student_old_class}`,
        student_id:`${student_id}`,
        student_new_class:`${student_new_class}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_ALTER_CLASS",
        data: data,
        success: function (response) {
            console.log(response);
        }
      });
    e.preventDefault();
 });
 var timeClassExists=null;
 $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").on("keyup", function () {
    clearTimeout(timeClassExists);
    timeClassExists=setTimeout(() => {
        var class_type=$("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").val();
        data={
            class_type:`${class_type}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/CLASS_EXISTS",
            data: data,
            success: function (response) {
                var flag=response[0]["key"];
                if(flag){
                    $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").prev().prev().text("pass").css("background","green");
                }else{
                    $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").prev().prev().text("danger").css("background","red")
                }
            }
        });
    }, 1000);
 });
 $("#STUDENT_ALTER_SCORE").click(function (e) {
    var student_id=$("#INPUT_STUDENT_ALTER_ID").val();
    var class_type=$("#INPUT_STUDENT_ALTER_SCORE_CLASS_TYPE").val();
    var score=$("#INPUT_STUDENT_ALTER_SCORE_SCORE").val();
    data={
        student_id:`${student_id}`,
        class_type:`${class_type}`,
        score:`${score}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_ALTER_SCORE",
        data: data,
        success: function (response) {
            console.log(response);
        }
    });
    e.preventDefault();
 });
 $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS,#INPUT_STUDENT_ALTER_SCORE_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(timeClassExists);
    timeClassExists=setTimeout(() => {
        var class_type=$(e.target).val();
        data={
            class_type:`${class_type}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/CLASS_EXISTS",
            data: data,
            success: function (response) {
                var flag=response[0]["key"];
                if(flag){
                    $(e.target).prev().prev().text("pass").css("background","green");
                }else{
                    $(e.target).prev().prev().text("danger").css("background","red")
                }
            }
        });
    }, 1000);
 });
 var timeTeacherExists=null;
$("#INPUT_TEACHER_EXISTS_ID").on("keyup", function (e) {
    clearTimeout(timeTeacherExists);
    var timeTeacherExists=setTimeout(() => {
        var search=$(e.target);
        var teacher_id=search.val();
        data={
            teacher_id:`${teacher_id}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/TEACHER_EXISTS",
            data: data,
            success: function (response) {
                var flag=response[0]["key"];
                if(flag){
                    search.prev().prev().text("pass").css("background","green");
                }else{
                    search.prev().prev().text("danger").css("background","red")
                }
            }
        });
    }, 1000);
});

/* 
    bootstrap-table:
        使用的位置:
            1、老师查询自己的学生。
*/
var TEACHER_HAVE_STUDENT_OPTION_TABLE1=null;
var TEACHER_HAVE_STUDENT_OPTION_TABLE2=null;
$(".TEACHER_HAVE_STUDENT button").on("click", function (e) {
    var myChart1= echarts.getInstanceByDom(document.querySelector(".student_select_echarts_p5_1"));    //有的话就获取已有echarts实例的DOM节点。
    if(myChart1==null){
        TEACHER_HAVE_STUDENT_TABLE1=echarts.init(document.querySelector(".student_select_echarts_p5_1"));
    }
        var TEACHER_HAVE_STUDENT_OPTION_TABLE1={
            title: {
                text: '成绩图'
                },
            tooltip: {
                    trigger: 'axis',
            },
            grid: {
                right: '10%'
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ["学生个数柱状","学生个数折线"]
                },
            xAxis: {
                data: ["[0-10)","[10-20)","[20-30)","[30-40)","[40-50)","[50-60)","[60-70)","[70-80)","[80,90)","[90,100]"]
                },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '学生个数柱状',
                    type: 'bar',
                    data: []
                },
                {
                    name:"学生个数折线",
                    type: 'line',
                    data:[]
                }
                ]
    };
    var myChart2= echarts.getInstanceByDom(document.querySelector(".student_select_echarts_p5_2"));    //有的话就获取已有echarts实例的DOM节点。
    if(myChart2==null){
         TEACHER_HAVE_STUDENT_TABLE2=echarts.init(document.querySelector(".student_select_echarts_p5_2"));
    }
    var TEACHER_HAVE_STUDENT_OPTION_TABLE2=option = {
        title: {
          text: '学生成绩饼状图',
          subtext: '成绩划分',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: '等级',
            type: 'pie',
            radius: '50%',
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    var teacher_id=$("#INPUT_TEACHER_EXISTS_ID").val();
    data={
        teacher_id:`${teacher_id}`
    }
    $("#tablePage").bootstrapTable("destroy");
    $("#tablePage").bootstrapTable({
        url: TEACHER_URL_HOST_PORT+"/TEACHER_HAVE_STUDENT",         //请求后台的URL（*）
        method:'post',
        queryParams:data,
        striped: true,                      //是否显示行间隔色
        cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "sever",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true,                  //是否显示所有的列
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        height: 500,                        //行高
        idField: "student_id",               //指定主键
        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        datatype: "json",
        undefinedText: "*",
        locale:'zh-CN',                     //中文支持
        columns: [{
            field: 'student_id',
            title: '学生学号',
            sortable: true
        }, {
            field: 'student_name',
            title: '学生姓名'
        }, {
            field: 'student_password',
            title: '学生密码'
        }, {
            field: 'teacher_name',
            title: '老师姓名'
        },{
            field: 'class_type',
            title: '学生科目 '
        },{
            field: 'score',
            title: '学生成绩 ',
            sortable: true  
        }],
        
        responseHandler: function(res){
             //echarts
            var score_u1=0;
            var score_u2=0;
            var score_s=0;
            var score_k=0;
            var counts=[0,0,0,0,0,0,0,0,0,0];
            for(var i=0;i<res.length;i++){
                var score=res[i].score;
                score_u1+=score;
                score_u2+=Math.pow(score,2);
                if(0<=score&&score<10){
                    counts[0]+=1;
                }
                else if (10<=score&&score<20){
                    counts[1]+=1;
                }
                else if (20<=score&&score<30){
                    counts[2]+=1;
                }
                else if (30<=score&&score<40){
                    counts[3]+=1;
                 }
                else if (40<=score&&score<50){
                    counts[4]+=1;
                }
                else if (50<=score&&score<60){
                    counts[5]+=1;
                }
                else if (60<=score&&score<70){
                    counts[6]+=1;
                }
                else if (70<=score&&score<80){
                    counts[7]+=1;
                }
                else if (80<=score&&score<90){
                    counts[8]+=1;
                }
                else{
                    counts[9]+=1;
                }
            }

            score_u1=(Math.floor((score_u1/res.length)*100))/100;
            score_u2=Math.floor((score_u2/res.length-Math.pow(score_u1,2))*100)/100;
            for(var i=0;i<res.length;i++){
                var score=res[i].score;
                score_s+=Math.pow(score-score_u1,3);
                score_k+=Math.pow(score-score_u1,4);
            }
            console.log(score_s);
            console.log(score_k);
            score_s=Math.floor(((score_s/res.length)/Math.pow(score_u2,3/2))*100)/100;
            score_k=Math.floor(((score_k/res.length)/Math.pow(score_u2,2))*100-3)/100;
            $("#score_u1").text(score_u1);
            $("#score_u2").text(score_u2);
            $("#score_s").text(score_s);
            $("#score_k").text(score_k);
            var length=counts.length;
            for(var i=0;i<length;i++){
                if(counts[i]!=0){
                    counts.splice(0,i);
                    TEACHER_HAVE_STUDENT_OPTION_TABLE1.xAxis.data.splice(0,i);
                    TEACHER_HAVE_STUDENT_OPTION_TABLE1.series[0].data=counts;
                    TEACHER_HAVE_STUDENT_OPTION_TABLE1.series[1].data=counts;
                    var temp=counts.slice(0);
                    for(var j=i;j<length;j++){
                        if(j>=5){
                            var zhushi="";
                            if(j==5){
                                zhushi="0"+"~"+(10*(i+(j-i)+1)).toString()
                            }else{
                                zhushi=(10*(i+(j-i))).toString()+"~"+(10*(i+(j-i)+1)).toString()
                            }
                            var denji=String.fromCharCode(74-i-(j-i));
                            var data=`{
                                "value":${temp[j-i]},
                                "name":"${denji}:${zhushi}"
                            }`
                            TEACHER_HAVE_STUDENT_OPTION_TABLE2.series[0].data.push(
                                JSON.parse(data)
                            )
                        }else{
                            temp[j-i+1]+=temp[j-i]
                        }
                    }
                    break
                }
            }
            TEACHER_HAVE_STUDENT_TABLE1.setOption(TEACHER_HAVE_STUDENT_OPTION_TABLE1);
            TEACHER_HAVE_STUDENT_TABLE2.setOption(TEACHER_HAVE_STUDENT_OPTION_TABLE2);




            //bootstrap-table
            $("#tablePage").bootstrapTable('load',res);
            return {
                "total": res.total,
                "rows": res.rows
            };
        },
        onLoadError: function (err) {
            console.log("数据加载失败！"+err.message)
        }
        
    });
    e.preventDefault();
});
var teacherApprove=null;
$("#INPUT_TEACHER_EXISTS_ID_PAS_ID,#INPUT_TEACHER_EXISTS_ID_PAS_PAS").on("keyup", function (e) {
    clearTimeout(teacherApprove);
    var teacherApprove=setTimeout(() => {
        var search=$("#INPUT_TEACHER_EXISTS_ID_PAS_ID");
        var teacher_id=search.val();
        var teacher_password=$("#INPUT_TEACHER_EXISTS_ID_PAS_PAS").val();
        data={
            teacher_id:`${teacher_id}`,
            teacher_password:`${teacher_password}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/TEACHER_APPROVE",
            data: data,
            success: function (response) {
                var flag=response[0]["key"];
                if(flag){
                    search.prev().prev().text("pass").css("background","green");
                }else{
                    search.prev().prev().text("danger").css("background","red")
                }
            }
        });
    }, 1000);
});
$(".TEACHER_ADD_STUDENT_SCORE").click(function (e) {
    var teacher_id=$("#INPUT_TEACHER_EXISTS_ID_PAS_ID").val();
    var teacher_password=$("#INPUT_TEACHER_EXISTS_ID_PAS_PAS").val();
    data={
        teacher_id:`${teacher_id}`,
        teacher_password:`${teacher_password}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/TEACHER_APPROVE",
        data: data,
        success: function (response) {
            var flag=response[0]["key"];
            if(flag){
                $("#ADD_SCORE").css("display","inline-block");
            }else{
                $("#ADD_SCORE").css("display","none");
            }
        }
    });
    e.preventDefault();
 });
 var STUDENT_SCORE_ADD_ABLE=null;
 $(".studentScoreAdd").on("keyup",function (e) {
    clearTimeout(STUDENT_SCORE_ADD_ABLE);
    STUDENT_SCORE_ADD_ABLE=setTimeout(()=>{
        var search=$("#INPUT_ADD_SCORE_ID");
        var student_id=$("#INPUT_ADD_SCORE_ID").val();
        var class_type=$("#INPUT_ADD_SCORE_CLASS_TYPE").val();
        var score=$("#INPUT_ADD_SCORE_SCORE");
        data={
            student_id:`${student_id}`,
            class_type:`${class_type}`,
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/SCORE_ADD_ABLE",
            data: data,
            success: function (response) {
                var flag=response[0]["key"];
                var disable=search.next().text();
                if(flag){
                    search.prev().prev().text("YES").css("background","red");
                    if(disable=="NO"){
                        score.prop("disabled","false");
                        $("#ADD_SCORE").prop("disabled","false");
                    }
                }else{
                    search.prev().prev().text("NO").css("background","green")
                    if(disable=="YES"){
                        score.prop("disabled","");
                        $("#ADD_SCORE").prop("disabled","");
                    }
                    else if(disable=="NO"){
                        score.prop("disabled","false");
                        $("#ADD_SCORE").prop("disabled","false");
                    }
                }
            }
        });
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT",
            data: data,
            success: function (data) {
                var items="";
                for(var i=0;i<data.length;i++){
                var item=template("student_information_item_template",data[i]);
                items=items+item;
                }
                $("#student_information_item_p6_1").html(items);
            }
        });
    },1000)
    e.preventDefault();
 });
 var STUDENT_SCORE_ADD_CLASS_EXISTS=null;
$("#INPUT_ADD_SCORE_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(STUDENT_SCORE_ADD_CLASS_EXISTS);
    STUDENT_SCORE_ADD_CLASS_EXISTS=setTimeout(()=>{
        var search=$(e.target);
        var class_type=search.val();
        var score=$("#INPUT_ADD_SCORE_SCORE");
        var data={
            class_type:`${class_type}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/CLASS_EXISTS",
            data: data,
            success: function (response) {
                var flag=response[0]["key"];
                if(flag){
                    search.prev().prev().text("YES").css("background","red");
                    score.prop("disabled","false");
                }else{
                    search.prev().prev().text("NO").css("background","green")
                    score.prop("disabled","");
                }
            }
        });
    })
});

 $("#ADD_SCORE").click(function (e) {
    var student_id=$("#INPUT_ADD_SCORE_ID").val();
    var class_type=$("#INPUT_ADD_SCORE_CLASS_TYPE").val();
    var score=$("#INPUT_ADD_SCORE_SCORE").val();
    data={
        student_id:`${student_id}`,
        class_type:`${class_type}`,
        score:`${score}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/SCORE_ADD",
        data: data,
        success: function (response) {
            if(response){
                $.ajax({
                    type: "post",
                    url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT",
                    data: data,
                    success: function (data) {
                        var items="";
                        for(var i=0;i<data.length;i++){
                        var item=template("student_information_item_template",data[i]);
                        items=items+item;
                        }
                        $("#student_information_item_p6_1").html(items);
                    }
                });
            }
        }
    });
    e.preventDefault();
 });

 

