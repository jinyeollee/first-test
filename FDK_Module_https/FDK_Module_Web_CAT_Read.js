// 상세 메시지 팝업 여부
//var bShowMsg = false;	
var bShowMsg = true;


// 포스다운로드
function PosDownload() 
{
	var strCATID = "";	
    var strMsg = "포스 다운로드\n";
    var iRet = 0;    
    var iProcID = FDK_Module.FDK_Creat();
   
    FDK_Module.FDK_Input(iProcID, "POS Serial Number", txtSerialNo.value);
    FDK_Module.FDK_Input(iProcID, "Merchant Identification", "SCRSample");
    FDK_Module.FDK_Input(iProcID, "Developer Identification", "SCRSample");
    FDK_Module.FDK_Input(iProcID, "Business Number", txtBizNo.value);
    
    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/POSDownload/A5");

    if (0 == iRet)
    {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strCATID = FDK_Module.FDK_Output(iProcID, "CAT ID");
        txtCATID.value = strCATID;
    }
    else if (-1000 == iRet)
    {
        strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else
    {
        strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));
    else
    	alert("POS 다운로드 완료");
   
	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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

///////////////	보안 단말기 ///////////////

//보안 단말기 장치 찾기
function SearchCAT() 
{
  var strMsg = "CAT 단말기 연결 포트 찾기\n";
  var iRet = 0;
  
  var iProcID = FDK_Module.FDK_Creat();

 // txtResult.value = '';
  
  iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Util/SearchCAT");
  if (0 == iRet)
  {
      strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
      txtPortNoCAT.value = FDK_Module.FDK_Output(iProcID, "Port");
      txtBaudrateNoCAT.value = FDK_Module.FDK_Output(iProcID, "Baudrate");
  }
  else if (-1000 == iRet)
  {
  	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
  }
  else
  {
  	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
  }

  if(0 != iRet)
	  alert(strMsg);
  else
	  alert("보안 단말기 찾기 완료");
    
  if (bShowMsg && (0 == iRet || -1000 == iRet))
  {
      strMsg = "Output List :\n";
      strMsg = strMsg + "Port : " + FDK_Module.FDK_Output(iProcID, "Port") + "\n";
      strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
      strMsg = strMsg + "Baudrate : " + FDK_Module.FDK_Output(iProcID, "Baudrate") + "\n";
      strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
  
      alert(strMsg);
  }
  
  FDK_Module.FDK_Destroy(iProcID);  
}

//보안 인증 단말기 무결성 검사
function CATInformationSecurityCertification_ISC()
{
	var strMsg = "보안 인증 단말기 무결성 검사 및 결과 얻기\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Read/CATInformationSecurityCertification_ISC");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
        alert(strMsg);

	if (0 == iRet || -1000 == iRet)
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "H/W Model Name") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "F/W Version : " + FDK_Module.FDK_Output(iProcID, "F/W Version") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "H/W Serial Number : " + FDK_Module.FDK_Output(iProcID, "H/W Serial Number") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Integrity Info : " + FDK_Module.FDK_Output(iProcID, "Integrity Info") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
    
    return iRet;
}

//보안 인증 단말기 정보 얻기
function CATInformationSecurityCertification_ISD()
{
	var strMsg = "보안 인증 단말기 정보 얻기\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Read/CATInformationSecurityCertification_ISD");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
        alert(strMsg);

	if (0 == iRet || -1000 == iRet)
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "H/W Model Name") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "F/W Version : " + FDK_Module.FDK_Output(iProcID, "F/W Version") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "H/W Serial Number : " + FDK_Module.FDK_Output(iProcID, "H/W Serial Number") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Integrity Info : " + FDK_Module.FDK_Output(iProcID, "Integrity Info") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}


//서명테스트(CAT)
function CATSignTest() 
{
	var strSignData = {value:""};
	var strMsg = "SignPAD 전자서명 데이터 읽기\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();
	
	FDK_Module.FDK_Input(iProcID, "CAT ID", txtCATID.value);
	FDK_Module.FDK_Input(iProcID, "Transaction Serial Number", "123456");
	FDK_Module.FDK_Input(iProcID, "Card Data", txtCATCardNum.value);
	FDK_Module.FDK_Input(iProcID, "Msg 1", "메시지1");
	FDK_Module.FDK_Input(iProcID, "Msg 2", "메시지2");
	FDK_Module.FDK_Input(iProcID, "Msg 3", "메시지3");
	FDK_Module.FDK_Input(iProcID, "Msg 4", "메시지4");

    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Read/Sign_UE");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strSignData = FDK_Module.FDK_Output(iProcID, "Compress Method") + "S1" + FDK_Module.FDK_Output(iProcID, "Hash Data") + FDK_Module.FDK_Output(iProcID, "Sign Data");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "LCD Type : " + FDK_Module.FDK_Output(iProcID, "LCD Type") + "\n";
        strMsg = strMsg + "Define Function : " + FDK_Module.FDK_Output(iProcID, "Define Function") + "\n";
        strMsg = strMsg + "Model No : " + FDK_Module.FDK_Output(iProcID, "Model No") + "\n";
        strMsg = strMsg + "SW Version : " + FDK_Module.FDK_Output(iProcID, "SW Version") + "\n";
        strMsg = strMsg + "Compress Method : " + FDK_Module.FDK_Output(iProcID, "Compress Method") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Hash Data : " + FDK_Module.FDK_Output(iProcID, "Hash Data") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Sign Data : " + FDK_Module.FDK_Output(iProcID, "Sign Data") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
        
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}

//PIN테스트(CAT)
function CATPINTest() 
{
	var strPIN_encdata = {value:""};
	var strSignData = {value:""};
    var strMsg = "PIN 입력 받기\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    
    FDK_Module.FDK_Input(iProcID, "CAT ID", txtCATID.value);
    FDK_Module.FDK_Input(iProcID, "Card Data", txtCATCardNum.value);
    FDK_Module.FDK_Input(iProcID, "PIN Kind", "0");
    FDK_Module.FDK_Input(iProcID, "Msg 1", "메시지1");
    FDK_Module.FDK_Input(iProcID, "Msg 2", "메시지2");

    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Read/PIN_UP");
    if (0 == iRet)
    {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strPIN_encdata.value = FDK_Module.FDK_Output(iProcID, "KEY Index")+ FDK_Module.FDK_Output(iProcID, "PIN Block");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "KEY Index : " + FDK_Module.FDK_Output(iProcID, "KEY Index") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "PIN Block : " + FDK_Module.FDK_Output(iProcID, "PIN Block") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
        
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
    
    return iRet;
}


//승인 (CAT-POS)
function CreditAuthNewCAT() 
{
	if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
        return;

	
    txtStateCredit.value = "";
	
	var strCardDataType = {value:""};
	var bICCard = {value:false};
	var bFallBack = {value:false};
	
    var iPID_CardInfo_UC = FDK_Module.FDK_Creat();
    if (0 != CardInfo_UC("1", txtCATID.value, txtTransactionAmount.value, iPID_CardInfo_UC, bICCard, strCardDataType, bFallBack))
    {
    	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
        return;
    }

    txtCATCardNum.value = FDK_Module.FDK_Output(iPID_CardInfo_UC, "Card Data");
    var strTranSN = FDK_Module.FDK_Output(iPID_CardInfo_UC, "Transaction Serial Number");

    var strSignData = {value:""};
    var strPIN_encdata = {value:""};

    if((true == ckbCATUseSign.checked && 0 != PaymentTerminal_Read_Sign_UE(txtCATID.value, strTranSN, txtCATCardNum.value, strSignData)) ||
        (true == ckbCATUsePIN.checked && 0 != PaymentTerminal_Read_PIN_UP(txtCATID.value, txtCATCardNum.value, strPIN_encdata)))
    {
    	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
        UserCancel();
		alert("error");
        return;
    }
    
    var strAuthorizationNumber = {value:""};
    var strAuthorizationDate = {value:""};
    var iPID_A5Auth = {value:0};
    
    if ((strCardDataType.value == "C") ||//입력방식 IC
        (strCardDataType.value == "S" && true == bICCard.value && true == bFallBack.value))//입력방식 MSR + IC카드번호 + FB값
    {
        txtStateCredit.value = "IC 승인전문";
        if (0 != CreditICA5Auth(txtCATID.value, txtTransactionAmount.value, iPID_CardInfo_UC,
            strSignData.value, strPIN_encdata.value, iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate))
        {
        	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
        	FDK_Module.FDK_Destroy(iPID_A5Auth.value);
            UserCancel();
            return;
        }
        //2017년 부터 IC 카드 후처리에서 오류 발생해도 무시.
        if (strCardDataType == "C")
            CardInfoICSG_US("1", txtCATID.value, iPID_A5Auth.value);
    }
    else if ((strCardDataType.value == "R") ||//입력방식 RF
        (strCardDataType.value == "S" && false == bICCard.value))//입력방식 MSR + IC카드번호
    {
        txtStateCredit.value = "MSR 승인전문";
        if (0 != CreditA5Auth(txtCATID.value, txtTransactionAmount.value, iPID_CardInfo_UC, iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate))
        {
        	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
        	FDK_Module.FDK_Destroy(iPID_A5Auth.value);
            UserCancel();
            return;
        }
    }
    else
    {
    	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
    	FDK_Module.FDK_Destroy(iPID_A5Auth.value);
        alert("오류 : IC 입력을 진행해 주십시오.");
        UserCancel();
        return;
    }

    FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
    FDK_Module.FDK_Destroy(iPID_A5Auth.value);

    txtAuthorizationNumber.value = strAuthorizationNumber.value;
    txtAuthorizationDate.value = strAuthorizationDate.value;

    alert("승인 완료");
}


function SetCardReadRetry_E122()
{
    var strMsg = "보안 리더기 카드읽기 재시도 기능 요청.\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/SecurityCardRead/SetCardReadRetry_E122");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
        alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Equipment Response Code") + ", " + FDK_Module.FDK_Output(iProcID, "Equipment State Code"));

	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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
    
    return iRet;
}


function CardInfo_UC(strAuthorizationType, strCATID, strTransactionAmount,
        iPID_CardInfo_UC, bICCard, strCardDataType, bFallBack)
{
	var strMsg = "단말기 카드 정보읽기 요청\n";
	var iRet = 0;
	var iProcID = iPID_CardInfo_UC;//FDK_Creat, FDK_Destroy 를 외부에서 하는 유형 예제

	FDK_Module.FDK_Input(iProcID, "Transaction Type", "1");
	FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthorizationType);
	FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
	FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);

    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Read/CardInfo_UC");
    if (0 == iRet)
    {
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
        if (0 < iEqualIndex && iEqualIndex + 5 + 1 <= strCardData.length)
        {
            var iServiceCode = Number(strCardData.substring(iEqualIndex + 5, iEqualIndex + 6));	
            if (2 == iServiceCode || 6 == iServiceCode)
                bICCard.value = true;
        }
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
        alert(strMsg);

	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Transaction Type") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Authorization Type : " + FDK_Module.FDK_Output(iProcID, "Authorization Type") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "Encryption Method Code : " + FDK_Module.FDK_Output(iProcID, "Encryption Method Code") + "\n";
        strMsg = strMsg + "Encryption Public Key Version : " + FDK_Module.FDK_Output(iProcID, "Encryption Public Key Version") + "\n";
        strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\n";
        strMsg = strMsg + "Card Data Type : " + FDK_Module.FDK_Output(iProcID, "Card Data Type") + "\n";
        strMsg = strMsg + "Read Type : " + FDK_Module.FDK_Output(iProcID, "Read Type") + "\n";
        strMsg = strMsg + "FS8 : " + FDK_Module.FDK_Output(iProcID, "FS8") + "\n";
        strMsg = strMsg + "Encryption Data : " + FDK_Module.FDK_Output(iProcID, "Encryption Data") + "\n";
        strMsg = strMsg + "FS9 : " + FDK_Module.FDK_Output(iProcID, "FS9") + "\n";
        strMsg = strMsg + "Dongle Transaction Type : " + FDK_Module.FDK_Output(iProcID, "Dongle Transaction Type") + "\n";
        strMsg = strMsg + "Dongle Card Issuer : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Issuer") + "\n";
        strMsg = strMsg + "Dongle Card Material : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Material") + "\n";
        strMsg = strMsg + "Dongle Card Method : " + FDK_Module.FDK_Output(iProcID, "Dongle Card Method") + "\n";
        strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
        strMsg = strMsg + "PIN : " + FDK_Module.FDK_Output(iProcID, "PIN") + "\n";
        strMsg = strMsg + "IC Transaction Unique Number : " + FDK_Module.FDK_Output(iProcID, "IC Transaction Unique Number") + "\n";
        strMsg = strMsg + "IC Data Version : " + FDK_Module.FDK_Output(iProcID, "IC Data Version") + "\n";
        strMsg = strMsg + "IC CHIP Brand : " + FDK_Module.FDK_Output(iProcID, "IC CHIP Brand") + "\n";
        strMsg = strMsg + "IC Pan Sequence Number : " + FDK_Module.FDK_Output(iProcID, "IC Pan Sequence Number") + "\n";
        strMsg = strMsg + "IC API : " + FDK_Module.FDK_Output(iProcID, "IC API") + "\n";
        strMsg = strMsg + "IC Fallback Reason Code : " + FDK_Module.FDK_Output(iProcID, "IC Fallback Reason Code") + "\n";
        strMsg = strMsg + "IC IAppD : " + FDK_Module.FDK_Output(iProcID, "IC IAppD") + "\n";
        strMsg = strMsg + "IC DFN : " + FDK_Module.FDK_Output(iProcID, "IC DFN") + "\n";
        strMsg = strMsg + "IC ISR : " + FDK_Module.FDK_Output(iProcID, "IC ISR") + "\n";
        strMsg = strMsg + "IC ARQC : " + FDK_Module.FDK_Output(iProcID, "IC ARQC") + "\n";
        strMsg = strMsg + "IC CID : " + FDK_Module.FDK_Output(iProcID, "IC CID") + "\n";
        strMsg = strMsg + "IC UTN : " + FDK_Module.FDK_Output(iProcID, "IC UTN") + "\n";
        strMsg = strMsg + "IC ATC : " + FDK_Module.FDK_Output(iProcID, "IC ATC") + "\n";
        strMsg = strMsg + "IC TVR : " + FDK_Module.FDK_Output(iProcID, "IC TVR") + "\n";
        strMsg = strMsg + "IC TTD : " + FDK_Module.FDK_Output(iProcID, "IC TTD") + "\n";
        strMsg = strMsg + "IC TST : " + FDK_Module.FDK_Output(iProcID, "IC TST") + "\n";
        strMsg = strMsg + "IC AIP : " + FDK_Module.FDK_Output(iProcID, "IC AIP") + "\n";
        strMsg = strMsg + "IC CVMR : " + FDK_Module.FDK_Output(iProcID, "IC CVMR") + "\n";
        strMsg = strMsg + "IC TC : " + FDK_Module.FDK_Output(iProcID, "IC TC") + "\n";
        strMsg = strMsg + "IC TT : " + FDK_Module.FDK_Output(iProcID, "IC TT") + "\n";
        strMsg = strMsg + "IC IFDSN : " + FDK_Module.FDK_Output(iProcID, "IC IFDSN") + "\n";
        strMsg = strMsg + "IC TSCC : " + FDK_Module.FDK_Output(iProcID, "IC TSCC") + "\n";
        strMsg = strMsg + "IC AVN : " + FDK_Module.FDK_Output(iProcID, "IC AVN") + "\n";
        strMsg = strMsg + "IC TSC : " + FDK_Module.FDK_Output(iProcID, "IC TSC") + "\n";
        strMsg = strMsg + "IC PEM : " + FDK_Module.FDK_Output(iProcID, "IC PEM") + "\n";
        strMsg = strMsg + "IC Filler : " + FDK_Module.FDK_Output(iProcID, "IC Filler") + "\n";
        strMsg = strMsg + "FS10 : " + FDK_Module.FDK_Output(iProcID, "FS10") + "\n";
        strMsg = strMsg + "H/W Model Name : " + FDK_Module.FDK_Output(iProcID, "H/W Model Name") + "\n";
        strMsg = strMsg + "FS11 : " + FDK_Module.FDK_Output(iProcID, "FS11") + "\n";
        strMsg = strMsg + "F/W Version : " + FDK_Module.FDK_Output(iProcID, "F/W Version") + "\n";
        strMsg = strMsg + "FS12 : " + FDK_Module.FDK_Output(iProcID, "FS12") + "\n";
        strMsg = strMsg + "H/W Serial Number : " + FDK_Module.FDK_Output(iProcID, "H/W Serial Number") + "\n";
        strMsg = strMsg + "FS13 : " + FDK_Module.FDK_Output(iProcID, "FS13") + "\n";
        strMsg = strMsg + "Encoding Card Number : " + FDK_Module.FDK_Output(iProcID, "Encoding Card Number") + "\n";
        strMsg = strMsg + "FS14 : " + FDK_Module.FDK_Output(iProcID, "FS14") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
        
        alert(strMsg);
    }

    return iRet;
}


function PaymentTerminal_Read_Sign_UE(strCATID, strTranSN, strCardNum, strSignData)
{
    strSignData.value = "";
    var strMsg = "SignPAD 전자서명 데이터 읽기\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Transaction Serial Number", strTranSN);
    FDK_Module.FDK_Input(iProcID, "Card Data", strCardNum);
    FDK_Module.FDK_Input(iProcID, "Msg 1", "메시지1");
    FDK_Module.FDK_Input(iProcID, "Msg 2", "메시지2");
    FDK_Module.FDK_Input(iProcID, "Msg 3", "메시지3");
    FDK_Module.FDK_Input(iProcID, "Msg 4", "메시지4");

    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Read/Sign_UE");
    if (0 == iRet)
    {
        strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strSignData.value = FDK_Module.FDK_Output(iProcID, "Compress Method") + "S1" + FDK_Module.FDK_Output(iProcID, "Hash Data") + FDK_Module.FDK_Output(iProcID, "Sign Data");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
        alert(strMsg);

	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "LCD Type : " + FDK_Module.FDK_Output(iProcID, "LCD Type") + "\n";
        strMsg = strMsg + "Define Function : " + FDK_Module.FDK_Output(iProcID, "Define Function") + "\n";
        strMsg = strMsg + "Model No : " + FDK_Module.FDK_Output(iProcID, "Model No") + "\n";
        strMsg = strMsg + "SW Version : " + FDK_Module.FDK_Output(iProcID, "SW Version") + "\n";
        strMsg = strMsg + "Compress Method : " + FDK_Module.FDK_Output(iProcID, "Compress Method") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Hash Data : " + FDK_Module.FDK_Output(iProcID, "Hash Data") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Sign Data : " + FDK_Module.FDK_Output(iProcID, "Sign Data") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
        
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
    
    return iRet;
}

function PaymentTerminal_Read_PIN_UP(strCATID, strCardNum, strPIN_encdata)
{
    strPIN_encdata.value = "";
    var strMsg = "PIN 입력 받기\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Card Data", strCardNum);
    FDK_Module.FDK_Input(iProcID, "PIN Kind", "0");
    FDK_Module.FDK_Input(iProcID, "Msg 1", "메시지1");
    FDK_Module.FDK_Input(iProcID, "Msg 2", "메시지2");

    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Read/PIN_UP");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strPIN_encdata.value = FDK_Module.FDK_Output(iProcID, "KEY Index")+ FDK_Module.FDK_Output(iProcID, "PIN Block");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
        alert(strMsg);

    if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "KEY Index : " + FDK_Module.FDK_Output(iProcID, "KEY Index") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "PIN Block : " + FDK_Module.FDK_Output(iProcID, "PIN Block") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
        strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
        
        alert(strMsg);
    }

    FDK_Module.FDK_Destroy(iProcID);
    
    return iRet;
}


function CreditICA5Auth(strCATID, strTransactionAmount, iPID_Payment_Request_E121, strSignData, strPIN_encdata,
		iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate)
{
    var strMsg = "IC 신용 승인 거래\n";
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();
    iPID_A5Auth.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Installment Period", "00");
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_Payment_Request_E121);

    if (36 < strSignData.length)
    {
    	FDK_Module.FDK_Input(iProcID, "Sign Compress Method", strSignData.substring(0, 2));
    	FDK_Module.FDK_Input(iProcID, "Sign Encryption Key", strSignData.substring(2, 4));
    	FDK_Module.FDK_Input(iProcID, "Sign MAC Value", strSignData.substring(4, 36));
    	FDK_Module.FDK_Input(iProcID, "Sign Data", strSignData.substring(36));
    }
    if (18 == strPIN_encdata.length)
    {
    	FDK_Module.FDK_Input(iProcID, "Password Encrypt Key", strPIN_encdata.substring(0, 2));
    	FDK_Module.FDK_Input(iProcID, "Password Data", strPIN_encdata.substring(2));
    }

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/CreditIC/A5Auth");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strAuthorizationNumber.value = FDK_Module.FDK_Output(iProcID, "Authorization Number");
        strAuthorizationDate.value = FDK_Module.FDK_Output(iProcID, "Authorization Date");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    	DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));
        
	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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
        iPID_A5Auth, strAuthorizationNumber, strAuthorizationDate)
{
	var strMsg = "신용 승인 거래(MSR)\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();
    iPID_A5Auth.value = iProcID;

    FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
    FDK_Module.FDK_Input(iProcID, "Installment Period", "00");
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
    FDK_Module.FDK_Input(iProcID, "@/Common/Link_ProcData", iPID_Payment_Request_E121);

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/Credit/A5Auth");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strAuthorizationNumber.value = FDK_Module.FDK_Output(iProcID, "Authorization Number");
        strAuthorizationDate.value = FDK_Module.FDK_Output(iProcID, "Authorization Date");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    	DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg);

	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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

    FDK_Module.FDK_Destroy(iProcID);
    
    return iRet;
}




//승인취소 (CAT-POS)
function CreditCancelNewCAT() 
{
	if (true == ckbCardReadRetry_E122.checked && 0 != SetCardReadRetry_E122())
        return;

    txtStateCredit.value = "";
    
    var strCardDataType = {value:""};
	var bICCard = {value:false};
	var bFallBack = {value:false};
    var iPID_CardInfo_UC = FDK_Module.FDK_Creat();
    if (0 != CardInfo_UC("2", txtCATID.value, txtTransactionAmount.value, iPID_CardInfo_UC, bICCard, strCardDataType, bFallBack))
    {
    	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
        return;
    }

    txtCATCardNum.value = FDK_Module.FDK_Output(iPID_CardInfo_UC, "Card Data");
    var strTranSN = FDK_Module.FDK_Output(iPID_CardInfo_UC, "Transaction Serial Number");

    var strSignData = {value:""};
    var strPIN_encdata = {value:""};

    if ((true == ckbCATUseSign.checked && 0 != PaymentTerminal_Read_Sign_UE(txtCATID.value, strTranSN, txtCATCardNum.value, strSignData)) ||
        (true == ckbCATUsePIN.checked && 0 != PaymentTerminal_Read_PIN_UP(txtCATID.value, txtCATCardNum.value, strPIN_encdata)))
    {
    	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
        UserCancel();
        return;
    }

    var iPID_A5Cancel = {value:0};
    
    if ((strCardDataType.value == "C") ||//입력방식 IC
            (strCardDataType.value == "S" && true == bICCard.value && true == bFallBack.value))//입력방식 MSR + IC카드번호 + FB값
    {
        txtStateCredit.value = "IC 승인취소전문";
        if (0 != CreditICA5Cancel(txtCATID.value, txtTransactionAmount.value, txtAuthorizationNumber.value, txtAuthorizationDate.value,
            strSignData, strPIN_encdata, iPID_CardInfo_UC, iPID_A5Cancel))
        {
        	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
        	FDK_Module.FDK_Destroy(iPID_A5Cancel.value);
            UserCancel();
            return;
        }
    }
    else if ((true == strCardDataType.Equals("R")) ||//입력방식 RF
        (true == strCardDataType.Equals("S") && false == bICCard))//입력방식 MSR + IC카드번호
    {
        txtStateCredit.value = "MSR 승인취소전문";
        if (0 != CreditA5Cancel(txtCATID.value, txtTransactionAmount.value, txtAuthorizationNumber.value, txtAuthorizationDate.value, iPID_CardInfo_UC, iPID_A5Cancel))
        {
        	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
        	FDK_Module.FDK_Destroy(iPID_A5Cancel.value);
            UserCancel();
            return;
        }
    }
    else
    {
    	FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
    	FDK_Module.FDK_Destroy(iPID_A5Cancel.value);
        alert("오류 : IC 입력을 진행해 주십시오.");
        UserCancel();
        return;
    }

    FDK_Module.FDK_Destroy(iPID_CardInfo_UC);
    FDK_Module.FDK_Destroy(iPID_A5Cancel.value);

    alert("승인 취소 완료");
}


function CreditICA5Cancel(strCATID, strTransactionAmount, strOriginalAuthorizationNumber, strOriginalAuthorizationDate, 
		strSignData, strPIN_encdata, iPID_Payment_Request_E121, iPID_A5Cancel)
{
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

    if (36 < strSignData.length)
    {
    	FDK_Module.FDK_Input(iProcID, "Sign Compress Method", strSignData.substring(0, 2));
    	FDK_Module.FDK_Input(iProcID, "Sign Encryption Key", strSignData.substring(2, 4));
    	FDK_Module.FDK_Input(iProcID, "Sign MAC Value", strSignData.substring(4, 36));
    	FDK_Module.FDK_Input(iProcID, "Sign Data", strSignData.substring(36));
    }
    if (18 == strPIN_encdata.length)
    {
    	FDK_Module.FDK_Input(iProcID, "Password Encrypt Key", strPIN_encdata.substring(0, 2));
    	FDK_Module.FDK_Input(iProcID, "Password Data", strPIN_encdata.substring(2));
    }

    iRet = FDK_Module.FDK_Execute(iProcID, "FDK_Server/CreditIC/A5Cancel");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    	DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));

	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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
		strOriginalAuthorizationDate,iPID_Payment_Request_E121, iPID_A5Cancel)
{
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
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    	DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg + "\n" + FDK_Module.FDK_Output(iProcID, "Response MSG 1"));


	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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


function UserCancel()
{
    var iRet = 0;
    var iProcID = FDK_Module.FDK_Creat();

    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/SYS/UserCancel");
    
    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}

//현금IC 잔액 조회 (CAT-POS)
function CashICBalanceInquiryCAT() 
{
	var strCardSerialNumber = {value:""};
	var strIssuerInstitutionCode = {value:""}; 
	var strEncryptionInfo = {value:""};
	var strCardData = {value:""};
	
    if (0 != PaymentTerminal_Read_CashIC(txtTransactionAmount.value,
            strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData))
    {
        return;
    }

    if (0 != CashICA5BalanceInquiry(txtCATID.value, strCardData.value, "C", strIssuerInstitutionCode.value, strEncryptionInfo.value, strCardSerialNumber.value, "00"))
    {
        return;
    }

    alert("현금IC 잔액 조회 정상 완료");
}


function PaymentTerminal_Read_CashIC(strTransactionAmount,  strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData)
{
	var strMsg = "현금IC 암호화 정보 요청\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();

	FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);
	FDK_Module.FDK_Input(iProcID, "Transaction Type", "00");
	if( blSupport__CashIC_MultipleAccountAttemptCount == true )
	{ // 현금IC 정보를 읽을 때 복수계좌비밀번호 시도횟수를 지원하는 버전인지 판단 [ 23.9.15.10 이후부터 지원 ]
		FDK_Module.FDK_Input(iProcID, "Multiple Account Attempt Count", "1");
	}

	iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Read/CashIC");
	if (0 == iRet)
	{
		strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
		strCardSerialNumber.value = FDK_Module.FDK_Output(iProcID, "Card Serial Number");
		strIssuerInstitutionCode.value = FDK_Module.FDK_Output(iProcID, "Issuer Institution Code");
		strEncryptionInfo.value = FDK_Module.FDK_Output(iProcID, "Encryption Info");
		strCardData.value = FDK_Module.FDK_Output(iProcID, "Card Data");
	}
	else if (-1000 == iRet)
	{
		strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
		strMsg += "\nDisplay:\n" + FDK_Module.FDK_Output(iProcID, "Display");
		
		// "Response Code"(응답코드) '9901', '9902' 일때 예외 처리가 필요할 경우 처리 
		// '9901'   | '복수계좌 비밀번호 상이'       | 비밀번호가 틀린 경우 |
		// '9902'   | '복수계좌 비밀번호 BLOCK CARD' | BLOCK 카드인 경우    |

	}
	else
	{
		strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
	}

	if(0 != iRet)
		alert(strMsg);

	if (bShowMsg && (0 == iRet || -1000 == iRet))
	{
		strMsg = "Output List :\n";
		strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
		strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
		strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
		strMsg = strMsg + "Card Serial Number : " + FDK_Module.FDK_Output(iProcID, "Card Serial Number") + "\n";
		strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
		strMsg = strMsg + "Issuer Institution Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Institution Code") + "\n";
		strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
		strMsg = strMsg + "Encryption Info : " + FDK_Module.FDK_Output(iProcID, "Encryption Info") + "\n";
		strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
		strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
		strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\r\n";
		strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\r\n";
		strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\r\n";
		strMsg = strMsg + "Display : " + FDK_Module.FDK_Output(iProcID, "Display") + "\r\n";
		strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\r\n";
		strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\r\n";
		strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\r\n";
		
		alert(strMsg);
	}

	FDK_Module.FDK_Destroy(iProcID);
	return iRet;
}


function CashICA5BalanceInquiry(strCATID, strCardData, strCardDataType, strIssuerCode, strEncryptionInfo, strCardSerialNumber, strTransactionType)
{
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
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    	DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg);

	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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


//현금IC 승인 (CAT-POS)
function CashICAuthCAT() 
{
	var strCardSerialNumber = {value:""};
	var strIssuerInstitutionCode = {value:""}; 
	var strEncryptionInfo = {value:""};
	var strCardData = {value:""};
	
    if (0 != PaymentTerminal_Read_CashIC(txtTransactionAmount.value,
            strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData))
    {
        return;
    }

    var strICTransactionUniqueNumber = {value:""};
    var strICAuthorizationDate = {value:""};
    
    if (0 != CashICA5Purchase(txtCATID.value, strCardData.value, "C", strIssuerInstitutionCode.value,
        txtTransactionAmount.value, strEncryptionInfo.value, strCardSerialNumber.value, "00", strICTransactionUniqueNumber, strICAuthorizationDate))
    {
        return;
    }

    txtAuthorizationNumber.value = strICTransactionUniqueNumber.value;
    if (8 < strICAuthorizationDate.value.length)
        txtAuthorizationDate.value = strICAuthorizationDate.value.substring(0, 8);

    alert("현금IC 승인 정상 완료");
}


function CashICA5Purchase(strCATID, strCardData, strCardDataType, strIssuerCode, strTransactionAmount, strEncryptionInfo, 
		strCardSerialNumber, strTransactionType, strICTransactionUniqueNumber, strICAuthorizationDate)
{
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
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
        strICTransactionUniqueNumber.value = FDK_Module.FDK_Output(iProcID, "IC Transaction Unique Number");
        strICAuthorizationDate.value = FDK_Module.FDK_Output(iProcID, "IC Authorization Date");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    	DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if (0 != iRet)
    	alert(strMsg);

	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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


//현금IC 승인취소 (CAT-POS)
function CashICCancelCAT() 
{
	var strCardSerialNumber = {value:""};
	var strIssuerInstitutionCode = {value:""}; 
	var strEncryptionInfo = {value:""};
	var strCardData = {value:""};
	
    if (0 != PaymentTerminal_Read_CashIC(txtTransactionAmount.value,
             strCardSerialNumber, strIssuerInstitutionCode, strEncryptionInfo, strCardData))
    {
        return;
    }

    if (0 != CashICA5Refund(txtCATID.value, strCardData.value, "C", strIssuerInstitutionCode.value,
        txtTransactionAmount.value, strEncryptionInfo.value, strCardSerialNumber.value, "00", txtAuthorizationDate.value, txtAuthorizationNumber.value))
    {
        return;
    }

    alert("현금IC 승인취소 정상 완료");
}


function CashICA5Refund(strCATID, strCardData, strCardDataType, strIssuerCode,
    strTransactionAmount, strEncryptionInfo, strCardSerialNumber, strTransactionType,
    strOriginalAuthorizationDate, strOriginalICTransactionUniqueNumber)
{
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
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    	DisplayErr(FDK_Module.FDK_Output(iProcID, "Equipment State Code"));
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }

    if(0 != iRet)
    	alert(strMsg);

	if (bShowMsg && (0 == iRet || -1000 == iRet))
    {
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



function DisplayErr(strMsg)
{
	var ErrLog = [
		{code:"000B0000", msg:"리더기 상태 정상"},
		{code:"000B8001", msg:"리더기 Tamper 오류(Integrity Check Error)"},
		{code:"000B8002", msg:"MSR Error"},
		{code:"000B8003", msg:"IC Error"},
		{code:"000B0004", msg:"MSR 읽음 이벤트"},
		{code:"000B0005", msg:"IC 읽음 이벤트"},
		{code:"000B8006", msg:"IC 거래 불가"},
		{code:"000B8007", msg:"FallBack"},
		{code:"000B8008", msg:"IC 카드 삽입되어 있음"},
		{code:"000B8009", msg:"상황에 맞지 않는 명령"},
		{code:"000B8010", msg:"MSR 요청에 정책상 불가능.(Fallback 상황이 아님)"},
		{code:"000B8011", msg:"RF Error"},
		{code:"000B8012", msg:"단말기 번호 오류 : 키 다운로드의 단말기 번호와 다르면 에러"},
		{code:"000B8013", msg:"카드 리딩 이벤트 : 금액 요청 RF"},
		{code:"000B8014", msg:"이전 RF 카드 인식중"},
		{code:"000B8015", msg:"'카드 읽기', 'IC SG' 상황에 IC 카드가 인식되지 않음"},
		{code:"000B8016", msg:"카드읽기(개선스펙)에서 '가맹점 암호화 데이터'를 요청할 때 '가맹점 키 데이터'가 없다"}
	];
	
	for(var i=0; i<ErrLog.length; i++)
	{
		if(strMsg == ErrLog[i].code)
		{
			txtResult.value = txtResult.value + ErrLog[i].msg + "\n";
		}
	}		
}





