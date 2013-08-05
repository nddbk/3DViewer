/**
 * app.panel.js - View
 * Panel's view layer with the needed tool for controlling main object from UI.
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

var app = window.app || {};

;(function(){
	
	'use strict';
	
	var R = bj.createView(app.panel, {
		init : function(){
			this.panel = bj.element('panel');
		},
		start : function(){
			var tpl = Template.panel;
			this.panel.innerHTML = tpl;
			
			app.registerClick(function(e, tg){
				if(tg.hasClass('panel-item')){
					bj.exitEvent(e);
					var rel = tg.getAttribute('cmd');
					switch(rel){
						case 'zoom-in' 			: R.Model.zoom(5); break;
						case 'zoom-out' 		: R.Model.zoom(-5); break;
						case 'move-left' 		: R.Model.move('left'); break;
						case 'move-right' 		: R.Model.move('right'); break;
						case 'move-top' 		: R.Model.move('top'); break;
						case 'move-bottom' 		: R.Model.move('bottom'); break;
						case 'reset' 			: R.Model.reset(); break;
					}
				}
			});
		}
	});
})();
