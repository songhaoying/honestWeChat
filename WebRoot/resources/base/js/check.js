///////////////////////////////////////////////
//                Variable
//�����˵绰����isPhone����
//�����˱������ isCode����
// 2004-9-9 �������ж����ڸ�ʽ����ǰ��0��ת������   
// 2004-9-13 ��С���ڸ�ʽ�ķ�Χ��ֻ��ʹ�����ߣ�-����Ϊ���ڸ�ʽ�ָ���
// 2004-9-15 ���ӿɵ���ʹ�õ��ж��Ƿ�Ϊ��������ɵ��ַ��� isDigit ���������ж��Ƿ���������ʽ��isPassword����
// 2004-9-30 �޸�isNumber�����й�������β���ĳ�������
// 2004-10-29 �޸�isNumber�����еģ���С�����֣�û�м�ȥС����С���㳤���жϵĴ���
// 2004-11-4 �޸�isNumber�����еģ��������ֵĳ����ж��߼�����ȷ�Ĵ���
// 2004-11-5 17:03 �޸�checkDateTime�����еģ���ʼʱ����ڽ���ʱ�䣬����true�Ĵ���
// 2005-1-5 16:40  �޸�isDate��isYearMonth�����й�������Ϊ0ʱ����Ϊtrue�Ĵ�����С���ڸ�ʽ�ĺϷ���Χ��
// 2005-1-31 9:52  �޸�Form���еļ�ⷶΧ�������Ϊdisabled���򲻼�⡣
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

var reNameSpell = /^[a-zA-Z ]+$/ //����һ���ո�

var rePassword = /[;\s]/
/////////////////////////////////////////////////
//                Function                     //
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// ��������ltrim, rtrim, trim
//    ȥ���ַ�����ǰ��ո�
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
// ��������isEmpty
//		���������ַ����Ƿ�Ϊ��
// ������
//		str -	�ַ���
// ����ֵ��
//		true	��
//		false	����
/////////////////////////////////////////////////
function isEmpty (str)
{
	return ((trim(str).length == 0)||(str == null));
}

/////////////////////////////////////////////////
// ��������isInteger
//		������ַ�����Ϊ�������
// ������
//		str -	�������
// ����ֵ��
//		true	����
//		false	������
/////////////////////////////////////////////////
function isInteger (str)
{
	return (reInteger.test(str));
}

/////////////////////////////////////////////////
// ��������isBetween
//		�������ַ�������ֵ�Ƿ���ָ����Χ��
// ������
//		val - �Ƚ�ֵ
//		lo	- ��Сֵ
//		hi	- ���ֵ
// ����ֵ��
//		true	��ָ����Χ��
//		false	����ָ����Χ��
// ˵����
//    �������������ַ�����
/////////////////////////////////////////////////
function isBetween (val, lo, hi) {
	return ((parseFloat(val) <= parseFloat(lo)) && (parseFloat(val) >= parseFloat(hi)));
}

/////////////////////////////////////////////////
// ��������isDate
//		����ַ����е����ڸ�ʽ�Ƿ���ȷ
// ������
//		str - ������ڣ���ʽΪ��yyyy-mm-dd
// ����ֵ��
//		true	������ȷ
//		false	���ڴ���
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
// ��������isTime
//		����ַ����е�ʱ���Ƿ���ȷ
// ������
//		str - ���ʱ�䣬��ʽΪ��hh:mm:ss �� hh:mm
// ����ֵ��
//		true	ʱ����ȷ
//		false	ʱ�����
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
// ��������htmlEncode��htmlDecode
//		ת��HTML��ʹ�õ������ַ�������&��<��>��"��
// ������
//		conValue - Ҫת��������
// ����ֵ��
//    ת����ϵ�����
// ˵����
//    ��Ҫ������ȡҳ����ʾ�ַ���JavaScript�У����䷴���̡�
/////////////////////////////////////////////////
function htmlEncode(conValue){
	return conValue.replace(/&/gi,"&amp;").replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\"/gi,"&quot;");
}
function htmlDecode(conValue){
	return conValue.replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,"\"").replace(/&amp;/gi,"&");
}
*/
///////////////////////////////////////////////////
// ��������isIP
//		����ַ����е�IP��ַ��ʽ�Ƿ���ȷ
// ������
//		str - IP��ַ���ַ���ֵ
// ����ֵ��
//    �Ƿ�IP��ַ��Ч
// ˵����
//    ֻ����Ƿ���������IP��ַ������ⲻʹ�õ�����IP��ַ��
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
// ��������isEmail
//		����ַ����еĵ����ʼ���ַ��ʽ����ȷ��
// ������
//		str	-	�����ʼ���ַ
// ����ֵ��
//		true	��ʽ��ȷ
//		false	��ʽ����
// ˵����
//    �����������
/////////////////////////////////////////////////
function isEmail (str)
{
	return (reEmail.test(str));
}

/////////////////////////////////////////////////
// ��������isFloat
//		������ַ����Ƿ����ʵ����ʽ
// ������
//		str	-	����ַ���
//		prec	-	С��λ���ȣ�����ʡ��
// ����ֵ��
//		true	ʵ��
//		false	��ʵ��
// ˵����
//    ��鶨��С��λ�Ƿ�����ָ�����ȣ�������Եڶ����������򲻼��С��λ����
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
// ��������isNumber
//		������ַ����Ƿ����ʵ����ʽ����isFloatԭ����ͬ
// ������
//		str	- ����ַ���
//    len	- ʵ�����ܳ��ȣ�����С�����֣���С���㡣
//		prec	- С��λ���ȣ�����ʡ��
// ����ֵ��
//		true	ʵ��
//		false	��ʵ��
// ˵����
//    ��鶨��С��λ�Ƿ�����ָ�����ȣ�������Ե�3���������򲻼��С��λ����
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
// ��������checkSign
//		������ַ����Ƿ����������Ҫ�󣬺�isFloatԭ����ͬ
// ������
//		str	- ����ַ���
//    sp		- �������ţ�+���������ţ�-�������Ժ��ԡ�
// ����ֵ��
//		true	ʵ��
//		false	��ʵ��
// ˵����
//    ��鶨��С��λ�Ƿ�����ָ������ֵ�������򲻼����š�
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
// ��������hasSpecial
//    У���Ƿ���������ַ�����֮һ���������ţ�,�����ֺţ�;���������ţ�������˫���ţ�"��
//                                  �����ţ�<���������ţ�>����б�ߣ�\������б�ߣ�/��������ţ�&��
// ������
//		str	-	����ַ���
//      reg -   ָ����������ʽ�����Դ˲�����ʹ��Ĭ��������ʽ�� /[\s;]/
// ����ֵ��
//		true	����
//		false	������
//////////////////////////////////////////////////
function hasSpecial(str, reg){
    if(typeof(reg)=="undefined")
	    return special.test(str);
    else
        return reg.test(str);
}

//////////////////////////////////////////////////
// ��������getRealLength
//    �õ��ַ�������ʵ���ȣ�һ�������ַ���������Ӣ���ַ���
// ������
//		str	-	����ַ���
//		prec	-	С��λ, ����ʡ��
// ����ֵ��
//		n - ��������ַ�������
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
// ��������checkDateTime
//    ��������Ƿ�����Ҫ����Ⱥ�˳��
// ������
//		date1 - ��ʼ����
//    time1 - ��ʼʱ�䣨�ɺ��ԣ�
//    date2 - ��������
//    time2 - ����ʱ�䣨�ɺ��ԣ�
// ����ֵ��
//		true  ��ʼ����ʱ��С�ڽ�������ʱ��
//		false	��ʼ����ʱ����ڽ�������ʱ�䣬������ʱ�䲻���ϸ�ʽ��
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
// ��������checkTime
//    ���ʱ���Ƿ�����Ҫ����Ⱥ�˳��
// ������
//    time1 - ��ʼʱ��
//    time2 - ����ʱ��
// ����ֵ��
//		true  ��ʼʱ��С�ڽ���ʱ��
//		false	��ʼʱ����ڽ���ʱ�䣬��ʱ�䲻���ϸ�ʽ��
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
// ��������_getDateTime
//    ��������ʱ���ַ�������Date����js�ļ����ڲ�ʹ�á�
// ������
//    mydate - ����
//    mytime - ʱ��
// ����ֵ��
//		date Dateʵ��
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
// ��������_isPath
//    ����ַ����е��ϴ�·����ʽ����ȷ�ԡ�
// ������
//    str - �ϴ�·��
// ����ֵ��
//		true	��ʽ��ȷ
//		false	��ʽ����
//////////////////////////////////////////////////
function isPath(str)
{
	return (rePath.test(str));
}

//////////////////////////////////////////////////
//����Ƿ�Ϊ��
//////////////////////////////////////////////////
function isZero(str)
{
	return (isFloat(str)&&(parseInt((str.lastIndexOf("0")!=-1)?str.substring(str.lastIndexOf("0")+1,str.length):str)==0));
}

//////////////////////////////////////////////////
// ��������checkText
//    ���ݲ��������ȷ�ԡ�
// ������
//    myText - ҳ��Form�е��������
// ����ֵ��
//		true	��ʽ��ȷ
//		false	��ʽ����
// ˵����
//    ע���ǩ���ַ���Сд
//    Ԫ�ز�����noCheck - ������ǡ�
//             isEmpty - ���Ԫ�ز�����Ϊ�ա�
//             isZero - ���Ԫ�ز�����Ϊ�㡣
//              ���ϵı�ǩ����Ҫ�����д������ֵ��ֻҪ���ڱ�ǩ��js����ͻ��Զ����
//
//             dataType - ������string, int, number ,digit , date, time, email, ip, path, phone, code,  password , spell,
//                              yearmonth
//                           �����ģ������У�english, ENGLISH, English
//             precision - �����ܳ��ȣ�����С�����֡�����������
//             precise - ����С�����ֳ��ȡ�����������
//             maxLen - �ַ�����󳤶ȣ���С��������ȡ�����������
//             minLen - �ַ�����С���ȣ��ɴ���������ȡ�����������
//             length - �ַ�����׼���ȣ����ܴ��ڻ�С��������ȡ�����������
//             caption - ��Ԫ�ص����ƣ���ʾ����ʾ��Ϣ�У���Ҫ�ġ��������ַ���
//             sign - ���ֵ������ű�ʶ��������������+������-����������
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
		showMsg(errmsg + "����Ϊ�գ�����ֻ�����հ��ַ���\n","2",myText);
		myText.focus();
		return false;
	}
	if(!isEmpty(myText.value)){
//		alert(2.2);
		// ����isZero�������ж�Ԫ��ֵ�Ƿ�Ϊ��
		if (typeof(myText)!="undefined" && isZero(myText.value)){
			showMsg(errmsg + "����Ϊ�㣡\n","2",myText);
			myText.focus();
			return false;
		}
//		alert(2.3);
		// ����dataType�������ж�·�����Ƹ�ʽ�Ƿ���ȷ
		if (myText.dataType=="path" && !isPath(myText.value)){
			showMsg(errmsg + "·����ʽ����ȷ��\n","2",myText);
			myText.focus();
			return false;
		}
//		alert(2.4);
		// ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ����������0��
		if (myText.dataType=="int"){
			if(!isInteger(myText.value)){
				showMsg(errmsg + "���������֣��磺123\n", "2", myText);
				myText.focus();
				return false;
			}
			if(!checkSign(myText.value, myText.sign)){
				if (myText.sign=="+") showMsg(errmsg + "�������븺����", "2", myText);
				if (myText.sign=="-") showMsg(errmsg + "��������������", "2", myText);
				myText.focus();
				return false;
			}
		}
//		alert(2.5);
		// ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ���IP��ַ��
		if (myText.dataType=="ip" && !isIP(myText.value)){

			showMsg(errmsg + "������IP��ַ���磺192.168.0.1��\n", "2", myText);
			myText.focus();
			return false;
		}
//		alert(2.6);
		// ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ������ڡ�
		if (myText.dataType=="date"&&!isDate(myText.value)){
			showMsg(errmsg + "��������ȷ���ڣ�\n\n֧�ֵ����ڸ�ʽ�У�YYYY-MM-DD��\n", "2", myText);
			myText.focus();
			return false;
		}
//		alert("2.7");
		// ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ���ʱ�䡣
		if (myText.dataType=="time"&&!isTime(myText.value)){
			showMsg(errmsg + "��������ȷʱ�䣨hh:mm:ss��hh:mm����\n", "2", myText);
			myText.focus();
			return false;
		}
//		alert("2.8");
		// ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ����ʼ���ַ��
		if (myText.dataType=="email"&& !isEmail(myText.value)){
			showMsg(errmsg + "��������ȷ��E-Mail��ַ��admin@hostname.com����\n", "2", myText);
			myText.focus();
			return false;
		}
//			alert("2.9");
        // ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ��ĵ绰��
		if (myText.dataType=="phone"&& !isPhone(myText.value)){
			showMsg(errmsg + "��������ȷ�ĵ绰��ʽ��ֻ�ܰ������ֺ��к��ߡ� - ������\n", "2", myText);
			myText.focus();
			return false;
		}
//			alert("2.10");
        // ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ��ı�Ÿ�ʽ��
		if (myText.dataType=="code"&& !isCode(myText.value)){
			showMsg(errmsg + "�벻Ҫ��������֣��ʹ�СдӢ���ַ�֮����ַ���\n", "2", myText);
			myText.focus();
			return false;
		}
//			alert("2.11");
        // ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ�������ƴ��ƴд��ʽ��
		if (myText.dataType=="yearmonth"&& !isYearMonth(myText.value)){
			showMsg(errmsg + "��������ȷ���ڣ�\n\n֧�ֵ����ڸ�ʽ�У�YYYY-MM��\n", "2", myText);
			myText.focus();
			return false;
		}
		
        // ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ���������ʽ�����ڸ�ʽ��
		if (myText.dataType=="spell"&& !isNameSpell(myText.value)){
			showMsg(errmsg + "�벻Ҫ�����СдӢ���ַ��Ϳո�֮����ַ���\n", "2", myText);
			myText.focus();
			return false;
		}
		if (myText.dataType=="password"&& !isPassword(myText.value)){
			showMsg(errmsg + "�벻Ҫ����ֺţ�;�����Ϳո�\n", "2", myText);
			myText.focus();
			return false;
		}
		if (myText.dataType=="digit"&& !isDigit(myText.value)){
			showMsg(errmsg + "�벻Ҫ��������0��9������ַ���\n", "2", myText);
			myText.focus();
			return false;
		}

		//�����ַ�
        if(myText.dataType=="string" && hasSpecial(myText.value)){
            showMsg(errmsg + "�벻Ҫ�������µ������ַ���\n\n�磺���ţ�,�����ֺţ�;���������ţ�\������˫���ţ�\"�����Ϸ��ţ�&��\n        �����ţ�<���������ţ�>����б�ߣ�\\������б�ߣ�\/��\n",2,myText);
            myText.focus();
            return false;
        }
		// ����dataType�������ж�Ԫ��ֵ�Ƿ�Ϊ�Ϸ�����ֵ��
		if(myText.dataType=="number"){
			if(!isNumber(myText.value, myText.precision, myText.precise)){
				if(typeof(myText.precision)!="undefined"&&typeof(myText.precise)!="undefined"){
					showMsg(errmsg +"����λ�����Ϊ"+(parseInt(myText.precision) - parseInt(myText.precise) - 1)+"λ,С��λ�����Ϊ"+myText.precise+"λ�����֣�\n", "2", myText);
				}else if (typeof(myText.precision)!="undefined" && typeof(myText.precise)=="undefined"){
					showMsg(errmsg + "����λ��ӦΪ"+myText.precision+"λ��\n", "2", myText);
				}else if (typeof(myText.precision)=="undefined" && typeof(myText.precise)!="undefined"){
					showMsg(errmsg + "С��λ��ӦΪ"+myText.precise+"λ��\n", "2", myText);
				}else{
					showMsg(errmsg + "���������֣��ɰ������ֺ�С���㣩���磺1.23\n", "2", myText);
				}
				myText.focus();
				return false;
			}
			if(!checkSign(myText.value, myText.sign)){
				if (myText.sign=="+") showMsg(errmsg + "�������븺����", "2", myText);
				if (myText.sign=="-") showMsg(errmsg + "��������������", "2", myText);
				myText.focus();
				return false;
			}
		}
		//alert(6);
        if ((typeof(myText.length)!="undefined")&&(getRealLength(myText.value)!=parseInt(myText.length))){
            showMsg(errmsg + "���볤��ӦΪ" + myText.length + "���ַ���\n\n��ע�⣺������ַ����ȱ�ʾ����Ӣ���ַ����ȣ�һ�������൱������Ӣ���ַ���", "2", myText);
            myText.focus();
            return false;
        }
    //alert(7);
        if((typeof(myText.minLen)!="undefined")&&(getRealLength(myText.value)<parseInt(myText.minLen))){
            showMsg(errmsg + "���벻��С��" + myText.minLen + "���ַ���\n\n��ע�⣺������ַ����ȱ�ʾ����Ӣ���ַ����ȣ�һ�������൱������Ӣ���ַ���", "2", myText);
            myText.focus();
            return false;
        }
    //alert(8);
        if ((typeof(myText.maxLen)!="undefined")&&(getRealLength(myText.value)>parseInt(myText.maxLen))){
            showMsg(errmsg + "���볤�ȳ���" + myText.maxLen + "���ַ���\n\n��ע�⣺������ַ����ȱ�ʾ����Ӣ���ַ����ȣ�һ�������൱������Ӣ���ַ���", "2", myText);
            myText.focus();
            return false;
        }
    //alert(9);
        if (myText.type=="password"&& !isPassword(myText.value)){
						showMsg(errmsg + "�벻Ҫ����ֺţ�;�����Ϳո�\n", "2", myText);
						myText.value="";
						myText.focus();
						return false;
				}
	// alert(10);
				if (myText.type=="file" && !isPath(myText.value)){
						showMsg(errmsg + "·����ʽ����ȷ��\n","2",myText);
						myText.focus();
						return false;
				}
              
	}
//alert(10);
	return true;
}
//////////////////////////////////////////////////
// ��������checkForm
//    ���ݲ������form�еĶ�����ȷ�ԡ�
// ������
//    myText - ҳ��Form�е��������
// ����ֵ��
//		true	��ʽ��ȷ
//		false	��ʽ����
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
//doc���У��
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
// ��������isPhone
//    ����ַ������Ƿ����������Ҫ����ַ������ϵ绰���ַ������֡������ߣ�-����
// ������
//    str - ����ַ���
// ����ֵ��
//    true	��ʽ��ȷ
//    false	��ʽ����
//////////////////////////////////////////////////
function isPhone(str)
{
	return (rePhone.test(str));
}

//////////////////////////////////////////////////
// ��������isCode
//   ����ַ������Ƿ����������Ҫ����ַ������ϱ�ŵ��ַ������֡���Сд��ĸ��
// ������
//    str - ����ַ���
// ����ֵ��
//	  true	��ʽ��ȷ
//	  false	��ʽ����
//////////////////////////////////////////////////
function isCode(str)
{
	return (reAlphanumeric.test(str));
}

///////////////////////////////////////////////////////////////////////////////
// ��������isDigit
//   ����ַ������Ƿ�ֻ�������֡��Ϸ�������С�0000������1234567890���ȣ����Ϸ�������С�-1900����
// ������
//    str - ����ַ���
// ����ֵ��
//	  true	��ʽ��ȷ
//	  false	��ʽ����
//////////////////////////////////////////////////////////////////////
function isDigit(str)
{
    return (reDigit.test(str));
}

///////////////////////////////////////////////////////////////////////////////
// ��������isPassword
//   ����ַ������Ƿ�����ֺźͿո���ţ���������򲻷�������Ҫ����
//   ��asdfasd��Ϊ�Ϸ����룬��adsf adsf���͡�asdf;�������������ʽҪ��
// ������
//    str - ����ַ���
// ����ֵ��
//	  true	��ʽ��ȷ
//	  false	��ʽ����
//////////////////////////////////////////////////////////////////////
function isPassword(str)
{
    return (!hasSpecial(str,rePassword));
}

/////////////////////////////////////////////////
// ��������isNameSpell
//		���������ַ����Ƿ�ΪӢ����ĸ��ո���Ҫ�û����������ƴ����д��ʽ��
// ������
//		str -	�ַ���
// ����ֵ��
//		true	��
//		false	����
/////////////////////////////////////////////////
function isNameSpell (str)
{
	return (reNameSpell.test(str));
}

/////////////////////////////////////////////////
// ��������isYearMonth
//		����ַ����е����ڸ�ʽ�Ƿ���ȷ
// ������
//		str - ������ڣ���ʽΪ��yyyy-mm
// ����ֵ��
//		true	������ȷ
//		false	���ڴ���
/////////////////////////////////////////////////
function isYearMonth(str){    
    return isDate(str+"-01");
}
function isMinLength(tname,vlength){
      var v_min = tname.value;
      if(typeof(tname)!="undefined"&&!isEmpty(tname.value)){
	      if((typeof(v_min)!="undefined") && v_min.length < vlength){
	          showMsg(tname.name+ "���벻��С��"+vlength, tname);
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
                showMsg("�������벻��Ϊ���֣���Ϊ���֡���ĸ", "");
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
					   showMsg("���벻��ͬ��������룡","");
			   return false;
			  }
			   
	 }else{
	 	     if (pass1!=pass2){
			 	     eArray[tname].focus();
					   eArray[tname].value="";
					   eArray[++tname].value="";
			 	     showMsg("���벻��ͬ��������룡","");
			   return false;
			  }
			}
	return true;
}
function checkchinese(str){  
   var re1 = new RegExp("^[\u4E00-\\u9fa5]*$")       //���ֵķ�Χ
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
			showMsg("�벻Ҫ��������0��9������ַ���\n", "2", myText);
			myText.focus();
			return false;
		}
}
