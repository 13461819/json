function replaceAndLoadYoutubeByID(id) { //해당 id값을 가진 비디오의 제목, 내용, youtube코드로 loadYouTube를 호출한다.
	loadYouTube(videos[id].title, replaceDescription(videos[id].description), videos[id].youtube);
}

function replaceDescription(description) { //description의 개행을 HTML의 "<br>"로 바꾼다.
	description = description.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
	return description;
}

function loadYouTube(title, description, youtube) { //제목, 내용, youtube코드로 유튜브 플레이어를 실행한다.
    $("#title").text(title);
    $("#description").html(description);
    playerYT.loadPlaylist(youtube); 
    playerYT.setLoop(true);
}

function loadYouTubePlayer() {
	//removePlayerDiv();
	disablePlayerFP();
	//createDivPlayerYT();
	
	var player_yt = document.querySelector("#playerYT");
	if(player_yt) {
		player_yt.setAttribute('style', 'display: block');
		return;
	}
	var iframe_rwd = document.querySelector(".iframe-rwd");
	player_yt = document.createElement('div');
	player_yt.setAttribute('id', 'playerYT');
	player_yt.setAttribute('class', 'video');
	iframe_rwd.appendChild(player_yt);
	
	  playerYT = new YT.Player('playerYT', {
	      height: 720,
	      width: 1280,
//	      videoId: 'ZuX0rQ7twnE',
	      playerVars: {
	      	'controls': 2,
	      	'autohide': 1,
	      	'rel': 0,
	      	'showinfo': 0},
	      events: {
	        'onReady': onPlayerReady,
	        'onStateChange': onPlayerStateChange
	      }
	  });
	 //var url = $("iframe").attr("src");
	 //console.log(url);
}

// 이하 유튜브 API

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerYT = null;

function onYouTubeIframeAPIReady() {
  
  playerYT = new YT.Player('playerYT', {
      height: 720,
      width: 1280,
//      videoId: 'ZuX0rQ7twnE',
      playerVars: {
      	'controls': 2,
      	'autohide': 1,
      	'rel': 0,
      	'showinfo': 0},
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
  
  $('iframe[src^="https://www.youtube.com/embed"]').each(function(){
	    var url = $(this).attr("src");
	    var separator = (url.indexOf('?') > 0) ? '&' : '?';
	    $(this).attr('src', url + separator + 'wmode=transparent');
  });
}

function onPlayerReady(event) {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {


  }
  else {


  }
}

function onPlayerStateChange(event) {
	if(event.data == YT.PlayerState.ENDED) {
		var title = $("#title");
		var description = $("#description");
		var currentPlayIndex = youtubeIndex % youtubePlayList.length;
		if(isAds) {
			playerYT.loadVideoById(videos[youtubePlayList[currentPlayIndex]].youtube); 
			title.html(videos[youtubePlayList[currentPlayIndex]].title);
			description.html(replaceDescription(videos[youtubePlayList[currentPlayIndex]].description));
			isAds = false;
		} else {
			playerYT.loadVideoById(youtubeAds[(totalPlayCount++ % youtubeAds.length)]);
			title.html("&nbsp;");
			description.html("&nbsp;");
			youtubeIndex++;
			isAds = true;
		}
	}
}

function getLCM(num1, num2) {
	var LCM = (num1 > num2) ? num1 : num2;
	while(LCM % num1 || LCM % num2) LCM++;
	return LCM;
}
