function createDivPlayerYT() {
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
}

function createDivPlayerFP() {
	var player_fp = document.querySelector("#playerFP");
	if(player_fp) {
		player_fp.setAttribute('style', 'display: block');
		return;
	}
	var iframe_rwd = document.querySelector(".iframe-rwd");
	player_fp = document.createElement('div');
	player_fp.setAttribute('id', 'playerFP');
	player_fp.setAttribute('class', 'video');
	iframe_rwd.appendChild(player_fp);
}

function disablePlayerYT() {
	var player_yt = document.querySelector("#playerYT");
	if(player_yt) {
		player_yt.setAttribute('style', 'display: none');
	}
}

function disablePlayerFP() {
	var player_fp = document.querySelector("#playerFP");
	if(player_fp) {
		player_fp.setAttribute('style', 'display: none');
	}
}

/*
function removePlayerDiv() {
	var iframe_rwd = document.querySelector(".iframe-rwd");
	var old_div_player = document.querySelector("#playerYT");
	if(old_div_player)
		iframe_rwd.removeChild(old_div_player);
}
*/

function convertPlayTime(playtime) { // 3자리 숫자로 되어있는 playTime을 mm분 ss초로 변환한다.
	var min, sec = 0;
	min = Math.floor(playtime / 60);
	if(min < 10) min = "0" + min;
	sec = playtime % 60;
	if(sec < 10) sec = "0" + sec;
	return ("(" + min + ":" + sec + ")");
}

var accordion_resize = function() { // 화면 크기가 변경되면 리스트의 크기도 같이 변경한다.
	$('#accordion_r').height($(window).height() - $('#draw_menu_button').height() - 150);
	$('#accordion_t').height($(window).height() - $('#draw_menu_button').height() - 150);
	$('#accordion_m').height($(window).height() - $('#draw_menu_button').height() - 150);
}

var arrow; // 각 리스트에 있는 카테고리 제목의 +, - 모양 아이콘

function recommendArrowRotate(arrowID) { 
	console.log("recommendArrowRotate");
	arrow = $("#recommendArrow" + arrowID);
	
	
	if(arrow.hasClass("glyphicon-plus-sign")) {
		arrow.removeClass("glyphicon-plus-sign");
		arrow.addClass("glyphicon-minus-sign");
	} else {
		arrow.removeClass("glyphicon-minus-sign");
		arrow.addClass("glyphicon-plus-sign");
	}
	
	/*
	clearInterval(rotateINT);
	rotateINT = setInterval("arrowRotate()", 10);*/
}

function searchArrowRotate(arrowID) {
	console.log("searchArrowRotate");
	arrow = $("#searchArrow" + arrowID);
	
	
	if(arrow.hasClass("glyphicon-plus-sign")) {
		arrow.removeClass("glyphicon-plus-sign");
		arrow.addClass("glyphicon-minus-sign");
	} else {
		arrow.removeClass("glyphicon-minus-sign");
		arrow.addClass("glyphicon-plus-sign");
	}
	
	/*
	clearInterval(rotateINT);
	rotateINT = setInterval("arrowRotate()", 10);*/
}

function topicArrowRotate(arrowID) {
	console.log("topicArrowRotate");
	arrow = $("#topicArrow" + arrowID);
	/*
	clearInterval(rotateINT);
	rotateINT = setInterval("arrowRotate()", 10);
	*/
	if(arrow.hasClass("glyphicon-plus-sign")) {
		arrow.removeClass("glyphicon-plus-sign");
		arrow.addClass("glyphicon-minus-sign");
	} else {
		arrow.removeClass("glyphicon-minus-sign");
		arrow.addClass("glyphicon-plus-sign");
	}
}

function myListArrowRotate(arrowID) {
	console.log("myListArrowRotate");
	arrow = $("#myListArrow" + arrowID);
	/*
	clearInterval(rotateINT);
	rotateINT = setInterval("arrowRotate()", 10);
	*/
	if(arrow.hasClass("glyphicon-plus-sign")) {
		arrow.removeClass("glyphicon-plus-sign");
		arrow.addClass("glyphicon-minus-sign");
	} else {
		arrow.removeClass("glyphicon-minus-sign");
		arrow.addClass("glyphicon-plus-sign");
	}
}

var isMenuOn = false;
function toggleMenu() {
	var menu = $("#drawer_menu");
	var label = $("#drawer_menu_label");
	if(isMenuOn) {
		menu.css("left", "-300px");
		label.css("height", "0px");
		label.css("width", "0px");
		isMenuOn = false;
	} else {
		menu.css("left", "0px");
		label.css("height", "100vh");
		label.css("width", "100%");
		isMenuOn = true;
	}
}

function toggleCont(value) {
	var cont1 = $("#cont1");
	var cont2 = $("#cont2");
	var page_name = $("#page_name");
	if(value == 'VIDEO') {
		cont2.hide();
		cont1.show();
	} else {
		cont1.hide();
		cont2.show();
	}
	page_name.text(value);
	toggleMenu();
}

function createNewTeam() {
	var modal = $("#modal_setting");
	var settingHTML = "";
	modal.html(settingHTML);
	settingHTML +=
	'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">새로운 팀 만들기</h2>' +
			'</div>' +
			'<div class="modal-body"' +
			'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				'<div class="form-group">' +
					'<label for="inputdefault">팀 이름</label>' +
					'<input class="form-control" placeholder="만드실 팀 이름을 입력하세요." id="inputdefault" type="text">' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">팀 만들기</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(settingHTML);
}

function onTopicLbtn() {
	var accordion_t = $("#accordion_t");
	if(accordion_t.html() == "") {
		accordion_t.html("else");
		console.log("I'll make topics HTML now, just one time!")
		getTopics();
	}
}

function onMyListLbtn() {
	var accordion_m = $("#accordion_m");
	if(accordion_m.html() == "") {
		accordion_m.html("else");
		console.log("I'll make My List HTML now, just one time!")
		getMyLists();
	}
}

function clickTeamPage(index) {
	if($("#team" + index).html() == null) {
		createTeamPage(index);
	}
}

function createTeamPage(index) {
	$("#modal_setting").before('<div class="container" id="team' + index + '">team' + index + ' page</div>');
	var account = JSON.parse(sessionStorage.getItem("accounts"));
	var teams = JSON.parse(sessionStorage.getItem("teams"));
	var team = teams[index];
	var teamHTML = "";
	$.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(account.userId + "-" + account.deviceId + ":" + account.sessionKey))
		},
		url: "https://hbreeze4ani.appspot.com/api/v1/accounts/" + team.owner + "/credit",
		success: function(json) {
			
			

			$("#team" + index).html('team' + index + ' page');
			console.log("관리자의 남은 티켓 : " + json.credit);
		}
	}).fail(function (message){
		console.log(message);
	});
	/*
	<div class="container" id="cont2" style="display: none;">
	<div class="row">
		<div class="col-lg-5" style="padding-right: 0px;">
			<div class="row">
				<div class="col-md-12">
					<img alt="팀 사진" class="img-responsive team_image" src="../image/dog.png">
				</div>
			</div>
			<div>
				<div class="col-md-12" style="height: 50px;">
					<img alt="남은 티켓 수" style="float: left; width: 10%; height: 35px; vertical-align: middle;" class="img-responsive" src="../image/ticket.png">
					<div style="float: left; width: 80%; text-align: center; font-size: 20px;">관리자의 남은 티켓 : <span id="remain_ticket">28</span></div>
					<img alt="티켓 사용 량" style="float: right;  width: 10%; height: 35px; vertical-align: middle;" class="img-responsive" src="../image/amount_used.png">
				</div>
			</div>
			<div class="row" style="background-color: rgb(210,210,210); clear: both;">
				<div class="col-md-12">관리자</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<img alt="팀 사진" class="img-responsive" src="../image/silhouette.png">
				</div>
				<div class="col-md-8">
					<div>김동현</div>
					<div>의사(인턴)</div>
					<div>호스피스</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12" style="text-align: center;">팀의 연락처 보기</div>
			</div>
			<div class="row">
				<div class="col-md-12" style="text-align: center;">이 팀을 떠나기</div>
			</div>
		</div>
		<div class="col-lg-7" id="team_page">
			<div data-toggle="modal" data-target="#modal_setting"
				onclick="showTeamSetting('팀 사진 변경')">팀 사진 변경</div>
			<div data-toggle="modal" data-target="#modal_setting"
				onclick="showTeamSetting('팀 이름 변경')">팀 이름 변경</div>
			<div data-toggle="modal" data-target="#modal_setting"
				onclick="showTeamSetting('연락처 설정')">연락처 설정</div>
			<div data-toggle="modal" data-target="#modal_setting"
				onclick="showTeamSetting('팀원 추가')">팀원 추가</div>
			<div data-toggle="modal" data-target="#modal_setting"
				onclick="showTeamSetting('팀원 관리')">팀원 관리</div>
			<div data-toggle="modal" data-target="#modal_setting"
				onclick="showTeamSetting('관리자 변경')">관리자 변경</div>
			<div data-toggle="modal" data-target="#modal_setting"
				onclick="showTeamSetting('암호로 설명처방 보호')">암호로 설명처방 보호</div>
		</div>
	</div>
</div>
	*/
}