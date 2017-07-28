;
var hf = (function() {
    var _ignore_back = ["#order/order", "#flight/flight", "#personal/personal"];
    var _init_url = ["#base/404", "#base/500", "#personal/weixin","#personal/weixin-bound"];
    var _click = 0;

    return {
        router: {},
        appParam: {},
        appConfig: {
            beforeUrl: "",
            currUrl: "",
        },
        forwardFlag: true,
        myDropload: null,

        /**
         * 初始化方法
         */
        init: function() {
            var _self = this;
            window.addEventListener("load", function() {
                FastClick.attach(document.body); //加快click事件处理时间（插件）
                $("body").on("click", ".hf-back", function() { //当左上角返回键被点击时
                    _self.back();
                });
                _self.loadEven();
                _self.dropload();
            }, false);
        },
        /**
         * 返回事件
         */
        back: function() {
            history.back();
        },
        /**
         * 底部菜单事件
         */
        loadEven: function() {
            var _self = this;
            $("body").off("click", "footer.index-list ul li[data-ele='artTemplate']").on("click", "footer.index-list ul li[data-ele='artTemplate']", function() {
                $("footer.index-list ul li.active").removeClass("active");
                $(this).addClass("active");
                _self.forward($(this).attr("data-href"));
            });
        },
        /**
         * 跳转页面
         * @param  {[String]} _href     [要天跳转的url]
         * @param  {[function]} _callback [回调函数]
         */
        forward: function(_href, _callback) {
            var _self = this;
            _self.forwardFlag = true;
            if (window.location.hash !== _href) {
                _self.appConfig.loading = $.dialog();
            }
            if (!!_callback && typeof _callback === "function") {
                _callback();
            }
            window.location.href = _href;
        },
        /**
         * 初始化路由
         * @param  {[ArrayList]} routesList [路由列表]
         */
        director: function(routesList) {
            var _self = this;
            var routes = {};
            $.each(_init_url, function() {
                var routerItem = this.substring(1);
                routes[routerItem] = function() {
                    _self.directorFn(routerItem);
                }
            });
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
        /**
         * 路由跳转后执行的方法
         * @param  {[object]} routerItem [路由]
         */
        directorFn: function(routerItem) {
            var _self = this;
            console.info("#" + routerItem + " -----------0---------- " + _self.appConfig.beforeUrl);
            if (!_self.forwardFlag && _ignore_back.indexOf("#" + routerItem) !== -1 && _ignore_back.indexOf(_self.appConfig.beforeUrl) !== -1 && routerItem !== "order/order") {
                _self.forward("#order/order");
                return;
            }
            if (_self.appConfig.beforeUrl === "#order/order" && routerItem === "personal/weixin") {
                _self.forward("#order/order");
                return;
            }
            var _element = $("*[data-ele='artTemplate'][data-href='#" + routerItem + "']");
            var _footer = _element.parents("footer.index-list");
            if (!!_footer) {
                $("footer.index-list ul li[data-ele='artTemplate'].active").removeClass("active");
                $("footer.index-list ul li[data-ele='artTemplate'][data-href='#" + routerItem + "']").addClass("active");
            }
            artTemplate.loadJs(routerItem);
            _self.appConfig.beforeUrl = "#" + routerItem;
            _self.forwardFlag = false;
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