;
var hf = (function() {
    var ignore_back = ["#order/order", "#flight/flight", "#personal/personal"];
    var error_url = ["#base/404","#base/500"]

    return {
        router: {},
        appParam: {},
        appConfig: {
            beforeUrl: "#order/order"
        },
        forwardFlag: false,
        myDropload: null,
        init: function() {
            var _self = this;
            window.addEventListener("load", function() {
                FastClick.attach(document.body);
                $("body").on("click", ".hf-back", function() {
                    _self.back();
                });
                _self.loadEven();
                if (window.history && window.history.pushState) {
                    $(window).on('popstate', function() {
                        var _curr_href = window.location.hash;
                        if (!_self.forwardFlag) {
                            if (ignore_back.indexOf(_curr_href) !== -1) {
                                console.info("1");
                            }
                        }
                        _self.forwardFlag = false;
                    });
                };
                _self.dropload();
            }, false);
        },
        back: function() {
            var _self = this;
            var _curr_href = window.location.hash;
            if (error_url.indexOf(_curr_href) !== -1) {
                window.location.href = "#order/order";
                return;
            }
            history.back();
        },
        loadEven: function() {
            var _self = this;
            $("body").off("click", "footer.index-list ul li[data-ele='artTemplate']").on("click", "footer.index-list ul li[data-ele='artTemplate']", function() {
                $("footer.index-list ul li.active").removeClass("active");
                $(this).addClass("active");
                _self.forwardFlag = true;
                _self.forward($(this).attr("data-href"));
            });
        },
        forward: function(_href, _callback) {
            var _self = this;
            _self.appConfig.beforeUrl = window.location.hash;
            window.location.href = _href;
            if (!!_callback && typeof _callback === "function") {
                _callback();
            }
        },
        director: function(routesList) {
            var _self = this;
            var routes = {
                "base/404": function() {
                    _self.directorFn("base/404");
                },
                "base/500": function() {
                    _self.directorFn("base/500");
                },
                "personal/weixin": function() {
                    _self.directorFn("personal/weixin");
                }
            };
            $.each(routesList, function() {
                var routerItem = this.substring(1);
                routes[routerItem] = function() {
                    _self.directorFn(routerItem);
                }
            })
            _self.router = Router(routes).configure({
                notfound: function() {
                    _self.forward("#base/404");
                }
            }); //装载路由列表
            _self.router.init("order/order"); // 默认显示路由
        },
        directorFn: function(routerItem) {
            var _curr_href = window.location.hash;
            var _element = $("*[data-ele='artTemplate'][data-href='#" + routerItem + "']");
            var _footer = _element.parents("footer.index-list");
            if (!!_footer) {
                $("footer.index-list ul li[data-ele='artTemplate'].active").removeClass("active");
                $("footer.index-list ul li[data-ele='artTemplate'][data-href='#" + routerItem + "']").addClass("active");
            }
            if (!!_element.attr("data-title")) {
                animate.animateText($("header span.title"), _element.attr("data-title"), "fadeIn");
            }
            artTemplate.loadJs(routerItem);
            return false;
        },
        dropload: function() {
            /**
             * 下拉刷新
             */
            myDropload = $("#scroll").dropload({
                autoLoad: false,
                scrollArea: window,
                loadUpFn: function(me) {
                    scroll(0, 0);
                    setTimeout(function() {
                        var _curr_href = window.location.hash;
                        artTemplate.loadJs(_curr_href.substring(1));
                        scroll(0, 0);
                        me.resetload();
                    }, 1000);
                },
                loadDownFn: ''
            });
        }
    }
})();
window.hf = hf;