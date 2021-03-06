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
			//点击页面跳转按钮
			$("#skiporgan").click(function(){
				var val = $("#skip_input").val();
				window.parent.submitIframeVolPlan(val);
			});
		});
		function OpenDialogVolPlan(id){
			window.parent.OpenDialogVolPlan(id);
		}
		function clickpage(page){
			window.parent.submitIframeVolPlan(page);
		}
		function exportVol(id){
			$("#pid").val(id);
			submitForm = document.forms[0];
			submitForm.action = "<%=basePath%>/backstage/volPlan_exportVol.action";
			submitForm.submit();
		}
		function updatePlan(id){
			window.parent.updatePlan(id);
		}
		function deletePlan(id){
			if (confirm("确认要删除本次活动吗？")) {
	            $.post("<%=basePath%>/backstage/volPlanajax_deletePlanOne.action",{'vol_plan_info.PLAN_ID':id},function(data){
	            	if(data == "SUCCESS"){
	            		var val = $("#skip_input").val();
	            		clickpage(val);
	            	}else{
	            		alert("删除失败！");
	            	}
	            });
	        }
		}
	</script>
  </head>
  
  <body>
  	<form id="form1" method="post" action="" enctype="multipart/form-data" style="display: none">
  		<input id = "pid" name="vol_plan_info.PLAN_ID" />
  	</form>
  	<div class="col w10 last table" style="width: 100%;">
		<div class="content">
			<table class="news" id="table_info">
				<tr><th>序号</th><th>活动主题</th><th>需要人数</th><th>已有人数</th><th>查看详情</th><th>导出义工</th><th>操作</th></tr>
				<c:forEach var="volPlan" items="${volPlan }" varStatus="s">
					<tr id='id_1'>
						<td>${s.index+Begin+1 }</td>
						<td>${volPlan.PLAN_THEME }</td>
						<td>${volPlan.PLAN_REQUIRED_NUM }</td>
						<td>${volPlan.PLAN_JOIN_NUM }</td>
						<td><a href="javascript:OpenDialogVolPlan('${volPlan.PLAN_ID }');">点击查看</a></td>
						<td><a href="javascript:exportVol('${volPlan.PLAN_ID }');">点击导出</a></td>
						<td><a href="javascript:updatePlan('${volPlan.PLAN_ID }');">修改</a> | <a href="javascript:deletePlan('${volPlan.PLAN_ID }');">删除</a></td>
					</tr>
				</c:forEach>
			</table>
		</div>							
	</div>
  	<div class="tablepage" align="right" style="left: 344px;">
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
 			<button id="skiporgan" style="border-radius:4px; background-color: #B0C4DE; width: 46px; height: 25px; font-size: 12px;">确定</button>
 		</dd>
  	</div>
  </body>
</html>
