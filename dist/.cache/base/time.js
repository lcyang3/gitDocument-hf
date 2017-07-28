/*TMODJS:{"version":89,"md5":"6ae1919bd1c6f649c7aa911567e8e658"}*/
template('base/time',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,_data_id=$data._data_id,i=$data.i,j=$data.j,currYear=$data.currYear,parseInt=$helpers.parseInt,currMonth=$data.currMonth,currDays=$helpers.currDays,currDay=$data.currDay,checkStart=$helpers.checkStart,startTime=$data.startTime,checkEnd=$helpers.checkEnd,endTime=$data.endTime,fisrtWeek=$helpers.fisrtWeek,formatTime=$helpers.formatTime,$out='';$out+='<div class="time-box" id="';
$out+=$escape( id);
$out+='" data-type="';
$out+=$escape( _data_id);
$out+='"> <header class="bg-white" style="top: auto;"> <span class="header-text header-left" data-id="close"><i class="iconfont icon-left-light "></i><span>返回</span></span> ';
 if(_data_id == "startTime"){
$out+=' <span class="title black animation-duration">去程日期</span> ';
 }else { 
$out+=' <span class="title black animation-duration">返程日期</span> ';
 } 
$out+=' </header> <div class="weeks"> ';
 for(var i = 0 ; i < 7 ; i++){ 
$out+=' <div class="weeks-item"> ';
$out+=$escape( ["日","一","二","三","四","五","六"][i]);
$out+=' </div> ';
 } 
$out+=' </div> <div class="month-box"> ';
 for(var j = 0 ; j < 12 ; j++){ 
$out+=' <div class="month"> ';
$out+=$escape( currYear + parseInt(( currMonth + j )/13));
$out+='年 ';
$out+=$escape( ( currMonth + j )%12||12);
$out+='月 </div> <div class="days"> ';
 for(var i = 1 ; i <= currDays(currYear + parseInt(( currMonth + j )/13),( currMonth + j )%12||12) ; i++){ 
$out+=' <div class="days-item ';
 if( i < currDay && currMonth == (( currMonth + j )%12||12) ){ 
$out+='disable';
 } 
$out+=' ';
 if(checkStart(currYear + parseInt(( currMonth + j )/13),( currMonth + j )%12||12,i,startTime)){ 
$out+=' start ';
 } 
$out+=' ';
 if(checkEnd(currYear + parseInt(( currMonth + j )/13),( currMonth + j )%12||12,i,endTime)){ 
$out+=' end ';
 } 
$out+='" ';
 if(i==1 ){ 
$out+=' style="padding-left: calc(100% * ';
$out+=$escape( fisrtWeek(currYear + parseInt(( currMonth + j )/13),( currMonth + j )%12||12));
$out+='/7)" ';
} 
$out+=' > ';
 if ( i == currDay && currMonth == (( currMonth + j )%12||12) ){ 
$out+=' <span class="day" style="font-size: 0.28rem;" data-time="';
$out+=$escape( formatTime(currYear + parseInt(( currMonth + j )/13),( currMonth + j )%12||12,i));
$out+='">今天</span> ';
 }else{ 
$out+=' <span class="day" data-time="';
$out+=$escape( formatTime(currYear + parseInt(( currMonth + j )/13),( currMonth + j )%12||12,i ));
$out+='">';
$out+=$escape( i);
$out+='</span> ';
} 
$out+=' </div> ';
 } 
$out+=' </div> ';
 } 
$out+=' </div> </div>';
return new String($out);
});