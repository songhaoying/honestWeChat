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
				window.parent.submitIframeOrgan(val);
			});
		});
		function OpenDialogOrgan(id){
			window.parent.OpenDialogOrgan(id);
		}
		function clickpage(page){
			window.parent.submitIframeOrgan(page);
		}
		function windowOpen(url){
			if(url != "" && url != undefined && url != null){
				window.open("<%=basePath%>"+url);
			}
		}
		function updateAUDIT(id, state){
			$.post("backstage/organajax_updateAUDIT.action", {'organ_info.COMPANY_ID':id, 'organ_info.ORGAN_AUDIT':state},function(data){
				if(data == "FAIL"){
					alert("审核失败！");
				}else{
					window.parent.submitIframeOrgan("1");
				}
			},"text");
		}
		function updateRECOMMEND(id, state){
			if(state == 1){
				window.parent.beRECOMMEND(id);
			}
			if(state == 0){
				$.post("backstage/organajax_updateRECOMMEND.action", {'organ_info.COMPANY_ID':id, 'organ_info.HOME_RECOMMEND':state, 'organ_info.RECOMMENDED_REASONS':''},function(data){
					if(data == "FAIL"){
						alert("取消推荐失败！");
					}else if(data == "EXIST"){
						alert("已达到推荐最大数,请取消一个已推荐的企业后再进行推荐！");
					}else{
						window.parent.submitIframeOrgan("1");
					}
				},"text");
			}
		}
		function deleteOrgan(id){
			$.post("backstage/organajax_deleteOrgan.action", {'organ_info.COMPANY_ID':id},function(data){
				if(data == "FAIL"){
					alert("删除失败！");
				}else{
					window.parent.submitIframeOrgan("1");
				}
			},"text");
		}
	</script>
  </head>
  
  <body>
  	<div class="col w10 last table" style="width: 100%;">
		<div class="content">
			<table class="news" id="table_info">
				<tr><th>序号</th><th>企业名称</th><th>注册时间</th><th>企业信息</th><th>营业执照</th><th>法人身份证</th><th>审核状态</th><th>首页推荐</th><th>操作</th></tr>
				<c:forEach var="organ" items="${organ }" varStatus="s">
					<tr id='id_1'>
						<td>${s.index+Begin+1 }</td>
						<c:if test='${fn:length(organ.COMPANY_NAME) > 8 }'>
							<td title='${organ.COMPANY_NAME }'>${fn:substring(organ.COMPANY_NAME, 0, 8) }···</td>
						</c:if>
						<c:if test='${fn:length(organ.COMPANY_NAME) <= 8 }'>
							<td title='${organ.COMPANY_NAME }'>${organ.COMPANY_NAME }</td>
						</c:if>
						<td>${fn:substring(organ.REGISTER_TIME, 0, 19) }</td>
						<td><a href="javascript:OpenDialogOrgan('${organ.COMPANY_ID }');">点击查看</a></td>
						<td><a href="javascript:windowOpen('${organ.LICENSE_IMAGE }');">点击查看</a></td>
						<td><a href="javascript:windowOpen('${organ.IDENTITY_CART_IAMGE }');">点击查看</a></td>
						<td>
							<c:if test="${organ.ORGAN_AUDIT == 1 }">
								已通过
							</c:if>
							<c:if test="${organ.ORGAN_AUDIT == 2 }">
								未通过
							</c:if>
							<c:if test="${organ.ORGAN_AUDIT == 0 }">
								<a href="javascript:updateAUDIT('${organ.COMPANY_ID }', 1);">通过</a> | <a href="javascript:updateAUDIT('${organ.COMPANY_ID }', 2);">不通过</a>
							</c:if>
						</td>
						<td>
							<c:if test="${organ.HOME_RECOMMEND == 0 }">
								<a 
									<c:if test="${organ.ORGAN_AUDIT == 2 || organ.ORGAN_AUDIT == 0 }">
										href="javascript:void(0);" disabled="disabled"
									</c:if>
									<c:if test="${organ.ORGAN_AUDIT == 1 }">
										href="javascript:updateRECOMMEND('${organ.COMPANY_ID }', 1);"
									</c:if>
								>推荐</a>
							</c:if>
							<c:if test="${organ.HOME_RECOMMEND == 1 }">
								<a href="javascript:updateRECOMMEND('${organ.COMPANY_ID }', 0);">取消推荐</a>
							</c:if>
						</td>
						<td>
							<a href="javascript:deleteOrgan('${organ.COMPANY_ID }');">删除</a>
						</td>
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
