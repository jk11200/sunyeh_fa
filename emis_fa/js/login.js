var verifyxmlhttp
var CTL_NO

window.onload = function () {$("#showPassword").hide();};

$("#txtPassword").on('change', function () {
  if ($("#txtPassword").val())
  {
    $("#showPassword").show();
  } else

  {
    $("#showPassword").hide();
  }
});

$(".reveal").on('click', function () {
  var $pwd = $("#txtPassword");
  if ($pwd.attr('type') === 'password')
  {
    $pwd.attr('type', 'text');
  } else

  {
    $pwd.attr('type', 'password');
  }
});


//validate logon (ajax).
function VerifyLogin(userid,userpwd,InventoryNo,Type,CTLNO)
{ 
  var a=userpwd.replace(/%/,"%25");
  var a=a.replace(/#/,"%23");
  var a=a.replace(/&/,"%26");
  var a=a.replace(/=/,"%3D");
  CTL_NO = CTLNO;
  
  verifyxmlhttp=GetXmlHttpObject();
  if (verifyxmlhttp==null) {return;}
  var url=PRG_URL()+"VerifyLogin&arguments=-A"+userid+",-A"+userpwd+",-A"+CTLNO+",-A"+Math.random();
  verifyxmlhttp.onreadystatechange=verifystateChanged;
  verifyxmlhttp.open("GET",url,true);	//async request
  verifyxmlhttp.send(null);
  //progressID = setTimeout("showProgress()", 2000);
  
}

function verifystateChanged()
{
if (verifyxmlhttp.readyState==4)
  {
  if (verifyxmlhttp.status == 200) 
    {
      if (verifyxmlhttp.responseText=='error_user')
      {
		  alert("請輸入正確的帳號及密碼! ");
		  return false;
        //Logon Error - no user name
      }
	  else if (verifyxmlhttp.responseText=='error_notexist')
      {
		 alert("財產盤點單號不存在! ");
      }
	  else if (verifyxmlhttp.responseText=='error_inventory_close')
      {
		 alert("財產盤點單號已完成或已確認! ");
      }
	  else if (verifyxmlhttp.responseText=='error_notinlist')
      {
		 alert("該使用者不在盤點人員清單中! ");
      }
	  else if (verifyxmlhttp.responseText=='error_rescan')
      {
		 alert("請重新刷取財產盤點單封面QR Code! ");
      }
      else if (verifyxmlhttp.responseText=='LoginOk')
      {
		 window.location.href=PRG_URL()+"qrcodescan&arguments=-A"+CTL_NO+",-A"+Math.random();  		
      }
	  else if (verifyxmlhttp.responseText=='LoginFinishOk')
      {
		 window.location.href=PRG_URL()+"Inventory_Item_List&arguments=-A"+CTL_NO+",-AC,-A"+Math.random();  		
      }
    }
  }
}