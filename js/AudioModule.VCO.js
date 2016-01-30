AudioModule.VCO = (function() {

	// Constructor
	var VCO = function() {
		AudioModule.construct(this);

		this.type = "sine";
		this.processor = [];
	};
	

	// Accessors
	VCO.prototype.setType = function(type) {
		this.type = type;
		
		this.forEachProcessor( function(processor, module) {
			processor.type = module.type;
		});
	}


	// Playback
	VCO.prototype.start = function(frequency) {
		var osc = AudioModule.context.createOscillator();
		osc.type = this.type;
		osc.frequency.value = frequency;

		if( this.output ) {
			osc.connect(this.output.processor);
		}

		this.processor.push(osc);

		osc.start(0);

		return this.processor.length - 1;
	}

	VCO.prototype.stop = function(voiceIndex) {
		var osc = this.processor[voiceIndex];

		if( ! osc ) {
			console.error('No VCO oscillator found at index ' + voiceIndex);
			return;
		}

		osc.stop();
		delete(this.processor[voiceIndex]);
	}


	// UX Building
	VCO.prototype.buildUI = function() {

		this.spawnWidget(
			'VCO', 

			'<div class="websynth-input">'+
				'<label>Oscillator</label>'+
				'<select class="type-selector">'+
					'<option value="sine" '+(this.type == 'sine' ? 'selected' : '')+'>Sine</option>'+
					'<option value="square" '+(this.type == 'square' ? 'selected' : '')+'>Square</option>'+
					'<option value="sawtooth" '+(this.type == 'sawtooth' ? 'selected' : '')+'>Sawtooth</option>'+
					'<option value="triangle" '+(this.type == 'triangle' ? 'selected' : '')+'>Triangle</option>'+
				'</select>'+
			'</div>',
			
			function($uiItem, module) {
				$uiItem.find('.type-selector').selectmenu({
					width: 100,
					change: function( event, ui ) {
						var newType = ui.item.value;
						module.setType(newType);
					}
				});
			}
		);
	}
	
	// Export VCO
	return VCO;
})();
