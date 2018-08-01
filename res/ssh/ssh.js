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
});

var type, localPort, remotePort, localAddress, remoteAddress;
var modifiers = "";

function setType(val) {
    type = val;
    if (type == "-D") {
        $("#localAddress").prop('disabled', true);
        $("#remotePort").prop('disabled', true);
    }
    else {
        $("#localAddress").prop('disabled', false);
        $("#remotePort").prop('disabled', false);
    }
}
function setLocalPort(val) {
    localPort = val;
}
function setRemotePort(val) {
    remotePort = val;
}
function setLocalAddress(val) {
    localAddress = val;
}
function setModifiers(val) {
    modifiers = val;
}
function setRemoteAddress(val) {
    remoteAddress = val;
}
function makeSSHForward() {
    if (type == "-L")
        var temp = "ssh " + modifiers + " " + type + " " + localPort + ":" + localAddress + ":" + remotePort + " " + remoteAddress;
    else if ( type == "-R") 
        var temp = "ssh " + modifiers + " " + type + " " + remotePort + ":" + localAddress + ":" + localPort + " " + remoteAddress;
    else 
        var temp = "ssh " + modifiers + " " + type + " " + localPort + " " + remoteAddress;
    $("#ssh-forward").attr("value", temp);
}