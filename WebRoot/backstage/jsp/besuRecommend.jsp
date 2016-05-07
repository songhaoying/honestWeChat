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
	});
	function save(){
		var RECOMMENDED_REASONS = $("#RECOMMENDED_REASONS").val();
		$.post("<%=basePath%>/backstage/organajax_updateRECOMMEND.action", {'organ_info.COMPANY_ID':'<%=id%>', 'organ_info.HOME_RECOMMEND':1, 'organ_info.RECOMMENDED_REASONS':RECOMMENDED_REASONS},function(data){
			if(data == "FAIL"){
				alert("推荐失败！");
			}else{
				window.parent.submitIframeOrgan("1");
				closeLogin();
			}
		},"text");
	}
	function closeLogin()
	{
		parent.dialogClose();
	}
</script>
<style type="text/css">
	#mytable {
	    width: 380px;
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
	<div class="tanchuceng" style="background-position: 400px 0px;">
		<div class="damo" style="margin-left: 170px;">推荐原因</div>
		<div class="esc" title="关闭"></div>
	</div>
	
	<div class="center" style="height: 245px; margin-left: 8px; width: 385px;">
		<table id="mytable" cellspacing="1">
			<tr>
				<td colspan="2" style="height: 190px;"><textarea id="RECOMMENDED_REASONS" style="height: 190px; border: 0px; width: 360px;"></textarea></td>
			</tr>
			<tr style="border: 0px;">
				<td style="border: 0px; height: 25px;"><input onclick="save();" type="button" style="height: 25px; float: right; background-color: #CAE8EA; width: 80px;" value="确认推荐"></td>
				<td style="border: 0px; height: 25px;"><input onclick="closeLogin();" type="button" style="height: 25px; float: left; width: 80px;" value="  取  消  "></td>
			</tr>
		</table>
	</div>
</body>
</html>
