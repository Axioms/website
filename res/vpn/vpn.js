"use strict";
$(document).ready(function (){
    new ClipboardJS('.btn');
    $(".card-header").click(function () {
        let tempI = $(this).find('i')[0];
        $(this).next().toggle("slow");

        if($(tempI).hasClass('rotated')){
            $(tempI).removeClass("rotated");
        }
        else {
            $(tempI).addClass("rotated");
        }
    });
    $("#warning-button").click(function () {
        $(this).parent().toggle("slow");
    });
});
function leave() {
    $("#warning-button-mobile").parent().toggle("slow");
}