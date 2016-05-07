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
<script type="text/javascript" charset="UTF-8">
	$(function(){
		$(".esc").click(function(){
			closeLogin();
		});
		$.post("<%=basePath%>/backstage/volPlanajax_getvolPlanOne.action",{'vol_plan_info.PLAN_ID':'<%=id%>'},function(data){
			$("#PLAN_THEME").html(data[0].PLAN_THEME);
			$("#PLAN_START_TIME").html(converJavaDate(data[0].PLAN_START_TIME));
			$("#PLAN_END_TIME").html(converJavaDate(data[0].PLAN_END_TIME));
			$("#PLAN_REQUIRED_NUM").html(data[0].PLAN_REQUIRED_NUM);
			$("#PLAN_JOIN_NUM").html(data[0].PLAN_JOIN_NUM);
			$("#PLAN_LEADER1").html(data[0].PLAN_LEADER1);
			$("#PLAN_LEADER1_PHONE1").html(data[0].PLAN_LEADER1_PHONE1);
			$("#PLAN_LEADER1_PHONE2").html(data[0].PLAN_LEADER1_PHONE2);
			$("#PLAN_LEADER1_EMAIL").html(data[0].PLAN_LEADER1_EMAIL);
			$("#PLAN_LEADER2").html(data[0].PLAN_LEADER2);
			$("#PLAN_LEADER2_PHONE1").html(data[0].PLAN_LEADER2_PHONE1);
			$("#PLAN_LEADER2_PHONE2").html(data[0].PLAN_LEADER2_PHONE2);
			$("#PLAN_LEADER2_EMAIL").html(data[0].PLAN_LEADER2_EMAIL);
			$("#PLAN_INFO").html(data[0].PLAN_INFO);
			$("#PLAN_NEED_HOUR").html(data[0].PLAN_NEED_HOUR+" 小时");
			$("#PLAN_SER_ADD").html(data[0].PLAN_SER_ADD);
			if(data[0].PLAN_FLAG == "0"){
				$("#PLAN_FLAG").html("报名中");
			}else if(data[0].PLAN_FLAG == "1"){
				$("#PLAN_FLAG").html("报名截止");
			}
			$("#PLAN_RECORD_DATE").html(converJavaDate(data[0].PLAN_RECORD_DATE));
		}, "json");
	});
	function closeLogin()
	{
		parent.dialogClose();
	}
	function converJavaDate(dateTime){
	    var y = 1900+ dateTime.year;
	    var m = 1 + dateTime.month;
	    return y+'/'+m+'/'+dateTime.date+' '+dateTime.hours+':'+dateTime.minutes+':'+dateTime.seconds;
	}
</script>
<style type="text/css">
	#mytable {
	    width: 710px;
	    padding: 0;
	    margin: 0;
	}
	th {
		width: 140px;
	    font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	    color: #4f6b72;
	    border: 1px solid #C1DAD7;
	    letter-spacing: 2px;
	    text-transform: uppercase;
	    text-align: left;
	    padding: 6px 6px 6px 12px;
	    background: #CAE8EA url(images/bg_header.jpg) no-repeat;
	}
	td {
	    border: 1px solid #C1DAD7;
	    background: #fff;
	    font-size:12px;
	    padding: 6px 6px 6px 12px;
	    color: #4f6b72;
	    text-align: left;
	}
</style>
</head>

<body>
	<div class="tanchuceng">
		<div class="damo">查看义工活动信息</div>
		<div class="esc" title="关闭"></div>
	</div>
	
	<div class="center" style="height: 440px;">
		<table id="mytable" cellspacing="1">
			<tr>
				<th scope="col" abbr="PLAN_THEME">活动主题:</th>
				<td id="PLAN_THEME" colspan="3" style="width: 230px;"></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_START_TIME">开始时间:</th>
				<td id="PLAN_START_TIME"></td>
				<th scope="col" abbr="PLAN_END_TIME">结束时间:</th>
				<td id="PLAN_END_TIME"></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_REQUIRED_NUM">需要参与人数:</th>
				<td id="PLAN_REQUIRED_NUM"></td>
				<th scope="col" abbr="PLAN_JOIN_NUM">已参与人数:</th>
				<td id="PLAN_JOIN_NUM"></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_LEADER1">项目负责人:</th>
				<td id="PLAN_LEADER1"></td>
				<th scope="col" abbr="PLAN_LEADER1_EMAIL">项目负责人邮箱:</th>
				<td id="PLAN_LEADER1_EMAIL"></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_LEADER1_PHONE1">项目负责人电话1:</th>
				<td id="PLAN_LEADER1_PHONE1"></td>
				<th scope="col" abbr="PLAN_LEADER1_PHONE2">项目负责人电话2:</th>
				<td id="PLAN_LEADER1_PHONE2"></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_LEADER2">项目第二负责人:</th>
				<td id="PLAN_LEADER2"></td>
				<th scope="col" abbr="PLAN_LEADER2_EMAIL">项目第二负责人邮箱:</th>
				<td id="PLAN_LEADER2_EMAIL"></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_LEADER2_PHONE1">项目第二负责人电话1:</th>
				<td id="PLAN_LEADER2_PHONE1"></td>
				<th scope="col" abbr="PLAN_LEADER2_PHONE2">项目第二负责人电话2:</th>
				<td id="PLAN_LEADER2_PHONE2"></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_SER_ADD">活动地点:</th>
				<td colspan="3" id="PLAN_SER_ADD"></td>
			</tr>
			<tr>
				<th scope="col" abbr="PLAN_NEED_HOUR">活动用时:</th>
				<td id="PLAN_NEED_HOUR"></td>
				<th scope="col" abbr="PLAN_RECORD_DATE">活动发起时间:</th>
				<td id="PLAN_RECORD_DATE"></td>
			</tr>
			<tr>
				<th scope="col" colspan="2" abbr="PLAN_INFO" style="text-align: center;">活动内容  ↓</th>
				<th scope="col" abbr="PLAN_FLAG">活动状态:</th>
				<td id="PLAN_FLAG"></td>
			</tr>
			<tr>
				<td colspan="4" style="height: 190px; padding: 0px 0px 0px 0px;"><textarea id="PLAN_INFO" style="height: 190px; border: 0px; width: 705px;" disabled="disabled"></textarea></td>
			</tr>
		</table>
	</div>
</body>
</html>
