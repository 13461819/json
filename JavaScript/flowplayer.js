function loadFlowPlayer() {
	removePlayerDiv();
	createPlayerDiv();
	$f("playerYT", "../SWF/flowplayer-3.2.18.swf", 'http://localhost/barsandtone.flv');
}