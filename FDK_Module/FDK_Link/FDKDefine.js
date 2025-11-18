

function getJsPath() {
    var scriptList = document.getElementsByTagName("script");
    var fileName = scriptList[scriptList.length - 1].src;
    
    var token = fileName.split('/');
    var str = '';
    
    for(var i=0; i<token.length-1; i++) {
    	str += token[i];
    	if(token.length-2 != i)
    		str += '/';
    }
    
    return str;
}
var WebPath_FDKDefine = getJsPath();

document.write("<script type='text/javascript' src='" + WebPath_FDKDefine + "/json2.js'></script>");

var RET_Success							= 0		// 정상
var RET_LibraryLoadingError			= '-909001'	// FDK 라이브러리 불러오기 오류
var RET_WebConnectError				= '-909002'	// Web Script와 FDK_Link와의 통신 오류
var RET_WebBase64Decode			= '-909003'	// Web Script에서 base64 decode 시 오류



function IsUndefined(varCheck)
{
	if(typeof(varCheck) == 'undefined' ||  null == varCheck)
		return true;
	return false;
}
