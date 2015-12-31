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
	$.post(
			"https://hbreeze4ani.appspot.com/api/v1/login",
			data,
			function(json) {
				console.log(json);
				sessionStorage
						.setItem("accounts", JSON.stringify(json));
				location.replace("index.html");
			})
	.fail(
			function(message) {
				var responseText = JSON.parse(message.responseText);
				console.log(responseText);
				var result;
				switch (responseText.code) {
				case 1001:
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
					break;
				case 2001:
					alert("이메일과 비밀번호를 확인해주세요");
					location.reload();
					break;
				case 2002:
					result = confirm("이 PC는 이미 다른 계정에 등록되어 있습니다.\n확인을 누르시면 이 PC는 본 계정에 등록됩니다.\n계속하시겠습니까?");
					if (result == true) {
						localStorage.removeItem("deviceId");
						data = '{"email" : "' + email + '",'
								+ '"password" : "' + passwd + '"}';
						postToServer(email, passwd, data);
					} else {
						location.reload();
					}
					break;
				default:
					break;
				}

			});
}