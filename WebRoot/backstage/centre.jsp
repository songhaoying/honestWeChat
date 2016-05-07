<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <base href="<%=basePath%>">
    
    <title>荥阳市残疾人服务中心后台管理</title>
    <meta http-equiv="Content-Type" content="text/jsp; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
    <link href="<%=basePath %>backstage/css/index.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath %>backstage/css/table/style.css" rel="stylesheet" type="text/css" />
    <link href="<%=basePath %>backstage/css/ul/style.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<%=basePath %>backstage/js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="<%=basePath %>backstage/js/newsinfo.js"></script>
 	<style type="text/css">
 		#centbox{width:100%; overflow: hidden; background: url(backstage/images/boxbg.jpg) repeat-x; border-top:#fff 0px solid; margin:0 auto; padding:0;}
 	</style>
 	<script type="text/javascript">
 		function beRECOMMEND(id){
			window.parent.beRECOMMEND(id);
		}
		function OpenDialog(val,dic){
			window.parent.OpenDialog1(val,dic);
		}
		//查看企业基本信息
		function OpenDialogOrgan(id){
			window.parent.OpenDialogOrgan(id);
		}
		//查看义工活动信息
		function OpenDialogVolPlan(id){
			window.parent.OpenDialogVolPlan(id);
		}
		//修改义工活动信息
		function updatePlan(id){
			window.parent.updatePlan(id);
		}
		//修改活爱心企业信息
		function updateLoveOrgan(id){
			window.parent.updateLoveOrgan(id);
		}
		function submitIframe1(type){
			if(type == "loveOrgan"){
				var state1 = $("#state1").val();
				var select = $(".check_tilte select").val();
				var input = $(".check_input input").val();
				if(select == "loveOrgan"){
					if(input != "" && input != undefined && input != null){
						url = "backstage/loveorgan_getloveOrganT.action?page=1&loveOrgan_Info.HOME_RECOMMEND="+state1+"&loveOrgan_Info.COMPANY_NAME="+input;
					}else{
						url = "backstage/loveorgan_getloveOrgan.action?page=1&loveOrgan_Info.HOME_RECOMMEND="+state1;
					}
				}else{
					url = "backstage/loveorgan_getloveOrgan.action?page=1&loveOrgan_Info.HOME_RECOMMEND="+state1;
				}
			}else if(type == "VolPlan"){
				url = "backstage/volPlan_getPlan.action?page=1";
			}
			$("#iframe").attr("src", url);
			$("#iframe").submit();
		}
		function submitIframe(NEWS_TYPE,page){
			if(NEWS_TYPE == "page"){
				NEWS_TYPE = $(".add").val();
			}
			var check_title = $("#iframe").contents().find("#hidden_title").val();
			var hidden_state = $("#iframe").contents().find("#hidden_state").val();
			var url = "";
			if(check_title != ""){
				url = "backstage/getNews_getNewsList.action?NEWS_TITLE="+check_title+"&NEWS_TYPE="+news_type+"&page="+page+"&NEWS_STATUS="+hidden_state;
			}else{
				url = "backstage/getNews_getNewsListPage.action?NEWS_TYPE="+NEWS_TYPE+"&page="+page+"&NEWS_STATUS="+hidden_state;
			}
			$("#iframe").attr("src", url);
			$("#iframe").submit();
		}
		function submitIframePic(page){
			var PICTURES_STATE = $("#iframe").contents().find("#hidden_state").val();
			var tilte = $("#iframe").contents().find("#hidden_title").val();
			var url = "";
			if(tilte != "" && tilte != null && tilte != undefined){
				url = "backstage/pictures_getPictures.action?page="+page+"&web_pic.PICTURES_STATE="+PICTURES_STATE+"&web_pic.PICTURES_TITLE="+tilte;
			}else{
				url = "backstage/pictures_getPicturesList.action?page="+page+"&web_pic.PICTURES_STATE="+PICTURES_STATE;
			}
			$("#iframe").attr("src", url);
			$("#iframe").submit();
		}
		function submitIframePic_Site(page){
			$("#iframe").attr("src", "backstage/picSite_getSite.action?page="+page);
			$("#iframe").submit();
		}
		function submitIframeAdmin(page){
			$("#iframe").attr("src", "backstage/admin_getAdmin.action?page="+page);
			$("#iframe").submit();
		}
		function submitIframeOrgan(page){
			var STATE = $("#state").val();
			var STATE1 = $("#state1").val();
			$("#iframe").attr("src", "backstage/organ_getOragn.action?page="+page+"&organ_info.ORGAN_AUDIT="+STATE+"&organ_info.HOME_RECOMMEND="+STATE1);
			$("#iframe").submit();
		}
		function submitIframeLove(page){
			$("#iframe").attr("src", "backstage/loveorgan_getloveOrgan.action?page="+page+"&loveOrgan_Info.HOME_RECOMMEND=0,1");
			$("#iframe").submit();
		}
		function submitIframeVolPlan(page){
			var STATE1 = $("#state1").val();
			$("#iframe").attr("src", "backstage/volPlan_getPlan.action?page="+page);
			$("#iframe").submit();
		}
	</script>
	<!--[if lt IE 8]>
  		<style type="text/css">
			.add{margin: -29px 285px;background-color:transparent;}
			.check_button button{height:25px; line-height: 15px;}
		</style>
	<![endif]-->
  </head>
  
  <body>
	<div id="centbox">
		<div class="mid">
		  <div class="left">
		    <div class="left1">
			   <div class="left_te1"><img src="backstage/images/left1_03.jpg" /></div>
			   <div class="left_te2" align="center">
			    <c:if test="${catalogue == '0' }">
				     <div class="check_tilte">标题搜索 -- 
				</c:if>
				<c:if test="${catalogue == '1' }">
				     <div class="check_tilte">名称搜索 --
				</c:if>
				     	<select>
				     		<c:if test="${catalogue == '0' }">
					     		<option value="3">政务管理</option>
					     		<option value="4">公告管理</option>
					     		<option value="1">资讯管理</option>
					     		<option value="2">特别关注</option>
					     		<option value="5">通知管理</option>
					     		<option value="6">新闻管理</option>
					     		<option value="7">生活经验</option>
					     		<option value="PICTURES">图片管理</option>
					     		<option value="8">帮助中心</option>
					     	</c:if>
					     	<c:if test="${catalogue == '1' }">
					     		<option value="admin">管理员</option>
					     		<option value="organAudit">企业审核</option>
					     		<option value="loveOrgan">爱心企业</option>
					     		<c:if test="${userinfo.ADMIN_NAME == 'admin' }">
					     			<option value="site">图片位置</option>
					     		</c:if>
					     	</c:if>
				     	</select>
				     </div>
			     <div class="check_input"><input type="text"/></div>
				 <div class="check_button"><button>搜索</button></div>
		       </div>
			   <div class="left_te3"><img src="backstage/images/left1_07.jpg" /></div>
			</div>
			
			<div class="left2">
			  <div class="left2_1"><img src="backstage/images/left2_01.jpg" /></div>
			  <div class="left2_2">
			     <ul>
			     	<c:if test="${catalogue == '0' }">
					   	<li Dic="3"><span>政务管理</span></li>
					   	<li Dic="4"><a href="javascript:void(0);">公告管理</a></li>
					   	<li Dic="1"><a href="javascript:void(0);">资讯管理</a></li>
					   	<li Dic="2"><a href="javascript:void(0);">特别关注</a></li>
					   	<li Dic="5"><a href="javascript:void(0);">通知管理</a></li>
					   	<li Dic="6"><a href="javascript:void(0);">新闻管理</a></li>
					   	<li Dic="PICTURES"><a href="javascript:void(0);">图片管理</a></li>
					   	<li Dic="VolPlan"><a href="javascript:void(0);">义工活动</a></li>
					   	<li Dic="7"><a href="javascript:void(0);">生活经验</a></li>
					   	<li Dic="8"><a href="javascript:void(0);">帮助中心</a></li>
					</c:if>
					<c:if test="${catalogue == '1' }">
					   	<li Dic="admin"><span>管理员</span></li>
					   	<li Dic="organAudit"><a href="javascript:void(0);">企业审核</a></li>
					   	<li Dic="loveOrgan"><a href="javascript:void(0);">爱心企业</a></li>
					   	<c:if test="${userinfo.ADMIN_NAME == 'admin' }">
					   		<li Dic="site"><a href="javascript:void(0);">图片位置</a></li>
					   	</c:if>
					</c:if>
				 </ul>
			  </div>
			  <div class="left2_1"><img src="backstage/images/left2_02.jpg" /></div>
			</div>
		  </div>
		  
		  <div class="right">
		    <div class="right1">现在的位置：<a href="#"><c:if test="${catalogue == '0' }">政务管理</c:if><c:if test="${catalogue == '1' }">管理员</c:if></a> 
		    	<div class="add" title="添加" value="3" <c:if test="${catalogue == '1' }">style="display: none"</c:if>>添加政务管理</div>
		    	<c:if test="${catalogue == '0' }">
			    	<select id="state" class="state" onchange="javascript:state(this.value);">
			    		<option value="state">选择状态</option>
			    		<option value="0">未发布</option>
			    		<option value="1">已发布</option>
			    		<option value="2">已下线</option>
			    	</select>
		    	</c:if>
		    	<c:if test="${catalogue == '1' }">
			    	<select id="state" class="state" onchange="javascript:state(this.value);" style="display: none;width: 105px;">
			    		<option value="state">选择审核状态</option>
			    		<option value="0">未审核</option>
			    		<option value="1">审核已通过</option>
			    		<option value="2">审核未通过</option>
			    	</select>
			    	<select id="state1" class="state" onchange="javascript:state(this.value);" style="display: none;width: 105px; margin: -26px 285px;">
			    		<option value="state1">首页推荐状态</option>
			    		<option value="0">未推荐</option>
			    		<option value="1">已推荐</option>
			    	</select>
		    	</c:if>
		    </div>
			<div class="right2" align="center">
			   <iframe id="iframe" name="iframe" class="right2_tt" <c:if test="${catalogue == '0' }">src="backstage/getNews_getNewsListPage.action?NEWS_TYPE=3&page=1&NEWS_STATUS=0,1,2"</c:if><c:if test="${catalogue == '1' }">src="backstage/admin_getAdmin.action?page=1"</c:if> scrolling="no" frameborder="0">
			   
			   </iframe>
			</div>
			<div class="right3"><img src="backstage/images/right_b_03.jpg" width="913px" height="6px"/></div>
		  </div>
		</div>
	</div>
  </body>
</html>
