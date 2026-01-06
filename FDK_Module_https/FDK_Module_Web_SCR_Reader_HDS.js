
// 상세 메시지 팝업 여부
var bShowResultMsgAlert = false;	
//var bShowResultMsgAlert = true;

// 카드 읽기 PID
var g_PID_CardRead = 0;
// 핀패드 읽기 PID
var g_PID_PinPadRead = 0;

//------------------------------------------------------------------------------------------------------

//핀패드 읽기 상세 결과 메시지
function SearchMultiPad_ResultMsg()
{
	strMsg = "Output List :\n";
	strMsg = strMsg + "Port : " + FDK_Module.FDK_Output(iProcID, "Port") + "\n";
	strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
	strMsg = strMsg + "Baudrate : " + FDK_Module.FDK_Output(iProcID, "Baudrate") + "\n";
	strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";

	alert(strMsg);
}


//멀티패드 찾기
function SearchMultiPad() 
{
	var strMsg;
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();
  
	txtResult.value = '';
  
	//멀티패드 연결 포트 찾기
	iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Util/SearchSignPad");
	if (iRet == 0)
	{
		strMsg = "멀티패드 찾기 완료";

		txtPortNo.value = FDK_Module.FDK_Output(iProcID, "Port");
		txtBaudrateNo.value = FDK_Module.FDK_Output(iProcID, "Baudrate");
	}
	else if (iRet == -1000)
	{
		strMsg = "실패[" + iRet + "]";	  
	}
	else
	{
		strMsg = "에러[" + iRet + "] Error:" + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
	}

	Display_SubInfo(strMsg);

	// 상세 메시지 팝업 설정시 표시
	if (bShowResultMsgAlert == true && (iRet == 0 || iRet == -1000))
	{
		SearchMultiPad_ResultMsg();
	}

	FDK_Module.FDK_Destroy(iProcID);
}

//------------------------------------------------------------------------------------------------------

// 멤버십 카드 읽기 상세 결과 메시지
function CardRead_ResultMsg()
{
	strMsg = "Output List :\r\n";
	strMsg += "STX : " + FDK_Module.FDK_Output(g_PID_CardRead, "STX") + "\r\n";
	strMsg += "Sequence Number : " + FDK_Module.FDK_Output(g_PID_CardRead, "Sequence Number") + "\r\n";
	strMsg += "Sender Index : " + FDK_Module.FDK_Output(g_PID_CardRead, "Sender Index") + "\r\n";
	strMsg += "Receiver Index : " + FDK_Module.FDK_Output(g_PID_CardRead, "Receiver Index") + "\r\n";
	strMsg += "INS : " + FDK_Module.FDK_Output(g_PID_CardRead, "INS") + "\r\n";
	strMsg += "Data Length : " + FDK_Module.FDK_Output(g_PID_CardRead, "Data Length") + "\r\n";
	strMsg += "Equipment Response Code : " + FDK_Module.FDK_Output(g_PID_CardRead, "Equipment Response Code") + "\r\n";
	strMsg += "Scheme Identifier : " + FDK_Module.FDK_Output(g_PID_CardRead, "Scheme Identifier") + "\r\n";
	strMsg += "YYYYMMDDHHMMSS : " + FDK_Module.FDK_Output(g_PID_CardRead, "YYYYMMDDHHMMSS") + "\r\n";
	strMsg += "TAG 1 : " + FDK_Module.FDK_Output(g_PID_CardRead, "TAG 1") + "\r\n";
	strMsg += "TAG 1 Len : " + FDK_Module.FDK_Output(g_PID_CardRead, "TAG 1 Len") + "\r\n";
	strMsg += "TAG 2 : " + FDK_Module.FDK_Output(g_PID_CardRead, "TAG 2") + "\r\n";
	strMsg += "TAG 2 Len : " + FDK_Module.FDK_Output(g_PID_CardRead, "TAG 2 Len") + "\r\n";
	strMsg += "TAG 2 Data : " + FDK_Module.FDK_Output(g_PID_CardRead, "TAG 2 Data") + "\r\n";
	strMsg += "TAG 3 : " + FDK_Module.FDK_Output(g_PID_CardRead, "TAG 3") + "\r\n";
	strMsg += "TAG 3 Len : " + FDK_Module.FDK_Output(g_PID_CardRead, "TAG 3 Len") + "\r\n";
	strMsg += "Dongle Card Method : " + FDK_Module.FDK_Output(g_PID_CardRead, "Dongle Card Method") + "\r\n";
	strMsg += "Dongle Card Material : " + FDK_Module.FDK_Output(g_PID_CardRead, "Dongle Card Material") + "\r\n";
	strMsg += "Card Data : " + FDK_Module.FDK_Output(g_PID_CardRead, "Card Data") + "\r\n";
	strMsg += "Dongle Transaction Type : " + FDK_Module.FDK_Output(g_PID_CardRead, "Dongle Transaction Type") + "\r\n";
	strMsg += "CVM : " + FDK_Module.FDK_Output(g_PID_CardRead, "CVM") + "\r\n";
	strMsg += "IC Transaction Unique Number : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC Transaction Unique Number") + "\r\n";
	strMsg += "IC API : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC API") + "\r\n";
	strMsg += "IC Pan Sequence Number : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC Pan Sequence Number") + "\r\n";
	strMsg += "IC IAppD : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC IAppD") + "\r\n";
	strMsg += "IC DFN : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC DFN") + "\r\n";
	strMsg += "IC ARQC : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC ARQC") + "\r\n";
	strMsg += "IC CID : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC CID") + "\r\n";
	strMsg += "IC UTN : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC UTN") + "\r\n";
	strMsg += "IC ATC : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC ATC") + "\r\n";
	strMsg += "IC TVR : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC TVR") + "\r\n";
	strMsg += "IC TTD : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC TTD") + "\r\n";
	strMsg += "IC TST : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC TST") + "\r\n";
	strMsg += "IC AIP : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC AIP") + "\r\n";
	strMsg += "IC CVMR : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC CVMR") + "\r\n";
	strMsg += "IC TC : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC TC") + "\r\n";
	strMsg += "IC TT : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC TT") + "\r\n";
	strMsg += "IC IFDSN : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC IFDSN") + "\r\n";
	strMsg += "IC TSCC : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC TSCC") + "\r\n";
	strMsg += "IC AVN : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC AVN") + "\r\n";
	strMsg += "IC TSC : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC TSC") + "\r\n";
	strMsg += "IC PEM : " + FDK_Module.FDK_Output(g_PID_CardRead, "IC PEM") + "\r\n";
	strMsg += "CRC : " + FDK_Module.FDK_Output(g_PID_CardRead, "CRC") + "\r\n";
	strMsg += "ETX : " + FDK_Module.FDK_Output(g_PID_CardRead, "ETX") + "\r\n";

	alert(strMsg);	
}


//멤버십 카드 읽기 사용자 정의 콜백 함수
function MemberShipCardRead_Callback (ret, data)
{
	var strMsg;
	var strData;

	if(ret == RET_Success)
	{
		if(g_PID_CardRead > 0)
		{
			strMsg = '멤버십 카드 읽기 성공';
			MemberShipCardRead_List_Add ( FDK_Module.FDK_Output(g_PID_CardRead, "Card Data") ); // 카드번호

			// 상세 메시지 팝업 설정시 표시
			if(bShowResultMsgAlert == true)
			{
				CardRead_ResultMsg();
			}	

			// 연속 읽기 체크시 멤버십 카드 읽기 재호출
			if (ckbCardReadRetry.checked == true)
			{
				MemberShipCardReadStart();
				return;
			}
		}
	}
	else if(ret == -1000)
	{
		strMsg = "실패[" + ret + "] Response Code : " + FDK_Module.FDK_Output(g_PID_CardRead, "Equipment Response Code");

		// 상세 메시지 팝업 설정시 표시
		if(bShowResultMsgAlert == true)
		{
			CardRead_ResultMsg();
		}		
	}
	else
	{
		if (g_PID_CardRead == 0 || ret == -3012)
		{
			return;
		}
		else
		{	
			strMsg = "에러[" + ret + "] " + FDK_Module.FDK_Output(g_PID_CardRead, "ErrorInfo");
		} 
	}

	Display_SubInfo(strMsg);		 

	FDK_Module.FDK_Destroy(g_PID_CardRead);	
	g_PID_CardRead = 0;	 
}


//멤버십 카드 읽기
function AsycMemberShipCardRead(strAuthorizationType, strCATID, strTransactionAmount)
{
    var iProcID = FDK_Module.FDK_Creat();
	g_PID_CardRead = iProcID;

	FDK_Module.FDK_Input(iProcID, "Time Out", "00");
	FDK_Module.FDK_Input(iProcID, "Msg", "RF 또는 IC 입력 대기");
	FDK_Module.FDK_Input(iProcID, "Authorization Type", strAuthorizationType);
	FDK_Module.FDK_Input(iProcID, "CAT ID", strCATID);
	FDK_Module.FDK_Input(iProcID, "Transaction Amount", strTransactionAmount);	
	FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "false");//화면에 상태창 보여주지 않음
	//FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "true");//화면에 상태창 보여줌

	FDK_Module.FDK_Execute(iProcID, "Equipment/RF/ReadCardChip_D40E_HDS", MemberShipCardRead_Callback);
}

//------------------------------------------------------------------------------------------------------

//핀패드 읽기 상세 결과 메시지
function PinPadRead_ResultMsg()
{
	strMsg = "Output List :\r\n";
	strMsg += "STX : " + FDK_Module.FDK_Output(g_PID_PinPadRead, "STX") + "\r\n";
	strMsg += "Data Length : " + FDK_Module.FDK_Output(g_PID_PinPadRead, "Data Length") + "\r\n";
	strMsg += "Command ID : " + FDK_Module.FDK_Output(g_PID_PinPadRead, "Command ID") + "\r\n";
	strMsg += "Equipment Response Code : " + FDK_Module.FDK_Output(g_PID_PinPadRead, "Equipment Response Code") + "\r\n";
	strMsg += "PIN Block : " + FDK_Module.FDK_Output(g_PID_PinPadRead, "PIN Block") + "\r\n";
	strMsg += "ETX : " + FDK_Module.FDK_Output(g_PID_PinPadRead, "ETX") + "\r\n";
	strMsg += "LRC : " + FDK_Module.FDK_Output(g_PID_PinPadRead, "LRC") + "\r\n";		

	alert(strMsg);
}


//핀패드 읽기 사용자 정의 콜백 함수
function PinPadRead_Callback (ret, data)
{
	var strMsg;
	var strPinData;
	var strData;
	 
	if(ret == RET_Success)
	{
		if(g_PID_PinPadRead > 0)
		{
			strMsg = '핀패드 읽기 성공';

			strPinData = FDK_Module.FDK_Output(g_PID_PinPadRead, "PIN Block");
			txtPinData.value = strPinData.replace(/F/gi, "");
		}
	}
	else if (ret == -1000)
	{
		strMsg = "실패[" + ret + "]\r\n" + " Response Code : ";
		strData = "";
		strData = FDK_Module.FDK_Output(g_PID_PinPadRead, "Equipment Response Code");
		strMsg = strMsg + strData;
	}
	else
	{
		if (g_PID_PinPadRead == 0 || ret == -3012)
		{
			return;
		}
		else
		{
			strMsg = "에러[" + ret + "] " + FDK_Module.FDK_Output(g_PID_PinPadRead, "ErrorInfo");
		}
	}
	
	Display_SubInfo(strMsg);	

	// 상세 메시지 팝업 설정시 표시
	if(bShowResultMsgAlert == true && (ret ==0 || ret == -1000))
	{
		PinPadRead_ResultMsg();
	}

	FDK_Module.FDK_Destroy(g_PID_PinPadRead);
	g_PID_PinPadRead = 0;
}


//핀패드 읽기
function AsycPinPadRead(strMSG)
{
	var iRet = 0;	
	var iProcID=0;

	var iProcID = FDK_Module.FDK_Creat();
	g_PID_PinPadRead = iProcID;

	FDK_Module.FDK_Input(iProcID, "Max Len", "10");
	FDK_Module.FDK_Input(iProcID, "Auto Confirm Fg", "00");
	FDK_Module.FDK_Input(iProcID, "Time Out", "00");
	FDK_Module.FDK_Input(iProcID, "Msg", "비밀번호를 입력 하세요");
	FDK_Module.FDK_Input(iProcID, "PIN Kind", "01");	
	FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "false");//화면에 상태창 보여주지 않음
	//FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "true");//화면에 상태창 보여줌

	iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/PIN/PINRequest_F7_HDS", PinPadRead_Callback);
}

//------------------------------------------------------------------------------------------------------

//핀패드 초기화 상세 결과 메시지
function MultiPadReset_ResultMsg()
{
	strMsg = "Output List :\r\n";
	strMsg += "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\r\n";
	strMsg += "Data Length : " + FDK_Module.FDK_Output(iProcID, "Data Length") + "\r\n";
	strMsg += "ACK : " + FDK_Module.FDK_Output(iProcID, "ACK") + "\r\n";
	strMsg += "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\r\n";
	strMsg += "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\r\n";
	
	alert(strMsg);	
}


//멀티패드 초기화
function MultiPadReset()
{
	var strMsg;
	var iRet = 0;
	
	var iProcID = FDK_Module.FDK_Creat();
	FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "false");//화면에 상태창 보여주지 않음
	//FDK_Module.FDK_Input(iProcID, "@/Equipment/StateView_Show", "true");//화면에 상태창 보여줌

	iRet = FDK_Module.FDK_Execute(iProcID, "Equipment/Sign/Init_A0");
	if (iRet == 0)
	{
		strMsg = "멀티패드 초기화 완료";
	}
	else if (iRet == -1000)
	{
		strMsg = "실패[" + iRet + "]";
	}
	else
	{
		strMsg = "에러[" + iRet + "] " + FDK_Module.FDK_Output(iProcID, "ErrorInfo");
	}

	Display_SubInfo(strMsg);
	
	// 상세 메시지 팝업 설정시 표시
	if(bShowResultMsgAlert == true && (iRet == 0 || iRet == -1000))
	{
		MultiPadReset_ResultMsg();
	}
	
	FDK_Module.FDK_Destroy(iProcID);
}

//------------------------------------------------------------------------------------------------------

//멤버십 카드 리스트 추가
function MemberShipCardRead_List_Add(strData)
{
	txtResult.value = txtResult.value + strData + "\n";
}


//멤버십 카드 리스트 삭제
function MemberShipCardRead_List_RemoveAll()
{
	txtResult.value = "";
}


//PID 초기화
function ClearPID()
{
	//멤버십 카드 읽기 PID 초기화
	if (g_PID_CardRead != 0)
	{
		FDK_Module.FDK_Destroy(g_PID_CardRead);
		g_PID_CardRead = 0;
	}
	//핀패드 읽기 PID 초기화
	if (g_PID_PinPadRead != 0)
	{
		FDK_Module.FDK_Destroy(g_PID_PinPadRead);
		g_PID_PinPadRead = 0;
	}
}


//상태 정보 표시
function Display_MainInfo(strText)
{
	txtMainInfo.value = "버튼 : " + strText;
}


//세부 상태 정보 표시
function Display_SubInfo(strText)
{
	txtSubInfo.value = "상태 : " + strText;
}

