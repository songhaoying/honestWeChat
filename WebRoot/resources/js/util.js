/**
*公用的js方法
*
**/

//退出登陆
function login_out(){
	if(window.confirm('您确定要退出系统吗？')){
		$j.ajax(
			{
			url:Bonc.toFullPath("/login/Login!loginout.action"),
			data:{},
			success:function(msg){
					if(msg=='1'){
						alert('退出登陆成功！');
						window.location.href=Bonc.toFullPath('/index.jsp');
					}else{
						alert('退出登陆失败！');
					}	
			}
			}
		); 
	} 
} 
//搜索隐藏提示语	 
function search_hidden(){
		var old = $j('#searchName').val();
		if(old=='请输入关键字查询'){
			$j('#searchName').val('');
		}
	}
//搜索显示提示语	
 function search_show(){
	var old = $j('#searchName').val();
	if($j.trim(old)==''){
		$j('#searchName').val('请输入关键字查询');
	}
}
/**************************************信息发布**********************************************************************/
	//服务类别级联菜单
	function changeSelect(id){
	var parentId=$j("#bigType").val(); 
	if(null!= parentId && ""!=parentId){
	if(parentId!=-1){ 
	var url=Bonc.toFullPath("/usercenter/UserCenter!subServiceType.action");
	$j.getJSON(url,{parentId:parentId},function(myJSON){ 
	var options=""; 
	if(myJSON.length>0){ 
	options+="<option value=''>--请选择类别--</option>"; 
	for(var i=0;i<myJSON.length;i++){
	if(id=='') {
		options+="<option value="+myJSON[i].SERVICE_TYPE_ID+">"+myJSON[i].SERVICE_TYPE_NAME+"</option>";
	}else{
		if(id==myJSON[i].SERVICE_TYPE_ID){
			options+="<option value="+myJSON[i].SERVICE_TYPE_ID+" selected='selected'>"+myJSON[i].SERVICE_TYPE_NAME+"</option>";
		}else{
			options+="<option value="+myJSON[i].SERVICE_TYPE_ID+">"+myJSON[i].SERVICE_TYPE_NAME+"</option>";
		}
	}
	 
	} 
	$j("#subType").html(options); 
	 }
	 }); 
	 }
	 
	}
	}
//Ajax上传文件
    function ajaxFileUpload(){ 
	    $j("#loading").show();//动态加载小图标 
	    $j.ajaxFileUpload({ 
	    url:Bonc.toFullPath("/upload/FileUpload!uploadFile.action"), 
	    secureuri:false, 
	    fileElementId:'pic', 
	    dataType: 'json', 
	    success: function (data, status){ 
	    $j("#loading").hide();//隐藏小图标 
	    if(typeof(data.error) != 'undefined'){ 
	    if(data.error != ''){ 
	    	alet(data.error); 
	    }else{  
	      $j('#uploadMsg').html(data.message); 
		  $j('#picName').val("resources/images/service/"+data.url);
		  $j("#ima").attr("src",$j('#picName').val());  
	      alert(data.message);
	    } } }, 
	    error: function (data, status, e){
	     alert(e);} 
	     }) 
	     return false;
      }
      
      
      //Ajax上传文件
    function ajaxFileUpload2(){ 
	    $j("#loading2").show();//动态加载小图标 
	    $j.ajaxFileUpload({ 
	    url:Bonc.toFullPath("/upload/FileUpload!uploadFile2.action"), 
	    secureuri:false, 
	    fileElementId:'pic2', 
	    dataType: 'json', 
	    success: function (data, status){ 
	    $j("#loading2").hide();//隐藏小图标 
	    if(typeof(data.error) != 'undefined'){ 
	    if(data.error != ''){ 
	    	alet(data.error); 
	    }else{  
	      $j('#uploadMsg2').html(data.message); 
		  $j('#picName2').val("resources/images/donation/"+data.url);
		  $j("#ima2").attr("src",$j('#picName2').val());  
	      alert(data.message);
	    } } }, 
	    error: function (data, status, e){
	     alert(e);} 
	     }) 
	     return false;
      }
      
          //Ajax上传文件
    function ajaxFileUpload3(){ 
	    $j("#loading2").show();//动态加载小图标 
	    $j.ajaxFileUpload({ 
	    url:Bonc.toFullPath("/upload/FileUpload!uploadFile2.action"), 
	    secureuri:false, 
	    fileElementId:'pic2', 
	    dataType: 'json', 
	    success: function (data, status){ 
	    $j("#loading2").hide();//隐藏小图标 
	    if(typeof(data.error) != 'undefined'){ 
	    if(data.error != ''){ 
	    	alet(data.error); 
	    }else{  
	      $j('#uploadMsg2').html(data.message); 
		  $j('#picName2').val("resources/images/donation/"+data.url);
		  $j("#ima2").attr("src",$j('#picName2').val());  
	      alert(data.message);
	    } } }, 
	    error: function (data, status, e){
	     alert(e);} 
	     }) 
	     return false;
      }
      
      //Ajax上传文件
    function ajaxFile2Upload(){ 
	    $j("#loading").show();//动态加载小图标 
	    $j.ajaxFileUpload({ 
	    url:Bonc.toFullPath("/upload/FileUpload!uploadFile.action"), 
	    secureuri:false, 
	    fileElementId:'pic', 
	    dataType: 'json', 
	    success: function (data, status){ 
	    $j("#loading").hide();//隐藏小图标 
	    if(typeof(data.error) != 'undefined'){ 
	    if(data.error != ''){ 
	    	alet(data.error); 
	    }else{  
	      $j('#uploadMsg').html(data.message); 
		  $j('#picName').val("resources/images/service/"+data.url);
		  $j("#ima").attr("src",$j('#picName').val());  
	      alert(data.message);
	    } } }, 
	    error: function (data, status, e){
	     alert(e);} 
	     }) 
	     return false;
      }
      
/**************************************信息发布**********************************************************************/
//会员中心
function user_center(user){  
	if(user==''){
		alert("请先登录！");
	}else{
		window.location.href=Bonc.toFullPath('/pages/usercenter/UserCenter.jsp');
	}
}

//供需服务
function services(){
	window.location.href=Bonc.toFullPath('/services/Services.action');
}
//帮助中心
function help_center(user){
	window.location.href=Bonc.toFullPath('/helpcenter/Help.action');
}
//企业加盟
function company_join(user){
	window.location.href=Bonc.toFullPath('/companyjoin/CompanyJoin.action');
}

//服务企业
function service_company(user){
 window.location.href=Bonc.toFullPath('/servicecompany/ServiceCompany.action');
}
//新闻中心
function news_center(type){
    if(type==0){
    	window.location.href=Bonc.toFullPath('/newscenter/NewsCenter.action?where=6');
    }else{
        news_list('7','4');
    }
}

function love_activi(){
    	window.location.href=Bonc.toFullPath('/loveactivi/LoveActivi!activiList.action?where=7');
}

//求赠信息
function donation(){
	window.location.href=Bonc.toFullPath('/services/DoNation!doNationProvide.action');
}

/******************二级页面跳转***************************/
//新闻列表
function news_list(type,where){
	window.location.href=Bonc.toFullPath('/newscenter/NewsCenter!newsList.action?newsType='+type+'&where='+where);
}
//新闻新闻明细
function news_show(id,where){
	window.location.href=Bonc.toFullPath('/newscenter/NewsCenter!newsShow.action?newsId='+id+'&where='+where);
}
//供需服务
function services_show(id,userType){
	window.location.href=Bonc.toFullPath('/services/Services!servicesShow.action?id='+id+'&userType='+userType);
}
//供需服务 新页面展示
function services_show2(id,userType){
    window.open(Bonc.toFullPath('/services/Services!servicesShow.action?id='+id+'&userType='+userType));
    
}
//求赠信息
function donation_show(id,infoType){
    if(infoType=='0'){
	window.location.href=Bonc.toFullPath('/services/DoNation!provideShow.action?id='+id);
    }else{
	window.location.href=Bonc.toFullPath('/services/DoNation!demandShow.action?id='+id);
    }
}

//求赠信息2  新页面展示
function donation_show2(id,infoType){
    if(infoType=='0'){
	window.open(Bonc.toFullPath('/services/DoNation!provideShow.action?id='+id));
    }else{
	window.open(Bonc.toFullPath('/services/DoNation!demandShow.action?id='+id));
    }
}
// 根据关键字查询信息
function getMessageByKey(keys,type){
	
	var url="";
	var url1="/services/Services.action?";
	var url2="/services/DoNation!doNationProvide.action?";
	var url3="/services/DoNation!doNationDemand.action?";
	if(keys!=null&&keys!=''){
		if(type==1){
			url=url1+'&keys='+keys;
		}else if(type==2){
			url=url2+'&keys='+keys;
		}else if(type==3){
			url=url3+'&keys='+keys;
		}
	}
	url=Bonc.toFullPath(url) ; 
	window.location.href=url;
	}
//爱心企业排行
function getTopoList(){
	$j.ajax(
			{
			url:Bonc.toFullPath("/comm/Comm!getCPTopo.action"),
			async:false,
			dataType:"json",
			data:{},
			success:function(data){ 
				var  topos = $j('#topoCompany');
				topos.append("<ul>");
				for(i=0;i<data.length;i++){ 
					var title = data[i].COMPANY_NAME;
					if(title.length>12){
						title = data[i].COMPANY_NAME.substring(0,12)+"...";
					}
					if(i==0){
						topos.append("<li><span class='s hong'>0"+(i+1)+"</span><span class='x' style='cursor:pointer' onclick=\"getCompany(\'"+data[i].COMPANY_ID+"\')\">"+title+"</span></li>");
					}else if(i==1){
						topos.append("<li><span class='s lan'>0"+(i+1)+"</span><span class='x' style='cursor:pointer' onclick=\"getCompany(\'"+data[i].COMPANY_ID+"\')\">"+title+"</span></li>");
					}else if(i==2){
						topos.append("<li><span class='s lv'>0"+(i+1)+"</span><span class='x' style='cursor:pointer' onclick=\"getCompany(\'"+data[i].COMPANY_ID+"\')\">"+title+"</span></li>");
					}else if(i<9){
						topos.append("<li><span class='s '>0"+(i+1)+"</span><span class='x' style='cursor:pointer' onclick=\"getCompany(\'"+data[i].COMPANY_ID+"\')\">"+title+"</span></li>");
					}else{
						topos.append("<li><span class='s '>"+(i+1)+"</span><span class='x' style='cursor:pointer' onclick=\"getCompany(\'"+data[i].COMPANY_ID+"\')\">"+title+"</span></li>");
					}
				}
				topos.append("</ul>");
			}
			}
		);
}		
		
//优秀企业推荐
function recCompanyList(){
	$j.ajax(
			{
			url:Bonc.toFullPath("/comm/Comm!recCompanyList.action"),
			async:false,
			dataType:"json",
			data:{},
			success:function(data){ 
				var  topos = $j('#recCompany');
				topos.append("<ul>");
				for(i=0;i<data.length;i++){
						var title = data[i].COMPANY_NAME;
						if(title.length>12){
							title = data[i].COMPANY_NAME.substring(0,12)+"...";
						}
						topos.append("<li><h1 class='lan'><a href=\"javascript:getCompanyInfo(\'"+data[i].COMPANY_ID+"\')\">"+title+"</a></h1><p>推荐原因：真情服务 奉献社会</p></li>");
				}
				topos.append("</ul>");
			}
			}
		);
}

//论坛热点

function hotPostList (){
	$j.ajax(
			{
			url:Bonc.toFullPath("/comm/Comm!bbsHotPost.action"),
			async:false,
			dataType:"json",
			data:{},
			success:function(data){ 
				var  logos = $j('#bbsxinxi'); 
				logos.append("<ul>");
				for(i=0;i<data.length;i++){  
				var title = data[i].subject;
					if(title.length>12){
						title = data[i].subject.substring(0,12)+"...";
					}
					logos.append(" <li><a href='http://zhubing618.vicp.cc/bbs/forum.php?mod=viewthread&tid="+data[i].tid+"#lastpost' target='_blank'>"+title+"</a></li>");
				}
				logos.append("</ul>");
			}
			}
		); 
}

//二级页面广告图片
function secondPic(){
$j.ajax(
			{
			url:Bonc.toFullPath("/comm/Comm!secondPic.action"),
			async:false,
			dataType:"json",
			data:{},
			success:function(data){  
				for(i=0;i<data.length;i++){ 
				    var url = Bonc.toFullPath(data[i].PICTURES_SRC);
					if(data[i].PICTURES_SITE=="second_major_one"){ 
						$j('#second_major_one').append("<a href= \""+data[i].PICTURES_LINK+"\"   target='_blank'><img src=\""+url+"\"   width='210px'  height='86px'    /></a>");
					}else if(data[i].PICTURES_SITE=="second_major_two"){
						$j('#second_major_one').append("<a href= \""+data[i].PICTURES_LINK+"\"   target='_blank'><img src=\""+url+"\"   width='210px'  height='86px'    /></a>");
					}
				} 
			}
			}
		); 
}




//查看爱心企业详细信息
function getCompany(cp_id){
	 var url = Bonc.toFullPath('/lovecompany/LoveCompany!companyInfo.action?companyId='+cp_id);
	 window.location.href = url;
}

//侧边栏本站公告查询
function getNoticeList(){
	$j.ajax(
			{
			url:Bonc.toFullPath("/comm/Comm!getNotice.action"),
			async:false,
			dataType:"json",
			data:{},
			success:function(data){ 
				var  notices = $j('#topoNotice');
				notices.append("<ul>");
				for(i=0;i<data.length;i++){
					var url=Bonc.toFullPath("/newscenter/NewsCenter!newsShow.action?newsId="+data[i].NEWS_ID+"&where=6"); 
					var title = data[i].NEWS_TITLE;
					if(title.length>12){
						title = data[i].NEWS_TITLE.substring(0,12)+"...";
					}
					notices.append("<li><a href='"+url+"'>"+title+"</a></li>");
				}
				notices.append("</ul>");
			}
			}
		);
}

//免费发布信息按钮
function free_publish(user){  
	if(user==''){
		alert("请先登录！");
	}else{
		window.location.href=Bonc.toFullPath('/pages/usercenter/UserCenter.jsp?fromPage=free');
	}
}

//查看帮助详细信息
function getHelp(help_id){
	 var url = Bonc.toFullPath('/helpcenter/Help!showHelp.action?newsId='+help_id);
	 window.location.href = url;
}

//首页常见问题
function questionsList(){
$j.ajax(
			{
			url:Bonc.toFullPath("/comm/Comm!questionsList.action"),
			async:false,
			dataType:"json",
			data:{},
			success:function(data){ 
				var  notices = $j('#questionList');
				notices.append("<ul>");
				for(i=0;i<data.length;i++){
					var url=Bonc.toFullPath("/helpcenter/Help!showHelp.action?newsId="+data[i].NEWS_ID+"&where=8");
					var title = data[i].NEWS_TITLE;
					if(title.length>12){
						title = data[i].NEWS_TITLE.substring(0,12)+"...";
					}
					notices.append("<li> <h1 class='lan'> <a href='"+url+"'>"+title+"</a></h1></li>");
				}
				notices.append("</ul>");
			}
			}
		);
}


//(个人中心查看)查看参与活动详细信息
 function getActivity(plan_id){
 	 var url = Bonc.toFullPath('/loveactivi/LoveActivi!activiInfo.action?plan_id='+plan_id);
 	 window.open(url);
 }


//活动详细信息
 function getActivi(plan_id){
 	 var url = Bonc.toFullPath('/loveactivi/LoveActivi!activiInfo.action?plan_id='+plan_id);
 	 window.location.href=url;
 }
 
 	//个人中心查看企业详细信息
	function getCompanyInfoOther(id){
		var url=Bonc.toFullPath('/servicecompany/ServiceCompany!info.action?companyId='+id) ;
		window.open(url);
	}


/*************************************服务企业 开始*************************************************************************/
function getCompanyList(keyWords,serviceTypeId){
	var url=Bonc.toFullPath('/servicecompany/ServiceCompany!list.action') ;
	var  keyWord = encodeURI(keyWords);
	var p={keyWord:keyWord,serviceTypeId:serviceTypeId};
	new Ajax.Updater('companyListDiv', url,
		      {
		         method: 'get',
		         asynchronous: true, //异步
		         evalScripts:true,   //执行javascript    
		         parameters: p
		      });
	}

	function getCompanyListSearch(){
		var keyWrods = $j('#keys').val(); 
			getCompanyList(keyWrods,''); 
	}
	
	function getCompanyInfo(id){
		var url=Bonc.toFullPath('/servicecompany/ServiceCompany!info.action?companyId='+id) ;
		window.location.href=url;
	}
/*************************************服务企业 结束*************************************************************************/