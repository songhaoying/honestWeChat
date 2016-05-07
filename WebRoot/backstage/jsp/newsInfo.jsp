<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="myEL" uri="/WEB-INF/myEL.tld" %>  
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'newsInfo.jsp' starting page</title>
    <meta http-equiv="Content-Type" content="text/jsp; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
    <link href="<%=basePath %>backstage/css/index.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath %>backstage/css/table/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath %>backstage/css/ul/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="<%=basePath %>backstage/js/newsinfo.js"></script>
    <script type="text/javascript">
    	$(function(){
	    	$(".update").click(function(){
				var val = $(this).closest("tr").find("input").val();
				window.parent.OpenDialog(val,"");
			});
		});
    </script>
    
   	<!--[if IE]>
   		<style type="text/css">
			.tablepage{bottom: 7px;}
		</style>
	<![endif]-->
	<!--[if lt IE 8]>
		<script type="text/javascript">
			$(function(){
				var cou = '${cou }';
				$("#table_info").css("margin-top", -2*cou+"px");
				$(".plan").css("margin-top", 2*cou+"px");
			});
		</script>
	<![endif]-->
  </head>
  
  <body align="left">
  	<input id="hidden_state" type="hidden" value="${state }"/>
  	<input id="hidden_title" type="hidden" value="${check_title }"/>
  	<div class="col w10 last table">
		<div class="content">
			<table class="news" id="table_info">
				<tr><th>序号</th><th>信息标题</th><th>信息来源</th><th>创建时间</th><th>状态</th><th>操作</th></tr>
				<c:forEach var="news" items="${news }" varStatus="s">
					<tr id='id_1'>
						<input type="hidden" value='${news.NEWS_TITLE }|${news.NEWS_INFO }|${news.NEWS_SOURCE }|${fn:substring(news.RECORD_DATE, 0, 19) }|${news.NEWS_ID }|${news.NEWS_TYPE }|${news.TOP_STATE }' />
						<td>${s.index+Begin+1 }</td>
						<c:if test='${fn:length(news.NEWS_TITLE) > 8 }'>
							<td title='${news.NEWS_TITLE }'>${fn:substring(news.NEWS_TITLE, 0, 6) }···</td>
						</c:if>
						<c:if test='${fn:length(news.NEWS_TITLE) <= 8 }'>
							<td title='${news.NEWS_TITLE }'>${news.NEWS_TITLE }</td>
						</c:if>
						<c:if test='${fn:length(news.NEWS_SOURCE) > 8 }'>
							<td title='${news.NEWS_SOURCE }'>${fn:substring(news.NEWS_SOURCE, 0, 6) }···</td>
						</c:if>
						<c:if test='${fn:length(news.NEWS_SOURCE) <= 8 }'>
							<td title='${news.NEWS_SOURCE }'>${news.NEWS_SOURCE }</td>
						</c:if>
						<td>${fn:substring(news.RECORD_DATE, 0, 19) }</td>
						<c:if test="${news.NEWS_STATUS == '0' }">
							<td Dic="${news.NEWS_ID }">未发布</td>
						</c:if>
						<c:if test="${news.NEWS_STATUS == '1' }">
							<td Dic="${news.NEWS_ID }">已发布</td>
						</c:if>
						<c:if test="${news.NEWS_STATUS == '2' }">
							<td Dic="${news.NEWS_ID }">已下线</td>
						</c:if>
						<td>
							<a class="update">修改</a> |
							<c:if test="${news.NEWS_STATUS == '0' }"><a Dic_a="${news.NEWS_ID }" href="javascript:publish('${news.NEWS_ID }','${news.NEWS_STATUS }');">发布</a></c:if>
							<c:if test="${news.NEWS_STATUS == '1' }"><a href="javascript:publish('${news.NEWS_ID }','${news.NEWS_STATUS }');" Dic_a="${news.NEWS_ID }">下线</a></c:if>
							<c:if test="${news.NEWS_STATUS == '2' }"><a href="javascript:publish('${news.NEWS_ID }','${news.NEWS_STATUS }');" Dic_a="${news.NEWS_ID }">删除</a></c:if>
						</td>
					</tr>
				</c:forEach>
			</table>
		</div>							
	</div>
	<div class="tableright" align="right">
		<div class="plan">
	      	<h3 class="plan-title">信息简介</h3>
	      	<ul class="plan-features">
	        	<li class="plan-feature">信息标题：<span id="p_title" class="plan-feature-name"></span></li>
	        	<li class="plan-feature">信息来源：<span id="p_source" class="plan-feature-name"></span></li>
	        	<li class="plan-feature">创建时间：<span id="p_time" class="plan-feature-name"></span></li>
	      	</ul>
	      	<p class="plan-price">内容<span id="p_info" class="plan-unit"></span></p>
	    </div>
  	</div>
  	<div class="tablepage" align="right">
 		<c:if test="${nowpage > 1 }">
 			<div class="pageup" onclick="clickpage('${nowpage - 1 }', '${state }')">上一页</div>
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
							<div class="pageone" onclick="clickpage('${s.index }','${state }')" 
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
 			<div class="pagedown" onclick="clickpage('${nowpage + 1 }','${state }')">下一页</div>
 		</c:if>
 		<dd style="color: #36BCE6;">
 			共${indexs }页   到第 <input id="skip_input" type="text" value="${nowpage }" style="width: 25px; height: 15px; text-align: center; color: #ff5400;" /> 页 
 			<button id="skip" style="border-radius:4px; background-color: #B0C4DE; width: 46px; height: 25px; font-size: 12px;">确定</button>
 		</dd>
  	</div>
  </body>
</html>
