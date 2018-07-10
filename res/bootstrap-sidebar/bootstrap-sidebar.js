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
function largeWindowToggle() {
    if($(".sb-link").css("height") == "0px") {
        $(".sb-link").animate({width: "66%", height: "100%"}, 1000, function(){});
        $("#sb-main").animate({width: "20%"}, 1000, function(){});
        $("#win-toggle-a").prop("title", "Collapse");
        flipArrow();
    }
    else {
        $(".sb-link").animate({width: "0px", height: "0px"}, 1000, function(){});
        $("#sb-main").animate({width: "5%"}, 1000, function(){});
        $("#win-toggle-a").prop("title", "Expand");
        flipArrow();
    }
}
function flipArrow() {
    if($("#arrow").hasClass("fa-arrow-left")) {
        $("#arrow").removeClass("fa-arrow-left");
        $("#arrow").addClass("fa-arrow-right");
    }
    else {
        $("#arrow").removeClass("fa-arrow-right");
        $("#arrow").addClass("fa-arrow-left");
    }
}