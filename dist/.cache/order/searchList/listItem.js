/*TMODJS:{"version":12,"md5":"240baf1eb50e74d817b4e63871fe044d"}*/
template('order/searchList/listItem',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,item=$data.item,i=$data.i,$out='';$each(data,function(item,i){
$out+=' <div class="flight-li"> <div class="flight-li-first"> <div class="cell01"> <span>22:00</span> </div> <div class="cell02"> </div> <div class="cell03"> <span>23:00</span> <span class="flag">+1天</span> </div> <div class="cell04"> <span class="flag">少量</span> <span><span style="font-size: 0.28rem;">&yen;&nbsp;</span><span>850</span></span> </div> </div> <div class="flight-li-last"> <div class="cell01"> <span>首都A1</span> </div> <div class="cell02"> <span>萧山T3</span> </div> </div> <div class="flight-info"> <i class="">xx</i>海航JD3526|波音321(中) </div> </div> ';
});
return new String($out);
});