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