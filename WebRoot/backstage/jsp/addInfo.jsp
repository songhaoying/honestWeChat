<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String type = new String(request.getParameter("type").getBytes("ISO-8859-1"),"utf-8");
	String title = new String(request.getParameter("title").getBytes("ISO-8859-1"),"utf-8");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="<%=basePath %>backstage/css/global.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath %>backstage/ckeditor/ckeditor.js"></script>
<script type="text/javascript" charset="UTF-8">
	$(function(){
		loadckeditor();
		$(".esc").click(function(){
			closeLogin();
		});
		$("#NEWS_TITLE").focus(); 
		$("#top").click(function(){
			var val = $("#TOP_STATE").val();
			if(val == "1"){
				$("#top").html("置顶");
				$("#TOP_STATE").val("");
			}else{
				$("#top").html("取消");
				$("#TOP_STATE").val("1");
			}
		});
		$("#add").click(function(){
			var NEWS_TYPE = $("#NEWS_TYPE").val();
			var NEWS_TITLE = $("#NEWS_TITLE").val();
			if(NEWS_TITLE == ""){
				alert("标题不能为空！");
				return;
			}
			var NEWS_SOURCE = $("#NEWS_SOURCE").val();
			var TOP_STATE = $("#TOP_STATE").val();
			var NEWS_INFO = CKEDITOR.instances.NEWS_INFO.getData();
			$.post("<%=basePath%>/backstage/ajax_saveOrUpdateNews.action",{'NEWS_TYPE':NEWS_TYPE, 'NEWS_TITLE':NEWS_TITLE, 'NEWS_SOURCE':NEWS_SOURCE, 'NEWS_INFO':NEWS_INFO, 'TOP_STATE':TOP_STATE}, function(data){
				if(data == "SUCCESS"){
					window.parent.findIframe(NEWS_TYPE,1);
					closeLogin();
				}else{
					alert("添加失败");
				}
			}, "text");
		});
	});
	//加载ckeditor()
    function loadckeditor(){
		var editor = CKEDITOR.instances['contentValue'];
        if( editor ){
         	editor.setData("");
		}
		else{	
			editor =  CKEDITOR.replace("NEWS_INFO",{   
               filebrowserUploadUrl : '<%=basePath%>backstage/uloadpic.action'  
           });
		}
    }
	function closeLogin()
	{
		parent.dialogClose();
	}
</script>
</head>

<body>
	<div class="tanchuceng">
		<div class="damo"><%=title %></div>
		<div class="esc" title="关闭"></div>
	</div>
	
	<div class="center">
		<input id="NEWS_TYPE" type="hidden" value="<%=type %>" />
		<input id="TOP_STATE" type="hidden" value="" />
		<div class="title">
			<div class="menu" style="margin-top: 5px;">
				信息标题&nbsp;
			</div>
			<div class="menu">
				<input class="chaxun" value="" type="text" id="NEWS_TITLE"/>
			</div>
		</div>
		<div class="title">
			<div class="menu" style="margin-top: 5px;">
				信息来源&nbsp;
			 </div>
			<div class="menu">
				<input class="chaxun" <% if("6".equals(type)){%>style="width: 515px;"<%} %> value="" type="text" id="NEWS_SOURCE"/>
				<button id="top" <% if(!"6".equals(type)){%>style="display: none;"<%} %>>置顶</button>
			</div>
		</div>
		
		<div class="title">
			<div class="menu">
				信息内容&nbsp;
			 </div>
			<div class="menu">
				<textarea id="NEWS_INFO" name="NEWS_INFO"></textarea>
			</div>
		</div>
	</div>
	<div class="end">
		<button id="add" style="background-color: #B0C4DE;">确定添加</button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button onclick="closeLogin();">取&nbsp;&nbsp;&nbsp;&nbsp;消</button>
	</div>
</body>
</html>
