/**
 * panel.js - Template
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

var Template = Template || {}

Template.panel = [
	'<div class="btns">',
		'<select id="renderMode">',
			'<option value="smooth">Solid</option>',
			'<option value="point">Point</option>',
			'<option value="wireframe">Wireframe</option>',
		'</select>',
		'<button class="panel-item" cmd="zoom-in" title="Wheel Up">Zoom-in</button>',
		'<button class="panel-item" cmd="zoom-out" title="Wheel Down">Zoom-out</button>',
		'<button class="panel-item" cmd="move-top" title="Up Arrow">Move Up</button>',
		'<button class="panel-item" cmd="move-bottom" title="Down Arrow">Move Down</button>',
		'<button class="panel-item" cmd="move-left" title="Left Arrow">Move Left</button>',
		'<button class="panel-item" cmd="move-right" title="Right Arrow">Move Right</button>',
		'<button class="panel-item" cmd="reset" style="color:#900;">Reset</button>',
	'</div>'
].join('');
