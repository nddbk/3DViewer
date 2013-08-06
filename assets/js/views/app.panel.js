/**
 * app.panel.js - View
 * Panel's view layer with the needed tool for controlling main object from UI.
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

var app = window.app || {};

;(function(){
	
	'use strict';
	
	var objList = [
		{
			image : 'resources/Liberty.png', 
			path : 'resources/objects/LibertyStatue/LibertStatue.obj'
		},
		{
			image : 'resources/court.png', 
			path : 'resources/objects/court/court.obj',
			config : {
				textures : [
				]
			}
		},
		{
			image : 'resources/statue.png', 
			path : 'resources/objects/statue/TuongCTQ.obj', 
			config : {
				x : 270,
				y : 360,
				z : 0
			}
		},
		{
			image : 'resources/statue-base.png', 
			path : 'resources/objects/statue/CTQ_de_texture.obj',
			config : {
				x : 160,
				y : 30,
				z : 30
			}
		},
		{
			image : 'resources/stand.png', 
			path : 'resources/objects/NewsStand/NewsStand.obj'
		}
	];
	
	var R = bj.createView(app.panel, {
		init : function(){
			this.panel = bj.element('panel');	
			this.menu = bj.element('menu');	
			this.iconMenu = bj.element('iconMenu');
			this.loading = bj.element('loading');
		},
		start : function(){
			var tpl = Template.panel;
			this.panel.innerHTML = tpl;
			
			var el = this.menu;
			var ls =  bj.addElement('DIV', el);
			ls.addClass('listing');ls
			objList.forEach(function(item){
				var img = bj.addElement('DIV', ls);
				img.addClass('item');
				img.setAttribute('style', 'cursor:pointer;background:transparent url('+item.image+') no-repeat center center;');
				img.onclick = function(){
					R.startLoad({
						path : item.path,
						config : item.config || {}
					});
				}
			});		
				
			app.registerClick(function(e, tg){
				if(tg.hasClass('panel-item')){
					bj.exitEvent(e);
					var rel = tg.getAttribute('cmd');
					switch(rel){
						case 'zoom-in' 			: R.Model.zoom(1); break;
						case 'zoom-out' 		: R.Model.zoom(-1); break;
						case 'move-left' 		: R.Model.move('left'); break;
						case 'move-right' 		: R.Model.move('right'); break;
						case 'move-top' 		: R.Model.move('top'); break;
						case 'move-bottom' 		: R.Model.move('bottom'); break;
						case 'reset' 			: R.Model.reset(); break;
					}
				}
				if(tg.getAttribute('id')=='iconMenu'){
					R.menu.show();
				}
			});
			
			bj.listen('renderMode', 'change', function(){
				var v = this.value;
				R.Model.switchMode(v);
			});

			bj.listen(document.body, 'DOMMouseScroll', R.Model.onmousewheel);
			bj.listen(document.body, 'mousewheel', R.Model.onmousewheel);		
			bj.listen(document.body, 'keydown', R.Model.onkeydown);
			
			var container = bj.element('container');
			var workspace = bj.element('workspace');
			var canvas = bj.element('cv');
			var relayout = function(w, h){
				if(!!canvas){
					container.setSize(w, h);
					//canvas.setSize(w, h);
					//R.Model.reload();
				}
			}
			var ws = bj.getWindowSize();
			relayout(ws.w, ws.h);
			app.registerResize(relayout);			
		},
		startLoad : function(ob){
			R.Model.load(ob);
		},
		onloaded : function(){
			this.loading.hide();
			this.iconMenu.show();
		},
		onloading : function(){
			this.menu.hide();
			this.loading.show();
			this.iconMenu.hide();
		},
		resetPanel : function(){
			bj.element('renderMode').selectedIndex = 0;
		}
	});
})();
