<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <base href="<%=basePath%>">
    
    <title>荥阳市残疾人服务中心后台管理</title>
    <meta http-equiv="Content-Type" content="text/jsp; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
    <link href="/housesifery/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link href="<%=basePath %>backstage/css/css.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath %>backstage/jquery.jqzoom.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath %>backstage/css/jquery_dialog.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="<%=basePath %>backstage/js/jquery_dialog.js"></script>
	<script type="text/javascript" src="<%=basePath %>backstage/js/jquery.blockUI.js"></script>
	<script type="text/javascript" src="<%=basePath %>backstage/js/jquery.jqzoom-core.js"></script>
	<script type="text/javascript" charset="UTF-8">
		function beRECOMMEND(id){
			JqueryDialog.Open('', 'backstage/jsp/besuRecommend.jsp?id='+id, 400, 300);
		}
		//修改信息
		function OpenDialog1(val,dic){
			var arr = val.split("|");
			if(dic=="PICTURES"){
				$.post("backstage/ajax_getPictureSite.action",{},function(data){
					if(data == "SUCCESS"){
						JqueryDialog.Open('', 'backstage/jsp/updatePicture.jsp?title='+arr[0]+'&nonts='+arr[1]+'&link='+arr[2]+'&src='+arr[3]+'&id='+arr[4]+'&rank='+arr[5], 730, 500);
					}
				}, "text");
			}else{
				JqueryDialog.Open('', 'backstage/jsp/updateInfo.jsp?id="'+arr[4]+'"', 730, 500);
			}
		}
		//修改义工活动信息
		function updatePlan(id){
			JqueryDialog.Open('', 'backstage/jsp/updateVolPlanInfo.jsp?id='+id, 730, 570);
		}
		//修改活爱心企业信息
		function updateLoveOrgan(id){
			JqueryDialog.Open('', 'backstage/jsp/updateLoveOrgan.jsp?id='+id, 950, 605);
		}
		//添加信息
		function OpenDialog(val,html){
			if(val=="PICTURES"){
				$.post("backstage/ajax_getPictureSite.action",{},function(data){
					if(data == "SUCCESS"){
						JqueryDialog.Open('', 'backstage/jsp/addPicture.jsp?type='+val +'&title='+html, 730, 500);
					}else{
						alert("请添加图片位置！");
					}
				},"text");
			}else if(val=="VolPlan"){
				JqueryDialog.Open('', 'backstage/jsp/addVolPlanInfo.jsp', 730, 570);
			}else if(val=="loveOrgan"){
				JqueryDialog.Open('', 'backstage/jsp/addLoveOrgan.jsp', 950, 605);
			}else{
				JqueryDialog.Open('', 'backstage/jsp/addInfo.jsp?type='+val +'&title='+html, 730, 500);
			}
		}
		function submitIframeOrgan(page){
			window.frames["centreIframe"].submitIframeOrgan(page);
		}
		//查看企业基本信息
		function OpenDialogOrgan(id){
			JqueryDialog.Open('', 'backstage/jsp/CheckOrganInfo.jsp?id='+id, 730, 430);
		}
		//查看义工活动信息
		function OpenDialogVolPlan(id){
			JqueryDialog.Open('', 'backstage/jsp/CheckVolPlanInfo.jsp?id='+id, 730, 570);
		}
		function dialogClose(){
			JqueryDialog.Close();
		}
		function findIframe(NEWS_TYPE,page){
			window.frames["centreIframe"].submitIframe(NEWS_TYPE,page);
		}
		function findIframe1(type){
			window.frames["centreIframe"].submitIframe1(type);
		}
		function submitIframePic(page){
			window.frames["centreIframe"].submitIframePic(page);
		}
		function nicelho(catalogue){
			window.location.href = "<%=basePath%>backstage/nicelho_nicelho.action?catalogue="+catalogue;
		}
	</script>
  </head>
  
  <body id="body">
  	<!-- 头部开始 -->
	<div id="headPage">
	  	<div id="man">
		     <div class="lo">
		     	<div class="logo"><img src="backstage/images/logo.jpg" /></div>
		     	<div style="width: 200px; height: 20px; margin-top: 12px; float:right; margin-right: 120px; text-align: right;">当前登录用户：<font color="#FF0000">${userinfo.ADMIN_NAME }</font>  <a href="backstage/admin_exit.action">[退出]</a></div>
		     </div>
		</div>
		<div id="menu">
	      	<div class="menu">
	            <div class="nav">
	                 <ul>
	                    <li class="menurightbg"><a href="javascript:nicelho('0');" <c:if test="${catalogue == '0' }">class='menu_current' style='color:#333333;'</c:if>>信息管理</a></li>
	                    <li class="menurightbg"><a href="javascript:nicelho('1');" <c:if test="${catalogue == '1' }">class='menu_current' style='color:#333333;'</c:if>>系统管理</a></li>
	                 </ul>
	            </div>
			</div> 
		</div>
	</div>
	<!-- 头部结束 -->
	<!-- 中间部分开始 -->
	<div>
		<iframe id="centreIframe" name="centreIframe" src="backstage/centre.jsp" height="480px" width="100%" scrolling="no" frameborder="0"></iframe>
	</div>
	<!-- 中间部分结束 -->
	<!-- 尾部开始 -->
	<div id="footPage">
		<div id="foot">
			<div class="foot"><a href="#">关于我们</a> - <a href="#">联系我们</a> - <a href="#">广告招商</a> - <a href="#">帮助中心</a> - <a href="#">免责声明</a> - <a href="#">意见反馈</a> - <a href="#">网站合作</a><br />
				Copyright ? 2014-2015 荥阳市残疾人服务网络中心 Corporation, All Rights Reserved  管理中心   ICP证：豫ICP备09054331号
			</div>
		</div>
	</div>
	<!-- 尾部结束 -->
  </body>
</html>
