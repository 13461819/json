function createDivPlayerYT() { // 유튜브 플레이어를 넣을 div를 만든다
	var player_yt = document.querySelector("#playerYT");
	if (player_yt) {
		player_yt.setAttribute('style', 'display: block');
		return;
	}
	var iframe_rwd = document.querySelector(".iframe-rwd");
	player_yt = document.createElement('div');
	player_yt.setAttribute('id', 'playerYT');
	player_yt.setAttribute('class', 'video');
	iframe_rwd.appendChild(player_yt);
}

function createDivPlayerFP() { // 플로우 플레이어를 넣을 div를 만든다
	var player_fp = document.querySelector("#playerFP");
	if (player_fp) {
		player_fp.setAttribute('style', 'display: block');
		return;
	}
	var iframe_rwd = document.querySelector(".iframe-rwd");
	player_fp = document.createElement('div');
	player_fp.setAttribute('id', 'playerFP');
	player_fp.setAttribute('class', 'video');
	iframe_rwd.appendChild(player_fp);
}

function disablePlayerYT() { //유튜브 플레이어가 있는 div를 숨긴다
	var player_yt = document.querySelector("#playerYT");
	if (player_yt) {
		player_yt.setAttribute('style', 'display: none');
	}
}

function disablePlayerFP() { //플로우 플레이어가 있는 div를 숨긴다
	var player_fp = document.querySelector("#playerFP");
	if (player_fp) {
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

function arrowRotate(arrowID) { //클릭할때마다 "+", "-" 토글한다.
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
function toggleMenu() { // drawer메뉴 꺼냈다가 넣었다가 토글
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

function toggleCont(contID, title) { // VIDEO와 TEAM 페이지를 토글한다.
	$(".container").css("display", "none");
	$("#" + contID).css("display", "block");
	changeHeaderTitle(title);
	toggleMenu();
}

function changeHeaderTitle(title) { // title의 text를 변경한다.
	$("#page_name").text(title);
}

function modalSendMessage() { // 보내기 버튼을 누르면 제일 먼저 실행되는 함수.
	var modal = $("#modal_setting");
	var sendHTML = "";
	//modal.html("");
	if(teams == "" || teams == null || teams == undefined) {
		sendHTML = 
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
						'안내) HealthBreeze 모바일 앱에서 팀을 만드셔야 합니다.<br>안내) To send Video(s), you should make a Team on the HealthBreeze mobile application.' +
						'</div>' +
					'</div>' +
					'<div class="modal-footer">' +
						'<button type="button" class="btn btn-success" data-dismiss="modal">확인</button>' +
					'</div>' +
				'</div>' +
			'</div>';
			modal.html(sendHTML);
			modal.modal('show');
	} else if(waData.sendMethod == 0) {
		$("#dropDownSendMethod").toggleClass("drop-down-show");
	} else if(waData.sendMethod == 1) {
		send2SMS();
	} else {
		send2Email();
	} 
}

function send2SMS() {
	$("#dropDownSendMethod").removeClass("drop-down-show");
	var modal = $("#modal_setting");
	modal.html(getSendSMSHTML());
	modal.modal('show');
	getTeamCredit(currentTeamIndex);
}

function send2Email() {
	$("#dropDownSendMethod").removeClass("drop-down-show");
	var modal = $("#modal_setting");
	modal.html(getSendEmailHTML());
	modal.modal('show');
	getTeamCredit(currentTeamIndex);
}

function getSendSMSHTML() {
	var sendHTML = '<div class="modal-dialog" style="top: 90px;">' +
	'<div class="modal-content" id="sendMessagePage">' +
		'<div class="modal-header">' +
			'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
			'<h2 class="modal-title">메시지 전송</h2>' +
		'</div>' +
		'<div class="modal-body">' +
			'<div align="center">' +
				'<select id="sendMessageTeam" onchange="changeTeamCredit(this.selectedIndex)" style="margin-bottom: 10px; width: 95%; text-align: center">';
					for(var i = 0; i < teams.length; i++) {
						if(i == currentTeamIndex) {
							sendHTML += '<option selected="selected" value="' +i + '">' + teams[i].name + '</option>';
						} else {
							sendHTML += '<option value="' + i + '">' + teams[i].name + '</option>';
						}
					}
				sendHTML +=	
				'</select>' +
				'<br>남은 티켓 : <span id="remain-ticket-num"><img src="/static/img/loading.gif" style="width: 24px"></span>' +
			'</div>' +
			'<img src="' + ads[0].image_url + '" class="send-ads">' +
			'<div align="center" style="margin-bottom: 10px">' +
				'선택된 비디오 : ' + selectedVideos.length + '개' +
				'<br>' +
			'</div>' +
//			'<div align="center">' +
//				'<textarea rows="3" cols="50" name="comment">메모를 입력하세요.</textarea>' +
//			'</div>' +
			'<div align="center">' +
				'번호 : ' + 
				'<input id="sendMessageCountryNumber" value="' + accounts.countryCode + '" type="number" style="width: 15%;" placeholder="국가"> &nbsp;'+
				'<input id="sendMessagePhoneNumber" type="tel" placeholder="휴대폰번호"> &nbsp;' +
			'</div>' +
		'</div>' +
		'<div class="modal-footer">' +
			'<button type="button" class="btn btn-info" onclick="confirmSendMessage()">보내기</button>' +
			'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
		'</div>' +
		'</div>' +
	'</div>';
	return sendHTML;
}

function getSendEmailHTML() {
	var sendHTML = '<div class="modal-dialog" style="top: 90px;">' +
		'<div class="modal-content" id="sendMessagePage">' +
			'<div class="modal-header">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">메시지 전송</h2>' +
			'</div>' +
			'<div class="modal-body">' +
				'<div align="center">' +
					'<select id="sendMessageTeam" onchange="changeTeamCredit(this.selectedIndex)" style="margin-bottom: 10px; width: 95%">';
						for(var i = 0; i < teams.length; i++) {
							if(i == currentTeamIndex) {
								sendHTML += '<option selected="selected" value="' +i + '">' + teams[i].name + '</option>';
							} else {
								sendHTML += '<option value="' + i + '">' + teams[i].name + '</option>';
							}
						}
					sendHTML +=	
					'</select>' +
					'<br>남은 티켓 : <span id="remain-ticket-num"><img src="/static/img/loading.gif" style="width: 24px;"></span>' +
				'</div>' +
				'<img src="' + ads[0].image_url + '" class="send-ads">' +
				'<div align="center" style="margin-bottom: 10px">' +
					'선택된 비디오 : ' + selectedVideos.length + '개' +
					'<br>' +
				'</div>' +
//				'<div align="center">' +
//					'<textarea rows="3" cols="50" name="comment">메모를 입력하세요.</textarea>' +
//				'</div>' +
				'<div align="center">' +
					'이메일 : ' + 
					'<input id="sendMessageEmail" type="email" style="width: 60%;" placeholder="이메일을 입력하세요."> &nbsp;'+
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-info" data-dismiss="modal" onclick="sendEmail()">보내기</button>' +
				'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	return sendHTML;
}

function confirmDownload() {
	showConfirmDialog(
			'',
			'Are you sure to leave "' + teams[index].name +'" team?',
			'Leave', function(){ deleteTeam(index) },
			'Cancel', function(){}
		);
}

function confirmAddBookMark() {
	showConfirmDialog(
			'',
			'Are you sure to add ' + selectedVideos.length + ' videos to bookmark?',
			'Add', function(){ addMookMark() },
			'Cancel', function(){}
		);
}

function confirmLogout() {
	showConfirmDialog(
			'',
			'Are you sure to Logout?',
			'Logout', function() {window.location.replace('start.html')},
			'Cancel', function(){}
			);
}

function addMookMark() {
	var data = {};
	data.videos = selectedVideos;
	$.ajax({
		type: "POST",
		url: hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/bookmarks",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data: JSON.stringify(data),
		success: function(json) {
			var accordion_m = $("#accordion_m");
			accordion_m.html("");
			accordion_m.html("<img src=\"/static/img/loading.gif\">");
			if (bookMarks) {
				bookMarks = bookMarks.concat(json);
				sortBookMarks();
				createBookMarkHTML();
				createMyListHTML();
			}
			selectedVideos = [];
			showSelectedList();
			$("input.checkbox").prop("checked", false);
			$(".list-group-item").css("background-color", "white");
			return;
		}
	}).fail( function(message){
		console.log(message);
	});
}

function sendEmail() {
	var team_id = teams[$("#sendMessageTeam").val()].id;
	var patient_mdn = $("#sendMessageEmail").val();
	var content = selectedVideos.join(",");
	content = "[" + content + "]";
	var data = {};
	data.patient_mdn = patient_mdn;
	data.content = content;
	
	$.ajax({
		type: "POST",
		url: hbUrl + hbApiPath + "/teams/" + team_id +"/video_rx",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			console.log(json);
			selectedVideos = [];
			showSelectedList();
			$("input.checkbox").prop("checked", false);			
			$(".list-group-item").css("background-color", "white");
		}
	}).fail( function (message){
		console.log(message);
	});
}

function confirmSendMessage() {
	var patient_cc =  $("#sendMessageCountryNumber").val();
	if (patient_cc !== accounts.countryCode) {
		showConfirmDialog(
				'경고!',
				'해외 전송은 5 티켓이 차감 됩니다. 진행하시겠습니까?',
				'OK', function(){
					sendMessage();
					$("#modal_setting").modal('hide');
				},
				'Cancel', function(){}
				);
	} else {
		sendMessage();
		$("#modal_setting").modal('hide');
	}
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
	
	$.ajax({
		type: "POST",
		url: hbUrl + hbApiPath + "/teams/" + team_id +"/video_rx",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			console.log(json);
			selectedVideos = [];
			showSelectedList();
			$("input.checkbox").prop("checked", false);			
			$(".list-group-item").css("background-color", "white");
		}
	}).fail( function (message){
		console.log(message);
	});
}

function onTopicLbtn() {
	var accordion_t = $("#accordion_t");
	if(accordion_t.html() == "" || accordion_t.html() == "<img src=\"/static/img/loading.gif\">") {
		accordion_t.html("<img src=\"/static/img/loading.gif\">");
		console.log("I'll make topics HTML now, just one time!")
		getTopics();
	}
}

function onMyListLbtn() {
	var accordion_m = $("#accordion_m");
	if(accordion_m.html() == "" || accordion_m.html() == "<img src=\"/static/img/loading.gif\">") {
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
				((title == null) ? '' : title) +
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

function keyUp(e, index) {
	e = e || window.event;
	if (e.keyCode == 13) {
		switch (e.target.id) {
		case 'input_new_team_name':
			createNewTeam();
			break;
		case 'input_change_team_name':
			changeTeamName(index);
			break;
		case 'input_profile_name':
			break;
		case 'input_new_list_name':
			createNewList();
			break;
		case 'input_insert_new_list_name':
			insertList();
			break;
		case 'input_change_list_name':
			changeListName(index);
			break;
		default:
			break;
		}
		$("#modal_setting").modal('hide');
		return false;
	}
	return true;
}

function couponKeyUp(event) {
	event = event || window.event;
	var prev = $(event.target).prev('.form-control');
	var curr = $(event.target)
	var next = $(event.target).next('.form-control');
	switch (event.keyCode) {
	case 8:
		if(event.target.value.length == 0) $(event.target).prev('.form-control').focus();
		break;
	case 13:
		if(!next.length && curr.val().length == 4) submitCoupon();
		break;
	default:
		if(curr.val().length == 4) next.focus();
		break;
	}
}

function ticketFocus(event) {
	event = event || window.event;
	var prev = $(event.target).prev('.form-control');
	var curr = $(event.target)
	if(prev.length != 0 && curr.val().length == 0 && (prev.val().length != 4)) $(event.target).prev('.form-control').focus();
}

function submitCoupon() {
	var data = {};
	var couponText = "";
	for( var i = 0; i < 4; i++) couponText += $("#couponText" + i).val();
	data.code = couponText;
	$.ajax({
		type: "POST",
		url: hbUrl + hbApiPath + "/coupons",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			console.log(json);
			showConfirmDialog(
				null,
				'쿠폰 ' + json.credit + "개가 충전되었습니다.",
				'OK', function(){}
			);
		}
	}).fail( function (message){
		console.log(message);
		showConfirmDialog(
			message.responseJSON.message,
			'존재하지 않는 쿠폰입니다.',
			'OK', function(){}
		);
	});
	$("#modal_setting").modal('hide');
}