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
	var msg = "";
	if (localStorage.getItem("deviceId")) {
		msg = '{"email" : "' + email + '",' + '"password" : "' + passwd
				+ '", ' + '"deviceId" : "' + localStorage.getItem("deviceId")
				+ '"}';
	} else {
		msg = '{"email" : "' + email + '",' + '"password" : "' + passwd + '"}';
	}
	console.log("msg : " + msg);
	var data = JSON.parse(msg);
	postToServer(data);
}

function searchKeyPress(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		login();
		return false;
	}
	return true;
}

function postToServer(data) {
	console.log("postToServer");
	$.ajax({
		type: "POST",
		url: "https://hbreeze4ani.appspot.com/api/v1/login",
		data: JSON.stringify(data),
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
			showConfirmDialog(
				'이 PC에서 첫 로그인입니다.<br>기존에 등록되어있는 PC정보를 삭제하시려면 삭제를,<br>삭제하지 않고 추가하시려면 추가를 선택하세요.',
				'Delete', function(){
					localStorage.removeItem("deviceId");
					data.forcing = 0;
					postToServer(data);
				},
				'Add', function(){
					data.forcing = 1;
					postToServer(data);
				},
				'Cancel', closeConfirmDialog
			);
			break;
		case 2001:
			alert("이메일과 비밀번호를 확인해주세요");
			location.reload();
			break;
		case 2002:
			showConfirmDialog(
				'이 PC는 이미 다른 계정에 등록되어 있습니다.<br>로그인 하시면 이 PC는 현재 계정으로 등록됩니다. 계속하시겠습니까?',
				'Confirm', function() {
					localStorage.removeItem("deviceId");
					delete data.deviceId;
					postToServer(data);
				},
				'Cancel', closeConfirmDialog
			);
			break;
		default:
			break;
		}

	});
}

function closeConfirmDialog() {
	$(".confirm-dialog")
	.css("display", "none");
	$("#confirm-bg")
	.css("width", "0px")
	.css("height", "0px");
	$("#loginbox").css("opacity","1");
	$(".confirm-dialog").remove();
}

function showConfirmDialog(msg) {
	var html = "";
	var count = 0;
	var texts = [];
	var funcs = [];
	for(var i = 0, argument = 1; argument < arguments.length; i++, argument+=2) {
		texts[i] = arguments[argument];
		funcs[i] = arguments[argument+1];
		count++;
	}
	
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
					html += '<span id="confirm-btn' + i + '" class="confirm-btn confirm-btn' + count + '">' + texts[i] + '</span>';
				}
				html +=
				'</div>' +
			'</div>' +
		'</div>';
	
	$("#confirm-bg").before(html);
	
	for (var i = 0; i < count; i++) {
		$("#confirm-btn" + i).click((function() {
			return funcs[i];
		})());
	}	
	
	$(".confirm-dialog")
	.css("display", "block");
	$("#confirm-bg")
	.css("width", "100vw")
	.css("height", "100vh");
	$("#loginbox").css("opacity","0.4");
}