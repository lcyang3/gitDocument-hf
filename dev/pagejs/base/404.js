;
(function(hf) {
    $("header .header-left").addClass("hidden");
    $("footer").addClass("hidden");
    animate.animateText($("header span.title"), "404", "fadeIn");
    artTemplate.loadTemplate("", "base/404", {});
    hf.appConfig.loading.close();
})(hf);