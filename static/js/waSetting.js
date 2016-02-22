function showSetting(settingName) {
	toggleMenu();
	var modal = $("#modal_setting");
	var settingHTML = "";
	modal.html(settingHTML);
	settingHTML +=
	'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">' +
					settingName +
				'</h2>' +
			'</div>' +
			'<div class="modal-body"' +
			'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				getModalSetting(settingName);
			/*'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">저장</button>' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">취소</button>' +
			'</div>' +
		'</div>' +
	'</div>';*/
	modal.html(settingHTML);
	if (settingName === "처방티켓 쿠폰등록") {
		setTimeout(function() {
			$("#first_ticket_input").focus();
		}, 400);
	}
}

function getModalSetting(settingName) {
	var settingHTML = "";
	switch (settingName) {
	case '계정':
		settingHTML = getAccount();
		break;
	case '프로필':
		settingHTML = getProfile();
		break;
	case '알림':
		settingHTML = getNotice();
		break;
	case '암호 잠금':
		settingHTML = getPassword();
		break;
	case '처방티켓 쿠폰등록':
		settingHTML = getTicket();
		getCredit();
		break;
	case '다운로드된 비디오':
		settingHTML = getDownloaded();
		break;
	case '처방 전송 방법 지정':
		settingHTML = getSendMethod();
		break;
	case '비디오 목록 탭 언어':
		settingHTML = getLanguage();
		break;
	case '사용법 안내':
		settingHTML = getHelp();
		break;
	default:
		break;
	}
	return settingHTML;
}

function getAccount() {
	var settingHTML =
	'<div class="row" style="margin-bottom: 30px;">' +
		'<div class="col-md-4" style="text-align: left;"><span class="multilingual">' +
	  '<span lang="en"><p>English</p></span>' +
	  '<span lang="de"><p>Deutschland</p></span>' +
	  '<span lang="kr"><p>한국어</p></span>' +
	  '<span lang="jp"><p>日本語</p></span>' +
	'</span></div>' +
		'<div class="col-md-8" style="text-align: right; color: rgb(86,167,222)">+82 1049334688</div>' +
	'</div>' +
	'<div class="row" style="margin-bottom: 10px;">' +
		'<div class="col-md-3" style="text-align: left;"><span class="multilingual">' +
		  '<span lang="en"><p>e-mail</p></span>' +
		  '<span lang="de"><p>독일어이메일</p></span>' +
		  '<span lang="kr"><p>이메일</p></span>' +
		  '<span lang="jp"><p>e,</p></span>' +
		'</span></div>' +
		'<div class="col-md-8" style="text-align: right; color: rgb(86,167,222);">dhkim@hichart.net</div>' +
		'<div class="col-md-1"><span class="glyphicon glyphicon-chevron-right"></span></div>' +
	'</div>' +
	'<div class="row" style="margin-bottom: 30px;">' +
	'<div class="col-md-12" style="text-align: center; font-size: 14px;">' +
		'이메일을 등록하시면 다중기기 접속이나 계정관리가 가능합니다.' +
	'</div>' +
	'</div>' +
	'<div class="row" style="margin-bottom: 30px;">' +
		'<div class="col-md-5" style="text-align: left;">다중 로그인 사용</div>' +
		'<div class="col-md-6" style="text-align: right; color: rgb(86,167,222)">켜짐</div>' +
		'<div class="col-md-1"><span class="glyphicon glyphicon-chevron-right"></span></div>' +
	'</div>' +
	'<div class="row" style="margin-bottom: 30px;">' +
		'<div class="col-md-6" style="text-align: left;"><strong>계정 삭제</strong></div>' +
		'<div class="col-md-6" style="text-align: right;"><span class="glyphicon glyphicon-chevron-right"></span></div>' +
	'</div>' +
	'</div>' +
	'<div class="modal-footer">' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">저장</button>' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
	'</div>' +
'</div>' +
'</div>';
	return settingHTML;
}

function getProfile() {
	var settingHTML = "";
	settingHTML += 
			'<div class="row" style="margin-bottom: 30px;">' +
				'<img src="' + (accounts.picture ? accounts.picture : "/static/img/ic_item_profile_large.png") + '" class="img-responsive"' +
					'width="50%" style="margin-left: auto; margin-right: auto;">' +
			'</div>' +
			'<div style="text-align: center;">전화번호 : ' + accounts.msIsdn + '</div>' +
			'<div style="text-align: center;">이메일 : ' + accounts.email + '</div>' +
			'<div style="text-align: center;">이름 : ' +  accounts.nickName + '</div>' +
			'<div style="text-align: center;">직종 : ' + accounts.professionName + '</div>' +
			'<div style="text-align: center;">전공 : ' + accounts.specialtyName + '</div>' +
			'<div><br>안내) 계정 및 프로필 정보는 모바일 앱에서 수정하실 수 있습니다.<br>안내) You can modify the data on the HealthBreeze mobile application</div>' +
		'</div>' +
		'<div class="modal-footer modal-footer-one-button">' +
			'<button type="button" class="btn btn-info" data-dismiss="modal">확인</button>' +
		'</div>' +
	'</div>';
	return settingHTML;
}

function updateProfile() {
	var name = $("#input_name").val();
	var sel_pro = $("#sel_professions option:selected").text();
	var sel_spe = $("#sel_specialties option:selected").text();
	console.log("name : " + name + ", pro: " + sel_pro + ", spe : " + sel_spe);
}

function getNotice() {
	var settingHTML = "";
	settingHTML += 
	'<div style="margin: 0px 30px;">' +
		'<span>알림</span>' +
		'<input type="checkbox" style="float: right;"/>' +
	'</div>' +
	'<hr style="border-color: rgb(214, 214, 214);">' +
	'<div style="margin: 0px 30px;">' +
		'<span>미리보기</span>' +
		'<input type="checkbox" style="float: right;"/>' +
	'</div>' +
	'<hr style="border-color: rgb(214, 214, 214);">' +
	'<div style="margin: 0px 30px;">' +
		'<span>벨소리</span>' +
	'</div>' +
	'<div style="margin-left: 40px; font-size: 15px; color: rgb(130, 130, 130);">' +
		'기본벨소리(Whistle)' +
	'</div>' +
	'<hr style="border-color: rgb(214, 214, 214);">' +
	'<div style="margin: 0px 30px;">' +
		'<span>진동</span>' +
		'<input type="checkbox" style="float: right;"/>' +
	'</div>' +
	'<hr style="border-color: rgb(214, 214, 214);">' +
	'</div>' +
	'<div class="modal-footer">' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">저장</button>' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
	'</div>' +
'</div>' +
'</div>';
	return settingHTML;
}

function getPassword() {
	var settingHTML = "";
	settingHTML += 
	'<div style="margin: 0px 30px; padding-bottom: 30px;">' +
		'<span>암호 잠금</span>' +
		'<input type="checkbox" style="float: right;"/>' +
	'</div>' +
	'<div style="margin: 0px 30px; padding-bottom: 30px;">' +
		'<span>암호 변경</span>' +
		'<span class="glyphicon glyphicon-chevron-right" style="float: right;"></span>' +
	'</div>' +
	'<div style="font-size: 16px; padding-bottom: 30px;">암호를 분실하시면 앱을 재설치해야 합니다.</div>'+
	'</div>' +
	'<div class="modal-footer">' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">저장</button>' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
	'</div>' +
'</div>' +
'</div>';
	return settingHTML;
}

function getTicket() {
	var settingHTML = "";
	settingHTML += 
			'<form class="form-inline form-coupon" role="form" style="text-align: center;">' +
				'현재 나의 티켓 수 : <span class="current-my-ticket"><img src=\"/static/img/loading.gif\" style="width: 24px;"></span>' +
				'<div class="form-group" style="padding-top: 20px;">' +
					'<input id="first_ticket_input" onfocus="return ticketFocus(event)" onkeyup="return couponKeyUp(event)"' +
						'style="width:20%; text-align: center; font-size: 20px;" id="couponText0"' +
						'maxlength="4" class="form-control" placeholder="&times;&times;&times;&times;" type="text"> - ' +
					'<input onfocus="return ticketFocus(event)" onkeyup="return couponKeyUp(event)"' +
						'style="width:20%; text-align: center; font-size: 20px;" id="couponText1"' +
						'maxlength="4" class="form-control" placeholder="&times;&times;&times;&times;" type="text"> - ' +
					'<input onfocus="return ticketFocus(event)" onkeyup="return couponKeyUp(event)"' +
						'style="width:20%; text-align: center; font-size: 20px;" id="couponText2"' +
						'maxlength="4" class="form-control" placeholder="&times;&times;&times;&times;" type="text"> - ' +
					'<input onfocus="return ticketFocus(event)" onkeyup="return couponKeyUp(event)"' +
						'style="width:20%; text-align: center; font-size: 20px;" id="couponText3"' +
						'maxlength="4" class="form-control" placeholder="&times;&times;&times;&times;" type="text">' +
				'</div>' +
			'</form>' +
		'</div>' +
		'<div class="modal-footer">' +
			'<button type="button" class="btn btn-info" data-dismiss="modal" onclick="submitCoupon()">저장</button>' +
			'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
		'</div>' +
	'</div>' +
	'</div>';
	return settingHTML;
}

function getDownloaded() {
	var settingHTML = "";
	settingHTML += '다운로드된 비디오 - 현재 작성 중입니다.'+
	'</div>' +
	'<div class="modal-footer">' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">저장</button>' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
	'</div>' +
'</div>' +
'</div>';
	return settingHTML;
}

function getSendMethod() {
	var text=["처방 시 지정","문자 (SMS)","이메일(E-mail)"];
	var settingHTML = "";
	settingHTML += 
		'<div style="margin: 0px 30px;">' +
			'<form role="form">';
				for(var i = 0; i < 3; i++) {
					settingHTML +=
					'<div class="radio" style="margin-bottom: 30px;">' +
						'<label><input type="radio" name="optradio" value="' + i + '" id="sendRadio' + i + '"' +
					((i == waData.sendMethod) ? 'checked="checked"' : '') + '>' + text[i] + '</label>' +
					'</div>';
				}
			settingHTML +=
			'</form>' +
		'</div>'+
		'</div>' +
		'<div class="modal-footer">' +
			'<button type="button" class="btn btn-info" data-dismiss="modal" onclick="saveSendMethod()">저장</button>' +
			'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
		'</div>' +
	'</div>' +
	'</div>';
	return settingHTML;
}

function saveSendMethod() {
	waData.sendMethod = $("input[name='optradio']:checked").val();
	localStorage.setItem(getMyKey(accounts.email), JSON.stringify(waData));
}

function getLanguage() {
	var settingHTML = "";
	settingHTML += 
			'<div style="margin: 0px 30px; padding-bottom: 10px; color: rgb(45, 151, 134); font-size: 15px;">' +
				'<strong>비디오 목록 탭 언어 선택</strong>' +
			'</div>' +
			'<div style="margin: 0px 30px;">' +
				'<span>표시 언어 지정</span>' +
				'<input type="checkbox" style="float: right;" id="ckbAllLangVideo" onclick="allLangVideo()"' +
				(waData.videoLang[0] ? ' checked="checked" ' : '') + '>' +
				'<div style="font-size: 15px;" id="lblSpecifyLang">' + 
				(waData.videoLang[0] ? '표시될 언어를 지정합니다.' : '모든 비디오가 표시됩니다.') + '</div>' +
				'<hr style="border-color: rgb(214, 214, 214)">' +	
			'</div>' +
			'<div id="lblBasicLangVideo" style="margin: 0px 30px; color: rgb(' + (waData.videoLang[0] ? '51, 51, 51' : '185, 185, 185') + ');">' +
				'<span>기본 언어 이외</span>' +
				'<input type="checkbox" style="float: right;" id="ckbBasicLangVideo" onclick="basicLangVideo()"' +
				(waData.videoLang[0] ? '' : ' disabled ') +
				(waData.videoLang[1] ? ' checked="checked" ' : '') + '>' +
				'<div style="font-size: 15px;" id="lblSelectLang">' + 
				(waData.videoLang[1] ? '표시될 언어를 추가합니다.' : '기본 언어만 표시됩니다.') + '</div>' +
				'<hr style="border-color: rgb(214, 214, 214)">' +	
			'</div>' +
			'<div id="lblEngVideo"style="margin: 0px 30px; color: rgb(' + (waData.videoLang[0] ? (waData.videoLang[1] ? '51, 51, 51' : '185, 185, 185') : '185, 185, 185') + ');">' +
				'<span>English</span>' +
				'<input type="checkbox" style="float: right;" id="ckbEngVideo" onclick="engVideo()"' +
				(waData.videoLang[0] ? (waData.videoLang[1] ? '' : ' disabled ') : ' disabled ') +
				(waData.videoLang[2] ? ' checked="checked" ' : '') + '>' +
				'<hr style="border-color: rgb(214, 214, 214)">' +	
			'</div>' +
			'<div id="lblKorVideo" style="margin: 0px 30px; color: rgb(' + (waData.videoLang[0] ? (waData.videoLang[1] ? '51, 51, 51' : '185, 185, 185') : '185, 185, 185') + ');">' +
				'<span>한글 (Korean)</span>' +
				'<input type="checkbox" style="float: right;" id="ckbKorVideo" onclick="korVideo()"' +
				(waData.videoLang[0] ? (waData.videoLang[1] ? '' : ' disabled ') : ' disabled ') +
				(waData.videoLang[3] ? ' checked="checked" ' : '') + '>' +
				'<hr style="border-color: rgb(214, 214, 214)">' +	
			'</div>' +
			'<div id="lblJapVideo" style="margin: 0px 30px; color: rgb(' + (waData.videoLang[0] ? (waData.videoLang[1] ? '51, 51, 51' : '185, 185, 185') : '185, 185, 185') + ');">' +
				'<span>日本語 (Japanese)</span>' +
				'<input type="checkbox" style="float: right;" id="ckbJapVideo" onclick="japVideo()"' +
				(waData.videoLang[0] ? (waData.videoLang[1] ? '' : ' disabled ') : ' disabled ') +
				(waData.videoLang[4] ? ' checked="checked" ' : '') + '>' +
				'<hr style="border-color: rgb(214, 214, 214)">' +	
			'</div>' +
			'<div id="lblChnVideo" style="margin: 0px 30px; color: rgb(' + (waData.videoLang[0] ? (waData.videoLang[1] ? '51, 51, 51' : '185, 185, 185') : '185, 185, 185') + ');">' +
				'<span>汉语 (Chinese)</span>' +
				'<input type="checkbox" style="float: right;" id="ckbChnVideo" onclick="chnVideo()"' +
				(waData.videoLang[0] ? (waData.videoLang[1] ? '' : ' disabled ') : ' disabled ') +
				(waData.videoLang[5] ? ' checked="checked" ' : '') + '>' +
				'<hr style="border-color: rgb(214, 214, 214)">' +	
			'</div>' +
		'</div>' +
		'<div class="modal-footer">' +
			'<button type="button" class="btn btn-info" data-dismiss="modal" onclick="setVideoLang()">저장</button>' +
			'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
		'</div>' +
	'</div>' +
	'</div>';
	return settingHTML;
}

function allLangVideo() {
	if ($("#ckbAllLangVideo").is(":checked")) {
		$("#lblSpecifyLang").text("표시될 언어를 지정합니다.");
		$("#lblBasicLangVideo").css("color", "rgb(51,51,51)");
		$("#ckbBasicLangVideo").prop("disabled", false);
		basicLangVideo();
	} else {
		$("#lblSpecifyLang").text("모든 비디오가 표시됩니다.");
		$("#lblBasicLangVideo").css("color", "rgb(185,185,185)");
		$("#ckbBasicLangVideo").prop("disabled", true);
		$("#lblEngVideo").css("color", "rgb(185,185,185)");
		$("#ckbEngVideo").prop("disabled", true);
		$("#lblKorVideo").css("color", "rgb(185,185,185)");
		$("#ckbKorVideo").prop("disabled", true);
		$("#lblJapVideo").css("color", "rgb(185,185,185)");
		$("#ckbJapVideo").prop("disabled", true);
		$("#lblChnVideo").css("color", "rgb(185,185,185)");
		$("#ckbChnVideo").prop("disabled", true);
	}
}

function basicLangVideo() {
	if ($("#ckbBasicLangVideo").is(":checked")) {
		$("#lblSelectLang").text("표시될 언어를 추가합니다.");
		$("#lblEngVideo").css("color", "rgb(51,51,51)");
		$("#ckbEngVideo").prop("disabled", false);
		$("#lblKorVideo").css("color", "rgb(51,51,51)");
		$("#ckbKorVideo").prop("disabled", false);
		$("#lblJapVideo").css("color", "rgb(51,51,51)");
		$("#ckbJapVideo").prop("disabled", false);
		$("#lblChnVideo").css("color", "rgb(51,51,51)");
		$("#ckbChnVideo").prop("disabled", false);
	} else {
		$("#lblSelectLang").text("기본 언어만 표시됩니다.");
		$("#lblEngVideo").css("color", "rgb(185,185,185)");
		$("#ckbEngVideo").prop("disabled", true);
		$("#lblKorVideo").css("color", "rgb(185,185,185)");
		$("#ckbKorVideo").prop("disabled", true);
		$("#lblJapVideo").css("color", "rgb(185,185,185)");
		$("#ckbJapVideo").prop("disabled", true);
		$("#lblChnVideo").css("color", "rgb(185,185,185)");
		$("#ckbChnVideo").prop("disabled", true);
	}
}

function engVideo() {
}

function korVideo() {
}

function japVideo() {
}

function chnVideo() {
	
}

function setVideoLang() {
	waData.videoLang = [ $("#ckbAllLangVideo").is(":checked"),
			$("#ckbBasicLangVideo").is(":checked"),
			$("#ckbEngVideo").is(":checked"),
			$("#ckbKorVideo").is(":checked"),
			$("#ckbJapVideo").is(":checked"),
			$("#ckbChnVideo").is(":checked")];
	if (rawTopics != undefined) {
		$("#accordion_t").html("");
		$("#accordion_t").html("<img src=\"/static/img/loading.gif\">");
		createTopics(rawTopics); // 소주제별은 받아 온 API대로 각각의 객체를 그냥 배열에 넣는다. 
		sortTopics(); // 객체의 순서를 정렬한다.
		createTopicHTML(); // 정렬 된 배열을 가지고 HTML코드를 생성한다.
	}
	$("#accordion_r").html("");
	$("#accordion_r").html("<img src=\"/static/img/loading.gif\">");
	createRecommendHTML();
	refreshCheckBox();
	localStorage.setItem(getMyKey(accounts.email), JSON.stringify(waData));
}

function getHelp() {
	var settingHTML = "";
	settingHTML += '사용법 안내 - 현재 작성 중입니다.'+
	'</div>' +
	'<div class="modal-footer">' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">저장</button>' +
		'<button type="button" class="btn btn-info" data-dismiss="modal">취소</button>' +
	'</div>' +
'</div>' +
'</div>';
	return settingHTML;
}
