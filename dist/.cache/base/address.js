/*TMODJS:{"version":145,"md5":"22d52a8f7b8ed0bdea2754b13d9c8a5b"}*/
template('base/address',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,_data_id=$data._data_id,history=$data.history,_letter_array=$data._letter_array,i=$data.i,gps=$data.gps,hot=$data.hot,j=$data.j,_city_domestic=$data._city_domestic,$out='';$out+='<div class="address-box" id="';
$out+=$escape( id);
$out+='" data-type="';
$out+=$escape( _data_id);
$out+='"> <header class="bg-white" style="top: auto;"> <span class="header-text header-left" data-id="close"><i class="iconfont icon-left-light "></i><span>返回</span></span> ';
 if(_data_id == "startAddress"){
$out+=' <span class="title black animation-duration">出发地点</span> ';
 }else { 
$out+=' <span class="title black animation-duration">到达地点</span> ';
 } 
$out+=' </header> <div class="address-catalog"> <P class="address-catalog-item" data-target="currAddress"> 当前 </P> ';
if(!!history.length){
$out+=' <P class="address-catalog-item" data-target="history"> 历史 </P> ';
}
$out+=' <P class="address-catalog-item" data-target="hot"> 热门 </P> ';
 
            var _letter_array = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
            for(var i = 0 ; i < 26; i++ ){ 
$out+=' <P class="address-catalog-item" data-target="';
$out+=$escape( _letter_array[i]);
$out+='"> ';
$out+=$escape( _letter_array[i]);
$out+=' </P> ';
 } 
$out+=' </div> <div class="main"> <div class="currAddress" data-target="currAddress"> <p><span class="text" data-cityName="';
$out+=$escape( gps.cityName);
$out+='" data-three="';
$out+=$escape( gps.three);
$out+='">';
$out+=$escape( gps.cityName);
$out+='</span><span class="type">GPS定位</span></p> </div> ';
if(!!history.length){
$out+=' <div class="address-item-box history" data-target="history"> <p>历史选择</p> ';
for(var i = 0; i< history.length; i++){
$out+=' <div class="item history-item" data-cityName="';
$out+=$escape( history[i].cityName);
$out+='" data-three="';
$out+=$escape( history[i].three);
$out+='"> ';
$out+=$escape( history[i].cityName);
$out+=' </div> ';
}
$out+=' </div> ';
}
$out+=' <div class="address-item-box hot" data-target="hot"> <p>热门城市</p> ';
for(var i = 0; i< hot.length; i++){
$out+=' <div class="item hot-item" data-cityName="';
$out+=$escape( hot[i].cityName);
$out+='" data-three="';
$out+=$escape( hot[i].three);
$out+='"> ';
$out+=$escape( hot[i].cityName);
$out+=' </div> ';
}
$out+=' </div> <div class="list"> ';
 for(var i = 0; i< _letter_array.length; i++){ 
$out+=' <div class="address-item-li" data-target="';
$out+=$escape( _letter_array[i]);
$out+='"> <p> ';
$out+=$escape( _letter_array[i]);
$out+=' </p> ';
 for(var j = 0 ; j < _city_domestic.length; j++){
                    if(_city_domestic[j].group == _letter_array[i]){
$out+=' <div class="list-li" data-cityName="';
$out+=$escape( _city_domestic[j].cityName);
$out+='" data-three="';
$out+=$escape( _city_domestic[j].three);
$out+='"> ';
$out+=$escape( _city_domestic[j].cityName);
$out+=' </div> ';
 }} 
$out+=' </div> ';
 } 
$out+=' </div> </div> </div>';
return new String($out);
});