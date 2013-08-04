/**
 * panel.js - Template
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

var Template = Template || {}

Template.panel = [
	'<div class="btns">',
		'<button class="panel-item" cmd="zoom-in" title="Wheel Up">Zoom-in</button>',
		'<button class="panel-item" cmd="zoom-out" title="Wheel Down">Zoom-out</button>',
		'<button class="panel-item" cmd="rotate-top" title="Up Arrow">Rotate Top</button>',
		'<button class="panel-item" cmd="rotate-bottom" title="Down Arrow">Rotate Bottom</button>',
		'<button class="panel-item" cmd="rotate-left" title="Left Arrow">Rotate Left</button>',
		'<button class="panel-item" cmd="rotate-right" title="Right Arrow">Rotate Right</button>',
	'</div>'
].join('');
