var TEACHER_URL_HOST_PORT="http://127.0.0.1:3000" //设置老师的通信协议、地址、端口

var TEACHER_SELECT_STUDENT_TABLE1=null;   //防抖:学生成绩柱状图 位置: hide3 panle1 
var TEACHER_SELECT_STUDENT_TABLE2=null;   //防抖:学生成绩雷达图 位置: hide3 panle1

$(".MANAGER_SELECT_STUDENT").submit(function (e) { 
// echerts
    //获得echerts对象学生成绩柱状图,没有则初始化,有则不初始化
        
        var myChart1= echarts.getInstanceByDom(document.querySelector("#echarts-p1-1")); //有的话就获取已有echarts实例的DOM节点。
        if(myChart1==null){
            TEACHER_SELECT_STUDENT_TABLE1=echarts.init(document.querySelector("#echarts-p1-1"));
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

        var myChart2= echarts.getInstanceByDom(document.querySelector("#echarts-p1-2")); //有的话就获取已有echarts实例的DOM节点。
        if(myChart2==null){
            TEACHER_SELECT_STUDENT_TABLE2=echarts.init(document.querySelector("#echarts-p1-2"));
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
                var item=template("p1-table1",data[i]);
                items=items+item;
                }
                $(".information-p1-table1-tbody").html(items);
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
$("#MANAGER_SELECT_STUDENT_NORMAL_INFORMATION_1 button").click(function (e) { 
    var input=$("#INPUT_STUDENT_INSERT_ID");
    var data="student_id="+input.val();
    $.ajax({
      type: "post",
      url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT_NORMAL_INFORMATION",
      data: data,
      success: function (response) {
        var tbody=$(".information-p2-table1-tbody");
        var html=template("p2-table1",response[0]);
        tbody.html(html);

      }
    });
    e.preventDefault();
    
  });
  $("#MANAGER_SELECT_STUDENT_NORMAL_INFORMATION_2 button").click(function (e) { 
    var input=$("#INPUT_STUDENT_DELETE_ID");
    var data="student_id="+input.val();
    $.ajax({
      type: "post",
      url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT_NORMAL_INFORMATION",
      data: data,
      success: function (response) {
        var tbody=$(".information-p3-table1-tbody");
        var html=template("p3-table1",response[0]);
        tbody.html(html);

      }
    });
    e.preventDefault();
    
  });
  $("#STUDENT_INSERT").click(function (e) { 
    var student_id=$("#INPUT_STUDENT_INSERT_ID").val();
    var student_name=$("#INPUT_STUDENT_INSERT_NAME").val();
    var student_password=$("#INPUT_STUDENT_INSERT_PASSWORD").val();
    var data={
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
    var data="student_id="+`${student_id}`
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_DELETE",
        data: data,
        success: function (response) {

        }
      });
    e.preventDefault();
    
  });
  $("#STUDENT_ALTER_PASS").click(function (e) { 
    var student_id=$("#INPUT_STUDENT_ALTER_ID").val();
    var student_password=$("#INPUT_STUDENT_ALTER_PASS_PASSWORD").val();
    vardata={
        student_password:`${student_password}`,
        student_id:`${student_id}`
       
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_ALTER_PASS",
        data: data,
        success: function (response) {
        }
      });
    e.preventDefault();
    
  });
  $("#STUDENT_ALTER_S_NAME").click(function (e) { 
    var student_name=$("#INPUT_STUDENT_ALTER_S_NAME_NAME").val();
    var student_id=$("#INPUT_STUDENT_ALTER_ID").val();
    var data={
        student_name:`${student_name}`,
        student_id:`${student_id}`
       
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_ALTER_S_NAME",
        data: data,
        success: function (response) {
        }
      });
    e.preventDefault();
  });
  $("#STUDENT_ALTER_CLASS").click(function (e) { 
    var student_old_class=$("#INPUT_STUDENT_ALTER_CLASS_OLD_CLASS").val();
    var student_id=$("#INPUT_STUDENT_ALTER_ID").val();
    var student_new_class=$("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").val();

    var data={
        student_old_class:`${student_old_class}`,
        student_id:`${student_id}`,
        student_new_class:`${student_new_class}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_ALTER_CLASS",
        data: data,
        success: function (response) {
        }
      });
    e.preventDefault();
  });
  var timeClassExists=null;
  $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").on("keyup", function () {
    clearTimeout(timeClassExists);
    timeClassExists=setTimeout(() => {
        var class_type=$("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").val();
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
    var data={
        student_id:`${student_id}`,
        class_type:`${class_type}`,
        score:`${score}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/STUDENT_ALTER_SCORE",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();
  });
  $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS,#INPUT_STUDENT_ALTER_SCORE_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(timeClassExists);
    timeClassExists=setTimeout(() => {
        var class_type=$(e.target).val();
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
                    $(e.target).prev().prev().text("pass").css("background","green");
                }else{
                    $(e.target).prev().prev().text("danger").css("background","red")
                }
            }
        });
    }, 1000);
 });
 $("#MANAGER_SELECT_STUDENT_BIG_INFORMATION button").click(function (e) { 
    var input=$(e.target).parent().prev().children("input");
    var data="student_id="+input.val();
    $.ajax({
      type: "post",
      url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT",
      data: data,
      success: function (response) {
        var index=$(e.target).parent().parent().parent().attr("index")
        var table=".panel"+index;
        var tbody=$(table).children("table").children(".information-p4-table1-tbody");
        var htmls="";
        for(var i=0;i<response.length;i++){
            var html=template("p4-table1",response[i]);
            htmls=html+htmls;
        }
        tbody.html(htmls);

      }
    });
    e.preventDefault();
    
  });
  var managerApprove=null;
$("#INPUT_MANAGER_EXISTS_ID_PAS_ID,#INPUT_MANAGER_EXISTS_ID_PAS_PAS").on("keyup", function (e) {
    clearTimeout(managerApprove);
    var managerApprove=setTimeout(() => {
        var search=$("#INPUT_MANAGER_EXISTS_ID_PAS_ID");
        var manager_id=search.val();
        var manager_password=$("#INPUT_MANAGER_EXISTS_ID_PAS_PAS").val();
        var data={
            manager_id:`${manager_id}`,
            manager_password:`${manager_password}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT+"/MANAGER_APPROVE",
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
  var STUDENT_SCORE_ADD_ABLE=null;
  $(".STUDENT_SCORE_ADD").on("keyup",function (e) {
     clearTimeout(STUDENT_SCORE_ADD_ABLE);
     STUDENT_SCORE_ADD_ABLE=setTimeout(()=>{
         var search=$("#INPUT_ADD_SCORE_ID");
         var student_id=$("#INPUT_ADD_SCORE_ID").val();
         var class_type=$("#INPUT_ADD_SCORE_CLASS_TYPE").val();
         var score=$("#INPUT_ADD_SCORE_SCORE");
         var data={
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
                 setTimeout(()=>{      //解决异步问题
                     if(flag){
                         search.prev().prev().text("YES").css("background","red");
                         //成绩存在
                         score.prop("disabled","false");
                         $("#ADD_SCORE").prop("disabled","false");
                     }else{
                         search.prev().prev().text("NO").css("background","green")
                         var ADD_SCORE_TABLE_FLAG=$("#information-p5-table1-tbody").children().length;
                         if(disable=="YES"&&ADD_SCORE_TABLE_FLAG>0){
                             //在成绩不存在的前提下,如果科目存在,学生存在
                             score.prop("disabled","");
                             $("#ADD_SCORE").prop("disabled","");
                         }
                         else if(disable=="NO"||ADD_SCORE_TABLE_FLAG==0){
                             //在成绩不存在的前提下,如果科目不存在或者学生不存在
                             score.prop("disabled","false");
                             $("#ADD_SCORE").prop("disabled","false");
                         }
                     }
                 },100);
             }
         });
         $.ajax({
             type: "post",
             url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT",
             data: data,
             success: function (data) {
                 var items="";
                 for(var i=0;i<data.length;i++){
                 var item=template("p5-table1",data[i]);
                 items=items+item;
                 }
                 $("#information-p5-table1-tbody").html(items);
             }
         });
     },1000)
     e.preventDefault();
  });
  $("#MANAGER_ADD_STUDENT_SCORE").click(function (e) {
    var manager_id=$("#INPUT_MANAGER_EXISTS_ID_PAS_ID").val();
    var manager_password=$("#INPUT_MANAGER_EXISTS_ID_PAS_PAS").val();
    var data={
        manager_id:`${manager_id}`,
        manager_password:`${manager_password}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/MANAGER_APPROVE",
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
   var STUDENT_SCORE_ADD_CLASS_EXISTS=null;
$("#INPUT_ADD_SCORE_CLASS_TYPE,#INPUT_ADD_CLASS_TYPE,#INPUT_DELETE_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(STUDENT_SCORE_ADD_CLASS_EXISTS);
    STUDENT_SCORE_ADD_CLASS_EXISTS=setTimeout(()=>{
        var search=$(e.target);
        var class_type=search.val();
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
                }else{
                    search.prev().prev().text("NO").css("background","green");
                }
            }
        });
    })
});
$("#ADD_SCORE").click(function (e) {
    var student_id=$("#INPUT_ADD_SCORE_ID").val();
    var class_type=$("#INPUT_ADD_SCORE_CLASS_TYPE").val();
    var score=$("#INPUT_ADD_SCORE_SCORE").val();
    var data={
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
                        var item=template("p5-table1",data[i]);
                        items=items+item;
                        }
                        $("#information-p5-table1-tbody").html(items);
                    }
                });
            }
        }
    });
    e.preventDefault();
 });
 $("#INPUT_ADD_CLASS_TYPE").on("keyup",function (e) {
    var class_type=$("#INPUT_ADD_CLASS_TYPE").val();
    var data={
        class_type:`${class_type}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/CLASS_EXISTS",
        data: data,
        success: function (response) {
            var flag=response[0]["key"];
            if(flag){
                $("#ADD_CLASS").prop("disabled","false");
            }else{
                $("#ADD_CLASS").prop("disabled","");
            }
        }
    });
    e.preventDefault();
 });
 $(".CLASS_TYPE_EXISTS button").on("click",function (e) {
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/CLASS_HAVE",
        success: function (response) {
            var tbody1=$("#information-p6-table1-tbody");
            var tbody2=$("#information-p7-table1-tbody");
            var htmls="";
            for(var i=0;i<response.length;i++){
                html=template("p6-table1",response[i]);
                htmls+=html;
            }
            tbody1.html(htmls);
            tbody2.html(htmls);
        }
    });
    e.preventDefault();
 });
 $("#ADD_CLASS").on("click",function (e) {
    var class_type=$("#INPUT_ADD_CLASS_TYPE").val();
    var data={
        class_type:`${class_type}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/CLASS_ADD",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();
 });
 $("#DELETE_CLASS").on("click",function (e) {
    var class_type=$("#INPUT_DELETE_CLASS_TYPE").val();
    var data={
        class_type:`${class_type}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/DELETE_CLASS",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();
 });
 $("#INPUT_DELETE_CLASS_TYPE").on("keyup",function (e) {
    var class_type=$("#INPUT_DELETE_CLASS_TYPE").val();
    var data={
        class_type:`${class_type}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/CLASS_EXISTS",
        data: data,
        success: function (response) {
            var flag=response[0]["key"];
            if(flag){
                $("#DELETE_CLASS").prop("disabled","");
            }else{
                $("#DELETE_CLASS").prop("disabled","false");
            }
        }
    });
    e.preventDefault();
 });
 $("#INPUT_ADD_TEACHER_ID").on("keyup",function (e) {
    var teacher_id=$(e.target).val();
    var data={
        teacher_id:`${teacher_id}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/TEACHER_EXISTS",
        data: data,
        success: function (response) {
            var flag=response[0]["key"];
            if(flag){
                $(e.target).prev().prev().text("YES").css("background","red");
                $("#ADD_TEACHER").prop("disabled","false");
            }else{
                $(e.target).prev().prev().text("NO").css("background","green");
                $("#ADD_TEACHER").prop("disabled","");
            }
        }
    });
    e.preventDefault();
 });
 $(".TEACHER_EXISTS button").on("click",function(e){
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/TEACHER_HAVE",
        success: function (response) {
            var tbody1=$("#information-p8-table1-tbody");
            var tbody2=$("#information-p9-table1-tbody");
            var htmls="";
            for(var i=0;i<response.length;i++){
                html=template("p8-table1",response[i]);
                htmls+=html;
            }
            tbody1.html(htmls);
            tbody2.html(htmls);
        }
    });
    e.preventDefault();

 })
 $("#ADD_TEACHER").on("click",function(e){
    var teacher_id=$("#INPUT_ADD_TEACHER_ID").val();
    var teacher_name=$("#INPUT_TEACHER_INSERT_NAME").val();
    var teacher_password=$("#INPUT_TEACHER_INSERT_PASSWORD").val();
    var data={
        teacher_id:`${teacher_id}`,
        teacher_name:`${teacher_name}`,
        teacher_password:`${teacher_password}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/TEACHER_ADD",
        data: data,
        success: function (response) {
            
        }
    });
    e.preventDefault();

 })
$("#DELETE_TEACHER").on("click",function(e){
    var teacher_id=$("#INPUT_DELETE_TEACHER_ID").val();
    var data={
        teacher_id:`${teacher_id}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/TEACHER_DELETE",
        data: data,
        success: function (response) {
            
        }
    });
    e.preventDefault();
})
$("#INPUT_DELETE_TEACHER_ID").on("keyup",function (e) {
    var teacher_id=$(e.target).val();
    var data={
        teacher_id:`${teacher_id}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT+"/TEACHER_EXISTS",
        data: data,
        success: function (response) {
            var flag=response[0]["key"];
            if(flag){
                $(e.target).prev().prev().text("YES").css("background","red");
                $("#DELETE_TEACHER").prop("disabled","");
            }else{
                $(e.target).prev().prev().text("NO").css("background","green");
                $("#DELETE_TEACHER").prop("disabled","false");
            }
        }
    });
    e.preventDefault();
 });