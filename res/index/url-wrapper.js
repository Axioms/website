"use strict";
var siteHistory = [];
function changePage() {
    if(window.location.hash != '') {
        let pageHash = window.location.hash.substr(1);
        //needed to replace the iframe because popstate was implicitly selecting it
        $("#page-content-wrapper").replaceWith(('<iframe name="frame" id="page-content-wrapper" frameBorder="0" src="' + pageHash +'">'));
        siteHistory.push(pageHash);
        window.history.replaceState(siteHistory, "Axiom\'s Website", "/#" + pageHash);
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
        changePage();
    }
});