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
$("#MANAGER_SELECT_STUDENT_NORMAL_INFORMATION button").click(function (e) { 
    var input=$("#INPUT_STUDENT_INSERT_ID");
    var data="student_id="+input.val();
    $.ajax({
      type: "post",
      url: TEACHER_URL_HOST_PORT+"/TEACHER_SELECT_STUDENT_NORMAL_INFORMATION",
      data: data,
      success: function (response) {
        var tbody=$(".information-p2-table1-tbody");
        console.log(tbody);
        var html=template("p2-table1",response[0]);
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