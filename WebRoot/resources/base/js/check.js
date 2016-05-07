///////////////////////////////////////////////
//                Variable
//增加了电话号码isPhone函数
//增加了编码规则 isCode函数
// 2004-9-9 修正了判断日期格式月日前带0的转换错误   
// 2004-9-13 缩小日期格式的范围，只能使用中线（-）作为日期格式分隔符
// 2004-9-15 增加可单独使用的判断是否为纯数据组成的字符串 isDigit 函数，和判断是否符合密码格式的isPassword函数
// 2004-9-30 修改isNumber函数中关于数字尾数的长度问题
// 2004-10-29 修改isNumber函数中的，无小数部分，没有减去小数和小数点长度判断的错误。
// 2004-11-4 修改isNumber函数中的，整数部分的长度判断逻辑不正确的错误。
// 2004-11-5 17:03 修改checkDateTime函数中的，开始时间等于结束时间，返回true的错误。
// 2005-1-5 16:40  修改isDate和isYearMonth函数中关于月日为0时返回为true的错误，缩小日期格式的合法范围。
// 2005-1-31 9:52  修改Form表单中的检测范围。如果域为disabled，则不检测。
/////////////////////////////////////////////////
var reDigit = /^\d+$/

var reInteger = /^(\+|\-)?\d+$/

var reFloat = /^(\+|-)?(\d+(\.(\d*))?)$|^((\d*\.)?(\d+))$/

var reEmail = /^.+\@.+\..+$/

var reIp=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;

var special=/[<>"',;\/\\\&]/;

var reDate =/^(\d{4})(-)(\d{2})(\2)(\d{2})$/;

var reYearMonth =/^(\d{2}|\d{4})(-)(\d{1,2})$/;

var reTime =/^(\d{2})(:)(\d{2})((\2)(\d{2}))?$/;

var rePath =/^([a-zA-Z]:\\)([^\/\|\*\?:<>"\f\n\r\t\v]+\\?)*$/;

var rePhone = /^[\d-]+$/;

var reAlphanumeric = /^[a-zA-Z0-9]+$/

var reNameSpell = /^[a-zA-Z ]+$/ //包含一个空格

var rePassword = /[;\s]/
/////////////////////////////////////////////////
//                Function                     //
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// 函数名：ltrim, rtrim, trim
//    去掉字符串的前后空格
/////////////////////////////////////////////////
function ltrim(s){
	return s.replace(/^\s+/,"");
}

function rtrim(s){
	return s.replace(/\s+$/,"");
}

function trim(s){
	return rtrim(ltrim(s));
}
/////////////////////////////////////////////////
// 函数名：isEmpty
//		检查给定的字符串是否为空
// 参数：
//		str -	字符串
// 返回值：
//		true	空
//		false	不空
/////////////////////////////////////////////////
function isEmpty (str)
{
	return ((trim(str).length == 0)||(str == null));
}

/////////////////////////////////////////////////
// 函数名：isInteger
//		检查是字符串否为整数组成
// 参数：
//		str -	检查数字
// 返回值：
//		true	整数
//		false	非整数
/////////////////////////////////////////////////
function isInteger (str)
{
	return (reInteger.test(str));
}

/////////////////////////////////////////////////
// 函数名：isBetween
//		检查给定字符串的数值是否在指定范围内
// 参数：
//		val - 比较值
//		lo	- 最小值
//		hi	- 最大值
// 返回值：
//		true	在指定范围内
//		false	不在指定范围内
// 说明：
//    三个参数都是字符串。
/////////////////////////////////////////////////
function isBetween (val, lo, hi) {
	return ((parseFloat(val) <= parseFloat(lo)) && (parseFloat(val) >= parseFloat(hi)));
}

/////////////////////////////////////////////////
// 函数名：isDate
//		检查字符串中的日期格式是否正确
// 参数：
//		str - 检查日期，格式为：yyyy-mm-dd
// 返回值：
//		true	日期正确
//		false	日期错误
/////////////////////////////////////////////////
function isDate(str){
	var date = str.match(reDate);
	if(date !=null){
	    var strYear = date[1].toString();
	    var strMonth = date[3].toString();
	    var strDay = date[5].toString();
	    
	    if(strMonth.charAt(0)=="0") strMonth = strMonth.substring(1,strMonth.length);	    
        if(strDay.charAt(0)=="0") strDay = strDay.substring(1,strDay.length);
		var myYear = parseInt(strYear);
		var myMonth = parseInt(strMonth);
		var myDay = parseInt(strDay);
		if(myYear<100) myYear += 1900;
		if ((myYear<1000)||(myYear>9999)||
		    (myMonth<1)||(myMonth>12)||
		    (myDay<1)||(myDay>31)) return false;

		var isLeap = ((0 == myYear % 4) && (0 != myYear % 100)) || (0 == myYear % 400);
		if ((myMonth==2)&&((isLeap)&&(myDay>29)||(!isLeap)&&(myDay>28))) return false;
		if (((myMonth==4)||(myMonth==6)||(myMonth==9)||(myMonth==11)) && (myDay>30)) return false;
		return true;
	}else{
		return false;
	}
}

/////////////////////////////////////////////////
// 函数名：isTime
//		检查字符串中的时间是否正确
// 参数：
//		str - 检查时间，格式为：hh:mm:ss 或 hh:mm
// 返回值：
//		true	时间正确
//		false	时间错误
/////////////////////////////////////////////////
function isTime(str){
	var time = str.match(reTime);
	if(time !=null){
        var strHour = time[1].toString();
        var strMinute = time[3].toString();
        var strSecond = time[6].toString();
        if(strHour.charAt(0)=="0") strHour = strHour.substring(1,strHour.length);
        if(strMinute.charAt(0)=="0") strMinute = strMinute.substring(1,strMinute.length);
        if(strSecond.length>0 && strSecond.charAt(0)=="0") strSecond = strSecond.substring(1,strSecond.length);
        var myHour = parseInt(strHour);
		var myMinute = parseInt(strMinute);
		var mySecond = (time[5]==""?0:parseInt(strSecond));
		return !(myHour<0 || myHour>23 ||
		         myMinute<0 ||myMinute>59 ||
		         mySecond<0||mySecond>59)
	}else{
		return false;
	}
}
/*
/////////////////////////////////////////////////
// 函数名：htmlEncode、htmlDecode
//		转换HTML中使用的特殊字符，包括&，<，>，"。
// 参数：
//		conValue - 要转换的内容
// 返回值：
//    转换完毕的内容
// 说明：
//    主要用于提取页面显示字符到JavaScript中，和其反过程。
/////////////////////////////////////////////////
function htmlEncode(conValue){
	return conValue.replace(/&/gi,"&amp;").replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\"/gi,"&quot;");
}
function htmlDecode(conValue){
	return conValue.replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,"\"").replace(/&amp;/gi,"&");
}
*/
///////////////////////////////////////////////////
// 函数名：isIP
//		检查字符串中的IP地址格式是否正确
// 参数：
//		str - IP地址的字符串值
// 返回值：
//    是否IP地址有效
// 说明：
//    只检测是否是正常的IP地址，不检测不使用的特殊IP地址。
///////////////////////////////////////////////////
function isIP(str){
	var ip = str.match(reIp);
	if(ip != null){
		return (ip.length==5 &&
			(parseInt(ip[1])>0 && parseInt(ip[1])<254)&&
		   (parseInt(ip[2])>0 && parseInt(ip[2])<254)&&
		   (parseInt(ip[3])>0 && parseInt(ip[3])<254)&&
		   (parseInt(ip[4])>0 && parseInt(ip[4])<254));
	}else{
		return false;
	}
}

/////////////////////////////////////////////////
// 函数名：isEmail
//		检查字符串中的电子邮件地址格式的正确性
// 参数：
//		str	-	电子邮件地址
// 返回值：
//		true	格式正确
//		false	格式错误
// 说明：
//    不检测域名。
/////////////////////////////////////////////////
function isEmail (str)
{
	return (reEmail.test(str));
}

/////////////////////////////////////////////////
// 函数名：isFloat
//		检查是字符串是否符合实数格式
// 参数：
//		str	-	检查字符串
//		prec	-	小数位精度，可以省略
// 返回值：
//		true	实数
//		false	非实数
// 说明：
//    检查定长小数位是否满足指定长度，如果忽略第二个参数，则不检测小数位数。
/////////////////////////////////////////////////
function isFloat(str, prec)
{
	if(typeof(prec)=="undefined"){
		return (reFloat.test(str));
	}else{
		var float = str.match(reFloat);
		if(float != null){
	        return(float[4].length<=parseInt(prec) && float[7].length<=parseInt(prec));
		} else {
		    return false;
		} 
	}
}

/////////////////////////////////////////////////
// 函数名：isNumber
//		检查是字符串是否符合实数格式，和isFloat原理相同
// 参数：
//		str	- 检查字符串
//    len	- 实数的总长度，包括小数部分，和小数点。
//		prec	- 小数位精度，可以省略
// 返回值：
//		true	实数
//		false	非实数
// 说明：
//    检查定长小数位是否满足指定长度，如果忽略第3个参数，则不检测小数位数。
/////////////////////////////////////////////////
function isNumber(str, len, prec)
{
	if(typeof(len)=="undefined"){
		return (isFloat(str, prec));
	}else{
		var strFloat = str;
		if(strFloat.charAt(0)=="-" || strFloat.charAt(0)=="+") strFloat = strFloat.substring(1);		
		var thisfloat = strFloat.match(reFloat);
		//alert(strFloat)
		//alert(thisfloat)
		if(thisfloat!=null){
    		if(typeof(prec)=="undefined"){
    			return (strFloat.length<=parseInt(len));
    		}else{
    		    if(thisfloat[4].length==0 && thisfloat[7].length==0){
    		        return (strFloat.length<=parseInt(len-prec-1));
    		    } else if(thisfloat[4].length==0){
    		        return (thisfloat[7].length<=parseInt(prec));
    		    } else if(thisfloat[7].length==0){
    		        return (strFloat.length<=parseInt(len)&& thisfloat[4].length<=parseInt(prec));
    		    } else {
    		        return false;
    		    }
    		}
    	} else {
    	    return false;
    	}
	}
}
/////////////////////////////////////////////////
// 函数名：checkSign
//		检查是字符串是否符合正负数要求，和isFloat原理相同
// 参数：
//		str	- 检查字符串
//    sp		- 正数符号（+）或负数符号（-），可以忽略。
// 返回值：
//		true	实数
//		false	非实数
// 说明：
//    检查定长小数位是否满足指定正负值，忽略则不检查符号。
/////////////////////////////////////////////////
function checkSign(str, sp)
{
	if(typeof(sp)=="undefined"){
		return (isFloat(str));
	}else{
		var float = str.match(reFloat);
		if(float!=null){
			if(float[1]!="-" && sp!="-") return true;
			return(float[1]==sp);
		}else{
			return false;
		}
	}
}
//////////////////////////////////////////////////
// 函数名：hasSpecial
//    校验是否存在特殊字符其中之一。包括逗号（,），分号（;），单引号（‘），双引号（"）
//                                  左括号（<），右括号（>），斜线（\），反斜线（/），与符号（&）
// 参数：
//		str	-	检查字符串
//      reg -   指定的正则表达式（忽略此参数则使用默认正则表达式） /[\s;]/
// 返回值：
//		true	包括
//		false	不包括
//////////////////////////////////////////////////
function hasSpecial(str, reg){
    if(typeof(reg)=="undefined")
	    return special.test(str);
    else
        return reg.test(str);
}

//////////////////////////////////////////////////
// 函数名：getRealLength
//    得到字符串的真实长度，一个中文字符等于两个英文字符。
// 参数：
//		str	-	检查字符串
//		prec	-	小数位, 可以省略
// 返回值：
//		n - 计算过的字符串长度
//////////////////////////////////////////////////
function getRealLength(str) {
	var n = 0;
	for( j = 0; j < str.length; j++){
		n++;
		if(str.charCodeAt(j) > 127) n++;
	}
	return(n);
}
//////////////////////////////////////////////////
// 函数名：checkDateTime
//    检查日期是否满足要求的先后顺序
// 参数：
//		date1 - 开始日期
//    time1 - 开始时间（可忽略）
//    date2 - 结束日期
//    time2 - 结束时间（可忽略）
// 返回值：
//		true  开始日期时间小于结束日期时间
//		false	开始日期时间大于结束日期时间，或日期时间不符合格式。
//////////////////////////////////////////////////
function checkDateTime(date1,date2,time1,time2)
{
	if(typeof(time1)=="undefined") time1="00:00:00";
	if(typeof(time2)=="undefined") time2="00:00:00";
	if(isDate(date1)&&isDate(date2)&&isTime(time1)&&isTime(time2)){
		return (getDateTime(date1,time1).getTime()<getDateTime(date2,time2).getTime());
	}else{
		return false;
	}
}
//////////////////////////////////////////////////
// 函数名：checkTime
//    检查时间是否满足要求的先后顺序
// 参数：
//    time1 - 开始时间
//    time2 - 结束时间
// 返回值：
//		true  开始时间小于结束时间
//		false	开始时间大于结束时间，或时间不符合格式。
//////////////////////////////////////////////////
function checkTime(time1,time2)
{
	if(isTime(time1)||isTime(time2)){
		return (getDateTime("1900-01-01",time1).getTime()<=getDateTime("1900-01-01",time2).getTime());
	}else{
		return false;
	}
}

//////////////////////////////////////////////////
// 函数名：_getDateTime
//    根据日期时间字符串创建Date对象，js文件中内部使用。
// 参数：
//    mydate - 日期
//    mytime - 时间
// 返回值：
//		date Date实例
//////////////////////////////////////////////////
function getDateTime(mydate,mytime)
{
	var date = mydate.match(reDate);
	var time = mytime.match(reTime);

	var myYear = parseInt(date[1]);
    var strMonth = date[3].toString();
    var strDay = date[5].toString();
    if(strMonth.charAt(0)=="0") strMonth = strMonth.substring(1,strMonth.length);
    if(strDay.charAt(0)=="0") strDay = strDay.substring(1,strDay.length);

    var myHour = time[1];
    var myMinute = time[3];
    var mySecond = time[6];
    if(myHour.charAt(0)=="0") myHour = myHour.substring(1,myHour.length);
    if(myMinute.charAt(0)=="0") myMinute = myMinute.substring(1,myMinute.length);
    if(mySecond.length>0 && mySecond.charAt(0)=="0") mySecond = mySecond.substring(1,mySecond.length);

    var dateValue = new Date(myYear<100?myYear+1900:myYear,
						  parseInt(strMonth)-1,
						  parseInt(strDay),
						  parseInt(myHour),
						  parseInt(myMinute),
						  time[5]==""?0:parseInt(mySecond)
						  );

	return (dateValue);
}
//////////////////////////////////////////////////
// 函数名：_isPath
//    检查字符串中的上传路径格式的正确性。
// 参数：
//    str - 上传路径
// 返回值：
//		true	格式正确
//		false	格式错误
//////////////////////////////////////////////////
function isPath(str)
{
	return (rePath.test(str));
}

//////////////////////////////////////////////////
//检查是否为零
//////////////////////////////////////////////////
function isZero(str)
{
	return (isFloat(str)&&(parseInt((str.lastIndexOf("0")!=-1)?str.substring(str.lastIndexOf("0")+1,str.length):str)==0));
}

//////////////////////////////////////////////////
// 函数名：checkText
//    根据参数检查正确性。
// 参数：
//    myText - 页面Form中的输入对象
// 返回值：
//		true	格式正确
//		false	格式错误
// 说明：
//    注意标签的字符大小写
//    元素参数：noCheck - 不检测标记。
//             isEmpty - 标记元素不可以为空。
//             isZero - 标记元素不可以为零。
//              以上的标签不需要在其后写入其他值，只要存在标签，js程序就会自动检测
//
//             dataType - 参数：string, int, number ,digit , date, time, email, ip, path, phone, code,  password , spell,
//                              yearmonth
//                           保留的（测试中）english, ENGLISH, English
//             precision - 数字总长度，包括小数部分。参数：数字
//             precise - 数字小数部分长度。参数：数字
//             maxLen - 字符串最大长度，可小于这个长度。参数：数字
//             minLen - 字符串最小长度，可大于这个长度。参数：数字
//             length - 字符串标准长度，不能大于或小于这个长度。参数：数字
//             caption - 表单元素的名称，显示在提示信息中，必要的。参数：字符串
//             sign - 数字的正负号标识。参数：包括“+”，“-”两个符号
//////////////////////////////////////////////////
function checkText(myText)
{
//	alert(0);
	//if(typeof(myText.noCheck)!="undefined") return true;
//	alert(1);
	var errmsg = myText.caption;
	if(typeof(errmsg)=="undefined") errmsg = myText.name;

	if(typeof(myText)!="undefined"&&myText.type!="file")
	if(typeof(myText)!="undefined"&&isEmpty(myText.value)){
		showMsg(errmsg + "不能为空，或不能只包括空白字符！\n","2",myText);
		myText.focus();
		return false;
	}
	if(!isEmpty(myText.value)){
//		alert(2.2);
		// 根据isZero参数，判断元素值是否为零
		if (typeof(myText)!="undefined" && isZero(myText.value)){
			showMsg(errmsg + "不能为零！\n","2",myText);
			myText.focus();
			return false;
		}
//		alert(2.3);
		// 根据dataType参数，判断路径名称格式是否正确
		if (myText.dataType=="path" && !isPath(myText.value)){
			showMsg(errmsg + "路径格式不正确！\n","2",myText);
			myText.focus();
			return false;
		}
//		alert(2.4);
		// 根据dataType参数，判断元素值是否为整数，包括0。
		if (myText.dataType=="int"){
			if(!isInteger(myText.value)){
				showMsg(errmsg + "请输入数字！如：123\n", "2", myText);
				myText.focus();
				return false;
			}
			if(!checkSign(myText.value, myText.sign)){
				if (myText.sign=="+") showMsg(errmsg + "不能输入负数！", "2", myText);
				if (myText.sign=="-") showMsg(errmsg + "不能输入正数！", "2", myText);
				myText.focus();
				return false;
			}
		}
//		alert(2.5);
		// 根据dataType参数，判断元素值是否为合法的IP地址。
		if (myText.dataType=="ip" && !isIP(myText.value)){

			showMsg(errmsg + "请输入IP地址！如：192.168.0.1。\n", "2", myText);
			myText.focus();
			return false;
		}
//		alert(2.6);
		// 根据dataType参数，判断元素值是否为合法的日期。
		if (myText.dataType=="date"&&!isDate(myText.value)){
			showMsg(errmsg + "请输入正确日期！\n\n支持的日期格式有：YYYY-MM-DD！\n", "2", myText);
			myText.focus();
			return false;
		}
//		alert("2.7");
		// 根据dataType参数，判断元素值是否为合法的时间。
		if (myText.dataType=="time"&&!isTime(myText.value)){
			showMsg(errmsg + "请输入正确时间（hh:mm:ss、hh:mm）！\n", "2", myText);
			myText.focus();
			return false;
		}
//		alert("2.8");
		// 根据dataType参数，判断元素值是否为合法的邮件地址。
		if (myText.dataType=="email"&& !isEmail(myText.value)){
			showMsg(errmsg + "请输入正确的E-Mail地址（admin@hostname.com）！\n", "2", myText);
			myText.focus();
			return false;
		}
//			alert("2.9");
        // 根据dataType参数，判断元素值是否为合法的电话。
		if (myText.dataType=="phone"&& !isPhone(myText.value)){
			showMsg(errmsg + "请输入正确的电话格式（只能包括数字和中横线“ - ”）！\n", "2", myText);
			myText.focus();
			return false;
		}
//			alert("2.10");
        // 根据dataType参数，判断元素值是否为合法的编号格式。
		if (myText.dataType=="code"&& !isCode(myText.value)){
			showMsg(errmsg + "请不要输入除数字，和大小写英文字符之外的字符！\n", "2", myText);
			myText.focus();
			return false;
		}
//			alert("2.11");
        // 根据dataType参数，判断元素值是否为合法的姓名拼音拼写形式。
		if (myText.dataType=="yearmonth"&& !isYearMonth(myText.value)){
			showMsg(errmsg + "请输入正确日期！\n\n支持的日期格式有：YYYY-MM！\n", "2", myText);
			myText.focus();
			return false;
		}
		
        // 根据dataType参数，判断元素值是否为合法的年月形式的日期格式。
		if (myText.dataType=="spell"&& !isNameSpell(myText.value)){
			showMsg(errmsg + "请不要输入大小写英文字符和空格之外的字符！\n", "2", myText);
			myText.focus();
			return false;
		}
		if (myText.dataType=="password"&& !isPassword(myText.value)){
			showMsg(errmsg + "请不要输入分号（;）、和空格！\n", "2", myText);
			myText.focus();
			return false;
		}
		if (myText.dataType=="digit"&& !isDigit(myText.value)){
			showMsg(errmsg + "请不要输入数字0至9以外的字符！\n", "2", myText);
			myText.focus();
			return false;
		}

		//特殊字符
        if(myText.dataType=="string" && hasSpecial(myText.value)){
            showMsg(errmsg + "请不要输入以下的特殊字符。\n\n如：逗号（,），分号（;），单引号（\‘），双引号（\"），合符号（&）\n        左括号（<），右括号（>），斜线（\\），反斜线（\/）\n",2,myText);
            myText.focus();
            return false;
        }
		// 根据dataType参数，判断元素值是否为合法的数值。
		if(myText.dataType=="number"){
			if(!isNumber(myText.value, myText.precision, myText.precise)){
				if(typeof(myText.precision)!="undefined"&&typeof(myText.precise)!="undefined"){
					showMsg(errmsg +"整数位数最多为"+(parseInt(myText.precision) - parseInt(myText.precise) - 1)+"位,小数位数最多为"+myText.precise+"位的数字！\n", "2", myText);
				}else if (typeof(myText.precision)!="undefined" && typeof(myText.precise)=="undefined"){
					showMsg(errmsg + "数字位数应为"+myText.precision+"位！\n", "2", myText);
				}else if (typeof(myText.precision)=="undefined" && typeof(myText.precise)!="undefined"){
					showMsg(errmsg + "小数位数应为"+myText.precise+"位！\n", "2", myText);
				}else{
					showMsg(errmsg + "请输入数字（可包含数字和小数点）！如：1.23\n", "2", myText);
				}
				myText.focus();
				return false;
			}
			if(!checkSign(myText.value, myText.sign)){
				if (myText.sign=="+") showMsg(errmsg + "不能输入负数！", "2", myText);
				if (myText.sign=="-") showMsg(errmsg + "不能输入正数！", "2", myText);
				myText.focus();
				return false;
			}
		}
		//alert(6);
        if ((typeof(myText.length)!="undefined")&&(getRealLength(myText.value)!=parseInt(myText.length))){
            showMsg(errmsg + "输入长度应为" + myText.length + "个字符！\n\n请注意：这里的字符长度表示的是英文字符长度，一个汉字相当于两个英文字符。", "2", myText);
            myText.focus();
            return false;
        }
    //alert(7);
        if((typeof(myText.minLen)!="undefined")&&(getRealLength(myText.value)<parseInt(myText.minLen))){
            showMsg(errmsg + "输入不得小于" + myText.minLen + "个字符！\n\n请注意：这里的字符长度表示的是英文字符长度，一个汉字相当于两个英文字符。", "2", myText);
            myText.focus();
            return false;
        }
    //alert(8);
        if ((typeof(myText.maxLen)!="undefined")&&(getRealLength(myText.value)>parseInt(myText.maxLen))){
            showMsg(errmsg + "输入长度超过" + myText.maxLen + "个字符！\n\n请注意：这里的字符长度表示的是英文字符长度，一个汉字相当于两个英文字符。", "2", myText);
            myText.focus();
            return false;
        }
    //alert(9);
        if (myText.type=="password"&& !isPassword(myText.value)){
						showMsg(errmsg + "请不要输入分号（;）、和空格！\n", "2", myText);
						myText.value="";
						myText.focus();
						return false;
				}
	// alert(10);
				if (myText.type=="file" && !isPath(myText.value)){
						showMsg(errmsg + "路径格式不正确！\n","2",myText);
						myText.focus();
						return false;
				}
              
	}
//alert(10);
	return true;
}
//////////////////////////////////////////////////
// 函数名：checkForm
//    根据参数检查form中的对象正确性。
// 参数：
//    myText - 页面Form中的输入对象
// 返回值：
//		true	格式正确
//		false	格式错误
//////////////////////////////////////////////////
function checkForm(myFrm)
{
	var eArray = myFrm.elements;
	for(var i=0;i<eArray.length;i++){
		if ((eArray[i].type=="text" || eArray[i].type=="textarea" ||
		    eArray[i].type=="password" || eArray[i].type=="file") && !eArray[i].disabled){
            eArray[i].value = trim(eArray[i].value);
			if (!checkText(eArray[i]))	return false;
		}
	}
	  
	return checkPassword(myFrm);
}
//doc检查校验
function checkDoc(myDoc)
{
	var fArray = myDoc.forms;
	for(var i=0;i<fArray.length;i++){
		if (!checkForm(fArray[i])) return false;
	}
	return true;
}

function showMsg(mDesc,mStyle,mTitle){
	alert(mDesc);
}


//////////////////////////////////////////////////
// 函数名：isPhone
//    检查字符串中是否包含不符合要求的字符，符合电话的字符是数字、和中线（-）。
// 参数：
//    str - 检查字符串
// 返回值：
//    true	格式正确
//    false	格式错误
//////////////////////////////////////////////////
function isPhone(str)
{
	return (rePhone.test(str));
}

//////////////////////////////////////////////////
// 函数名：isCode
//   检查字符串中是否包含不符合要求的字符，符合编号的字符是数字、大小写字母。
// 参数：
//    str - 检查字符串
// 返回值：
//	  true	格式正确
//	  false	格式错误
//////////////////////////////////////////////////
function isCode(str)
{
	return (reAlphanumeric.test(str));
}

///////////////////////////////////////////////////////////////////////////////
// 函数名：isDigit
//   检查字符串中是否只包含数字。合法的组合有“0000”，“1234567890”等，不合法的组合有“-1900”。
// 参数：
//    str - 检查字符串
// 返回值：
//	  true	格式正确
//	  false	格式错误
//////////////////////////////////////////////////////////////////////
function isDigit(str)
{
    return (reDigit.test(str));
}

///////////////////////////////////////////////////////////////////////////////
// 函数名：isPassword
//   检查字符串中是否包含分号和空格符号，如果存在则不符合密码要求。如
//   “asdfasd”为合法密码，“adsf adsf”和“asdf;”不符合密码格式要求。
// 参数：
//    str - 检查字符串
// 返回值：
//	  true	格式正确
//	  false	格式错误
//////////////////////////////////////////////////////////////////////
function isPassword(str)
{
    return (!hasSpecial(str,rePassword));
}

/////////////////////////////////////////////////
// 函数名：isNameSpell
//		检查给定的字符串是否为英文字母或空格（主要用户检查姓名的拼音书写形式）
// 参数：
//		str -	字符串
// 返回值：
//		true	空
//		false	不空
/////////////////////////////////////////////////
function isNameSpell (str)
{
	return (reNameSpell.test(str));
}

/////////////////////////////////////////////////
// 函数名：isYearMonth
//		检查字符串中的日期格式是否正确
// 参数：
//		str - 检查日期，格式为：yyyy-mm
// 返回值：
//		true	日期正确
//		false	日期错误
/////////////////////////////////////////////////
function isYearMonth(str){    
    return isDate(str+"-01");
}
function isMinLength(tname,vlength){
      var v_min = tname.value;
      if(typeof(tname)!="undefined"&&!isEmpty(tname.value)){
	      if((typeof(v_min)!="undefined") && v_min.length < vlength){
	          showMsg(tname.name+ "输入不能小于"+vlength, tname);
	          tname.focus();
	      }
     }
}
function checkPassword(myFrm){
	var eArray = myFrm.elements;
	var pass1="";
	var pass2="";
	var pass3="";
	var j=0;
	var tname =0;
	for(var i=0;i<eArray.length;i++){
		if (eArray[i].type=="password"&& !eArray[i].disabled){
            eArray[i].value = trim(eArray[i].value);
            if(checkchinese(eArray[i].value)){
                showMsg("密码输入不能为汉字！可为数字、字母", "");
                return false;
              }
            if(j==0){
              pass1 = eArray[i].value;
              tname = i;
            }else if(j==1)
              pass2 = eArray[i].value;
            else if(j==2)
            	pass3 = eArray[i].value; 	
            j++;
		}
	} 
	 
	 if(pass3!=0){ 
			   if (pass1!=pass2 || pass1!=pass3){
					   eArray[tname].focus();
					   eArray[tname].value="";
					   eArray[++tname].value="";
					   eArray[++tname].value="";
					   showMsg("密码不相同请从新输入！","");
			   return false;
			  }
			   
	 }else{
	 	     if (pass1!=pass2){
			 	     eArray[tname].focus();
					   eArray[tname].value="";
					   eArray[++tname].value="";
			 	     showMsg("密码不相同请从新输入！","");
			   return false;
			  }
			}
	return true;
}
function checkchinese(str){  
   var re1 = new RegExp("^[\u4E00-\\u9fa5]*$")       //汉字的范围
   var re2 = new RegExp("^[\uE7C7-\uE7F3]*$")
   var str = str.replace(/(^\s*)|(\s*$)/g,'');
   if (str == ''){return false;}
   if (!(re1.test(str) && (! re2.test(str)))){
      return false;
   }
   return true;
}

function hasNumber(myText){
  if(myText.value.length == 0)
     return true;
  if (!isFloat(myText.value,4)){
			showMsg("请不要输入数字0至9以外的字符！\n", "2", myText);
			myText.focus();
			return false;
		}
}
