AudioModule.MasterOutput = (function() {

	// Constructor
	var MasterOutput = function() {
		AudioModule.construct(this);
		this.processor = AudioModule.context.destination;
	};


	// UX Building
	MasterOutput.prototype.buildUI = function() {
		this.spawnWidget('MasterOutput', [1, 0]);
	}
	
	// Export MasterOutput
	return MasterOutput;
})();