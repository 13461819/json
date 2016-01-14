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
	$('#my_header>div').width($('#main_body.row').width() - 30);
}

var arrow; // 각 리스트에 있는 카테고리 제목의 +, - 모양 아이콘

function arrowRotate(arrowID) {
	console.log("arrowRotate");
	arrow = $("#" + arrowID);
	if(arrow.hasClass("glyphicon-plus-sign")) {
		arrow.removeClass("glyphicon-plus-sign");
		arrow.addClass("glyphicon-minus-sign");
	} else {
		arrow.removeClass("glyphicon-minus-sign");
		arrow.addClass("glyphicon-plus-sign");
	}
}

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

function toggleCont(contID, title) {
	var cont = $(".container");
	var targetCont = $("#" + contID);
	cont.css("display", "none");
	targetCont.css("display", "block");
	var page_name = $("#page_name");
	page_name.text(title);
	toggleMenu();
}

function createNewTeamPage() {
	var modal = $("#modal_setting");
	var createNewTeamHTML = "";
	modal.html(createNewTeamHTML);
	createNewTeamHTML +=
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
					'<input class="form-control" placeholder="만드실 팀 이름을 입력하세요." id="input_new_team_name" type="text">' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal" onclick="createNewTeam()">팀 만들기</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(createNewTeamHTML);
}

function createNewTeam() {
	var newTeamName = $("#input_new_team_name").val();
	console.log(newTeamName);
}

function modalSendMessage() {
	var modal = $("#modal_setting");
	var sendHTML = 
	'<div class="modal-dialog">' +
		'<div class="modal-content" id="sendMessagePage">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">메시지 전송</h2>' +
			'</div>' +
			'<div class="modal-body"' +
				'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				'<div align="center">' +
					'<select id="sendMessageTeam" onchange="changeTeamCredit(this.selectedIndex)">';
						for(var i = 0; i < teams.length; i++) {
							if(i == currentTeamIndex) {
								sendHTML += '<option selected="selected" value="' +i + '">' + teams[i].name + '</option>';
							} else {
								sendHTML += '<option value="' + i + '">' + teams[i].name + '</option>';
							}
						}
					sendHTML +=	
					'</select>' +
					'&nbsp;남은 티켓 : <span id="remain-ticket-num"><img src="/static/img/loading.gif" style="width: 24px;"></span>' +
				'</div>' +
				'<img src="' + ads[0].image_url + '" style="max-width: 100%; padding: 15px; height: 437px;">' +
				'<div align="center">' +
					'선택된 비디오 : ' + selectedVideos.length + '개' +
					'<br><br>' +
				'</div>' +
				'<div align="center">' +
					'번호 : ' + 
					'<input id="sendMessageCountryNumber" type="number" style="width: 15%;" placeholder="국가"> &nbsp;'+
					'<input id="sendMessagePhoneNumber" type="number" placeholder="휴대폰번호"> &nbsp;' +
					'<button onclick="sendMessage()" data-dismiss="modal">확인</button>' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">닫기</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(sendHTML);
	getTeamCredit(currentTeamIndex);
}
/*
function getSendMessageHTML() {
	var sendHTML = 
		'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">메시지 전송</h2>' +
			'</div>' +
			'<div class="modal-body"' +
				'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				'<div align="center">' +
					'<select id="sendMessageTeam">';
						for(var i = 0; i < teams.length; i++) {
							if(i == currentTeamIndex) {
								sendHTML += '<option selected="selected" value="' +i + '">' + teams[i].name + '</option>';
							} else {
								sendHTML += '<option value="' + i + '">' + teams[i].name + '</option>';
							}
						}
					sendHTML +=	
					'</select>' +
					'&nbsp;남은 티켓 : ' + credit.credit +
				'</div>' +
				'<img src="' + ads[0].image_url + '" style="max-width: 100%; padding: 15px;">' +
				'<div align="center">' +
					'선택된 비디오 : ' + selectedVideos.length + '개' +
					'<br><br>' +
				'</div>' +
				'<div align="center">' +
					'번호 : ' + 
					'<input id="sendMessageCountryNumber" type="number" style="width: 15%;" placeholder="국가"> &nbsp;'+
					'<input id="sendMessagePhoneNumber" type="number" placeholder="휴대폰번호"> &nbsp;' +
					'<button onclick="sendMessage()" data-dismiss="modal">확인</button>' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">닫기</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	return sendHTML;
}

function modalSendMessageLoading(modal) {
	var sendHTML = "";
	modal.html(sendHTML);
	sendHTML +=
		'<div class="modal-dialog">' +
			'<div class="modal-content">' +
				'<div class="modal-header"' +
					'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
					'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
					'<h2 class="modal-title">메시지 전송</h2>' +
				'</div>' +
				//'<div class="modal-body" style="text-align:center; vertical-align:middle; line-height: 592px;' +
				'<div class="modal-body" style="text-align:center;' +
					' height: 592px; font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
						'<img src="/static/img/loading.gif">' +
					'</div>' +
				'<div class="modal-footer">' +
					'<button type="button" class="btn btn-success" data-dismiss="modal">닫기</button>' +
				'</div>' +
			'</div>' +
		'</div>';
	modal.html(sendHTML);
}
*/

function changeTeamCredit(index) {
	console.log("changeTeamCredit");0
	for(var i = 0; i < teamCredits.length; i++) {
		if(teamCredits[i].team == teams[index].id) {
			$("#remain-ticket-num").html(teamCredits[i].credit);
		}
	}
}

function getTeamCredit(index, where) {
	console.log("getTeamCredit");
	
	var team_ids = [];
	for(var i = 0; i < teams.length; i++) {
		team_ids[i] = teams[i].id;
	}
	team_ids = team_ids.join(",");
	
	var url = "";
	if(where == "teamPage") {
		url = "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/teams/credit?team_ids=" + teams[index].id;
	} else {
		url = "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/teams/credit?team_ids=" + team_ids;
	}
	
	$("#remain-ticket-num").html('<img src="/static/img/loading.gif" style="width: 24px;">');
	$.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		url: url,
		success: function(json) {
			teamCredits = json;
			for(var i = 0; i < teamCredits.length; i++) {
				if(teamCredits[i].team == teams[index].id) {
					if(where == "teamPage") {
						$("#remain-ticket-num" + index).html(teamCredits[i].credit);
					} else {
						$("#remain-ticket-num").html(teamCredits[i].credit);
					}
				}
			}
		},
		error: function(message) {
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			sessionStorage.removeItem("accounts");
			location.replace("login.html");
		}
	});
}

function sendMessage() {
	var team_id = teams[$("#sendMessageTeam").val()].id;
	var patient_cc =  $("#sendMessageCountryNumber").val();
	var patient_mdn = $("#sendMessagePhoneNumber").val();
	var content = selectedVideos.join(",");
	content = "[" + content + "]";
	var data = {};
	data.patient_cc = patient_cc;
	data.patient_mdn = patient_mdn;
	data.content = content;
	
	console.log(team_id);
	console.log(patient_cc);
	console.log(patient_mdn);
	console.log(content);
	console.log(JSON.stringify(data));
	
	$.ajax({
		type: "POST",
		url: "https://hbreeze4ani.appspot.com/api/v1/teams/" + team_id +"/video_rx",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		data : JSON.stringify(data),
		success: function(json) {
			console.log(json);
		}
	}).fail( function (message){
		console.log(message);
	});
}

function modalInsertList() {
	if(bookMarks == null) getSubBookMarks();
	if(myLists == null) getSubMyLists();

	var modal = $("#modal_setting");
	var insertHTML = "";

	$.when(when_bookMarks, when_myLists).done(function() {
		sortMyLists();
		insertHTML = 
		'<div class="modal-dialog">' +
			'<div class="modal-content" id="sendMessagePage">' +
				'<div class="modal-header"' +
					'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
					'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
					'<h2 class="modal-title">내 목록에 추가</h2>' +
				'</div>' +
				'<div class="modal-body"' +
					'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
					'<form role="form" id="radio_insert_list_name">' +
						'<div class="radio">' +
							'<label><input type="radio" name="list_name" value="">새 목록에 추가&nbsp;&nbsp;<input type="text" placeholder="새 목록 이름" id="input_insert_new_list_name"></label>' +
						'</div>';
						for(var i = 0; i < myLists.length; i++) {
							insertHTML +=
							'<div class="radio">' +
								'<label><input type="radio" name="list_name" value="' + myLists[i].name + '">' + myLists[i].name + '</label>' +
							'</div>';
						}
						insertHTML +=
						'<br>' +
					 '</form>' +
					 '<button data-dismiss="modal" onclick="insertList()">추가하기</button>' +
					 //'<button onclick="insertList()">추가하기</button>' +
				'</div>' +
				'<div class="modal-footer">' +
					'<button type="button" class="btn btn-success" data-dismiss="modal">닫기</button>' +
				'</div>' +
			'</div>' +
		'</div>';
	modal.html(insertHTML);
	});
}

function insertList() {
	var name = $("input[name='list_name']:checked").val();
	var type = "";
	var url = "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/mylists";
	var data = {};
	var targetList;
	data.videos = [];
	
	if(name == "" || name == undefined) {
		name = $("#input_insert_new_list_name").val();
		type = "POST";
	} else {
		type = "PUT";
		for(var i = 0; i < myLists.length; i++) {
			if(myLists[i].name == name) {
				targetList = myLists[i];
				url = url + "/" + targetList.id;
				data.videos = targetList.videos;
			}
		}
	}
	
	data.name = name;
	data.videos = data.videos.concat(selectedVideos);
	console.log(data);
	
	$.ajax({
		type: type,
		url: url,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		data : JSON.stringify(data),
		success: function(json) {
			var accordion_m = $("#accordion_m");
			accordion_m.html("");
			accordion_m.html("<img src=\"/static/img/loading.gif\">");
			if(type == "PUT") {
				targetList.videos = data.videos
				when_myLists = true;
			} else {
				getSubMyLists(); 
			}
			$.when(when_myLists).done(function() {
				createBookMarkHTML();
				sortMyLists();
				createMyListHTML();
				refreshCheckBox();
			});
		}
	}).fail( function (message){
		console.log(message);
	});
}

function createTeamPage(index) {
	$("#modal_setting").before('<div class="container" id="team' + index + '"><img src=\"/static/img/loading.gif\"></div>');
	$("#team" + index).html(getCreateTeamPageHTML(index));
}

function getCreateTeamPageHTML(index) {
	var team = teams[index];
	var teamHTML =
	'<div class="row">' +
		'<div class="col-lg-5" style="padding-right: 0px;">' +
			'<div class="row">' +
				'<div class="col-md-12">' +
					'<img alt="팀 사진" style="height: 182px;" class="img-responsive team_image" src="' + team.banner + '">' +
				'</div>' +
			'</div>' +
			'<div>' +
				'<div class="col-md-12" style="height: 50px;">' +
					'<img alt="남은 티켓 수" style="float: left; width: 10%; height: 35px; vertical-align: middle;" class="img-responsive" src="/static/img/ticket.png">' +
					'<div style="float: left; width: 80%; text-align: center; font-size: 20px;">관리자의 남은 티켓 : <span id="remain-ticket-num' + index + '">' +
						'<img src="/static/img/loading.gif" style="width: 24px;"></span></div>' +
					'<img alt="티켓 사용 량" style="float: right;  width: 10%; height: 35px; vertical-align: middle;" class="img-responsive" src="/static/img/amount_used.png">' +
				'</div>' +
			'</div>' +
			'<div class="row" style="background-color: rgb(210,210,210); clear: both;">' +
				'<div class="col-md-12">관리자</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-md-4">' +
					'<img alt="관리자 사진" class="img-responsive" src="' + accounts.picture + '">' +
				'</div>' +
				'<div class="col-md-8">' +
					'<div>' + accounts.nickName + '</div>' +
					'<div>의사(인턴)</div>' +
					'<div>호스피스</div>' +
				'</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-md-12" style="text-align: center;">팀의 연락처 보기</div>' +
			'</div>' +
			'<div class="row">' +
				'<div class="col-md-12" style="text-align: center;">이 팀을 떠나기</div>' +
			'</div>' +
		'</div>' +
		'<div class="col-lg-7" id="team_page">' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'팀 사진 변경\')">팀 사진 변경</div>' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'팀 이름 변경\')">팀 이름 변경</div>' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'연락처 설정\')">연락처 설정</div>' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'팀원 추가\')">팀원 추가</div>' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'팀원 관리\')">팀원 관리</div>' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'관리자 변경\')">관리자 변경</div>' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'암호로 설명처방 보호\')">암호로 설명처방 보호</div>' +
		'</div>' +
	'</div>';
	return teamHTML;
}

function onTopicLbtn() {
	var accordion_t = $("#accordion_t");
	if(accordion_t.html() == "") {
		accordion_t.html("<img src=\"/static/img/loading.gif\">");
		console.log("I'll make topics HTML now, just one time!")
		getTopics();
	}
}

function onMyListLbtn() {
	var accordion_m = $("#accordion_m");
	if(accordion_m.html() == "") {
		accordion_m.html("<img src=\"/static/img/loading.gif\">");
		console.log("I'll make My List HTML now, just one time!")
		getMyLists();
	}
}


function clickTeamPage(index) {
	checkTeamPage(index);
	localStorage.setItem("currentTeam", teams[index].id);
	currentTeamIndex = index;
	var team = $("#team" + index);
	if(team.html() == null) {
		createTeamPage(index);
	}
	getTeamCredit(index, "teamPage");
	toggleCont("team" + index, teams[index].name);
}

function checkTeamPage(index) {
	$(".teamCheck").remove();
	var targetTeamPage = $(".teamPage" + index);
	targetTeamPage.append('<img class="teamCheck" src="/static/img/check.png">');
}

function myListMenu() {
	$("#myDropdown").toggleClass("drop-down-show");
}

function modalChangeListName(index) {
	$("#myDropdown").removeClass("drop-down-show");
	
	var modal = $("#modal_setting");
	var changeListNameHTML = "";
	modal.html(changeListNameHTML);
	changeListNameHTML +=
	'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">내 목록 이름 변경</h2>' +
			'</div>' +
			'<div class="modal-body"' +
			'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				'<div class="form-group">' +
					'<label for="inputdefault">목록 이름</label>' +
					'<input class="form-control" placeholder="' + myLists[index].name + '" id="input_change_list_name" type="text">' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal" onclick="changeListName(' + index +')">목록 이름 변경</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(changeListNameHTML);
	
	/*
	createBookMarkHTML();
	sortMyLists();
	createMyListHTML();
	refreshCheckBox();*/
}

function changeListName(index) {
	var name =  $("#input_change_list_name").val();
	if(name == undefined || name == "") {
		alert("리스트 이름을 입력해주세요");
		return;
	}
	var data = myLists[index];
	data.name = name;
	$.ajax({
		type: "PUT",
		url: "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/mylists/" + myLists[index].id,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		data : JSON.stringify(data),
		success: function(json) {
			myLists[index] = data;
			createBookMarkHTML();
			sortMyLists();
			createMyListHTML();
			refreshCheckBox();
		}
	}).fail( function (message){
		console.log(message);
	});
}

function deleteList(index) {
	$("#myDropdown").removeClass("drop-down-show");
	if( confirm("\"" + myLists[index].name + "\" 리스트를 정말 삭제하시겠습니까?") ) {
		$.ajax({
			type: "DELETE",
			url: "https://hbreeze4ani.appspot.com/api/v1/accounts/" + accounts.userId + "/mylists/" + myLists[index].id,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
			},
			success: function(json){
				console.log(json);
				myLists.splice(index, 1);
				createBookMarkHTML();
				sortMyLists();
				createMyListHTML();
				refreshCheckBox();
			},
			error: function(message){
				console.log(message);
			}
		});
		
	}
}

function closeConfirmDialog() {
	console.log("closeConfirmDialog");
	$(".confirm-dialog")
	.css("display", "none");
	$("#confirm-bg")
	.css("width", "0px")
	.css("height", "0px");
	$(".confirm-dialog").remove();
}

function showConfirmDialog(title, msg) {
	var html = "";
	var count = 0;
	var texts = [];
	var funcs = [];
	for(var i = 0, argument = 2; argument < arguments.length; i++, argument+=2) {
		texts[i] = arguments[argument];
		funcs[i] = arguments[argument+1];
		count++;
	}
	
	html +=
		'<div class="confirm-dialog">' +
			'<div class="confirm-content">' +
				'<div class="confirm-header">' +
					title +
				'</div>' +
				'<div class="confirm-body">' +
					msg +
				'</div>' +
				'<hr>' +
				'<div class="confirm-footer">';
				for(var i = 0; i < count; i++) {
					html += '<span id="confirm-btn' + i + '" class="confirm-btn confirm-btn' + count + '">' + texts[i] + '</span>';
				}
				html +=
				'</div>' +
			'</div>' +
		'</div>';
	
	$("#confirm-bg").before(html);
	
	for (var i = 0; i < count; i++) {
		$("#confirm-btn" + i).click((function(func) {
			return function () {
				func();
				closeConfirmDialog();
			}
		})(funcs[i]));
	}
	
	$(".confirm-dialog")
	.css("display", "block");
	$("#confirm-bg")
	.css("width", "100vw")
	.css("height", "100vh");
}