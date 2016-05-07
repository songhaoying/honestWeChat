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
    <basePath value = "<%=basePath%>" id = "basePath"></basePath>
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
			$(".Picturesupdate").click(function(){
				var val = $(this).closest("tr").find("input").val();
				window.parent.OpenDialog(val,"PICTURES");
			});
		});
	</script>
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
			<table class="picture" id="table_info">
				<tr><th>序号</th><th>图片标题</th><th>图片位置</th><th>图片链接</th><th>状态</th><th>操作</th></tr>
				<c:forEach var="Pictures" items="${Pictures }" varStatus="s">
					<tr id='id_1'>
						<input type='hidden' value='${Pictures.PICTURES_TITLE }|${Pictures.NONTS }|${Pictures.PICTURES_LINK }|${Pictures.PICTURES_SRC }|${Pictures.PICTURES_ID }|${Pictures.PICTURES_RANK }'/>
						<td>${s.index+Begin+1 }</td>
						<c:if test='${fn:length(Pictures.PICTURES_TITLE) > 8 }'>
							<td title='${Pictures.PICTURES_TITLE }'>${fn:substring(Pictures.PICTURES_TITLE, 0, 6) }···</td>
						</c:if>
						<c:if test='${fn:length(Pictures.PICTURES_TITLE) <= 8 }'>
							<td title='${Pictures.PICTURES_TITLE }'>${Pictures.PICTURES_TITLE }</td>
						</c:if>
						<c:if test='${fn:length(Pictures.NONTS) > 10 }'>
							<td title='${Pictures.NONTS }'>${fn:substring(Pictures.NONTS, 0, 8) }···</td>
						</c:if>
						<c:if test='${fn:length(Pictures.NONTS) <= 10 }'>
							<td title='${Pictures.NONTS }'>${Pictures.NONTS }</td>
						</c:if>
						<c:if test='${fn:length(Pictures.PICTURES_LINK) > 26 }'>
							<td title='${Pictures.PICTURES_LINK }'>${fn:substring(Pictures.PICTURES_LINK, 0, 24) }···</td>
						</c:if>
						<c:if test='${fn:length(Pictures.PICTURES_LINK) <= 26 }'>
							<td title='${Pictures.PICTURES_LINK }'>${Pictures.PICTURES_LINK }</td>
						</c:if>
						<c:if test="${Pictures.PICTURES_STATE == '0' }">
							<td Dic="${Pictures.PICTURES_ID }">未发布</td>
						</c:if>
						<c:if test="${Pictures.PICTURES_STATE == '1' }">
							<td Dic="${Pictures.PICTURES_ID }">已发布</td>
						</c:if>
						<c:if test="${Pictures.PICTURES_STATE == '2' }">
							<td Dic="${Pictures.PICTURES_ID }">已下线</td>
						</c:if>
						<td>
							<a class="Picturesupdate">修改</a> |
							<c:if test="${Pictures.PICTURES_STATE == '0' }"><a Dic_a="${Pictures.PICTURES_ID }" href="javascript:Picturespublish('${Pictures.PICTURES_ID }','${Pictures.PICTURES_STATE }', '${Pictures.PICTURES_SITE }');">发布</a></c:if>
							<c:if test="${Pictures.PICTURES_STATE == '1' }"><a href="javascript:Picturespublish('${Pictures.PICTURES_ID }','${Pictures.PICTURES_STATE }','${Pictures.PICTURES_SITE }');" Dic_a="${Pictures.PICTURES_ID }">下线</a></c:if>
							<c:if test="${Pictures.PICTURES_STATE == '2' }"><a href="javascript:Picturespublish('${Pictures.PICTURES_ID }','${Pictures.PICTURES_STATE }','${Pictures.PICTURES_SITE }');" Dic_a="${Pictures.PICTURES_ID }">删除</a></c:if>
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
	        	<li class="plan-feature">图片标题：<span id="p_title" class="plan-feature-name"></span></li>
	        	<li class="plan-feature">图片位置：<span id="p_source" class="plan-feature-name"></span></li>
	        	<li class="plan-feature">图片链接：<span id="p_time" class="plan-feature-name"></span></li>
	      	</ul>
	      	<p class="plan-price">图片预览<span class="plan-unit"><img id="p_info" style="width: 200px; display: none;" src=""/></span></p>
	    </div>
  	</div>
  	<div class="tablepage" align="right">
 		<c:if test="${nowpage > 1 }">
 			<div class="pageup" onclick="clickpagePic('${nowpage - 1 }','${state }','${check_title }')">上一页</div>
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
							<div class="pageone" onclick="clickpagePic('${s.index }','${state }','${check_title }')" 
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
 			<div class="pagedown" onclick="clickpagePic('${nowpage + 1 }','${state }','${check_title }')">下一页</div>
 		</c:if>
 		<dd style="color: #36BCE6;">
 			共${indexs }页   到第 <input id="skip_input_Pic" type="text" value="${nowpage }" style="width: 25px; height: 15px; text-align: center; color: #ff5400;" /> 页 
 			<button id="skipPic" style="border-radius:4px; background-color: #B0C4DE; width: 46px; height: 25px; font-size: 12px;">确定</button>
 		</dd>
  	</div>
  </body>
</html>
