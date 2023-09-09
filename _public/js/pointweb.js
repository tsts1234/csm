// 공백(Blank) 체크
function isBlank(blankvalue)
{
	var f = blankvalue.replace(/(^\s*)|(\s*$)/g, "");
	if (f != "")
		return false;
	else
		return true;
}

//폼 입력유형체크
function chkType(input, type)
{
	switch (type)
	{
		case 0 : var filter = /^[1-9][0-9]+$/; break; // 숫자만
		case 1 : var filter = /^[0-9a-zA-Z]+$/; break; // 영문, 숫자만
		case 2 : var filter = /^[a-zA-Z][0-9a-zA-Z]+$/; break; // 영문, 숫자만(첫자는 영문)
		case 3 : var filter = /^\w+$/; break; // 영문, 숫자, _
		case 4 : var filter = /^[a-zA-Z]+$/; break; // 영문만
		case 5 : var filter = /^[1-9][0-9]+$/; break; // 숫자만 + -
		case 6 : var filter = /^[a-z]+$/; break; // 소-영문만
		case 7 : var filter = /^[0-9a-z]+$/; break; // 소-영문, 숫자만
		case 8 : var filter =/^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4})$/; break; // 메일
		case 9 : var filter = /^[0-9|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝]+$/; break; //한글, 숫자, 영문
		case 10 : var filter =/^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4})$/; break; // Null(사용금지)
		case 11 : var filter = /^[0-9a-zA-Z_]+$/; break; // 영문, 숫자, _
		case 12 : var filter = /^[0-9a-zA-Z~,!,@,#,$,*,(,),=,+,_,.,|]+$/; break; // 영문, 숫자, 특수문자(개행문자 제외)
	}

	if (!filter.test(input))
	{
		var result = 'resultFalse';
		input = '';
		return result;
	}
}

/**
 * 숫자만 입력 가능하게
 * 해당 필드에 스타일 적용 필수 => ime-mode:disabled
 * @log 2014-05-29 방향키, Delete 키 추가
 */
function onlyNumber()
{
	if (event.keyCode >= 48 && event.keyCode <= 57) // 숫자키
		return true;
	else if (event.keyCode >= 96 && event.keyCode <= 105) // 우측 키패드 숫자키
		return true;
	else if (event.keyCode == 9) // 탭 키
		return true;
	else if (event.keyCode == 8) // 백스페이스 키
		return true;
	else if (event.keyCode == 46) // Delete 키
		return true;
	else if (event.keyCode == 190) // 소수점
		return true;
	else if (event.keyCode == 110) // 우측 키패드 소수점
		return true;
	else if (event.keyCode >= 37 && event.keyCode <= 40) // 방향키
		return true;
	else
		return false;
}

// 문자열 길이체크
function inputLength(field, max_length, min_length)
{
	var str; 
	var str_count = 0; 
	var cut_count = 0; 
	var str_length = field.length;

	for (k=0; k < str_length; k++)
	{
		str = field.charAt(k);
		if (escape(str).length > 4)
			str_count += 2; 
		else
		{
			if (escape(str) != '%0A')
				str_count++; 
		}
	}

	if (max_length < str_count)
		return 0;
	else if (min_length > str_count)
		return 1;
	else
		return 2;
}

// 아이디 체크
function chkLoginID(id)
{
	var loc = location.href;

	if (!isBlank(id))
	{
		if (chkType(id, 3) == "resultFalse")
			return false;
		else
		{
			if (loc.indexOf("/admin.php?") == -1)
			{
				if (inputLength(id, 12, 6) != "2")
					return false;
				else
					return true;
			}
			else
			{
				if (inputLength(id, 12, 5) != "2")
					return false;
				else
					return true;
			}
		}
	}
	else
		return false;
}

// 비밀번호 체크
function chkLoginPWD(pw)
{
	if (!isBlank(pw))
	{
		if (chkType(pw, 12) == "resultFalse")
			return false;
		else
		{
			if (inputLength(pw, 12, 4) != "2")
				return false;
			else
				return true;
		}
	}
	else
		return false;
}

// 페이지 이동
function Go(where)
{
	document.location.href = where;
}

// 팝업(스크롤바만 체크)
function Go_win(where, target, width, height, scroll)
{
	var sw  = screen.availWidth;
	var sh  = screen.availHeight;

	px = (sw - width)/2;
	py = (sh - height)/2;

	var its = window.open(where, target, "top="+ py +", left="+ px +", width="+ width +", height="+ height +", scrollbars="+ scroll);
	its.focus();
}

// 팝업(풀옵션 새창 뜬거처럼)
function Go_new(where, target, width, height)
{
	var sw  = screen.availWidth;
	var sh  = screen.availHeight;

	px = (sw - width)/2;
	py = (sh - height)/2;

	var its = window.open(where, target, "top="+ py +", left="+ px +", width="+ width +", height="+ height +", toolbar=yes, location=yes, directories=yes, menubar=yes, scrollbars=yes, resizable=yes");
	its.focus();
}



// 레이어 팝업 열기
function Go_layer_popup(url, w, h, scroll)
{
	close_layer_popup(); 

	if (!scroll || scroll != "yes")
	{
		var this_frame_name = $("#layer_popup_frm1");
		var this_body_name = $("#layer_body1");
	}
	else
	{
		var this_frame_name = $("#layer_popup_frm2");
		var this_body_name = $("#layer_body2");
	}

	$("#sub_content").css({"overflow":"hidden"});

	$("#layer_bg").css({
		"position": "fixed",
		"display": "none",
		"width": "100%",
		"height": "100%",
		"top": "0px",
		"left": "0px",
		"background": "#000000",
		"z-index": "999998",
		"opacity": "0.6"
	});

	this_body_name.css({
		"-webkit-transform": "scale(0.7)",
		"-moz-transform": "scale(0.7)",
		"-ms-transform": "scale(0.7)",
		"transform": "scale(0.7)",
		"opacity": "0",
		"position": "absolute",
		"display": "none",
		"z-index": "999999",
		"width":"100%",
		"height": "100%",
		"top": ( $(window).scrollTop() + ( $(window).height() - parseInt(h)) / 2 ),
		"left": "0",
		"right": "0",
		"bottom": "0",
		"margin": "0 auto",
	
	});

	$("#layer_bg").fadeIn("fast");
	this_body_name.show();
	this_frame_name.attr("src", url);

	this_body_name.css({
		"-webkit-transition": "all 0.3s",
		"-moz-transition": "all 0.3s",
		"transition": "all 0.3s",
		"-webkit-transform": "scale(1)",
		"-moz-transform": "scale(1)",
		"-ms-transform": "scale(1)",
		"transform": "scale(1)",
		"opacity" : "1"
	});

/*	$("#layer_bg").click( function () {
		close_layer_popup();
	});*/
	$(".close").click( function () {
		close_layer_popup();
	});
}

function resizing_layer(h)
{
    if ($("#layer_bg").is(":visible") == true) 
	{
		var left = ( $(window).scrollLeft() + ($(window).width() - $("#layer_body1").width()) / 2 );
		var top = ( $(window).scrollTop() + ($(window).height() - h) / 2 );

		if(top<0) top = 0;
		if(left<0) left = 0;

		$("#layer_body1").css({"left":left, "top":top});
	}
}

// 레이어 팝업 닫기
function close_layer_popup()
{
	parent.$("#layer_body1").css({
		"opacity": "0",
		"-webkit-transform": "scale(0.7)",
		"-moz-transform": "scale(0.7)",
		"-ms-transform": "scale(0.7)",
		"transform": "scale(0.7)",
	});

	parent.$("#layer_body2").css({
		"opacity": "0",
		"-webkit-transform": "scale(0)",
		"-moz-transform": "scale(0)",
		"-ms-transform": "scale(0)",
		"transform": "scale(0)"
	});

	parent.$("#layer_body1").css({"display": "none"});
	parent.$("#layer_body2").css({"display": "none"});
//	parent.$("#layer_popup_frm1").attr("src", "about:blank");
//	parent.$("#layer_popup_frm2").attr("src", "about:blank");
	parent.$("#layer_bg").fadeOut();
}

// alert 후에 레이어 팝업 닫기
function close_layer_popup_after_alert(msg)
{
	parent.alert(msg);

	close_layer_popup();
}

// 삭제 페이지로 이동
function Go_del(where)
{
	if (confirm("정말 삭제하시겠습니까?"))
		document.location.href = where;
}

// 쿠키굽기
function setCookie(name, value, expiredays, domain)
{
	var todayDate = new Date();

	todayDate.setDate( todayDate.getDate() + expiredays);
	document.cookie = name +"="+ escape( value ) +"; path=/; expires="+ todayDate.toGMTString() +"; domain="+ domain;
}

// 쿠키굽기
function setCookie2(name, value, expiredays)
{
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays);
	document.cookie = name +"="+ escape( value ) +"; path=/;";
}

// 쿠키가져오기
function getCookie(name)
{
	var result = null;
	var myCookie = " "+ document.cookie +";";
	var searchName = " "+ name +"=";
	var startOfCookie = myCookie.indexOf(searchName);
	var endOfCookie;

	if (startOfCookie != -1)
	{
		startOfCookie += searchName.length;
		endOfCookie = myCookie.indexOf(";", startOfCookie);
		result = unescape(myCookie.substring(startOfCookie, endOfCookie));
	}

	return result;
}

// 엔터키치면 func 실행
function onkeyUpChk(func)
{
	var keyValue = event.keyCode;

	if (keyValue == 13)
	{
		var funcObj = eval(func);

		funcObj();
		return false;
	}
	else
		return;
}

// 파일 다운로드
function get_uploadFile(idx, mode)
{
	$("#download_frame").attr("src", "/_include/download.php?filename="+ idx +"&mode="+ mode);
}

// 메일주소 입력시 셀렉트 박스 선택하면 자동으로 도메인 입력
function insert_domain(f)
{
	if (f.mail_domain.value == "1")
	{
		f.email_domain.value = "";
		f.email_domain.readOnly = false;
		f.email_domain.focus();
	}
	else
	{
		f.email_domain.value = f.mail_domain.value;
		f.email_domain.readOnly = true;
	}
}

// 메일주소 입력시 셀렉트 박스 선택하면 자동으로 도메인 입력
function insert_domain2(f)
{
	if (f.pw_mail_domain.value == "1")
	{
		f.pw_email_domain.value = "";
		f.pw_email_domain.readOnly = false;
		f.pw_email_domain.focus();
	}
	else
	{
		f.pw_email_domain.value = f.pw_mail_domain.value;
		f.pw_email_domain.readOnly = true;
	}
}

// PHP의 in_array 함수와 동일
function in_array(what, where)
{
	var rtn = false;

	for (var i=0; i<where.length; i++)
	{
		if (what == where[i])
		{
			rtn = true;
			break;
		}
	}

	return rtn;
}

// 브라우져 체크
function whichBrs()
{
	var agt = navigator.userAgent.toLowerCase();

	if (agt.indexOf("chrome") != -1) return "chrome";
	if (agt.indexOf("opera") != -1) return "Opera";
	if (agt.indexOf("staroffice") != -1) return "Star Office";
	if (agt.indexOf("webtv") != -1) return "WebTV";
	if (agt.indexOf("beonex") != -1) return "Beonex";
	if (agt.indexOf("chimera") != -1) return "Chimera";
	if (agt.indexOf("netpositive") != -1) return "NetPositive";
	if (agt.indexOf("phoenix") != -1) return "Phoenix";
	if (agt.indexOf("firefox") != -1) return "Firefox";
	if (agt.indexOf("safari") != -1) return "Safari";
	if (agt.indexOf("skipstone") != -1) return "SkipStone";
	if (agt.indexOf("msie") != -1) return "Internet Explorer";
	if (agt.indexOf("netscape") != -1) return "Netscape";
	if (agt.indexOf("mozilla/5.0") != -1) return "Mozilla";
	if (agt.indexOf("\/") != -1)
	{
		if (agt.substr(0,agt.indexOf("\/")) != "mozilla")
			return navigator.userAgent.substr(0,agt.indexOf("\/"));
		else
			return "Netscape";
	}
	else if (agt.indexOf(" ") != -1)
		return navigator.userAgent.substr(0,agt.indexOf(" "));
	else
		return navigator.userAgent;
}

//숫자단위 콤마처리
function numberFormat(num)
{
	var num_str = num.toString();
	var result = "";

	for (var i=0; i<num_str.length; i++)
	{
		var tmp = num_str.length - (i+1);

		if (((i % 3) == 0) && (i != 0))
			result = ","+ result;

		result = num_str.charAt(tmp) + result;
	}

	return result;
}

//연락처 특수문자 처리
function telFormat(num)
{
	var str = num.replace(/[^0-9]/g, '');
	var tmp = '';
	if (str.length < 4)
	{
		return str;
	}
	else if (str.length < 7)
	{
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3);
		return tmp;
	}
	else if(str.length < 11)
	{
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 3);
		tmp += '-';
		tmp += str.substr(6);
		return tmp;
	}
	else
	{
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 4);
		tmp += '-';
		tmp += str.substr(7);
		return tmp;
	}

	return str;
}

// 이미지 팝업 - 공대여자분들은 이뿌심^^
function jsPopImage(src, title, wname)
{
//IE일 경우만
	if (window.navigator.userAgent.indexOf('MSIE') != -1)
		var w = window.open("", wname, "width=10, height=10, scrollbars=0, resizable=1"); //IE에서는 about:blank 를 똑같은 이름으로 부를 경우 엑세스 문제가 발생
	else
		var w = window.open("about:blank", wname, "width=10, height=10, scrollbars=0, resizable=1");

	var img = new Image();
	if (!wname)
		wname = "_blank";;

	if (!title)
		title = "jsPopImage";

	img.onerror = function(w)
	{
		return function()
		{
			w.document.title = "이미지를 읽어오는데 문제가 있습니다.";
			w.alert("이미지를 읽어오는데 문제가 있습니다.");
			w.close();
		}
	}(w);

	img.onload = function(w, iWidth, iHeight)
	{
		return function()
		{
			var wGap = 50;
			var hGap = 120;
			var width = this.width + wGap;
			var height = this.height + hGap;
			var img = this.cloneNode(true);

			img.src = this.src;
			img.style.cssText = "margin:10px;";

//--- 스크린 정보
			var sWidth = screen.availWidth;
			var sHeight = screen.availHeight;

//--- 창 위치
			var left = Math.floor(($("body").width() / 2) - (this.width / 2));
			var top = 0;
			var xyZero = false;

			if (sHeight > height)
				top = Math.floor((sHeight - height) / 2);

			width = Math.min(width,sWidth);
			height = Math.min(height,sHeight);

//--- 창 제어
			w.moveTo(left, top);

			w.resizeTo(width, height);
			w.document.title = title;
			w.document.body.style.cssText = "width:100%; height:100%; background-color:gray; cursor:pointer; padding:0; margin:0;";
			w.document.body.title="이미지를 클릭하거나 아무키나 누르시면\n팝업창이 닫힙니다.";
			var div0 = w.document.createElement("div");
			div0.style.cssText = "text-align:center; width:100%; height:100%; overflow:auto;";
			var div = w.document.createElement("div");
			div.style.cssText = "";
			w.document.body.appendChild(div0);
			div0.appendChild(div);
			try
			{
				div.appendChild(img);
			}
			catch(e)
			{
				div.innerHTML = "<img src='"+ img.src +"' style='"+ img.style.cssText +"'>";
			}

//---이벤트
			var cl = function(w)
			{
				return function()
				{
					w.close();
					return false;
				}
			}(w);
			w.document.onclick = cl; //클릭 시 창 닫기
			w.document.onkeydown = cl; //키 입력 시 창 닫기
			w.focus();
		}
	}(w)
	img.src = src;
	w.focus();
}

function trim(s)
{
	var t = "";
	var from_pos = to_pos = 0;

	for (i=0; i<s.length; i++)
	{
		if (s.charAt(i) == ' ')
			continue;
		else 
		{
			from_pos = i;
			break;
		}
	}

	for (i=s.length; i>=0; i--)
	{
		if (s.charAt(i-1) == ' ')
			continue;
		else 
		{
			to_pos = i;
			break;
		}
	}	

	t = s.substring(from_pos, to_pos);
	//				alert(from_pos + ',' + to_pos + ',' + t+'.');
	return t;
}

// 즐겨찾기
function addFavorite()
{
	var title = "HCLASSIC(한지희 클래식)";
	var url = document.location.hostname;

	if (window.sidebar && window.sidebar.addPanel) // Mozilla Firefox Bookmark
	{
		window.sidebar.addPanel(document.title,window.location.href,'');
	}
	else if(window.external && ('AddFavorite' in window.external)) // IE Favorite
	{
		window.external.AddFavorite("http://"+ url, title);
	}
	else if(window.opera && window.print) // Opera Hotlist
	{
		this.title=title;
		return true;
	}
	else // webkit - safari/chrome
	{
		alert((navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D 로 즐겨찾기에 추가할 수 있습니다.');
	}
}

//# 다음주소연동
function execDaumPostcode() {
	new daum.Postcode({
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수

			// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
//			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				fullAddr = data.roadAddress;

//			} else { // 사용자가 지번 주소를 선택했을 경우(J)
//				fullAddr = data.jibunAddress;
//			}

			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if(data.userSelectedType === 'R'){
				//법정동명이 있을 경우 추가한다.
				if(data.bname !== ''){
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== ''){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById('zipcode').value = data.zonecode; //5자리 새우편번호 사용
			document.getElementById('addr').value = fullAddr;

			// 커서를 상세주소 필드로 이동한다.
			document.getElementById('addr_detail').focus();
		}
	}).open();
}