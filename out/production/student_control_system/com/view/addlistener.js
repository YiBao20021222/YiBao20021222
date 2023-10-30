$(function () {

  var li=$($(".student_select_box").children("ul").children()[0])
  var badge=li.children(".menu").children(".badge");
  var h4=li.children(".menu").children("h4");
  var it=li.children("form");
li.siblings().children("div").children("span").val("close").text("open");
li.siblings().children("form").hide();
var lis=li.siblings();
$.each(lis, function (indexInArray, valueOfElement) { 
  var fadeout=".panel"+$(valueOfElement).attr("index");
  $(fadeout).fadeOut();
});
badge.val("open").text("close");
var fadein=".panel"+li.attr("index");
$(fadein).fadeIn();
var text=h4.text().replace("---------","")
h4.text(text);
it.slideDown();  
  
});




$(".menu .badge").hover(function (e) {
    // over
    $(e.target).css("background-color","gold");
  
  }, function (e) {
    // out
    $(e.target).css("background-color","#777777");
  }
);
$(".menu .badge").click(function (e) { 
    var badge=$(e.target);
    var h4=badge.prev();
    var it=badge.parent().next();
    var li=badge.parent().parent();
    if(badge.val()!="open"){
      li.siblings().children("div").children("span").val("close").text("open");
      li.siblings().children("form").hide();
      var lis=li.siblings();

      $.each(lis, function (indexInArray, valueOfElement) { 
        var fadeout=".panel"+$(valueOfElement).attr("index");
        $(fadeout).fadeOut();
      });
      badge.val("open").text("close");
      var fadein=".panel"+li.attr("index");
     
      $(fadein).fadeIn();

      var text=h4.text().replace("---------","")
      h4.text(text);
      it.slideDown();
    }else{
      badge.val("close").text("open");
      var fadeout=".panel"+li.attr("index");
      $(fadeout).fadeOut();
      var text=badge.prev().text()+"---------";
      h4.text(text);
      it.slideUp();
    }
    e.preventDefault();
    $(".studentItem .badge").hover(function (e) {
            // over
            $(e.target).css("background-color","gold");
        }, function (e) {
            // out
            $(e.target).css("background-color","#777777");
        }
    );
    $(".studentItem .badge").click(function (e) { 
        e.preventDefault();
        var badge=$(e.target);
        var li=badge.parent();
        var index=parseInt(li.attr("index"));
        var ul=badge.parent().parent();
        var next=ul.parent().parent().parent();
        var length=parseInt(ul.children().length);
        if(badge.text()=="next"){
          var height=(parseInt(li.css("height"))+10)*index;
          if(length!=index){
            for(var i=1;i<=length;i++){
                next=next.next();
              if(parseInt(next.attr("index"))==index+1){
                  next.show();
              }else{
                  next.hide();
              }
            }
            ul.animate({ marginTop: `-${height}px`},200);
          }
        }else{
          var height=(parseInt(li.css("height"))+10)*(index-2);
          if(index!=1){
            for(var i=1;i<=length;i++){
              next=next.next();
              if(parseInt(next.attr("index"))==index-1){
                  next.show();
              }else{
                  next.hide();
              }
            }
            ul.animate({ marginTop: `-${height}px`},200);
          }
        }
    
    });
    
});