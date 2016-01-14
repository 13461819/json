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
			location.replace("start.html");
		}
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