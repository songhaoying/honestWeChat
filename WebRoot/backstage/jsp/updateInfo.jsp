<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%> 
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String id = request.getParameter("id");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="<%=basePath %>backstage/css/global.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath %>backstage/ckeditor/ckeditor.js"></script>
<script type="text/javascript">
	$(function(){
		$("#NEWS_ID").val(<%=id%>);
		$("#NEWS_TITLE").focus(); 
		$.post("<%=basePath%>/backstage/ajax_getNewsID.action",{'NEWS_ID':<%=id%>},function(data){
			$("#NEWS_INFO").val(data[0].NEWS_INFO);
			loadckeditor();
			$("#NEWS_TYPE").val(data[0].NEWS_TYPE);
			$("#TOP_STATE").val(data[0].TOP_STATE);
			$("#NEWS_TITLE").val(data[0].NEWS_TITLE);
			$("#NEWS_SOURCE").val(data[0].NEWS_SOURCE);
			if(data[0].NEWS_TYPE == '6'){
				$("#NEWS_SOURCE").css("width", "515px");
				$("#top").css("display", "");
				if(data[0].TOP_STATE == '1'){
					$("#top").html("取消");
				}else{
					$("#top").html("置顶");
				}
			}
		},"json");
		$(".esc").click(function(){
			closeLogin();
		});
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
		$("#update").click(function(){
			var NEWS_ID = $("#NEWS_ID").val();
			var NEWS_TYPE = $("#NEWS_TYPE").val();
			var NEWS_TITLE = $("#NEWS_TITLE").val();
			if(NEWS_TITLE == ""){
				alert("标题不能为空！");
				return;
			}
			var NEWS_SOURCE = $("#NEWS_SOURCE").val();
			var TOP_STATE = $("#TOP_STATE").val();
			var NEWS_INFO = CKEDITOR.instances.NEWS_INFO.getData();
			$.post("<%=basePath%>/backstage/ajax_saveOrUpdateNews.action",{'NEWS_TYPE':NEWS_TYPE, 'NEWS_ID':NEWS_ID, 'NEWS_TITLE':NEWS_TITLE, 'NEWS_SOURCE':NEWS_SOURCE, 'NEWS_INFO':NEWS_INFO, 'TOP_STATE':TOP_STATE}, function(data){
				if(data == "SUCCESS"){
					window.parent.findIframe(NEWS_TYPE,1);
					closeLogin();
				}else{
					alert("修改失败");
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
		<div class="damo">修改信息</div>
		<div class="esc" title="关闭"></div>
	</div>
	<input id="NEWS_ID" type="hidden" value=""/>
	<input id="NEWS_TYPE" type="hidden" value="" />
	<input id="TOP_STATE" type="hidden" value="" />
	<div class="center">
		<div class="title">
			<div class="menu" style="margin-top: 5px;">
				信息标题&nbsp;
			</div>
			<div class="menu">
				<input id="NEWS_TITLE" title="" class="chaxun" value="" type="text"/>
			</div>
		</div>
		<div class="title">
			<div class="menu" style="margin-top: 5px;">
				信息来源&nbsp;
			 </div>
			<div class="menu">
				<input class="chaxun" type="text" id="NEWS_SOURCE"/>
				<button id="top" style="display: none;"></button>
			</div>
		</div>
		
		<div class="title">
			<div class="menu">
				信息内容&nbsp;
			 </div>
			<div class="menu">
				<textarea id="NEWS_INFO"  name="NEWS_INFO" style="display: none;"></textarea>
			</div>
		</div>
	</div>
	<div class="end">
		<button id="update" style="background-color: #B0C4DE;">确定修改</button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button onclick="closeLogin();">取&nbsp;&nbsp;&nbsp;&nbsp;消</button>
	</div>
</body>
</html>
