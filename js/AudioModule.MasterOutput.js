AudioModule.MasterOutput = (function() {

	// Constructor
	var MasterOutput = function() {
		AudioModule.construct(this, "MasterOutput");
		this.processor = AudioModule.context.destination;
	};

	
	// Export MasterOutput
	return MasterOutput;
})();