<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="/housesifery/favicon.ico" rel="shortcut icon" type="image/x-icon">
<title>荥阳市残疾人服务中心</title>
<script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
<script type="text/javascript">
	$(function(){
		$(document).keydown(function(event){ 
			var hotkey=13   /* hotkey即为热键的键值,是ASII码,这里13代表回车键 */
			if (event.keyCode == hotkey){
				login();
			}
		});
		$("#login").click(function(){
			login();
		});
	});
	function login(){
		var ADMIN_NAME = $("#ADMIN_NAME").val();
		var ADMIN_PAW = $("#ADMIN_PAW").val();
		if(ADMIN_NAME == "" || ADMIN_NAME == undefined || ADMIN_NAME == null){
			alert("用户名不能为空！");
		}else if(ADMIN_PAW == "" || ADMIN_PAW == undefined || ADMIN_PAW == null){
			alert("密码不能为空！");
		}else{
			$("form").submit();
		}
	}
</script>
<style>
body{background:#F5F4F2}
</style>
</head>

<body>
<form action="admin_getUser.action" method="post">
<div style="width:1000px; height:600px; background:url(loginweb/images/login.png) no-repeat center; margin:0 auto; padding:0;">
   <div style="width:380px; height:210px; margin-right:110px; margin-top:220px; float:right; ">
     <div style="margin-left:16px; margin-top:26px; float:left;">
       <input id="ADMIN_NAME"  name="ADMIN_NAME"  onfocus="if(this.value == '输入用户名') this.value = ''" onblur="if(this.value =='') this.value = '输入用户名'"  type="text" style="width:300px; height:36px; line-height:36px; font-family:微软雅黑; font-size:16px; color:#999; background:none; border:none;" value="输入用户名" />
     </div>
     <div style="margin-left:16px; margin-top:32px; float:left;">
       <input id="ADMIN_PAW" name="ADMIN_PAW" onfocus="if(this.value == '输入密码'){ this.value = '';$('#ADMIN_PAW').attr('type','password')}" onblur="if(this.value ==''){ this.value = '输入密码';$('#ADMIN_PAW').attr('type','text')}" type="text" style="width:300px; height:36px; line-height:36px; font-family:微软雅黑; font-size:16px; color:#999; background:none; border:none;" value="输入密码" />
	 </div>
          <div style=" width:300px; margin-left:16px; margin-top:24px; float:left;"><span style="float:left"><img id="login" src="loginweb/images/dl.png" /></span><span style="line-height:36px; float:left; margin-left:20px; font-family:微软雅黑; font-size:14px; color:red;">${info }</span></div>
   </div>
</div>
</form>
</body>