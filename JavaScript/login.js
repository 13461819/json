function login() {
	var email = $("#login-useremail").val();
	var passwd = $("#login-password").val();
	var data = "";
	if (localStorage.getItem("deviceId")) {
		data = '{"email" : "' + email + '",' + '"password" : "' + passwd
				+ '", ' + '"deviceId" : "' + localStorage.getItem("deviceId")
				+ '"}';
	} else {
		data = '{"email" : "' + email + '",' + '"password" : "' + passwd + '"}';
	}
	console.log("data : " + data);
	postToServer(email, passwd, data);
}

function searchKeyPress(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		login();
		return false;
	}
	return true;
}

function postToServer(email, passwd, data) {
	console.log("postToServer");
	$.ajax({
		type: "POST",
		url: "https://hbreeze4ani.appspot.com/api/v1/login",
		data: data,
		crossDomain: true,
		success: function(json) {
			console.log(json);
			sessionStorage.setItem("accounts", JSON.stringify(json));
			localStorage.setItem("deviceId", json.deviceId);
			location.replace("index.html");
		}
	}).fail(function(message) {
		var responseText = JSON.parse(message.responseText);
		console.log(responseText);
		var result;
		switch (responseText.code) {
		case 1001:
			$("#background-layer").before(getError1001());
			$(".confirm-dialog")
			.css("width", "500px")
			.css("height", "165px")
			.css("opacity", "1");
			$("#background-layer")
			.css("width", "100vw")
			.css("height", "100vh");
			$("#loginbox").css("opacity","0.4");
			/*
			result = confirm("해당 계정에 등록된 PC가 이미 있습니다.\n기존 PC의 정보를 삭제 하시겠습니까?\n취소하시면 새로운 PC로 등록됩니다.");
			if (result == true) {
				data = '{"email" : "' + email + '",'
						+ '"password" : "' + passwd + '", '
						+ '"forcing" : "0"}';
				postToServer(email, passwd, data);
			} else {
				data = '{"email" : "' + email + '",'
						+ '"password" : "' + passwd + '", '
						+ '"forcing" : "1"}';
				postToServer(email, passwd, data);
			}
			*/
			
			break;
		case 2001:
			alert("이메일과 비밀번호를 확인해주세요");
			location.reload();
			break;
		case 2002:
			$("#background-layer").before(getError2002());
			$(".confirm-dialog")
			.css("width", "500px")
			.css("height", "165px")
			.css("opacity", "1");
			$("#background-layer")
			.css("width", "100vw")
			.css("height", "100vh");
			$("#loginbox").css("opacity","0.4");
			/*
			result = confirm("이 PC는 이미 다른 계정에 등록되어 있습니다.\n확인을 누르시면 이 PC는 본 계정에 등록됩니다.\n계속하시겠습니까?");
			if (result == true) {
				localStorage.removeItem("deviceId");
				data = '{"email" : "' + email + '",'
						+ '"password" : "' + passwd + '"}';
				postToServer(email, passwd, data);
			} else {
				location.reload();
			}
			*/
			
			break;
		default:
			break;
		}

	});
}

function cancelLogin() {
	$(".confirm-dialog")
	.css("opacity", "0")
	.css("width", "0px")
	.css("height", "0px");
	$("#background-layer")
	.css("width", "0px")
	.css("height", "0px");
	$("#loginbox").css("opacity","1");
	$(".confirm-dialog").remove();
	location.reload();
}

function getError1001() {
	var html = "";
	html +=
	'<div class="confirm-dialog">' +
		'<div class="confirm-content">' +
			'<div class="confirm-header">' +
				'Confirm your action' +
			'</div>' +
			'<div class="confirm-body">' +
				'이 PC에서 첫 로그인입니다.<br>기존에 등록되어있는 PC정보를 삭제하시려면 삭제를,<br>삭제하지 않고 추가하시려면 추가를 선택하세요.' +
			'</div>' +
			'<hr>' +
			'<div class="confirm-footer">' +
				'<span class="btn-selector btn-selector3" onclick="deleteDeviceId()">Delete</span>' +
				'<span class="btn-selector btn-selector3" onclick="addDeviceId()">Add</span>' +
				'<span class="btn-selector btn-selector3" onclick="cancelLogin()">Cancel</span>' +
			'</div>' +
		'</div>' +
	'</div>';
	return html;	
}

function deleteDeviceId() {
	var email = $("#login-useremail").val();
	var passwd = $("#login-password").val();
	var data = "";
	data = '{"email" : "' + email + '",'
	+ '"password" : "' + passwd + '", '
	+ '"forcing" : "0"}';
	postToServer(email, passwd, data);
}

function addDeviceId() {
	var email = $("#login-useremail").val();
	var passwd = $("#login-password").val();
	var data = "";
	data = '{"email" : "' + email + '",'
	+ '"password" : "' + passwd + '", '
	+ '"forcing" : "1"}';
	postToServer(email, passwd, data);
}

function getError2002() {
	var html = "";
	html +=
	'<div class="confirm-dialog">' +
		'<div class="confirm-content">' +
			'<div class="confirm-header">' +
				'Confirm your action' +
			'</div>' +
			'<div class="confirm-body">' +
				'이 PC는 이미 다른 계정에 등록되어 있습니다.<br>로그인 하시면 이 PC는 현재 계정으로 등록됩니다. 계속하시겠습니까?' +
			'</div>' +
			'<hr>' +
			'<div class="confirm-footer">' +
				'<span class="btn-selector btn-selector2" onclick="alert(\'Confirm!\')">Confirm</span>' +
				'<span class="btn-selector btn-selector2" onclick="cancelLogin()">Cancel</span>' +
			'</div>' +
		'</div>' +
	'</div>';
	return html;	
}