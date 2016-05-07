$(function(){
	//解析html源码，并转换为jsp页面不能识别的源码
	$(".info").each(function(){
		var info = $(this).attr("title");
		if(info.length > 8){
			info = info.substring(0, 6) + "···";
		}
		info = info.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		$(this).html(info);
	});
	//判断选中了那个标题,给选中的标题变换上一级的标签
	$(".left2_2 ul li").click(function(){
		$(".left2_2 ul li").each(function(){
			var htm1 = $(this).html().toLowerCase();
			if(htm1.indexOf("<span>") > -1){
				var htm2 = $(this).find("span").html();
				var now1 = "<a href='javascript:void(0);'>" + htm2 + "</a>";
				$(this).html(now1);
			}
		});
		var htm = $(this).find("a").html();
		var now = "<span>" + htm + "</span>";
		$(this).html(now);
		var dic = $(this).attr("Dic");
		var htm2 = $(this).find("span").html();
		var STATE = $("#state").val();
		var STATE1 = $("#state1").val();
		if(dic != "site" && dic != "admin"){
			$(".right1 a").html(htm2);
			$(".add").html("添加"+htm2);
			$(".add").val(dic);
			if(dic != "organAudit"){
				$(".add").css("display", "");
			}else{
				$(".add").css("display", "none");
			}
			if(dic != "VolPlan"){
				if(dic == "loveOrgan"){
					$("#state").css("display", "none");
					$("#state1").css("margin","-26px 175px");
				}else{
					$("#state").css("display", "");
					$("#state1").css("margin","-26px 285px");
				}
			}else{
				$("#state").css("display", "none");
			}
			$("#state1").css("display", "");
		}else{
			$(".right1 a").html(htm2);
			$(".add").css("display", "none");
			$("#state").css("display", "none");
			$("#state1").css("display", "none");
		}
		var url = "";
		if(dic == "PICTURES"){
			url= "backstage/pictures_getPicturesList.action?page=1&web_pic.PICTURES_STATE="+STATE;
		}else if(dic == "site"){
			url = "backstage/picSite_getSite.action?page=1";
		}else if(dic == "admin"){
			url = "backstage/admin_getAdmin.action?page=1";
		}else if(dic == "organAudit"){
			url = "backstage/organ_getOragn.action?page=1&organ_info.ORGAN_AUDIT="+STATE+"&organ_info.HOME_RECOMMEND="+STATE1;
		}else if(dic == "loveOrgan"){
			url = "backstage/loveorgan_getloveOrgan.action?page=1&loveOrgan_Info.HOME_RECOMMEND="+STATE1;
		}else if(dic == "VolPlan"){
			url = "backstage/volPlan_getPlan.action?page=1";
		}else{
			url = "backstage/getNews_getNewsListPage.action?NEWS_TYPE="+dic+"&page=1&NEWS_STATUS="+STATE;
		}
		$("#iframe").attr("src", url);
		$("#iframe").load();
	});
	//信息简介向上移动高度
	var h = $("#table_info").height();
	$(".tableright").css("margin-top", -h);
	//判断选中了那个tr
	$(".news tr").each(function(index){
		$(this).click(function(){
			var array = $(this).find("input").val().split("|");
			$("#p_title").html("");
			$("#p_time").html("");
			$("#p_info").html("");
			$("#p_source").html("");
			if(array[0].length > 8){
				$("#p_title").html(array[0].substring(0,6) + "···");
			}else{
				$("#p_title").html(array[0]);
			}
			$("#p_title").attr("title",array[0])
			if(array[2].length > 8){
				$("#p_source").html(array[2].substring(0,6) + "···");
			}else{
				$("#p_source").html(array[2]);
			}
			$("#p_source").attr("title", array[2]);
			$.post("backstage/ajax_getNewsID.action",{'NEWS_ID':array[4]},function(data){
				var p_info = data[0].NEWS_INFO;
				p_info = p_info.replace(/</g, "&lt;").replace(/>/g, "&gt;");
				if(p_info.length > 240){
					$("#p_info").html(p_info.substring(0,238) + "···");
				}else{
					$("#p_info").html(p_info);
				}
			},"json");
			$("#p_time").html(array[3]);
			$(this).find("td").css("background-color","#FFDAB9");
			$("tr").each(function(index1){
				if(index != index1){
					$(this).find("td").css("background-color","#F0F0F0");
				}
			});
		});
	});
	$(".picture tr").each(function(index){
		$(this).click(function(){
			var array = $(this).find("input").val().split("|");
			$("#p_title").html("");
			$("#p_time").html("");
			$("#p_info").html("");
			$("#p_source").html("");
			if(array[0].length > 8){
				$("#p_title").html(array[0].substring(0,6) + "···");
			}else{
				$("#p_title").html(array[0]);
			}
			$("#p_title").attr("title",array[0])
			if(array[2].length > 16){
				$("#p_time").html(array[2].substring(0,14) + "···");
			}else{
				$("#p_time").html(array[2]);
			}
			$("#p_time").attr("title", array[2]);
			$("#p_source").html(array[1]);
			if(array[3] != ""){
				$("#p_info").css("display","");
				$("#p_info").attr("title",array[2]);
				var path = $("#basePath").val();
				$("#p_info").attr("src",path+array[3]);
			}
			$(this).find("td").css("background-color","#FFDAB9");
			$("tr").each(function(index1){
				if(index != index1){
					$(this).find("td").css("background-color","#F0F0F0");
				}
			});
		});
	});
	//打开添加信息的弹出层
	$(".add").click(function(){
		var val = $(this).val();
		var html = $(this).html();
		window.parent.OpenDialog(val,html);
	});
	//点击搜索按钮
	$(".check_button button").click(function(){
		var news_tilte = $(".check_input input").val();
		var news_type = $(".check_tilte select").val();
		var STATE = $("#state").val();
		var STATE1 = $("#state1").val();
		var url = "";
		$(".left2_2 ul li").each(function(){
			var htm1 = $(this).html().toLowerCase();
			if(htm1.indexOf("<span>") > -1){
				var htm2 = $(this).find("span").html();
				var now1 = "<a href='javascript:void(0);'>" + htm2 + "</a>";
				$(this).html(now1);
			}
			if($(this).attr("Dic") == news_type){
				var htm = $(this).find("a").html();
				var now = "<span>" + htm + "</span>";
				$(this).html(now);
				var htm2 = $(this).find("span").html();
				$(".right1 a").html(htm2);
				$(".add").html("添加"+htm2);
				var dic = $(this).attr("Dic");
				$(".add").val(dic);
				if(dic == "PICTURES"){
					url = "backstage/pictures_getPictures.action?web_pic.PICTURES_TITLE="+news_tilte+"&page=1&web_pic.PICTURES_STATE="+STATE;
				}else if(dic == "admin"){
					url = "backstage/admin_getAdminLike.action?ADMIN_NAME="+news_tilte+"&page=1";
				}else if(dic == "organAudit"){
					url = "backstage/organ_getOragnLike.action?organ_info.COMPANY_NAME="+news_tilte+"&page=1&organ_info.ORGAN_AUDIT="+STATE+"&organ_info.HOME_RECOMMEND="+STATE1;
				}else if(dic == "loveOrgan"){
					url = "backstage/loveorgan_getloveOrganT.action?page=1&loveOrgan_Info.COMPANY_NAME="+news_tilte+"&loveOrgan_Info.HOME_RECOMMEND="+STATE1;
				}else if(dic == "site"){
					url = "backstage/picSite_getSiteLike.action?page=1&PICTURES_SITE="+news_tilte;
				}else{
					url = "backstage/getNews_getNewsList.action?NEWS_TITLE="+news_tilte+"&NEWS_TYPE="+news_type+"&page=1&NEWS_STATUS="+STATE;
				}
				if(dic == "organAudit"){
					$("#state").css("display", "");
					$("#state1").css("display", "");
				}else if(dic == "loveOrgan"){
					$(".add").css("display", "");
					$("#state").css("display", "none");
					$("#state1").css("display", "");
					$("#state1").css("margin-right", "175px");
				}else{
					if(dic == "admin" || dic == "site"){
						$("#state").css("display", "none");
					}
					$("#state1").css("display", "none");
				}
			}
		});
		$("#iframe").attr("src", url);
		$("#iframe").submit();
	});
	//点击页面跳转按钮
	$("#skip").click(function(){
		var val = $("#skip_input").val();
		window.parent.submitIframe("page",val);
	});
	//点击页面跳转按钮
	$("#skipPic").click(function(){
		var val = $("#skip_input_Pic").val();
		window.parent.submitIframePic(val);
	});
});
//发布、下线、删除信息
function publish(NEWS_ID,newsStatus){
	$.post("backstage/ajax_publishNews.action",{'NEWS_ID':NEWS_ID,'NEWS_STATUS':newsStatus},function(data){
		if(data == "SUCCESS"){
			if(newsStatus == "0"){
				$("td[Dic='"+ NEWS_ID +"']").html("已发布")
				$("a[Dic_a='"+ NEWS_ID +"']").attr("href", "javascript:publish('"+NEWS_ID+"',1);");
				$("a[Dic_a='"+ NEWS_ID +"']").html("下线");
			}else if(newsStatus == "1"){
				$("td[Dic='"+ NEWS_ID +"']").html("已下线")
				$("a[Dic_a='"+ NEWS_ID +"']").attr("href", "javascript:publish('"+NEWS_ID+"',2);");
				$("a[Dic_a='"+ NEWS_ID +"']").html("删除");
			}else if(newsStatus == "2"){
				window.parent.submitIframe("page",$("#skip_input").val());
				closeLogin();
			}
		}else{
			$("td[Dic='"+ NEWS_ID +"']").html("失败")
		}
	},"text");
}
function Picturespublish(PICTURES_ID,PICTURES_STATE,PICTURES_SITE){
	$.post("backstage/pic_updateState.action",{'wp.PICTURES_ID':PICTURES_ID,'wp.PICTURES_STATE':PICTURES_STATE,'wp.PICTURES_SITE':PICTURES_SITE},function(data){
		if(data == "SUCCESS"){
			if(PICTURES_STATE == "0"){
				$("td[Dic='"+ PICTURES_ID +"']").html("已发布")
				$("a[Dic_a='"+ PICTURES_ID +"']").attr("href", "javascript:Picturespublish('"+PICTURES_ID+"',1);");
				$("a[Dic_a='"+ PICTURES_ID +"']").html("下线");
			}else if(PICTURES_STATE == "1"){
				$("td[Dic='"+ PICTURES_ID +"']").html("已下线")
				$("a[Dic_a='"+ PICTURES_ID +"']").attr("href", "javascript:Picturespublish('"+PICTURES_ID+"',2);");
				$("a[Dic_a='"+ PICTURES_ID +"']").html("删除");
			}else if(PICTURES_STATE == "2"){
				window.parent.submitIframePic($("#skip_input_Pic").val());
				closeLogin();
			}
		}else if(data == "EXIST"){
			alert("发布图片数量已够,如要发布，请先下线同位置的其他图片后再发布！");
		}else{
			$("td[Dic='"+ PICTURES_ID +"']").html("失败");
		}
	},"text");
}
function clickpage(page, hidden_state){
	window.parent.submitIframe("page", page, hidden_state);
}
function clickpagePic(page,PICTURES_STATE,tilte){
	window.parent.submitIframePic(page,PICTURES_STATE,tilte);
}
function state(value){
	var start = "";
	var url = "";
	var end = "";
	var src = $("#iframe").attr("src");
	if(src.indexOf("NEWS_STATUS") > -1){
		start = src.substring(0,src.indexOf("NEWS_STATUS"));
		url = src.substring(src.indexOf("NEWS_STATUS"), src.length);
		if(url.indexOf("&") > -1){
			end = url.substring(url.indexOf("&"), src.length);
			url = url.substring(0, url.indexOf("&"));
			url = url.substring(0,url.indexOf("=")+1);
		}else{
			url = url.substring(0,url.indexOf("=")+1);
		}
	}
	if(src.indexOf("web_pic.PICTURES_STATE") > -1){
		start = src.substring(0,src.indexOf("web_pic.PICTURES_STATE"));
		url = src.substring(src.indexOf("web_pic.PICTURES_STATE"), src.length);
		if(url.indexOf("&") > -1){
			end = url.substring(url.indexOf("&"), src.length);
			url = url.substring(0, url.indexOf("&"));
			url = url.substring(0,url.indexOf("=")+1);
		}else{
			url = url.substring(0,url.indexOf("=")+1);
		}
	}
	if(value == "state"){
		if(src.indexOf("organ_info.ORGAN_AUDIT") > -1 ){
			start = src.substring(0,src.indexOf("organ_info.ORGAN_AUDIT"));
			url = src.substring(src.indexOf("organ_info.ORGAN_AUDIT"), src.length);
			if(url.indexOf("&") > -1){
				end = url.substring(url.indexOf("&"), src.length);
				url = url.substring(0, url.indexOf("&"));
				url = url.substring(0,url.indexOf("=")+1);
			}else{
				url = url.substring(0,url.indexOf("=")+1);
			}
		}
	}else{
		if(src.indexOf("organ_info.HOME_RECOMMEND") > -1 ){
			start = src.substring(0,src.indexOf("organ_info.HOME_RECOMMEND"));
			url = src.substring(src.indexOf("organ_info.HOME_RECOMMEND"), src.length);
			if(url.indexOf("&") > -1){
				end = url.substring(url.indexOf("&"), src.length);
				url = url.substring(0, url.indexOf("&"));
				url = url.substring(0,url.indexOf("=")+1);
			}else{
				url = url.substring(0,url.indexOf("=")+1);
			}
		}else if(src.indexOf("loveOrgan_Info.HOME_RECOMMEND") > -1 ){
			start = src.substring(0,src.indexOf("loveOrgan_Info.HOME_RECOMMEND"));
			url = src.substring(src.indexOf("loveOrgan_Info.HOME_RECOMMEND"), src.length);
			if(url.indexOf("&") > -1){
				end = url.substring(url.indexOf("&"), src.length);
				url = url.substring(0, url.indexOf("&"));
				url = url.substring(0,url.indexOf("=")+1);
			}else{
				url = url.substring(0,url.indexOf("=")+1);
			}
		}
	}
	$("#iframe").attr("src",start+url+value+end);
	$("#iframe").submit();
}