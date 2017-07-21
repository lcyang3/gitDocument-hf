var artTemplate = {
    /**
     * 渲染模版
     * @param  {[type]} url    [description]
     * @param  {[type]} target [description]
     * @param  {[type]} data   [description]
     * @return {[type]}        [description]
     */
    loadTemplate: function(url, target, data, _callback) {
        var _self = this;
        if (!!url) {
            _self.getData(url, target, data, _callback);
        } else {
            _self.renderTpl(target, data, _callback);
        }
    },

    /**
     * 从后台获取数据;
     * @param  {[type]} url    [description]
     * @param  {[type]} target [description]
     * @param  {[type]} data   [description]
     * @return {[type]}        [description]
     */
    getData: function(url, target, data, _callback) {
        var _self = this;
        $.ajax({
            type: "GET",
            url: url,
            data: data,
            dataType: "json",
            success: function(response, status, xhr) {
                if (xhr.status != 200 || response.code != "0000") {
                    alert("请求失败");
                } else {
                    initData = response;
                    _self.renderTpl(target, initData, _callback);
                }
            }
        });
    },

    /**
     * 通过template渲染页面
     * @param  {[type]} target [description]
     * @param  {[type]} data   [description]
     * @return {[type]}        [description]
     */
    renderTpl: function(target, data, _callback) {
        var _dom = template(target, data);
        $('.template-main').addClass("animated fadeIn");
        $('.template-main').html(_dom);
        setTimeout(function() {
            $('.template-main').removeClass("animated fadeIn");
        }, 200);
        if (!!_callback && typeof _callback === "function") {
            _callback();
        }
    },

    /**
     * 默认引入target页面js
     * @param  {[type]} target [description]
     * @return {[type]}        [description]
     */
    loadJs: function(target) {
        var jsLocation = "./dist/pagejs/" + target + ".min.js";
        $.ajax({
            url: jsLocation,
            dataType: "script",
            cache: true
        });
    }
}
