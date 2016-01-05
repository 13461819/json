function login() {
	var email = $("#login-useremail").val();
	var passwd = $("#login-password").val();
	if(email == "") {
		alert("아이디!");
		return;
	}
	if(passwd == "") {
		alert("비밀번호!");
		return;
	}
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
		dataType: 'json',
		crossDomain: true,
		success: function(json) {
			console.log("success");
			console.log(json);
			sessionStorage.setItem("accounts", JSON.stringify(json));
			localStorage.setItem("deviceId", json.deviceId);
			location.replace("index.html");
		}
	}).fail(function(message) {
		console.log("fail");
		console.log(message);
		var responseText = JSON.parse(message.responseText);
		console.log(responseText);
		var result;
		switch (responseText.code) {
		case 1001:
			setConfirmDialog(
				'이 PC에서 첫 로그인입니다.<br>기존에 등록되어있는 PC정보를 삭제하시려면 삭제를,<br>삭제하지 않고 추가하시려면 추가를 선택하세요.',
				'확인', 'closeConfirmDialog'
			);
			showConfirmDialog();
			break;
		case 2001:
			alert("이메일과 비밀번호를 확인해주세요");
			location.reload();
			break;
		case 2002:
			setConfirmDialog(
				'이 PC는 이미 다른 계정에 등록되어 있습니다.<br>로그인 하시면 이 PC는 현재 계정으로 등록됩니다. 계속하시겠습니까?',
				'Confirm', 'deleteLocalStorage',
				'Cancel', 'closeConfirmDialog'
			);
			showConfirmDialog();
			break;
		default:
			break;
		}

	});
}

function deleteLocalStorage() {
	localStorage.removeItem("deviceId");
	var email = $("#login-useremail").val();
	var passwd = $("#login-password").val();
	var data = "";
	data = '{"email" : "' + email + '",'
			+ '"password" : "' + passwd + '"}';
	postToServer(email, passwd, data);
}

function setConfirmDialog(msg, btn1Text, func1, btn2Text, func2, btn3Text, func3, btn4Text, func4) {
	$("#confirm-bg").before(
		confirmDialog(msg, btn1Text, func1, btn2Text, func2, btn3Text, func3, btn4Text, func4)
	);
}

function showConfirmDialog() {
	$(".confirm-dialog")
	.css("width", "500px")
	.css("height", "165px")
	.css("opacity", "1");
	$("#background-layer")
	.css("width", "100vw")
	.css("height", "100vh");
	$("#loginbox").css("opacity","0.4");
}

function closeConfirmDialog() {
	$(".confirm-dialog")
	.css("opacity", "0")
	.css("width", "0px")
	.css("height", "0px");
	$("#background-layer")
	.css("width", "0px")
	.css("height", "0px");
	$("#loginbox").css("opacity","1");
	$(".confirm-dialog").remove();
}

function cancelLogin() {
	closeConfirmDialog();
	location.reload();
}

function confirmDialog(msg, btn1Text, func1, btn2Text, func2, btn3Text, func3) {
	var html = "";
	var count = 0;
	var texts = [];
	var funcs = [];
	texts[0] = btn1Text;
	texts[1] = btn2Text;
	texts[2] = btn3Text;
	funcs[0] = func1;
	funcs[1] = func2;
	funcs[2] = func3;
	if(func3 != null) {
		count = 3;
	} else if(func2 != null) {
		count = 2;
	} else {
		count = 1;
	};
	html +=
		'<div class="confirm-dialog">' +
			'<div class="confirm-content">' +
				'<div class="confirm-header">' +
					'Confirm your action' +
				'</div>' +
				'<div class="confirm-body">' +
					msg +
				'</div>' +
				'<hr>' +
				'<div class="confirm-footer">';
				for(var i = 0; i < count; i++) {
					html += '<span class="confirm-btn confirm-btn' + count + '" onclick="' + funcs[i] + '()">' + texts[i] + '</span>';
				}
				html +=
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