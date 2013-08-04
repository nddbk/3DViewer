/**
 * init.js
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

;(function(){
	
	bj.setOnloadCallback(function(){
		
		bj.listen(document, 'click', function(e){
			var tg = bj.getEvtTag(e);
			if(bj.isElement(tg)){
				app.onclick(e, tg);
			}
		});

		bj.setOnresizeCallback(function(){
			var ws = bj.getWindowSize();
			return app.onresize(ws.w, ws.h);
		});	
			
		var container = bj.element('container');
		var relayout = function(w, h){
			if(!!container){
				container.setSize(w, h);
			}
		}
		var ws = bj.getWindowSize();
		relayout(ws.w, ws.h);
		app.registerResize(relayout);
	});
	
	app.init();
})();
