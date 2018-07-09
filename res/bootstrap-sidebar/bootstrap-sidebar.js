$(document).ready(function(){
    smallWindowSetUp();
})
function smallWindowSetUp() {
    if($(document).width() <= 768) {
        $(".sb-data").css({"height" : "0%"});
    }
}
function smallWindowToggle() {
    if($(".sb-data").css("height") == "0px"){
        $(".sb-data").animate({height: "100%"},1000,function(){});
    }
    else {
        $(".sb-data").animate({height: "0%"},1000,function(){});
    }
}