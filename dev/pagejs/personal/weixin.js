;
(function(hf) {
    var _dialog = $.dialog();
    var _submit = null;
    var requestParam = tools.getReqParam();
    animate.animateText($("header span.title"), "微信绑定", "fadeIn");
    $("header .header-left").addClass("hidden");
    $("footer.index-list").addClass("hidden");
    artTemplate.loadTemplate("", "personal/weixin", {
        baseUrl: tools.getProjectPath()
    });
    /**
     * 提交表单
     */
    $("body").off("click", "#personal-weixin a[data-type='submit']").on("click", "#personal-weixin a[data-type='submit']", function() {
        _submit = $.dialog();
        $("#personal-weixin form.personal-weixin-box").submit();
    })

    /**
     * 获取验证码--点击
     */
    $("body").off("click", "span.identifying-code:not(.disable)").on("click", "span.identifying-code:not(.disable)", function() {
        var _this = this;
        var telNum = $("input[data-descriptions='phone']").val();
        if (!telNum) {
            $.fieldTooltip.show($.errorTipFormat("请输入手机号"));
        } else if (!telNum.match(/^0?1[3|4|5|8][0-9]\d{8}$/)) {
            $.fieldTooltip.show($.errorTipFormat("请输入合法手机号"));
        } else {
            $.ajax({
                url: tools.getProjectPath() + "weixin/api/getSmsCode",
                data: {
                    telNum: telNum
                },
                success: function(data, status, xhr) {
                    if (data.code != "0000") {
                        $.dialog({
                            content: data.msg,
                            title: "alert",
                            time: 2000
                        });
                    } else {
                        $.dialog({
                            content: "请注意查收,有效期为10分钟",
                            title: "alert",
                            time: 2000
                        });
                        $(_this).addClass("disable");
                        var _flag = 60;
                        var ii = setInterval(function() {
                            $(_this).find("span").text("("+ (_flag--) + ")");
                            if (_flag === 0) {
                                $(_this).find("span").text("");
                                $(_this).removeClass("disable");
                                clearInterval(ii);
                            }
                        }, 1000);
                    }
                },
                error: function(data, status, xhr) {
                    $.dialog({
                        content: "发送短信失败，请稍后重试",
                        title: "alert",
                        time: 2000
                    });
                },
            });
        }
    });

    /**
     * 验证表单
     */
    $("#personal-weixin form.personal-weixin-box").mvalidate({
        sendForm: false,
        descriptions: {
            name: {
                required: '请输入姓名',
                pattern: '请输入合法姓名'
            },
            certificate: {
                required: '请输入证件号码',
                pattern: '请输入合法证件号码'
            },
            phone: {
                required: '请输入手机号',
                pattern: '请输入合法手机号'
            },
            identifyingCode: {
                required: '请输入验证码'
            }
        },
        valid: function(event, options) {
            $.ajax({
                url: tools.getProjectPath() + "weixin/api/bindOpenId",
                data: {
                    openId: requestParam.openId,
                    userName: $("input[data-descriptions='name']").val(),
                    identityType: $("select[data-descriptions='identityType']").val(),
                    identityCard: $("input[data-descriptions='certificate']").val(),
                    telNum: $("input[data-descriptions='phone']").val(),
                    verifyCode: $("input[data-descriptions='identifyingCode']").val()
                },
                success: function(data, status, xhr) {
                    _submit.close(); //关闭加载框
                    if (data.code == "0000") {
                        $.dialog({
                            content: data.msg /*+ ",即将跳转主页。"*/,
                            title: "alert",
                            time: 2000/*,
                            callback: function() {
                                hf.forward("#order/order");
                            }*/
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
        },
        invalid: function() {
            _submit.close(); //关闭加载框
        }
    });
    _dialog.close(); //关闭加载框
})(hf);