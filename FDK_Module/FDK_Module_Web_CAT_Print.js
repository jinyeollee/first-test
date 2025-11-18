// 상세 메시지 팝업 여부
//var bShowMsg = false;	
var bShowMsg = true;


//보안 단말기 장치 찾기
function SearchCAT() 
{
  var strMsg = "CAT 단말기 연결 포트 찾기\n";
  var iRet = 0;
  var iProcID = FDK_Module.FDK_Creat();

  //txtResult.value = '';
  
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

// 프리스타일 프린트 커맨드
//  |  값    | 의미                                                       |
//  |--------|------------------------------------------------------------|
//  | 0x0A   | New Line                                                   |
//  | 0x0E   | Big Font(가로 2배 확대)                                    |
//  | 0x0B   | Big Font(세로 2배 확대)                                    |
//  | 0x0C   | 밑줄                                                       |
//  | 0x0D   | 초기화(직전 Control 명령 취소)                             |
//  | 0x0F   | Small Font                                                 |
//  | 0x10   | 역상                                                       |
//  | 0x11   | Pager Cut                                                  |
//  | 0x12   | 중앙정렬                                                   |
//  | 0x13   | 우측정렬                                                   |
//  | 0x14   | 좌측정렬                                                   |
//  | 0x15   | 사인 이미지                                                |
//  | 0x16   | 바코드 이미지 인쇄                                         |
//  | 0x17   | 일반 이미지                                                |
//  | 0x18   | 바코드 데이터 인쇄(code93)                                 |
//  | 0x19   | 바코드 데이터 인쇄(code39)                                 |
//  | 0x1D   | 바코드 데이터 인쇄(code128)                                |
//  | 0x1C   | 다수 이미지 인쇄                                           |
//  |--------|------------------------------------------------------------|
//  | 0x1F?? | 제어문자 확장 byte                                         |
//  |        | 0x00에서 0x1F(확장 byte 예약)까지 제외한 모든 값 사용 가능 |
//  |        | 이후 1 byte 는 제어 byte 이다. (0x20~)                     |
//  |--------|------------------------------------------------------------|
//  | 0x1F20 | 단말기 마지막 거래의 서명이미지 출력                       |
function FsTextPrint()
{
    var strMsg = "프린트 결과\n";
	var iRet = 0;
	var strRetv = Asc2Hex(FsPrinttxt.value);	
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "DATA", strRetv);
	FDK_Module.FDK_Input(iProcID, "@/PaymentTerminal/StateView_Show", "false");
	iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Print/FreeStyle_F3");
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
		alert(strMsg);
	}
	FDK_Module.FDK_Destroy(iProcID);

	return iRet;
}

function FsImagePrint(ImageFileName, FsImageAlignMode, FsImageReverseType)
{
	var strMsg = "프린트 결과\n";
	var Data = { Datas : "", Width : 0, Height : 0 };			// 이미지버퍼
	var iRet = ImageToData(ImageFileName, Data, FsImageReverseType, "1");			// HEX 이미지데이터
	if (0 != iRet) return;
	
	var xOffset = 0;
	var xMax    = 572; // 5인치 X 최대값.
	if( FsImageAlignMode == "0" )
	{ // Align : Left
		xOffset = 0;
	}
	else if( FsImageAlignMode == "1" )
	{ // Align : Center
		xOffset = Math.floor( (xMax - Data.Width) / 2 );
		if( xOffset < 0 || xOffset >= xMax ) xOffset = 0;
	}
	else
	{ // Align : Right
		xOffset = Math.floor( xMax - Data.Width );
		if( xOffset < 0 || xOffset >= xMax ) xOffset = 0;
	}
	
	var iArray = new Array();
	iArray[0] = ("00" + (Data.Width % 256).toString(16).toUpperCase()).slice(-2);					// 이미지가로 
	iArray[1] = ("00" + (Math.floor(Data.Width / 256)).toString(16).toUpperCase()).slice(-2);		// 이미지가로 
	iArray[2] = ("00" + (Data.Height % 256).toString(16).toUpperCase()).slice(-2);					// 이미지세로
	iArray[3] = ("00" + (Math.floor(Data.Height / 256)).toString(16).toUpperCase()).slice(-2);		// 이미지세로
	iArray[4] = ("00" + (xOffset % 256).toString(16).toUpperCase()).slice(-2);						// 이미지 위치 x
	iArray[5] = ("00" + (Math.floor(xOffset / 256)).toString(16).toUpperCase()).slice(-2);			// 이미지 위치 x
	
	var strImageCmd =  String.fromCharCode(0x17); // 0x17 : "";		// 일반이미지 : 이미지프린트 커맨드 0x17
	var iArrayData = iArray[0] + iArray[1] + iArray[2] + iArray[3] + iArray[4] + iArray[5];
	var strDataLength = ("0000" + (Math.ceil(Data.Datas.length / 2)).toString(10).toUpperCase()).slice(-4);		//이미지 길이 AN
	var strImageCmdLine = Asc2Hex( strImageCmd )
		+ iArrayData
		+ Asc2Hex( strDataLength );
		
	// 이미지 커맨드 : 프린트 커맨드(0x17) + Width(0xA100) + Height(0x3E00) + 위치X(0x8000) + 데이터 길이(w*h/8) + 이미지데이터
	var strImageCmdData = strImageCmdLine + Data.Datas;	
	
	strImageCmdData += "0A0A0A";         // New Line : 줄 변경
	strImageCmdData += "11";             // Cut      : 용지절단
	
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "DATA", strImageCmdData);
	FDK_Module.FDK_Input(iProcID, "@/PaymentTerminal/StateView_Show", "false");
	var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Print/FreeStyle_F3");
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
		alert(strMsg);
	}
	FDK_Module.FDK_Destroy(iProcID);
	
	return iRet;
	
}

function FsImageUpLoad(ImageFileName, FsImageReverseType)
{
	var strMsg = "프린트 결과\n";
	var Data = { Datas : "", Width : 0, Height : 0 };								// 이미지버퍼
	var iRet = ImageToData(ImageFileName, Data, FsImageReverseType, "1");							// HEX 이미지데이터
	if (0 != iRet) return;
	
	var strDataLength = ("0000" + ((Data.Datas.length / 2) + 4)).slice(-4);		// 이미지 길이 : Width(2byte) + Height(2byte) + ImageData Length
																				// Data.Datas.length / 2 : 헥사데시멀값이므로 실제 데이터는 2로 나눈값이여야함, + 4 : Width + Height, .slice(-4): 오른쪽에서 4자리 만큼만 얻어 낸다 혹시 값이 없을 수 있으므로 앞에 "0000"를 넣어 준것임.
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "Size", strDataLength);
	FDK_Module.FDK_Input(iProcID, "Width", Data.Width);
	FDK_Module.FDK_Input(iProcID, "Height", Data.Height);
	FDK_Module.FDK_Input(iProcID, "ImageData", Data.Datas);
	var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Upload/ImageUploadSingle");
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
		alert(strMsg);
	}
	FDK_Module.FDK_Destroy(iProcID);
	
	return iRet;
}

function FsUpLoadPrint(FsImageAlignMode)
{
	var strMsg = "프린트 결과\n";
	var strImageCmdLine = "";
	//var strImageCmdLine = "17000000008000303030300A0A11";
	// 이미지 커맨드 : 프린트 커맨드(0x17 == 일반 이미지 인쇄(길이가0이면 업로드 이미지인쇄) ) + Width(0x0000) + Height(0x0000) + 위치X(0x8000 == 128) + 데이터 길이(0x30303030 == "0000")
	// 이미지 길이가 0일 경우 (0000) CAT 은 저장되어 있는 이미지를 사용하여 인쇄합니다.
	
	var xUploadWidth = 128; // 업로드된 이미지의 Width 값을 미리 확인하여 설정함.
	var xOffset = 0;
	var xMax    = 572; // 5인치 X 최대값.
	if( FsImageAlignMode == "0" )
	{ // Align : Left
		xOffset = 0;
	}
	else if( FsImageAlignMode == "1" )
	{ // Align : Center
		xOffset = Math.floor( (xMax - xUploadWidth) / 2 );
		if( xOffset < 0 || xOffset >= xMax ) xOffset = 0;
	}
	else
	{ // Align : Right
		xOffset = Math.floor( xMax - xUploadWidth );
		if( xOffset < 0 || xOffset >= xMax ) xOffset = 0;
	}
	
	var nImgWidth  = 0;
	var nImgHeight = 0;
	var iArray = new Array();
	iArray[0] = ("00" + (nImgWidth % 256).toString(16).toUpperCase()).slice(-2);					// 이미지가로 // 고정 : "00"
	iArray[1] = ("00" + (Math.floor(nImgWidth / 256)).toString(16).toUpperCase()).slice(-2);		// 이미지가로 // 고정 : "00"
	iArray[2] = ("00" + (nImgHeight % 256).toString(16).toUpperCase()).slice(-2);					// 이미지세로 // 고정 : "00"
	iArray[3] = ("00" + (Math.floor(nImgHeight / 256)).toString(16).toUpperCase()).slice(-2);		// 이미지세로 // 고정 : "00"
	iArray[4] = ("00" + (xOffset % 256).toString(16).toUpperCase()).slice(-2);						// 이미지 위치 x
	iArray[5] = ("00" + (Math.floor(xOffset / 256)).toString(16).toUpperCase()).slice(-2);			// 이미지 위치 x
	
	strImageCmdLine = "17";  // 이미지 커맨드 : 프린트 커맨드(0x17)
	strImageCmdLine += iArray[0] + iArray[1] + iArray[2] + iArray[3] + iArray[4] + iArray[5];
	strImageCmdLine += "30303030"                   // 데이터 길이(0x30303030 == "0000")
	strImageCmdLine += "0A0A0A";                    // New Line : 줄 변경
	strImageCmdLine += "11";                        // Cut      : 용지절단
	
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "DATA", strImageCmdLine);
	FDK_Module.FDK_Input(iProcID, "@/PaymentTerminal/StateView_Show", "false");
	var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Print/FreeStyle_F3");
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
		alert(strMsg);
	}
	FDK_Module.FDK_Destroy(iProcID);
	
	return iRet;
}


function FsBarcodePrint(strType)
{
    var strMsg = "프린트 결과\n";	
	
	// HEX 값을 문자값으로 넣는 방법 String.fromCharCode(0x1D) 함수 사용
	var strAlignBarcodeCmd = String.fromCharCode(0x12); // 0x12 : "";   // 중앙정렬

	var strLength = ("0000" + FsBarcodetxt.value.length).slice(-4);	// 바코드데이터 길이
	
	var strBarcodeCmd = String.fromCharCode(0x1D);      // 0x1D : "";    // code128,
	if(strType == 0)
	{
		strBarcodeCmd = String.fromCharCode(0x19);      // 0x19 : "";	   // code39
	}		
	else if(strType == 1)
	{
		strBarcodeCmd = String.fromCharCode(0x18);      // 0x18 : "";   // code93
	}
	else
	{
		strBarcodeCmd = String.fromCharCode(0x1D);      // 0x1D : "";	   // code128,
	}
	
	//var strBarcodeCmdLine = strAlignBarcodeCmd + strBarcodeCmd + strLength + FsBarcodetxt.value + strBarcodeCmd;
	var strBarcodeCmdLine = strAlignBarcodeCmd + strBarcodeCmd + strLength + FsBarcodetxt.value;
	var strHexRetv = Asc2Hex(strBarcodeCmdLine);
	
	strHexRetv += "0A0A0A";         // New Line : 줄 변경
	strHexRetv += "11";             // Cut      : 용지절단

	//strHexRetv = "193030313432303138303232333031414243440A0A0A0A0A0A0A11"; // CODE-39
	//strHexRetv = "183030313432303138303232333031414243440A0A0A0A0A0A0A11"; // CODE-93
	//strHexRetv = "1D3030313432303138303232333031414243440A0A0A0A0A0A0A11"; // CODE-128
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "DATA", strHexRetv);
	FDK_Module.FDK_Input(iProcID, "@/PaymentTerminal/StateView_Show", "false");
	var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Print/FreeStyle_F3");
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
		alert(strMsg);
	}
	FDK_Module.FDK_Destroy(iProcID);
	
	return iRet;
}

function Asc2Hex(strData)
{
	var strMsg = "Asc2Hex 결과\n";
	var strRetv = "";
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "Hex", strData);
    var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Util/HexToAscii");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
		strRetv = FDK_Module.FDK_Output(iProcID, "Ascii");
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
        strMsg = strMsg + "Ascii : " + FDK_Module.FDK_Output(iProcID, "Ascii") + "\n";
    }

    FDK_Module.FDK_Destroy(iProcID);
    return strRetv;
}

// BMPFile2HEXDATA
function ImageToData(strPath, Data, ReverseType, strType)
{
	var strMsg = "ImageToData 결과\n";
	var nLoadSize = 0;  // Hex Dta Len + 4
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "BMP File", strPath);				// 파일path
	FDK_Module.FDK_Input(iProcID, "Reverse data", ReverseType);		// [Reverse data] (음양) 0 : Defalut , 1 : Reverse 
	FDK_Module.FDK_Input(iProcID, "Usage", strType);				// 1:freestyle, 2:Epson
    var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Util/BMP2Data");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
		var strValue = FDK_Module.FDK_Output(iProcID, "ImageData");
		Data.Datas = FDK_Module.FDK_Output(iProcID, "ImageData");
		Data.Width = FDK_Module.FDK_Output(iProcID, "Width");
		Data.Height = FDK_Module.FDK_Output(iProcID, "Height");
		nLoadSize   = FDK_Module.FDK_Output(iProcID, "Size");
    }
    else if (-1000 == iRet)
    {
    	strMsg += "실패[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
    }
    else
    {
    	strMsg += "에러[" + iRet + "]\nError:\n" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
    }
	
	if( nLoadSize != Data.Datas.length / 2 + 4 )
	{
		strMsg += "에러[" + iRet + "]\nError:\n" + "버퍼사이즈 보다 큰 파일이므로 모두 읽어 들이지 못하였습니다.";
		alert(strMsg);
		return -999;
	}

    if(0 != iRet)
	{
        alert(strMsg);
	}
	
	if (0 == iRet || -1000 == iRet)
    {
        strMsg = "Output List :\n";
    }

    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}


// ---------------------- 앱손 ----------------------

function EpTextPrint()
{
    var strMsg = "프린트 결과\n";
	var strRetv = Asc2Hex(EpPrinttxt.value);
	var strDoubleSizeChar = "1D2111" + Asc2Hex("Double Size Font\n") + "1D2100";    // 폰트 사이즈 1D2111 : 2배, 1D2100 : 1배
	strDoubleSizeChar += "1D2101" + Asc2Hex("H Double Size Font\n") + "1D2100";
	strDoubleSizeChar += "1D2110" + Asc2Hex("W Double Size Font\n") + "1D2100";
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "DATA", strDoubleSizeChar + strRetv);
	FDK_Module.FDK_Input(iProcID, "@/PaymentTerminal/StateView_Show", "false");
	var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Print/EpsonData_EP");
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
		alert(strMsg);
	}
	FDK_Module.FDK_Destroy(iProcID);
	
	return iRet;
}

function EpImagePrint( ImageFileName, EpImageAlignMode, EpImagePrintMode, EpImageReverseType )
{
	var strMsg = "프린트 결과\n";
	var Data = { Datas : "", Width : 0, Height : 0 };				// 이미지버퍼
	var iRet = ImageToData( ImageFileName, Data, EpImageReverseType, "2");			// HEX 이미지데이터 
	if (0 != iRet) return;
	
	//var WidthByte = Math.ceil(Data.Width / 8); // 입력받은 값은 실제 Width의 픽셀 값이므로 이미지의 Byte 값을 구하기 위해서는 아래와 같이 재 계산을 해 주어야 합니다.
	var WidthByte = Math.ceil(Data.Datas.length / 2 * 8 / Data.Height / 8 ); // WidthByte는 Width Pixel로 구하면 안되고 실제 데이터를 Height 픽셀로 나눈값으로 계산해야 함. ( Hexdecimal 값이므로 2로 나누면 Byte값, bit로 변경을 위해 8을 곱함, 높이의 픽셀(Data.Height)로 나누면 Width 의 Piexl값 Byte값으로 만들기 위해 8을 나누어 얻을 수 있습니다. )
	var iArray = new Array();
	// 확인 할 것.. .
	// 계산을 새로 해야함.
	//iArray[0] = ("00" + (Math.floor(Data.Width / 8) % 256).toString(16).toUpperCase()).slice(-2);  // 이미지가로 Byte 개수  ※가로이미지지 크기는 160고정 그외값일경우 이미지가 깨짐현상 발생
	//iArray[1] = ("00" + (Math.floor(Data.Width / 256)).toString(16).toUpperCase()).slice(-2);      // 이미지가로 Byte 개수
	iArray[0] = ("00" + (WidthByte % 256).toString(16).toUpperCase()).slice(-2);                     // 이미지가로 단위:Byte  ※가로이미지지 크기는 160고정 그외값일경우 이미지가 깨짐현상 발생
	iArray[1] = ("00" + ( Math.floor(WidthByte / 256) ).toString(16).toUpperCase()).slice(-2);       // 이미지가로 단위:Byte
	iArray[2] = ("00" + (Data.Height % 256).toString(16).toUpperCase()).slice(-2);                   // 이미지세로 단위:Pixel
	iArray[3] = ("00" + (Math.floor(Data.Height / 256)).toString(16).toUpperCase()).slice(-2);       // 이미지세로 단위:Pixel
	//var strAlignImageCmd = String.fromCharCode(0x1B, 0x61, 0x31); // 0x1B 0x61 0x31 : "a1";     // 0:Left, 1:Center, 2: Right  // "a";  // 중앙정렬
	var strAlignImageCmd = String.fromCharCode(0x1B, 0x61); // 0x1B 0x61 0x31 : "a1";   // 0:Left, 1:Center, 2: Right  // "a";  // 중앙정렬
		strAlignImageCmd += EpImageAlignMode;               // Align => '0'(0x30) : Left, '1'(0x31):Center, '2'(0x32):Right
	
	//var strImageCmd      = String.fromCharCode(0x1D, 0x76, 0x30, 0x30); // 0x1B 0x61 0x30 0x30 : "v00";					// 이미지프린트 커맨드
	var strImageCmd      = String.fromCharCode(0x1D, 0x76, 0x30); // 0x1B 0x61 0x30 0x30 : "v00";					// 이미지프린트 커맨드
		strImageCmd     += EpImagePrintMode;                 // '0'(0x30) : Normal, '1'(0x31):가로2배확대, '2'(0x32):세로2배확대, '3'(0x33): 가로/세로 2배 확대
	var iArrayData       = iArray[0] + iArray[1] + iArray[2] + iArray[3];
	var strImageCmdLine  = Asc2Hex( strAlignImageCmd + strImageCmd ) + iArrayData;
	var strImageCmdData = strImageCmdLine + Data.Datas;	
	
	strImageCmdData += "0A0A0A0A0A0A0A0A0A0A0A0A";   // New Line : 줄 변경
	strImageCmdData += "1B69";                       // 0x1B 0x69 : i // Cut      : 용지절단
	
	
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "DATA", strImageCmdData);
	FDK_Module.FDK_Input(iProcID, "@/PaymentTerminal/StateView_Show", "false");
	var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Print/EpsonData_EP");
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
		alert(strMsg);
	}
	FDK_Module.FDK_Destroy(iProcID);
	
	return iRet;
	
}

function EpBarcodePrint(strType, bPrintBarcodeText = true)
{
    var strMsg = "프린트 결과\n";
	var strAlignBarcodeCmd      = String.fromCharCode(0x1B, 0x61, 0x31); // 0x1B 0x61 0x31 : "a1";   // 0:Left, 1:Center, 2: Right
	//var strPositionBarcodeCmd = String.fromCharCode(0x1D, 0x48, 0x32); // 0x1D 0x48 0x32 : "H2";    // 출력포지션 // 아래의 바코드 텍스트값 출력됨. 
	var strPositionBarcodeCmd   = String.fromCharCode(0x1D, 0x48, 0x30); // 0x1D 0x48 0x30 : "H0";    // 출력포지션 // 아래의 바콛 텍스트값 출력 안함.
	var strHeightBarcodeCmd     = String.fromCharCode(0x1D, 0x68, 0x40); // 0x1D 0x68 0x40 : "h@";    // 바코드높이 : Set bar code height, 1 <= n <= 255
	var strWidthBarcodeCmd      = String.fromCharCode(0x1D, 0x77, 0x02); // 0x1D 0x77 0x02 : "w";  // 바코드길이 : Set bar code width, 2 <= n <= 6
	var strLength = ("00" + FsBarcodetxt.value.length.toString(16).toUpperCase()).slice(-2);
	var strBarcodeCmd = String.fromCharCode(0x1D, 0x6B, 0x49 /*73*/ ); // 0x1D 0x6B 0x49 : "kI";				// code128
	if(strType == 0)
	{
		strBarcodeCmd = String.fromCharCode(0x1D, 0x6B, 0x45 /*69*/ ); // 0x1D 0x6B 0x45 : "kE";				// code39
	}		
	else if(strType == 1)
	{
		strBarcodeCmd = String.fromCharCode(0x1D, 0x6B, 0x48 /*72*/ ); // 0x1D 0x6B 0x48 : "kH";				// code93
	}
	else
	{
		strBarcodeCmd = String.fromCharCode(0x1D, 0x6B, 0x49 /*73*/ ); // 0x1D 0x6B 0x49 : "kI";				// code128
	}
	
	if( bPrintBarcodeText == true ) {
		//strPositionBarcodeCmd = "H2";
		//strPositionBarcodeCmd  = String.fromCharCode(0x1D);  // 0x1D : 
		//strPositionBarcodeCmd += String.fromCharCode(0x48);  // 0x48 : H    Select Print Position
		//strPositionBarcodeCmd += String.fromCharCode(0x32);  // 0x32 : 2    0:Not Printed, 1:Above the bar code, 2:Below the bar code, 3:Both above and below the bar code
		
		strPositionBarcodeCmd    = String.fromCharCode(0x1D, 0x48, 0x32); // 0x1D 0x48 0x32 : "H2";	// 출력포지션 // 아래의 바코드 텍스트값 출력됨.
		
	} else{
		//strPositionBarcodeCmd = "H0";
		//strPositionBarcodeCmd  = String.fromCharCode(0x1D);  // 0x1D : 
		//strPositionBarcodeCmd += String.fromCharCode(0x48);  // 0x48 : H    Select Print Position
		//strPositionBarcodeCmd += String.fromCharCode(0x30);  // 0x30 : 0    0:Not Printed, 1:Above the bar code, 2:Below the bar code, 3:Both above and below the bar code
		
		strPositionBarcodeCmd    = String.fromCharCode(0x1D, 0x48, 0x30); // 0x1D 0x48 0x30 : "H0";		// 출력포지션 // 아래의 바콛 텍스트값 출력 안함.
		
	}
	
	var strBarcodeCmdLine = strAlignBarcodeCmd
		+ strPositionBarcodeCmd
		+ strHeightBarcodeCmd
		+ strWidthBarcodeCmd
		+ strBarcodeCmd;
	var strHexRetv = Asc2Hex(strBarcodeCmdLine) + strLength + Asc2Hex(FsBarcodetxt.value);
	
	strHexRetv    += "0A0A0A0A0A0A0A0A0A0A0A0A";   // New Line : 줄 변경
	strHexRetv    += "1B69";                       // 0x1B 0x69 : i // Cut      : 용지절단
	
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "DATA", strHexRetv);
	FDK_Module.FDK_Input(iProcID, "@/PaymentTerminal/StateView_Show", "false");
	var iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/Print/EpsonData_EP");
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
		alert(strMsg);
	}
	FDK_Module.FDK_Destroy(iProcID);
	
	return iRet;
}