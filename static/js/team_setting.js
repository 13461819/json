function showTeamSetting(settingName) {
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
				getModalTeamSetting(settingName) +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">저장</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(settingHTML);
}

function getModalTeamSetting(settingName) {
	var settingHTML = "";
	switch (settingName) {
	case '팀 사진 변경':
		settingHTML = getImageChange();
		break;
	case '팀 이름 변경':
		settingHTML = getNameChange();
		break;
	case '연락처 설정':
		settingHTML = getSettingContact();
		break;
	case '팀원 추가':
		settingHTML = getAddTeamMember();
		break;
	case '팀원 관리':
		settingHTML = getManageTeamMember();
		break;
	case '관리자 변경':
		settingHTML = getManagerChange();
		break;
	case '암호로 설명처방 보호':
		settingHTML = getPasswordSecurity();
		break;
	default:
		break;
	}
	return settingHTML;
}

function getImageChange() {
	var settingHTML = "";
	settingHTML += '팀 사진 변경 - 현재 작성 중입니다.';
	return settingHTML;
}

function getNameChange() {
	var settingHTML = "";
	settingHTML += '팀 이름 변경 - 현재 작성 중입니다.';
	return settingHTML;
}

function getSettingContact() {
	var settingHTML = "";
	settingHTML += '연락처 설정 - 현재 작성 중입니다.';
	return settingHTML;
}

function getAddTeamMember() {
	var settingHTML = "";
	settingHTML += '팀원 추가 - 현재 작성 중입니다.';
	return settingHTML;
}

function getManageTeamMember() {
	var settingHTML = "";
	settingHTML += '팀원 관리 - 현재 작성 중입니다.';
	return settingHTML;
}

function getManagerChange() {
	var settingHTML = "";
	settingHTML += '관리자 변경 - 현재 작성 중입니다.';
	return settingHTML;
}

function getPasswordSecurity() {
	var settingHTML = "";
	settingHTML += '암호로 설명처방 보호 - 현재 작성 중입니다.';
	return settingHTML;
}