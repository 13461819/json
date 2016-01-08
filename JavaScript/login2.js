function validateForm() {
	console.log("?");
//	var recaptcha = document.getElementById("g-recaptcha-response").value;
	var recaptcha = grecaptcha.getResponse();
	if (recaptcha) {
		data = { "email": $("#email").val(), "password": $("#passwd").val(), "g-recaptcha-response": recaptcha };
		console.log(data);
		var deviceId = localStorage.getItem("deviceId");
		if (deviceId) {
			data.deviceId = deviceId;
		}
		postToServer(data);
		return false;
	} else {
		alert("Please check not Robot!");
		return false;
	}
	return false;
}

function postToServer(json) {
	$.ajax({
		type:'POST',
		url: 'https://hbreeze4ani.appspot.com/api/v1/login',
		dataType: 'json',
//		data: $("#login").serialize(),
		data: JSON.stringify(json),
		contentType: 'application/json; charset=utf-8',
		success: function(result)
		{
			localStorage.setItem("deviceId", result.deviceId);
			sessionStorage.setItem('accounts', JSON.stringify(result));
			location.replace('index.html');
		},
		error: function(result)
		{
			var response = JSON.parse(result.responseText);
			console.log(result);
			switch (response.code) {
			case 2002:	// device does not exist.
				delete json.deviceId;
				localStorage.removeItem("deviceId");
				postToServer(json);
				break;
			case 2003:	// web device already exist.
				showConfirmDialog(
						'Your web device already exist!<br>Do you want to replace with new one?<br>Or add new web device to your account?',
						'Replace', function(){ json.forcing = 0; postToServer(json); },
						'Add',  function(){ json.forcing = 1; postToServer(json); },
						'Cancel', closeConfirmDialog
					);
				if (confirm('Your device for web already exist!\nDo you want to replace?')) {
					json.forcing = 0;
					postToServer(json);
				} else if (confirm('Or add new device to your account?')) {
					json.forcing = 1;
					postToServer(json);
				}
				break;
			case 2004:	// invalid id/password
				alert('Please check your e-mail id and password!')
				break;
			default:
				alert('Logon error!')
				location.reload();
				break;
			}
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