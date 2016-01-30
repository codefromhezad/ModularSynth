// AudioModule Definition
var AudioModule = {
	context: new (window.AudioContext || window.webkitAudioContext)(),
	
	UI: {
		containerSelector: '#websynth-canvas',
	},

	construct: function(module) {
		module.input = null;
		module.output = null;

		module.processor = null;

		module.spawnWidget = function(title, template, callback) {
			var uiHtml = '<div class="websynth-module websynth-'+title.toLowerCase()+'">'+
				'<h3>'+title+'</h3>'+
				'<div class="content">'+
					(template ? template : '') +
				'</div>'+
			'</div>';

			var $uiItem = $(uiHtml);

			$uiItem.draggable({
				handle: "h3"
			});

			if( callback ) {
				( function(module, $uiItem) {
					callback($uiItem, module);
				}) (module, $uiItem);
			}
			
			$(AudioModule.UI.containerSelector).append($uiItem);

			return $uiItem;
		}

		module.connectTo = function(dest) {
			( function(module, dest) {

				module.output = dest;
				dest.input = module;

				if( Object.prototype.toString.call( module.processor ) === '[object Array]' ) {
					// Special case for VCO's (they must instanciate one oscillator node per sound)
					for(var moduleProcIndex in module.processor) {
						module.processor[moduleProcIndex].connect(dest.processor);
					}
				} else {
					// Regular case
					module.processor.connect(dest.processor);
				}

			}) (module, dest);
		}

		module.forEachProcessor = function(callback) {
			( function(module, callback) {
				if( Object.prototype.toString.call( module.processor ) === '[object Array]' ) {
					// Special case for VCO's (they must instanciate one oscillator node per sound)
					for(var moduleProcIndex in module.processor) {
						callback(module.processor[moduleProcIndex], module);
					}
				} else {
					// Regular case
					callback(module.processor, module);
				}
			}) (module, callback);
		}
	},
}