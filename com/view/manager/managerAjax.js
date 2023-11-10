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
    var data = $(e.target).serialize();
    e.preventDefault();
    //发送ajax请求
    $.ajax({
        type: "post",
        url: TEACHER_URL_HOST_PORT + "/TEACHER_SELECT_STUDENT",
        data: data,
        success: function (data) {
            //学生成绩雷达图的基本配置填入数据
            for (var i = 0; i < data.length; i++) {
                var namei = `{"name": "${data[i].class_type}","max": 100}`;
                TEACHER_SELECT_STUDENT_OPTION_TABLE1.xAxis.data.push(data[i].class_type);
                TEACHER_SELECT_STUDENT_OPTION_TABLE1.series[0].data.push(data[i].score);
                TEACHER_SELECT_STUDENT_OPTION_TABLE2.series[0].data[0].value.push(data[i].score);
                TEACHER_SELECT_STUDENT_OPTION_TABLE2.radar.indicator.push(JSON.parse(namei));
            }
            if (data.length == 0) {
                TEACHER_SELECT_STUDENT_TABLE2.clear();
            } else {
                TEACHER_SELECT_STUDENT_TABLE2.setOption(TEACHER_SELECT_STUDENT_OPTION_TABLE2);
            }
            TEACHER_SELECT_STUDENT_TABLE1.setOption(TEACHER_SELECT_STUDENT_OPTION_TABLE1);

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
            success: function (response) {
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
            // array_res=[["成绩", "Life Expectancy", "Population", "老师", "学生"],[815,34.05,351014,"Australia",1800],[1314,39,645526,"Canada",1800],[985,32,321675013,"China",1800],[864,32.2,345043,"Cuba",1800],[1244,36.5731262,977662,"Finland",1800],[1803,33.96717024,29355111,"France",1800],[1639,38.37,22886919,"Germany",1800],[926,42.84559912,61428,"Iceland",1800],[1052,25.4424,168574895,"India",1800],[1050,36.4,30294378,"Japan",1800],[579,26,4345000,"North Korea",1800],[576,25.8,9395000,"South Korea",1800],[658,34.05,100000,"New Zealand",1800],[1278,37.91620899,868570,"Norway",1800],[1213,35.9,9508747,"Poland",1800],[1430,29.5734572,31088398,"Russia",1800],[1221,35,9773456,"Turkey",1800],[3431,38.6497603,12327466,"United Kingdom",1800],[2128,39.41,6801854,"United States",1800],[834,34.05,342440,"Australia",1810],[1400,39.01496774,727603,"Canada",1810],[985,32,350542958,"China",1810],[970,33.64,470176,"Cuba",1810],[1267,36.9473378,1070625,"Finland",1810],[1839,37.4,30293172,"France",1810],[1759,38.37,23882461,"Germany",1810],[928,43.13915533,61428,"Iceland",1810],[1051,25.4424,171940819,"India",1810],[1064,36.40397538,30645903,"Japan",1810],[573,26,4345000,"North Korea",1810],[570,25.8,9395000,"South Korea",1810],[659,34.05,100000,"New Zealand",1810],[1299,36.47500606,918398,"Norway",1810],[1260,35.9,9960687,"Poland",1810],[1447,29.5734572,31088398,"Russia",1810],[1223,35,9923007,"Turkey",1810],[3575,38.34738144,14106058,"United Kingdom",1810],[2283,39.41,8294928,"United States",1810],[853,34.05,334002,"Australia",1820],[1491,39.02993548,879432,"Canada",1820],[985,32,380055273,"China",1820],[1090,35.04,607664,"Cuba",1820],[1290,37.29122269,1190807,"Finland",1820],[1876,39.21,31549988,"France",1820],[1887,38.37,25507768,"Germany",1820],[929,36.56365268,62498,"Iceland",1820],[1050,25.4424,176225709,"India",1820],[1079,36.40795077,30993147,"Japan",1820],[567,26,4353556,"North Korea",1820],[564,25.8,9408016,"South Korea",1820],[660,34.05,100000,"New Zealand",1820],[1320,46.96239815,995904,"Norway",1820],[1309,35.9,10508375,"Poland",1820],[1464,29.5734572,31861526,"Russia",1820],[1225,35,10118315,"Turkey",1820],[3403,41.31247671,16221883,"United Kingdom",1820],[2242,39.41,10361646,"United States",1820],[1399,34.05,348143,"Australia",1830],[1651,39.04490323,1202146,"Canada",1830],[986,32,402373519,"China",1830],[1224,35.74,772812,"Cuba",1830],[1360,36.29644969,1327905,"Finland",1830],[1799,39.56,33174810,"France",1830],[2024,38.37,28016571,"Germany",1830],[1036,40.5022162,65604,"Iceland",1830],[1052,25.4424,182214537,"India",1830],[1094,36.41192615,31330455,"Japan",1830],[561,26,4377749,"North Korea",1830],[559,25.8,9444785,"South Korea",1830],[661,34.05,91723,"New Zealand",1830],[1403,45.75400094,1115667,"Norway",1830],[1360,35.9,11232857,"Poland",1830],[1562,29.5734572,34134430,"Russia",1830],[1292,35,10398375,"Turkey",1830],[3661,43.01830917,18533999,"United Kingdom",1830],[2552,39.41,13480460,"United States",1830],[2269,34.05,434095,"Australia",1840],[1922,40.19012,1745604,"Canada",1840],[986,32,411213424,"China",1840],[1374,36.48,975565,"Cuba",1840],[1434,41.46900965,1467238,"Finland",1840],[2184,40.37,34854476,"France",1840],[2102,38.37,31016143,"Germany",1840],[1155,31.97,70010,"Iceland",1840],[1053,25.4424,189298397,"India",1840],[1110,36.41590154,31663783,"Japan",1840],[556,26,4410700,"North Korea",1840],[553,25.8,9494784,"South Korea",1840],[662,34.05,82479,"New Zealand",1840],[1604,45.61661054,1252476,"Norway",1840],[1413,35.9,12090161,"Poland",1840],[1666,29.5734572,37420913,"Russia",1840],[1362,35,10731241,"Turkey",1840],[4149,39.92715263,20737251,"United Kingdom",1840],[2792,39.41,17942443,"United States",1840],[3267,34.05,742619,"Australia",1850],[2202,40.985432,2487811,"Canada",1850],[985,32,402711280,"China",1850],[1543,36.26,1181650,"Cuba",1850],[1512,37.35415172,1607810,"Finland",1850],[2146,43.28,36277905,"France",1850],[2182,38.37,33663143,"Germany",1850],[1287,36.61,74711,"Iceland",1850],[1055,25.4424,196657653,"India",1850],[1125,36.41987692,32223184,"Japan",1850],[550,26,4443898,"North Korea",1850],[547,25.8,9558873,"South Korea",1850],[1898,34.05,94934,"New Zealand",1850],[1675,49.53,1401619,"Norway",1850],[1468,35.9,13219914,"Poland",1850],[1778,29.5734572,41023821,"Russia",1850],[1436,35,11074762,"Turkey",1850],[4480,42.8,22623571,"United Kingdom",1850],[3059,39.41,24136293,"United States",1850],[4795,34.05,1256048,"Australia",1860],[2406,41.541504,3231465,"Canada",1860],[1023,28.85,380047548,"China",1860],[1733,36.24,1324000,"Cuba",1860],[1594,38.15099864,1734254,"Finland",1860],[3086,43.33,37461341,"France",1860],[2509,38.37,36383150,"Germany",1860],[1435,19.76,79662,"Iceland",1860],[1056,23,204966302,"India",1860],[1168,36.42385231,33176900,"Japan",1860],[545,26,4542395,"North Korea",1860],[542,25.8,9650608,"South Korea",1860],[3674,34.05,157114,"New Zealand",1860],[2033,50,1580366,"Norway",1860],[1525,35.9,14848599,"Poland",1860],[1896,29.5734572,44966686,"Russia",1860],[1514,35,11428718,"Turkey",1860],[5268,43.01,24783522,"United Kingdom",1860],[3714,39.41,31936643,"United States",1860],[5431,34.05,1724213,"Australia",1870],[2815,42.460624,3817167,"Canada",1870],[1099,31.95714286,363661158,"China",1870],[1946,29.66,1424672,"Cuba",1870],[1897,45.66140699,1847468,"Finland",1870],[3297,36.41,38170355,"France",1870],[2819,38.37,39702235,"Germany",1870],[1599,38.37,84941,"Iceland",1870],[1058,25.4424,213725049,"India",1870],[1213,36.59264,34638021,"Japan",1870],[539,26,4656353,"North Korea",1870],[536,25.8,9741935,"South Korea",1870],[5156,34.05,301045,"New Zealand",1870],[2483,50.86,1746718,"Norway",1870],[1584,35.9,17013787,"Poland",1870],[2023,31.12082604,49288504,"Russia",1870],[1597,35,11871788,"Turkey",1870],[6046,40.95,27651628,"United Kingdom",1870],[4058,39.41,40821569,"United States",1870],[7120,39.34215686,2253007,"Australia",1880],[3021,44.512464,4360348,"Canada",1880],[1015,32,365544192,"China",1880],[2185,36.84,1555081,"Cuba",1880],[1925,39.67,2047577,"Finland",1880],[3555,42.73,39014053,"France",1880],[3057,38.905,43577358,"Germany",1880],[2035,42.32,90546,"Iceland",1880],[1084,25.4424,223020377,"India",1880],[1395,37.03648,36826469,"Japan",1880],[534,26,4798574,"North Korea",1880],[531,25.8,9806394,"South Korea",1880],[6241,38.51282051,505065,"New Zealand",1880],[2827,51.91,1883716,"Norway",1880],[1848,35.9,19669587,"Poland",1880],[2158,30.20106663,53996807,"Russia",1880],[1535,35,12474351,"Turkey",1880],[6553,43.78,30849957,"United Kingdom",1880],[5292,39.41,51256498,"United States",1880],[7418,44.63431373,3088808,"Australia",1890],[3963,45.12972,4908078,"Canada",1890],[918,32,377135349,"China",1890],[2454,39.54,1658274,"Cuba",1890],[2305,44.61,2358344,"Finland",1890],[3639,43.36,40015501,"France",1890],[3733,40.91,48211294,"Germany",1890],[2009,36.58,96517,"Iceland",1890],[1163,24.384,232819584,"India",1890],[1606,37.67568,39878734,"Japan",1890],[528,26,4959044,"North Korea",1890],[526,25.8,9856047,"South Korea",1890],[6265,42.97564103,669985,"New Zealand",1890],[3251,48.6,2003954,"Norway",1890],[2156,37.41086957,22618933,"Poland",1890],[2233,29.93047652,59151534,"Russia",1890],[1838,35,13188522,"Turkey",1890],[7169,44.75,34215580,"United Kingdom",1890],[5646,45.21,63810074,"United States",1890],[6688,49.92647059,3743708,"Australia",1900],[4858,48.288448,5530806,"Canada",1900],[894,32,395184556,"China",1900],[2756,33.11248,1762227,"Cuba",1900],[2789,41.8,2633389,"Finland",1900],[4314,45.08,40628638,"France",1900],[4596,43.915,55293434,"Germany",1900],[2352,46.64,102913,"Iceland",1900],[1194,18.35,243073946,"India",1900],[1840,38.6,44040263,"Japan",1900],[523,26,5124044,"North Korea",1900],[520,25.8,9926633,"South Korea",1900],[7181,47.43846154,815519,"New Zealand",1900],[3643,53.47,2214923,"Norway",1900],[2583,40.4326087,24700965,"Poland",1900],[3087,30.74960789,64836675,"Russia",1900],[1985,35,13946634,"Turkey",1900],[8013,46.32,37995759,"United Kingdom",1900],[6819,48.92818182,77415610,"United States",1900],[8695,55.21862745,4408209,"Australia",1910],[6794,52.123024,7181200,"Canada",1910],[991,32,417830774,"China",1910],[3095,35.21936,2268558,"Cuba",1910],[3192,48.53,2930441,"Finland",1910],[4542,51.37,41294572,"France",1910],[5162,48.40833333,64064129,"Germany",1910],[3012,52.67,109714,"Iceland",1910],[1391,23.18032,253761202,"India",1910],[1998,39.9736,49314848,"Japan",1910],[544,24.097344,5293486,"North Korea",1910],[538,24.097344,10193929,"South Korea",1910],[8896,51.90128205,1044340,"New Zealand",1910],[4332,57.99,2383631,"Norway",1910],[2846,43.45434783,26493422,"Poland",1910],[3487,31.40217766,71044207,"Russia",1910],[2144,35,14746479,"Turkey",1910],[8305,53.99,41804912,"United Kingdom",1910],[8287,51.8,93559186,"United States",1910],[7867,60.51078431,5345428,"Australia",1920],[6430,56.569064,8764205,"Canada",1920],[1012,32,462750597,"China",1920],[4042,37.38208,3067116,"Cuba",1920],[3097,47.55,3140763,"Finland",1920],[4550,51.6,39069937,"France",1920],[4482,53.5,62277173,"Germany",1920],[2514,54.58,117013,"Iceland",1920],[1197,24.71866667,267795301,"India",1920],[2496,42.04432,55545937,"Japan",1920],[779,27.99984,6117873,"North Korea",1920],[756,27.99984,11839704,"South Korea",1920],[9453,56.36410256,1236395,"New Zealand",1920],[5483,58.89,2634635,"Norway",1920],[3276,46.47608696,24166006,"Poland",1920],[1489,20.5,77871987,"Russia",1920],[1525,29,14200404,"Turkey",1920],[8316,56.6,43825720,"United Kingdom",1920],[9181,55.4,108441644,"United States",1920],[7714,64.998,6473803,"Australia",1930],[7976,58.94,10450983,"Canada",1930],[1055,33.26984,481222579,"China",1930],[5027,42.03308,3918827,"Cuba",1930],[4489,54.438,3450505,"Finland",1930],[6835,56.938,41662571,"France",1930],[6791,59.4991686,66439556,"Germany",1930],[4444,60.228,124871,"Iceland",1930],[1244,28.8016,285470839,"India",1930],[2592,46.65403,63863524,"Japan",1930],[829,33.867168,7366694,"North Korea",1930],[784,35.244168,13929869,"South Korea",1930],[8359,60.86092308,1491937,"New Zealand",1930],[7369,64.074,2807922,"Norway",1930],[3591,49.52382609,28169922,"Poland",1930],[3779,36.428,85369549,"Russia",1930],[2323,35.7818,14930772,"Turkey",1930],[8722,60.85,45957969,"United Kingdom",1930],[10139,59.556,125055606,"United States",1930],[10057,66.336,7052012,"Australia",1940],[8871,63.99,11655920,"Canada",1940],[841,33.30311174,509858820,"China",1940],[4631,48.5472,4672303,"Cuba",1940],[5439,46.586,3696232,"Finland",1940],[4821,49.586,40927546,"France",1940],[9711,60.73821096,71244059,"Germany",1940],[5373,65.786,133257,"Iceland",1940],[1081,32.13056,324372335,"India",1940],[3888,49.052,72709185,"Japan",1940],[1418,41.22756,8870433,"North Korea",1940],[1322,43.98156,15684579,"South Korea",1940],[10673,65.35774359,1629869,"New Zealand",1940],[8349,65.818,2971546,"Norway",1940],[3696,44.752,30041062,"Poland",1940],[5632,41.056,93588981,"Russia",1940],[3163,34.5396,17777172,"Turkey",1940],[10935,60.89,48235963,"United Kingdom",1940],[11320,63.192,134354133,"United States",1940],[12073,69.134,8177344,"Australia",1950],[12022,68.25,13736997,"Canada",1950],[535,39.9994,544112923,"China",1950],[8630,59.8384,5919997,"Cuba",1950],[7198,64.144,4008299,"Finland",1950],[7914,66.594,41879607,"France",1950],[7251,67.0215058,69786246,"Germany",1950],[8670,71.004,142656,"Iceland",1950],[908,34.6284,376325205,"India",1950],[2549,59.378,82199470,"Japan",1950],[868,32.2464,10549469,"North Korea",1950],[807,43.3774,19211386,"South Korea",1950],[14391,69.392,1908001,"New Zealand",1950],[11452,71.492,3265278,"Norway",1950],[4670,59.123,24824013,"Poland",1950],[7514,57.084,102798657,"Russia",1950],[3103,42.5164,21238496,"Turkey",1950],[11135,68.58,50616012,"United Kingdom",1950],[15319,67.988,157813040,"United States",1950],[12229,68.8378,8417640,"Australia",1951],[12419,68.519,14099994,"Canada",1951],[582,40.936264,558820362,"China",1951],[9245,60.18618,6051290,"Cuba",1951],[7738,65.5708,4049689,"Finland",1951],[8301,66.3308,42071027,"France",1951],[7884,67.18742266,70111671,"Germany",1951],[8350,71.0438,144928,"Iceland",1951],[908,34.95868,382231042,"India",1951],[2728,61.0706,83794452,"Japan",1951],[729,23.12128,10248496,"North Korea",1951],[753,40.88998,19304737,"South Korea",1951],[13032,69.2654,1947802,"New Zealand",1951],[11986,72.4284,3300422,"Norway",1951],[4801,59.7336,25264029,"Poland",1951],[7424,57.5768,104306354,"Russia",1951],[3701,42.78358,21806355,"Turkey",1951],[11416,68.176,50620538,"United Kingdom",1951],[16198,68.0836,159880756,"United States",1951],[12084,69.2416,8627052,"Australia",1952],[12911,68.718,14481497,"Canada",1952],[631,41.873128,570764965,"China",1952],[9446,60.82796,6180031,"Cuba",1952],[7914,66.4476,4095130,"Finland",1952],[8446,67.6276,42365756,"France",1952],[8561,67.51033952,70421462,"Germany",1952],[8120,72.4836,147681,"Iceland",1952],[912,35.62796,388515758,"India",1952],[3015,63.1132,85174909,"Japan",1952],[784,20.99616,10049026,"North Korea",1952],[809,40.40256,19566860,"South Korea",1952],[13281,69.4988,1992619,"New Zealand",1952],[12316,72.5548,3333895,"Norway",1952],[4832,60.9112,25738253,"Poland",1952],[7775,57.9696,105969442,"Russia",1952],[3963,43.25976,22393931,"Turkey",1952],[11367,69.472,50683596,"United Kingdom",1952],[16508,68.2992,162280405,"United States",1952],[12228,69.8254,8821938,"Australia",1953],[13158,69.097,14882050,"Canada",1953],[692,42.809992,580886559,"China",1953],[8192,61.46974,6304524,"Cuba",1953],[7877,66.5044,4142353,"Finland",1953],[8622,67.5644,42724452,"France",1953],[9252,67.82125638,70720721,"Germany",1953]]
            console.log(array_res)
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
