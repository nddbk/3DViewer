/**
 * app.panel.js - Model
 * Used to handle a connection between panel's View layer and JSC3D object.
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

var app = window.app || {};

;(function(){
	
	'use strict';
	
	var viewer;
	
	function getViewer(){
		if(!viewer){
			viewer = app.viewer;
		}
		return viewer;
	}
	function zoom(k){
		viewer = getViewer();
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
		viewer = getViewer();
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
		viewer = getViewer();
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
		viewer = getViewer();
		viewer.setRenderMode('solid');
		viewer.resetScene();
		viewer.update();
		L.View.resetPanel();
	}
	
	function switchMode(mode){
		viewer = getViewer();
		viewer.setRenderMode(mode);
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
				
	var L = app.panel = bj.createModel({
		init : function(){
			
		},
		zoom : zoom,
		rotate : rotate,
		move : translate,
		reset : reset,
		switchMode : switchMode,
		onkeydown : onkeydown,
		onmousewheel : onmousewheel
	});
})();
