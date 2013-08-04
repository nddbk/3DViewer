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
						case 'rotate-left' 		: R.Model.rotate('left'); break;
						case 'rotate-right' 	: R.Model.rotate('right'); break;
						case 'rotate-top' 		: R.Model.rotate('top'); break;
						case 'rotate-bottom' 		: R.Model.rotate('bottom'); break;
					}
				}
			});
		}
	});
})();
