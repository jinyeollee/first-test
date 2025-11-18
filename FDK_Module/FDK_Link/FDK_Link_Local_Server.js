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

var WebPath_FDK_Link_Local_Server = getJsPath();

document
		.write("<meta http-equiv=''Content-Type' content='text/html; charset=UTF-8'>");
document.write("<script type='text/javascript' src='"
		+ WebPath_FDK_Link_Local_Server + "/FDKData.js'></script>");
document.write("<script type='text/javascript' src='"
		+ WebPath_FDK_Link_Local_Server + "/FDKDefine.js'></script>");

// ------------------------------Transaction-------------------------------

Transaction = function(strSendData, bAsync, strFunction, iTimeout) {
	var oRecvData;

	oRecvData = _Transaction(strSendData, bAsync, strFunction, iTimeout);

	if (bAsync == true)
		return "";

	if (oRecvData.Return != RET_WebConnectError
			&& oRecvData.WorkType == "FDK_Output")
		return FDK_Module_Data.OutputDecode(oRecvData['Return']);

	return oRecvData['Return'];
};

// -------------------------------------------------------------

function FDK_LinkConnect() {
	return Transaction(JSON.stringify({
		'LibName' : 'connect'
	}, null, 2), false, '', 10000);
};

function FDK_LinkVersion() {
	return Transaction(JSON.stringify({
		'LibName' : 'version'
	}, null, 2), false, '', 10000);
};

function FDK_LinkUpdate() {
	return Transaction(JSON.stringify({
		'LibName' : 'update'
	}, null, 2), false, '', 10000);
};

function FDK_LinkExit() {
	return Transaction(JSON.stringify({
		'LibName' : 'exit'
	}, null, 2), false, '', 10000);
};

// 브라우저 갱신 시 기존 PID 삭제
function FDK_LinkPID_ReleaseAll() {
	return Transaction(JSON.stringify({
		'LibName' : 'pid_release_all'
	}, null, 2), false, '', 10000);
};

var FDK_Module = new function() {

	this.FDK_Creat = function(strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = FDK_Module_Data.InputData("FDK_Creat", "", "", "", "");
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_Destroy = function(iProcID, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = FDK_Module_Data.InputData("FDK_Destroy", iProcID, "",
				"", "");
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_Input = function(iProcID, strKey, strValue, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = FDK_Module_Data.InputData("FDK_Input", iProcID, strKey,
				strValue);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_Execute = function(iProcID, strWorkKey, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = FDK_Module_Data.InputData("FDK_Execute", iProcID,
				strWorkKey);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 60000 * 2);
	};

	this.FDK_Output = function(iProcID, strKey, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = FDK_Module_Data.InputData("FDK_Output", iProcID, strKey);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

};

var Win4POS = new function() {

	this.FDK_WIN4POS_Create = function(strServerIP, strPort, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Create", '', '', '',
				strServerIP, strPort);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 60000);
	};

	this.FDK_WIN4POS_Destroy = function(strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Destroy");
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_Status = function(strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Status");
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_MkTranId = function(strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_MkTranId");
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_Init = function(strTranID, strKey, strValue, strFunction) {
		if (IsUndefined(bAsync))
			bAsync = false;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Init", strTranID,
				strKey, strValue);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_Term = function(strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Term");
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_Input = function(strKey, strValue, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Input", '', strKey,
				strValue);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_Input_Multi = function(strKey, strValue,
			strMultiValueIndex, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Input_Multi", '',
				strKey, strValue, '', '', strMultiValueIndex);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_Execute = function(strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Execute");
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 0);
	};

	this.FDK_WIN4POS_Output = function(strKey, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Output", '', strKey);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_Check = function(strServerIP, strPort, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_Check", '', '', '',
				strServerIP, strPort);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 60000);
	};

	
	this.FDK_WIN4POS_UserStop = function(strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_Data.InputData("FDK_WIN4POS_UserStop");
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};

	this.FDK_WIN4POS_Get_FileToString = function(strFilePath, iBufSize, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_SignPadData.InputData("FDK_WIN4POS_Get_FileToString", strFilePath, iBufSize);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};
	
	this.FDK_WIN4POS_Get_CustomerSignature = function(strFilePath, iBufSize, strMsg1, strMsg2, strMsg3, strMsg4, strFunction) {
		if (IsUndefined(strFunction))
			bAsync = false;
		else
			bAsync = true;

		var SendData = Win4POS_SignPadData.InputData("FDK_WIN4POS_Get_CustomerSignature", strFilePath, iBufSize, strMsg1, strMsg2, strMsg3, strMsg4);
		return Transaction(JSON.stringify(SendData, null, 2), bAsync,
				strFunction, 10000);
	};
};
