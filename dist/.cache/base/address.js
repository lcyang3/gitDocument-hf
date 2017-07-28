/*TMODJS:{"version":115,"md5":"44820a7a4c9c17ae1ad6574b051d2fb3"}*/
template('base/address',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,id=$data.id,_data_id=$data._data_id,_letter_array=$data._letter_array,i=$data.i,gps=$data.gps,history=$data.history,hot=$data.hot,j=$data.j,_city_domestic=$data._city_domestic,$out='';$out+='<div class="address-box" id="';
$out+=$escape( id);
$out+='" data-type="';
$out+=$escape( _data_id);
$out+='"> <header class="bg-white" style="top: auto;"> <span class="header-text header-left" data-id="close"><i class="iconfont icon-left-light "></i><span>返回</span></span> ';
 if(_data_id == "startAddress"){
$out+=' <span class="title black animation-duration">出发地点</span> ';
 }else { 
$out+=' <span class="title black animation-duration">到达地点</span> ';
 } 
$out+=' </header> <div class="address-catalog"> <P class="address-catalog-item" data-target="GPS"> 当前 </P> <P class="address-catalog-item" data-target="history"> 历史 </P> <P class="address-catalog-item" data-target="hot"> 热门 </P> ';
 
            var _letter_array = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
            for(var i = 0 ; i < 29; i++ ){ 
$out+=' <P class="address-catalog-item" id="';
$out+=$escape( _letter_array[i]);
$out+='"> ';
$out+=$escape( _letter_array[i]);
$out+=' </P> ';
 } 
$out+=' </div> <div class="main" data-target="GPS"> <div class="currAddress" id="currAddress"> <span class="text">';
$out+=$escape( gps);
$out+='</span><span class="type">GPS定位</span> </div> <div class="address-item-box history" data-target="history"> ';
for(var i = 0; i< history.length; i++){
$out+=' <div class="history-item"> ';
$out+=$escape( history[i]);
$out+=' </div> ';
}
$out+=' </div> <div class="address-item-box hot" data-target="hot"> ';
for(var i = 0; i< hot.length; i++){
$out+=' <div class="hot-item"> ';
$out+=$escape( hot[i]);
$out+=' </div> ';
}
$out+=' </div> <div class="list"> ';
 for(var i = 0; i< _letter_array.length; i++){ 
$out+=' <div class="address-item-li" data-target="';
$out+=$escape( _letter_array[i]);
$out+=' "> <p> ';
$out+=$escape( _letter_array[i]);
$out+=' </p> ';
 for(var j = 0 ; j < _city_domestic.length; j++){
                    if(_city_domestic[j].group == _letter_array[i]){
$out+=' <div class="list-li"> ';
$out+=$escape( _city_domestic[j].cityName);
$out+=' </div> ';
 }} 
$out+=' </div> ';
 } 
$out+=' </div> </div> </div>';
return new String($out);
});