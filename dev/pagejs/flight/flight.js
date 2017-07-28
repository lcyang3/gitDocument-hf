;
(function(hf) {
    $("header .header-left").addClass("hidden");
    $("footer.index-list").removeClass("hidden");
    animate.animateText($("header span.title"), "航班收藏", "fadeIn");
    artTemplate.loadTemplate("", "flight/flight", {});
    hf.appConfig.loading.close();
})(hf);