$(document).ready(function(){
    smallWindowSetUp();
})
function smallWindowSetUp() {
    if($(document).width() <= 768) {
        $(".sb-data").css({"display" : "none"});
    }
    else{
        $(".sb-data").css({"display" : ""});
    }
}
function smallWindowToggle() {
    if($(".sb-data").css("display") == "none"){
        $(".sb-data").css({"display" : ""});
    }
    else {
        $(".sb-data").css({"display" : "none"});
    }
}