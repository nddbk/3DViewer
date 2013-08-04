/**
 * panel.js - Template
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

var Template = Template || {}

Template.panel = [
	'<div class="btns">',
		'<span class="ctrl panel-item" cmd="zoom-in" title="Wheel Up">Zoom-in</span>',
		'<span class="ctrl panel-item" cmd="zoom-out" title="Wheel Down">Zoom-out</span>',
		'<span class="ctrl panel-item" cmd="rotate-top" title="Up Arrow">Rotate Top</span>',
		'<span class="ctrl panel-item" cmd="rotate-bottom" title="Down Arrow">Rotate Bottom</span>',
		'<span class="ctrl panel-item" cmd="rotate-left" title="Left Arrow">Rotate Left</span>',
		'<span class="ctrl panel-item" cmd="rotate-right" title="Right Arrow">Rotate Right</span>',
	'</div>'
].join('');
