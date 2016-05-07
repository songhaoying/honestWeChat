<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="b" uri="/bonc-tags"%> 

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<base href="<%=basePath%>" />

<link href="resources/Validform/css/style.css" rel="stylesheet" type="text/css"/>
<b:head/>

<script type="text/javascript">

	function init(){
		getHead();
		getNotice();
		getFoot();
		getNoticeList();
		//论坛热点
	hotPostList();
	//二级页面广告图片
		secondPic();
	}
	function getHead(){ 
	var url=Bonc.toFullPath('/homepage/HomePage!head.action?where=6') ; 
	var p;
	new Ajax.Updater('headPage', url,
		      {
		         method: 'get',
		         asynchronous: true, //异步
		         evalScripts:true,   //执行javascript    
		         parameters: p
		      });
	}
	
	function getFoot(){ 
	var url=Bonc.toFullPath('/homepage/HomePage!foot.action') ; 
	var p;
	new Ajax.Updater('footPage', url,
		      {
		         method: 'get',
		         asynchronous: true, //异步
		         evalScripts:true,   //执行javascript    
		         parameters: p
		      });
	}
	
	//通知 公告
	function getNotice(){ 
	var url=Bonc.toFullPath('/comm/Comm!noticeList.action') ; 
	var p;
	new Ajax.Updater('gonggao', url,
		      {
		         method: 'get',
		         asynchronous: true, //异步
		         evalScripts:true,   //执行javascript    
		         parameters: p
		      });
	}
  
  function search(){ 
  	var searchName = encodeURI($j('#searchName').val()); 
  	var url=Bonc.toFullPath('/homepage/HomePage!searchResultList.action') ; 
	var p={searchName:searchName};
	new Ajax.Updater('searchList', url,
		      {
		         method: 'get',
		         asynchronous: true, //异步
		         evalScripts:true,   //执行javascript    
		         parameters: p
		      }); 
  }
</script>
  <body onload="init()">
  <div id="headPage">
  </div>

<div id="centbox">
		<input type="hidden" id="searchName" value='<s:property value="searchName" />' />
       <div class="news">
             <div class="news_left">
               <div class="newslest">
           			<div class="aixinbt"><span class="nbt">搜索列表</span></div>
                       <div class="nlist" id='searchList'> 
                       </div>
                   </div>
             </div>
             <div class="news_right">
                  <div class="fabu"><img src="resources/images/fabu.jpg" style="cursor:pointer" onclick="javascript:free_publish('<s:property value='#session.user'/>')"/></div>
        <div class="gonggao" >
			<div class="ggtop">本站公告</div>
        	<div class="ggxinxi" id="topoNotice"></div>
        </div>
        <div class="p2_right" style="margin-top:6px;">
          <div class="ggtop">论坛热点推荐</div>
          <div class="bbsxinxi" id="bbsxinxi">
               </div>
             </div>
            <div class="sbnner" id='second_major_one'></div>
            <div class="sbnner" id='second_major_two'></div>
             </div>
       </div>
</div>

<div id="footPage"></div> 
<script type="text/javascript">
search();
</script>
  </body>
</html>
