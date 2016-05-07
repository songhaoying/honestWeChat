<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
  <div id="lianjie">
     <div class="ljbt"><span class="fubt">友情链接</span><span class="axmore" style="text-align:right; padding-right:10px;"> </span>
  </div>
         <div class="ljnr">
         	<s:iterator value="list"><a href="<s:property value="PICTURES_LINK"/>" target="_blank"><img width="102px" height="34px" src='<%=basePath %><s:property value="PICTURES_SRC"/>' onerror="this.onerror='';this.src='resources/images/no.jpg'" /></a></s:iterator> 
         </div>
</div>
<div id="foot">
<div class="foot"><a href="pages/link/link.jsp?id=1">关于我们</a> - <a href="pages/link/link.jsp?id=2">联系我们</a> - <a href="pages/link/link.jsp?id=3">广告招商</a> - <a href="pages/link/link.jsp?id=4">免责声明</a> - <a href="pages/link/link.jsp?id=5">意见反馈</a> - <a href="pages/link/link.jsp?id=6">网站合作</a><br />
Copyright ? 2014-2015 荥阳市残疾人服务网络中心 Corporation, All Rights Reserved  管理中心   ICP证：豫ICP备09054331号</div> </div>