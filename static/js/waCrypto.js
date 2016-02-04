function getMyKey(email) {
	var sha3 = CryptoJS.SHA3(email, { outputLength: 256 });
	return sha3.toString(CryptoJS.enc.Base64);
}

function getMyToken(key) {
	var token, item = localStorage.getItem(key);
	if (item != null) {
		token = JSON.parse(item);
	} else {
		token = {};
	}
	return token;
}

function getDeviceID(key, ecnrtypedId) {
	if (token.deviceId) {
		var passphrase = "HealthBreeze" + key + "Web Application"
		var deviceId = CryptoJS.AES.decrypt(ecnrtypedId, passphrase).toString(CryptoJS.enc.Utf8);
		return parseInt(deviceId);
	}
	return null;
}

function setDeviceID(key, token, deviceId) {
	var passphrase = "HealthBreeze" + key + "Web Application"
	var ecnrtypedId = CryptoJS.AES.encrypt(deviceId.toString(), passphrase);
	if (token.deviceId === undefined || token.deviceId != ecnrtypedId) {
		token.deviceId = ecnrtypedId.toString();
		localStorage.setItem(key, JSON.stringify(token));
	}
}
