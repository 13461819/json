function loadFlowPlayer() {
	//removePlayerDiv();
	disablePlayerYT();
	createDivPlayerFP();
	$f("playerFP", "../SWF/flowplayer-3.2.18.swf", 'http://localhost/barsandtone.flv');
}