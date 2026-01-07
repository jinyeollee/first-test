function getJsPath() {
	var scriptList = document.getElementsByTagName("script");
	var fileName = scriptList[scriptList.length - 1].src;

	var token = fileName.split('/');
	var str = '';

	for (var i = 0; i < token.length - 1; i++) {
		str += token[i];
		if (token.length - 2 != i)
			str += '/';
	}
	return str;
}
var WebPath_FDKData = getJsPath();

document.write("<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>");

document.write("<script type='text/javascript' src='" + WebPath_FDKData + "/Base64.js'></script>");

// jquery 버전 : 온라인의 가능여부 및 jquery 특정버전이 필요할 경우를 판단하여 원하시는 jquery를 사용 하시면 됩니다. 
//document.write("<script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>");
//document.write("<script type='text/javascript' src='" + WebPath_FDKData + "/jquery-1.12.4.js'></script>");
document.write("<script type='text/javascript' src='" + WebPath_FDKData + "/jquery-3.7.1.js'></script>");

document.write("<script type='text/javascript' src='" + WebPath_FDKData + "/FDKDefine.js'></script>");
document.write("<link rel='stylesheet' type='text/css' href='" + WebPath_FDKData + "/style.css'/>");
document.write("<script type='text/javascript' src='" + WebPath_FDKData	+ "/common.js'></script>");

// ============================================================================
// FDK_Link 서버 접속 정보 (전역 설정)
// 프로토콜 자동 선택 방식
// Chrome Private Network Access 대응 (2025-01-06)
// ============================================================================
var FDK_Server_Config = {
	// 서버 URL 설정
	HTTP_URL: "http://127.0.0.1:6554",      // HTTP 서버
	HTTPS_URL: "https://127.0.0.1:6555",    // HTTPS 서버
	
	// 현재 페이지의 프로토콜에 맞춰 자동 선택
	getURL: function() {
		if (window.location.protocol === 'https:') {
			return this.HTTPS_URL;
		} else {
			return this.HTTP_URL;
		}
	},
	
	// 디버깅용 정보 출력
	printConfig: function() {
		console.log('╔═══════════════════════════════════════════════════════╗');
		console.log('║          FDK Server Configuration                     ║');
		console.log('╠═══════════════════════════════════════════════════════╣');
		console.log('║ Page Protocol  :', window.location.protocol.padEnd(32), '║');
		console.log('║ Selected URL   :', this.getURL().padEnd(32), '║');
		console.log('╟───────────────────────────────────────────────────────╢');
		console.log('║ HTTP URL       :', this.HTTP_URL.padEnd(32), '║');
		console.log('║ HTTPS URL      :', this.HTTPS_URL.padEnd(32), '║');
		console.log('╠═══════════════════════════════════════════════════════╣');
		console.log('║ Auto-Selection : ✅ ENABLED                           ║');
		console.log('║ - HTTPS page   → HTTPS server                         ║');
		console.log('║ - HTTP page    → HTTP server                          ║');
		console.log('╚═══════════════════════════════════════════════════════╝');
	}
};

// 페이지 로드 시 설정 확인 (개발 모드)
if (typeof console !== 'undefined' && console.log) {
	console.log('[FDK_Server_Config] Initialized');
	console.log('[FDK_Server_Config] Page Protocol:', window.location.protocol);
	console.log('[FDK_Server_Config] Selected URL:', FDK_Server_Config.getURL());
}

var FDKBase64 =
{
	encode : function(strData)
	{
		try
		{
			return Base64.encode(encodeURIComponent(strData));
		}
		catch (e)
		{
		}
		return "";
	},
	decode : function(strdata)
	{
		try
		{
			return decodeURIComponent(Base64.decode(strdata));
		}
		catch (e)
		{
		}
		return "ErrorInfo : base64 decode exception";
	}
}

var FDK_Module_Data = {
	InputData : function(strWorkType, strProcID, strKey, strValue) {
		var strWorkTypeData = "", strProcIDData = "", strKeyData = "", strValueData = "", strLibNameData = "FDK_Module";

		try {
			if (true != IsUndefined(strWorkType)) {
				strWorkTypeData = strWorkType;
			}
		} catch (e) {
			strWorkType = "";
		}

		try {
			if (true != IsUndefined(strProcID)) {
				strProcIDData = strProcID;
			}
		} catch (e) {
			strProcID = "";
		}

		try {
			if (true != IsUndefined(strKey)) {
				strKeyData = strKey;
			}
		} catch (e) {
			strKey = "";
		}

		try {
			if (true != IsUndefined(strValue)) {
				strValueData = strValue;
			}
		} catch (e) {
			strValue = "";
		}

		return {
			'Key' : strKeyData,
			'LibName' : strLibNameData,
			'ProcID' : strProcIDData,
			'Value' : strValueData,
			'WorkType' : strWorkTypeData			
		};
	},
	OutputDecode : function(strRecvData)
	{
		try
		{
			return  decodeURIComponent(FDKBase64.decode(strRecvData));
		}
		catch (e)
		{
		}
		
		return RET_WebBase64Decode;
	}
}

var Win4POS_Data = {
	InputData : function(strWorkType, strTranID, strKey, strValue, 	strServerIP, strPort, strMultiValueIndex) {
		var strWorkTypeData = "", strTranIDData = "", strKeyData = "", strValueData = "", 
		strServerIPData = "", strPortData = "", 	strMultiValueIndexData = "",	strLibNameData = "Win4POS";

		try {
			if (true != IsUndefined(strWorkType)) {
				strWorkTypeData = strWorkType;
			}
		} catch (e) {
			strWorkType = "";
		}

		try {
			if (true != IsUndefined(strTranID)) {
				strTranIDData = strTranID;
			}
		} catch (e) {
			strTranID = "";
		}

		try {
			if (true != IsUndefined(strKey)) {
				strKeyData = strKey;
			}
		} catch (e) {
			strKey = "";
		}

		try {
			if (true != IsUndefined(strValue)) {
				strValueData = strValue;
			}
		} catch (e) {
			strValue = "";
		}

		try {
			if (true != IsUndefined(strServerIP)) {
				strServerIPData = strServerIP;
			}
		} catch (e) {
			strServerIP = "";
		}

		try {
			if (true != IsUndefined(strPort)) {
				strPortData = strPort;
			}
		} catch (e) {
			strPort = "";
		}

		try {
			if (true != IsUndefined(strMultiValueIndex)) {
				strMultiValueIndexData = strMultiValueIndex;
			}
		} catch (e) {
			strMultiValueIndex = "";
		}
		
		try {
			if (true != IsUndefined(strMultiValueIndex)) {
				strMultiValueIndexData = strMultiValueIndex;
			}
		} catch (e) {
			strMultiValueIndex = "";
		}

		return {
			'Key' : strKeyData,
			'LibName' : strLibNameData,
			'MultiValueIndex' : strMultiValueIndexData,
			'Port' : strPortData,
			'ServerIP' : strServerIPData,
			'TranID' : strTranIDData,
			'Value' : strValueData,
			'WorkType' : strWorkTypeData
		};
	}
}


var Win4POS_SignPadData = {
	InputData : function(strWorkType, strFilePath, strBufSize, strMsg1, strMsg2, strMsg3, strMsg4) {
		var strWorkTypeData = "", strFilePathData = "", strBufSizeData = "", strMsg1Data = "", strMsg2Data = "", strMsg3Data = "", strMsg4Data = "", strLibNameData = "Win4POS_SignPad";

		try {
			if (true != IsUndefined(strWorkType)) {
				strWorkTypeData = strWorkType;
			}
		} catch (e) {
			strWorkType = "";
		}

		try {
			if (true != IsUndefined(strFilePath)) {
				strFilePathData = strFilePath;
			}
		} catch (e) {
			strFilePath = "";
		}

		try {
			if (true != IsUndefined(strBufSize)) {
				strBufSizeData = strBufSize;
			}
		} catch (e) {
			strBufSize = "";
		}
		
		try {
			if (true != IsUndefined(strMsg1)) {
				strMsg1Data = strMsg1;
			}
		} catch (e) {
			strMsg1 = "";
		}
		
		try {
			if (true != IsUndefined(strMsg2)) {
				strMsg2Data = strMsg2;
			}
		} catch (e) {
			strMsg2 = "";
		}
		
		try {
			if (true != IsUndefined(strMsg3)) {
				strMsg3Data = strMsg3;
			}
		} catch (e) {
			strMsg3 = "";
		}
		
		try {
			if (true != IsUndefined(strMsg4)) {
				strMsg4Data = strMsg4;
			}
		} catch (e) {
			strMsg4 = "";
		}

		return {
			'BufSize' : strBufSizeData,
			'FilePath' : strFilePathData,
			'LibName' : strLibNameData,
			'Msg1' : strMsg1Data,
			'Msg2' : strMsg2Data,
			'Msg3' : strMsg3Data,
			'Msg4' : strMsg4Data,
			'WorkType' : strWorkTypeData
		};
	}
}

// ============================================================================
// FDK Link와 직접 통신이 발생하는 모듈
// Chrome Private Network Access 대응 버전 (2025-01-06 수정)
// - 프로토콜 자동 선택: FDK_Server_Config.getURL()
// - HTTPS 환경에서 targetAddressSpace: 'private' 자동 적용
// - 모든 브라우저 호환 (Chrome, Firefox, Safari, Edge, IE11)
// ============================================================================
_Transaction = function(oSendData, bAsync, strFunction, iTimeout)
{
	var oRecvData = {
		"Key" : "",
		"LibName" : "",
		"MultiValueIndex" : "",
		"Port" : "",
		"Return" : "LTkwOTAwMg==",  // "-909002" (Base64)
		"ServerIP" : "",
		"TranID" : "",
		"Value" : "",
		"WorkType" : ""
	};	
	
	// ★★★ 전역 설정에서 URL 가져오기 (프로토콜 자동 선택) ★★★
	var strURL = FDK_Server_Config.getURL();
	
	// Chrome Private Network Access 지원 여부 확인
	var useFetchAPI = typeof fetch !== 'undefined';
	
	if (useFetchAPI) {
		// ====================================================================
		// 최신 브라우저: fetch API 사용 (Chrome Private Network Access 지원)
		// ====================================================================
		
		// ★★★ oSendData가 이미 문자열인지 체크 (FDK_Link_Local_Server.js 호환) ★★★
		var jsonString;
		if (typeof oSendData === 'string') {
			// 이미 JSON 문자열 → 그대로 사용 (FDK_Link_Local_Server.js에서 JSON.stringify 사용)
			jsonString = oSendData;
		} else {
			// 객체 → JSON 문자열로 변환
			jsonString = JSON.stringify(oSendData);
		}
		
		// fetch 옵션
		var fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: jsonString,  // ★★★ 타입 체크된 JSON 문자열
			cache: 'no-cache'
		};
		
		// ★★★ HTTPS 프로토콜일 경우에만 targetAddressSpace 추가 ★★★
		if (window.location.protocol === 'https:') {
			fetchOptions.targetAddressSpace = 'private';
		}
		
		// Timeout 처리
		var timeoutId;
		var timeoutPromise = new Promise(function(resolve, reject) {
			timeoutId = setTimeout(function() {
				reject(new Error('Request timeout'));
			}, iTimeout);
		});
		
		// fetch 요청
		var fetchPromise = fetch(strURL, fetchOptions)
			.then(function(response) {
				clearTimeout(timeoutId);
				
				if (!response.ok) {
					throw new Error('HTTP ' + response.status + ': ' + response.statusText);
				}
				
				return response.text();
			})
			.then(function(data) {
				if (data != '{""}') {
					try {
						oRecvData = JSON.parse(data);
						
						if (bAsync == true) {
							strFunction(oRecvData.Return, oRecvData);
						}
					} catch(e) {
						console.error('[_Transaction] JSON parse error:', e);
					}
				}
				
				$('#Progress_Loading').hide();
				return oRecvData;
			})
			.catch(function(error) {
				clearTimeout(timeoutId);
				console.error('[_Transaction] Fetch error:', error);
				console.error('[_Transaction] URL:', strURL);
				console.error('[_Transaction] Protocol:', window.location.protocol);
				
				$('#dialog-confirm').dialog('open');
				
				if (bAsync == true) {
					strFunction(oRecvData.Return, oRecvData);
				}
				
				$('#Progress_Loading').hide();
				return oRecvData;
			});
		
		// 비동기 모드
		if (bAsync == true) {
			Promise.race([fetchPromise, timeoutPromise]);
			return oRecvData;
		}
		// 동기 모드는 fetch에서 지원 안 함 - jQuery.ajax로 폴백
		else {
			console.warn('[_Transaction] Synchronous mode not supported with fetch API, falling back to jQuery.ajax');
			//useFetchAPI = false;
		}
	}
	
	// ====================================================================
	// 구형 브라우저 또는 동기 모드: jQuery.ajax 사용 (폴백)
	// ====================================================================
	if (!useFetchAPI) {
		jQuery.support.cors = true;
		
		jQuery.ajax({
			type : "POST",
			url : strURL,  // ★★★ 전역 설정 URL 사용
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : oSendData,
			datatype : "jsonp",
			timeout : iTimeout,
			jsonp : "callback",
			async : bAsync,
			cache : false,
			
			beforeSend: function(xhr) {
				console.log('[_Transaction] Sending request to', strURL);
				console.log('[_Transaction] Protocol:', window.location.protocol);
			},
			
			xhrFields: {
				withCredentials: false
			},

			success : function(data) {
				if(data != '{""}'){
					
					try {
						oRecvData = JSON.parse(data);
						
						if(bAsync == true ){
							strFunction(oRecvData.Return, oRecvData);
						}
					} catch( e ) {
						console.error('[_Transaction] JSON parse error:', e);
					}
				}
			},
			error : function(request, status, error) {
				console.error('[_Transaction] Ajax error:', status, error);
				console.error('[_Transaction] Status code:', request.status);
				console.error('[_Transaction] Response:', request.responseText);
				console.error('[_Transaction] URL:', strURL);
				console.error('[_Transaction] Protocol:', window.location.protocol);
				
				// 에러 원인 분석
				if (request.status === 0 || status === 'error') {
					console.error('[_Transaction] Possible causes:');
					console.error('  1. FDK_Link server is not running');
					console.error('  2. SSL certificate not trusted (HTTPS only)');
					console.error('  3. Chrome Private Network Access blocked (HTTPS only)');
					console.error('  4. Check server URL:', strURL);
				}
				
				$('#dialog-confirm').dialog('open');
				
				if(bAsync == true ){
					strFunction(oRecvData.Return, oRecvData);
				}
			}
		});

		$('#Progress_Loading').hide();
	}
	
	return oRecvData;
};

// ============================================================================
// 연결 테스트 함수 (디버깅용)
// Chrome DevTools Console에서 testFDKConnection() 실행
// ============================================================================
function testFDKConnection() {
	console.log('');
	console.log('╔════════════════════════════════════════════════════════════╗');
	console.log('║          FDK_Link Connection Test                          ║');
	console.log('╚════════════════════════════════════════════════════════════╝');
	
	// 설정 정보 출력
	FDK_Server_Config.printConfig();
	
	console.log('');
	console.log('Testing connection...');
	
	// fetch API 사용 가능 여부
	if (typeof fetch === 'undefined') {
		console.warn('⚠️  fetch API not available - using jQuery.ajax (limited support)');
		return;
	}
	
	// 서버 연결 테스트
	var strURL = FDK_Server_Config.getURL();
	var fetchOptions = {
		method: 'GET',
		cache: 'no-cache'
	};
	
	// HTTPS일 경우에만 targetAddressSpace 추가
	if (window.location.protocol === 'https:') {
		fetchOptions.targetAddressSpace = 'private';
		console.log('✓ targetAddressSpace: private (HTTPS mode)');
	}
	
	fetch(strURL, fetchOptions)
		.then(function(response) {
			console.log('✅ Server connection: SUCCESS');
			console.log('   Status:', response.status, response.statusText);
			
			// 헤더 확인
			var headers = {};
			response.headers.forEach(function(value, key) {
				headers[key] = value;
			});
			console.log('   Headers:', headers);
			
			// Private Network Access 헤더 확인 (HTTPS 모드만)
			if (window.location.protocol === 'https:') {
				var pnaHeader = response.headers.get('access-control-allow-private-network');
				if (pnaHeader === 'true') {
					console.log('✅ Private Network Access header: OK');
				} else {
					console.error('❌ Private Network Access header: MISSING');
					console.error('   Server must send: Access-Control-Allow-Private-Network: true');
				}
			}
			
			return response.text();
		})
		.then(function(text) {
			console.log('   Response:', text);
		})
		.catch(function(error) {
			console.error('❌ Server connection: FAILED');
			console.error('   Error:', error.message);
			console.error('');
			console.error('Troubleshooting:');
			console.error('  1. Check if FDK_Link server is running');
			console.error('  2. Verify server URL:', strURL);
			if (window.location.protocol === 'https:') {
				console.error('  3. Install ROOT CA certificate (HTTPS mode)');
				console.error('  4. Server must send Private Network Access header (HTTPS mode)');
			}
		});
}

// 페이지 로드 시 자동 테스트 (개발 모드)
// 실제 배포 시에는 주석 처리 권장
// window.addEventListener('DOMContentLoaded', testFDKConnection);
