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

// FDK Link와 직접 통신이 발생하는 모듈
_Transaction = function(oSendData, bAsync, strFunction, iTimeout)
{
	// var oRecvData = {
	// 		"Key" : "",
	// 		"LibName" : "",
	// 		"MultiValueIndex" : "",
	// 		"Port" : "",
	// 		"Return" : "LTkwOTAwMg==" // <=== "-909002", 
	// 		"ServerIP" : "",
	// 		"TranID" : "",
	// 		"Value" : "",
	// 		"WorkType" : ""
	// 	};	

	var oRecvData = {
		"Key" : "",
		"LibName" : "",
		"MultiValueIndex" : "",
		"Port" : "",
		"Return" : "LTkwOTAwMg==",
		"ServerIP" : "",
		"TranID" : "",
		"Value" : "",
		"WorkType" : ""
	};	
	
	// var strURL = "https://fdklink.firstdatacorp.co.kr:6554";
	//var strURL = "http://127.0.0.1:6554";
	var strURL = "https://127.0.0.1:6555";
	
	// 2021-11-10-JYL [ajax 이슈수정] ajaxPrefilter 에 셋팅시 전체의 ajax 통신에 영향을 발생시키므로 제거함.
	//jQuery.ajaxPrefilter('json', function(options, orig, jqXHR) {
	//	return 'jsonp';
	//});

	var strMsg = "" // Recv Log

	jQuery.support.cors = true;

	jQuery.ajax({
		type : "POST",
		url : strURL,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : oSendData,
		datatype : "jsonp",
		timeout : iTimeout,
		jsonp : "callback",
		async : bAsync,
		cache : false,

		success : function(data) {
			if(data != '{""}'){
				
				try {
					oRecvData = JSON.parse(data, null, 2);

					// Recv Log
					//strMsg = "_Transaction() Recv [Success] oRecvData=\n" + JSON.stringify(oRecvData, null, 2);
					//console.log(strMsg);
					
					if(bAsync == true ){
						strFunction(oRecvData.Return, oRecvData);
					}
				} catch( e ) {
					
				}
			}
		},
		error : function(request, status, error) {
			
			// 2023-06-09-JYL [에러일 경우 응답값 또는 기본값으로 처리되도록 별도 가공처리 하지 않음: 주석처리]
			//var strLastError = "Error code:" + request.status + "\n"
			//		+ "message:" + request.responseText + "\n" + "error:"
			//		+ error;
			//oRecvData['Return'] = RET_WebConnectError + ", ErrorInfo : " + strLastError;
			
			$('#dialog-confirm').dialog('open');

			//strMsg = "_Transaction() Recv [Error] oRecvData=\n" + JSON.stringify(oRecvData, null, 2);
			//console.log(strMsg);
			
			if(bAsync == true ){
				strFunction(oRecvData.Return, oRecvData);
			}
		}
	});

	$('#Progress_Loading').hide();
	
	return oRecvData;
};