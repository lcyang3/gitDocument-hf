;
(function(hf) {
    var _dialog = $.dialog();
    var router = hf.router;
    $("header .header-left").removeClass("hidden"); // 隐藏返回按钮
    $("footer.index-list").addClass("hidden"); //底部菜单隐藏
    $("footer.searchList").removeClass("hidden"); // 显示搜索页面底部
    artTemplate.loadTemplate("", "order/searchList", {}); //初始化页面内容
    var startStation = hf.appParam.orderSearchParam.startStation; //起点
    var endStation = hf.appParam.orderSearchParam.endStation;	//终点
    var startTime = hf.appParam.orderSearchParam.startTime; //出发时间
    var endTime = hf.appParam.orderSearchParam.endTime; // 返回时间
    var currTime = tools.formatTime(new Date(),"yyyy-MM-dd"); // 当前时间
    

    if(startTime === currTime){
    	console.info(true);
    }

    $(".flight-result").html(template("order/searchList/listItem", {
    	data:["1","2","3","4","5","6","7","8","9","10"]
    }));


    /**
     * 排序
     */
    $("body").off("click", "footer.searchList li").on("click", "footer.searchList li", function() {
        var _this_i_actve = $(this).find("i.active");
        if (_this_i_actve.hasClass("fa-caret-up")) {
            _this_i_actve.removeClass("active");
            _this_i_actve.siblings().addClass("active");
            $(this).find("span span").text("价格高到低");
        } else if (_this_i_actve.hasClass("fa-caret-down")) {
            _this_i_actve.removeClass("active");
            _this_i_actve.siblings().addClass("active");
            $(this).find("span span").text("价格低到高");
        } else {}
    });
    _dialog.close();
})(hf);