//全局配置
var STUDENT_URL_HOST_PORT="http://127.0.0.1:3000"; //设置学生的通信协议、地址、端口


var STUDENT_SELECT_TABLE1=null;
var STUDENT_SELECT_TABLE2=null;
$(".studentSelect").submit(function (e) { 
    var myChart1= echarts.getInstanceByDom(document.querySelector(".student_select_echarts_p1_1")); //有的话就获取已有echarts实例的DOM节点。
        if(myChart1==null){
            STUDENT_SELECT_TABLE1=echarts.init(document.querySelector(".student_select_echarts_p1_1"));
        }
        var STUDENT_SELECT_OPTION_TABLE1={
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
        var myChart2= echarts.getInstanceByDom(document.querySelector(".student_select_echarts_p1_2")); //有的话就获取已有echarts实例的DOM节点。
        if(myChart2==null){
            STUDENT_SELECT_TABLE2=echarts.init(document.querySelector(".student_select_echarts_p1_2"));
        }
        var  STUDENT_SELECT_OPTION_TABLE2={
            title: {
              text: '成绩分析'
            },
            legend: {
              data: [],
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
                  // {
                  //   value: [],
                  //   name: '第一次成绩'
                  // }
                ]
              }
            ]
          };




    var data=$(e.target).serialize();
    $.ajax({
        type: "post",
        url: STUDENT_URL_HOST_PORT+"/STUDENT_SELECT",
        data: data,
        success: function (data) {
            
              //echarts
              // for(var i=0;i<data.length;i++){
              //     var namei=`{"name": "${data[i].class_type}","max": 100}`;
              //       STUDENT_SELECT_OPTION_TABLE1.xAxis.data.push(data[i].class_type);
              //       STUDENT_SELECT_OPTION_TABLE1.series[0].data.push(data[i].score);
              //       STUDENT_SELECT_OPTION_TABLE2.series[0].data[0].value.push(data[i].score);
              //       STUDENT_SELECT_OPTION_TABLE2.radar.indicator.push(JSON.parse(namei));
              // }
            var map1=new Map();
            var map2=new Map();
            var length=0;
            for (var i = 0; i < data.length; i++) {
                if(!map2.has(data[i].class_type.split("(")[0])){
                    map2.set(data[i].class_type.split("(")[0],length);
                    var namei = `{"name": "${data[i].class_type.split("(")[0]}","max": 100}`;
                    STUDENT_SELECT_OPTION_TABLE2.radar.indicator.push(JSON.parse(namei));
                    STUDENT_SELECT_OPTION_TABLE1.xAxis.data.push(data[i].class_type.split("(")[0]);
                    length++;
                }
            }
            for (var i = 0; i < data.length; i++) {
                var namei = `{"name": "${data[i].class_type.split("(")[0]}","max": 100}`;
                var Reg=/\(.+\)/
                var class_count=data[i].class_type.match(Reg)[0];
                if(!map1.has(class_count)){
                    var arr=[]
                    for(var j=0;j<length;j++){
                        arr.push(0);
                    }
                    arr[map2.get(data[i].class_type.split("(")[0])]=data[i].score;
                    map1.set(class_count,arr);
                }else{
                    map1.get(class_count)[map2.get(data[i].class_type.split("(")[0])]=data[i].score;
                }
                STUDENT_SELECT_OPTION_TABLE1.series[0].data.push(data[i].score);
            }
            var i=0;
            map1.forEach((value,name)=>{
                // console.log(value);
                STUDENT_SELECT_OPTION_TABLE2.series[0].data.push({value:[],name:""})
                STUDENT_SELECT_OPTION_TABLE1.series.push({ name:" ",type: 'bar',data: []})
                STUDENT_SELECT_OPTION_TABLE1.series[i].data=value;
                STUDENT_SELECT_OPTION_TABLE2.series[0].data[i].value=value;
                STUDENT_SELECT_OPTION_TABLE2.series[0].data[i].name=name;
                STUDENT_SELECT_OPTION_TABLE1.series[i].name=name;
                STUDENT_SELECT_OPTION_TABLE2.legend.data.push(name);
                STUDENT_SELECT_OPTION_TABLE1.legend.data.push(name);
                i++;
            })
              STUDENT_SELECT_TABLE1.setOption(STUDENT_SELECT_OPTION_TABLE1);
              if(data.length>0){
                STUDENT_SELECT_TABLE2.setOption(STUDENT_SELECT_OPTION_TABLE2);
              }else{
                STUDENT_SELECT_TABLE2.clear();
              }
              var items="";
              for(var i=0;i<data.length;i++){
                var item=template("student_information_item_template",data[i]);
        
                items=items+item;
              }
            
              $("#student_information_item").html(items);

        }
    });
    e.preventDefault();
});