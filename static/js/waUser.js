var isPhoneVerified = false;
var isPhoneCheck = true;
var smsId;
var msIsdn;

function phoneRequest() {
	var data = {};
	data.type = "Pro";
	data.country = "82";
	data.lang = "ko";
	data.mdn = $("#input_phone").val();
	data.checkAccount = isPhoneCheck;
	console.log(data);
	
	$.ajax({
		type: "POST",
		url: hbUrl + "/tvapp/request",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			console.log(json);
			isPhoneCheck = true;
			smsId = json.smsId;
			msIsdn = json.msIsdn;
			$("#input_verify").prop('disabled', false);
			$("#button_verify").prop('disabled', false);
			showConfirmDialog('', '인증번호를 발송하였습니다.', 'OK', function(){});
		}
	}).fail( function (message){
		console.log("fail");
		console.log(message);
		var responseText = JSON.parse(message.responseText);
		console.log(responseText);
		switch (responseText.code) {
		case 3001:
			showConfirmDialog(
				'전화번호 중복',
				'이미 존재하는 전화번호입니다.<br>그래도 진행 하시겠습니까?',
				'Yes', function(){
					isPhoneCheck = false;
					phoneRequest();
				},
				'Cancel', function(){}
			);
			break;
		default:
			showConfirmDialog('', '인증번호 발송에 실패하였습니다.', 'OK', function(){});
			break;
		}
	});
}

function phoneVerify() {
	var data = {};
	data.smsId = smsId;
	data.msIsdn = msIsdn;
	data.token = $("#input_verify").val();
	console.log(data);
	
	$.ajax({
		type: "PUT",
		url: hbUrl + "/tvapp/request",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			console.log(json);
			showConfirmDialog('', '전화번호 인증을 성공하였습니다.', 'OK', function(){});
			isPhoneVerified = true;
		}
	}).fail( function (message){
		console.log(message);
		showConfirmDialog('', '전화번호 인증에 실패하였습니다.', 'OK', function(){});
	});
}

function isEnteredValidValue() {
    var result = false;

    if ($("#input_email").val().length == 0)
    {
    	showConfirmDialog('', '이메일을 입력해주세요.', 'OK', function(){});
    }
    else if ($("#input_nickname").val().length == 0)
    {
        showConfirmDialog('', '이름을 입력해주세요.', 'OK', function(){});
    }
    else if (!isPhoneVerified)
    {
        showConfirmDialog('', '전화번호를 인증해주세요.', 'OK', function(){});
    }
    else if ($("#input_password").val().length == 0 || $("#input_password").val().length < 8)
    {
        showConfirmDialog('', '비밀번호는 8자 이상입니다.', 'OK', function(){});
    }
    else if ($("#input_password").val() != $("#input_confirmpassword").val())
    {
        showConfirmDialog('', '비밀번호가 서로 다릅니다.', 'OK', function(){});
    }
    else
    {
        result = true;
    }
    
    return result;
}

function registerUser() {
	
	if (!isEnteredValidValue()) return;
	
	var data = {};
	data.country = "KR";
	data.msIsdn = msIsdn;
	data.nickName = $("#input_nickname").val();
	data.profession = 901;
	data.specialty = 4021;
	data.smsId = smsId.toString();
	data.email = $("#input_email").val();
	data.password = $("#input_password").val();
	console.log(data);
	
	$.ajax({
		type: "POST",
		//url: hbUrl + "/emr/" + accounts.emr_id + "/tv_accounts",
		url: "http://10.11.12.100:8081/emr/" + accounts.emr_id + "/tv_accounts",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			console.log(json);
			showConfirmDialog($("#input_email").val(), '계정이 가입되었습니다.<br>메일함에서 인증한 후 사용하실 수 있습니다.', 'OK', function(){});
			$("#modal_setting").modal('hide');
		}
	}).fail( function (message){
		console.log("fail");
		console.log(message);
		var responseText = JSON.parse(message.responseText);
		console.log(responseText);
		switch (responseText.code) {
		case 2003:
			showConfirmDialog('', '관리자를 먼저 등록해주세요.', 'OK', function(){});
			break;
		case 2011:
			showConfirmDialog('', 'id 혹은 국가코드를 확인해주세요.', 'OK', function(){});
			break;
		case 2012:
			showConfirmDialog('', '라이센스를 확인해주세요.', 'OK', function(){});
			break;
		case 2013:
			showConfirmDialog('', '이미 존재하는 email입니다.', 'OK', function(){});
			break;
		case 2014:
			showConfirmDialog('', '비밀번호를 확인해주세요.', 'OK', function(){});
			break;
		default:
			showConfirmDialog('', '회원가입 실패', 'OK', function(){});
			break;
		}
	});
}

function isEnteredValidValuePassword() {
    var result = false;
    
    if ($("#input_new_password").val().length == 0 || $("#input_new_password").val().length < 8)
    {
        showConfirmDialog('', '비밀번호는 8자 이상입니다.', 'OK', function(){});
    }
    else if ($("#input_new_password").val() != $("#input_confirm_password").val())
    {
        showConfirmDialog('', '비밀번호가 서로 다릅니다.', 'OK', function(){});
    }
    else
    {
        result = true;
    }
    
    return result;
}

function changePassword() {
	if (!isEnteredValidValuePassword()) return;
	
	var data = {};
	data.old_passwd = $("#input_current_password").val();
	data.new_passwd = $("#input_new_password").val();
	console.log(data);
	
	$.ajax({
		type: "PUT",
		url: hbUrl + "/tvapp/login",
		//url: "http://10.11.12.100:8082/tvapp/login",
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", accounts.token)
		},
		data : JSON.stringify(data),
		success: function(json) {
			console.log(json);
			showConfirmDialog('', '비밀번호가 변경되었습니다.', 'OK', function(){});
			$("#modal_setting").modal('hide');
		}
	}).fail( function (message){
		console.log("fail");
		console.log(message);
		var responseText = JSON.parse(message.responseText);
		console.log(responseText);
		switch (responseText.code) {
		case 2011:
			showConfirmDialog('', '비밀번호는 8자 이상입니다.', 'OK', function(){});
			break;
		case 2012:
			showConfirmDialog('', '현재 비밀번호가 잘못되었습니다.', 'OK', function(){});
			break;
		default:
			showConfirmDialog('', '비밀번호 변경 실패', 'OK', function(){});
			break;
		}
	});
}