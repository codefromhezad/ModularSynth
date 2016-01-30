AudioModule.MasterOutput = (function() {

	// Constructor
	var MasterOutput = function() {
		AudioModule.construct(this, "MasterOutput");
		this.processor = AudioModule.context.destination;
	};


	// UX Building
	MasterOutput.prototype.buildUI = function() {

		this.spawnWidget('MasterOutput');
	}
	
	// Export MasterOutput
	return MasterOutput;
})();