;
(function(hf) {
    if (!hf.appConfig.loading) { var _order_loading = $.dialog(); }
    var router = hf.router;
    $("header .header-left").addClass("hidden"); // 隐藏返回按钮
    $("footer.index-list").removeClass("hidden"); //底部菜单显示
    $("footer.searchList").addClass("hidden"); // 隐藏搜索页面底部
    animate.animateText($("header span.title"), "订票、退票/改签", "fadeIn");
    artTemplate.loadTemplate("", "order/order", {}); //初始化页面内容
    /**
     * 显示默认选项夹
     */
    var _default_content = hf.appParam.orderCurrItem || $("#order .tab-list .tab-li.active").attr("data-target");
    $("#order .tab-list .tab-li.active").removeClass("active");
    $("#order .tab-list .tab-li[data-target='" + _default_content + "']").addClass("active");
    $("#order .tab-content .tab-content-box[data-target='" + _default_content + "']").removeClass("hidden");
    $("#order .tab-list .flag-active").css("left", $("#order .tab-list .tab-li.active").offset().left);
    $("#order .tab-list .flag-active").removeClass("hidden");
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
            $("#order .tab-list .flag-active").css("left", $("#order .tab-list .tab-li.active").offset().left);
            _default_content = _this_target;
        }
        _tab_dialog.close(); //关闭加载框
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
        $(this).attr("data-title", "北京-杭州");
        hf.appParam.orderSearchParam = {
            startStation: "北京",
            endStation: "杭州",
            startTime: "2017-07-19",
            endTime: "2017-07-22"
        }
        router.on("order/searchList", function() {
            hf.directorFn("order/searchList");
        });
        hf.forwardFlag = true;
        hf.forward($(this).attr("data-href"));
    });

    // 初始化出发时间;default：当前时间+1天
    var startTime = new Date();
    startTime.setDate(new Date().getDate() + 1);
    $("input[data-ele='input'][data-type='time'][data-id='startTime']").val(tools.formatTime(startTime, "yyyy年M月dd日"));
    $("input[data-ele='input'][data-type='time'][data-id='startTime']").attr("data-time", tools.formatTime(startTime, "yyyy-MM-dd"));
    // 初始化出发时间 end
    /**
     * 打开时间选择页
     */
    $("body").off("click", "input[data-ele='input'][data-type='time']").on("click", "input[data-ele='input'][data-type='time']", function() {
        var _self = this;
        var _id = "order-timebox";
        var _data_id = $(this).attr("data-id");
        $("body").append(template("base/time", {
            id: _id,
            _data_id: _data_id,
            currYear: new Date().getFullYear(),
            currMonth: new Date().getMonth() + 1,
            currDay: new Date().getDate(),
            currTime: tools.formatTime(new Date(), "yyyy-MM-dd"),
            startTime: $("input[data-id='startTime']").attr("data-time") || "",
            endTime: $("input[data-id='endTime']").attr("data-time") || ""
        }));
        setTimeout(function() {
            $("#" + _id).css("top", 0);
        }, 100)
    });
    /**
     * 关闭时间选择器
     */
    $("body").off("click", ".time-box header span[data-id='close']").on("click", ".time-box header span[data-id='close']", function() {
        var _self = $(this).parents(".time-box");
        _self.css("top", "100%");
        setTimeout(function() {
            $(_self).remove();
        }, 300);
    });

    /**
     * 打开地点选择页
     */
    $("body").off("click", "input[data-ele='input'][data-type='address']").on("click", "input[data-ele='input'][data-type='address']", function() {
        var _self = this;
        var _id = "order-addressbox";
        var _data_id = $(this).attr("data-id");
        $("body").append(template("base/address", {
            id: _id,
            _data_id: _data_id,
            gps: "广州",
            history: ["北京","上海","广州","长沙"],
            hot: ["北京","上海","广州","长沙"],
            _city_domestic: City.domestic,
            _city_international: City.international
        }));
        setTimeout(function() {
            $("#" + _id).css("top", 0);
        }, 100)
    });
    /**
     * 关闭地点选择页
     */
    $("body").off("click", ".address-box header span[data-id='close']").on("click", ".address-box header span[data-id='close']", function() {
        var _self = $(this).parents(".address-box");
        _self.css("top", "100%");
        setTimeout(function() {
            $(_self).remove();
        }, 300);
    });


    /**
     * 选取时间
     */
    $("body").off("click", "#order-timebox .month-box .days .days-item:not(.disable)").on("click", "#order-timebox .month-box .days .days-item:not(.disable)", function() {
        var _parent = $(this).parents("#order-timebox");
        var _click_time = $(this).find(".day").attr("data-time");
        var _start_time = $("#order-timebox .days-item.start .day").attr("data-time");
        var _end_time = $("#order-timebox .days-item.end .day").attr("data-time");
        if (_parent.attr("data-type") == "startTime") {
            if (!!_end_time && new Date(_click_time).getTime() >= new Date(_end_time).getTime()) {
                $.dialog({
                    content: "去程日期必须小于返程日期",
                    title: "alert",
                    time: 1000
                });
                return;
            }
            if (!!_start_time && new Date(_click_time).getTime() == new Date(_start_time).getTime()) {
                $("input[data-id='startTime']").val("");
                $("input[data-id='startTime']").attr("data-time", "");
            } else {
                $("input[data-id='startTime']").val(tools.formatTime(new Date(_click_time), "yyyy年M月dd日"));
                $("input[data-id='startTime']").attr("data-time", _click_time);
            }
        } else {
            if (!!_start_time && new Date(_click_time).getTime() <= new Date(_start_time).getTime()) {
                $.dialog({
                    content: "返程日期必须大于去程日期",
                    title: "alert",
                    time: 1000
                });
                return;
            }
            if (!!_end_time && new Date(_click_time).getTime() == new Date(_end_time).getTime()) {
                $("input[data-id='endTime']").val("");
                $("input[data-id='endTime']").attr("data-time", "");
            } else {
                $("input[data-id='endTime']").val(tools.formatTime(new Date(_click_time), "yyyy年M月dd日"));
                $("input[data-id='endTime']").attr("data-time", _click_time);
            }

        }
        _parent.css("top", "100%");
        setTimeout(function() {
            _parent.remove();
        }, 300);
    });

    hf.appParam.orderCurrItem = _default_content; //保存当前选项夹
    if (!hf.appConfig.loading) { _order_loading.close(); }
    hf.appConfig.loading.close();
})(hf);