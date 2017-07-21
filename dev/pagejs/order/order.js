;
(function(hf) {
    var _dialog = $.dialog();
    var router = hf.router;
    $("header .header-left").addClass("hidden"); // 隐藏返回按钮
    $("footer.index-list").removeClass("hidden"); //底部菜单显示
    $("footer.searchList").addClass("hidden"); // 隐藏搜索页面底部
    artTemplate.loadTemplate("", "order/order", {}); //初始化页面内容
    /**
     * 显示默认选项夹
     */
    var _default_content = hf.appParam.orderCurrItem || $("#order .tab-list .tab-li.active").attr("data-target");
    $("#order .tab-list .tab-li.active").removeClass("active");
    $("#order .tab-list .tab-li[data-target='" + _default_content + "']").addClass("active");
    $("#order .tab-content .tab-content-box[data-target='" + _default_content + "']").removeClass("hidden");
    /**
     * 模拟加载
     */
    setTimeout(function() {
        _dialog.close(); //关闭加载框
    }, 1000);
    /**
     * 选项夹切换
     */
    $("body").off("click", "#order .tab-list .tab-li").on("click", "#order .tab-list .tab-li", function() {
        var _tab_dialog = $.dialog();
        var _this_target = $(this).attr("data-target");
        if (_this_target !== _default_content) {
            $("#order .tab-list .tab-li.active").removeClass("active");
            $(this).addClass("active");
            $("#order .tab-content .tab-content-box[data-target='" + _default_content + "']").addClass("hidden");
            $("#order .tab-content .tab-content-box[data-target='" + _this_target + "']").removeClass("hidden");
            _default_content = _this_target;
        }
        /**
         * 模拟加载
         */
        setTimeout(function() {
            _tab_dialog.close(); //关闭加载框
        }, 1000);
        hf.appParam.orderCurrItem = _default_content; //保存当前选项夹
    });

    /**
     * 清除历史记录
     */
    $("body").off("click", "#order .history .history-clear").on("click", "#order .history .history-clear", function() {
        /**
         * 请求后台，清除历史
         */
        $(this).parents("p").remove();
    });

    /**
     * 查询飞机票
     */
    $("body").off("click", "a[data-name='flight-search']").on("click", "a[data-name='flight-search']", function() {
        $(this).attr("data-title","北京-杭州");
        hf.appParam.orderSearchParam = {
            startStation : "北京",
            endStation: "杭州",
            startTime:"2017-07-19",
            endTime:"2017-07-22"
        }
        router.on("order/searchList",function(){
            hf.directorFn("order/searchList");
        });
        hf.forwardFlag = true;
        hf.forward($(this).attr("data-href"));
    });

    hf.appParam.orderCurrItem = _default_content; //保存当前选项夹
})(hf);