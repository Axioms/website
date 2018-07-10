function changePage() {
    $("#page-content-wrapper").attr("src", window.location.href.split('#')[1] + ".html")
}