function showSetting(settingName) {
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
				get_modal_setting(settingName) +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">저장</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(settingHTML);
}

function get_modal_setting(settingName) {
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
	case '설명처방 티켓충전':
		settingHTML = getTicket();
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
	settingHTML = "";
	settingHTML +=
	'<div class="row" style="margin-bottom: 30px;">' +
		'<div class="col-md-4" style="text-align: left;">전화번호</div>' +
		'<div class="col-md-8" style="text-align: right; color: rgb(86,167,222)">+82 1049334688</div>' +
	'</div>' +
	'<div class="row" style="margin-bottom: 10px;">' +
		'<div class="col-md-3" style="text-align: left;">이메일</div>' +
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
	'</div>';
	return settingHTML;
}

function getProfile() {
	settingHTML = "";
	settingHTML += '프로필';
	return settingHTML;
}

function getNotice() {
	settingHTML = "";
	settingHTML += '알림';
	return settingHTML;
}

function getPassword() {
	settingHTML = "";
	settingHTML += '암호잠금';
	return settingHTML;
}

function getTicket() {
	settingHTML = "";
	settingHTML += '설명처방 티켓충전';
	return settingHTML;
}

function getDownloaded() {
	settingHTML = "";
	settingHTML += '다운로드된 비디오';
	return settingHTML;
}

function getSendMethod() {
	settingHTML = "";
	settingHTML += '처방 전송 방법 지정';
	return settingHTML;
}

function getLanguage() {
	settingHTML = "";
	settingHTML += '비디오 목록 탭 언어';
	return settingHTML;
}

function getHelp() {
	settingHTML = "";
	settingHTML += '사용법 안내';
	return settingHTML;
}
