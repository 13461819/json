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
var topics = []; // 21개의 소주제 객체 리스트
				 // 각각의 소주제 객체는 자체적으로 비디오 리스트를 가지고 있다.
var selectedVideos = []; // 체크박스에서 선택 된 비디오의 배열
var accounts = JSON.parse(sessionStorage.getItem("accounts"));
var teams;
var myLists;
var bookMarks;
var currentTeamIndex;
var credit;
var ads;
var professions;
var specialties;

function getVideos() {	//비디오 API를 이용해서 videos[] 배열에 값을 할당한다.
	$("#accordion_r").html("<img src=\"../image/loading.gif\">");
	$.getJSON("https://hbreeze4ani.appspot.com/api/v1/videos",
					function(json) {
						createVideos(); // 카테고리의 갯수만큼 첫 12개의 리스트들을 2차원 배열로 만든다.
						categorizeVideos(json); // 첫 12개의 인덱스에는 카테고리에 맞게 비디오를 분류해서 2차원 배열을 채운다.
												// 나머지 인덱스에는 비디오 ID값을 이용해 배열의 인덱스에 [Key: ID] = Value: 비디오 값으로 채운다.
						sortVideos(); // 첫 12개의 인덱스에 들어있는 카테고리별 비디오만 각각 정렬한다.
						createRecommendHTML(); //정렬 된 배열을 가지고 HTML코드를 생성한다.
						//getTopics(); // 비디오 배열이 완성 되었으면 소주제 API를 받아온다.
					})
			.fail( function (message) {
				alert("서버와 통신 오류로 로그인할 수 없습니다!");
				sessionStorage.removeItem("accounts");
				location.replace("login2.html");
			});
}

function getTopics() {
	console.log("getTopics");
	$.getJSON("https://hbreeze4ani.appspot.com/api/v1/topics",
			function(json) {
				createTopics(json); // 소주제별은 받아 온 API대로 각각의 객체를 그냥 배열에 넣는다. 
				sortTopics(); // 객체의 순서를 정렬한다.
				createTopicHTML(); // 정렬 된 배열을 가지고 HTML코드를 생성한다.
				//createMyListHTML(); //My List의 HTML코드를 생성한다.
				//loadYouTubePlayer();
			})
		.fail( function (message) {
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			sessionStorage.removeItem("accounts");
			location.replace("login2.html");
		});
}

function getMyLists() {
	//var account = JSON.parse(sessionStorage.getItem("accounts"));
	var when1 = $.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		url: "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/bookmarks",
		success: function(json) {
			bookMarks = json;
			console.log("붘맠 호출됨");
			//sessionStorage.setItem("my_lists", JSON.stringify(json));
			//createMyListHTML(); //My List의 HTML코드를 생성한다.
		}
	}).fail(function (message){
		console.log(message);
	});
	
	var when2 = $.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		url: "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/mylists",
		success: function(json) {
			myLists = json;
			console.log("마맅 호출됨");
			//sessionStorage.setItem("my_lists", JSON.stringify(json));
			//createMyListHTML(); //My List의 HTML코드를 생성한다.
		}
	}).fail(function (message){
		console.log(message);
	});
	
	$.when(when1, when2).done(function() {
		console.log("2개 다 호출됨");
		createBookMarkHTML();
		sortMyLists();
		createMyListHTML();
	});
}

function getTeamTitle() {
	//var account = JSON.parse(sessionStorage.getItem("accounts"));
	console.log("getTeamTitle");
	$.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		url: "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/teams",
		success: function(json) {
			currentTeamIndex = Number(localStorage.getItem("currentTeam")) || 0;
			teams = json;
			sortTeams();
			//console.log(teams);
			//sessionStorage.setItem("teams", JSON.stringify(json));
			for(var i = 0; i < json.length; i++) {
				$(".teamTitleEnd").before('<div class="drawer_menu_sub teamPage' + i + '" onclick="clickTeamPage(\'' + i + '\')">' + teams[i].name + '</div>');
			}
			checkTeamPage(currentTeamIndex);
		}
	}).fail(function (message){
		console.log(message);
	});
}

function getAds() {
	console.log("getAds");
	$.ajax({
		type: "GET",
		url: "https://hbreeze4ani.appspot.com/api/v1/ads?country=" + accounts.country + "&profession=" + accounts.profession + "&specialty=" + accounts.specialty,
		success: function(json){
			ads = json;
		},
		error: function(message) {
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			sessionStorage.removeItem("accounts");
			location.replace("login2.html");
		}
	});
}

function getCredit() {
	console.log("getCredit");
	$.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		url: "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/credit",
		success: function(json) {
			credit = json;
		},
		error: function(message) {
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			sessionStorage.removeItem("accounts");
			location.replace("login2.html");
		}
	});
}

function getProfessions() {
	console.log("getProfessions");
	$.ajax({
		type: "GET",
		url: "https://hbreeze4ani.appspot.com/api/v1/professions?lang=ko",
		success: function(json){
			professions = json;
			//console.log(professions);
		},
		error: function(message){
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			sessionStorage.removeItem("accounts");
			location.replace("login2.html");
		}
	});
}

function getSpecialties() {
	console.log("getSpecialties");
	$.ajax({
		type: "GET",
		url: "https://hbreeze4ani.appspot.com/api/v1/specialties?lang=ko",
		success: function(json){
			specialties = json;
			//console.log(specialties);
		},
		error: function(message){
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			sessionStorage.removeItem("accounts");
			location.replace("login2.html");
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
	//var specialty = JSON.parse(sessionStorage.getItem("accounts")).specialty;
	//var profession = JSON.parse(sessionStorage.getItem("accounts")).profession;
	var specialty = accounts.specialty;
	var profession = accounts.profession;
	profession -= profession % 100; 
	var video_specialties = [];
	var video_professions = [];
	var countries = [];
	for( var i = json.length; i-- ; ) {
		video_specialties = json[i].specialties; 
		video_professions = json[i].professions; 
		countries = json[i].countries;
		if( (-1 < video_specialties.indexOf(specialty))
				|| video_specialties.length == 0) {  // video_specialties값을 가지고 topics를 구성한다.
			if( (-1 < video_professions.indexOf(profession))
					|| video_professions.length == 0) {
				if( (-1 < countries.indexOf("KR"))
						|| countries.length == 0) {
					topics.push(json[i]);
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
		//video_specialties = json[i].specialties;
		//if(-1 < video_specialties.indexOf(3009)) {  // video_specialties값을 가지고 videos를 구성한다.
			// 각각의 비디오는 자신만의 code값을 가지고 있으며 코드값의 첫번째 알파벳으로 카테고리를 식별한다.
			category_index = findIndexFromCode(json[i]);
			
			videos[category_index].push(json[i]); // 해당하는 카테고리에 할당받고,
			videos[json[i].id] = json[i];		  // 자신의 ID값에도 할당받는다.
		//}
	}
}

function findIndexFromCode(value) { // A = 11, B = 10, ..., L = 0
	return 11-(value.code.charCodeAt(0) - 97);
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

function sortMyLists() { // 분류된 팀을 오름차순 정렬한다.
	console.log('sortMyLists');
	myLists.sort( function(a, b) {
		return (a.name > b.name) ? 1 : -1;
	});
}