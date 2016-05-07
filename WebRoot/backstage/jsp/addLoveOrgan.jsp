<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="<%=basePath %>backstage/css/global.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath %>backstage/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="<%=basePath %>backstage/ckeditor1/ckeditor.js"></script>
<script type="text/javascript" src="<%=basePath %>backstage/ztree/js/jquery.ztree.all-3.5.min.js"></script>
<script type="text/javascript" src="<%=basePath %>backstage/js/ajaxfileupload.js"></script>
<script type="text/javascript" charset="UTF-8">
	var setting = {
		check: {
			enable: true
		},
		
		data: {
			key:{
					name:"SERVICE_TYPE_NAME"
			},
			simpleData: {
				enable: true,
				idKey: "SERVICE_TYPE_ID",
				pIdKey: "SERVICE_TYPE_PARENT_ID"
			}
		},
		callback:{
            onCheck:onCheck
        }
	};
	var treeNodes; 
	
	$(function(){
		loadckeditor();
		$("#COMPANY_NAME").focus(); 
		$(".esc").click(function(){
			closeLogin();
		});
		$("#SERVICE_LEVEL .xing").click(function(){
			$("#SERVICE_LEVEL .xing").each(function(){
				$(this).attr("DD", "");
			});
			var dic = $(this).attr("DIC");
			var url = 'url(<%=basePath %>backstage/images/'+dic+'x.jpg)';
			$("#SERVICE_LEVEL").css("background-image", url);
			$(this).attr("DD", "yes");
		});
		//生成树节点
		$.ajax({  
	        async : false,  
	        cache:false,  
	        type: 'POST',  
	        dataType : "json",  
	        url: "<%=basePath%>/backstage/loveorganajax_getSERVICE.action",
	        error: function () {//请求失败处理函数  
	            alert('请求失败');  
	        },  
	        success:function(data){ //请求成功后处理函数。 
	            treeNodes = data;   //把后台封装好的简单Json格式赋给treeNodes  
	            $.fn.zTree.destroy("serviceTree");
	            $.fn.zTree.init($("#serviceTree"), setting, treeNodes);
	        }  
	    }); 
	});
	function onCheck(e,treeId,treeNode){
		var treeObj=$.fn.zTree.getZTreeObj("serviceTree"),
		nodes=treeObj.getCheckedNodes(true),
		v="";
		for(var i=0;i<nodes.length;i++){
			if((nodes[i].SERVICE_TYPE_PARENT_ID == null || nodes[i].SERVICE_TYPE_PARENT_ID == '0')){
				if(i == 0){
					v+= nodes[i].SERVICE_TYPE_NAME + "：";
				}else{
					v = v.substring(0, v.lastIndexOf(","));
					v+= "；"+ nodes[i].SERVICE_TYPE_NAME + "：";
				}
			}else if(i == nodes.length-1){
				v+=nodes[i].SERVICE_TYPE_NAME;
			}else{
				v+=nodes[i].SERVICE_TYPE_NAME + ",";
			}
		}  
		$("#SERVICE_CONTENT").val(v);
    }
	
	function closeLogin()
	{
		parent.dialogClose();
	}
	//加载ckeditor()
    function loadckeditor(){
		var editor = CKEDITOR.instances['contentValue'];
        if( editor ){
         	editor.setData("");
		}else{	
			editor =  CKEDITOR.replace("COMPANY_DESC",{
               filebrowserUploadUrl : '<%=basePath%>backstage/uloadpic.action'
           });
		}
    }
   
    function uploadLoveLogo()
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
                url:'<%=basePath%>/backstage/loveorganajax_uploadLoveLogo.action',//用于文件上传的服务器端请求地址
                secureuri:false,//一般设置为false
                fileElementId:'file',//文件上传空间的id属性  <input type="file" id="file" name="file" />
                dataType: 'text',//返回值类型 一般设置为json
                success: function (data)  //服务器成功响应处理函数
                {
                	if(data.indexOf("FAIL") > -1){
                		data = data.split("\\|");
                		alert(data[1]);
                		return false;
                	}else{
                		data = data.replace("<pre>", "").replace("</pre>", "");
	                    $("#image").attr("src", "<%=basePath%>"+data);
	                    $("#COMPANY_LOGO").val(data);
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
</script>
<style type="text/css">
	#mytable {
	    width: 710px;
	    padding: 0;
	    margin: 0;
	}
	th {
	    font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;
	    color: #4f6b72;
	    border: 1px solid #C1DAD7;
	    letter-spacing: 2px;
	    text-transform: uppercase;
	    text-align: left;
	    background: #CAE8EA url(images/bg_header.jpg) no-repeat;
	}
	td {
	    border: 1px solid #C1DAD7;
	    background: #fff;
	    font-size:12px;
	    color: #4f6b72;
	    text-align: left;
	    padding: 6px 6px 6px 12px;
	}
	input{
		border: 0px;
		height: 17px;
	}
	textarea{
		border: 0px;
	}
	input::-ms-clear{display:none;}
	.chacktree{
		width: 220px; 
		border: 1px solid #C1DAD7; 
		float: left; 
		height: 550px; 
		margin-top: 11px; 
		margin-left: 5px; 
		background: #fff;
	}
	.xing{
		width: 19px; 
		height: 19px;
		float: left;
		margin-left: 4px;
		cursor: pointer;
	}
	.ultitle{
		font: bold 11px 'Trebuchet MS', Verdana, Arial, Helvetica, sans-serif;
		color: #4f6b72;border: 1px solid #C1DAD7;
		letter-spacing: 2px;
		text-transform: uppercase;
		text-align: left;
		background: #CAE8EA url(images/bg_header.jpg) no-repeat; 
		height: 20px;
		margin-top: 0px;
	}
</style>
</head>

<body>
	<div class="tanchuceng" style="background-image: url('../images/dialog_title1.png');">
		<div class="damo" style="margin-left: 400px;">添加义工活动信息</div>
		<div class="esc" title="关闭"></div>
	</div>
	
	<div class="center" style="height: 440px; float: left; padding-left: 5px;">
		<table id="mytable" cellspacing="1">
			<tr>
				<th scope="col" abbr="COMPANY_NAME" width="150">企业名称:</th>
				<td><input type="text" id="COMPANY_NAME" style="width: 200px;" /></td>
				<th scope="col" abbr="SERVICE_LEVEL">服务评级:</th>
				<td><div id="SERVICE_LEVEL" style="background-image: url('<%=basePath %>backstage/images/1x.jpg'); width:111px; height:20px;">
					<div Dic="1" class="xing" style="margin-left: 0px;"></div><div Dic="2" class="xing"></div><div Dic="3" class="xing"></div><div Dic="4" class="xing"></div><div Dic="5" class="xing"></div>
				</div></td>
			</tr>
			<tr>
				<th scope="col" abbr="COMPANY_ADDRESS">企业地址:</th>
				<td colspan="3"><input type="text" id="COMPANY_ADDRESS" style="width: 550px;"/></td>
			</tr>
			<tr>
				<th colspan="2" scope="col" abbr="SERVICE_CONTENT" style="text-align: center;" height="25">服务项目 ↓ </th>
				<th scope="col" abbr="COMPANY_LOGO" style="text-align: center;">企业logo ↓ </th>
				<td><img id="loading" src="loading.gif" style="display:none;"><input type="file" name="file" id="file" style="width: 150px;height: 20px;" /><input type="button" style="width: 50px; margin-left: 5px; height: 20px;" value="上传" onclick="return uploadLoveLogo();"/></td>
			</tr>
			<tr>
				<td colspan="2"><textarea id="SERVICE_CONTENT" style="height: 100px; width: 340px;" disabled="disabled"></textarea></td>
				<td colspan="2"><input type="hidden" id="COMPANY_LOGO" />
					<img id="image" src="" title="" style="height: 100px; width: 300px;" alt="" /></td>
			</tr>
			<tr>
				<th colspan="2" scope="col" abbr="COMPANY_DESC" style="text-align: center;">企业描述 ↓ </th>
				<th scope="col" abbr="ORD_ID">排序值:</th>
				<td><input type="text" id="ORD_ID" style="width: 200px;"/></td>
			</tr>
			<tr>
				<td colspan="4" style="height: 150px; padding: 0px 0px 0px 0px;"><textarea id="COMPANY_DESC" name="COMPANY_DESC" style="height: 220px; width: 685px;"></textarea></td>
			</tr>
			<tr style="border: 0px;">
				<td style="border: 0px; height: 25px;"></td>
				<td style="border: 0px; height: 25px;"><input onclick="return save();" type="button" style="height: 25px; float: right; background-color: #CAE8EA; width: 80px;" value="  添  加  "></td>
				<td style="border: 0px; height: 25px;"><input onclick="closeLogin();" type="button" style="height: 25px; float: left; width: 80px;" value="  取  消  "></td>
				<td style="border: 0px; height: 25px;"></td>
			</tr>
		</table>
	</div>
	<div class="chacktree">
		<ul class="ultitle">请选择服务项目:</ul>
        <ul id="serviceTree" class="ztree" style="width: 210px;height: 517px;overflow: scroll; margin-top: -10px;"></ul>
	</div>
</body>
<script type="text/javascript" charset="UTF-8">
	function save(){
		var d = "1";
		$("#SERVICE_LEVEL .xing").each(function(){
			var dd = $(this).attr("DD");
			if(dd == "yes"){
				d = $(this).attr("DIC")
			}
		});
		var COMPANY_NAME = $("#COMPANY_NAME").val();
		if(COMPANY_NAME == ""){
			alert("企业名称不可为空！");
			return false;
		}
		var SERVICE_LEVEL = d;
		var COMPANY_ADDRESS = $("#COMPANY_ADDRESS").val();
		var SERVICE_CONTENT = $("#SERVICE_CONTENT").val();
		var COMPANY_LOGO = $("#COMPANY_LOGO").val();
		if(COMPANY_LOGO == ""){
			alert("请先上传企业LOGO！");
			return false;
		}
		var COMPANY_DESC = CKEDITOR.instances.COMPANY_DESC.getData();
		var ORD_ID = $("#ORD_ID").val();
		var re = new RegExp("^\\d+$");
		if(ORD_ID != "" && !ORD_ID.match(re)){
			alert("排序值应为数字！");
			return false;
		}
		$.post("<%=basePath%>/backstage/loveorganajax_saveLoveOrgan.action",{'loveOrgan_Info.COMPANY_NAME':COMPANY_NAME, 'loveOrgan_Info.SERVICE_LEVEL':SERVICE_LEVEL, 'loveOrgan_Info.COMPANY_ADDRESS':COMPANY_ADDRESS, 'loveOrgan_Info.SERVICE_CONTENT':SERVICE_CONTENT, 'loveOrgan_Info.COMPANY_LOGO':COMPANY_LOGO, 'loveOrgan_Info.COMPANY_DESC':COMPANY_DESC, 'loveOrgan_Info.ORD_ID':ORD_ID}, function(data){
			if(data == "SUCCESS"){
				window.parent.findIframe1("loveOrgan");
				closeLogin();
			}else{
				alert("发布失败！");
			}
		}, "text");
	}
</script>
</html>
