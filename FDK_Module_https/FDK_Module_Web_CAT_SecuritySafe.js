// 상세 메시지 팝업 여부
//var bShowMsg = false;	
var bShowMsg = true;


///////////////	보안 단말기 POS 연동형 ///////////////



//보안 단말기 장치 찾기
function SearchCAT() 
{
  var strMsg = "CAT 단말기 연결 포트 찾기\n";
  var iRet = 0;
  var iProcID = FDK_Module.FDK_Creat();

  //txtResult.value = '';
  
  txtResultText.value = "";
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
  {
	  alert(strMsg);
	  txtResultText.value = strMsg;
  }
  else
  {
	  alert("보안 단말기 찾기 완료");
  }
    
  if (bShowMsg && (0 == iRet || -1000 == iRet))
  {
      strMsg = "Output List :\n";
      strMsg = strMsg + "Port : " + FDK_Module.FDK_Output(iProcID, "Port") + "\n";
      strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
      strMsg = strMsg + "Baudrate : " + FDK_Module.FDK_Output(iProcID, "Baudrate") + "\n";
      strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
  
      alert(strMsg);
	  txtResultText.value = strMsg;
  }
  
  FDK_Module.FDK_Destroy(iProcID);  
}

//신용 승인
function CreditAuth(BusinessNumber, TransactionAmount, TaxAmount, TaxableAmount, NonTaxableAmount)
{
	var strMsg = "신용승인 결과\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();

	FDK_Module.FDK_Input(iProcID, "Business Number"   , BusinessNumber   );
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", TransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Tax Amount"        , TaxAmount        );
    FDK_Module.FDK_Input(iProcID, "Taxable Amount"    , TaxableAmount    );
    FDK_Module.FDK_Input(iProcID, "Non-Taxable Amount", NonTaxableAmount );
	
	txtResultText.value = "";
    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/SecuritySafe_Tell/CreditAuth_D6");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
		txtAuthorizationDate.value = FDK_Module.FDK_Output(iProcID, "Authorization Date");
		txtAuthorizationNumber.value = FDK_Module.FDK_Output(iProcID, "Authorization Number");
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
	{
        alert(strMsg);
		txtResultText.value = strMsg;
	}

	if (0 == iRet || -1000 == iRet)
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Business Number : " + FDK_Module.FDK_Output(iProcID, "Business Number") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Installment Period : " + FDK_Module.FDK_Output(iProcID, "Installment Period") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Authorization Date") + "\n";
        strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\n";
		strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
		strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\n";
		strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
		strMsg = strMsg + "FS8 : " + FDK_Module.FDK_Output(iProcID, "FS8") + "\n";
		strMsg = strMsg + "Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Authorization Number") + "\n";
		strMsg = strMsg + "FS9 : " + FDK_Module.FDK_Output(iProcID, "FS9") + "\n";
		strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
		strMsg = strMsg + "FS10 : " + FDK_Module.FDK_Output(iProcID, "FS10") + "\n";
		strMsg = strMsg + "Merchant Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Number") + "\n";
		strMsg = strMsg + "FS11 : " + FDK_Module.FDK_Output(iProcID, "FS11") + "\n";
		strMsg = strMsg + "DDC Flag : " + FDK_Module.FDK_Output(iProcID, "DDC Flag") + "\n";
		strMsg = strMsg + "FS12 : " + FDK_Module.FDK_Output(iProcID, "FS12") + "\n";
		strMsg = strMsg + "Notice : " + FDK_Module.FDK_Output(iProcID, "Notice") + "\n";
		strMsg = strMsg + "FS13 : " + FDK_Module.FDK_Output(iProcID, "FS13") + "\n";
		strMsg = strMsg + "Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Acquirer Code") + "\n";
		strMsg = strMsg + "FS14 : " + FDK_Module.FDK_Output(iProcID, "FS14") + "\n";
		strMsg = strMsg + "Display : " + FDK_Module.FDK_Output(iProcID, "Display") + "\n";
		strMsg = strMsg + "FS15 : " + FDK_Module.FDK_Output(iProcID, "FS15") + "\n";
		strMsg = strMsg + "Point Customer Name : " + FDK_Module.FDK_Output(iProcID, "Point Customer Name") + "\n";
		strMsg = strMsg + "FS16 : " + FDK_Module.FDK_Output(iProcID, "FS16") + "\n";
		strMsg = strMsg + "Point Title Type : " + FDK_Module.FDK_Output(iProcID, "Point Title Type") + "\n";
		strMsg = strMsg + "FS17 : " + FDK_Module.FDK_Output(iProcID, "FS17") + "\n";
		strMsg = strMsg + "Point Add : " + FDK_Module.FDK_Output(iProcID, "Point Add") + "\n";
		strMsg = strMsg + "FS18 : " + FDK_Module.FDK_Output(iProcID, "FS18") + "\n";
		strMsg = strMsg + "Point Usable : " + FDK_Module.FDK_Output(iProcID, "Point Usable") + "\n";
		strMsg = strMsg + "FS19 : " + FDK_Module.FDK_Output(iProcID, "FS19") + "\n";
		strMsg = strMsg + "Point Save : " + FDK_Module.FDK_Output(iProcID, "Point Save") + "\n";
		strMsg = strMsg + "FS20 : " + FDK_Module.FDK_Output(iProcID, "FS20") + "\n";
		strMsg = strMsg + "Point Merchant : " + FDK_Module.FDK_Output(iProcID, "Point Merchant") + "\n";
		strMsg = strMsg + "FS21 : " + FDK_Module.FDK_Output(iProcID, "FS21") + "\n";
		strMsg = strMsg + "Notification : " + FDK_Module.FDK_Output(iProcID, "Notification") + "\n";
		strMsg = strMsg + "FS22 : " + FDK_Module.FDK_Output(iProcID, "FS22") + "\n";
		strMsg = strMsg + "Cash Receipt Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Cash Receipt Authorization Number") + "\n";
		strMsg = strMsg + "FS23 : " + FDK_Module.FDK_Output(iProcID, "FS23") + "\n";
		strMsg = strMsg + "Cash Receipt Notice : " + FDK_Module.FDK_Output(iProcID, "Cash Receipt Notice") + "\n";
		strMsg = strMsg + "FS24 : " + FDK_Module.FDK_Output(iProcID, "FS24") + "\n";
		strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
		strMsg = strMsg + "FS25 : " + FDK_Module.FDK_Output(iProcID, "FS25") + "\n";
		strMsg = strMsg + "Issuer Name : " + FDK_Module.FDK_Output(iProcID, "Issuer Name") + "\n";
		strMsg = strMsg + "FS26 : " + FDK_Module.FDK_Output(iProcID, "FS26") + "\n";
		strMsg = strMsg + "Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Acquirer Name") + "\n";
		strMsg = strMsg + "FS27 : " + FDK_Module.FDK_Output(iProcID, "FS27") + "\n";
		strMsg = strMsg + "Sign Compress Method : " + FDK_Module.FDK_Output(iProcID, "Sign Compress Method") + "\n";
		strMsg = strMsg + "FS28 : " + FDK_Module.FDK_Output(iProcID, "FS28") + "\n";
		strMsg = strMsg + "Sign MAC Value : " + FDK_Module.FDK_Output(iProcID, "Sign MAC Value") + "\n";
		strMsg = strMsg + "FS29 : " + FDK_Module.FDK_Output(iProcID, "FS29") + "\n";
		strMsg = strMsg + "Sign Data : " + FDK_Module.FDK_Output(iProcID, "Sign Data") + "\n";
		strMsg = strMsg + "FS30 : " + FDK_Module.FDK_Output(iProcID, "FS30") + "\n";
		strMsg = strMsg + "Sign Image Create Key : " + FDK_Module.FDK_Output(iProcID, "Sign Image Create Key") + "\n";
		strMsg = strMsg + "FS31 : " + FDK_Module.FDK_Output(iProcID, "FS31") + "\n";
		strMsg = strMsg + "Check Card Flag : " + FDK_Module.FDK_Output(iProcID, "Check Card Flag") + "\n";
		strMsg = strMsg + "FS32 : " + FDK_Module.FDK_Output(iProcID, "FS32") + "\n";
		strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
		strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
		
        alert(strMsg);
		txtResultText.value = strMsg;
    }

    FDK_Module.FDK_Destroy(iProcID);
    
    return iRet;
}

//신용 승인취소
function CreditCancel(BusinessNumber, TransactionAmount, TaxAmount, TaxableAmount, NonTaxableAmount, OrgAuthNumber, OrgAuthDate8 )
{
	var strMsg = "신용취소 결과\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();
	
	FDK_Module.FDK_Input(iProcID, "Business Number"              , BusinessNumber   );
    FDK_Module.FDK_Input(iProcID, "Transaction Amount"           , TransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Tax Amount"                   , TaxAmount        );
    FDK_Module.FDK_Input(iProcID, "Taxable Amount"               , TaxableAmount    );
    FDK_Module.FDK_Input(iProcID, "Non-Taxable Amount"           , NonTaxableAmount );
    FDK_Module.FDK_Input(iProcID, "Original Authorization Number", OrgAuthNumber    );
    FDK_Module.FDK_Input(iProcID, "Original Authorization Date"  , OrgAuthDate8     );
	
	txtResultText.value = "";
    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/SecuritySafe_Tell/CreditCancel_D7");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
		txtAuthorizationDate.value = "";
		txtAuthorizationNumber.value = "";
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
	{
        alert(strMsg);
		txtResultText.value = strMsg;
	}

	if (0 == iRet || -1000 == iRet)
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Business Number : " + FDK_Module.FDK_Output(iProcID, "Business Number") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Installment Period : " + FDK_Module.FDK_Output(iProcID, "Installment Period") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Authorization Date") + "\n";
        strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\n";
		strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
		strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\n";
		strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
		strMsg = strMsg + "FS8 : " + FDK_Module.FDK_Output(iProcID, "FS8") + "\n";
		strMsg = strMsg + "Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Authorization Number") + "\n";
		strMsg = strMsg + "FS9 : " + FDK_Module.FDK_Output(iProcID, "FS9") + "\n";
		strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
		strMsg = strMsg + "FS10 : " + FDK_Module.FDK_Output(iProcID, "FS10") + "\n";
		strMsg = strMsg + "Merchant Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Number") + "\n";
		strMsg = strMsg + "FS11 : " + FDK_Module.FDK_Output(iProcID, "FS11") + "\n";
		strMsg = strMsg + "DDC Flag : " + FDK_Module.FDK_Output(iProcID, "DDC Flag") + "\n";
		strMsg = strMsg + "FS12 : " + FDK_Module.FDK_Output(iProcID, "FS12") + "\n";
		strMsg = strMsg + "Notice : " + FDK_Module.FDK_Output(iProcID, "Notice") + "\n";
		strMsg = strMsg + "FS13 : " + FDK_Module.FDK_Output(iProcID, "FS13") + "\n";
		strMsg = strMsg + "Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Acquirer Code") + "\n";
		strMsg = strMsg + "FS14 : " + FDK_Module.FDK_Output(iProcID, "FS14") + "\n";
		strMsg = strMsg + "Display : " + FDK_Module.FDK_Output(iProcID, "Display") + "\n";
		strMsg = strMsg + "FS15 : " + FDK_Module.FDK_Output(iProcID, "FS15") + "\n";
		strMsg = strMsg + "Point Customer Name : " + FDK_Module.FDK_Output(iProcID, "Point Customer Name") + "\n";
		strMsg = strMsg + "FS16 : " + FDK_Module.FDK_Output(iProcID, "FS16") + "\n";
		strMsg = strMsg + "Point Title Type : " + FDK_Module.FDK_Output(iProcID, "Point Title Type") + "\n";
		strMsg = strMsg + "FS17 : " + FDK_Module.FDK_Output(iProcID, "FS17") + "\n";
		strMsg = strMsg + "Point Add : " + FDK_Module.FDK_Output(iProcID, "Point Add") + "\n";
		strMsg = strMsg + "FS18 : " + FDK_Module.FDK_Output(iProcID, "FS18") + "\n";
		strMsg = strMsg + "Point Usable : " + FDK_Module.FDK_Output(iProcID, "Point Usable") + "\n";
		strMsg = strMsg + "FS19 : " + FDK_Module.FDK_Output(iProcID, "FS19") + "\n";
		strMsg = strMsg + "Point Save : " + FDK_Module.FDK_Output(iProcID, "Point Save") + "\n";
		strMsg = strMsg + "FS20 : " + FDK_Module.FDK_Output(iProcID, "FS20") + "\n";
		strMsg = strMsg + "Point Merchant : " + FDK_Module.FDK_Output(iProcID, "Point Merchant") + "\n";
		strMsg = strMsg + "FS21 : " + FDK_Module.FDK_Output(iProcID, "FS21") + "\n";
		strMsg = strMsg + "Notification : " + FDK_Module.FDK_Output(iProcID, "Notification") + "\n";
		strMsg = strMsg + "FS22 : " + FDK_Module.FDK_Output(iProcID, "FS22") + "\n";
		strMsg = strMsg + "Cash Receipt Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Cash Receipt Authorization Number") + "\n";
		strMsg = strMsg + "FS23 : " + FDK_Module.FDK_Output(iProcID, "FS23") + "\n";
		strMsg = strMsg + "Cash Receipt Notice : " + FDK_Module.FDK_Output(iProcID, "Cash Receipt Notice") + "\n";
		strMsg = strMsg + "FS24 : " + FDK_Module.FDK_Output(iProcID, "FS24") + "\n";
		strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
		strMsg = strMsg + "FS25 : " + FDK_Module.FDK_Output(iProcID, "FS25") + "\n";
		strMsg = strMsg + "Issuer Name : " + FDK_Module.FDK_Output(iProcID, "Issuer Name") + "\n";
		strMsg = strMsg + "FS26 : " + FDK_Module.FDK_Output(iProcID, "FS26") + "\n";
		strMsg = strMsg + "Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Acquirer Name") + "\n";
		strMsg = strMsg + "FS27 : " + FDK_Module.FDK_Output(iProcID, "FS27") + "\n";
		strMsg = strMsg + "Sign Compress Method : " + FDK_Module.FDK_Output(iProcID, "Sign Compress Method") + "\n";
		strMsg = strMsg + "FS28 : " + FDK_Module.FDK_Output(iProcID, "FS28") + "\n";
		strMsg = strMsg + "Sign MAC Value : " + FDK_Module.FDK_Output(iProcID, "Sign MAC Value") + "\n";
		strMsg = strMsg + "FS29 : " + FDK_Module.FDK_Output(iProcID, "FS29") + "\n";
		strMsg = strMsg + "Sign Data : " + FDK_Module.FDK_Output(iProcID, "Sign Data") + "\n";
		strMsg = strMsg + "FS30 : " + FDK_Module.FDK_Output(iProcID, "FS30") + "\n";
		strMsg = strMsg + "Sign Image Create Key : " + FDK_Module.FDK_Output(iProcID, "Sign Image Create Key") + "\n";
		strMsg = strMsg + "FS31 : " + FDK_Module.FDK_Output(iProcID, "FS31") + "\n";
		strMsg = strMsg + "Check Card Flag : " + FDK_Module.FDK_Output(iProcID, "Check Card Flag") + "\n";
		strMsg = strMsg + "FS32 : " + FDK_Module.FDK_Output(iProcID, "FS32") + "\n";
		strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
		strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
		
        alert(strMsg);
		txtResultText.value = strMsg;
    }

    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}


//현금영수증 승인
function CashBillAuth( CashTransactionType, BusinessNumber, TransactionAmount, TaxAmount, TaxableAmount, NonTaxableAmount ) 
{
	var strMsg = "현금영수증승인 결과\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();
	
	FDK_Module.FDK_Input(iProcID, "Business Number"   , BusinessNumber      );
    //FDK_Module.FDK_Input(iProcID, "Transaction Type", "00");
	FDK_Module.FDK_Input(iProcID, "Transaction Type"  , CashTransactionType );
	
    FDK_Module.FDK_Input(iProcID, "Transaction Amount", TransactionAmount   );
    FDK_Module.FDK_Input(iProcID, "Tax Amount"        , TaxAmount           );
    FDK_Module.FDK_Input(iProcID, "Taxable Amount"    , TaxableAmount       );
    FDK_Module.FDK_Input(iProcID, "Non-Taxable Amount", NonTaxableAmount    );
	
	txtResultText.value = "";
    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/SecuritySafe_Tell/CashReceiptAuth_K6");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
		txtAuthorizationDate.value = FDK_Module.FDK_Output(iProcID, "Authorization Date");
		txtAuthorizationNumber.value = FDK_Module.FDK_Output(iProcID, "Authorization Number");
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
	{
        alert(strMsg);
		txtResultText.value = strMsg;
	}

	if (0 == iRet || -1000 == iRet)
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Business Number : " + FDK_Module.FDK_Output(iProcID, "Business Number") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Installment Period : " + FDK_Module.FDK_Output(iProcID, "Installment Period") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Authorization Date") + "\n";
        strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\n";
		strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
		strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\n";
		strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
		strMsg = strMsg + "FS8 : " + FDK_Module.FDK_Output(iProcID, "FS8") + "\n";
		strMsg = strMsg + "Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Authorization Number") + "\n";
		strMsg = strMsg + "FS9 : " + FDK_Module.FDK_Output(iProcID, "FS9") + "\n";
		strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
		strMsg = strMsg + "FS10 : " + FDK_Module.FDK_Output(iProcID, "FS10") + "\n";
		strMsg = strMsg + "Merchant Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Number") + "\n";
		strMsg = strMsg + "FS11 : " + FDK_Module.FDK_Output(iProcID, "FS11") + "\n";
		strMsg = strMsg + "DDC Flag : " + FDK_Module.FDK_Output(iProcID, "DDC Flag") + "\n";
		strMsg = strMsg + "FS12 : " + FDK_Module.FDK_Output(iProcID, "FS12") + "\n";
		strMsg = strMsg + "Notice : " + FDK_Module.FDK_Output(iProcID, "Notice") + "\n";
		strMsg = strMsg + "FS13 : " + FDK_Module.FDK_Output(iProcID, "FS13") + "\n";
		strMsg = strMsg + "Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Acquirer Code") + "\n";
		strMsg = strMsg + "FS14 : " + FDK_Module.FDK_Output(iProcID, "FS14") + "\n";
		strMsg = strMsg + "Display : " + FDK_Module.FDK_Output(iProcID, "Display") + "\n";
		strMsg = strMsg + "FS15 : " + FDK_Module.FDK_Output(iProcID, "FS15") + "\n";
		strMsg = strMsg + "Point Customer Name : " + FDK_Module.FDK_Output(iProcID, "Point Customer Name") + "\n";
		strMsg = strMsg + "FS16 : " + FDK_Module.FDK_Output(iProcID, "FS16") + "\n";
		strMsg = strMsg + "Point Title Type : " + FDK_Module.FDK_Output(iProcID, "Point Title Type") + "\n";
		strMsg = strMsg + "FS17 : " + FDK_Module.FDK_Output(iProcID, "FS17") + "\n";
		strMsg = strMsg + "Point Add : " + FDK_Module.FDK_Output(iProcID, "Point Add") + "\n";
		strMsg = strMsg + "FS18 : " + FDK_Module.FDK_Output(iProcID, "FS18") + "\n";
		strMsg = strMsg + "Point Usable : " + FDK_Module.FDK_Output(iProcID, "Point Usable") + "\n";
		strMsg = strMsg + "FS19 : " + FDK_Module.FDK_Output(iProcID, "FS19") + "\n";
		strMsg = strMsg + "Point Save : " + FDK_Module.FDK_Output(iProcID, "Point Save") + "\n";
		strMsg = strMsg + "FS20 : " + FDK_Module.FDK_Output(iProcID, "FS20") + "\n";
		strMsg = strMsg + "Point Merchant : " + FDK_Module.FDK_Output(iProcID, "Point Merchant") + "\n";
		strMsg = strMsg + "FS21 : " + FDK_Module.FDK_Output(iProcID, "FS21") + "\n";
		strMsg = strMsg + "Notification : " + FDK_Module.FDK_Output(iProcID, "Notification") + "\n";
		strMsg = strMsg + "FS22 : " + FDK_Module.FDK_Output(iProcID, "FS22") + "\n";
		strMsg = strMsg + "Cash Receipt Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Cash Receipt Authorization Number") + "\n";
		strMsg = strMsg + "FS23 : " + FDK_Module.FDK_Output(iProcID, "FS23") + "\n";
		strMsg = strMsg + "Cash Receipt Notice : " + FDK_Module.FDK_Output(iProcID, "Cash Receipt Notice") + "\n";
		strMsg = strMsg + "FS24 : " + FDK_Module.FDK_Output(iProcID, "FS24") + "\n";
		strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
		strMsg = strMsg + "FS25 : " + FDK_Module.FDK_Output(iProcID, "FS25") + "\n";
		strMsg = strMsg + "Issuer Name : " + FDK_Module.FDK_Output(iProcID, "Issuer Name") + "\n";
		strMsg = strMsg + "FS26 : " + FDK_Module.FDK_Output(iProcID, "FS26") + "\n";
		strMsg = strMsg + "Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Acquirer Name") + "\n";
		strMsg = strMsg + "FS27 : " + FDK_Module.FDK_Output(iProcID, "FS27") + "\n";
		strMsg = strMsg + "Sign Compress Method : " + FDK_Module.FDK_Output(iProcID, "Sign Compress Method") + "\n";
		strMsg = strMsg + "FS28 : " + FDK_Module.FDK_Output(iProcID, "FS28") + "\n";
		strMsg = strMsg + "Sign MAC Value : " + FDK_Module.FDK_Output(iProcID, "Sign MAC Value") + "\n";
		strMsg = strMsg + "FS29 : " + FDK_Module.FDK_Output(iProcID, "FS29") + "\n";
		strMsg = strMsg + "Sign Data : " + FDK_Module.FDK_Output(iProcID, "Sign Data") + "\n";
		strMsg = strMsg + "FS30 : " + FDK_Module.FDK_Output(iProcID, "FS30") + "\n";
		strMsg = strMsg + "Sign Image Create Key : " + FDK_Module.FDK_Output(iProcID, "Sign Image Create Key") + "\n";
		strMsg = strMsg + "FS31 : " + FDK_Module.FDK_Output(iProcID, "FS31") + "\n";
		strMsg = strMsg + "Check Card Flag : " + FDK_Module.FDK_Output(iProcID, "Check Card Flag") + "\n";
		strMsg = strMsg + "FS32 : " + FDK_Module.FDK_Output(iProcID, "FS32") + "\n";
		strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
		strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
		
        alert(strMsg);
		txtResultText.value = strMsg;
    }

    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}

//현금영수증 승인취소
function CashBillCancel( CashTransactionType, BusinessNumber, TransactionAmount, TaxAmount, TaxableAmount, NonTaxableAmount, OrgAuthNumber, OrgAuthDate8 ) 
{
    var strMsg = "현금영수증취소 결과\n";
	var iRet = 0;
	var iProcID = FDK_Module.FDK_Creat();
	
	FDK_Module.FDK_Input(iProcID, "Business Number"              , BusinessNumber     );
	//FDK_Module.FDK_Input(iProcID, "Transaction Type", "00");	// 거래종유 00:소비자소득공제, 01:사업자지출증빙, 99:자진발급제도
	FDK_Module.FDK_Input(iProcID, "Transaction Type"             , CashTransactionType);	// 거래종유 00:소비자소득공제, 01:사업자지출증빙, 99:자진발급제도
	
    FDK_Module.FDK_Input(iProcID, "Transaction Amount"           , TransactionAmount);
    FDK_Module.FDK_Input(iProcID, "Tax Amount"                   , TaxAmount        );
    FDK_Module.FDK_Input(iProcID, "Taxable Amount"               , TaxableAmount    );
    FDK_Module.FDK_Input(iProcID, "Non-Taxable Amount"           , NonTaxableAmount );
	
    FDK_Module.FDK_Input(iProcID, "Original Authorization Number", OrgAuthNumber    );
    FDK_Module.FDK_Input(iProcID, "Original Authorization Date"  , OrgAuthDate8     );
	FDK_Module.FDK_Input(iProcID, "Cancel Reason"                , "1");	// 취소사유 1:거래취소, 2:오류발급, 3:기타
	
	txtResultText.value = "";
    iRet = FDK_Module.FDK_Execute(iProcID, "PaymentTerminal/SecuritySafe_Tell/CashReceiptCancel_K7");
    if (0 == iRet)
    {
    	strMsg += "성공[" + iRet + "]\nResponse Code:\n" + FDK_Module.FDK_Output(iProcID, "Response Code");
		//txtAuthorizationDate.value = "";
		//txtAuthorizationNumber.value = "";
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
	{
        alert(strMsg);
		txtResultText.value = strMsg;
	}

	if (0 == iRet || -1000 == iRet)
    {
        strMsg = "Output List :\n";
        strMsg = strMsg + "STX : " + FDK_Module.FDK_Output(iProcID, "STX") + "\n";
        strMsg = strMsg + "Work Type : " + FDK_Module.FDK_Output(iProcID, "Work Type") + "\n";
        strMsg = strMsg + "FS1 : " + FDK_Module.FDK_Output(iProcID, "FS1") + "\n";
        strMsg = strMsg + "Business Number : " + FDK_Module.FDK_Output(iProcID, "Business Number") + "\n";
        strMsg = strMsg + "FS2 : " + FDK_Module.FDK_Output(iProcID, "FS2") + "\n";
        strMsg = strMsg + "Response Code : " + FDK_Module.FDK_Output(iProcID, "Response Code") + "\n";
        strMsg = strMsg + "FS3 : " + FDK_Module.FDK_Output(iProcID, "FS3") + "\n";
        strMsg = strMsg + "Card Data : " + FDK_Module.FDK_Output(iProcID, "Card Data") + "\n";
        strMsg = strMsg + "FS4 : " + FDK_Module.FDK_Output(iProcID, "FS4") + "\n";
        strMsg = strMsg + "Installment Period : " + FDK_Module.FDK_Output(iProcID, "Installment Period") + "\n";
        strMsg = strMsg + "FS5 : " + FDK_Module.FDK_Output(iProcID, "FS5") + "\n";
        strMsg = strMsg + "Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Authorization Date") + "\n";
        strMsg = strMsg + "FS6 : " + FDK_Module.FDK_Output(iProcID, "FS6") + "\n";
		strMsg = strMsg + "Original Authorization Date : " + FDK_Module.FDK_Output(iProcID, "Original Authorization Date") + "\n";
		strMsg = strMsg + "FS7 : " + FDK_Module.FDK_Output(iProcID, "FS7") + "\n";
		strMsg = strMsg + "Transaction Amount : " + FDK_Module.FDK_Output(iProcID, "Transaction Amount") + "\n";
		strMsg = strMsg + "FS8 : " + FDK_Module.FDK_Output(iProcID, "FS8") + "\n";
		strMsg = strMsg + "Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Authorization Number") + "\n";
		strMsg = strMsg + "FS9 : " + FDK_Module.FDK_Output(iProcID, "FS9") + "\n";
		strMsg = strMsg + "Issuer Code : " + FDK_Module.FDK_Output(iProcID, "Issuer Code") + "\n";
		strMsg = strMsg + "FS10 : " + FDK_Module.FDK_Output(iProcID, "FS10") + "\n";
		strMsg = strMsg + "Merchant Number : " + FDK_Module.FDK_Output(iProcID, "Merchant Number") + "\n";
		strMsg = strMsg + "FS11 : " + FDK_Module.FDK_Output(iProcID, "FS11") + "\n";
		strMsg = strMsg + "DDC Flag : " + FDK_Module.FDK_Output(iProcID, "DDC Flag") + "\n";
		strMsg = strMsg + "FS12 : " + FDK_Module.FDK_Output(iProcID, "FS12") + "\n";
		strMsg = strMsg + "Notice : " + FDK_Module.FDK_Output(iProcID, "Notice") + "\n";
		strMsg = strMsg + "FS13 : " + FDK_Module.FDK_Output(iProcID, "FS13") + "\n";
		strMsg = strMsg + "Acquirer Code : " + FDK_Module.FDK_Output(iProcID, "Acquirer Code") + "\n";
		strMsg = strMsg + "FS14 : " + FDK_Module.FDK_Output(iProcID, "FS14") + "\n";
		strMsg = strMsg + "Display : " + FDK_Module.FDK_Output(iProcID, "Display") + "\n";
		strMsg = strMsg + "FS15 : " + FDK_Module.FDK_Output(iProcID, "FS15") + "\n";
		strMsg = strMsg + "Point Customer Name : " + FDK_Module.FDK_Output(iProcID, "Point Customer Name") + "\n";
		strMsg = strMsg + "FS16 : " + FDK_Module.FDK_Output(iProcID, "FS16") + "\n";
		strMsg = strMsg + "Point Title Type : " + FDK_Module.FDK_Output(iProcID, "Point Title Type") + "\n";
		strMsg = strMsg + "FS17 : " + FDK_Module.FDK_Output(iProcID, "FS17") + "\n";
		strMsg = strMsg + "Point Add : " + FDK_Module.FDK_Output(iProcID, "Point Add") + "\n";
		strMsg = strMsg + "FS18 : " + FDK_Module.FDK_Output(iProcID, "FS18") + "\n";
		strMsg = strMsg + "Point Usable : " + FDK_Module.FDK_Output(iProcID, "Point Usable") + "\n";
		strMsg = strMsg + "FS19 : " + FDK_Module.FDK_Output(iProcID, "FS19") + "\n";
		strMsg = strMsg + "Point Save : " + FDK_Module.FDK_Output(iProcID, "Point Save") + "\n";
		strMsg = strMsg + "FS20 : " + FDK_Module.FDK_Output(iProcID, "FS20") + "\n";
		strMsg = strMsg + "Point Merchant : " + FDK_Module.FDK_Output(iProcID, "Point Merchant") + "\n";
		strMsg = strMsg + "FS21 : " + FDK_Module.FDK_Output(iProcID, "FS21") + "\n";
		strMsg = strMsg + "Notification : " + FDK_Module.FDK_Output(iProcID, "Notification") + "\n";
		strMsg = strMsg + "FS22 : " + FDK_Module.FDK_Output(iProcID, "FS22") + "\n";
		strMsg = strMsg + "Cash Receipt Authorization Number : " + FDK_Module.FDK_Output(iProcID, "Cash Receipt Authorization Number") + "\n";
		strMsg = strMsg + "FS23 : " + FDK_Module.FDK_Output(iProcID, "FS23") + "\n";
		strMsg = strMsg + "Cash Receipt Notice : " + FDK_Module.FDK_Output(iProcID, "Cash Receipt Notice") + "\n";
		strMsg = strMsg + "FS24 : " + FDK_Module.FDK_Output(iProcID, "FS24") + "\n";
		strMsg = strMsg + "CAT ID : " + FDK_Module.FDK_Output(iProcID, "CAT ID") + "\n";
		strMsg = strMsg + "FS25 : " + FDK_Module.FDK_Output(iProcID, "FS25") + "\n";
		strMsg = strMsg + "Issuer Name : " + FDK_Module.FDK_Output(iProcID, "Issuer Name") + "\n";
		strMsg = strMsg + "FS26 : " + FDK_Module.FDK_Output(iProcID, "FS26") + "\n";
		strMsg = strMsg + "Acquirer Name : " + FDK_Module.FDK_Output(iProcID, "Acquirer Name") + "\n";
		strMsg = strMsg + "FS27 : " + FDK_Module.FDK_Output(iProcID, "FS27") + "\n";
		strMsg = strMsg + "Sign Compress Method : " + FDK_Module.FDK_Output(iProcID, "Sign Compress Method") + "\n";
		strMsg = strMsg + "FS28 : " + FDK_Module.FDK_Output(iProcID, "FS28") + "\n";
		strMsg = strMsg + "Sign MAC Value : " + FDK_Module.FDK_Output(iProcID, "Sign MAC Value") + "\n";
		strMsg = strMsg + "FS29 : " + FDK_Module.FDK_Output(iProcID, "FS29") + "\n";
		strMsg = strMsg + "Sign Data : " + FDK_Module.FDK_Output(iProcID, "Sign Data") + "\n";
		strMsg = strMsg + "FS30 : " + FDK_Module.FDK_Output(iProcID, "FS30") + "\n";
		strMsg = strMsg + "Sign Image Create Key : " + FDK_Module.FDK_Output(iProcID, "Sign Image Create Key") + "\n";
		strMsg = strMsg + "FS31 : " + FDK_Module.FDK_Output(iProcID, "FS31") + "\n";
		strMsg = strMsg + "Check Card Flag : " + FDK_Module.FDK_Output(iProcID, "Check Card Flag") + "\n";
		strMsg = strMsg + "FS32 : " + FDK_Module.FDK_Output(iProcID, "FS32") + "\n";
		strMsg = strMsg + "ETX : " + FDK_Module.FDK_Output(iProcID, "ETX") + "\n";
		strMsg = strMsg + "LRC : " + FDK_Module.FDK_Output(iProcID, "LRC") + "\n";
		
        alert(strMsg);
		txtResultText.value = strMsg;
    }

    FDK_Module.FDK_Destroy(iProcID);
    return iRet;
}