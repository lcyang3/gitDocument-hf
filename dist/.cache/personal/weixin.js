/*TMODJS:{"version":56,"md5":"5b27564705011ca7565308777383bf54"}*/
template('personal/weixin','<div id="personal-weixin"> <form class="personal-weixin-box"> <div class="title box-img"> <img src="./dist/images/toux.jpg"> </div> <div class="box"> <div class="box-li"> <span class="label">姓名</span> <input class="enter" type="text" placeholder="请输入姓名" data-required="true" data-descriptions="name" data-pattern="^[\\u4e00-\\u9fa5_a-zA-Z0-9]+$"> <i class="iconfont icon-questionfill pull-right"></i> </div> <div class="box-li"> <span class="label">证件类型</span> <select class="enter" data-descriptions="identityType"> <option value="0">身份证</option> </select> <i class="iconfont icon-right-light pull-right"></i> </div> <div class="box-li"> <span class="label">证件号码</span> <input class="enter" type="text" placeholder="请输入证件号码" data-required="true" data-descriptions="certificate" data-pattern="^[\\w]*$"> </div> <div class="box-li"> <span class="label">手机号码</span> <input class="enter" type="text" placeholder="请输入手机号码" data-required="true" data-descriptions="phone" data-pattern="^0?1[3|4|5|8][0-9]\\d{8}$"> </div> <div class="box-li"> <span class="label">验证码</span> <input class="enter identifying-code" type="text" placeholder="请输入验证码" data-required="true" data-descriptions="identifyingCode" > <span class="identifying-code">获取验证码<span></span></span> </div> </div> <div style="padding: .4rem .26rem 0 .26rem;"> <a data-type="submit" class="btn btn-red" href="javascript:;">确定绑定</a> </div> </form> </div>');