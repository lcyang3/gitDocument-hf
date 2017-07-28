;
(function(hf) {
    $("header .header-left").removeClass("hidden");
    $("footer.index-list").addClass("hidden");
    artTemplate.loadTemplate("", "personal/service", {});
    hf.appConfig.loading.close();
})(hf);