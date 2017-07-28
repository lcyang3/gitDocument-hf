;
var tools = {
    /**
     * 格式化时间
     * @param now
     * @param mask
     * @returns
     */
    formatTime: function(now, mask) {
        var _self = this;
        var d = now;
        return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function($0) {
            switch ($0) {
                case 'd':
                    return d.getDate();
                case 'dd':
                    return _self.zeroize(d.getDate());
                case 'ddd':
                    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
                case 'dddd':
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
                case 'ddCh':
                    return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][d.getDay()];
                case 'M':
                    return d.getMonth() + 1;
                case 'MM':
                    return _self.zeroize(d.getMonth() + 1);
                case 'MMM':
                    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
                case 'MMMM':
                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
                case 'yy':
                    return String(d.getFullYear()).substr(2);
                case 'yyyy':
                    return d.getFullYear();
                case 'h':
                    return d.getHours() % 12 || 12;
                case 'hh':
                    return _self.zeroize(d.getHours() % 12 || 12);
                case 'H':
                    return d.getHours();
                case 'HH':
                    return _self.zeroize(d.getHours());
                case 'm':
                    return d.getMinutes();
                case 'mm':
                    return _self.zeroize(d.getMinutes());
                case 's':
                    return d.getSeconds();
                case 'ss':
                    return _self.zeroize(d.getSeconds());
                case 'l':
                    return _self.zeroize(d.getMilliseconds(), 3);
                case 'L':
                    var m = d.getMilliseconds();
                    if (m > 99) m = Math.round(m / 10);
                    return _self.zeroize(m);
                case 'tt':
                    return d.getHours() < 12 ? 'am' : 'pm';
                case 'TT':
                    return d.getHours() < 12 ? 'AM' : 'PM';
                case 'Z':
                    return d.toUTCString().match(/[A-Z]+$/);
                    // Return quoted strings with the surrounding quotes removed
                default:
                    return $0.substr(1, $0.length - 2);
            }
        });
    },
    getCurrDays: function(data) {
        var curMonth = data.getMonth();
        data.setMonth(curMonth + 1);
        data.setDate(0);
        return data.getDate();
    },
    getFirstWeek: function(data) {
        var temp = data.getDay();
        data.setDate(1);
        return data.getDay();
    },
    zeroize: function(value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    },
    getReqParam: function() {
        var requestParam = new Array();
        var url = window.location.search;
        url = url.substring(1);
        var arr = url.split("&");
        for (var i = 0; i < arr.length; i++) {
            var vArr = arr[i].split("=");
            requestParam[vArr[0]] = decodeURI(vArr[1]);
        }
        return requestParam;
    },
    getProjectPath : function(){
        return "/huafei/";
    }

}