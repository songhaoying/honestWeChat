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
		$.post("<%=basePath%>/backstage/organajax_getorganOne.action",{'organ_info.COMPANY_ID':'<%=id%>'},function(data){
			$("#COMPANY_NAME").html(data[0].COMPANY_NAME);
			$("#CORPORATE_COMPANY_NAME").html(data[0].CORPORATE_COMPANY_NAME);
			$("#COMPANY_ADDRESS").html(data[0].COMPANY_ADDRESS);
			$("#COMPANY_CONTACTS").html(data[0].COMPANY_CONTACTS);
			$("#CONTACTS_TEL").html(data[0].CONTACTS_TEL);
			$("#COMPANY_LOGIN_NAME").html(data[0].COMPANY_LOGIN_NAME);
			$("#EMAIL").html(data[0].EMAIL);
			$("#REGISTER_TIME").html(converJavaDate(data[0].REGISTER_TIME));
			$("#COMPANY_DESC").html(data[0].COMPANY_DESC);
			/* converJavaDate(data[0].PLAN_END_TIME) */
			if(data[0].ORGAN_AUDIT == 1){
				$("#ORGAN_AUDIT").html("审核通过");
			}else if(data[0].ORGAN_AUDIT == 2){
				$("#ORGAN_AUDIT").html("审核未通过");
			}else{
				$("#ORGAN_AUDIT").html("未审核");
			}
			if(data[0].HOME_RECOMMEND == 1){
				$("#HOME_RECOMMEND").html("推荐");
			}else{
				$("#HOME_RECOMMEND").html("不推荐");
			}
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
		width: 80px;
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
	    font-size:15px;
	    padding: 6px 6px 6px 12px;
	    color: #4f6b72;
	    text-align: left;
	}
</style>
</head>

<body>
	<div class="tanchuceng">
		<div class="damo">查看企业信息</div>
		<div class="esc" title="关闭"></div>
	</div>
	
	<div class="center" style="height: 440px;">
		<table id="mytable" cellspacing="1">
			<tr>
				<th scope="col" abbr="COMPANY_NAME">企业名称:</th>
				<td id="COMPANY_NAME" style="width: 230px;"></td>
				<th scope="col" abbr="CORPORATE_COMPANY_NAME">企业法人:</th>
				<td id="CORPORATE_COMPANY_NAME"></td>
			</tr>
			<tr>
				<th scope="col" abbr="COMPANY_ADDRESS">企业地址:</th>
				<td colspan="3" id="COMPANY_ADDRESS"></td>
			</tr>
			<tr>
				<th scope="col" abbr="COMPANY_CONTACTS">联系人:</th>
				<td id="COMPANY_CONTACTS"></td>
				<th scope="col" abbr="CONTACTS_TEL">联系人号码:</th>
				<td id="CONTACTS_TEL"></td>
			</tr>
			<tr>
				<th scope="col" abbr="COMPANY_LOGIN_NAME">登陆名:</th>
				<td id="COMPANY_LOGIN_NAME"></td>
				<th scope="col" abbr="EMAIL">邮箱:</th>
				<td id="EMAIL"></td>
			</tr>
			<tr>
				<th scope="col" abbr="ORGAN_AUDIT">审核情况:</th>
				<td id="ORGAN_AUDIT"></td>
				<th scope="col" abbr="HOME_RECOMMEND">首页推荐:</th>
				<td id="HOME_RECOMMEND"></td>
			</tr>
			<tr>
				<th scope="col" colspan="2" abbr="COMPANY_DESC">企业简介 ↓ </th>
				<th scope="col" abbr="REGISTER_TIME">注册时间:</th>
				<td id="REGISTER_TIME"></td>
			</tr>
			<tr>
				<td colspan="4" style="height: 170px;"><textarea id="COMPANY_DESC" style="height: 170px; border: 0px; width: 685px;" disabled="disabled"></textarea></td>
			</tr>
		</table>
	</div>
</body>
</html>
