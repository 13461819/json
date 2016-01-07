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
				'<h2 class="modal-title">' +
					settingName +
				'</h2>' +
			'</div>' +
			'<div class="modal-body"' +
			'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				getModalSetting(settingName) +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">저장</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(settingHTML);
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
	var settingHTML = "";
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
	//var accounts = JSON.parse(sessionStorage.getItem("accounts"));
	var settingHTML = "";
	settingHTML += 
	'<div class="row" style="margin-bottom: 30px;">' +
		'<img src="' + accounts.picture + '" class="img-responsive"' +
			'width="50%" style="margin-left: auto; margin-right: auto;">' +
	'</div>' +
	'<div class="form-group">' +
		'<label for="inputdefault">이름</label> <input class="form-control"' +
			'id="inputdefault" placeholder="이름을 입력하세요." type="text" value="' + accounts.nickName + '">' +
	'</div>' +
	
	'<div class="form-group">' +
		'<label for="sel1">직종</label> <select class="form-control" id="sel1">' +
			'<option>의사</option>' +
			'<option>인턴</option>' +
			'<option>간호사</option>' +
		'</select>' +
	'</div>' +
	'<div class="form-group">' +
		'<label for="sel2">전공</label> <select class="form-control" id="sel2">' +
			'<option>OR</option>' +
			'<option>ER</option>' +
			'<option>외과</option>' +
			'<option>성형외과</option>' +
		'</select>' +
	'</div>';
	return settingHTML;
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
	'<hr style="border-color: rgb(214, 214, 214);">';
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
	'<div style="font-size: 16px; padding-bottom: 30px;">암호를 분실하시면 앱을 재설치해야 합니다.</div>';
	return settingHTML;
}

function getTicket() {
	var settingHTML = "";
	settingHTML += '설명처방 티켓충전 - 현재 작성 중입니다.';
	return settingHTML;
}

function getDownloaded() {
	var settingHTML = "";
	settingHTML += '다운로드된 비디오 - 현재 작성 중입니다.';
	return settingHTML;
}

function getSendMethod() {
	var settingHTML = "";
	settingHTML += 
	'<div style="margin: 0px 30px; padding-bottom: 30px;">' +
		'<form role="form">' +
			'<div class="radio" style="margin-bottom: 30px;">' +
				'<label><input type="radio" name="optradio">처방 시 지정</label>' +
			'</div>' +
			'<div class="radio" style="margin-bottom: 30px;">' +
				'<label><input type="radio" name="optradio">문자 (SMS)</label>' +
			'</div>' +
			'<div class="radio">' +
				'<label><input type="radio" name="optradio">이메일(E-mail)</label>' +
			'</div>' +
		'</form>' +
	'</div>';
	return settingHTML;
}

function getLanguage() {
	var settingHTML = "";
	settingHTML += 
	'<div style="margin: 0px 30px; padding-bottom: 10px; color: rgb(45, 151, 134); font-size: 15px;">' +
		'<strong>비디오 목록 탭 언어 선택</strong>' +
	'</div>' +
	'<div style="margin: 0px 30px;">' +
		'<span>표시 언어 지정</span>' +
		'<input type="checkbox" style="float: right;">' +
		'<div style="font-size: 15px; color: rgb(135, 135, 135);">모든 비디오가 표시됩니다.</div>' +
		'<hr style="border-color: rgb(214, 214, 214)">' +	
	'</div>' +
	'<div style="margin: 0px 30px;">' +
		'<span>기본 언어 이외</span>' +
		'<input type="checkbox" style="float: right;">' +
		'<div style="font-size: 15px; color: rgb(135, 135, 135);">기본 언어만 표시됩니다.</div>' +
		'<hr style="border-color: rgb(214, 214, 214)">' +	
	'</div>' +
	'<div style="margin: 0px 30px;">' +
		'<span>English</span>' +
		'<input type="checkbox" style="float: right;">' +
		'<hr style="border-color: rgb(214, 214, 214)">' +	
	'</div>' +
	'<div style="margin: 0px 30px;">' +
		'<span>한글(Korean)</span>' +
		'<input type="checkbox" style="float: right;">' +
		'<hr style="border-color: rgb(214, 214, 214)">' +	
	'</div>' +
	'<div style="margin: 0px 30px;">' +
		'<span>日本語(Japanese)</span>' +
		'<input type="checkbox" style="float: right;">' +
		'<hr style="border-color: rgb(214, 214, 214)">' +	
	'</div>';
	return settingHTML;
}

function getHelp() {
	var settingHTML = "";
	settingHTML += '사용법 안내 - 현재 작성 중입니다.';
	return settingHTML;
}
