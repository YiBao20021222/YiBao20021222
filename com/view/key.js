var key=8
function keyparse(data) {
    var newdata="";
    for(var i=0;i<data.length;i++){
        var j=i;
        while(j>key.length){
            j=i%(key.length);
        }
        newdata+=String.fromCharCode(data.charCodeAt(i)^key)
    }
    return newdata;
}
