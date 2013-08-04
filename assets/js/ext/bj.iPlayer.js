/**
 * bj.iPlayer.js
 * Description : Image player with swipe
 * Author by Dong Nguyen <dongnd@greenglobal.vn>
 * Copyright(c) 2011-2013 bjTech
**/
;(function(bj, $){
	
	var list = [];
	var player = null;
	var cIndex = 0;
	
	function openBox(images, k){
		var tpl = Template.swipeBox;
		var s = '', k = 0;
		images.forEach(function(item){
			if(item.src){
				var _s = Template.swipeBoxItem;		
					_s = _s.replace('{IMAGE}', item.src);
					_s = _s.replaceAll('{CAPTION}', item.caption);
					_s = _s.replace('{LOADING}', item.src);
					_s = _s.replace('{INDEX}', k);
					s+=_s;
				list.push(item);
				k++;
			}
		});
		tpl = tpl.replace('{IMG-LIST}', s);
		
		var d = bj.addElement('DIV');
		d.innerHTML = tpl;
		player = d;
		
		$('#btnClose').click(function(){
			P.close();
		});
		var n = 0;
		$('.img-player .contain .item').each(function(){
			$(this).css({left: n*100+'%'});
			$(this).swipe({
				swipe: function(event, direction, distance, duration, fingerCount){
					  if(distance>5){
						 startSwipe(direction=='left'?1:-1, distance);
					  }
				},
				threshold:100,
				fingers:'all'
			});
			n++;
		});
	}	
	
	function playFrom(k){
		cIndex = k;
		$('#playItem_'+k).css({left: '0%'});
		if(k>0){
			for(var i=k-1;i>=0;i--){
				(function(n){
					$('#playItem_'+n).css({left: (n-k)*100+'%'});
				})(i);
			}
		}
		if(k<list.length){
			for(var i=k+1;i<list.length;i++){
				(function(n){
					$('#playItem_'+n).css({left: n*100+'%'});
				})(i);
			}
		}
	}
	
	function startSwipe(direction, distance){
		var k = cIndex+direction;
		var a = $('#playItem_'+cIndex);
		var b = null;
		if(k>=0 && k<list.length){
			cIndex = k;
			b = $('#playItem_'+k);
		}
		swipe(a, b, direction);
	}
	
	function swipe(from, to, direction){
		if(direction==1){
			if(!!to){
				from.animate({
					left: '-100%',
				  }, 
				  500
				);				
				to.animate({
					left: '0%',
				  }, 
				  500 
				);
			}
			else{
				from.animate(
				  {
					left: '-30%',
				  }, 
				  100, 
				  function(){from.animate({left: '0%'},300)}
				);				
			}
		}
		else if(direction==-1){
			if(!!to){
				from.animate({
					left: '100%',
				  }, 
				  500
				);				
				to.animate({
					left: '0%',
				  }, 
				  500
				);
			}
			else{
				from.animate(
				  {
					left: '30%',
				  }, 
				  100, 
				  function(){from.animate({left: '0%'},300)}
				);				
			}
		}
	}
	 
	var P = window['iPlayer'] = {
		init: function(data){
			var h = app.getHash();
			openBox(data.images);
		},
		play: function(k){
			playFrom(k);
		},
		close: function(){
			list.empty();
			cIndex = 0;
			$(player).remove();			
		}
	}
})(bj, jQuery);
