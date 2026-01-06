// 상세 메시지 팝업 여부
// var bShowMsg = false;	
var bShowMsg = true;

var g_objMemberShipCardRead = {
    'PID_Event_E1FF': 0,
    'PID_CardRead_E121': 0,
    'CardReadData': {
        'strCardDataType': '',
        'strCardData': '',
        'strEncodingCardData': '',
    }
};

var iPID_CardEvent_E1FF = 0;

///////////////	서명패드 ///////////////
//서명패드 장치 찾기
function SearchSignpad() {
    var iRet = 0;
    var strMsg = "서명패드 장치 찾기\n";
    var iProcID = FDK_Module.FDK_Creat();

    txtResult.value = '';

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Util/SearchSignPad");

    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        txtPortNoSignpad.value = FDK_Module.FDK_Output(iProcID, "Port");
        txtBaudrateNoSignpad.value = FDK_Module.FDK_Output(iProcID, "Baudrate");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);
    else
        alert("서명패드 장치 찾기 완료");


    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Port : " + FDK_Module.FDK_Output(iProcID, "Port") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Baudrate : " + FDK_Module.FDK_Output(iProcID, "Baudrate") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
}

//서명패드 초기화
function InitSignpad() {
    var strMsg = "서명패드 동작 초기화.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Control/OperationInitialize_31");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);
    else
        alert("서명패드 동작 초기화 완료");

    FDK_Module.FDK_Destroy(iProcID);
}

//서명패드 서명 요청
function ReqSignpad() {
    var strImagePath = "C:/FDK_Module/SignImage.bmp"; //서명 저장경로
    var strCatID = txtCATID.value;
    var strCardNo = "1111222233334444";
    var strSignData = "";

    if (strCatID == "") {
        strCatID = "10069371";
    }

    strSignData = iSignRequest_EasyMod(strCatID, strCardNo, txtMsg1.value, txtMsg2.value, txtMsg3.value, txtMsg4.value, strImagePath);
    //    if (strSignData.length > 0)
    //        alert("서명요청 성공");
    //    else
    //        alert("서명요청 실패");
}

function iSignRequest_EasyMod(strCatID, strCardNo, strMsg1, strMsg2, strMsg3, strMsg4, strImagePath) {
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    var strMsg = "서명 요청\n";
    var strOut = "";

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCatID);
    FDK_Module.FDK_Input(iProcID, "Card Data", strCardNo);
    FDK_Module.FDK_Input(iProcID, "Msg 1", strMsg1);
    FDK_Module.FDK_Input(iProcID, "Msg 2", strMsg2);
    FDK_Module.FDK_Input(iProcID, "Msg 3", strMsg3);
    FDK_Module.FDK_Input(iProcID, "Msg 4", strMsg4);

    if (strImagePath.length > 0) {
        FDK_Module.FDK_Input(iProcID, "@/Common/SignBMPSavePath", strImagePath);
    }

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Sign/SignRequest_EasyMod");

    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nSign Data Len : " + FDK_Module.FDK_Output(iProcID, "Sign Data Len") + "\n";
        strMsg += "Msg 1 : " + strMsg1 + "\n";
        strMsg += "Msg 2 : " + strMsg2 + "\n";
        strMsg += "Msg 3 : " + strMsg3 + "\n";
        strMsg += "Msg 4 : " + strMsg4 + "\n";
        if (strImagePath.length > 0) {
            strMsg += "서명저장경로 : " + strImagePath + "\n";
        }
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 == iRet) {
        strOut = FDK_Module.FDK_Output(iProcID, "Compress Method") + "S1" + FDK_Module.FDK_Output(iProcID, "Sign MAC Value") + FDK_Module.FDK_Output(iProcID, "Sign Data");
        strMsg += "서명데이터 : " + strOut + "\n";
    }

    if (0 != iRet) {
        strOut = "";
        strMsg += FDK_Module.FDK_Output(iProcID, "Response MSG 1");
    }

    alert(strMsg);

    FDK_Module.FDK_Destroy(iProcID);

    return strOut;
}

//서명패드 메시지 출력
function ReqSignpadMsg() {
    if (0 == iDisplayMessage_F800(txtMsg1.value, txtMsg2.value)) //메시지 출력
    {
        InitSignpad(); //서명 초기화. 
    }
}

function iDisplayMessage_F800(strMsg1, strMsg2) {
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    var strMsg = "서명패드 메시지 요청\n";

    FDK_Module.FDK_Input(iProcID, "Msg 1", strMsg1);
    FDK_Module.FDK_Input(iProcID, "Msg 2", strMsg2);


    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/PIN/DisplayMessage_F800");

    if (0 == iRet) {
        strMsg += "성공\n";
        strMsg += "Msg 1 : " + strMsg1 + "\n";
        strMsg += "Msg 2 : " + strMsg2 + "\n";
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));
    else
        alert(strMsg);

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}

//서명 초기화
function SignpadInit_A0() {
    var strMsg = "서명 초기화.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Sign/Init_A0");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);
    else
        alert("서명 초기화 완료");

    FDK_Module.FDK_Destroy(iProcID);
}

//서명 요청 Msg Input Check
function InputCheck(InText, OutText) {
    var nbytes = 0;
    var strMsg = InText.value;
    for (i = 0; i < strMsg.length; i++) {
        var ch = strMsg.charAt(i);
        if (escape(ch).length > 4) {
            nbytes += 2;
        } else if (ch == '\n') {
            if (strMsg.charAt(i - 1) != '\r') {
                nbytes += 1;
            }
        } else {
            nbytes += 1;
        }
    }

    if (nbytes > 16) {
        OutText.style.color = "red";
    }
    else {
        OutText.style.color = "black";
    }

    OutText.value = nbytes + "/16 byte"
}

///////////////	보안 리더기 ///////////////

function PosDownload() {
    var strCATID = "";
    var strMsg = "포스 다운로드\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "POS Serial Number", txtSerialNo.value);
    FDK_Module.FDK_Input(iProcID, "Merchant Identification", "SCRSample");
    FDK_Module.FDK_Input(iProcID, "Developer Identification", "SCRSample");
    FDK_Module.FDK_Input(iProcID, "Business Number", txtBizNo.value);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/POSDownload/A5");

    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strCATID = FDK_Module.FDK_Output(iProcID, "CAT ID");
        txtCATID.value = strCATID;
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));
    else
        alert("POS 다운로드 완료");

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Encryption Info Count : " + FDK_Module.FDK_Output(iProcID, "Encryption Info Count") + "\n";
        strMsg = strMsg + "First Encryption Method : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method") + "\n";
        strMsg = strMsg + "First Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method Code") + "\n";
        strMsg = strMsg + "First SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First SCR H/W Model Name") + "\n";
        strMsg = strMsg + "First SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "First SCR F/W Version") + "\n";
        strMsg = strMsg + "First POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Model Name") + "\n";
        strMsg = strMsg + "First POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Version") + "\n";
        strMsg = strMsg + "First Filler : " + FDK_Module.FDK_Output(iProcID, "First Filler") + "\n";
        strMsg = strMsg + "First SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "First SCR Serial Number") + "\n";
        strMsg = strMsg + "First POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "First POS Serial Number") + "\n";
        strMsg = strMsg + "First Encryption Data : " + FDK_Module.FDK_Output(iProcID, "First Encryption Data") + "\n";
        strMsg = strMsg + "Second Encryption Method : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method") + "\n";
        strMsg = strMsg + "Second Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method Code") + "\n";
        strMsg = strMsg + "Second SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second SCR H/W Model Name") + "\n";
        strMsg = strMsg + "Second SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "Second SCR F/W Version") + "\n";
        strMsg = strMsg + "Second POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Model Name") + "\n";
        strMsg = strMsg + "Second POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Version") + "\n";
        strMsg = strMsg + "Second Filler : " + FDK_Module.FDK_Output(iProcID, "Second Filler") + "\n";
        strMsg = strMsg + "Second SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second SCR Serial Number") + "\n";
        strMsg = strMsg + "Second POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second POS Serial Number") + "\n";
        strMsg = strMsg + "Second Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Data") + "\n";
        strMsg = strMsg + "Key Version : " + FDK_Module.FDK_Output(iProcID, "Key Version") + "\n";
        strMsg = strMsg + "POS Serial no : " + FDK_Module.FDK_Output(iProcID, "POS Serial no") + "\n";
        strMsg = strMsg + "POS Version : " + FDK_Module.FDK_Output(iProcID, "POS Version") + "\n";
        strMsg = strMsg + "POS Install Date : " + FDK_Module.FDK_Output(iProcID, "POS Install Date") + "\n";
        strMsg = strMsg + "Transaction Business Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Business Number") + "\n";
        strMsg = strMsg + "Security Filler : " + FDK_Module.FDK_Output(iProcID, "Security Filler") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "Transaction Data Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Data Version") + "\n";
        strMsg = strMsg + "Service Type : " + FDK_Module.FDK_Output(iProcID, "Service Type") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "Cancel Type : " + FDK_Module.FDK_Output(iProcID, "Cancel Type") + "\n";
        strMsg = strMsg + "Transmit Type : " + FDK_Module.FDK_Output(iProcID, "Transmit Type") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "POS Serial Number") + "\n";
        strMsg = strMsg + "Merchant Identification : " + FDK_Module.FDK_Output(iProcID, "Merchant Identification") + "\n";
        strMsg = strMsg + "Developer Identification : " + FDK_Module.FDK_Output(iProcID, "Developer Identification") + "\n";
        strMsg = strMsg + "Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Transaction Date Time") + "\n";
        strMsg = strMsg + "Transaction Serial Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Serial Number") + "\n";
        strMsg = strMsg + "Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Receipt Print Flag") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Download Type : " + FDK_Module.FDK_Output(iProcID, "Download Type") + "\n";
        strMsg = strMsg + "Business Number : " + FDK_Module.FDK_Output(iProcID, "Business Number") + "\n";
        strMsg = strMsg + "Transaction Module Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Module Version") + "\n";
        strMsg = strMsg + "Program Version : " + FDK_Module.FDK_Output(iProcID, "Program Version") + "\n";
        strMsg = strMsg + "POSDownload Filler : " + FDK_Module.FDK_Output(iProcID, "POSDownload Filler") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Product Serial Number : " + FDK_Module.FDK_Output(iProcID, "Product Serial Number") + "\n";
        strMsg = strMsg + "Representative Name : " + FDK_Module.FDK_Output(iProcID, "Representative Name") + "\n";
        strMsg = strMsg + "Merchant Name : " + FDK_Module.FDK_Output(iProcID, "Merchant Name") + "\n";
        strMsg = strMsg + "Merchant Address : " + FDK_Module.FDK_Output(iProcID, "Merchant Address") + "\n";
        strMsg = strMsg + "Merchant Phone Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Phone Number") + "\n";
        strMsg = strMsg + "Agent Phone Number : " + FDK_Module.FDK_Output(iProcID, "Agent Phone Number") + "\n";
        strMsg = strMsg + "TMS Address : " + FDK_Module.FDK_Output(iProcID, "TMS Address") + "\n";
        strMsg = strMsg + "TMS Down Port : " + FDK_Module.FDK_Output(iProcID, "TMS Down Port") + "\n";
        strMsg = strMsg + "TMS Upload Port : " + FDK_Module.FDK_Output(iProcID, "TMS Upload Port") + "\n";
        strMsg = strMsg + "TMS Down Domain : " + FDK_Module.FDK_Output(iProcID, "TMS Down Domain") + "\n";
        strMsg = strMsg + "TMS Up Domain : " + FDK_Module.FDK_Output(iProcID, "TMS Up Domain") + "\n";
        strMsg = strMsg + "KEY Index : " + FDK_Module.FDK_Output(iProcID, "KEY Index") + "\n";
        strMsg = strMsg + "TPK Data : " + FDK_Module.FDK_Output(iProcID, "TPK Data") + "\n";
        strMsg = strMsg + "MOBILE Only Flag : " + FDK_Module.FDK_Output(iProcID, "MOBILE Only Flag") + "\n";
        strMsg = strMsg + "NO CVM Amount : " + FDK_Module.FDK_Output(iProcID, "NO CVM Amount") + "\n";
        strMsg = strMsg + "POSDownload Filler2 : " + FDK_Module.FDK_Output(iProcID, "POSDownload Filler2") + "\n";
        strMsg = strMsg + "CR : " + FDK_Module.FDK_Output(iProcID, "CR") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
}

// 상세 메시지 팝업 여부
// var bShowMsg = false;	
var bShowMsg = true;

var g_objMemberShipCardRead = {
    'PID_Event_E1FF': 0,
    'PID_CardRead_E121': 0,
    'CardReadData': {
        'strCardDataType': '',
        'strCardData': '',
        'strEncodingCardData': '',
    }
};

var iPID_CardEvent_E1FF = 0;

///////////////	서명패드 ///////////////
//서명패드 장치 찾기
function SearchSignpad() {
    var iRet = 0;
    var strMsg = "서명패드 장치 찾기\n";
    var iProcID = FDK_Module.FDK_Creat();

    txtResult.value = '';

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Util/SearchSignPad");

    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        txtPortNoSignpad.value = FDK_Module.FDK_Output(iProcID, "Port");
        txtBaudrateNoSignpad.value = FDK_Module.FDK_Output(iProcID, "Baudrate");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);
    else
        alert("서명패드 장치 찾기 완료");


    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Port : " + FDK_Module.FDK_Output(iProcID, "Port") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Baudrate : " + FDK_Module.FDK_Output(iProcID, "Baudrate") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
}

//서명패드 초기화
function InitSignpad() {
    var strMsg = "서명패드 동작 초기화.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Control/OperationInitialize_31");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);
    else
        alert("서명패드 동작 초기화 완료");

    FDK_Module.FDK_Destroy(iProcID);
}

//서명패드 서명 요청
function ReqSignpad() {
    var strImagePath = "C:/FDK_Module/SignImage.bmp"; //서명 저장경로
    var strCatID = txtCATID.value;
    var strCardNo = "1111222233334444";
    var strSignData = "";

    if (strCatID == "") {
        strCatID = "10069371";
    }

    strSignData = iSignRequest_EasyMod(strCatID, strCardNo, txtMsg1.value, txtMsg2.value, txtMsg3.value, txtMsg4.value, strImagePath);
    //    if (strSignData.length > 0)
    //        alert("서명요청 성공");
    //    else
    //        alert("서명요청 실패");
}

function iSignRequest_EasyMod(strCatID, strCardNo, strMsg1, strMsg2, strMsg3, strMsg4, strImagePath) {
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    var strMsg = "서명 요청\n";
    var strOut = "";

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCatID);
    FDK_Module.FDK_Input(iProcID, "Card Data", strCardNo);
    FDK_Module.FDK_Input(iProcID, "Msg 1", strMsg1);
    FDK_Module.FDK_Input(iProcID, "Msg 2", strMsg2);
    FDK_Module.FDK_Input(iProcID, "Msg 3", strMsg3);
    FDK_Module.FDK_Input(iProcID, "Msg 4", strMsg4);

    if (strImagePath.length > 0) {
        FDK_Module.FDK_Input(iProcID, "@/Common/SignBMPSavePath", strImagePath);
    }

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Sign/SignRequest_EasyMod");

    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nSign Data Len : " + FDK_Module.FDK_Output(iProcID, "Sign Data Len") + "\n";
        strMsg += "Msg 1 : " + strMsg1 + "\n";
        strMsg += "Msg 2 : " + strMsg2 + "\n";
        strMsg += "Msg 3 : " + strMsg3 + "\n";
        strMsg += "Msg 4 : " + strMsg4 + "\n";
        if (strImagePath.length > 0) {
            strMsg += "서명저장경로 : " + strImagePath + "\n";
        }
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 == iRet) {
        strOut = FDK_Module.FDK_Output(iProcID, "Compress Method") + "S1" + FDK_Module.FDK_Output(iProcID, "Sign MAC Value") + FDK_Module.FDK_Output(iProcID, "Sign Data");
        strMsg += "서명데이터 : " + strOut + "\n";
    }

    if (0 != iRet) {
        strOut = "";
        strMsg += FDK_Module.FDK_Output(iProcID, "Response MSG 1");
    }

    alert(strMsg);

    FDK_Module.FDK_Destroy(iProcID);

    return strOut;
}

//서명패드 메시지 출력
function ReqSignpadMsg() {
    if (0 == iDisplayMessage_F800(txtMsg1.value, txtMsg2.value)) //메시지 출력
    {
        InitSignpad(); //서명 초기화. 
    }
}

function iDisplayMessage_F800(strMsg1, strMsg2) {
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    var strMsg = "서명패드 메시지 요청\n";

    FDK_Module.FDK_Input(iProcID, "Msg 1", strMsg1);
    FDK_Module.FDK_Input(iProcID, "Msg 2", strMsg2);


    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/PIN/DisplayMessage_F800");

    if (0 == iRet) {
        strMsg += "성공\n";
        strMsg += "Msg 1 : " + strMsg1 + "\n";
        strMsg += "Msg 2 : " + strMsg2 + "\n";
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));
    else
        alert(strMsg);

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}

//서명 초기화
function SignpadInit_A0() {
    var strMsg = "서명 초기화.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Sign/Init_A0");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);
    else
        alert("서명 초기화 완료");

    FDK_Module.FDK_Destroy(iProcID);
}

//서명 요청 Msg Input Check
function InputCheck(InText, OutText) {
    var nbytes = 0;
    var strMsg = InText.value;
    for (i = 0; i < strMsg.length; i++) {
        var ch = strMsg.charAt(i);
        if (escape(ch).length > 4) {
            nbytes += 2;
        } else if (ch == '\n') {
            if (strMsg.charAt(i - 1) != '\r') {
                nbytes += 1;
            }
        } else {
            nbytes += 1;
        }
    }

    if (nbytes > 16) {
        OutText.style.color = "red";
    }
    else {
        OutText.style.color = "black";
    }

    OutText.value = nbytes + "/16 byte"
}

///////////////	보안 리더기 ///////////////

function PosDownload() {
    var strCATID = "";
    var strMsg = "포스 다운로드\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "POS Serial Number", txtSerialNo.value);
    FDK_Module.FDK_Input(iProcID, "Merchant Identification", "SCRSample");
    FDK_Module.FDK_Input(iProcID, "Developer Identification", "SCRSample");
    FDK_Module.FDK_Input(iProcID, "Business Number", txtBizNo.value);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/POSDownload/A5");

    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strCATID = FDK_Module.FDK_Output(iProcID, "CAT ID");
        txtCATID.value = strCATID;
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));
    else
        alert("POS 다운로드 완료");

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Encryption Info Count : " + FDK_Module.FDK_Output(iProcID, "Encryption Info Count") + "\n";
        strMsg = strMsg + "First Encryption Method : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method") + "\n";
        strMsg = strMsg + "First Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method Code") + "\n";
        strMsg = strMsg + "First SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First SCR H/W Model Name") + "\n";
        strMsg = strMsg + "First SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "First SCR F/W Version") + "\n";
        strMsg = strMsg + "First POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Model Name") + "\n";
        strMsg = strMsg + "First POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Version") + "\n";
        strMsg = strMsg + "First Filler : " + FDK_Module.FDK_Output(iProcID, "First Filler") + "\n";
        strMsg = strMsg + "First SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "First SCR Serial Number") + "\n";
        strMsg = strMsg + "First POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "First POS Serial Number") + "\n";
        strMsg = strMsg + "First Encryption Data : " + FDK_Module.FDK_Output(iProcID, "First Encryption Data") + "\n";
        strMsg = strMsg + "Second Encryption Method : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method") + "\n";
        strMsg = strMsg + "Second Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method Code") + "\n";
        strMsg = strMsg + "Second SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second SCR H/W Model Name") + "\n";
        strMsg = strMsg + "Second SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "Second SCR F/W Version") + "\n";
        strMsg = strMsg + "Second POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Model Name") + "\n";
        strMsg = strMsg + "Second POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Version") + "\n";
        strMsg = strMsg + "Second Filler : " + FDK_Module.FDK_Output(iProcID, "Second Filler") + "\n";
        strMsg = strMsg + "Second SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second SCR Serial Number") + "\n";
        strMsg = strMsg + "Second POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second POS Serial Number") + "\n";
        strMsg = strMsg + "Second Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Data") + "\n";
        strMsg = strMsg + "Key Version : " + FDK_Module.FDK_Output(iProcID, "Key Version") + "\n";
        strMsg = strMsg + "POS Serial no : " + FDK_Module.FDK_Output(iProcID, "POS Serial no") + "\n";
        strMsg = strMsg + "POS Version : " + FDK_Module.FDK_Output(iProcID, "POS Version") + "\n";
        strMsg = strMsg + "POS Install Date : " + FDK_Module.FDK_Output(iProcID, "POS Install Date") + "\n";
        strMsg = strMsg + "Transaction Business Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Business Number") + "\n";
        strMsg = strMsg + "Security Filler : " + FDK_Module.FDK_Output(iProcID, "Security Filler") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "Transaction Data Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Data Version") + "\n";
        strMsg = strMsg + "Service Type : " + FDK_Module.FDK_Output(iProcID, "Service Type") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "Cancel Type : " + FDK_Module.FDK_Output(iProcID, "Cancel Type") + "\n";
        strMsg = strMsg + "Transmit Type : " + FDK_Module.FDK_Output(iProcID, "Transmit Type") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "POS Serial Number") + "\n";
        strMsg = strMsg + "Merchant Identification : " + FDK_Module.FDK_Output(iProcID, "Merchant Identification") + "\n";
        strMsg = strMsg + "Developer Identification : " + FDK_Module.FDK_Output(iProcID, "Developer Identification") + "\n";
        strMsg = strMsg + "Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Transaction Date Time") + "\n";
        strMsg = strMsg + "Transaction Serial Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Serial Number") + "\n";
        strMsg = strMsg + "Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Receipt Print Flag") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Download Type : " + FDK_Module.FDK_Output(iProcID, "Download Type") + "\n";
        strMsg = strMsg + "Business Number : " + FDK_Module.FDK_Output(iProcID, "Business Number") + "\n";
        strMsg = strMsg + "Transaction Module Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Module Version") + "\n";
        strMsg = strMsg + "Program Version : " + FDK_Module.FDK_Output(iProcID, "Program Version") + "\n";
        strMsg = strMsg + "POSDownload Filler : " + FDK_Module.FDK_Output(iProcID, "POSDownload Filler") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Product Serial Number : " + FDK_Module.FDK_Output(iProcID, "Product Serial Number") + "\n";
        strMsg = strMsg + "Representative Name : " + FDK_Module.FDK_Output(iProcID, "Representative Name") + "\n";
        strMsg = strMsg + "Merchant Name : " + FDK_Module.FDK_Output(iProcID, "Merchant Name") + "\n";
        strMsg = strMsg + "Merchant Address : " + FDK_Module.FDK_Output(iProcID, "Merchant Address") + "\n";
        strMsg = strMsg + "Merchant Phone Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Phone Number") + "\n";
        strMsg = strMsg + "Agent Phone Number : " + FDK_Module.FDK_Output(iProcID, "Agent Phone Number") + "\n";
        strMsg = strMsg + "TMS Address : " + FDK_Module.FDK_Output(iProcID, "TMS Address") + "\n";
        strMsg = strMsg + "TMS Down Port : " + FDK_Module.FDK_Output(iProcID, "TMS Down Port") + "\n";
        strMsg = strMsg + "TMS Upload Port : " + FDK_Module.FDK_Output(iProcID, "TMS Upload Port") + "\n";
        strMsg = strMsg + "TMS Down Domain : " + FDK_Module.FDK_Output(iProcID, "TMS Down Domain") + "\n";
        strMsg = strMsg + "TMS Up Domain : " + FDK_Module.FDK_Output(iProcID, "TMS Up Domain") + "\n";
        strMsg = strMsg + "KEY Index : " + FDK_Module.FDK_Output(iProcID, "KEY Index") + "\n";
        strMsg = strMsg + "TPK Data : " + FDK_Module.FDK_Output(iProcID, "TPK Data") + "\n";
        strMsg = strMsg + "MOBILE Only Flag : " + FDK_Module.FDK_Output(iProcID, "MOBILE Only Flag") + "\n";
        strMsg = strMsg + "NO CVM Amount : " + FDK_Module.FDK_Output(iProcID, "NO CVM Amount") + "\n";
        strMsg = strMsg + "POSDownload Filler2 : " + FDK_Module.FDK_Output(iProcID, "POSDownload Filler2") + "\n";
        strMsg = strMsg + "CR : " + FDK_Module.FDK_Output(iProcID, "CR") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
}


//보안 리더기 장치 찾기
function SearchSCR() {
    var strMsg = "장치찾기\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    txtResult.value = '';


    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Util/SearchSCR");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        txtPortNo.value = FDK_Module.FDK_Output(iProcID, "Port");
        txtBaudrateNo.value = FDK_Module.FDK_Output(iProcID, "Baudrate");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);
    else
        alert("보안 리더기 찾기 완료");


    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Port : " + FDK_Module.FDK_Output(iProcID, "Port") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Baudrate : " + FDK_Module.FDK_Output(iProcID, "Baudrate") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";

        alert(strMsg);
    }


    FDK_Module.FDK_Destroy(iProcID);
}

//보안 리더기 키 다운로드
function KeyDownload() {
    var iPID_KeyDown_Info_E111 = { value: 0 };

    if (0 != KeyDown_Info_E111(iPID_KeyDown_Info_E111)) {
        FDK_Module.FDK_Destroy(iPID_KeyDown_Info_E111.value);
        return;
    }

    var iPID_A5Start = { value: 0 };

    if (0 != KeyDownloadA5Start(txtCATID.value, txtBizNo.value, iPID_KeyDown_Info_E111.value, iPID_A5Start)) {
        FDK_Module.FDK_Destroy(iPID_KeyDown_Info_E111.value);
        FDK_Module.FDK_Destroy(iPID_A5Start.value);;
        return;
    }

    var iPID_KeyDown_Start_E112 = { value: 0 };

    if (0 != KeyDown_Start_E112(iPID_A5Start.value, iPID_KeyDown_Start_E112)) {
        FDK_Module.FDK_Destroy(iPID_KeyDown_Info_E111.value);
        FDK_Module.FDK_Destroy(iPID_A5Start.value);
        FDK_Module.FDK_Destroy(iPID_KeyDown_Start_E112.value);
        return;
    }

    var iPID_KeyDownloadA5End = { value: 0 };

    if (0 != KeyDownloadA5End(txtCATID.value, txtBizNo.value, iPID_KeyDown_Start_E112.value, iPID_KeyDownloadA5End)) {
        FDK_Module.FDK_Destroy(iPID_KeyDown_Info_E111.value);
        FDK_Module.FDK_Destroy(iPID_A5Start.value);
        FDK_Module.FDK_Destroy(iPID_KeyDown_Start_E112.value);
        FDK_Module.FDK_Destroy(iPID_KeyDownloadA5End.value);
        return;
    }

    if (0 == cmbKeydownloadMode.selectedIndex)	//구 스펙
    {
        if (0 != KeyDown_Complete_E113(txtCATID.value, iPID_KeyDownloadA5End.value)) {
            FDK_Module.FDK_Destroy(iPID_KeyDown_Info_E111.value);
            FDK_Module.FDK_Destroy(iPID_A5Start.value);
            FDK_Module.FDK_Destroy(iPID_KeyDown_Start_E112.value);
            FDK_Module.FDK_Destroy(iPID_KeyDownloadA5End.value);
            return;
        }
    }
    else 	//개선 스펙 대상 장비
    {
        if (0 != KeyDown_Complete_New_E11C(txtCATID.value, iPID_KeyDownloadA5End.value)) {
            FDK_Module.FDK_Destroy(iPID_KeyDown_Info_E111);
            FDK_Module.FDK_Destroy(iPID_A5Start);
            FDK_Module.FDK_Destroy(iPID_KeyDown_Start_E112.value);
            FDK_Module.FDK_Destroy(iPID_KeyDownloadA5End.value);
            return;
        }
    }

    FDK_Module.FDK_Destroy(iPID_KeyDown_Info_E111.value);
    FDK_Module.FDK_Destroy(iPID_A5Start.value);
    FDK_Module.FDK_Destroy(iPID_KeyDown_Start_E112.value);
    FDK_Module.FDK_Destroy(iPID_KeyDownloadA5End.value);

    alert("키 다운로드 완료");
}

function KeyDown_Info_E111(iPID_KeyDown_Info_E111) {
    var strMsg = "보안리더기 키 다운로드 정보 얻기\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_KeyDown_Info_E111.value = iProcID;

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/KeyDown_Info_E111");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "Sub1 Data Len : " + FDK_Module.FDK_Output(iProcID, "Sub1 Data Len") + "\n";
        strMsg = strMsg + "Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Encryption Method Code") + "\n";
        strMsg = strMsg + "Encryption Public Key Version : " + FDK_Module.FDK_Output(iProcID, "Encryption Public Key Version") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "SCR Info FW Version Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version Len") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "SCR Info SN Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info SN Len") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";

        alert(strMsg);
    }

    return iRet;
}

function KeyDownloadA5Start(strCATID, strBusinessNumber, iPID_KeyDown_Info_E111, iPID_A5Start) {
    var strMsg = "키 다운로드 (상호인증)\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_A5Start.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "First POS S/W Model Name", "SamplePOS001");     //인증정보를 입력하세요. 12자리
    FDK_Module.FDK_Input(iProcID, "First POS S/W Version", "0000");                //인증정보를 입력하세요. 4자리
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Business Number", strBusinessNumber);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_KeyDown_Info_E111);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/KeyDownload/A5Start");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Encryption Info Count : " + FDK_Module.FDK_Output(iProcID, "Encryption Info Count") + "\n";
        strMsg = strMsg + "First Encryption Method : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method") + "\n";
        strMsg = strMsg + "First Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method Code") + "\n";
        strMsg = strMsg + "First SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First SCR H/W Model Name") + "\n";
        strMsg = strMsg + "First SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "First SCR F/W Version") + "\n";
        strMsg = strMsg + "First POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Model Name") + "\n";
        strMsg = strMsg + "First POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Version") + "\n";
        strMsg = strMsg + "First Filler : " + FDK_Module.FDK_Output(iProcID, "First Filler") + "\n";
        strMsg = strMsg + "First SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "First SCR Serial Number") + "\n";
        strMsg = strMsg + "First POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "First POS Serial Number") + "\n";
        strMsg = strMsg + "First Encryption Data : " + FDK_Module.FDK_Output(iProcID, "First Encryption Data") + "\n";
        strMsg = strMsg + "Second Encryption Method : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method") + "\n";
        strMsg = strMsg + "Second Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method Code") + "\n";
        strMsg = strMsg + "Second SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second SCR H/W Model Name") + "\n";
        strMsg = strMsg + "Second SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "Second SCR F/W Version") + "\n";
        strMsg = strMsg + "Second POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Model Name") + "\n";
        strMsg = strMsg + "Second POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Version") + "\n";
        strMsg = strMsg + "Second Filler : " + FDK_Module.FDK_Output(iProcID, "Second Filler") + "\n";
        strMsg = strMsg + "Second SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second SCR Serial Number") + "\n";
        strMsg = strMsg + "Second POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second POS Serial Number") + "\n";
        strMsg = strMsg + "Second Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Data") + "\n";
        strMsg = strMsg + "Key Version : " + FDK_Module.FDK_Output(iProcID, "Key Version") + "\n";
        strMsg = strMsg + "POS Serial no : " + FDK_Module.FDK_Output(iProcID, "POS Serial no") + "\n";
        strMsg = strMsg + "POS Version : " + FDK_Module.FDK_Output(iProcID, "POS Version") + "\n";
        strMsg = strMsg + "POS Install Date : " + FDK_Module.FDK_Output(iProcID, "POS Install Date") + "\n";
        strMsg = strMsg + "Transaction Business Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Business Number") + "\n";
        strMsg = strMsg + "Security Filler : " + FDK_Module.FDK_Output(iProcID, "Security Filler") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "Transaction Data Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Data Version") + "\n";
        strMsg = strMsg + "Service Type : " + FDK_Module.FDK_Output(iProcID, "Service Type") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "Cancel Type : " + FDK_Module.FDK_Output(iProcID, "Cancel Type") + "\n";
        strMsg = strMsg + "Transmit Type : " + FDK_Module.FDK_Output(iProcID, "Transmit Type") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "POS Serial Number") + "\n";
        strMsg = strMsg + "Merchant Identification : " + FDK_Module.FDK_Output(iProcID, "Merchant Identification") + "\n";
        strMsg = strMsg + "Developer Identification : " + FDK_Module.FDK_Output(iProcID, "Developer Identification") + "\n";
        strMsg = strMsg + "Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Transaction Date Time") + "\n";
        strMsg = strMsg + "Transaction Serial Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Serial Number") + "\n";
        strMsg = strMsg + "Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Receipt Print Flag") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Request Type : " + FDK_Module.FDK_Output(iProcID, "Request Type") + "\n";
        strMsg = strMsg + "Business Number : " + FDK_Module.FDK_Output(iProcID, "Business Number") + "\n";
        strMsg = strMsg + "Transaction Module Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Module Version") + "\n";
        strMsg = strMsg + "Program Version : " + FDK_Module.FDK_Output(iProcID, "Program Version") + "\n";
        strMsg = strMsg + "Filler1 : " + FDK_Module.FDK_Output(iProcID, "Filler1") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Key Data Version : " + FDK_Module.FDK_Output(iProcID, "Key Data Version") + "\n";
        strMsg = strMsg + "Key Data Len : " + FDK_Module.FDK_Output(iProcID, "Key Data Len") + "\n";
        strMsg = strMsg + "Key Data : " + FDK_Module.FDK_Output(iProcID, "Key Data") + "\n";
        strMsg = strMsg + "Filler2 : " + FDK_Module.FDK_Output(iProcID, "Filler2") + "\n";
        strMsg = strMsg + "CR : " + FDK_Module.FDK_Output(iProcID, "CR") + "\n";

        alert(strMsg);
    }

    return iRet;
}


function KeyDownloadA5End(strCATID, strBusinessNumber, iPID_KeyDown_Start_E112, iPID_KeyDownloadA5End) {
    var strMsg = "키 다운로드 (키 다운로드)\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_KeyDownloadA5End.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "First POS S/W Model Name", "SamplePOS001");     //인증정보를 입력하세요. 12자리
    FDK_Module.FDK_Input(iProcID, "First POS S/W Version", "0000");                //인증정보를 입력하세요. 4자리
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Business Number", strBusinessNumber);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_KeyDown_Start_E112);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/KeyDownload/A5End");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Encryption Info Count : " + FDK_Module.FDK_Output(iProcID, "Encryption Info Count") + "\n";
        strMsg = strMsg + "First Encryption Method : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method") + "\n";
        strMsg = strMsg + "First Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method Code") + "\n";
        strMsg = strMsg + "First SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First SCR H/W Model Name") + "\n";
        strMsg = strMsg + "First SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "First SCR F/W Version") + "\n";
        strMsg = strMsg + "First POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Model Name") + "\n";
        strMsg = strMsg + "First POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Version") + "\n";
        strMsg = strMsg + "First Filler : " + FDK_Module.FDK_Output(iProcID, "First Filler") + "\n";
        strMsg = strMsg + "First SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "First SCR Serial Number") + "\n";
        strMsg = strMsg + "First POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "First POS Serial Number") + "\n";
        strMsg = strMsg + "First Encryption Data : " + FDK_Module.FDK_Output(iProcID, "First Encryption Data") + "\n";
        strMsg = strMsg + "Second Encryption Method : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method") + "\n";
        strMsg = strMsg + "Second Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method Code") + "\n";
        strMsg = strMsg + "Second SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second SCR H/W Model Name") + "\n";
        strMsg = strMsg + "Second SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "Second SCR F/W Version") + "\n";
        strMsg = strMsg + "Second POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Model Name") + "\n";
        strMsg = strMsg + "Second POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Version") + "\n";
        strMsg = strMsg + "Second Filler : " + FDK_Module.FDK_Output(iProcID, "Second Filler") + "\n";
        strMsg = strMsg + "Second SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second SCR Serial Number") + "\n";
        strMsg = strMsg + "Second POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second POS Serial Number") + "\n";
        strMsg = strMsg + "Second Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Data") + "\n";
        strMsg = strMsg + "Key Version : " + FDK_Module.FDK_Output(iProcID, "Key Version") + "\n";
        strMsg = strMsg + "POS Serial no : " + FDK_Module.FDK_Output(iProcID, "POS Serial no") + "\n";
        strMsg = strMsg + "POS Version : " + FDK_Module.FDK_Output(iProcID, "POS Version") + "\n";
        strMsg = strMsg + "POS Install Date : " + FDK_Module.FDK_Output(iProcID, "POS Install Date") + "\n";
        strMsg = strMsg + "Transaction Business Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Business Number") + "\n";
        strMsg = strMsg + "Security Filler : " + FDK_Module.FDK_Output(iProcID, "Security Filler") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "Transaction Data Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Data Version") + "\n";
        strMsg = strMsg + "Service Type : " + FDK_Module.FDK_Output(iProcID, "Service Type") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "Cancel Type : " + FDK_Module.FDK_Output(iProcID, "Cancel Type") + "\n";
        strMsg = strMsg + "Transmit Type : " + FDK_Module.FDK_Output(iProcID, "Transmit Type") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "POS Serial Number") + "\n";
        strMsg = strMsg + "Merchant Identification : " + FDK_Module.FDK_Output(iProcID, "Merchant Identification") + "\n";
        strMsg = strMsg + "Developer Identification : " + FDK_Module.FDK_Output(iProcID, "Developer Identification") + "\n";
        strMsg = strMsg + "Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Transaction Date Time") + "\n";
        strMsg = strMsg + "Transaction Serial Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Serial Number") + "\n";
        strMsg = strMsg + "Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Receipt Print Flag") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Request Type : " + FDK_Module.FDK_Output(iProcID, "Request Type") + "\n";
        strMsg = strMsg + "Business Number : " + FDK_Module.FDK_Output(iProcID, "Business Number") + "\n";
        strMsg = strMsg + "Transaction Module Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Module Version") + "\n";
        strMsg = strMsg + "Program Version : " + FDK_Module.FDK_Output(iProcID, "Program Version") + "\n";
        strMsg = strMsg + "Filler1 : " + FDK_Module.FDK_Output(iProcID, "Filler1") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Key Data Version : " + FDK_Module.FDK_Output(iProcID, "Key Data Version") + "\n";
        strMsg = strMsg + "Key Data Len : " + FDK_Module.FDK_Output(iProcID, "Key Data Len") + "\n";
        strMsg = strMsg + "Key Data : " + FDK_Module.FDK_Output(iProcID, "Key Data") + "\n";
        strMsg = strMsg + "Filler2 : " + FDK_Module.FDK_Output(iProcID, "Filler2") + "\n";
        strMsg = strMsg + "CR : " + FDK_Module.FDK_Output(iProcID, "CR") + "\n";

        alert(strMsg);
    }

    return iRet;
}


function KeyDown_Start_E112(iPID_A5Start, iPID_KeyDown_Start_E112) {
    var strMsg = "보안 리더기 키 다운로드 시작.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_KeyDown_Start_E112.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_A5Start);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/KeyDown_Start_E112");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Encryption Method Code") + "\n";
        strMsg = strMsg + "Encryption Public Key Version : " + FDK_Module.FDK_Output(iProcID, "Encryption Public Key Version") + "\n";
        strMsg = strMsg + "Encryption Data Len : " + FDK_Module.FDK_Output(iProcID, "Encryption Data Len") + "\n";
        strMsg = strMsg + "Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Encryption Data") + "\n";
        strMsg = strMsg + "Sub1 Data Len : " + FDK_Module.FDK_Output(iProcID, "Sub1 Data Len") + "\n";
        strMsg = strMsg + "Sub1 Data : " + FDK_Module.FDK_Output(iProcID, "Sub1 Data") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "SCR Info FW Version Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version Len") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "SCR Info SN Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info SN Len") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";

        alert(strMsg);
    }

    return iRet;
}


function KeyDown_Complete_E113(strCATID, iPID_KeyDownloadA5End) {
    var strMsg = "보안 리더기 키 다운로드 완료.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_KeyDownloadA5End);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/KeyDown_Complete_E113");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));


    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "SCR Info FW Version Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version Len") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "SCR Info SN Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info SN Len") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}

function KeyDown_Complete_New_E11C(strCATID, iPID_KeyDownloadA5End) {
    var strMsg = "보안 리더기 키 다운로드 완료 - (개선스펙).\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_KeyDownloadA5End);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/KeyDown_Complete_New_E11C");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));


    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Data Field1 Len : " + FDK_Module.FDK_Output(iProcID, "Data Field1 Len") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "FS40 : " + FDK_Module.FDK_Output(iProcID, "FS40") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "FS41 : " + FDK_Module.FDK_Output(iProcID, "FS41") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "FS42 : " + FDK_Module.FDK_Output(iProcID, "FS42") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "FS43 : " + FDK_Module.FDK_Output(iProcID, "FS43") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "FS44 : " + FDK_Module.FDK_Output(iProcID, "FS44") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "FS45 : " + FDK_Module.FDK_Output(iProcID, "FS45") + "\n";
        strMsg = strMsg + "SCR Info FW Build Date : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Build Date") + "\n";
        strMsg = strMsg + "FS46 : " + FDK_Module.FDK_Output(iProcID, "FS46") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}


//보안 리더기 무결성 검사
function IntegrityCheck() {
    var strMsg = "보안 리더기 무결성 검사.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Integrity_Check_E151");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    if (0 == iRet || -1000 == iRet) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "Integrity Info Count : " + FDK_Module.FDK_Output(iProcID, "Integrity Info Count") + "\n";
        strMsg = strMsg + "Integrity Info : " + FDK_Module.FDK_Output(iProcID, "Integrity Info") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "SCR Info FW Version Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version Len") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "SCR Info SN Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info SN Len") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
}

//보안리더기 상태 확인
function StateCheck() {
    var strMsg = "보안 리더기 상태 확인.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/State_Question_E141");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    if (0 == iRet || -1000 == iRet) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Len") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "SCR Info FW Version Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version Len") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "SCR Info SN Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info SN Len") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
}

//보안리더기 상태 확인 - (개선스펙)
function StateCheckNew() {
    var strMsg = "보안 리더기 상태 확인 - (개선스펙)\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/State_Question_New_E14A");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }


    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Data Field1 Len : " + FDK_Module.FDK_Output(iProcID, "Data Field1 Len") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "FS40 : " + FDK_Module.FDK_Output(iProcID, "FS40") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "FS41 : " + FDK_Module.FDK_Output(iProcID, "FS41") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "FS42 : " + FDK_Module.FDK_Output(iProcID, "FS42") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "FS43 : " + FDK_Module.FDK_Output(iProcID, "FS43") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "FS44 : " + FDK_Module.FDK_Output(iProcID, "FS44") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "FS45 : " + FDK_Module.FDK_Output(iProcID, "FS45") + "\n";
        strMsg = strMsg + "SCR Info FW Build Date : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Build Date") + "\n";
        strMsg = strMsg + "FS46 : " + FDK_Module.FDK_Output(iProcID, "FS46") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
}

//동작 초기화
function Reset() {
    var strMsg = "동작 초기화.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Operation_Initialize_31");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);
    else
        alert("동작 초기화 완료");

    FDK_Module.FDK_Destroy(iProcID);
}


//승인
function CreditAuth() {
    if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
        return;

    var strCardDataType = { value: "" };
    var bICCard = { value: false };
    var bFallBack = { value: false };
    var iPID_Payment_Request_E121 = { value: 0 };

    if (0 != Payment_Request_E121("1", txtCATID.value, cmbReadMode.value, cmbFallbackMode.value, txtTransactionAmount.value,
        iPID_Payment_Request_E121, bICCard, strCardDataType, bFallBack)) {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
        return;
    }

    var strAuthorizationNumber = { value: "" };
    var strAuthorizationDate = { value: "" };
    var iPID_A5Auth = { value: 0 };

    if ((strCardDataType.value == "C") ||//입력방식 IC
        (strCardDataType.value == "S" && true == bICCard.value && true == bFallBack.value))//입력방식 MSR + IC카드번호 + FB값
    {
        var strCardData = FDK_Module.FDK_Output(iPID_Payment_Request_E121.value, "Card Data").substring(0, 16);//카드번호
        var strSignData = "";

        //5만원 이상 서명요청
        if (txtTransactionAmount.value >= 50000) {
            if (strCardData.length <= 0) {
                alert("카드인식전 서명요청");
                FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
                return;
            }
            strSignData = iSignRequest_EasyMod(txtCATID.value, strCardData, "금액 : " + txtTransactionAmount.value, "일시불", "", "서명을하세요!", "");
            if (strSignData.length <= 0) {
                alert("서명요청 실패");
                FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
                return;
            }
        }
        else {
            if (0 != iDisplayMessage_F800("50,000원 이하", "무서명거래!!!")) {
                alert("50,000 이하 무서명메시지 출력 실패");
                FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
                return;
            }
        }
        txtStateCredit.value = "IC 승인전문";
        if (0 != CreditICA5Auth(txtCATID.value, txtTransactionAmount.value, iPID_Payment_Request_E121.value, strSignData, "",
            iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate)) {
            FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
            FDK_Module.FDK_Destroy(iPID_A5Auth.value);
            return;
        }
        //2017년 부터 IC 카드 후처리에서 오류 발생해도 무시.
        if (strCardDataType.value == "C")
            Payment_ResultIC_E131("1", txtCATID.value, iPID_A5Auth.value);

        InitSignpad(); //서명 초기화. 
    }
    else if (strCardDataType.value == "R" ||//입력방식 RF
        (strCardDataType.value == "S" && false == bICCard.value))//입력방식 MSR + IC카드번호
    {
        txtStateCredit.value = "MSR 승인전문";
        if (0 != CreditA5Auth(txtCATID.value, txtTransactionAmount.value, iPID_Payment_Request_E121.value, "", "",
            iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate)) {
            FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
            FDK_Module.FDK_Destroy(iPID_A5Auth.value);
            return;
        }
    }
    else {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
        FDK_Module.FDK_Destroy(iPID_A5Auth.value);

        alert("오류 : IC 입력을 진행해 주십시오.");
        return;
    }

    FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
    FDK_Module.FDK_Destroy(iPID_A5Auth.value);

    txtAuthorizationNumber.value = strAuthorizationNumber.value;
    txtAuthorizationDate.value = strAuthorizationDate.value;

    alert("승인 완료");
}

function SetCardReadRetry_E122() {
    var strMsg = "보안 리더기 카드읽기 재시도 기능 요청.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat()

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/SetCardReadRetry_E122");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}


function Payment_Request_E121(strAuthorizationType, strCATID, strReadMode, strFallbackMode, strTransactionAmount,
    iPID_Payment_Request_E121, bICCard, strCardDataType, bFallBack) {
    var strMsg = "보안 리더기 카드읽기.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_Payment_Request_E121.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthorizationType);//1:승인, 2취소
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Read Mode", strReadMode);
    FDK_Module.FDK_Input(iProcID, "Fallback Mode", strFallbackMode);
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Payment_Request_E121");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");

        var strCardData = FDK_Module.FDK_Output(iProcID, "Card Data");//카드번호
        strCardDataType.value = FDK_Module.FDK_Output(iProcID, "Card Data Type");//입력방식 S(msr), C(ic), R(rf)
        var strFBCode = FDK_Module.FDK_Output(iProcID, "IC Fallback Reason Code");//fallback 데이터 인가? (space or 00 아니면 fb)

        strFBCode = strFBCode.replace(/(^\s*)|(\s*$)/gi, "");	//trim

        if (0 < strFBCode.length && 0 != Number(strFBCode))
            bFallBack.value = true;
        else
            bFallBack.value = false;

        var iEqualIndex = strCardData.indexOf('=');
        if (0 < iEqualIndex && iEqualIndex + 5 + 1 <= strCardData.length) {
            var iServiceCode = Number(strCardData.substring(iEqualIndex + 5, iEqualIndex + 6));
            if (2 == iServiceCode || 6 == iServiceCode)
                bICCard.value = true;
        }
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    return iRet;
}




function DisplayErr(strMsg) {
    var ErrLog = [
        { code: "000B0000", msg: "리더기 상태 정상" },
        { code: "000B8001", msg: "리더기 Tamper 오류(Integrity Check Error)" },
        { code: "000B8002", msg: "MSR Error" },
        { code: "000B8003", msg: "IC Error" },
        { code: "000B0004", msg: "MSR 읽음 이벤트" },
        { code: "000B0005", msg: "IC 읽음 이벤트" },
        { code: "000B8006", msg: "IC 거래 불가" },
        { code: "000B8007", msg: "FallBack" },
        { code: "000B8008", msg: "IC 카드 삽입되어 있음" },
        { code: "000B8009", msg: "상황에 맞지 않는 명령" },
        { code: "000B8010", msg: "MSR 요청에 정책상 불가능.(Fallback 상황이 아님)" },
        { code: "000B8011", msg: "RF Error" },
        { code: "000B8012", msg: "단말기 번호 오류 : 키 다운로드의 단말기 번호와 다르면 에러" },
        { code: "000B8013", msg: "카드 읽기 이벤트 : 금액 요청 RF" },
        { code: "000B8014", msg: "이전 RF 카드 인식중" },
        { code: "000B8015", msg: "'카드 읽기', 'IC SG' 상황에 IC 카드가 인식되지 않음" },
        { code: "000B8016", msg: "카드읽기(개선스펙)에서 '가맹점 암호화 데이터'를 요청할 때 '가맹점 키 데이터'가 없다" }
    ];

    for (var i = 0; i < ErrLog.length; i++) {
        if (strMsg == ErrLog[i].code) {
            txtResult.value = txtResult.value + ErrLog[i].msg + "\n";
        }
    }
}


function Payment_ResultIC_E131(strAuthorizationType, strCATID, iPID_A5Auth) {
    var strMsg = "보안 리더기 IC카드 Second Generation.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthorizationType);
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_A5Auth);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Payment_ResultIC_E131");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}

function CreditICA5Auth(strCATID, strTransactionAmount, iPID_Payment_Request_E121, strSignData, strPIN_encdata,
    iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate) {
    var strMsg = "IC 신용 승인 거래\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_A5Auth.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Installment Period", "00");
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_Payment_Request_E121);

    if (36 < strSignData.length) {
        FDK_Module.FDK_Input(iProcID, "Sign Compress Method", strSignData.substring(0, 2));
        FDK_Module.FDK_Input(iProcID, "Sign Encryption Key", strSignData.substring(2, 4));
        FDK_Module.FDK_Input(iProcID, "Sign MAC Value", strSignData.substring(4, 36));
        FDK_Module.FDK_Input(iProcID, "Sign Data", strSignData.substring(36));
    }
    if (18 == strPIN_encdata.length) {
        FDK_Module.FDK_Input(iProcID, "Password Encrypt Key", strPIN_encdata.substring(0, 2));
        FDK_Module.FDK_Input(iProcID, "Password Data", strPIN_encdata.substring(2));
    }

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/CreditIC/A5Auth");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strAuthorizationNumber.value = FDK_Module.FDK_Output(iProcID, "Authorization Number");
        strAuthorizationDate.value = FDK_Module.FDK_Output(iProcID, "Authorization Date");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Encryption Info Count : " + FDK_Module.FDK_Output(iProcID, "Encryption Info Count") + "\n";
        strMsg = strMsg + "First Encryption Method : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method") + "\n";
        strMsg = strMsg + "First Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method Code") + "\n";
        strMsg = strMsg + "First SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First SCR H/W Model Name") + "\n";
        strMsg = strMsg + "First SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "First SCR F/W Version") + "\n";
        strMsg = strMsg + "First POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Model Name") + "\n";
        strMsg = strMsg + "First POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Version") + "\n";
        strMsg = strMsg + "First Filler : " + FDK_Module.FDK_Output(iProcID, "First Filler") + "\n";
        strMsg = strMsg + "First SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "First SCR Serial Number") + "\n";
        strMsg = strMsg + "First POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "First POS Serial Number") + "\n";
        strMsg = strMsg + "First Encryption Data : " + FDK_Module.FDK_Output(iProcID, "First Encryption Data") + "\n";
        strMsg = strMsg + "Second Encryption Method : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method") + "\n";
        strMsg = strMsg + "Second Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method Code") + "\n";
        strMsg = strMsg + "Second SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second SCR H/W Model Name") + "\n";
        strMsg = strMsg + "Second SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "Second SCR F/W Version") + "\n";
        strMsg = strMsg + "Second POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Model Name") + "\n";
        strMsg = strMsg + "Second POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Version") + "\n";
        strMsg = strMsg + "Second Filler : " + FDK_Module.FDK_Output(iProcID, "Second Filler") + "\n";
        strMsg = strMsg + "Second SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second SCR Serial Number") + "\n";
        strMsg = strMsg + "Second POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second POS Serial Number") + "\n";
        strMsg = strMsg + "Second Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Data") + "\n";
        strMsg = strMsg + "Key Version : " + FDK_Module.FDK_Output(iProcID, "Key Version") + "\n";
        strMsg = strMsg + "POS Serial no : " + FDK_Module.FDK_Output(iProcID, "POS Serial no") + "\n";
        strMsg = strMsg + "POS Version : " + FDK_Module.FDK_Output(iProcID, "POS Version") + "\n";
        strMsg = strMsg + "POS Install Date : " + FDK_Module.FDK_Output(iProcID, "POS Install Date") + "\n";
        strMsg = strMsg + "Transaction Business Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Business Number") + "\n";
        strMsg = strMsg + "Security Filler : " + FDK_Module.FDK_Output(iProcID, "Security Filler") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "Transaction Data Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Data Version") + "\n";
        strMsg = strMsg + "Service Type : " + FDK_Module.FDK_Output(iProcID, "Service Type") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "Cancel Type : " + FDK_Module.FDK_Output(iProcID, "Cancel Type") + "\n";
        strMsg = strMsg + "Transmit Type : " + FDK_Module.FDK_Output(iProcID, "Transmit Type") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "POS Serial Number") + "\n";
        strMsg = strMsg + "Merchant Identification : " + FDK_Module.FDK_Output(iProcID, "Merchant Identification") + "\n";
        strMsg = strMsg + "Developer Identification : " + FDK_Module.FDK_Output(iProcID, "Developer Identification") + "\n";
        strMsg = strMsg + "Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Transaction Date Time") + "\n";
        strMsg = strMsg + "Transaction Serial Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Serial Number") + "\n";
        strMsg = strMsg + "Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Receipt Print Flag") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "Installment Period : " + FDK_Module.FDK_Output(iProcID, "Installment Period") + "\n";
        strMsg = strMsg + "Currency Code : " + FDK_Module.FDK_Output(iProcID, "Currency Code") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "Service Amount : " + FDK_Module.FDK_Output(iProcID, "Service Amount") + "\n";
        strMsg = strMsg + "Tax Amount : " + FDK_Module.FDK_Output(iProcID, "Tax Amount") + "\n";
        strMsg = strMsg + "Original Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Number") + "\n";
        strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
        strMsg = strMsg + "Password Encrypt Key : " + FDK_Module.FDK_Output(iProcID, "Password Encrypt Key") + "\n";
        strMsg = strMsg + "Password Data : " + FDK_Module.FDK_Output(iProcID, "Password Data") + "\n";
        strMsg = strMsg + "Gas Station Vehicle Number : " + FDK_Module.FDK_Output(iProcID, "Gas Station Vehicle Number") + "\n";
        strMsg = strMsg + "Gas Station Oil Type Code : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Type Code") + "\n";
        strMsg = strMsg + "Gas Station Oil Price : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Price") + "\n";
        strMsg = strMsg + "Gas Station Oil Qty : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Qty") + "\n";
        strMsg = strMsg + "User Data Code : " + FDK_Module.FDK_Output(iProcID, "User Data Code") + "\n";
        strMsg = strMsg + "User Data : " + FDK_Module.FDK_Output(iProcID, "User Data") + "\n";
        strMsg = strMsg + "Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Material") + "\n";
        strMsg = strMsg + "Dongle Card Method : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Method") + "\n";
        strMsg = strMsg + "Dongle Filler : " + FDK_Module.FDK_Output(iProcID, "Dongle Filler") + "\n";
        strMsg = strMsg + "Point Card Type : " + FDK_Module.FDK_Output(iProcID, "Point Card Type") + "\n";
        strMsg = strMsg + "Point Card Data : " + FDK_Module.FDK_Output(iProcID, "Point Card Data") + "\n";
        strMsg = strMsg + "Point Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Point Card Data Type") + "\n";
        strMsg = strMsg + "Point Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Point Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Point Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Card Material") + "\n";
        strMsg = strMsg + "Customer Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Customer Receipt Print Flag") + "\n";
        strMsg = strMsg + "Merchant Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Merchant Receipt Print Flag") + "\n";
        strMsg = strMsg + "Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Taxable Amount") + "\n";
        strMsg = strMsg + "Non-Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Non-Taxable Amount") + "\n";
        strMsg = strMsg + "Point Filler : " + FDK_Module.FDK_Output(iProcID, "Point Filler") + "\n";
        strMsg = strMsg + "Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Authorization Number") + "\n";
        strMsg = strMsg + "Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Authorization Date") + "\n";
        strMsg = strMsg + "Server Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Server Transaction Date Time") + "\n";
        strMsg = strMsg + "Issuer Response Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Response Code") + "\n";
        strMsg = strMsg + "Merchant Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Number") + "\n";
        strMsg = strMsg + "DDC Flag : " + FDK_Module.FDK_Output(iProcID, "DDC Flag") + "\n";
        strMsg = strMsg + "DDC Receipt Number : " + FDK_Module.FDK_Output(iProcID, "DDC Receipt Number") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Card Name : " + FDK_Module.FDK_Output(iProcID, "Card Name") + "\n";
        strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
        strMsg = strMsg + "Issuer Name : " + FDK_Module.FDK_Output(iProcID, "Issuer Name") + "\n";
        strMsg = strMsg + "Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Acquirer Code") + "\n";
        strMsg = strMsg + "Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Acquirer Name") + "\n";
        strMsg = strMsg + "Card Balance : " + FDK_Module.FDK_Output(iProcID, "Card Balance") + "\n";
        strMsg = strMsg + "Discount Amount : " + FDK_Module.FDK_Output(iProcID, "Discount Amount") + "\n";
        strMsg = strMsg + "Notice : " + FDK_Module.FDK_Output(iProcID, "Notice") + "\n";
        strMsg = strMsg + "Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Unique Number") + "\n";
        strMsg = strMsg + "Remaining Count : " + FDK_Module.FDK_Output(iProcID, "Remaining Count") + "\n";
        strMsg = strMsg + "Issuer Identification Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Identification Code") + "\n";
        strMsg = strMsg + "Receipt Print : " + FDK_Module.FDK_Output(iProcID, "Receipt Print") + "\n";
        strMsg = strMsg + "Check Card Flag : " + FDK_Module.FDK_Output(iProcID, "Check Card Flag") + "\n";
        strMsg = strMsg + "NO CVM Amount : " + FDK_Module.FDK_Output(iProcID, "NO CVM Amount") + "\n";
        strMsg = strMsg + "Filler3 : " + FDK_Module.FDK_Output(iProcID, "Filler3") + "\n";
        strMsg = strMsg + "Point Response Code : " + FDK_Module.FDK_Output(iProcID, "Point Response Code") + "\n";
        strMsg = strMsg + "Point Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Point Issuer Code") + "\n";
        strMsg = strMsg + "Point Customer Name : " + FDK_Module.FDK_Output(iProcID, "Point Customer Name") + "\n";
        strMsg = strMsg + "Balance After Discount : " + FDK_Module.FDK_Output(iProcID, "Balance After Discount") + "\n";
        strMsg = strMsg + "Point Add : " + FDK_Module.FDK_Output(iProcID, "Point Add") + "\n";
        strMsg = strMsg + "Point Save : " + FDK_Module.FDK_Output(iProcID, "Point Save") + "\n";
        strMsg = strMsg + "Point Usable : " + FDK_Module.FDK_Output(iProcID, "Point Usable") + "\n";
        strMsg = strMsg + "Point Gas Station : " + FDK_Module.FDK_Output(iProcID, "Point Gas Station") + "\n";
        strMsg = strMsg + "Notification 1 : " + FDK_Module.FDK_Output(iProcID, "Notification 1") + "\n";
        strMsg = strMsg + "Notification 2 : " + FDK_Module.FDK_Output(iProcID, "Notification 2") + "\n";
        strMsg = strMsg + "Notification 3 : " + FDK_Module.FDK_Output(iProcID, "Notification 3") + "\n";
        strMsg = strMsg + "Notification 4 : " + FDK_Module.FDK_Output(iProcID, "Notification 4") + "\n";
        strMsg = strMsg + "Filler4 : " + FDK_Module.FDK_Output(iProcID, "Filler4") + "\n";
        strMsg = strMsg + "IC ARC : " + FDK_Module.FDK_Output(iProcID, "IC ARC") + "\n";
        strMsg = strMsg + "IC ARD : " + FDK_Module.FDK_Output(iProcID, "IC ARD") + "\n";
        strMsg = strMsg + "IC IAuthD : " + FDK_Module.FDK_Output(iProcID, "IC IAuthD") + "\n";
        strMsg = strMsg + "IC ISD : " + FDK_Module.FDK_Output(iProcID, "IC ISD") + "\n";
        strMsg = strMsg + "CR : " + FDK_Module.FDK_Output(iProcID, "CR") + "\n";

        alert(strMsg);
    }

    return iRet;
}

function CreditA5Auth(strCATID, strTransactionAmount, iPID_Payment_Request_E121,
    iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate) {
    var strMsg = "신용 승인 거래(MSR)\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_A5Auth.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Installment Period", "00");
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_Payment_Request_E121);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/Credit/A5Auth");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strAuthorizationNumber.value = FDK_Module.FDK_Output(iProcID, "Authorization Number");
        strAuthorizationDate.value = FDK_Module.FDK_Output(iProcID, "Authorization Date");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Encryption Info Count : " + FDK_Module.FDK_Output(iProcID, "Encryption Info Count") + "\n";
        strMsg = strMsg + "First Encryption Method : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method") + "\n";
        strMsg = strMsg + "First Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method Code") + "\n";
        strMsg = strMsg + "First SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First SCR H/W Model Name") + "\n";
        strMsg = strMsg + "First SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "First SCR F/W Version") + "\n";
        strMsg = strMsg + "First POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Model Name") + "\n";
        strMsg = strMsg + "First POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Version") + "\n";
        strMsg = strMsg + "First Filler : " + FDK_Module.FDK_Output(iProcID, "First Filler") + "\n";
        strMsg = strMsg + "First SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "First SCR Serial Number") + "\n";
        strMsg = strMsg + "First POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "First POS Serial Number") + "\n";
        strMsg = strMsg + "First Encryption Data : " + FDK_Module.FDK_Output(iProcID, "First Encryption Data") + "\n";
        strMsg = strMsg + "Second Encryption Method : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method") + "\n";
        strMsg = strMsg + "Second Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method Code") + "\n";
        strMsg = strMsg + "Second SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second SCR H/W Model Name") + "\n";
        strMsg = strMsg + "Second SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "Second SCR F/W Version") + "\n";
        strMsg = strMsg + "Second POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Model Name") + "\n";
        strMsg = strMsg + "Second POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Version") + "\n";
        strMsg = strMsg + "Second Filler : " + FDK_Module.FDK_Output(iProcID, "Second Filler") + "\n";
        strMsg = strMsg + "Second SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second SCR Serial Number") + "\n";
        strMsg = strMsg + "Second POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second POS Serial Number") + "\n";
        strMsg = strMsg + "Second Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Data") + "\n";
        strMsg = strMsg + "Key Version : " + FDK_Module.FDK_Output(iProcID, "Key Version") + "\n";
        strMsg = strMsg + "POS Serial no : " + FDK_Module.FDK_Output(iProcID, "POS Serial no") + "\n";
        strMsg = strMsg + "POS Version : " + FDK_Module.FDK_Output(iProcID, "POS Version") + "\n";
        strMsg = strMsg + "POS Install Date : " + FDK_Module.FDK_Output(iProcID, "POS Install Date") + "\n";
        strMsg = strMsg + "Transaction Business Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Business Number") + "\n";
        strMsg = strMsg + "Security Filler : " + FDK_Module.FDK_Output(iProcID, "Security Filler") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "Transaction Data Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Data Version") + "\n";
        strMsg = strMsg + "Service Type : " + FDK_Module.FDK_Output(iProcID, "Service Type") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "Cancel Type : " + FDK_Module.FDK_Output(iProcID, "Cancel Type") + "\n";
        strMsg = strMsg + "Transmit Type : " + FDK_Module.FDK_Output(iProcID, "Transmit Type") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "POS Serial Number") + "\n";
        strMsg = strMsg + "Merchant Identification : " + FDK_Module.FDK_Output(iProcID, "Merchant Identification") + "\n";
        strMsg = strMsg + "Developer Identification : " + FDK_Module.FDK_Output(iProcID, "Developer Identification") + "\n";
        strMsg = strMsg + "Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Transaction Date Time") + "\n";
        strMsg = strMsg + "Transaction Serial Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Serial Number") + "\n";
        strMsg = strMsg + "Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Receipt Print Flag") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "Installment Period : " + FDK_Module.FDK_Output(iProcID, "Installment Period") + "\n";
        strMsg = strMsg + "Currency Code : " + FDK_Module.FDK_Output(iProcID, "Currency Code") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "Service Amount : " + FDK_Module.FDK_Output(iProcID, "Service Amount") + "\n";
        strMsg = strMsg + "Tax Amount : " + FDK_Module.FDK_Output(iProcID, "Tax Amount") + "\n";
        strMsg = strMsg + "Original Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Number") + "\n";
        strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
        strMsg = strMsg + "Password Encrypt Key : " + FDK_Module.FDK_Output(iProcID, "Password Encrypt Key") + "\n";
        strMsg = strMsg + "Password Data : " + FDK_Module.FDK_Output(iProcID, "Password Data") + "\n";
        strMsg = strMsg + "Gas Station Vehicle Number : " + FDK_Module.FDK_Output(iProcID, "Gas Station Vehicle Number") + "\n";
        strMsg = strMsg + "Gas Station Oil Type Code : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Type Code") + "\n";
        strMsg = strMsg + "Gas Station Oil Price : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Price") + "\n";
        strMsg = strMsg + "Gas Station Oil Qty : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Qty") + "\n";
        strMsg = strMsg + "User Data Code : " + FDK_Module.FDK_Output(iProcID, "User Data Code") + "\n";
        strMsg = strMsg + "User Data : " + FDK_Module.FDK_Output(iProcID, "User Data") + "\n";
        strMsg = strMsg + "Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Material") + "\n";
        strMsg = strMsg + "Dongle Card Method : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Method") + "\n";
        strMsg = strMsg + "Dongle Filler : " + FDK_Module.FDK_Output(iProcID, "Dongle Filler") + "\n";
        strMsg = strMsg + "Point Card Type : " + FDK_Module.FDK_Output(iProcID, "Point Card Type") + "\n";
        strMsg = strMsg + "Point Card Data : " + FDK_Module.FDK_Output(iProcID, "Point Card Data") + "\n";
        strMsg = strMsg + "Point Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Point Card Data Type") + "\n";
        strMsg = strMsg + "Point Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Point Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Point Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Card Material") + "\n";
        strMsg = strMsg + "Customer Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Customer Receipt Print Flag") + "\n";
        strMsg = strMsg + "Merchant Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Merchant Receipt Print Flag") + "\n";
        strMsg = strMsg + "Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Taxable Amount") + "\n";
        strMsg = strMsg + "Non-Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Non-Taxable Amount") + "\n";
        strMsg = strMsg + "Point Filler : " + FDK_Module.FDK_Output(iProcID, "Point Filler") + "\n";
        strMsg = strMsg + "Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Authorization Number") + "\n";
        strMsg = strMsg + "Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Authorization Date") + "\n";
        strMsg = strMsg + "Server Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Server Transaction Date Time") + "\n";
        strMsg = strMsg + "Issuer Response Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Response Code") + "\n";
        strMsg = strMsg + "Merchant Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Number") + "\n";
        strMsg = strMsg + "DDC Flag : " + FDK_Module.FDK_Output(iProcID, "DDC Flag") + "\n";
        strMsg = strMsg + "DDC Receipt Number : " + FDK_Module.FDK_Output(iProcID, "DDC Receipt Number") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Card Name : " + FDK_Module.FDK_Output(iProcID, "Card Name") + "\n";
        strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
        strMsg = strMsg + "Issuer Name : " + FDK_Module.FDK_Output(iProcID, "Issuer Name") + "\n";
        strMsg = strMsg + "Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Acquirer Code") + "\n";
        strMsg = strMsg + "Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Acquirer Name") + "\n";
        strMsg = strMsg + "Card Balance : " + FDK_Module.FDK_Output(iProcID, "Card Balance") + "\n";
        strMsg = strMsg + "Discount Amount : " + FDK_Module.FDK_Output(iProcID, "Discount Amount") + "\n";
        strMsg = strMsg + "Notice : " + FDK_Module.FDK_Output(iProcID, "Notice") + "\n";
        strMsg = strMsg + "Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Unique Number") + "\n";
        strMsg = strMsg + "Remaining Count : " + FDK_Module.FDK_Output(iProcID, "Remaining Count") + "\n";
        strMsg = strMsg + "Issuer Identification Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Identification Code") + "\n";
        strMsg = strMsg + "Receipt Print : " + FDK_Module.FDK_Output(iProcID, "Receipt Print") + "\n";
        strMsg = strMsg + "Check Card Flag : " + FDK_Module.FDK_Output(iProcID, "Check Card Flag") + "\n";
        strMsg = strMsg + "NO CVM Amount : " + FDK_Module.FDK_Output(iProcID, "NO CVM Amount") + "\n";
        strMsg = strMsg + "Filler3 : " + FDK_Module.FDK_Output(iProcID, "Filler3") + "\n";
        strMsg = strMsg + "Point Response Code : " + FDK_Module.FDK_Output(iProcID, "Point Response Code") + "\n";
        strMsg = strMsg + "Point Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Point Issuer Code") + "\n";
        strMsg = strMsg + "Point Customer Name : " + FDK_Module.FDK_Output(iProcID, "Point Customer Name") + "\n";
        strMsg = strMsg + "Balance After Discount : " + FDK_Module.FDK_Output(iProcID, "Balance After Discount") + "\n";
        strMsg = strMsg + "Point Add : " + FDK_Module.FDK_Output(iProcID, "Point Add") + "\n";
        strMsg = strMsg + "Point Save : " + FDK_Module.FDK_Output(iProcID, "Point Save") + "\n";
        strMsg = strMsg + "Point Usable : " + FDK_Module.FDK_Output(iProcID, "Point Usable") + "\n";
        strMsg = strMsg + "Point Gas Station : " + FDK_Module.FDK_Output(iProcID, "Point Gas Station") + "\n";
        strMsg = strMsg + "Notification 1 : " + FDK_Module.FDK_Output(iProcID, "Notification 1") + "\n";
        strMsg = strMsg + "Notification 2 : " + FDK_Module.FDK_Output(iProcID, "Notification 2") + "\n";
        strMsg = strMsg + "Notification 3 : " + FDK_Module.FDK_Output(iProcID, "Notification 3") + "\n";
        strMsg = strMsg + "Notification 4 : " + FDK_Module.FDK_Output(iProcID, "Notification 4") + "\n";
        strMsg = strMsg + "Filler4 : " + FDK_Module.FDK_Output(iProcID, "Filler4") + "\n";
        strMsg = strMsg + "IC ARC : " + FDK_Module.FDK_Output(iProcID, "IC ARC") + "\n";
        strMsg = strMsg + "IC ARD : " + FDK_Module.FDK_Output(iProcID, "IC ARD") + "\n";
        strMsg = strMsg + "IC IAuthD : " + FDK_Module.FDK_Output(iProcID, "IC IAuthD") + "\n";
        strMsg = strMsg + "IC ISD : " + FDK_Module.FDK_Output(iProcID, "IC ISD") + "\n";
        strMsg = strMsg + "CR : " + FDK_Module.FDK_Output(iProcID, "CR") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}


//승인 취소
function CreditCancel() {
    if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
        return;

    var strCardDataType = { value: "" };
    var bICCard = { value: false };
    var bFallBack = { value: false };
    var iPID_Payment_Request_E121 = { value: 0 };

    if (0 != Payment_Request_E121("2", txtCATID.value, cmbReadMode.value, cmbFallbackMode.value, txtTransactionAmount.value,
        iPID_Payment_Request_E121, bICCard, strCardDataType, bFallBack)) {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
        return;
    }

    var strAuthorizationNumber = { value: "" };
    var strAuthorizationDate = { value: "" };
    var iPID_A5Cancel = { value: 0 };

    if (strCardDataType.value == "C" ||//입력방식 IC
        (strCardDataType.value == "S" && true == bICCard.value && true == bFallBack.value))//입력방식 MSR + IC카드번호 + FB값
    {
        var strCardData = FDK_Module.FDK_Output(iPID_Payment_Request_E121.value, "Card Data").substring(0, 16);//카드번호
        var strSignData = "";

        //5만원 이상 서명요청
        if (txtTransactionAmount.value >= 50000) {
            if (strCardData.length <= 0) {
                alert("카드인식전 서명요청");
                FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
                return;
            }
            strSignData = iSignRequest_EasyMod(txtCATID.value, strCardData, "금액 : " + txtTransactionAmount.value, "일시불", "", "서명을하세요!", "");
            if (strSignData.length <= 0) {
                alert("서명요청 실패");
                FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
                return;
            }
        }
        else {
            if (0 != iDisplayMessage_F800("50,000원 이하", "무서명거래!!!")) {
                alert("50,000 이하 무서명메시지 출력 실패");
                FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
                return;
            }
        }
        txtStateCredit.value = "IC 승인취소전문";

        if (0 != CreditICA5Cancel(txtCATID.value, txtTransactionAmount.value, txtAuthorizationNumber.value, txtAuthorizationDate.value, strSignData, "",
            iPID_Payment_Request_E121.value, iPID_A5Cancel)) {
            FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
            FDK_Module.FDK_Destroy(iPID_A5Cancel.value);
            return;
        }

        InitSignpad(); //서명 초기화. 
    }
    else if (strCardDataType.value == "R" ||//입력방식 RF
        (strCardDataType.value == "S" && false == bICCard.value))//입력방식 MSR + IC카드번호
    {
        txtStateCredit.value = "MSR 승인취소전문";
        if (0 != CreditA5Cancel(txtCATID.value, txtTransactionAmount.value, txtAuthorizationNumber.value, txtAuthorizationDate.value,
            iPID_Payment_Request_E121.value, iPID_A5Cancel)) {
            FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
            FDK_Module.FDK_Destroy(iPID_A5Cancel.value);
            return;
        }
    }
    else {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
        FDK_Module.FDK_Destroy(iPID_A5Cancel.value);

        alert("오류 : IC 입력을 진행해 주십시오.");
        return;
    }

    FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
    FDK_Module.FDK_Destroy(iPID_A5Cancel.value);

    alert("승인 취소 완료");
}


function CreditICA5Cancel(strCATID, strTransactionAmount, strOriginalAuthorizationNumber, strOriginalAuthorizationDate,
    strSignData, strPIN_encdata, iPID_Payment_Request_E121, iPID_A5Cancel) {
    var strMsg = "IC 신용 취소 거래\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_A5Cancel.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Installment Period", "00");
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Original Authorization Number", strOriginalAuthorizationNumber);
    FDK_Module.FDK_Input(iProcID, "Original Authorization Date", strOriginalAuthorizationDate);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_Payment_Request_E121);

    if (36 < strSignData.length) {
        FDK_Module.FDK_Input(iProcID, "Sign Compress Method", strSignData.substring(0, 2));
        FDK_Module.FDK_Input(iProcID, "Sign Encryption Key", strSignData.substring(2, 4));
        FDK_Module.FDK_Input(iProcID, "Sign MAC Value", strSignData.substring(4, 36));
        FDK_Module.FDK_Input(iProcID, "Sign Data", strSignData.substring(36));
    }
    if (18 == strPIN_encdata.length) {
        FDK_Module.FDK_Input(iProcID, "Password Encrypt Key", strPIN_encdata.substring(0, 2));
        FDK_Module.FDK_Input(iProcID, "Password Data", strPIN_encdata.substring(2));
    }

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/CreditIC/A5Cancel");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Encryption Info Count : " + FDK_Module.FDK_Output(iProcID, "Encryption Info Count") + "\n";
        strMsg = strMsg + "First Encryption Method : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method") + "\n";
        strMsg = strMsg + "First Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method Code") + "\n";
        strMsg = strMsg + "First SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First SCR H/W Model Name") + "\n";
        strMsg = strMsg + "First SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "First SCR F/W Version") + "\n";
        strMsg = strMsg + "First POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Model Name") + "\n";
        strMsg = strMsg + "First POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Version") + "\n";
        strMsg = strMsg + "First Filler : " + FDK_Module.FDK_Output(iProcID, "First Filler") + "\n";
        strMsg = strMsg + "First SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "First SCR Serial Number") + "\n";
        strMsg = strMsg + "First POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "First POS Serial Number") + "\n";
        strMsg = strMsg + "First Encryption Data : " + FDK_Module.FDK_Output(iProcID, "First Encryption Data") + "\n";
        strMsg = strMsg + "Second Encryption Method : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method") + "\n";
        strMsg = strMsg + "Second Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method Code") + "\n";
        strMsg = strMsg + "Second SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second SCR H/W Model Name") + "\n";
        strMsg = strMsg + "Second SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "Second SCR F/W Version") + "\n";
        strMsg = strMsg + "Second POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Model Name") + "\n";
        strMsg = strMsg + "Second POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Version") + "\n";
        strMsg = strMsg + "Second Filler : " + FDK_Module.FDK_Output(iProcID, "Second Filler") + "\n";
        strMsg = strMsg + "Second SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second SCR Serial Number") + "\n";
        strMsg = strMsg + "Second POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second POS Serial Number") + "\n";
        strMsg = strMsg + "Second Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Data") + "\n";
        strMsg = strMsg + "Key Version : " + FDK_Module.FDK_Output(iProcID, "Key Version") + "\n";
        strMsg = strMsg + "POS Serial no : " + FDK_Module.FDK_Output(iProcID, "POS Serial no") + "\n";
        strMsg = strMsg + "POS Version : " + FDK_Module.FDK_Output(iProcID, "POS Version") + "\n";
        strMsg = strMsg + "POS Install Date : " + FDK_Module.FDK_Output(iProcID, "POS Install Date") + "\n";
        strMsg = strMsg + "Transaction Business Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Business Number") + "\n";
        strMsg = strMsg + "Security Filler : " + FDK_Module.FDK_Output(iProcID, "Security Filler") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "Transaction Data Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Data Version") + "\n";
        strMsg = strMsg + "Service Type : " + FDK_Module.FDK_Output(iProcID, "Service Type") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "Cancel Type : " + FDK_Module.FDK_Output(iProcID, "Cancel Type") + "\n";
        strMsg = strMsg + "Transmit Type : " + FDK_Module.FDK_Output(iProcID, "Transmit Type") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "POS Serial Number") + "\n";
        strMsg = strMsg + "Merchant Identification : " + FDK_Module.FDK_Output(iProcID, "Merchant Identification") + "\n";
        strMsg = strMsg + "Developer Identification : " + FDK_Module.FDK_Output(iProcID, "Developer Identification") + "\n";
        strMsg = strMsg + "Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Transaction Date Time") + "\n";
        strMsg = strMsg + "Transaction Serial Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Serial Number") + "\n";
        strMsg = strMsg + "Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Receipt Print Flag") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "Installment Period : " + FDK_Module.FDK_Output(iProcID, "Installment Period") + "\n";
        strMsg = strMsg + "Currency Code : " + FDK_Module.FDK_Output(iProcID, "Currency Code") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "Service Amount : " + FDK_Module.FDK_Output(iProcID, "Service Amount") + "\n";
        strMsg = strMsg + "Tax Amount : " + FDK_Module.FDK_Output(iProcID, "Tax Amount") + "\n";
        strMsg = strMsg + "Original Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Number") + "\n";
        strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
        strMsg = strMsg + "Password Encrypt Key : " + FDK_Module.FDK_Output(iProcID, "Password Encrypt Key") + "\n";
        strMsg = strMsg + "Password Data : " + FDK_Module.FDK_Output(iProcID, "Password Data") + "\n";
        strMsg = strMsg + "Gas Station Vehicle Number : " + FDK_Module.FDK_Output(iProcID, "Gas Station Vehicle Number") + "\n";
        strMsg = strMsg + "Gas Station Oil Type Code : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Type Code") + "\n";
        strMsg = strMsg + "Gas Station Oil Price : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Price") + "\n";
        strMsg = strMsg + "Gas Station Oil Qty : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Qty") + "\n";
        strMsg = strMsg + "User Data Code : " + FDK_Module.FDK_Output(iProcID, "User Data Code") + "\n";
        strMsg = strMsg + "User Data : " + FDK_Module.FDK_Output(iProcID, "User Data") + "\n";
        strMsg = strMsg + "Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Material") + "\n";
        strMsg = strMsg + "Dongle Card Method : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Method") + "\n";
        strMsg = strMsg + "Dongle Filler : " + FDK_Module.FDK_Output(iProcID, "Dongle Filler") + "\n";
        strMsg = strMsg + "Point Card Type : " + FDK_Module.FDK_Output(iProcID, "Point Card Type") + "\n";
        strMsg = strMsg + "Point Card Data : " + FDK_Module.FDK_Output(iProcID, "Point Card Data") + "\n";
        strMsg = strMsg + "Point Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Point Card Data Type") + "\n";
        strMsg = strMsg + "Point Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Point Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Point Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Card Material") + "\n";
        strMsg = strMsg + "Customer Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Customer Receipt Print Flag") + "\n";
        strMsg = strMsg + "Merchant Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Merchant Receipt Print Flag") + "\n";
        strMsg = strMsg + "Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Taxable Amount") + "\n";
        strMsg = strMsg + "Non-Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Non-Taxable Amount") + "\n";
        strMsg = strMsg + "Point Filler : " + FDK_Module.FDK_Output(iProcID, "Point Filler") + "\n";
        strMsg = strMsg + "Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Authorization Number") + "\n";
        strMsg = strMsg + "Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Authorization Date") + "\n";
        strMsg = strMsg + "Server Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Server Transaction Date Time") + "\n";
        strMsg = strMsg + "Issuer Response Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Response Code") + "\n";
        strMsg = strMsg + "Merchant Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Number") + "\n";
        strMsg = strMsg + "DDC Flag : " + FDK_Module.FDK_Output(iProcID, "DDC Flag") + "\n";
        strMsg = strMsg + "DDC Receipt Number : " + FDK_Module.FDK_Output(iProcID, "DDC Receipt Number") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Card Name : " + FDK_Module.FDK_Output(iProcID, "Card Name") + "\n";
        strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
        strMsg = strMsg + "Issuer Name : " + FDK_Module.FDK_Output(iProcID, "Issuer Name") + "\n";
        strMsg = strMsg + "Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Acquirer Code") + "\n";
        strMsg = strMsg + "Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Acquirer Name") + "\n";
        strMsg = strMsg + "Card Balance : " + FDK_Module.FDK_Output(iProcID, "Card Balance") + "\n";
        strMsg = strMsg + "Discount Amount : " + FDK_Module.FDK_Output(iProcID, "Discount Amount") + "\n";
        strMsg = strMsg + "Notice : " + FDK_Module.FDK_Output(iProcID, "Notice") + "\n";
        strMsg = strMsg + "Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Unique Number") + "\n";
        strMsg = strMsg + "Remaining Count : " + FDK_Module.FDK_Output(iProcID, "Remaining Count") + "\n";
        strMsg = strMsg + "Issuer Identification Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Identification Code") + "\n";
        strMsg = strMsg + "Receipt Print : " + FDK_Module.FDK_Output(iProcID, "Receipt Print") + "\n";
        strMsg = strMsg + "Check Card Flag : " + FDK_Module.FDK_Output(iProcID, "Check Card Flag") + "\n";
        strMsg = strMsg + "NO CVM Amount : " + FDK_Module.FDK_Output(iProcID, "NO CVM Amount") + "\n";
        strMsg = strMsg + "Filler3 : " + FDK_Module.FDK_Output(iProcID, "Filler3") + "\n";
        strMsg = strMsg + "Point Response Code : " + FDK_Module.FDK_Output(iProcID, "Point Response Code") + "\n";
        strMsg = strMsg + "Point Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Point Issuer Code") + "\n";
        strMsg = strMsg + "Point Customer Name : " + FDK_Module.FDK_Output(iProcID, "Point Customer Name") + "\n";
        strMsg = strMsg + "Balance After Discount : " + FDK_Module.FDK_Output(iProcID, "Balance After Discount") + "\n";
        strMsg = strMsg + "Point Add : " + FDK_Module.FDK_Output(iProcID, "Point Add") + "\n";
        strMsg = strMsg + "Point Save : " + FDK_Module.FDK_Output(iProcID, "Point Save") + "\n";
        strMsg = strMsg + "Point Usable : " + FDK_Module.FDK_Output(iProcID, "Point Usable") + "\n";
        strMsg = strMsg + "Point Gas Station : " + FDK_Module.FDK_Output(iProcID, "Point Gas Station") + "\n";
        strMsg = strMsg + "Notification 1 : " + FDK_Module.FDK_Output(iProcID, "Notification 1") + "\n";
        strMsg = strMsg + "Notification 2 : " + FDK_Module.FDK_Output(iProcID, "Notification 2") + "\n";
        strMsg = strMsg + "Notification 3 : " + FDK_Module.FDK_Output(iProcID, "Notification 3") + "\n";
        strMsg = strMsg + "Notification 4 : " + FDK_Module.FDK_Output(iProcID, "Notification 4") + "\n";
        strMsg = strMsg + "Filler4 : " + FDK_Module.FDK_Output(iProcID, "Filler4") + "\n";
        strMsg = strMsg + "IC ARC : " + FDK_Module.FDK_Output(iProcID, "IC ARC") + "\n";
        strMsg = strMsg + "IC ARD : " + FDK_Module.FDK_Output(iProcID, "IC ARD") + "\n";
        strMsg = strMsg + "IC IAuthD : " + FDK_Module.FDK_Output(iProcID, "IC IAuthD") + "\n";
        strMsg = strMsg + "IC ISD : " + FDK_Module.FDK_Output(iProcID, "IC ISD") + "\n";
        strMsg = strMsg + "CR : " + FDK_Module.FDK_Output(iProcID, "CR") + "\n";
        alert(strMsg);
    }

    return iRet;
}

function CreditA5Cancel(strCATID, strTransactionAmount, strOriginalAuthorizationNumber,
    strOriginalAuthorizationDate, iPID_Payment_Request_E121, iPID_A5Cancel) {
    var strMsg = "신용 취소 거래(MSR)\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_A5Cancel.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Installment Period", "00");
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Original Authorization Number", strOriginalAuthorizationNumber);
    FDK_Module.FDK_Input(iProcID, "Original Authorization Date", strOriginalAuthorizationDate);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_Payment_Request_E121);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/Credit/A5Cancel");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));


    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Encryption Info Count : " + FDK_Module.FDK_Output(iProcID, "Encryption Info Count") + "\n";
        strMsg = strMsg + "First Encryption Method : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method") + "\n";
        strMsg = strMsg + "First Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "First Encryption Method Code") + "\n";
        strMsg = strMsg + "First SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First SCR H/W Model Name") + "\n";
        strMsg = strMsg + "First SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "First SCR F/W Version") + "\n";
        strMsg = strMsg + "First POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Model Name") + "\n";
        strMsg = strMsg + "First POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "First POS S/W Version") + "\n";
        strMsg = strMsg + "First Filler : " + FDK_Module.FDK_Output(iProcID, "First Filler") + "\n";
        strMsg = strMsg + "First SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "First SCR Serial Number") + "\n";
        strMsg = strMsg + "First POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "First POS Serial Number") + "\n";
        strMsg = strMsg + "First Encryption Data : " + FDK_Module.FDK_Output(iProcID, "First Encryption Data") + "\n";
        strMsg = strMsg + "Second Encryption Method : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method") + "\n";
        strMsg = strMsg + "Second Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Method Code") + "\n";
        strMsg = strMsg + "Second SCR H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second SCR H/W Model Name") + "\n";
        strMsg = strMsg + "Second SCR F/W Version : " + FDK_Module.FDK_Output(iProcID, "Second SCR F/W Version") + "\n";
        strMsg = strMsg + "Second POS S/W Model Name : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Model Name") + "\n";
        strMsg = strMsg + "Second POS S/W Version : " + FDK_Module.FDK_Output(iProcID, "Second POS S/W Version") + "\n";
        strMsg = strMsg + "Second Filler : " + FDK_Module.FDK_Output(iProcID, "Second Filler") + "\n";
        strMsg = strMsg + "Second SCR Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second SCR Serial Number") + "\n";
        strMsg = strMsg + "Second POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "Second POS Serial Number") + "\n";
        strMsg = strMsg + "Second Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Second Encryption Data") + "\n";
        strMsg = strMsg + "Key Version : " + FDK_Module.FDK_Output(iProcID, "Key Version") + "\n";
        strMsg = strMsg + "POS Serial no : " + FDK_Module.FDK_Output(iProcID, "POS Serial no") + "\n";
        strMsg = strMsg + "POS Version : " + FDK_Module.FDK_Output(iProcID, "POS Version") + "\n";
        strMsg = strMsg + "POS Install Date : " + FDK_Module.FDK_Output(iProcID, "POS Install Date") + "\n";
        strMsg = strMsg + "Transaction Business Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Business Number") + "\n";
        strMsg = strMsg + "Security Filler : " + FDK_Module.FDK_Output(iProcID, "Security Filler") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "Transaction Data Version : " + FDK_Module.FDK_Output(iProcID, "Transaction Data Version") + "\n";
        strMsg = strMsg + "Service Type : " + FDK_Module.FDK_Output(iProcID, "Service Type") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "Cancel Type : " + FDK_Module.FDK_Output(iProcID, "Cancel Type") + "\n";
        strMsg = strMsg + "Transmit Type : " + FDK_Module.FDK_Output(iProcID, "Transmit Type") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "POS Serial Number : " + FDK_Module.FDK_Output(iProcID, "POS Serial Number") + "\n";
        strMsg = strMsg + "Merchant Identification : " + FDK_Module.FDK_Output(iProcID, "Merchant Identification") + "\n";
        strMsg = strMsg + "Developer Identification : " + FDK_Module.FDK_Output(iProcID, "Developer Identification") + "\n";
        strMsg = strMsg + "Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Transaction Date Time") + "\n";
        strMsg = strMsg + "Transaction Serial Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Serial Number") + "\n";
        strMsg = strMsg + "Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Receipt Print Flag") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "Installment Period : " + FDK_Module.FDK_Output(iProcID, "Installment Period") + "\n";
        strMsg = strMsg + "Currency Code : " + FDK_Module.FDK_Output(iProcID, "Currency Code") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "Service Amount : " + FDK_Module.FDK_Output(iProcID, "Service Amount") + "\n";
        strMsg = strMsg + "Tax Amount : " + FDK_Module.FDK_Output(iProcID, "Tax Amount") + "\n";
        strMsg = strMsg + "Original Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Number") + "\n";
        strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
        strMsg = strMsg + "Password Encrypt Key : " + FDK_Module.FDK_Output(iProcID, "Password Encrypt Key") + "\n";
        strMsg = strMsg + "Password Data : " + FDK_Module.FDK_Output(iProcID, "Password Data") + "\n";
        strMsg = strMsg + "Gas Station Vehicle Number : " + FDK_Module.FDK_Output(iProcID, "Gas Station Vehicle Number") + "\n";
        strMsg = strMsg + "Gas Station Oil Type Code : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Type Code") + "\n";
        strMsg = strMsg + "Gas Station Oil Price : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Price") + "\n";
        strMsg = strMsg + "Gas Station Oil Qty : " + FDK_Module.FDK_Output(iProcID, "Gas Station Oil Qty") + "\n";
        strMsg = strMsg + "User Data Code : " + FDK_Module.FDK_Output(iProcID, "User Data Code") + "\n";
        strMsg = strMsg + "User Data : " + FDK_Module.FDK_Output(iProcID, "User Data") + "\n";
        strMsg = strMsg + "Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Material") + "\n";
        strMsg = strMsg + "Dongle Card Method : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Method") + "\n";
        strMsg = strMsg + "Dongle Filler : " + FDK_Module.FDK_Output(iProcID, "Dongle Filler") + "\n";
        strMsg = strMsg + "Point Card Type : " + FDK_Module.FDK_Output(iProcID, "Point Card Type") + "\n";
        strMsg = strMsg + "Point Card Data : " + FDK_Module.FDK_Output(iProcID, "Point Card Data") + "\n";
        strMsg = strMsg + "Point Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Point Card Data Type") + "\n";
        strMsg = strMsg + "Point Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Point Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Point Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Point Dongle Card Material") + "\n";
        strMsg = strMsg + "Customer Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Customer Receipt Print Flag") + "\n";
        strMsg = strMsg + "Merchant Receipt Print Flag : " + FDK_Module.FDK_Output(iProcID, "Merchant Receipt Print Flag") + "\n";
        strMsg = strMsg + "Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Taxable Amount") + "\n";
        strMsg = strMsg + "Non-Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Non-Taxable Amount") + "\n";
        strMsg = strMsg + "Point Filler : " + FDK_Module.FDK_Output(iProcID, "Point Filler") + "\n";
        strMsg = strMsg + "Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Authorization Number") + "\n";
        strMsg = strMsg + "Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Authorization Date") + "\n";
        strMsg = strMsg + "Server Transaction Date Time : " + FDK_Module.FDK_Output(iProcID, "Server Transaction Date Time") + "\n";
        strMsg = strMsg + "Issuer Response Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Response Code") + "\n";
        strMsg = strMsg + "Merchant Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Number") + "\n";
        strMsg = strMsg + "DDC Flag : " + FDK_Module.FDK_Output(iProcID, "DDC Flag") + "\n";
        strMsg = strMsg + "DDC Receipt Number : " + FDK_Module.FDK_Output(iProcID, "DDC Receipt Number") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Card Name : " + FDK_Module.FDK_Output(iProcID, "Card Name") + "\n";
        strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
        strMsg = strMsg + "Issuer Name : " + FDK_Module.FDK_Output(iProcID, "Issuer Name") + "\n";
        strMsg = strMsg + "Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Acquirer Code") + "\n";
        strMsg = strMsg + "Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Acquirer Name") + "\n";
        strMsg = strMsg + "Card Balance : " + FDK_Module.FDK_Output(iProcID, "Card Balance") + "\n";
        strMsg = strMsg + "Discount Amount : " + FDK_Module.FDK_Output(iProcID, "Discount Amount") + "\n";
        strMsg = strMsg + "Notice : " + FDK_Module.FDK_Output(iProcID, "Notice") + "\n";
        strMsg = strMsg + "Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Unique Number") + "\n";
        strMsg = strMsg + "Remaining Count : " + FDK_Module.FDK_Output(iProcID, "Remaining Count") + "\n";
        strMsg = strMsg + "Issuer Identification Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Identification Code") + "\n";
        strMsg = strMsg + "Receipt Print : " + FDK_Module.FDK_Output(iProcID, "Receipt Print") + "\n";
        strMsg = strMsg + "Check Card Flag : " + FDK_Module.FDK_Output(iProcID, "Check Card Flag") + "\n";
        strMsg = strMsg + "NO CVM Amount : " + FDK_Module.FDK_Output(iProcID, "NO CVM Amount") + "\n";
        strMsg = strMsg + "Filler3 : " + FDK_Module.FDK_Output(iProcID, "Filler3") + "\n";
        strMsg = strMsg + "Point Response Code : " + FDK_Module.FDK_Output(iProcID, "Point Response Code") + "\n";
        strMsg = strMsg + "Point Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Point Issuer Code") + "\n";
        strMsg = strMsg + "Point Customer Name : " + FDK_Module.FDK_Output(iProcID, "Point Customer Name") + "\n";
        strMsg = strMsg + "Balance After Discount : " + FDK_Module.FDK_Output(iProcID, "Balance After Discount") + "\n";
        strMsg = strMsg + "Point Add : " + FDK_Module.FDK_Output(iProcID, "Point Add") + "\n";
        strMsg = strMsg + "Point Save : " + FDK_Module.FDK_Output(iProcID, "Point Save") + "\n";
        strMsg = strMsg + "Point Usable : " + FDK_Module.FDK_Output(iProcID, "Point Usable") + "\n";
        strMsg = strMsg + "Point Gas Station : " + FDK_Module.FDK_Output(iProcID, "Point Gas Station") + "\n";
        strMsg = strMsg + "Notification 1 : " + FDK_Module.FDK_Output(iProcID, "Notification 1") + "\n";
        strMsg = strMsg + "Notification 2 : " + FDK_Module.FDK_Output(iProcID, "Notification 2") + "\n";
        strMsg = strMsg + "Notification 3 : " + FDK_Module.FDK_Output(iProcID, "Notification 3") + "\n";
        strMsg = strMsg + "Notification 4 : " + FDK_Module.FDK_Output(iProcID, "Notification 4") + "\n";
        strMsg = strMsg + "Filler4 : " + FDK_Module.FDK_Output(iProcID, "Filler4") + "\n";
        strMsg = strMsg + "CR : " + FDK_Module.FDK_Output(iProcID, "CR") + "\n";
        alert(strMsg);
    }

    return iRet;
}


//UnLock - (개선스펙)
function UnLock_New_E16A() {
    var strMsg = "보안 리더기 Lock 해제 or 카드 배출 - (개선스펙)\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/UnLock_New_E16A");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Data Field1 Len : " + FDK_Module.FDK_Output(iProcID, "Data Field1 Len") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "FS40 : " + FDK_Module.FDK_Output(iProcID, "FS40") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "FS41 : " + FDK_Module.FDK_Output(iProcID, "FS41") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "FS42 : " + FDK_Module.FDK_Output(iProcID, "FS42") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "FS43 : " + FDK_Module.FDK_Output(iProcID, "FS43") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "FS44 : " + FDK_Module.FDK_Output(iProcID, "FS44") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "FS45 : " + FDK_Module.FDK_Output(iProcID, "FS45") + "\n";
        strMsg = strMsg + "SCR Info FW Build Date : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Build Date") + "\n";
        strMsg = strMsg + "FS46 : " + FDK_Module.FDK_Output(iProcID, "FS46") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}

//비동기 카드읽기(개선스펙) + 승인 (Polling방식)
function CreditAuthNew_NonBlock() {
    var iPID_NonBlock_Payment_Request_New_E12A = { value: 0 };

    if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
        return;

    txtStateCredit.value = "";

    if (0 < iPID_NonBlock_Payment_Request_New_E12A.value)
        FDK_Module.FDK_Destroy(iPID_NonBlock_Payment_Request_New_E12A.value);

    iPID_NonBlock_Payment_Request_New_E12A.value = FDK_Module.FDK_Creat();

    var iRet = 0;
    iRet = Payment_Request_New_E12A_Begin(
        "1", txtCATID.value, txtTransactionAmount.value,
        cmbUseDeviceIC.value.substring(0, 1), cmbUseDeviceMSR.value.substring(0, 1),
        cmbUseDeviceRF.value.substring(0, 1), ckbReturnCardEncodingData.checked,
        ckbReturnMerchantEncryptData.checked, ckbReturnFDKEncryptData.checked, ckbReturnFDKEMVData.checked,
        iPID_NonBlock_Payment_Request_New_E12A.value
    );

    switch (Number(iRet)) {
        case -8500: //nonblock 실행 성공
            btnCreditAuthNew_NonBlock.enabled = false;
            CreditAuthNew_NonBlockCall(iPID_NonBlock_Payment_Request_New_E12A);
            return;

        case -8501: //nonblock 실행 실패
            alert("NonBlock 실행 실패");
            break;

        default:
            alert("가능하지 않은 오류");
            break;
    }

    FDK_Module.FDK_Destroy(iPID_NonBlock_Payment_Request_New_E12A.value);

    iPID_NonBlock_Payment_Request_New_E12A.value = 0;
    btnCreditAuthNew_NonBlock.enabled = true;
}

var nTimer = 0;

function CreditAuthNew_NonBlockCall(iPID_NonBlock_Payment_Request_New_E12A) {
    var iRet = Number(FDK_Module.FDK_Output(iPID_NonBlock_Payment_Request_New_E12A.value, "FDK_Execute_Result"));

    if (-3999 == iRet) {
        if (1 > txtStateCredit.value.length)
            txtStateCredit.value = "100";
        else {
            txtStateCredit.value = String(Number(txtStateCredit.value) + 100);
        }

        nTimer = setInterval(CreditAuthNew_NonBlockCall(iPID_NonBlock_Payment_Request_New_E12A), 100);
        return;
    }

    clearInterval(nTimer);

    var strCardDataType = { value: "" };
    var bICCard = { value: false };
    var bFallBack = { value: false };

    if (0 != Payment_Request_New_E12A_End(iPID_NonBlock_Payment_Request_New_E12A.value,
        bICCard, strCardDataType, bFallBack)) {
        FDK_Module.FDK_Destroy(iPID_NonBlock_Payment_Request_New_E12A.value);
        iPID_NonBlock_Payment_Request_New_E12A.value = 0;
        btnCreditAuthNew_NonBlock.enabled = true;
        return;
    }

    var strAuthorizationNumber = { value: "" };
    var strAuthorizationDate = { value: "" };
    var iPID_A5Auth = { value: 0 };

    if ((strCardDataType.value == "C") ||//입력방식 IC
        (strCardDataType.value == "S" && true == bICCard.value && true == bFallBack.value))//입력방식 MSR + IC카드번호 + FB값
    {
        txtStateCredit.value = "IC 승인전문";
        if (0 != CreditICA5Auth(txtCATID.value, txtTransactionAmount.value, iPID_NonBlock_Payment_Request_New_E12A.value, "", "",
            iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate)) {
            FDK_Module.FDK_Destroy(iPID_NonBlock_Payment_Request_New_E12A.value);
            iPID_NonBlock_Payment_Request_New_E12A.value = 0;
            btnCreditAuthNew_NonBlock.enabled = true;
            FDK_Module.FDK_Destroy(iPID_A5Auth);
            return;
        }
        //2017년 부터 IC 카드 후처리에서 오류 발생해도 무시.
        if (strCardDataType.value == "C")
            Payment_ResultIC_New_E13A("1", txtCATID.value, iPID_A5Auth.value);
    }
    else if (strCardDataType.value == "R" ||//입력방식 RF
        (strCardDataType.value == "S" && false == bICCard.value))//입력방식 MSR + IC카드번호
    {
        txtStateCredit.value = "MSR 승인전문";
        if (0 != CreditA5Auth(txtCATID.value, txtTransactionAmount.value, iPID_NonBlock_Payment_Request_New_E12A.value, iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate)) {
            FDK_Module.FDK_Destroy(iPID_NonBlock_Payment_Request_New_E12A.value);
            iPID_NonBlock_Payment_Request_New_E12A.value = 0;
            btnCreditAuthNew_NonBlock.Enabled = true;
            FDK_Module.FDK_Destroy(iPID_A5Auth.value);
            return;
        }
    }
    else {
        FDK_Destroy(iPID_NonBlock_Payment_Request_New_E12A.value);
        iPID_NonBlock_Payment_Request_New_E12A.value = 0;
        btnCreditAuthNew_NonBlock.enabled = true;
        FDK_Module.FDK_Destroy(iPID_A5Auth);
        alert("오류 : IC 입력을 진행해 주십시오.");
        return;
    }

    FDK_Module.FDK_Destroy(iPID_NonBlock_Payment_Request_New_E12A.value);
    iPID_NonBlock_Payment_Request_New_E12A.value = 0;
    btnCreditAuthNew_NonBlock.enabled = true;
    FDK_Module.FDK_Destroy(iPID_A5Auth.value);

    txtAuthorizationNumber.value = strAuthorizationNumber.value;
    txtAuthorizationDate.value = strAuthorizationDate.value;

    alert("승인 완료");
}


function Payment_Request_New_E12A_Begin(strAuthType, strCATID, strTransactionAmount,
    strUseIC, strUseMSR, strUseRF, bRetEncoding, bRetMerEncData, bRetFDKEncData,
    bRetFDKEMVData, iPID_Payment_Request_New_E12A) {
    var iRet = 0;
    var iProcID = iPID_Payment_Request_New_E12A;

    FDK_Module.FDK_Input(iProcID, "Time Out", "3c");//16진수
    FDK_Module.FDK_Input(iProcID, "Display", "메시지 표시 지원장비에서 사용");
    FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthType);
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Use Device IC", strUseIC);
    FDK_Module.FDK_Input(iProcID, "Use Device MSR", strUseMSR);
    FDK_Module.FDK_Input(iProcID, "Use Device RF", strUseRF);
    FDK_Module.FDK_Input(iProcID, "Return Card Encoding Data", true == bRetEncoding ? "1" : "0");
    FDK_Module.FDK_Input(iProcID, "Return Merchant Encrypt Data", true == bRetMerEncData ? "1" : "0");
    FDK_Module.FDK_Input(iProcID, "Return FDK Encrypt Data", true == bRetFDKEncData ? "1" : "0");
    FDK_Module.FDK_Input(iProcID, "Return FDK EMV Data", true == bRetFDKEMVData ? "1" : "0");
    FDK_Module.FDK_Input(iProcID, "@/Common/ExecuteNonblock", "true");//nonblock 형태로 실행하는 옵션

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Payment_Request_New_E12A");

    return iRet;
}


function Payment_Request_New_E12A_End(iPID_Payment_Request_New_E12A, bICCard, strCardDataType, bFallBack) {
    var strMsg = "보안 리더기 카드읽기 - (개선스펙)\n";

    var iProcID = iPID_Payment_Request_New_E12A;
    var iRet = Number(FDK_Module.FDK_Output(iProcID, "FDK_Execute_Result"));

    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        var strCardData = FDK_Module.FDK_Output(iProcID, "Card Data");//카드번호
        strCardDataType.value = FDK_Module.FDK_Output(iProcID, "Card Data Type");//입력방식 S(msr), C(ic), R(rf)
        var strFBCode = FDK_Module.FDK_Output(iProcID, "IC Fallback Reason Code");//fallback 데이터 인가? (space or 00 아니면 fb)
        strFBCode = strFBCode.replace(/(^\s*)|(\s*$)/gi, "");	//trim

        if (0 < strFBCode.length && 0 != Number(strFBCode))
            bFallBack = true;
        else
            bFallBack = false;

        var iEqualIndex = strCardData.indexOf("=");
        if (0 < iEqualIndex && iEqualIndex + 5 + 1 <= strCardData.length) {
            var iServiceCode = Number(strCardData.substring(iEqualIndex + 5, iEqualIndex + 6));

            if (2 == iServiceCode || 6 == iServiceCode)
                bICCard = true;
        }
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    return iRet;
}


//승인 - (개선스펙)
function CreditAuthNew() {
    var iPID_Payment_Request_New_E12A = { value: 0 };
    var bICCard = { value: false };
    var bFallBack = { value: false };
    var strCardDataType = { value: "" };

    if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
        return;

    txtStateCredit.value = "";

    if (0 != Payment_Request_New_E12A("1", txtCATID.value, txtTransactionAmount.value,
        cmbUseDeviceIC.value.substring(0, 1), cmbUseDeviceMSR.value.substring(0, 1),
        cmbUseDeviceRF.value.substring(0, 1), ckbReturnCardEncodingData.checked,
        ckbReturnMerchantEncryptData.checked, ckbReturnFDKEncryptData.checked, ckbReturnFDKEMVData.checked,
        iPID_Payment_Request_New_E12A, bICCard, strCardDataType, bFallBack)) {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
        return;
    }

    var strAuthorizationNumber = { value: "" };
    var strAuthorizationDate = { value: "" };
    var iPID_A5Auth = { value: 0 };

    if (strCardDataType.value == "C" ||//입력방식 IC
        (strCardDataType.value == "S" && true == bICCard.value && true == bFallBack.value))//입력방식 MSR + IC카드번호 + FB값
    {
        txtStateCredit.value = "IC 승인전문";
        if (0 != CreditICA5Auth(txtCATID.value, txtTransactionAmount.value, iPID_Payment_Request_New_E12A.value, "", "",
            iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate)) {
            FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
            FDK_Module.FDK_Destroy(iPID_A5Auth.value);
            return;
        }
        //2017년 부터 IC 카드 후처리에서 오류 발생해도 무시.
        if (strCardDataType.value == "C")
            Payment_ResultIC_New_E13A("1", txtCATID.value, iPID_A5Auth.value);
    }
    else if (strCardDataType.value == "R" ||//입력방식 RF
        (strCardDataType.value == "S" && false == bICCard.value))//입력방식 MSR + IC카드번호
    {
        txtStateCredit.value = "MSR 승인전문";
        if (0 != CreditA5Auth(txtCATID.value, txtTransactionAmount.value, iPID_Payment_Request_New_E12A.value, iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate)) {
            FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
            FDK_Module.FDK_Destroy(iPID_A5Auth.value);
            return;
        }
    }
    else {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
        FDK_Module.FDK_Destroy(iPID_A5Auth.value);

        alert("오류 : IC 입력을 진행해 주십시오.");
        return;
    }

    FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
    FDK_Module.FDK_Destroy(iPID_A5Auth.value);

    txtAuthorizationNumber.value = strAuthorizationNumber.value;
    txtAuthorizationDate.value = strAuthorizationDate.value;

    alert("승인 완료");
}


function Payment_Request_New_E12A(strAuthType, strCATID, strTransactionAmount,
    strUseIC, strUseMSR, strUseRF, bRetEncoding, bRetMerEncData, bRetFDKEncData, bRetFDKEMVData,
    iPID_Payment_Request_New_E12A, bICCard, strCardDataType, bFallBack) {
    var strMsg = "보안 리더기 카드읽기 - (개선스펙)\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_Payment_Request_New_E12A.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "Time Out", "3c");//16진수
    FDK_Module.FDK_Input(iProcID, "Display", "메시지 표시 지원장비에서 사용");
    FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthType);
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Use Device IC", strUseIC);
    FDK_Module.FDK_Input(iProcID, "Use Device MSR", strUseMSR);
    FDK_Module.FDK_Input(iProcID, "Use Device RF", strUseRF);
    FDK_Module.FDK_Input(iProcID, "Return Card Encoding Data", true == bRetEncoding ? "1" : "0");
    FDK_Module.FDK_Input(iProcID, "Return Merchant Encrypt Data", true == bRetMerEncData ? "1" : "0");
    FDK_Module.FDK_Input(iProcID, "Return FDK Encrypt Data", true == bRetFDKEncData ? "1" : "0");
    FDK_Module.FDK_Input(iProcID, "Return FDK EMV Data", true == bRetFDKEMVData ? "1" : "0");

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Payment_Request_New_E12A");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");

        var strCardData = FDK_Module.FDK_Output(iProcID, "Card Data");//카드번호
        strCardDataType.value = FDK_Module.FDK_Output(iProcID, "Card Data Type");//입력방식 S(msr), C(ic), R(rf)
        var strFBCode = FDK_Module.FDK_Output(iProcID, "IC Fallback Reason Code");//fallback 데이터 인가? (space or 00 아니면 fb)
        strFBCode = strFBCode.replace(/(^\s*)|(\s*$)/gi, "");	//trim

        if (0 < strFBCode.length && 0 != Number(strFBCode))
            bFallBack.value = true;
        else
            bFallBack.value = false;

        var iEqualIndex = strCardData.indexOf("=");
        if (0 < iEqualIndex && iEqualIndex + 5 + 1 <= strCardData.length) {
            var iServiceCode = Number(strCardData.substring(iEqualIndex + 5, iEqualIndex + 6));
            if (2 == iServiceCode || 6 == iServiceCode)
                bICCard.value = true;
        }
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Data Field1 Len : " + FDK_Module.FDK_Output(iProcID, "Data Field1 Len") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "Encoding Card Number : " + FDK_Module.FDK_Output(iProcID, "Encoding Card Number") + "\n";
        strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\n";
        strMsg = strMsg + "Merchant Encrypt Data : " + FDK_Module.FDK_Output(iProcID, "Merchant Encrypt Data") + "\n";
        strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\n";
        strMsg = strMsg + "Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Encryption Method Code") + "\n";
        strMsg = strMsg + "FS8 : " + FDK_Module.FDK_Output(iProcID, "FS8") + "\n";
        strMsg = strMsg + "Encryption Public Key Version : " + FDK_Module.FDK_Output(iProcID, "Encryption Public Key Version") + "\n";
        strMsg = strMsg + "FS9 : " + FDK_Module.FDK_Output(iProcID, "FS9") + "\n";
        strMsg = strMsg + "FDK Encrypt KSN : " + FDK_Module.FDK_Output(iProcID, "FDK Encrypt KSN") + "\n";
        strMsg = strMsg + "FS10 : " + FDK_Module.FDK_Output(iProcID, "FS10") + "\n";
        strMsg = strMsg + "FDK Encrypt Data : " + FDK_Module.FDK_Output(iProcID, "FDK Encrypt Data") + "\n";
        strMsg = strMsg + "FS11 : " + FDK_Module.FDK_Output(iProcID, "FS11") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "FS12 : " + FDK_Module.FDK_Output(iProcID, "FS12") + "\n";
        strMsg = strMsg + "Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Material") + "\n";
        strMsg = strMsg + "Dongle Card Method : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Method") + "\n";
        strMsg = strMsg + "FS13 : " + FDK_Module.FDK_Output(iProcID, "FS13") + "\n";
        strMsg = strMsg + "IC Fallback Reason Code : " + FDK_Module.FDK_Output(iProcID, "IC Fallback Reason Code") + "\n";
        strMsg = strMsg + "FS14 : " + FDK_Module.FDK_Output(iProcID, "FS14") + "\n";
        strMsg = strMsg + "FDK EMV Data Field1 Len : " + FDK_Module.FDK_Output(iProcID, "FDK EMV Data Field1 Len") + "\n";
        strMsg = strMsg + "FS15 : " + FDK_Module.FDK_Output(iProcID, "FS15") + "\n";
        strMsg = strMsg + "IC Data Version : " + FDK_Module.FDK_Output(iProcID, "IC Data Version") + "\n";
        strMsg = strMsg + "IC CHIP Brand : " + FDK_Module.FDK_Output(iProcID, "IC CHIP Brand") + "\n";
        strMsg = strMsg + "IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "IC Transaction Unique Number") + "\n";
        strMsg = strMsg + "IC API : " + FDK_Module.FDK_Output(iProcID, "IC API") + "\n";
        strMsg = strMsg + "FDK EMV TLV Data Len : " + FDK_Module.FDK_Output(iProcID, "FDK EMV TLV Data Len") + "\n";
        strMsg = strMsg + "FDK EMV TLV Data : " + FDK_Module.FDK_Output(iProcID, "FDK EMV TLV Data") + "\n";
        strMsg = strMsg + "FS16 : " + FDK_Module.FDK_Output(iProcID, "FS16") + "\n";
        strMsg = strMsg + "IC ISR : " + FDK_Module.FDK_Output(iProcID, "IC ISR") + "\n";
        strMsg = strMsg + "FS17 : " + FDK_Module.FDK_Output(iProcID, "FS17") + "\n";
        strMsg = strMsg + "FS18 : " + FDK_Module.FDK_Output(iProcID, "FS18") + "\n";
        strMsg = strMsg + "CVM : " + FDK_Module.FDK_Output(iProcID, "CVM") + "\n";
        strMsg = strMsg + "FS19 : " + FDK_Module.FDK_Output(iProcID, "FS19") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "FS40 : " + FDK_Module.FDK_Output(iProcID, "FS40") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "FS41 : " + FDK_Module.FDK_Output(iProcID, "FS41") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "FS42 : " + FDK_Module.FDK_Output(iProcID, "FS42") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "FS43 : " + FDK_Module.FDK_Output(iProcID, "FS43") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "FS44 : " + FDK_Module.FDK_Output(iProcID, "FS44") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "FS45 : " + FDK_Module.FDK_Output(iProcID, "FS45") + "\n";
        strMsg = strMsg + "SCR Info FW Build Date : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Build Date") + "\n";
        strMsg = strMsg + "FS46 : " + FDK_Module.FDK_Output(iProcID, "FS46") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";

        alert(strMsg);
    }

    return iRet;
}


function Payment_ResultIC_New_E13A(strAuthorizationType, strCATID, iPID_A5Auth) {
    var strMsg = "보안 리더기 IC카드 Second Generation - (개선스펙).\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthorizationType);
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_A5Auth);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Payment_ResultIC_New_E13A");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Sequence Number : " + FDK_Module.FDK_Output(iProcID, "Sequence Number") + "\n";
        strMsg = strMsg + "Sender Index : " + FDK_Module.FDK_Output(iProcID, "Sender Index") + "\n";
        strMsg = strMsg + "Receiver Index : " + FDK_Module.FDK_Output(iProcID, "Receiver Index") + "\n";
        strMsg = strMsg + "INS : " + FDK_Module.FDK_Output(iProcID, "INS") + "\n";
        strMsg = strMsg + "Data length : " + FDK_Module.FDK_Output(iProcID, "Data length") + "\n";
        strMsg = strMsg + "SUB ID : " + FDK_Module.FDK_Output(iProcID, "SUB ID") + "\n";
        strMsg = strMsg + "Data Field1 Len : " + FDK_Module.FDK_Output(iProcID, "Data Field1 Len") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Authorization Type : " + FDK_Module.FDK_Output(iProcID, "Authorization Type") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "Net Cancel Flag : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Flag") + "\n";
        strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\n";
        strMsg = strMsg + "IC TVR : " + FDK_Module.FDK_Output(iProcID, "IC TVR") + "\n";
        strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\n";
        strMsg = strMsg + "IC AC : " + FDK_Module.FDK_Output(iProcID, "IC AC") + "\n";
        strMsg = strMsg + "FS8 : " + FDK_Module.FDK_Output(iProcID, "FS8") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "FS40 : " + FDK_Module.FDK_Output(iProcID, "FS40") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "FS41 : " + FDK_Module.FDK_Output(iProcID, "FS41") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "FS42 : " + FDK_Module.FDK_Output(iProcID, "FS42") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "FS43 : " + FDK_Module.FDK_Output(iProcID, "FS43") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "FS44 : " + FDK_Module.FDK_Output(iProcID, "FS44") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "FS45 : " + FDK_Module.FDK_Output(iProcID, "FS45") + "\n";
        strMsg = strMsg + "SCR Info FW Build Date : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Build Date") + "\n";
        strMsg = strMsg + "FS46 : " + FDK_Module.FDK_Output(iProcID, "FS46") + "\n";
        strMsg = strMsg + "CRC : " + FDK_Module.FDK_Output(iProcID, "CRC") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}


//승인취소 - (개선스펙)
function CreditCancelNew() {
    if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
        return;

    txtStateCredit.value = "";

    var iPID_Payment_Request_New_E12A = { value: 0 };
    var strCardDataType = { value: "" };
    var bICCard = { value: false };
    var bFallBack = { value: false };

    if (0 != Payment_Request_New_E12A("2", txtCATID.value, txtTransactionAmount.value,
        cmbUseDeviceIC.value.substring(0, 1), cmbUseDeviceMSR.value.substring(0, 1),
        cmbUseDeviceRF.value.substring(0, 1), ckbReturnCardEncodingData.checked,
        ckbReturnMerchantEncryptData.checked, ckbReturnFDKEncryptData.checked, ckbReturnFDKEMVData.checked,
        iPID_Payment_Request_New_E12A, bICCard, strCardDataType, bFallBack)) {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
        return;
    }

    var iPID_A5Cancel = { value: 0 };

    if (strCardDataType.value == "C" ||//입력방식 IC
        (strCardDataType.value == "S" && true == bICCard.value && true == bFallBack.value))//입력방식 MSR + IC카드번호 + FB값
    {
        txtStateCredit.value = "IC 승인취소전문";
        if (0 != CreditICA5Cancel(txtCATID.value, txtTransactionAmount.value, txtAuthorizationNumber.value, txtAuthorizationDate.value, "", "", iPID_Payment_Request_New_E12A.value, iPID_A5Cancel)) {
            FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
            FDK_Module.FDK_Destroy(iPID_A5Cancel.value);
            return;
        }
        ////2017년 부터 IC 카드 후처리에서 오류 발생해도 무시.
        //if (true == strCardDataType.Equals("C"))
        //    Payment_ResultIC_New_E13A("2", txtCATID.value, iPID_A5Cancel);
    }
    else if (strCardDataType.value == "R" ||//입력방식 RF
        (strCardDataType.value == "S" && false == bICCard.value))//입력방식 MSR + IC카드번호
    {
        txtStateCredit.value = "MSR 승인취소전문";
        if (0 != CreditA5Cancel(txtCATID.value, txtTransactionAmount.value, txtAuthorizationNumber.value, txtAuthorizationDate.value)) {
            FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
            FDK_Module.FDK_Destroy(iPID_A5Cancel.value);
            return;
        }
    }
    else {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
        FDK_Module.FDK_Destroy(iPID_A5Cancel.value);
        alert("오류 : IC 입력을 진행해 주십시오.");
        return;
    }

    FDK_Module.FDK_Destroy(iPID_Payment_Request_New_E12A.value);
    FDK_Module.FDK_Destroy(iPID_A5Cancel.value);

    alert("승인 취소 완료");
}


//현금IC 잔액 조회 - (개선스펙)
function CashICBalanceInquiryNew() {
    const strCardNum = "1234567890123456";
    var strPINWorkingKey = { value: "" };
    var strAccountCount = { value: "" };

    if (0 != SCRCashIC_Read_New_E21A(strPINWorkingKey, strAccountCount)) {
        return;
    }

    var iAccountCount = Number(strAccountCount.value);
    var strCardSerialNumber = { value: "" };
    var strIssuerInstitutionCode = { value: "" };
    var strEncryptionInfo = { value: "" };
    var strCardData = { value: "" };
    var strPINBlock = { value: "" };

    if (2 > iAccountCount) {
        var strPinNo = prompt("계좌 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock)) {
            return;
        }

        if (0 != SCRCashIC_GetData_New_E23A("00", "0", strPINBlock.value, strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData)) {
            return;
        }
    }
    else {
        var strPinNo = prompt("카드 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock)) {
            return;
        }

        var arrAccount = { value: [] };

        if (0 != SCRCashIC_ExtractMultipleAccounts_New_E22A(strPINBlock.value, arrAccount)) {
            return;
        }

        var str = "조회할 계좌번호 순번을 입력하세요.\n";
        for (var i = 0; i < arrAccount.value.length; i++)
            str += "[" + Number(i + 1) + "] " + arrAccount.value[i] + "  ";

        var Index = prompt(str, "");

        var strPinNo = prompt("계좌 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock.value)) {
            return;
        }

        if (0 != SCRCashIC_GetData_New_E23A(String(Index - 1), "0", strPINBlock.value,
            strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData)) {
            return;
        }
    }

    if (0 != CashICA5BalanceInquiry(txtCATID.value, strCardData.value, "C", strIssuerInstitutionCode.value, strEncryptionInfo.value, strCardSerialNumber.value, "00")) {
        return;
    }

    alert("현금IC 잔액 조회 정상 완료");
}


function SCRCashIC_ExtractMultipleAccounts_New_E22A(strPINBlock, arrAccount) {
    var strMsg = "보안 리더기 - 현금IC 카드 - 복수 계좌 얻기 - (개선스펙).\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "PIN Block", strPINBlock);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/CashIC_ExtractMultipleAccounts_New_E22A");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");

        var strAccountList = FDK_Module.FDK_Output(iProcID, "Account List");
        var astrAccountList = strAccountList.split('|');

        for (var i = 1; i < astrAccountList.length - 1; i++) {
            arrAccount.value.push(astrAccountList[i]);
        }
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "PIN Retry Remnant Count : " + FDK_Module.FDK_Output(iProcID, "PIN Retry Remnant Count") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Account List : " + FDK_Module.FDK_Output(iProcID, "Account List") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "FS40 : " + FDK_Module.FDK_Output(iProcID, "FS40") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "FS41 : " + FDK_Module.FDK_Output(iProcID, "FS41") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "FS42 : " + FDK_Module.FDK_Output(iProcID, "FS42") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "FS43 : " + FDK_Module.FDK_Output(iProcID, "FS43") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "FS44 : " + FDK_Module.FDK_Output(iProcID, "FS44") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "FS45 : " + FDK_Module.FDK_Output(iProcID, "FS45") + "\n";
        strMsg = strMsg + "SCR Info FW Build Date : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Build Date") + "\n";
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}


function Util_PIN_Encrypt(strPIN, strCardData, strKeyIndex, strTPKData, strPINBlock) {
    g_strPINBlock = "";

    var strMsg = "PIN 암호화\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "PIN", strPIN);
    FDK_Module.FDK_Input(iProcID, "Card Data", strCardData);
    FDK_Module.FDK_Input(iProcID, "KEY Index", strKeyIndex);
    FDK_Module.FDK_Input(iProcID, "TPK Data", strTPKData);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/Util/PIN_Encrypt");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strPINBlock.value = FDK_Module.FDK_Output(iProcID, "PIN Block");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}


function CashICA5BalanceInquiry(strCATID, strCardData, strCardDataType, strIssuerCode, strEncryptionInfo, strCardSerialNumber, strTransactionType) {
    var strMsg = "A5 스펙: 현금 IC 잔액 조회\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Card Data", strCardData);
    FDK_Module.FDK_Input(iProcID, "Card Data Type", strCardDataType);
    FDK_Module.FDK_Input(iProcID, "Issuer Code", strIssuerCode);
    FDK_Module.FDK_Input(iProcID, "Encryption Info", strEncryptionInfo);
    FDK_Module.FDK_Input(iProcID, "Card Serial Number", strCardSerialNumber);
    FDK_Module.FDK_Input(iProcID, "Transaction Type", strTransactionType);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/CashIC/A5BalanceInquiry");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "Service Amount : " + FDK_Module.FDK_Output(iProcID, "Service Amount") + "\n";
        strMsg = strMsg + "Tax Amount : " + FDK_Module.FDK_Output(iProcID, "Tax Amount") + "\n";
        strMsg = strMsg + "Encryption Info : " + FDK_Module.FDK_Output(iProcID, "Encryption Info") + "\n";
        strMsg = strMsg + "Card Serial Number : " + FDK_Module.FDK_Output(iProcID, "Card Serial Number") + "\n";
        strMsg = strMsg + "Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Transaction Type") + "\n";
        strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
        strMsg = strMsg + "Original IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Original IC Transaction Unique Number") + "\n";
        strMsg = strMsg + "Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Taxable Amount") + "\n";
        strMsg = strMsg + "Non-Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Non-Taxable Amount") + "\n";
        strMsg = strMsg + "Filler3 : " + FDK_Module.FDK_Output(iProcID, "Filler3") + "\n";
        strMsg = strMsg + "Merchant Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Code") + "\n";
        strMsg = strMsg + "Merchant Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Name") + "\n";
        strMsg = strMsg + "Merchant Acquirer Branch Code : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Branch Code") + "\n";
        strMsg = strMsg + "IC Issuer Code : " + FDK_Module.FDK_Output(iProcID, "IC Issuer Code") + "\n";
        strMsg = strMsg + "IC Issuer Name : " + FDK_Module.FDK_Output(iProcID, "IC Issuer Name") + "\n";
        strMsg = strMsg + "IC Balance : " + FDK_Module.FDK_Output(iProcID, "IC Balance") + "\n";
        strMsg = strMsg + "IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "IC Transaction Unique Number") + "\n";
        strMsg = strMsg + "IC Authorization Date : " + FDK_Module.FDK_Output(iProcID, "IC Authorization Date") + "\n";
        strMsg = strMsg + "Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Unique Number") + "\n";
        strMsg = strMsg + "IC Merchant Control Number : " + FDK_Module.FDK_Output(iProcID, "IC Merchant Control Number") + "\n";
        strMsg = strMsg + "Fee Rate : " + FDK_Module.FDK_Output(iProcID, "Fee Rate") + "\n";
        strMsg = strMsg + "Merchant Fee : " + FDK_Module.FDK_Output(iProcID, "Merchant Fee") + "\n";
        strMsg = strMsg + "Issuer Fee : " + FDK_Module.FDK_Output(iProcID, "Issuer Fee") + "\n";
        strMsg = strMsg + "Acquirer Fee : " + FDK_Module.FDK_Output(iProcID, "Acquirer Fee") + "\n";
        strMsg = strMsg + "Withdrawal Account Number : " + FDK_Module.FDK_Output(iProcID, "Withdrawal Account Number") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Notification 1 : " + FDK_Module.FDK_Output(iProcID, "Notification 1") + "\n";
        strMsg = strMsg + "Notification 2 : " + FDK_Module.FDK_Output(iProcID, "Notification 2") + "\n";
        strMsg = strMsg + "Notification 3 : " + FDK_Module.FDK_Output(iProcID, "Notification 3") + "\n";
        strMsg = strMsg + "Notification 4 : " + FDK_Module.FDK_Output(iProcID, "Notification 4") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}


//현금IC 승인 - (개선스펙)
function CashICAuthNew() {
    var strCardNum = "1234567890123456";
    var strPINWorkingKey = { value: "" };
    var strAccountCount = { value: "" };

    if (0 != SCRCashIC_Read_New_E21A(strPINWorkingKey, strAccountCount)) {
        return;
    }

    var iAccountCount = Number(strAccountCount.value);
    var strCardSerialNumber = { value: "" };
    var strIssuerInstitutionCode = { value: "" };
    var strEncryptionInfo = { value: "" };
    var strCardData = { value: "" };
    var strPINBlock = { value: "" };

    if (2 > iAccountCount) {
        var strPinNo = prompt("계좌 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock)) {
            return;
        }

        if (0 != SCRCashIC_GetData_New_E23A("00", "0", strPINBlock.value, strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData)) {
            return;
        }
    }
    else {
        var strPinNo = prompt("카드 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock)) {
            return;
        }

        var arrAccount = { value: [] };

        if (0 != SCRCashIC_ExtractMultipleAccounts_New_E22A(strPINBlock.value, arrAccount)) {
            return;
        }

        var str = "조회할 계좌번호 순번을 입력하세요.\n";
        for (var i = 0; i < arrAccount.value.length; i++)
            str += "[" + Number(i + 1) + "] " + arrAccount.value[i] + "  ";

        var Index = prompt(str, "");

        var strPinNo = prompt("계좌 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock.value)) {
            return;
        }

        if (0 != SCRCashIC_GetData_New_E23A(String(Index - 1), "0", strPINBlock.value,
            strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData)) {
            return;
        }
    }

    var strICTransactionUniqueNumber = { value: "" };
    var strICAuthorizationDate = { value: "" };

    if (0 != CashICA5Purchase(txtCATID.value, strCardData.value, "C", strIssuerInstitutionCode.value,
        txtTransactionAmount.value, strEncryptionInfo.value, strCardSerialNumber.value, "00", strICTransactionUniqueNumber, strICAuthorizationDate)) {
        return;
    }

    txtAuthorizationNumber.value = strICTransactionUniqueNumber.value;
    if (8 < strICAuthorizationDate.value.length)
        txtAuthorizationDate.value = strICAuthorizationDate.value.substring(0, 8);

    alert("현금IC 승인 정상 완료");
}


function CashICA5Purchase(strCATID, strCardData, strCardDataType, strIssuerCode, strTransactionAmount, strEncryptionInfo,
    strCardSerialNumber, strTransactionType, strICTransactionUniqueNumber, strICAuthorizationDate) {
    var strMsg = "A5 스펙: 현금 IC 구매 거래\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Card Data", strCardData);
    FDK_Module.FDK_Input(iProcID, "Card Data Type", strCardDataType);
    FDK_Module.FDK_Input(iProcID, "Issuer Code", strIssuerCode);
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Encryption Info", strEncryptionInfo);
    FDK_Module.FDK_Input(iProcID, "Card Serial Number", strCardSerialNumber);
    FDK_Module.FDK_Input(iProcID, "Transaction Type", strTransactionType);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/CashIC/A5Purchase");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strICTransactionUniqueNumber.value = FDK_Module.FDK_Output(iProcID, "IC Transaction Unique Number");
        strICAuthorizationDate.value = FDK_Module.FDK_Output(iProcID, "IC Authorization Date");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Module Version : " + FDK_Module.FDK_Output(iProcID, "Module Version") + "\n";
        strMsg = strMsg + "Mac Address : " + FDK_Module.FDK_Output(iProcID, "Mac Address") + "\n";
        strMsg = strMsg + "Net Cancel Reason CODE : " + FDK_Module.FDK_Output(iProcID, "Net Cancel Reason CODE") + "\n";
        strMsg = strMsg + "A5Common Filler : " + FDK_Module.FDK_Output(iProcID, "A5Common Filler") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "Service Amount : " + FDK_Module.FDK_Output(iProcID, "Service Amount") + "\n";
        strMsg = strMsg + "Tax Amount : " + FDK_Module.FDK_Output(iProcID, "Tax Amount") + "\n";
        strMsg = strMsg + "Encryption Info : " + FDK_Module.FDK_Output(iProcID, "Encryption Info") + "\n";
        strMsg = strMsg + "Card Serial Number : " + FDK_Module.FDK_Output(iProcID, "Card Serial Number") + "\n";
        strMsg = strMsg + "Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Transaction Type") + "\n";
        strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
        strMsg = strMsg + "Original IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Original IC Transaction Unique Number") + "\n";
        strMsg = strMsg + "Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Taxable Amount") + "\n";
        strMsg = strMsg + "Non-Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Non-Taxable Amount") + "\n";
        strMsg = strMsg + "Filler3 : " + FDK_Module.FDK_Output(iProcID, "Filler3") + "\n";
        strMsg = strMsg + "Merchant Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Code") + "\n";
        strMsg = strMsg + "Merchant Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Name") + "\n";
        strMsg = strMsg + "Merchant Acquirer Branch Code : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Branch Code") + "\n";
        strMsg = strMsg + "IC Issuer Code : " + FDK_Module.FDK_Output(iProcID, "IC Issuer Code") + "\n";
        strMsg = strMsg + "IC Issuer Name : " + FDK_Module.FDK_Output(iProcID, "IC Issuer Name") + "\n";
        strMsg = strMsg + "IC Balance : " + FDK_Module.FDK_Output(iProcID, "IC Balance") + "\n";
        strMsg = strMsg + "IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "IC Transaction Unique Number") + "\n";
        strMsg = strMsg + "IC Authorization Date : " + FDK_Module.FDK_Output(iProcID, "IC Authorization Date") + "\n";
        strMsg = strMsg + "Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Unique Number") + "\n";
        strMsg = strMsg + "IC Merchant Control Number : " + FDK_Module.FDK_Output(iProcID, "IC Merchant Control Number") + "\n";
        strMsg = strMsg + "Fee Rate : " + FDK_Module.FDK_Output(iProcID, "Fee Rate") + "\n";
        strMsg = strMsg + "Merchant Fee : " + FDK_Module.FDK_Output(iProcID, "Merchant Fee") + "\n";
        strMsg = strMsg + "Issuer Fee : " + FDK_Module.FDK_Output(iProcID, "Issuer Fee") + "\n";
        strMsg = strMsg + "Acquirer Fee : " + FDK_Module.FDK_Output(iProcID, "Acquirer Fee") + "\n";
        strMsg = strMsg + "Withdrawal Account Number : " + FDK_Module.FDK_Output(iProcID, "Withdrawal Account Number") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Notification 1 : " + FDK_Module.FDK_Output(iProcID, "Notification 1") + "\n";
        strMsg = strMsg + "Notification 2 : " + FDK_Module.FDK_Output(iProcID, "Notification 2") + "\n";
        strMsg = strMsg + "Notification 3 : " + FDK_Module.FDK_Output(iProcID, "Notification 3") + "\n";
        strMsg = strMsg + "Notification 4 : " + FDK_Module.FDK_Output(iProcID, "Notification 4") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}


//현금IC 승인취소 - (개선스펙)
function CashICCancelNew() {
    var strCardNum = "1234567890123456";
    var strPINWorkingKey = { value: "" };
    var strAccountCount = { value: "" };

    if (0 != SCRCashIC_Read_New_E21A(strPINWorkingKey, strAccountCount)) {
        return;
    }

    var iAccountCount = Number(strAccountCount.value);
    var strCardSerialNumber = { value: "" };
    var strIssuerInstitutionCode = { value: "" };
    var strEncryptionInfo = { value: "" };
    var strCardData = { value: "" };
    var strPINBlock = { value: "" };

    if (2 > iAccountCount) {
        var strPinNo = prompt("계좌 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock)) {
            return;
        }

        if (0 != SCRCashIC_GetData_New_E23A("00", "0", strPINBlock.value, strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData)) {
            return;
        }
    }
    else {
        var strPinNo = prompt("카드 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock)) {
            return;
        }

        var arrAccount = { value: [] };

        if (0 != SCRCashIC_ExtractMultipleAccounts_New_E22A(strPINBlock.value, arrAccount)) {
            return;
        }

        var str = "조회할 계좌번호 순번을 입력하세요.\n";
        for (var i = 0; i < arrAccount.value.length; i++)
            str += "[" + Number(i + 1) + "] " + arrAccount.value[i] + "  ";

        var Index = prompt(str, "");

        var strPinNo = prompt("계좌 비밀번호를 입력하세요.", "");

        if (strPinNo == null || strPinNo == "") {
            return;
        }

        if (0 != Util_PIN_Encrypt(strPinNo, strCardNum, "00", strPINWorkingKey.value, strPINBlock.value)) {
            return;
        }

        if (0 != SCRCashIC_GetData_New_E23A(String(Index - 1), "0", strPINBlock.value,
            strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData)) {
            return;
        }
    }

    var strICTransactionUniqueNumber = { value: "" };
    var strICAuthorizationDate = { value: "" };

    if (0 != CashICA5Refund(txtCATID.value, strCardData.value, "C", strIssuerInstitutionCode.value,
        txtTransactionAmount.value, strEncryptionInfo.value, strCardSerialNumber.value, "00", txtAuthorizationDate.value, txtAuthorizationNumber.value)) {
        return;
    }

    alert("현금IC 승인취소 정상 완료");
}


function CashICA5Refund(strCATID, strCardData, strCardDataType, strIssuerCode,
    strTransactionAmount, strEncryptionInfo, strCardSerialNumber, strTransactionType,
    strOriginalAuthorizationDate, strOriginalICTransactionUniqueNumber) {
    var strMsg = "A5 스펙: 현금 IC 환불 거래\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Card Data", strCardData);
    FDK_Module.FDK_Input(iProcID, "Card Data Type", strCardDataType);
    FDK_Module.FDK_Input(iProcID, "Issuer Code", strIssuerCode);
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Encryption Info", strEncryptionInfo);
    FDK_Module.FDK_Input(iProcID, "Card Serial Number", strCardSerialNumber);
    FDK_Module.FDK_Input(iProcID, "Transaction Type", strTransactionType);
    FDK_Module.FDK_Input(iProcID, "Original Authorization Date", strOriginalAuthorizationDate);
    FDK_Module.FDK_Input(iProcID, "Original IC Transaction Unique Number", strOriginalICTransactionUniqueNumber);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/CashIC/A5Refund");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "Service Amount : " + FDK_Module.FDK_Output(iProcID, "Service Amount") + "\n";
        strMsg = strMsg + "Tax Amount : " + FDK_Module.FDK_Output(iProcID, "Tax Amount") + "\n";
        strMsg = strMsg + "Encryption Info : " + FDK_Module.FDK_Output(iProcID, "Encryption Info") + "\n";
        strMsg = strMsg + "Card Serial Number : " + FDK_Module.FDK_Output(iProcID, "Card Serial Number") + "\n";
        strMsg = strMsg + "Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Transaction Type") + "\n";
        strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
        strMsg = strMsg + "Original IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Original IC Transaction Unique Number") + "\n";
        strMsg = strMsg + "Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Taxable Amount") + "\n";
        strMsg = strMsg + "Non-Taxable Amount : " + FDK_Module.FDK_Output(iProcID, "Non-Taxable Amount") + "\n";
        strMsg = strMsg + "Filler3 : " + FDK_Module.FDK_Output(iProcID, "Filler3") + "\n";
        strMsg = strMsg + "Merchant Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Code") + "\n";
        strMsg = strMsg + "Merchant Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Name") + "\n";
        strMsg = strMsg + "Merchant Acquirer Branch Code : " + FDK_Module.FDK_Output(iProcID, "Merchant Acquirer Branch Code") + "\n";
        strMsg = strMsg + "IC Issuer Code : " + FDK_Module.FDK_Output(iProcID, "IC Issuer Code") + "\n";
        strMsg = strMsg + "IC Issuer Name : " + FDK_Module.FDK_Output(iProcID, "IC Issuer Name") + "\n";
        strMsg = strMsg + "IC Balance : " + FDK_Module.FDK_Output(iProcID, "IC Balance") + "\n";
        strMsg = strMsg + "IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "IC Transaction Unique Number") + "\n";
        strMsg = strMsg + "IC Authorization Date : " + FDK_Module.FDK_Output(iProcID, "IC Authorization Date") + "\n";
        strMsg = strMsg + "Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "Transaction Unique Number") + "\n";
        strMsg = strMsg + "IC Merchant Control Number : " + FDK_Module.FDK_Output(iProcID, "IC Merchant Control Number") + "\n";
        strMsg = strMsg + "Fee Rate : " + FDK_Module.FDK_Output(iProcID, "Fee Rate") + "\n";
        strMsg = strMsg + "Merchant Fee : " + FDK_Module.FDK_Output(iProcID, "Merchant Fee") + "\n";
        strMsg = strMsg + "Issuer Fee : " + FDK_Module.FDK_Output(iProcID, "Issuer Fee") + "\n";
        strMsg = strMsg + "Acquirer Fee : " + FDK_Module.FDK_Output(iProcID, "Acquirer Fee") + "\n";
        strMsg = strMsg + "Withdrawal Account Number : " + FDK_Module.FDK_Output(iProcID, "Withdrawal Account Number") + "\n";
        strMsg = strMsg + "Response MSG 1 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 1") + "\n";
        strMsg = strMsg + "Response MSG 2 : " + FDK_Module.FDK_Output(iProcID, "Response MSG 2") + "\n";
        strMsg = strMsg + "Notification 1 : " + FDK_Module.FDK_Output(iProcID, "Notification 1") + "\n";
        strMsg = strMsg + "Notification 2 : " + FDK_Module.FDK_Output(iProcID, "Notification 2") + "\n";
        strMsg = strMsg + "Notification 3 : " + FDK_Module.FDK_Output(iProcID, "Notification 3") + "\n";
        strMsg = strMsg + "Notification 4 : " + FDK_Module.FDK_Output(iProcID, "Notification 4") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}


function SCRCashIC_Read_New_E21A(strPINWorkingKey, strAccountCount) {
    var strMsg = "보안 리더기 - 현금IC 카드 - 읽기 - (개선스펙).\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/CashIC_Read_New_E21A");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strPINWorkingKey.value = FDK_Module.FDK_Output(iProcID, "PIN Working Key");
        strAccountCount.value = FDK_Module.FDK_Output(iProcID, "Account Count");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "PIN Working Key : " + FDK_Module.FDK_Output(iProcID, "PIN Working Key") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Account Count : " + FDK_Module.FDK_Output(iProcID, "Account Count") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "FS40 : " + FDK_Module.FDK_Output(iProcID, "FS40") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "FS41 : " + FDK_Module.FDK_Output(iProcID, "FS41") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "FS42 : " + FDK_Module.FDK_Output(iProcID, "FS42") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "FS43 : " + FDK_Module.FDK_Output(iProcID, "FS43") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "FS44 : " + FDK_Module.FDK_Output(iProcID, "FS44") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "FS45 : " + FDK_Module.FDK_Output(iProcID, "FS45") + "\n";
        strMsg = strMsg + "SCR Info FW Build Date : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Build Date") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}


function SCRCashIC_GetData_New_E23A(strAccountIndex, strTransactionType, strPINBlock, strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData) {
    var strMsg = "보안 리더기 - 현금IC 카드 - 거래 데이터 얻기 - (개선스펙).\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "Account Index", strAccountIndex);
    FDK_Module.FDK_Input(iProcID, "Transaction Type", strTransactionType);
    FDK_Module.FDK_Input(iProcID, "PIN Block", strPINBlock);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/CashIC_GetData_New_E23A");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strCardSerialNumber.value = FDK_Module.FDK_Output(iProcID, "Card Serial Number");
        strIssuerInstitutionCode.value = FDK_Module.FDK_Output(iProcID, "Issuer Institution Code");
        strEncryptionInfo.value = FDK_Module.FDK_Output(iProcID, "Encryption Info");
        strCardData.value = FDK_Module.FDK_Output(iProcID, "Card Data");
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet)) {
        strMsg = "Output List :\n";
        strMsg = strMsg + "Equipment Response Code : " + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Equipment State Code : " + FDK_Module.FDK_Output(iProcID, "Equipment State Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Card Serial Number : " + FDK_Module.FDK_Output(iProcID, "Card Serial Number") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Issuer Institution Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Institution Code") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "Encryption Info : " + FDK_Module.FDK_Output(iProcID, "Encryption Info") + "\n";
        strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\n";
        strMsg = strMsg + "SCR Info Len : " + FDK_Module.FDK_Output(iProcID, "SCR Info Len") + "\n";
        strMsg = strMsg + "FS40 : " + FDK_Module.FDK_Output(iProcID, "FS40") + "\n";
        strMsg = strMsg + "SCR Info HW Model Name : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Model Name") + "\n";
        strMsg = strMsg + "FS41 : " + FDK_Module.FDK_Output(iProcID, "FS41") + "\n";
        strMsg = strMsg + "SCR Info FW Version : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Version") + "\n";
        strMsg = strMsg + "FS42 : " + FDK_Module.FDK_Output(iProcID, "FS42") + "\n";
        strMsg = strMsg + "SCR Info Serial Number : " + FDK_Module.FDK_Output(iProcID, "SCR Info Serial Number") + "\n";
        strMsg = strMsg + "FS43 : " + FDK_Module.FDK_Output(iProcID, "FS43") + "\n";
        strMsg = strMsg + "SCR Info HW Type : " + FDK_Module.FDK_Output(iProcID, "SCR Info HW Type") + "\n";
        strMsg = strMsg + "FS44 : " + FDK_Module.FDK_Output(iProcID, "FS44") + "\n";
        strMsg = strMsg + "SCR Info Key Count : " + FDK_Module.FDK_Output(iProcID, "SCR Info Key Count") + "\n";
        strMsg = strMsg + "FS45 : " + FDK_Module.FDK_Output(iProcID, "FS45") + "\n";
        strMsg = strMsg + "SCR Info FW Build Date : " + FDK_Module.FDK_Output(iProcID, "SCR Info FW Build Date") + "\n";

        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);

    return iRet;
}

// --------------------------------------------------------------------

//멤버십 카드 읽기 시작
function MemberShipCardRead_Start() {
    ClearMemberShipCardReadObj();

    var result = confirm('멤버십 카드 읽기를 시작 하시겠습니까?');
    if (result == true) {
        DisplayInfo('멤버십 카드 읽기를 시작합니다.');

        MemberShipCardRead_EventReg(MemberShipCardRead_EventCB);
    }
}


//멤버십 카드 읽기 종료
function MemberShipCardRead_Stop() {
    if (g_objMemberShipCardRead.PID_Event_E1FF != 0) {
        var result = confirm('멤버십 카드 읽기를 종료 하시겠습니까?');
        if (result == true) {
            DisplayInfo('멤버십 카드 읽기를 종료합니다.');

            ClearMemberShipCardReadObj();
        }
    }
    else {
        DisplayInfo('멤버십카드 읽기가 실행중이 아닙니다.');
    }

    //카드 리스트 삭제
    MemberShipCardRead_List_RemoveAll();
}


//멤버십 카드 읽기 이벤트 등록
function MemberShipCardRead_EventReg(funMemberShipCardRead_EventCB) {
    var iProcID = FDK_Module.FDK_Creat();
    g_objMemberShipCardRead.PID_Event_E1FF = iProcID;
    FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "false");//화면에 상태창 보여주지 않음.
    FDK_Module.FDK_Input(iProcID, "@/Common/HotKey_Cancel", "1011121B");//취소버튼

    FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Listen_Event_E1FF", funMemberShipCardRead_EventCB);
}


//멤버십 카드 읽기 콜백 함수 (카드 읽기 이벤트 발생시 진입)
function MemberShipCardRead_EventCB(ret, data) {
    var iRetTmp = 0;
    var strMsg = '';

    if (ret == -3012) {
        return;
    }

    if (ret == 0) {
        iRetTmp = MemberShipCardRead_CardRead("1", txtCATID.value, "E0", "F", "1004", g_objMemberShipCardRead);
        if (iRetTmp == 0) {
            if (g_objMemberShipCardRead.strEncodingCardData != '') {
                MemberShipCardRead_List_Add(g_objMemberShipCardRead.strEncodingCardData);
            }
            else {
                //DisplayInfo('멤버십카드가 아닙니다! 테스트로 마스킹값을 등록합니다.');
                //MemberShipCardRead_List_Add(g_objMemberShipCardRead.strCardData);

                DisplayInfo('멤버십카드가 아닙니다! 멤버십카드를 읽혀 주세요.');
            }
        }
    }
    else {
        strMsg = "에러[" + ret + "]\n";
        strData = "";
        strData = FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_Event_E1FF, "ErrorInfo");
        strMsg = strMsg + strData;

        DisplayInfo(strMsg);
    }

    if (g_objMemberShipCardRead.PID_Event_E1FF != 0) {
        FDK_Module.FDK_Destroy(g_objMemberShipCardRead.PID_Event_E1FF);
        g_objMemberShipCardRead.PID_Event_E1FF = 0;
    }

    //이벤트 재등록
    MemberShipCardRead_EventReg(MemberShipCardRead_EventCB);
}


//멤버십 카드 읽기 요청
function MemberShipCardRead_CardRead(strAuthorizationType, strCATID, strReadMode, strFallbackMode, strTransactionAmount, objMemberShipCardRead) {
    var strMsg = "보안 리더기 카드읽기.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    g_objMemberShipCardRead.PID_CardRead_E121 = iProcID;

    FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthorizationType);//1:승인, 2취소
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Read Mode", strReadMode);
    FDK_Module.FDK_Input(iProcID, "Fallback Mode", strFallbackMode);
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "false");//화면에 상태창 보여주지 않음.

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Payment_Request_E121");
    if (iRet == 0) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_CardRead_E121, "Response Code");

        objMemberShipCardRead.strCardData = FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_CardRead_E121, "Card Data");//카드번호
        objMemberShipCardRead.strEncodingCardData = FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_CardRead_E121, "Encoding Card Number");//인코딩 카드번호
        objMemberShipCardRead.strCardDataType = FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_CardRead_E121, "Card Data Type");//입력방식 S(msr), C(ic), R(rf)
    }
    else if (iRet == -1000) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_Event_E1FF, "Response Code");
        DisplayInfo(FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_Event_E1FF, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_Event_E1FF, "ErrorInfo");
    }

    if (0 != iRet) {

        if ('000B8007' == FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_Event_E1FF, "Equipment State Code")) {
            DisplayInfo('Fallback 이벤트 발생! 멤버십카드를 읽혀 주세요.');
        }
        else {
            DisplayInfo(strMsg + "\n" + FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_Event_E1FF, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(g_objMemberShipCardRead.PID_Event_E1FF, "Equipment State Code"));
        }
    }

    return iRet;
}


//멤버십 카드 리스트 추가
function MemberShipCardRead_List_Add(strData) {
    txtResult.value = txtResult.value + strData + "\n";
}


//멤버십 카드 리스트 삭제
function MemberShipCardRead_List_RemoveAll() {
    txtResult.value = "";
}


//멤버십 카드 읽기 객체 초기화
function ClearMemberShipCardReadObj() {
    if (g_objMemberShipCardRead.PID_Event_E1FF != 0) {
        FDK_Module.FDK_Destroy(g_objMemberShipCardRead.PID_Event_E1FF);
        g_objMemberShipCardRead.PID_Event_E1FF = 0;
    }
    if (g_objMemberShipCardRead.PID_CardRead_E121 != 0) {
        FDK_Module.FDK_Destroy(g_objMemberShipCardRead.PID_CardRead_E121);
        g_objMemberShipCardRead.PID_CardRead_E121 = 0;
    }
    g_objMemberShipCardRead.CardReadData.strCardDataType = '';
    g_objMemberShipCardRead.CardReadData.strCardData = '';
    g_objMemberShipCardRead.CardReadData.strEncodingCardData = '';
}


//안내문구 출력
function DisplayInfo(strText) {
    txtInfo.value = strText;

    setTimeout("txtInfo.value = ''", 3000);
}

// --------------------------------------------------------------------

//카드 이벤트 수신 시작
function CardEvent_Start() {
    ClearCardEvent();

    var result = confirm('카드 이벤트 읽기를 시작 하시겠습니까?');
    if (result == true) {
        DisplayInfo('카드 이벤트 읽기를 시작합니다.');

        CardEvent_EventReg(CardEvent_EventCB);
    }
}


//카드 이벤트 수신 종료
function CardEvent_Stop() {
    if (iPID_CardEvent_E1FF != 0) {
        var result = confirm('카드 이벤트 읽기를 종료 하시겠습니까?');
        if (result == true) {
            DisplayInfo('카드 이벤트 읽기를 종료합니다.');

            ClearCardEvent();
        }
    }
    else {
        DisplayInfo('카드 이벤트 읽기가 실행중이 아닙니다.');
    }
}


//카드 이벤트 수신 이벤트 등록
function CardEvent_EventReg(funCardEvent_EventCB) {
    var iProcID = FDK_Module.FDK_Creat();
    iPID_CardEvent_E1FF = iProcID;
    FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "false");//화면에 상태창 보여주지 않음.
    FDK_Module.FDK_Input(iProcID, "@/Common/HotKey_Cancel", "1011121B");//취소버튼

    FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Listen_Event_E1FF", funCardEvent_EventCB);
}


//카드 이벤트 수신 콜백 함수 (카드 읽기 이벤트 발생시 진입)
function CardEvent_EventCB(ret, data) {
    var strMsg = '';

    if (ret == -3012) {
        return;
    }

    if (ret == 0) {
        strMsg += "성공 [" + ret + "]\nResponse Code: " + FDK_Module.FDK_Output(iPID_CardEvent_E1FF, "Response Code") + "\n";
        strMsg += RetErr(FDK_Module.FDK_Output(iPID_CardEvent_E1FF, "Equipment State Code")) + " [" + FDK_Module.FDK_Output(iPID_CardEvent_E1FF, "Equipment State Code") + "]";

        alert(strMsg);
    }
    else {
        strMsg = "에러[" + ret + "]\n";
        strData = "";
        strData = FDK_Module.FDK_Output(iPID_CardEvent_E1FF, "ErrorInfo");
        strMsg = strMsg + strData;

        alert(strMsg);
    }

    if (iPID_CardEvent_E1FF != 0) {
        FDK_Module.FDK_Destroy(iPID_CardEvent_E1FF);
        iPID_CardEvent_E1FF = 0;
    }

    //이벤트 재등록
    CardEvent_EventReg(CardEvent_EventCB);
}


//카드 이벤트 읽기 객체 초기화
function ClearCardEvent() {
    if (iPID_CardEvent_E1FF != 0) {
        FDK_Module.FDK_Destroy(iPID_CardEvent_E1FF);
        iPID_CardEvent_E1FF = 0;
    }
}


//장비상태코드 설명 반환
function RetErr(strMsg) {
    var ErrLog = [
        { code: "000B0000", msg: "리더기 상태 정상" },
        { code: "000B8001", msg: "리더기 Tamper 오류(Integrity Check Error)" },
        { code: "000B8002", msg: "MSR Error" },
        { code: "000B8003", msg: "IC Error" },
        { code: "000B0004", msg: "MSR 읽음 이벤트" },
        { code: "000B0005", msg: "IC 읽음 이벤트" },
        { code: "000B8006", msg: "IC 거래 불가" },
        { code: "000B8007", msg: "FallBack" },
        { code: "000B8008", msg: "IC 카드 삽입되어 있음" },
        { code: "000B8009", msg: "상황에 맞지 않는 명령" },
        { code: "000B8010", msg: "MSR 요청에 정책상 불가능.(Fallback 상황이 아님)" },
        { code: "000B8011", msg: "RF Error" },
        { code: "000B8012", msg: "단말기 번호 오류 : 키 다운로드의 단말기 번호와 다르면 에러" },
        { code: "000B8013", msg: "카드 읽기 이벤트 : 금액 요청 RF" },
        { code: "000B8014", msg: "이전 RF 카드 인식중" },
        { code: "000B8015", msg: "'카드 읽기', 'IC SG' 상황에 IC 카드가 인식되지 않음" },
        { code: "000B8016", msg: "카드읽기(개선스펙)에서 '가맹점 암호화 데이터'를 요청할 때 '가맹점 키 데이터'가 없다" }
    ];

    for (var i = 0; i < ErrLog.length; i++) {
        if (strMsg == ErrLog[i].code) {
            return ErrLog[i].msg;
        }
    }
}




//카드 읽기 E121 EMV CHECK
function CreditCardRead_E121_EMV_CHECK() {
    //if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
    //    return;

    txtResult.value = "";
    
    var strCardDataType = { value: "" };
    var bICCard = { value: false };
    var bFallBack = { value: false };
    var iPID_Payment_Request_E121 = { value: 0 };

    console.log("CreditCardRead_E121_EMV_CHECK() [Start]");

    if (0 != Payment_Request_E121_EMV_CHECK("1", txtCATID.value, cmbReadMode.value, cmbFallbackMode.value, txtTransactionAmount.value,
        iPID_Payment_Request_E121, bICCard, strCardDataType, bFallBack)) {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);
        return false;
    }

    var nRetEMVCheck = CreditCardRead__EMV_CHECK(iPID_Payment_Request_E121.value);

    if(0 != nRetEMVCheck) {
        alert("CreditCardRead__EMV_CHECK 실패");
        return false;
    }

    FDK_Module.FDK_Destroy(iPID_Payment_Request_E121.value);


    console.log("CreditCardRead_E121_EMV_CHECK() [End]");
    return true;
}

//카드 읽기 E311 EMV CHECK
function CreditCardRead_E311_EMV_CHECK() {
    //if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
    //    return;
    txtResult.value = "";

    var strCardDataType = { value: "" };
    var bICCard = { value: false };
    var bFallBack = { value: false };
    var iPID_Payment_Request_E311 = { value: 0 };

    console.log("CreditCardRead_E311_EMV_CHECK() [Start]");

    if (0 != Payment_Request_E311_EMV_CHECK("1", txtCATID.value, cmbReadMode.value, cmbFallbackMode.value, txtTransactionAmount.value,
        iPID_Payment_Request_E311, bICCard, strCardDataType, bFallBack)) {
        FDK_Module.FDK_Destroy(iPID_Payment_Request_E311.value);
        return false;
    }

    var nRetEMVCheck = CreditCardRead__EMV_CHECK(iPID_Payment_Request_E311.value);

    if(0 != nRetEMVCheck) {
        alert("CreditCardRead__EMV_CHECK 실패");
        return false;
    }

    //FDK_Module.FDK_Destroy(iPID_Payment_Request_E311.value);

    console.log("CreditCardRead_E311_EMV_CHECK() [End]");
    return true;
}


function Payment_Request_E121_EMV_CHECK(strAuthorizationType, strCATID, strReadMode, strFallbackMode, strTransactionAmount,
    iPID_Payment_Request_E121, bICCard, strCardDataType, bFallBack) {
    var strMsg = "보안 리더기 카드읽기(E121 EMV CHECK).\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_Payment_Request_E121.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthorizationType);//1:승인, 2취소
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Read Mode", strReadMode);
    FDK_Module.FDK_Input(iProcID, "Fallback Mode", strFallbackMode);
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Payment_Request_E121");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");

        var strCardData = FDK_Module.FDK_Output(iProcID, "Card Data");//카드번호
        strCardDataType.value = FDK_Module.FDK_Output(iProcID, "Card Data Type");//입력방식 S(msr), C(ic), R(rf)
        var strFBCode = FDK_Module.FDK_Output(iProcID, "IC Fallback Reason Code");//fallback 데이터 인가? (space or 00 아니면 fb)

        strFBCode = strFBCode.replace(/(^\s*)|(\s*$)/gi, "");	//trim

        if (0 < strFBCode.length && 0 != Number(strFBCode))
            bFallBack.value = true;
        else
            bFallBack.value = false;

        var iEqualIndex = strCardData.indexOf('=');
        if (0 < iEqualIndex && iEqualIndex + 5 + 1 <= strCardData.length) {
            var iServiceCode = Number(strCardData.substring(iEqualIndex + 5, iEqualIndex + 6));
            if (2 == iServiceCode || 6 == iServiceCode)
                bICCard.value = true;
        }
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    return iRet;
}



function Payment_Request_E311_EMV_CHECK(strAuthorizationType, strCATID, strReadMode, strFallbackMode, strTransactionAmount,
    iPID_Payment_Request_E311, bICCard, strCardDataType, bFallBack) {
    var strMsg = "보안 리더기 카드읽기(E311 EMV CHECK).\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_Payment_Request_E311.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthorizationType);//1:승인, 2취소
    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Read Mode", strReadMode);
    FDK_Module.FDK_Input(iProcID, "Fallback Mode", strFallbackMode);
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/Payment_Request_E311");
    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");

        var strCardData = FDK_Module.FDK_Output(iProcID, "Card Data");//카드번호
        strCardDataType.value = FDK_Module.FDK_Output(iProcID, "Card Data Type");//입력방식 S(msr), C(ic), R(rf)
        var strFBCode = FDK_Module.FDK_Output(iProcID, "IC Fallback Reason Code");//fallback 데이터 인가? (space or 00 아니면 fb)

        strFBCode = strFBCode.replace(/(^\s*)|(\s*$)/gi, "");	//trim

        if (0 < strFBCode.length && 0 != Number(strFBCode))
            bFallBack.value = true;
        else
            bFallBack.value = false;

        var iEqualIndex = strCardData.indexOf('=');
        if (0 < iEqualIndex && iEqualIndex + 5 + 1 <= strCardData.length) {
            var iServiceCode = Number(strCardData.substring(iEqualIndex + 5, iEqualIndex + 6));
            if (2 == iServiceCode || 6 == iServiceCode)
                bICCard.value = true;
        }
    }
    else if (-1000 == iRet) {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

    return iRet;
}



/**
 * 문자열이 공백이거나 16진수 값인지 확인하는 함수
 * @param {string} strEmvValue - 검사할 문자열
 * @returns {boolean} - 공백이거나 16진수 값이면 true, 아니면 false
 */
function isHexadecimal(strEmvValue) {
    // 문자열이 undefined나 null이면 false 반환
    if (typeof strEmvValue === 'undefined' || strEmvValue === null) {
        return false;
    }

    // 문자열이 비어있거나 공백만 있으면 true 반환
    if (strEmvValue.trim() === '') {
        return true;
    }

    // 16진수 정규식 패턴 (대소문자 A-F와 0-9만 허용)
    const hexPattern = /^[0-9A-Fa-f]+$/;
    
    // 문자열이 16진수 패턴과 일치하는지 검사
    return hexPattern.test(strEmvValue.trim());
}

var strEmvSumAsync = "";

function isValidBase64(str) {
    try {
        return btoa(atob(str)) === str;
    } catch (e) {
        return false;
    }
}

function AsyncOutputFunction(Return, oRecvData)
{
    var strMsg      = "";
    var strReturnDesc = "";

    var bisValidBase64 = isValidBase64(Return);
    if( bisValidBase64 ) {
        strReturnDesc = atob(Return);
    }
    else {
        strReturnDesc  = "\r\n"
        strReturnDesc += "----------------------------" + "\r\n"
        strReturnDesc += "NOT BASE64" + "\r\n"
        strReturnDesc += "NOT BASE64" + "\r\n"
        strReturnDesc += "----------------------------" + "\r\n"
    }
    
    //strMsg = "AsyncOutputFunction() Return=[ " + Return + "] oRecvData=[" +  oRecvData + "]";
    //strMsg = "AsyncOutputFunction() Return=[" + Return + "]\noRecvData=\n" + JSON.stringify(oRecvData, null, 2);
    strMsg = "AsyncOutputFunction() Return=[" + Return + "] strReturnDesc=[" + strReturnDesc + "]\noRecvData=\n" + JSON.stringify(oRecvData, null, 2);
    console.log(strMsg);

    strEmvSumAsync += strReturnDesc;
    //alert(strMsg);    

}

function Output_EMV_CHECK(iProcID, nEmvFixLen, strEmvKey, Out_srtMsg, Out_srtErrorMsg) {
    var bRet     = true;
    var bTmpRet  = true;
   
   
    var strMsg      = "";
    var strErrorMsg = "";

    if( iProcID <= 0) {
        strMsg = "Output_EMV_CHECK() [Error] iProcID <= 0";
        console.log(strMsg);
        alert(strMsg);  
        return false;;
    }


    var bSyncFunction = false;
    var syncRadio = document.querySelector('input[name="CardReadSync"]:checked');
    if (syncRadio && syncRadio.value === 'sync') {
        bSyncFunction = true;
    } else {
        bSyncFunction = false;
    }

    if( bSyncFunction == true) {
        strEmvValue = FDK_Module.FDK_Output(iProcID, strEmvKey);
    }
    else {
        strEmvValue = FDK_Module.FDK_Output(iProcID, strEmvKey, AsyncOutputFunction);
        return true;
    }

    
    strMsg += strEmvKey + "(L:" + nEmvFixLen + " ,F:" + nEmvFixLen + ")" + " : [" + strEmvValue + "]\r\n";  // strMsg
    if(strEmvValue.length !=  nEmvFixLen)
    {
        strErrorMsg += strEmvKey + "(L:" + nEmvFixLen + " ,F:" + nEmvFixLen + ")" + " XXXX[nEmvFixLen ERROR!~~~] " + " : [" + strEmvValue + "]\r\n";  // strErrorMsg
        bTmpRet  = false;
    }


    if( strEmvKey !== "IC CHIP Brand" )
    { // "IC CHIP Brand" 이외의 값일때 체크, "IC CHIP Brand" 는 M, V, J 등의 값.
        if( isHexadecimal(strEmvValue) == false )
        {
            strErrorMsg += strEmvKey + "(L:" + nEmvFixLen + " F:" + nEmvFixLen + ")" + " XXXX[isHexadecimal() ERROR!~~~] " + " : [" + strEmvValue + "]\r\n";  // strErrorMsg
            bTmpRet  = false;
        }
    }

    Out_srtMsg.value      += strMsg;
    Out_srtErrorMsg.value += strErrorMsg;

    bRet = bTmpRet;

    return bRet;
}

var nASyncLoopCnt = 0;
function CreditCardRead__EMV_CHECK(iProcID) {
    var iRet        = -1;
    var strMsg      = "";
    var strErrorMsg = "";

    var OUT_strMsg      = { value: "" };
    var OUT_strErrorMsg = { value: "" };
    
    

    if( iProcID <= 0) {
        strMsg = "CreditCardRead__EMV_CHECK() [Error] iProcID <= 0";
        console.log(strMsg);
        alert(strMsg);  
        return iRet;
    }


    // -------------------------

    strMsg += "Card Data : [" + FDK_Module.FDK_Output(iProcID, "Card Data") + "]\r\n";
    strMsg += "Encryption Data : [" + FDK_Module.FDK_Output(iProcID, "Encryption Data") + "]\r\n";

    // -------------------------

   // Output_EMV_CHECK( iProcID,  4, "Response Code" , OUT_strMsg, OUT_strErrorMsg);

   strEmvSumAsync = "";


    var nCnt = parseInt(document.getElementById('txtASyncCnt') ? document.getElementById('txtASyncCnt').value : '1', 10);
    if (isNaN(nCnt) || nCnt < 1) nCnt = 1;

    nASyncLoopCnt = nCnt;


    for (var i = 0; i < nCnt; i++) {
        Output_EMV_CHECK( iProcID, 12, "IC Transaction Unique Number" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  2, "IC Data Version" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  1, "IC CHIP Brand" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  2, "IC Pan Sequence Number" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID, 16, "IC API" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  1, "IC Fallback Reason Code" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID, 64, "IC IAppD" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID, 32, "IC DFN" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID, 40, "IC ISR" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID, 16, "IC ARQC" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  2, "IC CID" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  8, "IC UTN" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  4, "IC ATC" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID, 10, "IC TVR" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  6, "IC TTD" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  2, "IC TST" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  4, "IC AIP" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  6, "IC CVMR" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  6, "IC TC" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  2, "IC TT" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  8, "IC IFDSN" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  2, "IC TSCC" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  4, "IC AVN" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  4, "IC TSC" , OUT_strMsg, OUT_strErrorMsg);
        Output_EMV_CHECK( iProcID,  4, "IC PEM" , OUT_strMsg, OUT_strErrorMsg);
        //Output_EMV_CHECK( iProcID,  8, "IC FFI" , OUT_strMsg, OUT_strErrorMsg);
    }

    

    
    strMsg      += OUT_strMsg.value;
    strErrorMsg += OUT_strErrorMsg.value;

    txtResult.value = strMsg;
    console.log(strMsg);
    
    strErrorMsg = OUT_strErrorMsg.value;
    if( strErrorMsg.length > 1 )
    {
        iRet = -1;
        txtResult.value = strErrorMsg;
        console.log(strErrorMsg);
        alert(strErrorMsg);
    }
    else
    {
        iRet = 0;
    }

    return iRet;


    // strMsg += "IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "IC Transaction Unique Number") + "\r\n";
    // strMsg += "IC Data Version : " + FDK_Module.FDK_Output(iProcID, "IC Data Version") + "\r\n";
    // strMsg += "IC CHIP Brand : " + FDK_Module.FDK_Output(iProcID, "IC CHIP Brand") + "\r\n";
    // strMsg += "IC Pan Sequence Number : " + FDK_Module.FDK_Output(iProcID, "IC Pan Sequence Number") + "\r\n";
    // strMsg += "IC API : " + FDK_Module.FDK_Output(iProcID, "IC API") + "\r\n";
    // strMsg += "IC Fallback Reason Code : " + FDK_Module.FDK_Output(iProcID, "IC Fallback Reason Code") + "\r\n";
    // strMsg += "IC IAppD : " + FDK_Module.FDK_Output(iProcID, "IC IAppD") + "\r\n";
    // strMsg += "IC DFN : " + FDK_Module.FDK_Output(iProcID, "IC DFN") + "\r\n";
    // strMsg += "IC ISR : " + FDK_Module.FDK_Output(iProcID, "IC ISR") + "\r\n";
    // strMsg += "IC ARQC : " + FDK_Module.FDK_Output(iProcID, "IC ARQC") + "\r\n";
    // strMsg += "IC CID : " + FDK_Module.FDK_Output(iProcID, "IC CID") + "\r\n";
    // strMsg += "IC UTN : " + FDK_Module.FDK_Output(iProcID, "IC UTN") + "\r\n";
    // strMsg += "IC ATC : " + FDK_Module.FDK_Output(iProcID, "IC ATC") + "\r\n";
    // strMsg += "IC TVR : " + FDK_Module.FDK_Output(iProcID, "IC TVR") + "\r\n";
    // strMsg += "IC TTD : " + FDK_Module.FDK_Output(iProcID, "IC TTD") + "\r\n";
    // strMsg += "IC TST : " + FDK_Module.FDK_Output(iProcID, "IC TST") + "\r\n";
    // strMsg += "IC AIP : " + FDK_Module.FDK_Output(iProcID, "IC AIP") + "\r\n";
    // strMsg += "IC CVMR : " + FDK_Module.FDK_Output(iProcID, "IC CVMR") + "\r\n";
    // strMsg += "IC TC : " + FDK_Module.FDK_Output(iProcID, "IC TC") + "\r\n";
    // strMsg += "IC TT : " + FDK_Module.FDK_Output(iProcID, "IC TT") + "\r\n";
    // strMsg += "IC IFDSN : " + FDK_Module.FDK_Output(iProcID, "IC IFDSN") + "\r\n";
    // strMsg += "IC TSCC : " + FDK_Module.FDK_Output(iProcID, "IC TSCC") + "\r\n";
    // strMsg += "IC AVN : " + FDK_Module.FDK_Output(iProcID, "IC AVN") + "\r\n";
    // strMsg += "IC TSC : " + FDK_Module.FDK_Output(iProcID, "IC TSC") + "\r\n";
    // strMsg += "IC PEM : " + FDK_Module.FDK_Output(iProcID, "IC PEM") + "\r\n";
    // strMsg += "IC FFI : " + FDK_Module.FDK_Output(iProcID, "IC FFI") + "\r\n";    




    //txtResult.value = strMsg;
    //console.log(strMsg);

    //return iRet;
}

function CreditCardRead_ASyncResult_Print() {
    var blRet = false;

    console.log("------------------------------------------------------------------------------------------");
    var nSumLen = strEmvSumAsync.length;
    var nCount = nASyncLoopCnt; // Math.floor(nSumLen / 258);
    var nNeedSumLen = 258 * nCount;
    var srtResult = (nSumLen == nNeedSumLen ) ? "성공" : "실패";
    console.log("[ASync 결과 출력] EMV LOOP COUNT=[" + nCount + "]");
    console.log("[ASync 결과 출력] 258 * [" + nCount + "] => [" +  nNeedSumLen + "]");
    console.log("[ASync 결과 ] => [" + srtResult + "]");
    console.log("[ASync 결과 출력] strEmvSumAsync Len=[" + strEmvSumAsync.length + "] strEmvSumAsync=[" + strEmvSumAsync + "]");



    blRet = (nSumLen == nNeedSumLen );
    return blRet;
}

function Device_BMP2Data() {
    var strMsg = "BMP2Data(이미지파일읽기)\n";
    var iRet = 0;

    var iPID_PaymentTerminal_Util_BMP2Data = { value: 0 };

    var strBMPFile = "C:\\FDK_Module\\SignImage.bmp";
    var strReverseData = "0";
    var strUsage = "1";
    var strBMPFileRemove = " ";

    console.log("Device_BMP2Data() [Start]");

    iRet = PaymentTerminal_Util_BMP2Data(iPID_PaymentTerminal_Util_BMP2Data, strBMPFile, strReverseData, strUsage, strBMPFileRemove);

    if (0 == iRet) {
        strMsg += "성공[" + iRet + "]\n";
    }
    else if (-1000 == iRet) {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }
    else  {
        strMsg += "에러[" + iRet + "]\nError:\n";
    }

    if (0 != iRet) {
        alert(strMsg);
    }


    if( iPID_PaymentTerminal_Util_BMP2Data.value != 0 ) {
       FDK_Module.FDK_Destroy(iPID_PaymentTerminal_Util_BMP2Data.value);
    }

    console.log("Device_BMP2Data() [End]");
}

function PaymentTerminal_Util_BMP2Data(iPID_PaymentTerminal_Util_BMP2Data, strBMPFile, strReverseData, strUsage, strBMPFileRemove) {
    var iRet = 0;
    var strMsg = "PaymentTerminal_Util_BMP2Data\n";

    var strData = "";

    var iProcID = FDK_Module.FDK_Creat();
    iPID_PaymentTerminal_Util_BMP2Data.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "BMP File", strBMPFile);
    FDK_Module.FDK_Input(iProcID, "Reverse data", strReverseData);
    FDK_Module.FDK_Input(iProcID, "Usage", strUsage);
    FDK_Module.FDK_Input(iProcID, "BMP File Remove", strBMPFileRemove);
    
    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Util/BMP2Data");

    if(0 == iRet) {
        strMsg = "Output List :\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "Size");
        strMsg += "Size : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "FS1");
        strMsg += "FS1 : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "Width");
        strMsg += "Width : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "FS2");
        strMsg += "FS2 : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "Height");
        strMsg += "Height : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "FS3");
        strMsg += "FS3 : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "ImageData");
        strMsg += "ImageData : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "FS4");
        strMsg += "FS4 : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "ImageDataFile");
        strMsg += "ImageDataFile : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        strData = FDK_Module.FDK_Output(iProcID, "FS5");
        strMsg += "FS5 : " + "Len=[" + strData.length + "]" + ", Data=[" + strData + "]" + "\r\n";
        
        txtResult.value = strMsg;
        console.log(strMsg);
    }

    return iRet;
}



