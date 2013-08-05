/**
 * app.js
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

;(function(_parent){
	
	APP_STATE = 1;
	
	var canvas, viewer;
	
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
	function loadObject(file, opts){
		var op = opts || {};
		var x = op.x || 0;
		var y = op.y || 0;
		var z = op.z || 0;
		var modelColor = op.modelColor || '#ff0000';
		var bgColorTop = op.bgColorTop || '#ffffaa';
		var bgColorBottom = op.bgColorBottom || '#666633';
		var renderMode = op.renderMode || 'smooth';
		
		viewer.setParameter('SceneUrl', file);
		viewer.setParameter('InitRotationX', x);
		viewer.setParameter('InitRotationY', y);
		viewer.setParameter('InitRotationZ', z);
		viewer.setParameter('ModelColor', modelColor);
		viewer.setParameter('BackgroundColor1', bgColorTop);
		viewer.setParameter('BackgroundColor2', bgColorBottom);
		viewer.setParameter('RenderMode', renderMode);
		viewer.setParameter('MipMapping', 'off');
		viewer.setParameter('enableDefaultInputHandle', true);
		viewer.setMouseUsage('rotate');
		viewer.init();
		viewer.update();	
	}
	
	function zoom(k){
		if(!!viewer){
			viewer.zoomFactor += k;
			if(viewer.zoomFactor<5){
				viewer.zoomFactor = 5;
			}
			else if(viewer.zoomFactor>500){
				viewer.zoomFactor = 500;
			}
			viewer.update();
		}
	}
	
	function rotate(d){
		if(!!viewer){
			if(d=='bottom'){
				viewer.rotMatrix.rotateAboutXAxis(5);
			}	
			else if(d=='top'){
				viewer.rotMatrix.rotateAboutXAxis(-5);
			}
			else if(d=='left'){
				viewer.rotMatrix.rotateAboutYAxis(-5);
			}		
			else if(d=='right'){
				viewer.rotMatrix.rotateAboutYAxis(5);
			}
			viewer.update();	
		}
	}

	function translate(d){
		if(!!viewer){
			var ratio = (viewer.definition == 'low') ? 0.5 : ((viewer.definition == 'high') ? 2 : 1);
			ratio*=5;
			if(d=='bottom'){
				viewer.panning[1] += ratio;
			}	
			else if(d=='top'){
				viewer.panning[1] -= ratio;
			}
			else if(d=='left'){
				viewer.panning[0] -= ratio;
			}		
			else if(d=='right'){
				viewer.panning[0] += ratio;
			}
			viewer.update();	
		}		
	}
	
	function reset(){
		viewer.resetScene();
		viewer.update();
	}
	
	function onmousewheel(evt){
		var e = window.event || evt;
		bj.exitEvent(e);
		var delta = e.detail? e.detail*(-120) : e.wheelDelta;
		if(delta>0){
			zoom(5);
		}
		else{
			zoom(-5);
		}
	}	
	
	function onkeydown(e){
		var k = e.which || e.keyCode;
		if(k==37){
			translate('left');
			bj.exitEvent(e);
		}
		if(k==39){
			translate('right');
			bj.exitEvent(e);
		}
		if(k==38){
			translate('top');
			bj.exitEvent(e);
		}
		if(k==40){
			translate('bottom');
			bj.exitEvent(e);
		}
	}
	
	var app = _parent['app'] = {
		getState : function(){
			return APP_STATE;
		},
		setState : function(k){
			APP_STATE = k;
			return k;
		},
		init : function(){
			canvas = document.getElementById('cv');
			viewer = new JSC3D.Viewer(canvas);
			loadObject('resources/objects/statue/TuongCTQ.obj', {
				x : 270, 
				y : 360,
				z : 0
			});
			
			bj.listen(document.body, 'DOMMouseScroll', onmousewheel);
			bj.listen(document.body, 'mousewheel', onmousewheel);		
			bj.listen(document.body, 'keydown', onkeydown);	
			
			app.panel.View.start();
			
			app.viewer = viewer;
		},
		loadObj : function(file, opts){
			return loadObject(file, opts);
		},
		rotate : rotate,
		zoom : zoom,
		translate : translate,
		reset : reset,
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
