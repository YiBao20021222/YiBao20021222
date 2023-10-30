$(".studentSelect").submit(function (e) { 
    var data=$(e.target).serialize();
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "http://127.0.0.1:3000/STUDENT_SELECT",
        data: data,
        success: function (data) {
            var items="";
            for(var i=0;i<data.length;i++){
              var item=template("student_information_item_template",data[i]);
      
              items=items+item;
            }
           
            $("#student_information_item").html(items);

        }
    });
});