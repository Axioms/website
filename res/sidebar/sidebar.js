var neededTopPadding;
$(document).ready(function(){
    smallWindowSetUp();
})
function smallWindowSetUp() {
    fixIframe();
    if($(document).width() <= 768) {
        $(".sb-data").css({"height" : "0%"});
        $('div').removeAttr('style');
    }
    else {
        $("#sb-page-content").animate({"padding-top" : "0px"}, 1000, function(){});
    }
}
function smallWindowToggle() {
    if($(".sb-data").css("height") == "0px"){
        $("#sb-page-content").stop(true);
        $("#sb-page-content").animate({"padding-top" : "69%"}, 1000, function(){});
        $(".sb-data").animate({height: "100%"}, 1000, function(){
            $(".sb-data").css({"height" : ""});
        });
    }
    else {
        $("#sb-page-content").stop(true);
        $("#sb-page-content").animate({"padding-top" : "0px"}, 1000, function(){});
        $(".sb-data").animate({height: "0%"},1000,function(){
            $('div').removeAttr('style');
        });
    }
}
function largeWindowToggle() {
    if($(".sb-link").css("height") == "0px") {
        $(".sb-link").animate({width: "66%", height: "100%"}, 1000, function(){
            $(".sb-link").css({height : ""});
            $('div').removeAttr('style');
        });
        $("#sb-page-content").animate({"padding-left": "20%"}, 1000, function(){});
        $(".sb-icon").animate({"font-size" : "1rem"}, 1000, function(){});
        $("#sb-main").animate({width: "20%"}, 1000, function(){});
        $("#win-toggle-a").prop("title", "Collapse");
        flipArrow();
    }
    else {
        $(".sb-link").animate({width: "0px", height: "0px"}, 1000, function(){       
        });
        $("#sb-page-content").animate({"padding-left": "10%"}, 1000, function(){});
        
        $(".sb-icon").animate({"font-size" : "2rem"}, 1000, function(){});
        $("#sb-main").animate({width: "10%"}, 1000, function(){});
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
function clean() {
    $('div').removeAttr('style');
}
function fixIframe() {
    $('iframe').removeAttr('style');
}
function getDocHeight(doc) {
    doc = doc || document;
    // stackoverflow.com/questions/1145850/
    var body = doc.body, html = doc.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    return height;
}
function setIframeHeight(id) {
    var ifrm = document.getElementById(id);
    var doc = ifrm.contentDocument? ifrm.contentDocument: 
        ifrm.contentWindow.document;
    ifrm.style.visibility = 'hidden';
    ifrm.style.height = "10px"; // reset to minimal height ...
    // IE opt. for bing/msn needs a bit added or scrollbar appears
    ifrm.style.height = getDocHeight( doc ) + 4 + "px";
    ifrm.style.visibility = 'visible';
}