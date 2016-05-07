<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="<%=basePath %>backstage/js/ajaxfileupload.js"></script>
<script type="text/javascript">
	$(function(){
		$(".esc").click(function(){
			closeLogin();
		});
		$("#PICTURES_TITLE").focus(); 
		$("#add").click(function(){
			var src = $("#PICTURES_SRC").val();
			if(src == "" || src == null || src == undefined){
				alert("请先上传图片！");
				return;
			}
			var PICTURES_RANK = $("#PICTURES_RANK").val();
			var PICTURES_SITE = $("#PICTURES_SITE").val();
			var PICTURES_TITLE = $("#PICTURES_TITLE").val();
			var PICTURES_SRC = $("#PICTURES_SRC").val();
			var PICTURES_LINK = $("#PICTURES_LINK").val();
			var re = new RegExp("^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$");
			if(PICTURES_LINK != "" && !PICTURES_LINK.match(re)){
				alert("请输入含有http|https|ftp的正确连接！");
				return;
			}
			$.post("<%=basePath%>/backstage/pic_insertPic.action",
				{'wp.PICTURES_RANK':PICTURES_RANK, 'wp.PICTURES_SITE':PICTURES_SITE, 'wp.PICTURES_LINK':PICTURES_LINK, 'wp.PICTURES_TITLE':PICTURES_TITLE, 'wp.PICTURES_SRC':PICTURES_SRC}, 
				function(data){
				if(data == "SUCCESS"){
					window.parent.submitIframePic(1);
					closeLogin();
				}else{
					alert("添加失败");
				}
			}, "text");
		});
	});
	function closeLogin()
	{
		parent.dialogClose();
	}
	function ajaxFileUpload()
    {
        $("#loading")
        .ajaxStart(function(){
            $(this).show();
        })//开始上传文件时显示一个图片
        .ajaxComplete(function(){
            $(this).hide();
        });//文件上传完成将图片隐藏起来
        
        $.ajaxFileUpload
        (
            {
                url:'<%=basePath%>/backstage/pic_updatePictures.action',//用于文件上传的服务器端请求地址
                secureuri:false,//一般设置为false
                fileElementId:'file',//文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType: 'text',//返回值类型 一般设置为json
                success: function (data)  //服务器成功响应处理函数
                {
                	if(data.indexOf("FAIL") > -1){
                		alert("请选择图片！");
                		return false;
                	}else{
	                	data = data.replace("<pre>", "").replace("</pre>", "");
	                    $("#image").attr("src", "<%=basePath%>"+data);
	                    $("#PICTURES_SRC").val(data);
	                    return true;
	                }
                },
                error: function (data)//服务器响应失败处理函数
                {
                    
                }
            }
        )
        return false;
    }
    function checkNum(value){
    	var str = new RegExp("^[0-9]*$");
    	if(!str.test(value)){
    		alert("请输入数字！");
    		$("#PICTURES_RANK").val("");
    	}
    }
</script>
</head>

<body>
	<div class="tanchuceng">
		<div class="damo"><%=title %></div>
		<div class="esc" title="关闭"></div>
	</div>
	
	<div class="center">
		<div class="title">
			<div class="menu" style="margin-top: 5px;">
				图片标题&nbsp;
			</div>
			<div class="menu">
				<input type="text" class="chaxun" style="width: 240px;" value="" id="PICTURES_TITLE"/>
			</div>
			<div class="menu" style="margin-top: 5px; margin-left: 20px;">
				图片链接&nbsp;
			</div>
			<div class="menu">
				<input class="chaxun" style="width: 240px;" value="" type="text" id="PICTURES_LINK"/>
			</div>
		</div>
		<div class="title">
			<div class="menu" style="margin-top: 5px;">
				图片排序&nbsp;
			</div>
			<div class="menu">
				<input class="chaxun" style="width: 40px;text-align: center;" onkeyup="checkNum(this.value);" value="" type="text" id="PICTURES_RANK"/>
			</div>
			<div class="menu" style="margin-top: 5px;margin-left: 10px;">
				图片位置&nbsp;
			 </div>
			<div class="menu">
				<select id="PICTURES_SITE" style="margin-top: 7px;border-radius:4px; border: 1px solid #B0C4DE; width: 100px;">
					<c:forEach var="op" items="${picturesList }">
						<option value="${op.PICTURES_SITE }">${op.NONTS }</option>
					</c:forEach>
				</select>
			</div>
			<div style="margin-left: 10px;">
				<img id="loading" src="loading.gif" style="display:none;">
    			<input id="file" type="file" style="width: 280px;margin-top: 3px; margin-left: -3px;" name="file">
    			<button class="button" style="height: 25px; margin-top: 3px;" id="buttonUpload" onclick="return ajaxFileUpload();">上传图片</button>
			</div>
		</div>
		
		<div class="title" style="height: 300px;">
			<input type="hidden" id="PICTURES_SRC" />
			<img id="image" src="" title="" style="height: 300px; width: 680px;" alt="" />
		</div>
	</div>
	<div class="end">
		<button id="add" style="background-color: #B0C4DE;">确定添加</button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button onclick="closeLogin();">取&nbsp;&nbsp;&nbsp;&nbsp;消</button>
	</div>
</body>
</html>
