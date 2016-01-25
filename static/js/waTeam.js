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
					'<input autofocus class="form-control" onkeyup="return keyUp(event)" placeholder="만드실 팀 이름을 입력하세요." id="input_new_team_name" type="text">' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal" onclick="createNewTeam()">저장</button>' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">취소</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(createNewTeamHTML);
	$("#input_new_team_name").focus();
}

function createNewTeam() {
	console.log("createNewTeamName");
	var name = $("#input_new_team_name").val();
	if(name == undefined || name == "") {
		alert("팀 이름을 입력해주세요");
		return;
	}
	var data = {};
	data.name = name;
	$.ajax({
		type: "POST",
		url: hbUrl + hbApiPath + "/teams",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		data : JSON.stringify(data),
		success: function(json) {
			$('div[class^="teamPage"]').remove();
			teams.push(json);
			targetTeamId = json.id
			sortTeams();
			for(var i = 0; i < teams.length; i++) {
				$(".teamTitleEnd").before('<div class="teamPage' + i + ' drawer_menu_sub" onclick="clickTeamPage(\'' + i + '\')">' + teams[i].name + '</div>');
				if(targetTeamId == teams[i].id) currentTeamIndex = i;
			}
			$(".container[id^=team]").remove();
			clickTeamPage(currentTeamIndex);
		}
	}).fail( function (message){
		console.log(message);
	});
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
		url = hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/teams/credit?team_ids=" + teams[index].id;
	} else {
		url = hbUrl + hbApiPath + "/accounts/" + accounts.userId + "/teams/credit?team_ids=" + team_ids;
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
						console.log("teamPage");
						$("#remain-ticket-num" + index).html(teamCredits[i].credit);
					} else {
						console.log("sendPage");
						$("#remain-ticket-num").html(teamCredits[i].credit);
					}
				}
			}
		},
		error: function(message) {
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			location.replace("start.html");
		}
	});
}

function createTeamPage(index) {
	$("#modal_setting").before('<div class="container" id="team' + index + '"><img src=\"/static/img/loading.gif\"></div>');
	
	var whenTeamsMembers = $.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		url: hbUrl + hbApiPath + "/teams/" + teams[index].id + "/members",
		success: function(json) {
			teamsMembers[index] = json;
		},
		error: function(message) {
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			location.replace("start.html");
		}
	});
	
	var whenTeamsMembersAccounts = $.ajax({
		type: "GET",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		url: hbUrl + hbApiPath + "/teams/" + teams[index].id + "/members/accounts",
		success: function(json) {
			teamsMembersAccounts[index] = json;
			sortTeamsMembersAccounts(index);
		},
		error: function(message) {
			alert("서버와 통신 오류로 로그인할 수 없습니다!");
			location.replace("start.html");
		}
	});
	
	$.when(whenTeamsMembers, whenTeamsMembersAccounts).done(function() {
		$("#team" + index).html(getCreateTeamPageHTML(index));
		getTeamCredit(index, "teamPage");
	});
	
}

function getCreateTeamPageHTML(index) {
	var team = teams[index];
	var teamsMembersAccount, teamsMember;
	var managerHTML = "", memberHTML = "", tempHTML = "";
	var teamHTML =
	'<div class="row">' +
		'<div class="col-lg-5" style="padding-right: 0px;">' +
			'<div>' +
				'<img alt="팀 사진" style="height: 182px;" class="img-responsive team_image" src="' + (team.banner ? team.banner : "/static/img/team_banner.png") + '">' +
			'</div>' +
			'<div style="height: 50px;">' +
				'<img alt="남은 티켓 수" style="float: left; height: 50px; vertical-align: middle;" class="img-responsive" src="/static/img/ic_item_ticket.png">' +
				'<div style="float: left; width: 75%; text-align: center; line-height: 50px; vertical-align: middle; font-size: 20px;">관리자의 남은 티켓 : <span id="remain-ticket-num' + index + '">' +
					'<img src="/static/img/loading.gif" style="width: 24px;"></span></div>' +
				'<img data-toggle="modal" data-target="#modal_setting" onclick="modalShowUsedTicket(' + index + ')" alt="티켓 사용 량" title="사용량 보기" style="cursor: pointer; float: right; height: 50px; vertical-align: middle;" class="img-responsive" src="/static/img/ic_item_graph.png">' +
			'</div>' +
			'<div id="teamInfo' + index + '" style="clear: both;">';
			for(var i = 0; i < teamsMembersAccounts[index].length; i++) {
				teamsMembersAccount = teamsMembersAccounts[index][i];
				for(var j = 0; j < teamsMembers[index].length; j++) {
					teamsMember = teamsMembers[index][j];
					if(teamsMembersAccount.id == teamsMember.account) {
						switch (teamsMember.authorization) {
						case 10:
							managerHTML += getTeamMemberHTML(teamsMembersAccount);
							break;
						case 5:
							memberHTML += getTeamMemberHTML(teamsMembersAccount);
							break;
						case 0:
							tempHTML += getTeamMemberHTML(teamsMembersAccount);
							break;
						default:
							break;
						}
					}
				}
			}		
		teamHTML +=	(managerHTML ? '<div style="background-color: rgb(210,210,210);">관리자</div>' + managerHTML:"") + 
					(memberHTML ? '<div style="background-color: rgb(210,210,210);">팀원</div>' + memberHTML:"") + 
					(tempHTML ? '<div style="background-color: rgb(210,210,210);">대기</div>' + tempHTML:"") + 
			'</div>' +
		'</div>' +
		'<div class="col-lg-7" id="team_page' + index + '">' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'팀 사진 변경\')">팀 사진 변경</div>' +
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="modalChangeTeamName(' + index + ')">팀 이름 변경</div>' +
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
			'<div data-toggle="modal" data-target="#modal_setting"' +
				'onclick="showTeamSetting(\'팀의 연락처 보기\')">팀의 연락처 보기</div>' +
			'<div onclick="deleteTeamConfirm(' + index + ')">이 팀을 떠나기</div>' +
		'</div>' +
	'</div>';
	return teamHTML;
}

function modalShowUsedTicket(index) {
	var modal = $("#modal_setting");
	var showUsedTicketHTML = "";
	var teamsMembersAccount, teamsMember;
	var managerHTML = "", memberHTML = "", tempHTML = "";
	modal.html(showUsedTicketHTML);
	showUsedTicketHTML +=
	'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">팀원별 티켓 사용량</h2>' +
			'</div>' +
			'<div class="modal-body"' +
			'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				'<div class="form-group">';
				for(var i = 0; i < teamsMembersAccounts[index].length; i++) {
					teamsMembersAccount = teamsMembersAccounts[index][i];
					for(var j = 0; j < teamsMembers[index].length; j++) {
						teamsMember = teamsMembers[index][j];
						if(teamsMembersAccount.id == teamsMember.account) {
							switch (teamsMember.authorization) {
							case 10:
								managerHTML += teamsMembersAccount.nickName + " : " + teamsMember.send_cnt + " 설명처방 사용<br>";
								break;
							case 5:
								memberHTML += teamsMembersAccount.nickName + " : " + teamsMember.send_cnt + " 설명처방 사용<br>";
								break;
							case 0:
								tempHTML += teamsMembersAccount.nickName + " : " + teamsMember.send_cnt + " 설명처방 사용<br>";
								break;
							default:
								break;
							}
						}
					}
				}
				showUsedTicketHTML += managerHTML + memberHTML + tempHTML +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">확인</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(showUsedTicketHTML);
}

function getTeamMemberHTML(teamsMembersAccount) {
	var teamMemberHTML = 
		'<div class="row">' +
		'<div class="col-md-3">' +
			'<img alt="프로필 사진" class="img-responsive" src="' + (teamsMembersAccount.picture ? teamsMembersAccount.picture : "/static/img/ic_item_profile_large.png") + '">' +
		'</div>' +
		'<div class="col-md-9" style="font-size: 22px;">' +
			'<div>' + teamsMembersAccount.nickName + '</div>';
			for(var k = 0; k < professions.length; k++) {
				if(professions[k].id == teamsMembersAccount.profession) {
					teamMemberHTML += '<div>' + professions[k].name + '</div>';
				}
			}
			for(var k = 0; k < specialties.length; k++) {
				if(specialties[k].id == teamsMembersAccount.specialty) {
					teamMemberHTML += '<div>' + specialties[k].name + '</div>';
				}
			}
			teamMemberHTML +=
		'</div>' +
	'</div>';
	return teamMemberHTML;
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
	$(".teamPage" + index).append('<img class="teamCheck" src="/static/img/ic_action_accept.png">');
}

function modalChangeTeamName(index) {
	var modal = $("#modal_setting");
	var changeTeamNameHTML = "";
	modal.html(changeTeamNameHTML);
	changeTeamNameHTML +=
	'<div class="modal-dialog">' +
		'<div class="modal-content">' +
			'<div class="modal-header"' +
				'style="background-color: rgb(82, 167, 231); color: rgb(237, 254, 255);">' +
				'<button type="button" class="close" data-dismiss="modal">&times;</button>' +
				'<h2 class="modal-title">팀 이름 변경</h2>' +
			'</div>' +
			'<div class="modal-body"' +
			'style="font-size: 18px; padding-top: 30px; background-color: rgb(238, 238, 238);">' +
				'<div class="form-group">' +
					'<label for="inputdefault">팀 이름</label>' +
					'<input class="form-control" onfocus="this.value = this.value;" onkeyup="return keyUp(event,' + index + ')" autofocus value="' + teams[index].name + '" placeholder="' + teams[index].name + '" id="input_change_team_name" type="text">' +
				'</div>' +
			'</div>' +
			'<div class="modal-footer">' +
				'<button type="button" class="btn btn-success" data-dismiss="modal" onclick="changeTeamName(' + index +')">저장</button>' +
				'<button type="button" class="btn btn-success" data-dismiss="modal">취소</button>' +
			'</div>' +
		'</div>' +
	'</div>';
	modal.html(changeTeamNameHTML);
}

function changeTeamName(index) {
	var name =  $("#input_change_team_name").val();
	if(name == undefined || name == "") {
		alert("팀 이름을 입력해주세요");
		return;
	}
	var data = teams[index];
	var targetTeamId;
	data.name = name;
	$.ajax({
		type: "PUT",
		url: hbUrl + hbApiPath + "/teams/" + teams[index].id,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		data : JSON.stringify(data),
		success: function(json) {
			$('div[class^="teamPage"]').remove();
			teams[index] = data;
			targetTeamId = teams[index].id
			sortTeams();
			for(var i = 0; i < teams.length; i++) {
				$(".teamTitleEnd").before('<div class="teamPage' + i + ' drawer_menu_sub" onclick="clickTeamPage(\'' + i + '\')">' + teams[i].name + '</div>');
				if(targetTeamId == teams[i].id) currentTeamIndex = i;
			}
			$(".container[id^=team]").remove();
			clickTeamPage(currentTeamIndex);
			toggleMenu();
		}
	}).fail( function (message){
		console.log(message);
	});
}

function deleteTeamConfirm(index) {
	showConfirmDialog(
			'ARE YOU SURE?',
			'Are you sure to leave "' + teams[index].name +'" team?',
			'Leave', function(){ deleteTeam(index) },
			'Cancel', function(){}
		);
}

function deleteTeam(index) {
	$.ajax({
		type: "DELETE",
		url: hbUrl + hbApiPath + "/teams/" + teams[index].id,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(accounts.userId + "-" + accounts.deviceId + ":" + accounts.sessionKey))
		},
		success: function(json){
			teams.splice(index, 1);
			$('div[class^="teamPage"]').remove();
			sortTeams();
			for(var i = 0; i < teams.length; i++) {
				$(".teamTitleEnd").before('<div class="teamPage' + i + ' drawer_menu_sub" onclick="clickTeamPage(\'' + i + '\')">' + teams[i].name + '</div>');
			}
			$(".container[id^=team]").remove();
			toggleCont('videoPage', 'VIDEO');
			toggleMenu();
			checkTeamPage(0);
			localStorage.setItem("currentTeam", teams[0].id);
		},
		error: function(message){
			console.log(message);
		}
	});
}