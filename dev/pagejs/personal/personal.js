;
(function(hf) {
    $("header .header-left").addClass("hidden");
    $("footer.index-list").removeClass("hidden");
    animate.animateText($("header span.title"), "个人中心", "fadeIn");
    artTemplate.loadTemplate("", "personal/personal", {});
    var router = hf.router;
    $("#personal .box .box-li[data-ele='artTemplate']").each(function(index, element) {
        var _router_item = $(element).attr("data-href").substring(1);
        var _router_path = _router_item.split("\/");
        if (!router["routes"][_router_path[0]][_router_path[1]]) {
            router.on(_router_item, function() {
                hf.directorFn(_router_item);
            });
        } else {
            router["routes"][_router_path[0]][_router_path[1]]["on"] = function() {
                hf.directorFn(_router_item);
            }
        }
    });
    $("body").off("click", "#personal .box .box-li[data-ele='artTemplate']").on("click", "#personal .box .box-li[data-ele='artTemplate']", function() {
        hf.forwardFlag = true;
        hf.forward($(this).attr("data-href"));
    });
    hf.appConfig.loading.close();
})(hf);