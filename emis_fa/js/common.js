function delay (n_time)
{
	var start = new Date().getTime();
    while (new Date().getTime() < start + n_time);
}

function setFocus(itemname)
{
  document.getElementById(itemname).focus();
}

function golist(Prgname,ListType,Ctl_NO)
{ 
	location.href=PRG_URL()+Prgname+"&arguments=-A"+Ctl_NO+",-A"+ListType+",-A"+Math.random();    	
}



//get appname from the url
function appname()
{
	var str=window.location.href;
	var pos=str.indexOf("appname");
	var result=null;
	if (pos>0)
	{
		str=str.substr(pos+8);
		pos=str.indexOf("&");
		if (pos>0)
		{
			result=str.substr(0,pos);
		}
	}
	return result;
}

//contruct a url page with context id
function PRG_URL()
{
    ourcookie = Get_Cookie('MOBILEWEB_CTX');
	if (ourcookie==null)
	{
  		ctxvar='';
	}
	else
	{
		ctxvar='&CTX='+ourcookie;
	}
	
	return window.location.protocol + "//" + window.location.host + window.location.pathname + "?appname=" + appname() + ctxvar + "&prgname=";
	//return window.location.protocol + "//" + window.location.host + window.location.pathname + "?appname=" + appname() + "&prgname=";
}

function PRG_URL_NEW()
{
	return window.location.protocol + "//" + window.location.host + window.location.pathname + "?appname=" + appname() + "&prgname=";
}

//contruct a url page without context id
function PRG_URL_CLEAN()
{
	return window.location.protocol + "//" + window.location.host + window.location.pathname + "?appname=" + appname() + "&prgname=";
}

// check if the browser supports XMLHTTP and if so returns an XMLHttpRequest object
function GetXmlHttpObject()
{
 	if (window.XMLHttpRequest)
 	{
		// code for IE7+, Firefox, Chrome, Opera, Safari
 		return new XMLHttpRequest();
  	}
  	alert ("Your browser does not support XMLHTTP!");
 	return null;

}

function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function Set_Cookie(name,id){  
  var days=30;
  var expires=new Date(); 
  expires.setTime(expires.getTime()+days*24*60*60*1000);
  document.cookie=name+"="+escape(id)+";expires="+expires.toGMTString();
}

//checks if Enter key is pressed (in order to run the Find process after filling in the serach criteria)
function enter_pressed(e){
	var keycode;
	if (window.event) 
		{ keycode= window.event.keyCode; }
	else if (e) 
	{
		if (e.keyCode>0)
			{keycode=e.keyCode;}	
		else if (e.which>0)
			{keycode = e.which;}
	}
	else return false; 
	return (keycode == 13 || keycode == 10); 
}

// hides an object
function hide(name){
    document.getElementById(name).style.display = 'none';
    document.getElementById(name).style.visibility = 'hidden';
}
// Shows an object
function show(name){
	document.getElementById(name).style.display = '';
  	document.getElementById(name).style.visibility = 'visible';
}

// handles scenarios when a request returns but no data found
function nodata(name){
	hide('req');
	if (document.getElementById(name).tBodies[0]==null)
		{ show('norecs'); }
	else
		{
		if (document.getElementById(name).tBodies[0].childNodes.length==0)
			{ show('norecs'); }
		else
			{ show('nomore');  }
		}
	hide('btnMore');
}

// handles scenarios when a request returns with data
function datafound(name,hasmorerecs){
    hide('norecs');
	hide('req');
	if (document.getElementById(name).tBodies[0]==null)
  	{
    		// generate the body section
		tbody = document.createElement('TBODY');
		document.getElementById(name).appendChild(tbody);
  	}
	// hide the "More" button if there are no more records
	if (hasmorerecs!="Y")
	{  hide('btnMore');  }
	else
	{  show('btnMore');  }
}

function cancelEvent(e) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
}

function closewin()
{
	window.open('', '_self', ''); window.close();
}

function frameclosewin()
{
	window.open('', '_parent', ''); parent.window.close();
}

function autoTab()
{   
	//hide('chkr');
	if (event.keyCode==13)
	{
		//document.getElementById("BarCodebutton").focus();
		hide('chkr');
		document.getElementById("BarCodebutton").onclick();
	}	
}