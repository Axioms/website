"use strict";
var siteHistory = [];
var afterPopstate = false;
function changePage() {
    if(window.location.hash != '') {
        let pageHash = window.location.hash.substr(1);
        //needed to replace the iframe because popstate was implicitly selecting it
        $("#page-content-wrapper").replaceWith(('<iframe name="frame" id="page-content-wrapper" onload="setIframeHeight(this.id)" frameBorder="0" src="' + pageHash +'">'));
        if(!afterPopstate) {
            siteHistory.push(pageHash);
            window.history.replaceState(siteHistory, "Axiom\'s Website", "/#" + pageHash);
        }
    }
}
$(window).on('popstate', function (e) {
    var state = e.originalEvent.state;
    if (state !== null) {
        //load content with ajax
        let pageHash = window.location.hash.substr(1);
        console.table(siteHistory);
        siteHistory.pop();
        window.history.replaceState(siteHistory, "Axiom\'s Website", "/#" + pageHash);
        afterPopstate = true;
    }
});
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