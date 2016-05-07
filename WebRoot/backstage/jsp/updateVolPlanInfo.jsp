<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String id = new String(request.getParameter("id").getBytes("ISO-8859-1"),"utf-8");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="<%=basePath %>backstage/css/global.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
<script language="javascript" type="text/javascript" src="<%=basePath %>backstage/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" charset="UTF-8">
	$(function(){
		$("#PLAN_THEME").focus(); 
		$(".esc").click(function(){
			closeLogin();
		});
		$.post("<%=basePath%>/backstage/volPlanajax_getvolPlanOne.action",{'vol_plan_info.PLAN_ID':'<%=id%>'},function(data){
			$("#PLAN_THEME").val(data[0].PLAN_THEME);
			$("#PLAN_START_TIME").val(converJavaDate(data[0].PLAN_START_TIME));
			$("#PLAN_END_TIME").val(converJavaDate(data[0].PLAN_END_TIME));
			$("#PLAN_REQUIRED_NUM").val(data[0].PLAN_REQUIRED_NUM);
			$("#PLAN_JOIN_NUM").val(data[0].PLAN_JOIN_NUM);
			$("#PLAN_LEADER1").val(data[0].PLAN_LEADER1);
			$("#PLAN_LEADER1_PHONE1").val(data[0].PLAN_LEADER1_PHONE1);
			$("#PLAN_LEADER1_PHONE2").val(data[0].PLAN_LEADER1_PHONE2);
			$("#PLAN_LEADER1_EMAIL").val(data[0].PLAN_LEADER1_EMAIL);
			$("#PLAN_LEADER2").val(data[0].PLAN_LEADER2);
			$("#PLAN_LEADER2_PHONE1").val(data[0].PLAN_LEADER2_PHONE1);
			$("#PLAN_LEADER2_PHONE2").val(data[0].PLAN_LEADER2_PHONE2);
			$("#PLAN_LEADER2_EMAIL").val(data[0].PLAN_LEADER2_EMAIL);
			$("#PLAN_INFO").val(data[0].PLAN_INFO);
			$("#PLAN_NEED_HOUR").val(data[0].PLAN_NEED_HOUR+ " 小时");
			$("#PLAN_SER_ADD").val(data[0].PLAN_SER_ADD);
		}, "json");
	});
	function closeLogin()
	{
		parent.dialogClose();
	}
	function save(){
		var PLAN_THEME = $("#PLAN_THEME").val();
		if(PLAN_THEME == ""){
			alert("活动主题不能为空！");
		}
		var PLAN_START_TIME = $("#PLAN_START_TIME").val();
		var PLAN_END_TIME = $("#PLAN_END_TIME").val();
		var PLAN_REQUIRED_NUM = $("#PLAN_REQUIRED_NUM").val();
		var PLAN_LEADER1 = $("#PLAN_LEADER1").val();
		var PLAN_LEADER1_EMAIL = $("#PLAN_LEADER1_EMAIL").val();
		if(PLAN_LEADER1_EMAIL != "" && !checkE(PLAN_LEADER1_EMAIL)){
			return;
		}
		var PLAN_LEADER1_PHONE1 = $("#PLAN_LEADER1_PHONE1").val();
		if(PLAN_LEADER1_PHONE1 != "" && !checkP(PLAN_LEADER1_PHONE1)){
			alert("请输入正确的项目负责人电话1的号码！");
			return;
		}
		var PLAN_LEADER1_PHONE2 = $("#PLAN_LEADER1_PHONE2").val();
		if(PLAN_LEADER1_PHONE2 != "" && !checkP(PLAN_LEADER1_PHONE2)){
			alert("请输入正确的项目负责人电话2的号码！");
			return;
		}
		var PLAN_LEADER2 = $("#PLAN_LEADER2").val();
		var PLAN_LEADER2_EMAIL = $("#PLAN_LEADER2_EMAIL").val();
		if(PLAN_LEADER2_EMAIL != "" && !checkE(PLAN_LEADER2_EMAIL)){
			return;
		}
		var PLAN_LEADER2_PHONE1 = $("#PLAN_LEADER2_PHONE1").val();
		if(PLAN_LEADER2_PHONE1 != "" && !checkP(PLAN_LEADER2_PHONE1)){
			alert("请输入正确的项目第二负责人电话1的号码！");
			return;
		}
		var PLAN_LEADER2_PHONE2 = $("#PLAN_LEADER2_PHONE2").val();
		if(PLAN_LEADER2_PHONE2 != "" && !checkP(PLAN_LEADER2_PHONE2)){
			alert("请输入正确的项目第二负责人电话2的号码！");
			return;
		}
		var PLAN_SER_ADD = $("#PLAN_SER_ADD").val();
		var PLAN_INFO = $("#PLAN_INFO").val();
		var PLAN_NEED_HOUR = $("#PLAN_NEED_HOUR").val();
		PLAN_NEED_HOUR = PLAN_NEED_HOUR.replace("小时", "");
		$.post("<%=basePath%>/backstage/volPlanajax_updatePlan.action",{'vol_plan_info.PLAN_ID':'<%=id%>', 'vol_plan_info.PLAN_THEME':PLAN_THEME, 'PLAN_START_TIME':PLAN_START_TIME, 'PLAN_END_TIME':PLAN_END_TIME, 'vol_plan_info.PLAN_REQUIRED_NUM':PLAN_REQUIRED_NUM, 'vol_plan_info.PLAN_LEADER1':PLAN_LEADER1, 'vol_plan_info.PLAN_LEADER1_EMAIL':PLAN_LEADER1_EMAIL, 'vol_plan_info.PLAN_LEADER1_PHONE1':PLAN_LEADER1_PHONE1, 'vol_plan_info.PLAN_LEADER1_PHONE2':PLAN_LEADER1_PHONE2, 'vol_plan_info.PLAN_LEADER2':PLAN_LEADER2, 'vol_plan_info.PLAN_LEADER2_EMAIL':PLAN_LEADER2_EMAIL, 'vol_plan_info.PLAN_LEADER2_PHONE1':PLAN_LEADER2_PHONE1, 'vol_plan_info.PLAN_LEADER2_PHONE2':PLAN_LEADER2_PHONE2,'vol_plan_info.PLAN_SER_ADD':PLAN_SER_ADD, 'vol_plan_info.PLAN_INFO':PLAN_INFO, 'vol_plan_info.PLAN_NEED_HOUR':PLAN_NEED_HOUR}, function(data){
			if(data == "SUCCESS"){
				window.parent.findIframe1("VolPlan");
				closeLogin();
			}else{
				alert("发布失败！");
			}
		}, "text");
	}
	function converJavaDate(dateTime){
	    var y = 1900+ dateTime.year;
	    var m = 1 + dateTime.month;
	    return y+'/'+m+'/'+dateTime.date+' '+dateTime.hours+':'+dateTime.minutes+':'+dateTime.seconds;
	}
	function checkE(val){
		var str = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
    	if(!str.test(val)){
    		alert("请输入正确的邮箱！");
    		return false;
    	}else{
    		return true;
    	}
	}
	function checkP(val){
		var str = new RegExp("(^[0-9]{3,4}[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)");
    	if(!str.test(val)){
    		return false;
    	}else{
    		return true;
    	}
	}
</script>
<style type="text/css">
	#mytable {
	    width: 710px;
	    padding: 0;
	    margin: 0;
	}
	th {
	    font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	    color: #4f6b72;
	    border: 1px solid #C1DAD7;
	    letter-spacing: 2px;
	    text-transform: uppercase;
	    text-align: left;
	    background: #CAE8EA url(images/bg_header.jpg) no-repeat;
	}
	td {
	    border: 1px solid #C1DAD7;
	    background: #fff;
	    font-size:12px;
	    color: #4f6b72;
	    text-align: left;
	    padding: 6px 6px 6px 12px;
	}
	input{
		border: 0px;
		height: 17px;
	}
	textarea{
		border: 0px;
	}
	input::-ms-clear{display:none;}
</style>
</head>

<body>
	<div class="tanchuceng">
		<div class="damo">修改义工活动信息</div>
		<div class="esc" title="关闭"></div>
	</div>
	
	<div class="center" style="height: 440px;">
		<table id="mytable" cellspacing="1">
			<tr>
				<th scope="col" abbr="PLAN_THEME">活动主题:</th>
				<td colspan="3"><input type="text" id="PLAN_THEME" style="width: 550px;" /></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_START_TIME">开始时间:</th>
				<td width="200"><input type="text" class="Wdate" id="PLAN_START_TIME" onclick="WdatePicker({dateFmt:'yyyy/MM/dd HH:mm:ss'});" style="border: 0px; width: 200px;height: 15px;"/></td>
				<th scope="col" abbr="PLAN_END_TIME">结束时间:</th>
				<td><input type="text" class="Wdate" id="PLAN_END_TIME" onclick="WdatePicker({dateFmt:'yyyy/MM/dd HH:mm:ss'});" style="border: 0px;width: 200px;height: 15px;"/></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_NEED_HOUR">活动用时:</th>
				<td><input type="text" id="PLAN_NEED_HOUR" style="width: 200px;"/></td>
				<th scope="col" abbr="PLAN_REQUIRED_NUM">需要参与人数:</th>
				<td><input type="text" id="PLAN_REQUIRED_NUM" style="width: 200px;"/></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_LEADER1">项目负责人:</th>
				<td><input type="text" id="PLAN_LEADER1" style="width: 200px;"/></td>
				<th scope="col" abbr="PLAN_LEADER1_EMAIL">项目负责人邮箱:</th>
				<td><input type="text" id="PLAN_LEADER1_EMAIL" style="width: 200px;"/></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_LEADER1_PHONE1">项目负责人电话1:</th>
				<td><input type="text" id="PLAN_LEADER1_PHONE1" style="width: 200px;"/></td>
				<th scope="col" abbr="PLAN_LEADER1_PHONE2">项目负责人电话2:</th>
				<td><input type="text" id="PLAN_LEADER1_PHONE2" style="width: 200px;"/></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_LEADER2">项目第二负责人:</th>
				<td><input type="text" id="PLAN_LEADER2" style="width: 200px;"/></td>
				<th scope="col" abbr="PLAN_LEADER2_EMAIL">项目第二负责人邮箱:</th>
				<td><input type="text" id="PLAN_LEADER2_EMAIL" style="width: 200px;"/></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_LEADER2_PHONE1">项目第二负责人电话1:</th>
				<td><input type="text" id="PLAN_LEADER2_PHONE1" style="width: 200px;"/></td>
				<th scope="col" abbr="PLAN_LEADER2_PHONE2">项目第二负责人电话2:</th>
				<td><input type="text" id="PLAN_LEADER2_PHONE2" style="width: 200px;"/></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_SER_ADD">活动地点:</th>
				<td colspan="3"><input type="text" id="PLAN_SER_ADD" style="width: 550px;"/></td>
			</tr>
			<tr>
				<th scope="col" colspan="4" abbr="PLAN_INFO" style="text-align: center; height: 25px;">活动内容  ↓</th>
			</tr>
			<tr>
				<td colspan="4" style="height: 150px;"><textarea id="PLAN_INFO" style="height: 150px; width: 680px;"></textarea></td>
			</tr>
			<tr style="border: 0px;">
				<td style="border: 0px; height: 25px;"></td>
				<td style="border: 0px; height: 25px;"><input onclick="save();" type="button" style="height: 25px; float: right; background-color: #CAE8EA; width: 80px;" value="确认修改"></td>
				<td style="border: 0px; height: 25px;"><input onclick="closeLogin();" type="button" style="height: 25px; float: left; width: 80px;" value="  取  消  "></td>
				<td style="border: 0px; height: 25px;"></td>
			</tr>
		</table>
	</div>
</body>
<script type="text/javascript" charset="UTF-8">
	$(function(){
		$("#PLAN_REQUIRED_NUM").keyup(function(){
			var str = new RegExp("^[0-9]*$");
	    	if(!str.test($(this).val())){
	    		alert("请输入数字！");
	    		$("#PLAN_REQUIRED_NUM").val("");
	    	}
		});
		$("input").click(function(){
			var id = $(this).attr("id");
			if(id != "PLAN_START_TIME" && id != "PLAN_END_TIME"){
				var PLAN_START_TIME = $("#PLAN_START_TIME").val();
				var PLAN_END_TIME = $("#PLAN_END_TIME").val();
				if(PLAN_START_TIME != "" && PLAN_START_TIME != null && PLAN_START_TIME != undefined && PLAN_END_TIME != "" && PLAN_END_TIME != null && PLAN_END_TIME != undefined){
					var date1 = new Date(PLAN_START_TIME);
					var date2 = new Date(PLAN_END_TIME);
					var date3 = date2 - date1;
					var hours = date3/(3600*1000);
					$("#PLAN_NEED_HOUR").val((Math.round(hours*10)/10.0) +" 小时 ");
				}
			}
		});
	});
</script>
</html>
