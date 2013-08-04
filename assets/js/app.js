/**
 * app.js
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

;(function(_parent){
	
	APP_STATE = 1;
	
	var clicks = [], resizes = [];
	
	function onclick(e, tg){
		clicks.forEach(function(f){
			f(e, tg);
		});
	}
	function onresize(w, h){
		resizes.forEach(function(f){
			f(w, h);
		});
	}
	
	/*
	 * load object data and render it
	 */
	function loadObject(){
		var canvas = document.getElementById('cv');
		var viewer = new JSC3D.Viewer(canvas);
		viewer.setParameter('SceneUrl', 'resources/objects/statue/TuongCTQ.obj');
		viewer.setParameter('InitRotationX', 270);
		viewer.setParameter('InitRotationY', 320);
		viewer.setParameter('InitRotationZ', 0);
		viewer.setParameter('ModelColor', '#ff0000');
		viewer.setParameter('BackgroundColor1', '#ffffaa');
		viewer.setParameter('BackgroundColor2', '#666633');
		viewer.setParameter('RenderMode', 'smooth');
		viewer.setParameter('MipMapping', 'off');
		//viewer.setMouseUsage('free');
		//viewer.enableDefaultInputHandler(true);
		viewer.init();
		viewer.update();		
	}
	
	// public general method
	
	var app = _parent['app'] = {
		getState : function(){
			return APP_STATE;
		},
		setState : function(k){
			APP_STATE = k;
			return k;
		},
		init : function(){
			loadObject();
		},
		storage : {
			cacheTime : 1800,
			selectDB : function(){
				bj.storage.selectDB('context');
			},
			save : function(key, data){
				bj.selectDB();
				bj.storage.set(key, data);
			},
			query : function(key){
				bj.selectDB();
				return bj.storage.get(key, 'toJSON');
			}	
		},
		send : function(target, data, callback, errorCallback){
			var ajax = bj.transactor.create();
			ajax.onerror = errorCallback || function(){};
			ajax.send({data: data, target: target}, callback);
			return ajax;
		},
		retrieve : function(target, callback, errorCallback){ 	
			var ajax = bj.transactor.create();
			ajax.onerror = errorCallback || function(){};
			ajax.send(target, callback);	
			return ajax;
		},
		animate : function(el, props, time, callback){
			el = bj.element(el);
			if(!window['jQuery']){
				anim(el, props, time/1000, 'linear').anim(function(){ 
					if(callback){callback()}
				});			
			}
		},
		date: function(t, pattern){
			return bj.date.make(pattern, bj.date.gmtToLocal(t));
		},
		onclick : onclick,
		onresize : onresize,
		registerClick : function(f){
			clicks.push(f);
		},
		registerResize : function(f){
			resizes.push(f);
		},
	}
})(window);
