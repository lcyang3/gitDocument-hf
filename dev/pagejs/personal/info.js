;
(function(hf) {
    $("header .header-left").removeClass("hidden");
    $("footer.index-list").addClass("hidden");
    artTemplate.loadTemplate("", "personal/info", {});
    hf.appConfig.loading.close();
})(hf);