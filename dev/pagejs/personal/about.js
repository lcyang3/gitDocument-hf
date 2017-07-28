;
(function(hf) {
    $("header .header-left").removeClass("hidden");
    $("footer.index-list").addClass("hidden");
    artTemplate.loadTemplate("", "personal/about", {});
    hf.appConfig.loading.close();
})(hf);