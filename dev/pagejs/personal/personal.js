;
(function(hf) {
    $("header .header-left").addClass("hidden");
    $("footer.index-list").removeClass("hidden");
    artTemplate.loadTemplate("", "personal/personal", {});
    var router = hf.router;
    $("#personal .box .box-li[data-ele='artTemplate']").each(function(index, element) {
        var _router_item = $(element).attr("data-href").substring(1);
        router.on(_router_item, function() {
            hf.directorFn(_router_item);
        });
    });
    $("body").off("click","#personal .box .box-li[data-ele='artTemplate']").on("click", "#personal .box .box-li[data-ele='artTemplate']", function() {
        hf.forwardFlag = true;
        hf.forward($(this).attr("data-href"));
    });
})(hf);
