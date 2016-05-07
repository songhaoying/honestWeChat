<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'site.jsp' starting page</title>
    
	<meta http-equiv="Content-Type" content="text/jsp; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
	<link href="<%=basePath %>backstage/css/index.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath %>backstage/css/table/style.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath %>backstage/css/ul/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="<%=basePath %>backstage/js/newsinfo.js"></script>
	<style type="text/css">
		.plan-features{
			border-bottom:0px;
		}
		li input{
			width: 180px;
		}
		li button{width: 60px;}
	</style>
	<script type="text/javascript">
		$(function(){
			$("li button").click(function(){
				$.post("backstage/adm_saveAdmin.action", {'ADMIN_NAME':$("#ADMIN_NAME").val(),'ADMIN_PAW':$("#ADMIN_PAW").val()},function(data){
					if(data == "FAIL"){
						alert("添加失败！");
					}else{
						window.parent.submitIframeAdmin(1);
					}
				},"text");
			});
			$("dd button").click(function(){
				var page = $("#skip_input").val();
				window.parent.submitIframeAdmin(page);
			});
		});
		function clickpage(page){
			window.parent.submitIframeAdmin(page);
		}
		function deleteSite(ADMIN_ID){
			$.post("backstage/adm_deleteAdmin.action", {'ADMIN_ID':ADMIN_ID},function(data){
				if(data == "FAIL"){
					alert("删除失败！");
				}else{
					window.parent.submitIframeAdmin("1");
				}
			},"text");
		}
	</script>
  </head>
  
  <body>
  	<div class="col w10 last table">
		<div class="content">
			<table class="news" id="table_info">
				<tr><th>序号</th><th>管理员名称</th><th>管理员登陆时间</th><th>操作</th></tr>
				<c:forEach var="admin" items="${admin }" varStatus="s">
					<tr id='id_1'>
						<td>${s.index+Begin+1 }</td>
						<td>${admin.ADMIN_NAME }</td>
						<td>${fn:substring(admin.ADMIN_TIME, 0, 19) }</td>
						<td>
							<a href="javascript:deleteSite('${admin.ADMIN_ID }');">删除</a>
						</td>
					</tr>
				</c:forEach>
			</table>
		</div>							
	</div>
	<div class="tableright" align="right">
		<div class="plan">
	      	<h3 class="plan-title">添加管理员</h3>
	      	<ul class="plan-features">
	        	<li class="plan-feature">管理员名称</li>
	        	<li class="plan-feature"><input id="ADMIN_NAME" type="text" /></li>
	        	<li class="plan-feature">密码</li>
	        	<li class="plan-feature"><input id="ADMIN_PAW" type="text" /></li>
	        	<li class="plan-feature"><button>添加</button></li>
	      	</ul>
	    </div>
  	</div>
  	<div class="tablepage" align="right">
 		<c:if test="${nowpage > 1 }">
 			<div class="pageup" onclick="clickpage('${nowpage - 1 }')">上一页</div>
 		</c:if>
 		<c:forEach var="page" begin="1" end="${indexs}" varStatus="s">
			<c:choose>
				<c:when test="${page > nowpage+2 }">
					<c:if test="${page == nowpage+3 }">
						<div class="pageomit">···</div>
					</c:if>
				</c:when>
				<c:otherwise>
					<c:if test="${page >= nowpage-2 }">
						<c:if test="${indexs-1 > 0 }">
							<div class="pageone" onclick="clickpage('${s.index }')" 
								<c:if test="${page == nowpage }">
								style="color: #ff5400; border-color: #ff5400;"
								</c:if>
							>${s.index }</div>
						</c:if>
					</c:if>
					<c:if test="${page < nowpage-2 && page == nowpage-3 }">
						<div class="pageomit">···</div>
					</c:if>
				</c:otherwise>
			</c:choose>
		</c:forEach>
		<c:if test="${indexs > 1 && nowpage < indexs}">
 			<div class="pagedown" onclick="clickpage('${nowpage + 1 }')">下一页</div>
 		</c:if>
 		<dd style="color: #36BCE6;">
 			共${indexs }页   到第 <input id="skip_input" type="text" value="${nowpage }" style="width: 25px; height: 15px; text-align: center; color: #ff5400;" /> 页 
 			<button id="skip" style="border-radius:4px; background-color: #B0C4DE; width: 46px; height: 25px; font-size: 12px;">确定</button>
 		</dd>
  	</div>
  </body>
</html>
