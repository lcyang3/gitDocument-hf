;var animate = {
	animated : function(_element,_callback) {
		if(!!_callback && typeof _callback === "function"){
			_element.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', _callback());
		}else{
			console.error("error:animated 请传递_callback:function");
		}
	},
	animateText : function(_element,_text,animateType,_callback) {
		_element.html("");
		_element.addClass("animated " + animateType);
		_element.html(_text);
		setTimeout(function(){
			_element.removeClass("animated " + animateType);
		},500)
		if(!!_callback && typeof _callback === "function"){
			_callback();
		}
	}
}