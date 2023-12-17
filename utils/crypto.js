// An highlighted block
// des.js
import CryptoJS from 'crypto-js'
// 秘钥
export function getKey() {
	return CryptoJS.enc.Utf8.parse('1954682168dd5975')
}
// 偏移量
export function getIv() {
	return CryptoJS.enc.Utf8.parse('1954682168dd5975')
}
/*加密*/
export function encrypt(data) {
	const message = CryptoJS.enc.Utf8.parse(data);
	var ciphertext = CryptoJS.AES.encrypt(message, getKey(), {
		iv: getIv(),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	return ciphertext.toString();
}
/*解密*/
export function decrypt(data) {
	console.log(data)
	console.log(CryptoJS)
	var bytes = CryptoJS.AES.decrypt(new Uint8Array(data), getKey(), {
		iv: getIv(),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7

	});
	console.log(bytes)
	console.log(new Blob([bytes], {
		type: "image/png"
	}))

	return bytes.toString(CryptoJS.enc.Utf8);
}

