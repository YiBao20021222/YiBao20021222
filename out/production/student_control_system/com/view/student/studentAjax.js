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
            //自创预测算法：
                //团体成长因子：
                var b=[];
                //个人成长因子：
                    var a=[];
                //预测因子：
                    var y=[];
                //团体的均值
                    var arvs=new Map();
                    var barv=[];
                //团体成长因子计算
                $.ajax({  //可能会造成死锁,感觉好像不会因为我看了一些接口好像不会出现死锁问题
                    type: "post",
                    url: STUDENT_URL_HOST_PORT + "/SCORE_HAVE_INCLUDE_CLASS",
                    success: function (res) {
                        var map3=new Map(); //储存科目考试(例如期中,期末)下对应的不同科目的总成绩
                        for(var i=0;i<res.length;i++){
                            var class_type=res[i].class_type;
                            var score=res[i].score;
                            var Reg=/\(.+\)/
                            var class_count=class_type.match(Reg)[0];
                            if(!map3.has(class_count)){
                                var arr=[]
                                for(var i=0;i<length;i++){
                                    arr.push([])
                                }
                                arr[map2.get(class_type.split("(")[0])].push(score);
                                map3.set(class_count,arr)
                            }else{
                                map3.get(class_count)[map2.get(class_type.split("(")[0])].push(score);
                            }
                        }
                        map3.forEach((value,key)=>{
                            // map3.set(key,value/value.length);
                            // console.log(value,key);
                            var arv=[];
                            for(var i=0;i<value.length;i++){
                                var sum=0;
                                for(var j=0;j<value[i].length;j++){
                                    sum+=value[i][j];
                                }
                                arv.push(sum/value[i].length);
                            }
                            arvs.set(key,arv);
                            
                        })
                    
                        var value_prv=[];
                        arvs.forEach((value,key)=>{
                            var arr=[];
                            if(b.length!=0){
                                for(var i=0;i<length;i++){
                                    arr[i]=value[i]-value_prv[i];
                                }
                            }
                            b.push(arr);
                            value_prv=value;
                        })
            
                        for(var i=0;i<length;i++) {
                            barv.push(0)
                        }
                        for(var i=0;i<length;i++){
                            for(var j=1;j<b.length;j++){
                                barv[i]+=b[j][i];
                            }
                            barv[i]=barv[i]/(b.length-1);
                        }
                         //个人成长因子计算
                        var value_prv=[];
                        map1.forEach((value,key)=>{
                            var arr=[];
                            if(map1.length!=0){
                                for(var i=0;i<length;i++){
                                    arr[i]=value[i]-value_prv[i];
                                }
                            }
                            a.push(arr);
                            value_prv=value;
                        })
                        for(var i=0;i<length;i++){
                            y.push(0);
                        }
                        for(var i=1;i<b.length;i++){
                            for(var j=0;j<length;j++){
                                if(b[i][j]==0){
                                    b[i][j]=0.1;
                                }
                                if(a[i]){
                                    var short=barv[j]/b[i][j]*a[i][j]
                                }
                                if(short>=10&&short<20){
                                    short*=0.9
                                }else if(short>=20&&short<30){
                                    short*=0.8
                                }else if(short>=30&&short<40){
                                    short*=0.7
                                }else if(short>=40&&short<50){
                                    short*=0.6
                                }else if(short>=50&&short<60){
                                    short*=0.5
                                }else if(short>=60&&short<70){
                                    short*=0.4
                                }else if(short>=70&&short<80){
                                    short*=0.3
                                }else if(short>=80){
                                    short*=0.01
                                }else if(short<=-10&&short>-20){
                                    short*=0.9
                                }else if(short<=-20&&short>-30){
                                    short*=0.8
                                }else if(short<=-30&&short>-40){
                                    short*=0.7
                                }else if(short<=-40&&short>-50){
                                    short*=0.6
                                }else if(short<=-50&&short>-60){
                                    short*=0.5
                                }else if(short<=-60&&short>-70){
                                    short*=0.4
                                }else if(short<=-70&&short>-80){
                                    short*=0.3
                                }else if(short<=-80){
                                    short*=0.01
                                }
                                y[j]+=short/(b.length-1);
                            }
                        }
                        //setoption
                        var i=0;
                        map1.forEach((value,name)=>{
                            // console.log(value);
                            STUDENT_SELECT_OPTION_TABLE2.series[0].data.push({value:[],name:""})
                            STUDENT_SELECT_OPTION_TABLE1.series.push({ name:" ",type: 'bar',data: []})
                            STUDENT_SELECT_OPTION_TABLE2.series[0].data[i].value=value;
                            STUDENT_SELECT_OPTION_TABLE1.series[i].data=value;
                            STUDENT_SELECT_OPTION_TABLE2.series[0].data[i].name=name;
                            STUDENT_SELECT_OPTION_TABLE1.series[i].name=name;
                            STUDENT_SELECT_OPTION_TABLE2.legend.data.push(name);
                            STUDENT_SELECT_OPTION_TABLE1.legend.data.push(name);
                            i++;
                        })
                        var data= STUDENT_SELECT_OPTION_TABLE1.series[i-1].data;
                        for(var j=0;j<length;j++){
                            y[j]+=data[j];
                            if(y[j]<0){
                                y[j]=0;
                            }else if(y[j]>100){
                                y[j]=100
                            }
                        }
                        STUDENT_SELECT_OPTION_TABLE2.series[0].data.push({value:[],name:""})
                        STUDENT_SELECT_OPTION_TABLE1.series.push({ name:" ",type: 'bar',data: []})
                        STUDENT_SELECT_OPTION_TABLE1.series[i].data=y;
                        STUDENT_SELECT_OPTION_TABLE2.series[0].data[i].value=y;
                        STUDENT_SELECT_OPTION_TABLE1.series[i].name="预期";
                        STUDENT_SELECT_OPTION_TABLE2.series[0].data[i].name="预期";
                        STUDENT_SELECT_OPTION_TABLE1.legend.data.push("预期");
                        STUDENT_SELECT_OPTION_TABLE2.legend.data.push("预期");
                        if (data.length == 0) {
                          STUDENT_SELECT_TABLE2.clear();
                          STUDENT_SELECT_TABLE1.clear();
                        } else {
                          STUDENT_SELECT_TABLE2.setOption(STUDENT_SELECT_OPTION_TABLE2);
                          STUDENT_SELECT_TABLE1.setOption( STUDENT_SELECT_OPTION_TABLE1);
                        }
                    }
            });
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