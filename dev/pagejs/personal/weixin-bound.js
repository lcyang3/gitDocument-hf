;
(function(hf) {
    var _dialog = $.dialog();
    var _submit = null;
    var requestParam = tools.getReqParam();
    $("header .header-left").addClass("hidden");
    $("footer.index-list").addClass("hidden");
    animate.animateText($("header span.title"), "微信解绑", "fadeIn");
    artTemplate.loadTemplate("", "personal/weixin-bound", {});
    /**
     * 解除绑定
     */
    $("body").off("click", "#personal-weixin a[data-type='cancel']").on("click", "#personal-weixin a[data-type='cancel']", function() {
    	_submit = $.dialog();
        $.ajax({
            url: tools.getProjectPath() + "weixin/api/unbindOpenId",
            data: {
                openId: requestParam.openId
            },
            success: function(data, status, xhr) {
                _submit.close(); //关闭加载框
                if (data.code == "0000") {
                    $.dialog({
                        content: "解除绑定成功，请关闭页面后重新访问",
                        title: "alert",
                        time: 2000
                    });
                } else {
                    $.dialog({
                        content: data.msg,
                        title: "alert",
                        time: 2000
                    });
                }

            },
            error: function(data, status, xhr) {
                _submit.close(); //关闭加载框
                $.dialog({
                    content: "绑定失败：数据请求异常",
                    title: "alert",
                    time: 2000
                });
            },
        });
    })
    _dialog.close(); //关闭加载框
})(hf);