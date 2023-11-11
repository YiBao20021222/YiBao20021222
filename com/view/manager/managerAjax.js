var TEACHER_URL_HOST_PORT = "http://127.0.0.1:3000" //设置老师的通信协议、地址、端口

var TEACHER_SELECT_STUDENT_TABLE1 = null;   //防抖:学生成绩柱状图 位置: hide3 panle1 
var TEACHER_SELECT_STUDENT_TABLE2 = null;   //防抖:学生成绩雷达图 位置: hide3 panle1

$(".MANAGER_SELECT_STUDENT").submit(function (e) {
    // echerts
    //获得echerts对象学生成绩柱状图,没有则初始化,有则不初始化

    var myChart1 = echarts.getInstanceByDom(document.querySelector("#echarts-p1-1")); //有的话就获取已有echarts实例的DOM节点。
    if (myChart1 == null) {
        TEACHER_SELECT_STUDENT_TABLE1 = echarts.init(document.querySelector("#echarts-p1-1"));
    }

    //学生成绩柱状图的基本配置初始化

    var TEACHER_SELECT_STUDENT_OPTION_TABLE1 = {
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

    var myChart2 = echarts.getInstanceByDom(document.querySelector("#echarts-p1-2")); //有的话就获取已有echarts实例的DOM节点。
    if (myChart2 == null) {
        TEACHER_SELECT_STUDENT_TABLE2 = echarts.init(document.querySelector("#echarts-p1-2"));
    }

    //学生成绩雷达图的基本配置初始化

    var TEACHER_SELECT_STUDENT_OPTION_TABLE2 = {
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
                    //     value: [],
                    //     name: '第一次成绩'
                    // }
                ]
            }
        ]
    };

    //获得ajax基本数据配置
    var data = $(e.target).serialize();
    e.preventDefault();
    //发送ajax请求
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_SELECT_STUDENT",
        data: data,
        success: function (data) {
            
            //学生成绩雷达图的基本配置填入数据
            var map1=new Map();  //储存科目考试(例如期中,期末)下对应的成绩数组
            var map2=new Map();  //储存科目类型(例如体育,语文)下对应的编号
            var length=0;
            for (var i = 0; i < data.length; i++) {
                if(!map2.has(data[i].class_type.split("(")[0])){
                    map2.set(data[i].class_type.split("(")[0],length);
                    var namei = `{"name": "${data[i].class_type.split("(")[0]}","max": 100}`;
                    TEACHER_SELECT_STUDENT_OPTION_TABLE2.radar.indicator.push(JSON.parse(namei));
                    TEACHER_SELECT_STUDENT_OPTION_TABLE1.xAxis.data.push(data[i].class_type.split("(")[0]);
                    length++;
                }
            }

            // map2.forEach((value,key)=>{
            //     console.log(value,key);
            // })
            //雷达图和柱状图的创建
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
                
            }
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
                    url: TEACHER_URL_HOST_PORT + "/SCORE_HAVE_INCLUDE_CLASS",
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
                        console.log(a,b,arvs)
                        for(var i=0;i<length;i++){
                            y.push(0);
                        }
                        for(var i=1;i<b.length;i++){
                            for(var j=0;j<length;j++){
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
                            TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data.push({value:[],name:""})
                            TEACHER_SELECT_STUDENT_OPTION_TABLE1.series.push({ name:" ",type: 'bar',data: []})
                            TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data[i].value=value;
                            TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[i].data=value;
                            TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data[i].name=name;
                            TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[i].name=name;
                            TEACHER_SELECT_STUDENT_OPTION_TABLE2.legend.data.push(name);
                            TEACHER_SELECT_STUDENT_OPTION_TABLE1.legend.data.push(name);
                            i++;
                        })
                        var flag=true;
                        var data=TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[i-1].data;
                        for(var j=0;j<length;j++){
                            y[j]+=data[j];
                            if(y[j]<0||y[j]>100){
                                flag=false;
                            }
                        }
                        if(flag){
                        TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data.push({value:[],name:""})
                        TEACHER_SELECT_STUDENT_OPTION_TABLE1.series.push({ name:" ",type: 'bar',data: []})
                        TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[i].data=y;
                        TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data[i].value=y;
                        TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[i].name="预期";
                        TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data[i].name="预期";
                        TEACHER_SELECT_STUDENT_OPTION_TABLE1.legend.data.push("预期");
                        TEACHER_SELECT_STUDENT_OPTION_TABLE2.legend.data.push("预期");
                        }
                        if (data.length == 0) {
                            TEACHER_SELECT_STUDENT_TABLE2.clear();
                        } else {
                            TEACHER_SELECT_STUDENT_TABLE2.setOption(TEACHER_SELECT_STUDENT_OPTION_TABLE2);
                        }
                        TEACHER_SELECT_STUDENT_TABLE1.setOption(TEACHER_SELECT_STUDENT_OPTION_TABLE1);
                    }
            });
            

            //table
            var items = "";
            for (var i = 0; i < data.length; i++) {
                var item = template("p1-table1", data[i]);
                items = items + item;
            }
            $(".information-p1-table1-tbody").html(items);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown.message);
            TEACHER_SELECT_STUDENT_OPTION_TABLE1.xAxis.data = [];
            TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[0].data = [];
            TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data[0].value = [];
            TEACHER_SELECT_STUDENT_OPTION_TABLE2.radar.indicator = [];
        }

    });
});
$(".STUDENT_EXISTS").submit(function (e) {
    var data = $(e.target).serialize();
    e.preventDefault();
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/STUDENT_EXISTS",
        data: data,
        success: function (response) {
            var value = response[0]['key'];
            if (value) {
                $($($(e.target).children()[0]).children()[0]).css("background", "green").text("pass");

            } else {
                $($($(e.target).children()[0]).children()[0]).css("background", "red").text("danger");
            }

        }

    });
});
$("#MANAGER_SELECT_STUDENT_NORMAL_INFORMATION_1 button").click(function (e) {
    var input = $("#INPUT_STUDENT_INSERT_ID");
    var data = "student_id=" + input.val();
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_SELECT_STUDENT_NORMAL_INFORMATION",
        data: data,
        success: function (response) {
            var tbody = $(".information-p2-table1-tbody");
            var html = template("p2-table1", response[0]);
            tbody.html(html);

        }
    });
    e.preventDefault();

});
$("#MANAGER_SELECT_STUDENT_NORMAL_INFORMATION_2 button").click(function (e) {
    var input = $("#INPUT_STUDENT_DELETE_ID");
    var data = "student_id=" + input.val();
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_SELECT_STUDENT_NORMAL_INFORMATION",
        data: data,
        success: function (response) {
            var tbody = $(".information-p3-table1-tbody");
            var html = template("p3-table1", response[0]);
            tbody.html(html);

        }
    });
    e.preventDefault();

});
$("#STUDENT_INSERT").click(function (e) {
    var student_id = $("#INPUT_STUDENT_INSERT_ID").val();
    var student_name = $("#INPUT_STUDENT_INSERT_NAME").val();
    var student_password = $("#INPUT_STUDENT_INSERT_PASSWORD").val();
    var data = {
        student_id: `${student_id}`,
        student_name: `${student_name}`,
        student_password: `${student_password}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/STUDENT_INSERT",
        data: data,
        success: function (response) {

        }
    });
    e.preventDefault();

});
$("#STUDENT_DELETE").click(function (e) {
    var student_id = $("#INPUT_STUDENT_DELETE_ID").val();
    var data = "student_id=" + `${student_id}`
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/STUDENT_DELETE",
        data: data,
        success: function (response) {

        }
    });
    e.preventDefault();

});
$("#STUDENT_ALTER_PASS").click(function (e) {
    var student_id = $("#INPUT_STUDENT_ALTER_ID").val();
    var student_password = $("#INPUT_STUDENT_ALTER_PASS_PASSWORD").val();
    vardata = {
        student_password: `${student_password}`,
        student_id: `${student_id}`

    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/STUDENT_ALTER_PASS",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();

});
$("#STUDENT_ALTER_S_NAME").click(function (e) {
    var student_name = $("#INPUT_STUDENT_ALTER_S_NAME_NAME").val();
    var student_id = $("#INPUT_STUDENT_ALTER_ID").val();
    var data = {
        student_name: `${student_name}`,
        student_id: `${student_id}`

    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/STUDENT_ALTER_S_NAME",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();
});
$("#STUDENT_ALTER_CLASS").click(function (e) {
    var student_old_class = $("#INPUT_STUDENT_ALTER_CLASS_OLD_CLASS").val();
    var student_id = $("#INPUT_STUDENT_ALTER_ID").val();
    var student_new_class = $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").val();

    var data = {
        student_old_class: `${student_old_class}`,
        student_id: `${student_id}`,
        student_new_class: `${student_new_class}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/STUDENT_ALTER_CLASS",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();
});
var timeClassExists = null;
$("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").on("keyup", function () {
    clearTimeout(timeClassExists);
    timeClassExists = setTimeout(() => {
        var class_type = $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").val();
        var data = {
            class_type: `${class_type}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/CLASS_EXISTS",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").prev().prev().text("pass").css("background", "green");
                } else {
                    $("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS").prev().prev().text("danger").css("background", "red")
                }
            }
        });
    }, 1000);
});
$("#STUDENT_ALTER_SCORE").click(function (e) {
    var student_id = $("#INPUT_STUDENT_ALTER_ID").val();
    var class_type = $("#INPUT_STUDENT_ALTER_SCORE_CLASS_TYPE").val();
    var score = $("#INPUT_STUDENT_ALTER_SCORE_SCORE").val();
    var data = {
        student_id: `${student_id}`,
        class_type: `${class_type}`,
        score: `${score}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/STUDENT_ALTER_SCORE",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();
});
$("#INPUT_STUDENT_ALTER_CLASS_NEW_CLASS,#INPUT_STUDENT_ALTER_SCORE_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(timeClassExists);
    timeClassExists = setTimeout(() => {
        var class_type = $(e.target).val();
        var data = {
            class_type: `${class_type}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/CLASS_EXISTS",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    $(e.target).prev().prev().text("pass").css("background", "green");
                } else {
                    $(e.target).prev().prev().text("danger").css("background", "red")
                }
            }
        });
    }, 1000);
});
$("#MANAGER_SELECT_STUDENT_BIG_INFORMATION button").click(function (e) {
    var input = $(e.target).parent().prev().children("input");
    var data = "student_id=" + input.val();
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_SELECT_STUDENT",
        data: data,
        success: function (response) {
            var index = $(e.target).parent().parent().parent().attr("index")
            var table = ".panel" + index;
            var tbody = $(table).children("table").children(".information-p4-table1-tbody");
            var htmls = "";
            for (var i = 0; i < response.length; i++) {
                var html = template("p4-table1", response[i]);
                htmls = html + htmls;
            }
            tbody.html(htmls);

        }
    });
    e.preventDefault();

});
var managerApprove = null;
$("#INPUT_MANAGER_EXISTS_ID_PAS_ID,#INPUT_MANAGER_EXISTS_ID_PAS_PAS").on("keyup", function (e) {
    clearTimeout(managerApprove);
    var managerApprove = setTimeout(() => {
        var search = $("#INPUT_MANAGER_EXISTS_ID_PAS_ID");
        var manager_id = search.val();
        var manager_password = $("#INPUT_MANAGER_EXISTS_ID_PAS_PAS").val();
        var data = {
            manager_id: `${manager_id}`,
            manager_password: `${manager_password}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/MANAGER_APPROVE",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    search.prev().prev().text("pass").css("background", "green");
                } else {
                    search.prev().prev().text("danger").css("background", "red")
                }
            }
        });
    }, 1000);
});
var STUDENT_SCORE_ADD_ABLE = null;
$(".STUDENT_SCORE_ADD").on("keyup", function (e) {
    clearTimeout(STUDENT_SCORE_ADD_ABLE);
    STUDENT_SCORE_ADD_ABLE = setTimeout(() => {
        var search = $("#INPUT_ADD_SCORE_ID");
        var student_id = $("#INPUT_ADD_SCORE_ID").val();
        var class_type = $("#INPUT_ADD_SCORE_CLASS_TYPE").val();
        var score = $("#INPUT_ADD_SCORE_SCORE");
        var data = {
            student_id: `${student_id}`,
            class_type: `${class_type}`,
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/SCORE_ADD_ABLE",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                var disable = search.next().text();
                setTimeout(() => {      //解决异步问题
                    if (flag) {
                        search.prev().prev().text("YES").css("background", "red");
                        //成绩存在
                        score.prop("disabled", "false");
                        $("#ADD_SCORE").prop("disabled", "false");
                    } else {
                        search.prev().prev().text("NO").css("background", "green")
                        var ADD_SCORE_TABLE_FLAG = $("#information-p5-table1-tbody").children().length;
                        if (disable == "YES" && ADD_SCORE_TABLE_FLAG > 0) {
                            //在成绩不存在的前提下,如果科目存在,学生存在
                            score.prop("disabled", "");
                            $("#ADD_SCORE").prop("disabled", "");
                        }
                        else if (disable == "NO" || ADD_SCORE_TABLE_FLAG == 0) {
                            //在成绩不存在的前提下,如果科目不存在或者学生不存在
                            score.prop("disabled", "false");
                            $("#ADD_SCORE").prop("disabled", "false");
                        }
                    }
                }, 100);
            }
        });
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/TEACHER_SELECT_STUDENT",
            data: data,
            success: function (data) {
                var items = "";
                for (var i = 0; i < data.length; i++) {
                    var item = template("p5-table1", data[i]);
                    items = items + item;
                }
                $("#information-p5-table1-tbody").html(items);
            }
        });
    }, 1000)
    e.preventDefault();
});
$("#MANAGER_ADD_STUDENT_SCORE").click(function (e) {
    var manager_id = $("#INPUT_MANAGER_EXISTS_ID_PAS_ID").val();
    var manager_password = $("#INPUT_MANAGER_EXISTS_ID_PAS_PAS").val();
    var data = {
        manager_id: `${manager_id}`,
        manager_password: `${manager_password}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/MANAGER_APPROVE",
        data: data,
        success: function (response) {
            var flag = response[0]["key"];
            if (flag) {
                $("#ADD_SCORE").css("display", "inline-block");
            } else {
                $("#ADD_SCORE").css("display", "none");
            }
        }
    });
    e.preventDefault();
});
var STUDENT_SCORE_ADD_CLASS_EXISTS = null;
$("#INPUT_ADD_SCORE_CLASS_TYPE,#INPUT_ADD_CLASS_TYPE,#INPUT_DELETE_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(STUDENT_SCORE_ADD_CLASS_EXISTS);
    STUDENT_SCORE_ADD_CLASS_EXISTS = setTimeout(() => {
        var search = $(e.target);
        var class_type = search.val();
        var data = {
            class_type: `${class_type}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/CLASS_EXISTS",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    search.prev().prev().text("YES").css("background", "red");
                } else {
                    search.prev().prev().text("NO").css("background", "green");
                }
            }
        });
    })
});
$("#ADD_SCORE").click(function (e) {
    var student_id = $("#INPUT_ADD_SCORE_ID").val();
    var class_type = $("#INPUT_ADD_SCORE_CLASS_TYPE").val();
    var score = $("#INPUT_ADD_SCORE_SCORE").val();
    var data = {
        student_id: `${student_id}`,
        class_type: `${class_type}`,
        score: `${score}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/SCORE_ADD",
        data: data,
        success: function (response) {
            if (response) {
                $.ajax({
                    type: "post",
                    url: TEACHER_URL_HOST_PORT + "/TEACHER_SELECT_STUDENT",
                    data: data,
                    success: function (data) {
                        var items = "";
                        for (var i = 0; i < data.length; i++) {
                            var item = template("p5-table1", data[i]);
                            items = items + item;
                        }
                        $("#information-p5-table1-tbody").html(items);
                    }
                });
            }
        }
    });
    e.preventDefault();
});
var inputAddClassType = null;
$("#INPUT_ADD_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(inputAddClassType);
    inputAddClassType = setTimeout(() => {
        var class_type = $("#INPUT_ADD_CLASS_TYPE").val();
        var data = {
            class_type: `${class_type}`,
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/CLASS_EXISTS",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    $("#ADD_CLASS").prop("disabled", "false");
                } else {
                    $("#ADD_CLASS").prop("disabled", "");
                }
            }
        });
    }, 2000);

    e.preventDefault();
});
$(".CLASS_TYPE_EXISTS button").on("click", function (e) {
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/CLASS_HAVE",
        success: function (response) {
            var tbody1 = $("#information-p6-table1-tbody");
            var tbody2 = $("#information-p7-table1-tbody");
            var htmls = "";
            for (var i = 0; i < response.length; i++) {
                html = template("p6-table1", response[i]);
                htmls += html;
            }
            tbody1.html(htmls);
            tbody2.html(htmls);
        }
    });
    e.preventDefault();
});
$("#ADD_CLASS").on("click", function (e) {
    var class_type = $("#INPUT_ADD_CLASS_TYPE").val();
    var data = {
        class_type: `${class_type}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/CLASS_ADD",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();
});
$("#DELETE_CLASS").on("click", function (e) {
    var class_type = $("#INPUT_DELETE_CLASS_TYPE").val();
    var data = {
        class_type: `${class_type}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/DELETE_CLASS",
        data: data,
        success: function (response) {
        }
    });
    e.preventDefault();
});
var inputDeleteClassType = null;
$("#INPUT_DELETE_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(inputDeleteClassType);
    setTimeout(() => {
        var class_type = $("#INPUT_DELETE_CLASS_TYPE").val();
        var data = {
            class_type: `${class_type}`,
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/CLASS_EXISTS",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    $("#DELETE_CLASS").prop("disabled", "");
                } else {
                    $("#DELETE_CLASS").prop("disabled", "false");
                }
            }
        });
    }, 2000);

    e.preventDefault();
});
var inputAddTeacherId = null;
$("#INPUT_ADD_TEACHER_ID").on("keyup", function (e) {
    clearTimeout(inputAddTeacherId);
    setTimeout(() => {
        var teacher_id = $(e.target).val();
        var data = {
            teacher_id: `${teacher_id}`,
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/TEACHER_EXISTS",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    $(e.target).prev().prev().text("YES").css("background", "red");
                    $("#ADD_TEACHER").prop("disabled", "false");
                } else {
                    $(e.target).prev().prev().text("NO").css("background", "green");
                    $("#ADD_TEACHER").prop("disabled", "");
                }
            }
        });
        e.preventDefault();
    }, 2000);

});
var inputAlterTeacherId = null;
$("#INPUT_ALTER_TEACHER_ID").on("keyup", function (e) {
    clearTimeout(inputAlterTeacherId)
    setTimeout(() => {
        var teacher_id = $(e.target).val();
        var data = {
            teacher_id: `${teacher_id}`,
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/TEACHER_EXISTS",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    $(e.target).prev().prev().text("YES").css("background", "red");
                    $("#TEACHER_ALTER_CLASS,#TEACHER_ALTER_PASS,#TEACHER_ALTER_NAME").prop("disabled", "");
                } else {
                    $(e.target).prev().prev().text("NO").css("background", "green");
                    $("#TEACHER_ALTER_CLASS,#TEACHER_ALTER_PASS,#TEACHER_ALTER_NAME").prop("disabled", "false");
                }
            }
        });
    }, 2000);
    e.preventDefault();
});
$(".TEACHER_EXISTS button").on("click", function (e) {
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_HAVE",
        success: function (response) {
            var tbody1 = $("#information-p8-table1-tbody")
            var tbody2 = $("#information-p9-table1-tbody")
            var tbody3 = $("#information-p10-table1-tbody")
            var htmls = "";
            for (var i = 0; i < response.length; i++) {
                html = template("p8-table1", response[i]);
                htmls += html;
            }
            tbody1.html(htmls);
            tbody2.html(htmls);
            tbody3.html(htmls);
        }
    });
    e.preventDefault();

})
$("#ADD_TEACHER").on("click", function (e) {
    var teacher_id = $("#INPUT_ADD_TEACHER_ID").val();
    var teacher_name = $("#INPUT_TEACHER_INSERT_NAME").val();
    var teacher_password = $("#INPUT_TEACHER_INSERT_PASSWORD").val();
    var data = {
        teacher_id: `${teacher_id}`,
        teacher_name: `${teacher_name}`,
        teacher_password: `${teacher_password}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_ADD",
        data: data,
        success: function (response) {

        }
    });
    e.preventDefault();

})
$("#DELETE_TEACHER").on("click", function (e) {
    var teacher_id = $("#INPUT_DELETE_TEACHER_ID").val();
    var data = {
        teacher_id: `${teacher_id}`,
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_DELETE",
        data: data,
        success: function (response) {

        }
    });
    e.preventDefault();
})
var inputDeleteTeacherId = null;
$("#INPUT_DELETE_TEACHER_ID").on("keyup", function (e) {
    clearTimeout(inputDeleteTeacherId);
    setTimeout(() => {
        var teacher_id = $(e.target).val();
        var data = {
            teacher_id: `${teacher_id}`,
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/TEACHER_EXISTS",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    $(e.target).prev().prev().text("YES").css("background", "red");
                    $("#DELETE_TEACHER").prop("disabled", "");
                } else {
                    $(e.target).prev().prev().text("NO").css("background", "green");
                    $("#DELETE_TEACHER").prop("disabled", "false");
                }
            }
        });
    }, 2000);

    e.preventDefault();
});
$(".TEACHER_CLASS_HAVE button").on("click", function (e) {
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_CLASS_HAVE",
        success: function (response) {
            var tbody1 = $("#information-p10-table2-tbody")
            var htmls = "";
            for (var i = 0; i < response.length; i++) {
                html = template("p10-table1", response[i]);
                htmls += html;
            }
            tbody1.html(htmls);
        }
    });
    e.preventDefault();

})
$("#TEACHER_ALTER_PASS").on("click", function (e) {
    var teacher_id = $("#INPUT_ALTER_TEACHER_ID").val();
    var teacher_password = $("#INPUT_TEACHER_ALTER_PASS_PASSWORD").val();
    var data = {
        teacher_id: `${teacher_id}`,
        teacher_password: `${teacher_password}`
    }
    console.log(data);
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_ALTER_PASSWORD",
        data: data,
        success: function (response) {

        }
    });
    e.preventDefault();
})
$("#TEACHER_ALTER_NAME").on("click", function (e) {
    var teacher_id = $("#INPUT_ALTER_TEACHER_ID").val();
    var teacher_name = $("#INPUT_TEACHER_ALTER_NAME").val();
    var data = {
        teacher_id: `${teacher_id}`,
        teacher_name: `${teacher_name}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_ALTER_NAME",
        data: data,
        success: function (response) {

        }
    });
    e.preventDefault();
})
var inputALterTeacher = null;
$("#INPUT_ALTER_TEACHER_CLASS_TEACHER_ID,#INPUT_ALTER_TEACHER_CLASS_CLASS_TYPE").on("keyup", function (e) {
    clearTimeout(inputALterTeacher)
    setTimeout(() => {
        var teacher_id = $("#INPUT_ALTER_TEACHER_CLASS_TEACHER_ID").val();
        var class_type = $("#INPUT_ALTER_TEACHER_CLASS_CLASS_TYPE").val();
        var data = {
            teacher_id: `${teacher_id}`,
            class_type: `${class_type}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/TEACHER_CLASS_APPROVE",
            data: data,
            success: function (response) { //可能会造成死锁需要注意
                var flag = response[0]["key"];
                if (flag) {
                    $("#INPUT_ALTER_TEACHER_CLASS_TEACHER_ID").prev().prev().text("YES").css("background", "red");
                    //在老师授课存在时
                    $("#TEACHER_CLASS_DELETE").prop("disabled", "");
                    $("#TEACHER_CLASS_INSERT").prop("disabled", "false");

                } else {
                    $("#INPUT_ALTER_TEACHER_CLASS_TEACHER_ID").prev().prev().text("NO").css("background", "green");
                    //在老师授课不存在时
                    $("#TEACHER_CLASS_DELETE").prop("disabled", "false");
                    $.ajax({
                        type: "post",
                        url: TEACHER_URL_HOST_PORT + "/TEACHER_EXISTS",
                        data: data,
                        success: function (response) {
                            var flag1 = response[0]["key"];
                            if (flag1) {
                                //老师存在时
                                $.ajax({
                                    type: "post",
                                    url: TEACHER_URL_HOST_PORT + "/CLASS_EXISTS",
                                    data: data,
                                    success: function (response) {
                                        var flag2 = response[0]["key"];
                                        console.log()
                                        if (flag2) {
                                            //课程存在时
                                            $.ajax({
                                                type: "post",
                                                url: TEACHER_URL_HOST_PORT + "/TEACHER_CLASS_CLASS_USED",
                                                data: data,
                                                success: function (response) {
                                                    var flag3 = response[0]["key"];
                                                    if (!flag3) {
                                                        //没有被占用
                                                        $("#TEACHER_CLASS_INSERT").prop("disabled", "");
                                                    } else {
                                                        //被占用
                                                        $("#TEACHER_CLASS_INSERT").prop("disabled", "false");
                                                    }
                                                }
                                            });

                                        }
                                        else {
                                            //课程不存在时
                                            $("#TEACHER_CLASS_INSERT").prop("disabled", "false");
                                        }
                                    }
                                });

                            } else {
                                //老师不存在时
                                $("#TEACHER_CLASS_INSERT").prop("disabled", "false");
                            }
                        }
                    });

                }
            }
        });
    }, 2000);

    e.preventDefault();
});
$(".TEACHER_CLASS_HAVE button").on("click", function (e) {
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_HAVE",
        success: function (response) {
            var tbody1 = $("#information-p11-table1-tbody")
            var htmls = "";
            for (var i = 0; i < response.length; i++) {
                html = template("p11-table1", response[i]);
                htmls += html;
            }
            tbody1.html(htmls);
        }
    });
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/CLASS_HAVE",
        success: function (response) {
            var tbody1 = $("#information-p11-table2-tbody")
            var htmls = "";
            for (var i = 0; i < response.length; i++) {
                html = template("p6-table1", response[i]);
                htmls += html;
            }
            tbody1.html(htmls);
        }
    });
    e.preventDefault();


})
$("#TEACHER_CLASS_INSERT").on("click", function (e) {
    var teacher_id = $("#INPUT_ALTER_TEACHER_CLASS_TEACHER_ID").val();
    var class_type = $("#INPUT_ALTER_TEACHER_CLASS_CLASS_TYPE").val();
    var data = {
        teacher_id: `${teacher_id}`,
        class_type: `${class_type}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_CLASS_INSERT",
        data: data,
        success: function (response) {

        }
    });
    e.preventDefault();
})
$("#TEACHER_CLASS_DELETE").on("click", function (e) {
    var teacher_id = $("#INPUT_ALTER_TEACHER_CLASS_TEACHER_ID").val();
    var class_type = $("#INPUT_ALTER_TEACHER_CLASS_CLASS_TYPE").val();
    var data = {
        teacher_id: `${teacher_id}`,
        class_type: `${class_type}`
    }
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_CLASS_DELETE",
        data: data,
        success: function (response) {

        }
    });
    e.preventDefault();
})
var inputManagerSeeTeacher = null;
$("#INPUT_MANAGER_SEE_TEACHER_EXISTS_ID_PAS_ID,#INPUT_MANAGER_SEE_TEACHER_EXISTS_ID_PAS_PAS").on("keyup", function (e) {
    clearTimeout(inputManagerSeeTeacher);
    setTimeout(() => {
        var manager_id = $("#INPUT_MANAGER_SEE_TEACHER_EXISTS_ID_PAS_ID").val();
        var manager_password = $("#INPUT_MANAGER_SEE_TEACHER_EXISTS_ID_PAS_PAS").val();
        var data = {
            manager_id: `${manager_id}`,
            manager_password: `${manager_password}`
        }
        $.ajax({
            type: "post",
            url: TEACHER_URL_HOST_PORT + "/MANAGER_APPROVE",
            data: data,
            success: function (response) {
                var flag = response[0]["key"];
                if (flag) {
                    $("#INPUT_MANAGER_SEE_TEACHER_EXISTS_ID_PAS_ID").prev().prev().text("YES").css("background", "red");
                } else {
                    $("#INPUT_MANAGER_SEE_TEACHER_EXISTS_ID_PAS_ID").prev().prev().text("NO").css("background", "green");
                }
            }
        });
    }, 2000)
    e.preventDefault();
})
var MANAGER_SEE_TEACHERS_ECHARTS = null;
$(".MANAGER_SEE_TEACHERS button").click(function (e) {
    $(".MANAGER_SEE_TEACHERS button").css("touchAction", "none");
    var myEcharts = echarts.getInstanceByDom(document.querySelector("#echarts-p13-1"))
    var MANAGER_SEE_TEACHERS_OPTION;
    if (myEcharts == null) {
        MANAGER_SEE_TEACHERS_ECHARTS = echarts.init(document.querySelector("#echarts-p13-1"));
    }
    echarts.registerTransform(ecSimpleTransform.aggregate);
    var array_res = [];
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/SCORE_HAVE",
        success: function (response) {
            var res = response;
            array_res.push(["成绩", "Life Expectancy", "Population", "老师", "学生"]);
            for (var i = 0; i < res.length; i++) {
                array_res.push([res[i].score, 1, 1, res[i].teacher_name, res[i].student_id]);
            }
            MANAGER_SEE_TEACHERS_OPTION = {

                dataset: [
                    {
                        id: 'raw',
                        source: array_res
                    },
                    {
                        id: 'since_year',
                        fromDatasetId: 'raw',
                        transform: [
                            {
                                type: 'filter',
                                config: {
                                    dimension: '学生',
                                    gte: 0
                                }
                            }
                        ]
                    },
                    {
                        id: 'income_aggregate',
                        fromDatasetId: 'since_year',
                        transform: [
                            {
                                type: 'ecSimpleTransform:aggregate',
                                config: {
                                    resultDimensions: [
                                        { name: '最小成绩', from: '成绩', method: 'min' },
                                        { name: 'Q1', from: '成绩', method: 'Q1' },
                                        { name: '中位数', from: '成绩', method: 'median' },
                                        { name: 'Q3', from: '成绩', method: 'Q3' },
                                        { name: '最大成绩', from: '成绩', method: 'max' },
                                        { name: '老师', from: '老师' }
                                    ],
                                    groupBy: '老师'
                                }
                            },
                            {
                                type: 'sort',
                                config: {
                                    dimension: 'Q3',
                                    order: 'asc'
                                }
                            }
                        ]
                    }
                ],
                title: {
                    text: '成绩箱型图'
                },
                tooltip: {
                    trigger: 'axis',
                    confine: true
                },
                xAxis: {
                    name: '成绩',
                    nameLocation: '中位数',
                    nameGap: 30,
                    scale: true
                },
                yAxis: {
                    type: 'category'
                },
                grid: {
                    bottom: 100
                },
                legend: {
                    selected: { detail: false }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    },
                    {
                        type: 'slider',
                        height: 20
                    }
                ],
                series: [
                    {
                        name: '盒子指标',
                        type: 'boxplot',
                        datasetId: 'income_aggregate',
                        itemStyle: {
                            color: '#b8c5f2'
                        },
                        encode: {
                            x: ['最小成绩', 'Q1', '中位数', 'Q3', '最大成绩'],
                            y: '老师',
                            itemName: ['老师'],
                            tooltip: ['最小成绩', 'Q1', '中位数', 'Q3', '最大成绩']
                        }
                    },
                    {
                        name: '具体学生分布',
                        type: 'scatter',
                        datasetId: 'since_year',
                        symbolSize: 5,
                        tooltip: {
                            trigger: 'item'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            align: 'left',
                            verticalAlign: 'middle',
                            rotate: 90,
                            fontSize: 12
                        },
                        itemStyle: {
                            color: '#d00000'
                        },
                        encode: {
                            x: '成绩',
                            y: '老师',
                            label: '学生',
                            itemName: '学生',
                            tooltip: ['老师', '学生', '成绩']
                        }
                    }
                ]
            };
            MANAGER_SEE_TEACHERS_ECHARTS.setOption(MANAGER_SEE_TEACHERS_OPTION);

        }

    });
    e.preventDefault();
});
