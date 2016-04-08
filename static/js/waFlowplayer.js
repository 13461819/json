function loadFlowPlayer() {
	//removePlayerDiv();
	disablePlayerYT();
	//createDivPlayerFP();
	
	var player_fp = document.querySelector("#playerFP");
	if( player_fp ) {
		player_fp.setAttribute('style', 'display: block');
		return;
	}
	var iframe_rwd = document.querySelector(".iframe-rwd");
	player_fp = document.createElement('div');
	player_fp.setAttribute('id', 'playerFP');
	player_fp.setAttribute('class', 'video');
	iframe_rwd.appendChild(player_fp);
	
	$f("playerFP", {
		src: "/static/flowplayer/flowplayer-3.2.18.swf",
		wmode: 'opaque'
	}, {
		clip: 'https://fat.gfycat.com/OrganicAcademicAmphibian.mp4'
	});
	
//	$f("playerFP", "/static/flowplayer/flowplayer-3.2.18.swf", 'https://fat.gfycat.com/OrganicAcademicAmphibian.mp4');
}
