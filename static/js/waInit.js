var categories = [
                  '환자 안내 시리즈',
                  '기타',
                  '의료 기기 사용',
                  '행정 교육',
                  '식이',
                  '자가 치료',
                  '운동/재활',
                  '의약품',
                  '입원/퇴원',
                  '치료적 술기',
                  '진단적 술기',
                  '질병증상'
                  ];
var videos_length = 12; // 카테고리의 갯수
var videos = []; // 처음 12개의 배열은 2차원 배열이며 각각의 배열은 카테고리별 비디오 리스트가 있다.
				 // 나머지 배열은 비디오 ID를 이용하여 HashMap으로 사용
var downloadedVideos = [ {
	"id" : 5142066044600320,
	"expired_date" : "만료날짜1"
}, {
	"id" : 5673682332549120,
	"expired_date" : "만료날짜2"
}, {
	"id" : 6591956742307840,
	"expired_date" : "만료날짜3"
}, {
	"id" : 6427848055193600,
	"expired_date" : "만료날짜4"
}, {
	"id" : 6287110566838272,
	"expired_date" : "만료날짜5"
}, {
	"id" : 6222068655849472,
	"expired_date" : "만료날짜6"
}, {
	"id" : 6037510689914880,
	"expired_date" : "만료날짜7"
}, {
	"id" : 5944759797415936,
	"expired_date" : "만료날짜8"
}, {
	"id" : 5798272690028544,
	"expired_date" : "만료날짜9"
}, {
	"id" : 5740874747084800,
	"expired_date" : "만료날짜10"
}, {
	"id" : 5705691851390976,
	"expired_date" : "만료날짜11"
}, {
	"id" : 5680876067225600,
	"expired_date" : "만료날짜12"
}, {
	"id" : 5651124426113024,
	"expired_date" : "만료날짜13"
}, {
	"id" : 5528730743078912,
	"expired_date" : "만료날짜14"
}, {
	"id" : 5368046889730048,
	"expired_date" : "만료날짜15"
}, {
	"id" : 5192862555701248,
	"expired_date" : "만료날짜16"
}, {
	"id" : 5142291060621312,
	"expired_date" : "만료날짜17"
}, {
	"id" : 5086826255613952,
	"expired_date" : "만료날짜18"
}, {
	"id" : 4944866849062912,
	"expired_date" : "만료날짜19"
}, {
	"id" : 4844130135965696,
	"expired_date" : "만료날짜20"
}, {
	"id" : 4737992635711488,
	"expired_date" : "만료날짜21"
}, {
	"id" : 4507668974665728,
	"expired_date" : "만료날짜22"
} ];
var rawTopics, topics = []; // 21개의 소주제 객체 리스트
				 // 각각의 소주제 객체는 자체적으로 비디오 리스트를 가지고 있다.
var selectedVideos = []; // 체크박스에서 선택 된 비디오의 배열
var targetVideos = [], toBeDeletedVideos = []; // My List에서 반복재생을 하려고 하는 비디오 리스트
var teams, teamsMembers = [], teamsMembersAccounts = []; // 각각의 API response 객체
var myLists; // API response 객체
var bookMarks; // API response 객체
var currentTeamIndex; // 현재 체크되어있는 팀의 teams 인덱스
var credit; // API response 객체
var teamCredits; // API response 객체
var ads; // API response 객체
var professions; // API response 객체
var specialties; // API response 객체
var when_bookMarks; // bookMarks API의 $.ajax() 참조자. $.when()에 쓰인다.
var when_myLists; // myLists API의 $.ajax() 참조자. $.when()에 쓰인다.
var selectedEditLists = []; // myList에서 edit 하려는 리스트의 클론 (깊은복사)
var youtubeAds = ["EOaoAf69zOg", "jh1IHMJI5lc", "F7viKAPDmT0", "Snl61MzlotM", "egywPKPjS7Y", "aAHbscecDcI"];
var youtubePlayList = [];
var isAds = false, youtubeIndex = 0;
var hbUrl = "https://hbreeze4ani.appspot.com";
var hbApiPath = "/api/v1";
var waData = {}; // localStrorage에 들어있는 WebApp의 데이터
var totalPlayCount = 0;
var isMouseClicked = false; // modal창 이동을 위한 변수
var preX, preY;

function getWaData() {
	if (localStorage.getItem(getMyKey(accounts.email))) {
		waData = JSON.parse(localStorage.getItem(getMyKey(accounts.email)));
	} else {
		waData.sendMethod = 0;
		waData.videoLang = [false, false, false, false, false, false];
	}
	if (waData.sendMethod == undefined) waData.sendMethod = 0;
	if (waData.videoLang == undefined) waData.videoLang = [false, false, false, false, false, false];
	console.log(waData);
}

function setToken() {
	console.log("setToken");
	//accounts.token = "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey);
	accounts.token = "Basic NTM5ODc0NDEyODI5MDgxNi01NzA3Mjc0OTQ5NDkyNzM2OncwQjEzYXdGS2J0Y3F0bG4=";
	delete accounts.sessionKey;
	console.log(accounts);
}

function getVideos() {	//비디오 API를 이용해서 videos[] 배열에 값을 할당한다.
	$("#accordion_r").html("<img src=\"/static/img/loading.gif\">");
	$.getJSON(hbUrl + hbApiPath + "/videos",
					function(json) {
						createVideos(); // 카테고리의 갯수만큼 첫 12개의 리스트들을 2차원 배열로 만든다.
						categorizeVideos(json); // 첫 12개의 인덱스에는 카테고리에 맞게 비디오를 분류해서 2차원 배열을 채운다.
												// 나머지 인덱스에는 비디오 ID값을 이용해 배열의 인덱스에 [Key: ID] = Value: 비디오 값으로 채운다.
						sortVideos(); // 첫 12개의 인덱스에 들어있는 카테고리별 비디오만 각각 정렬한다.
						createRecommendHTML(); //정렬 된 배열을 가지고 HTML코드를 생성한다.
						//getTopics(); // 비디오 배열이 완성 되었으면 소주제 API를 받아온다.
					})
			.fail( function (message) {
//				alert("서버와 통신 오류로 로그인할 수 없습니다!");
//				location.replace("start.html");
				console.log(message);
			});
}

function getTopics() {
	console.log("getTopics");
	$.getJSON(hbUrl + hbApiPath + "/topics",
			function(json) {
				rawTopics = json;
				createTopics(rawTopics); // 소주제별은 받아 온 API대로 각각의 객체를 그냥 배열에 넣는다. 
				sortTopics(); // 객체의 순서를 정렬한다.
				createTopicHTML(); // 정렬 된 배열을 가지고 HTML코드를 생성한다.
				//createMyListHTML(); //My List의 HTML코드를 생성한다.
				//loadYouTubePlayer();
				refreshCheckBox();
			})
		.fail( function (message) {
			console.log(message);
			alert("getTopics : 서버와 통신 오류로 로그인할 수 없습니다!");
			//location.replace("start.html");
		});
}

function getMyLists() {
	getSubBookMarks(); // 북마크를 받아온다.
	getSubMyLists(); // 마이리스트를 받아온다.
	
	// 2개가 모두 호출이 완료되었을때
	$.when(when_bookMarks, when_myLists).done(function() {
		console.log("2개 다 호출됨");
		sortBookMarks();
//		createBookMarkHTML();
		sortMyLists();
		createMyListHTML();
		refreshCheckBox();
	});
}

function getSubBookMarks() {
	when_bookMarks = $.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		url: hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/bookmarks",
		success: function(json) {
			bookMarks = json;
			for(var i = 0; i < bookMarks.length; i++) {
				if(videos[bookMarks[i]] == undefined) { // 삭제된 비디오가 있으면 해당 비디오는 목록에서 제거한다.
					bookMarks.splice(i, 1);
				}
			}
			console.log("붘맠 호출됨");
		}
	}).fail(function (message){
		console.log(message);
	});
}

function getSubMyLists() {
	when_myLists = $.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		url: hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/mylists",
		success: function(json) {
			myLists = json;
			for(var i = 0; i < myLists.length; i++) {
				for(var j = 0; j < myLists[i].videos.length; j++){
					if(videos[myLists[i].videos[j]] == undefined) { // 삭제된 비디오가 있으면 해당 비디오는 목록에서 제거한다.
						myLists[i].videos.splice(j, 1);
					}
				}
			}
			console.log("마맅 호출됨");
		}
	}).fail(function (message){
		console.log(message);
	});
}

function getTeamTitle() {
	console.log("getTeamTitle");
	$.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		url: hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/teams",
		success: function(json) {
			teams = json;
			sortTeams();
			for(var i = 0; i < teams.length; i++) { // waData에 선택된 팀 정보를 받아오고 없으면 첫번째 팀을 선택한다.
				if(teams[i].id == Number(waData.currentTeam)) {
					currentTeamIndex = i;
					break;
				} else {
					currentTeamIndex = 0;
				}
			}
			//console.log(teams);
			for(var i = 0; i < json.length; i++) { // drawer메뉴에 팀 이름을 추가한다.
				$(".teamTitleEnd").before('<div class="teamPage' + i + ' drawer_menu_sub" onclick="checkTeamPage(\'' + i + '\')">' + teams[i].name + '</div>');
			}
			checkTeamPage(currentTeamIndex); // 팀 이름에 체크표시를 한다.
		}
	}).fail(function (message){
		console.log(message);
	});
}

function getAds() {
	console.log("getAds");
	$.ajax({
		type: "GET",
		url: hbUrl + hbApiPath + "/ads?country=" + accounts.country + "&profession=" + accounts.profession + "&specialty=" + accounts.specialty,
		success: function(json){
			ads = json;
		},
		error: function(message) {
			alert("getAds : 서버와 통신 오류로 로그인할 수 없습니다!");
			//location.replace("start.html");
		}
	});
}

function getCredit() {
	console.log("getCredit");
	$.ajax({
		type: "GET",
		url: hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/credit",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		success: function(json) {
			credit = json;
			$(".current-my-ticket").html(credit.credit);
		},
		error: function(message) {
			alert("getCredit : 서버와 통신 오류로 로그인할 수 없습니다!");
			//location.replace("start.html");
		}
	});
}

function getProfessions() {
	console.log("getProfessions");
	$.ajax({
		type: "GET",
		url: hbUrl + hbApiPath + "/professions?lang=" + accounts.language,
		success: function(json){
			professions = json;
			for (var ii = 0; ii < professions.length; ii++) {
				if (professions[ii].id == accounts.profession) {
					accounts.professionName = professions[ii].name;
					break;
				}
			}
		},
		error: function(message){
			alert("getProfessions : 서버와 통신 오류로 로그인할 수 없습니다!");
			//location.replace("start.html");
		}
	});
}

function getSpecialties() {
	console.log("getSpecialties");
	$.ajax({
		type: "GET",
		url: hbUrl + hbApiPath + "/specialties?lang=" + accounts.language,
		success: function(json){
			specialties = json;
			for (var ii = 0; ii < specialties.length; ii++) {
				if (specialties[ii].id == accounts.specialty) {
					accounts.specialtyName = specialties[ii].name;
					break;
				}
			}
		},
		error: function(message){
			alert("getSpecialties : 서버와 통신 오류로 로그인할 수 없습니다!");
			//location.replace("start.html");
		}
	});
}

function createVideos() { // 카테고리의 갯수만큼 첫 12개의 인덱스를 2차원으로 만든다.
	console.log('createVideos');
	for( var i = videos_length; i-- ; ) {
		videos[i] = [];
	}
}

function createTopics(json) { // "자신만의 비디오 리스트"를 가지고 있는 소주제 객체를 배열에 할당한다.
	console.log('createTopics');
	var specialty = accounts.specialty;
	var profession = accounts.profession;
	profession -= profession % 100; 
	var video_specialties = [];
	var video_professions = [];
	var countries = [];
	topics = [];
	for( var i = json.length; i-- ; ) {
		video_specialties = json[i].specialties; 
		video_professions = json[i].professions; 
		video_countries = json[i].countries;
		video_languages = json[i].languages;
		if ( (-1 < video_specialties.indexOf(specialty))
				|| video_specialties.length == 0) {
			if ( (-1 < video_professions.indexOf(profession))
					|| video_professions.length == 0) {
				if ( (-1 < video_countries.indexOf(accounts.country))
						|| video_countries.length == 0 ) {
					if(video_languages.length == 0) {
						topics.push(json[i]);
						continue;
					}
					if (!waData.videoLang[0]) {
						topics.push(json[i]);
					} else {
						if (waData.videoLang[1]) {
							if ( waData.videoLang[2] && (-1 < video_languages.indexOf("en")) ) {
								topics.push(json[i]);
								continue;
							}
							if ( waData.videoLang[3] && (-1 < video_languages.indexOf("ko")) ) {
								topics.push(json[i]);
								continue;
							}
							if ( waData.videoLang[4] && (-1 < video_languages.indexOf("jp")) ) {
								topics.push(json[i]);
								continue;
							}
							if ( waData.videoLang[5] && (-1 < video_languages.indexOf("cn")) ) {
								topics.push(json[i]);
								continue;
							}
							if( !waData.videoLang[2] && !waData.videoLang[3] && !waData.videoLang[4] && !waData.videoLang[5]) {
								topics.push(json[i]);
								continue;
							}
						} else {
							if ( -1 < video_languages.indexOf(accounts.language) ) {
								topics.push(json[i]);
								continue;
							}
						}
					}
				}
			}
		}
	}
}

function categorizeVideos(json) { // 전체 비디오의 크기만큼 루프를 돈다.
								  // 루프를 돌며 하나의 비디오는 자기에게 맞는 카테고리에(0~11번 인덱스), 
								  // 자신의 ID를 key값으로 하는 HashMap에 총 2번 저장된다.(배열[ID]=비디오)
	console.log('categorizeVideos');
	var category_index = 0;
	//var video_specialties = [];
	for( var i = json.length; i-- ; ) {
		for (var jj = 0; jj < downloadedVideos.length; jj++) {
			if (json[i].id == downloadedVideos[jj].id) {
				json[i].expired_date = json[i].created;
			}
		}
		category_index = findIndexFromCode(json[i]);
		videos[category_index].push(json[i]); // 해당하는 카테고리에 할당받고,
		videos[json[i].id] = json[i];		  // 자신의 ID값에도 할당받는다.
	}
}

function findIndexFromCode(videos) { // A = 11, B = 10, ..., L = 0
	return 11-(videos.code.charCodeAt(0) - 97);
}

function sortVideos() { // 분류된 배열을 내림차순 정렬한다.
	console.log('sortVideos');
	for(var i = videos_length; i -- ; ) { // videos_length는 카테고리의 수, 총 12개의 배열을 각각 정렬한다.
		videos[i].sort(function(a, b) {
			return (a.title < b.title) ? 1 : -1;
		});
	}
}

function sortTopics() { // 분류된 배열을 내림차순 정렬한다.
	console.log('sortTopics');
	topics.sort( function (a, b) {
		return (a.name < b.name) ? 1 : -1;
	});
}

function sortTeams() { // 분류된 팀을 오름차순 정렬한다.
	console.log('sortTeams');
	teams.sort( function(a, b) {
		return (a.name > b.name) ? 1 : -1;
	});
}

function sortMyLists() { // MyLists를 오름차순 정렬한다.
	console.log('sortMyLists');
	myLists.sort( function(a, b) {
		return (a.name > b.name) ? 1 : -1;
	});
}

function sortBookMarks() { // BookMarks를 오름차순 정렬한다.
	console.log('sortBookMarks');
	bookMarks.sort( function(a, b) {
		return (videos[a].title > videos[b].title) ? 1 : -1;
	});
}

function sortTeamsMembersAccounts(index) { // teamsMembersAccounts를 이름 오름차순으로 정렬한다.
	console.log('sortTeamsMembersAccounts');
	teamsMembersAccounts[index].sort( function(a, b) {
		return (a.nickName > b.nickName) ? 1 : -1;
	});
}

function setModalMove() {
	$("#modal_setting").on("mousedown", ".modal-header", function(event) {
		$(".modal-header").css("cursor","move");
		isMouseClicked = true;
		preX = event.clientX;
		preY = event.clientY;
	});
	
	$("#modal_setting").on("mousemove", ".modal-header", function(event) {
		if (isMouseClicked) {
			var dialog = $(".modal-dialog");
			var top = parseInt(dialog.css("top"), 10);
			var left = parseInt(dialog.css("left"), 10);
			var newTop = left + event.clientX - preX;
			var newLeft = top + event.clientY - preY;
			dialog.css({
				"left" : newTop,
				"top" : newLeft
			});
			preX = event.clientX;
			preY = event.clientY;
		}
	});
	
	$("#modal_setting").on("mouseup", ".modal-header", function() {
		isMouseClicked = false;
		$(".modal-header").css("cursor","default");
	});
}

window.onclick = function(event) {
	event = event || window.event;
	var target = event.target || event.srcElement;
	  if (-1 == target.className.indexOf('my-list-menu') && target.id != "send_image") {
	    var dropdowns = document.getElementsByClassName("drop-down-content");
	    for (var i = 0; i < dropdowns.length; i++) {
	      var openDropdown = dropdowns[i];
	      if (openDropdown.classList.contains('drop-down-show')) {
	        openDropdown.classList.remove('drop-down-show');
	      }
	    }
	  }
	}
