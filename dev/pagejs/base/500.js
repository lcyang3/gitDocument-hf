;
(function(hf) {
    $("header .header-left").addClass("hidden");
    $("footer").addClass("hidden");
    animate.animateText($("header span.title"), "500", "fadeIn");
    artTemplate.loadTemplate("", "base/500", {});
    hf.appConfig.loading.close();
})(hf);