function changePage() {
    if(window.location.href.split('#')[1] != undefined) {
    $("#page-content-wrapper").attr("src", window.location.href.split('#')[1] + "/" + window.location.href.split('#')[1] + ".html");
    }
}