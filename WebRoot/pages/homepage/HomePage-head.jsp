<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%> 
    <div id="top">
     <div class="top">
         <div class="top_left">欢迎登录荥阳市残疾人服务中心！</div>
         <div class="top_center">
			<iframe allowtransparency="true" frameborder="0" width="180" height="30" scrolling="no" src="http://tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=&f=&q=1&e=1&a=1&c=54511&w=180&h=30&align=left"></iframe>
		 </div>
         <div class="top_right"> 
         <s:if test="#session.user==null">
	         <h1><a href="pages/login/Login_family.jsp">家庭登录</a> |  <a href="pages/login/Login_company.jsp">企业登录</a> |  <a href="pages/login/Login_volunteer.jsp">义工登录</a> |  <a href="pages/register/Register_family.jsp">家庭用户注册</a> | <a href="pages/register/Register_company.jsp">企业加盟</a> | <a href="pages/register/Register_volunteer.jsp">义工注册</a></h1>
	         <h2><a href='http://zhubing618.vicp.cc/bbs' target="_blank">爱心论坛</a></h2>
	         <h3><a href="#"><img src="resources/images/weibo.jpg" /></a> <a href="#"><img src="resources/images/weibo2.jpg" /></a> </h3>
         </s:if>
         <s:else>
         	<h1><a href="pages/usercenter/UserCenter.jsp">欢迎您：<span class="hong"><s:property value='#session.user.LOGIN_NAME'/></span></a></h1>
         	<h2><a href="javascript:login_out()"  >退出登录</a></h2> 
         </s:else>
         </div>
  </div>
</div>
<div id="man">
     <div class="lo"><div class="logo"><img src="resources/images/logo.jpg" /></div></div>
</div>
<div id="menu">
      <div class="menu">
            <div class="nav">
                 <ul>
                    <li class="menurightbg" style=""><a href="<%=basePath %>" <s:if test="where==0">class='menu_current' style='color:#333333;'</s:if>>首页</a></li>
                    <li class="menurightbg"><a href="javascript:user_center('<s:property value='#session.user'/>')" <s:if test="where==1">class='menu_current' style='color:#333333;'</s:if>>会员中心</a></li>
                    <li class="menurightbg"><a href="javascript:services()" <s:if test="where==3">class='menu_current' style='color:#333333;'</s:if>>供需服务</a></li>
                    <li class="menurightbg"><a href="javascript:donation()" <s:if test="where==2">class='menu_current' style='color:#333333;'</s:if>>爱心捐助</a></li> 
                    <li class="menurightbg"><a href="javascript:news_center('7')" <s:if test="where==4">class='menu_current' style='color:#333333;'</s:if>>生活经验</a></li>
                    <li class="menurightbg"><a href="javascript:service_company('<s:property value='#session.user'/>')" <s:if test="where==5">class='menu_current' style='color:#333333;'</s:if>>服务企业</a></li>
                    <li class="menurightbg"><a href="javascript:news_center('0')" <s:if test="where==6">class='menu_current' style='color:#333333;'</s:if>>新闻中心</a></li>
                    <li class="menurightbg"><a href="javascript:love_activi()" <s:if test="where==7">class='menu_current' style='color:#333333;'</s:if>>爱心活动</a></li>
                    <li><a href="javascript:help_center('<s:property value='#session.user'/>')" <s:if test="where==8">class='menu_current' style='color:#333333;'</s:if>>帮助中心</a></li>
                 </ul>
            </div>
            <div class="xiaoxi">
                  <div class="xiaoxi_left">今日受理订单<span class="hong">[<span id="TODAY_AC">332</span>]</span>个| 服务派单<span class="lan">[<span id="TODAY_PD">332</span>]</span>个| 为<span class="lv">[<span id="TODAY_SUC_CUS">332</span>]</span>个客户完成服务| 已累计派单<span class="hong">[<span id="SUM_PD">332</span>]</span>个| 成功为<span class="hong">[<span id="SUM_SUC_CUS">332</span>]</span>个客户完成服务 </div>
                  <div class="chaxun"><form action="homepage/HomePage!search.action" method="post"><input   onfocus="search_hidden()" onblur="search_show()" type="text" name='searchName' id="searchName" style="width:170px; height:28px; line-height:28px; padding-left:10px; border:none; background:none; display:inline;" value="请输入关键字查询"/><input type="submit" name="button" id="button" value="搜索查询"  class="sou" /></form></div>
            </div>
      </div>
</div> 