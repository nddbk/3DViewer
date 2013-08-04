/**
 * panel.js - Template
 * Author by Dong Nguyen <dongnd@bjlab.us>
 * Copyright(c) 2011-2013 bjlab.us
*/

var Template = Template || {}

Template.panel = [
	'<div id="composeBox">',
		'<div class="description">',
			'<textarea placeholder="What are you reading?"></textarea>',
		'</div>',
		'<div class="retrieve"></div>',
		'<div class="sharing"></div>',
		'<div class="action">',
			'<button class="positive" id="btnSaveShelf">Save</button>',
			'<button class="negative" id="btnCancelShelf">Cancel</button>',
		'</div>',
	'</div>'
].join('');
