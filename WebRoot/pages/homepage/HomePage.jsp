<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="b" uri="/bonc-tags"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<base href="<%=basePath%>" />
<b:head/>
<script type="text/javascript"> 

	function init(){
		 load_qq();
		getHead();
		getFoot();
		//爱心企业
		love_company();
		getTopoList();
		getNoticeList();
		//论坛热点
		hotPostList();
		//常见问题
		questionsList(); 
		
	}
	
	
	function load_qq(){
	$j("#lrkfwarp").lrkf({
	    root:'<%=basePath%>resources/lrkf/',
		skin:'lrkf_yellow1',
		kfTop:'190',
		defShow:false,
		qqs:[
			{'name':'客服一','qq':'444974593'},			//注意逗号是英文的逗号
			{'name':'客服二','qq':'54752037'},
			{'name':'客服三','qq':'396962431'}			//注意最后一个{}不要英文逗号
		],
		tel:[
			{'name':'售前','tel':'400-655-0888'},		//注意逗号是英文的逗号
			{'name':'售后','tel':'15638527790'}
		],
		more:"http://www.dqxxjs.com/"				//>>更多方式		
	});
	}
	 
	function getHead(){ 
	var url=Bonc.toFullPath('/homepage/HomePage!head.action?where=0') ; 
	var p;
	new Ajax.Updater('headPage', url,
		      {
		         method: 'get',
		         asynchronous: true, //异步
		         evalScripts:true,   //执行javascript    
		         parameters: p,
		         onComplete:getOrder
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
	
	function getOrder(){
		$j.ajax(
			{
			url:Bonc.toFullPath("/homepage/HomePage!queryOrder.action"),
			async:false,
			dataType:"json",
			data:{},
			success:function(data){ 
					$j("#TODAY_AC").html(data[0].TODAY_AC);
					$j("#TODAY_PD").html(data[0].TODAY_PD);
					$j("#TODAY_SUC_CUS").html(data[0].TODAY_SUC_CUS);
					$j("#SUM_PD").html(data[0].SUM_PD);
					$j("#SUM_SUC_CUS").html(data[0].SUM_SUC_CUS);
			}
			}
		); 
	}
	
	function selectTag(showContent,selfObj){
	// 操作标签
	var tag = document.getElementById("tags").getElementsByTagName("li");
	var taglength = tag.length;

	for(i=0; i<taglength; i++){
		tag[i].className = "";
	}
	selfObj.parentNode.className = "selectTag";
	// 操作内容
	for(i=0; j=document.getElementById("tagContent"+i); i++){
		j.style.display = "none";
	}
	document.getElementById(showContent).style.display = "block";
}

	//爱心企业
	function love_company(){
		$j.ajax(
			{
			url:Bonc.toFullPath("/homepage/HomePage!loveCompany.action"),
			async:false,
			dataType:"json",
			data:{},
			success:function(data){ 
				var  logos = $j('#love_logos'); 
				for(i=0;i<data.length;i++){ 
					logos.append("<img src='<%=basePath%>"+data[i].COMPANY_LOGO+"' alt='"+data[i].COMPANY_NAME+"' style='cursor: pointer'  onclick=\"getCompany(\'"+data[i].COMPANY_ID+"\')\" />");
				}
				getOrder();
			}
			}
		); 
	}
  function getServiceByLargeType(type){
	var url="";
	url=Bonc.toFullPath('/services/Services.action?largeType='+type) ; 
	window.open(url);
	}
	function getServiceBySubType(type){
	var url="";
	url=Bonc.toFullPath('/services/Services.action?subType='+type) ; 
	window.open(url);
	}
	
	function phoneValidate(phone){
	var phoneReg=/^\d{7,}$/;
    var movePhoneReg=/^([1][3][0-9][0-9]{8}$)|([1][5][0-9][0-9]{8}$)|([1][8][0-8][0-9]{8}$)/;
		if(!phoneReg.exec(phone)&&!movePhoneReg.exec(phone)){
			return "0";
		}else{
			return "1";
		}			
	}
	
		//网络下单
	function addNetOrder(){
	 var name = encodeURI($j('#xm').val()); 
	 var tel = $j('#dh').val(); 
	 var serviceType = encodeURI($j('#lx').val());
	 var time = $j('#sj').val(); 
	 var content =encodeURI( $j('#ms').val());
	 var address = encodeURI( $j('#dz').val());
	 
	 if(name==''){
	  alert('请输入用户名！')
	  return;
	 }
	 if(tel==''){
	  alert('请输入电话！')
	  return;
	 }else{
	    if(phoneValidate(tel)=='0'){  
	        alert("请输入正确的固话或手机号码");  
	       return false;  
		}  
	 }
	 if(serviceType==''){
	  alert('请选择服务项目！')
	  return;
	 }
	 if(address==''){
	  alert('请完善服务地址！')
	  return;
	 }
	 
		$j.ajax(
			{
			url:Bonc.toFullPath("/homepage/HomePage!addNetOrder.action"),
			data:{
			 "map.name":name,
			 "map.tel":tel,
			 "map.serviceType":serviceType,
			 "map.time":time,
			 "map.address":address,
			 "map.content":content
			},
			success:function(data){ 
				if(data=='true'){
				 alert('下单成功！');
				}else{
				 alert('下单失败！');
				}
			}
			}
		); 
	}
	

	function addPreOrder(){
	 var name = encodeURI($j('#pre_xm').val()); 
	 var tel = $j('#pre_dh').val(); 

	 if(name==''){
	  alert('请输入用户名！')
	  return;
	 }
	 if(tel==''){
	  alert('请输入电话！');
	  return;
	 }else{
	     if(phoneValidate(tel)=='0'){  
	        alert("请输入正确的固话或手机号码");  
	       return false;  
		}  
	 
	 
	 }
	 
		$j.ajax(
			{
			url:Bonc.toFullPath("/homepage/HomePage!addPreOrder.action"),
			data:{
			 "map.name":name,
			 "map.tel":tel
			},
			success:function(data){ 
				if(data=='true'){
				 alert('下单成功，稍后会有客户人员与您联系！');
				}else{
				 alert('下单失败！');
				}
			}
			}
		); 
	}
</script>
  <body onload="init()">

<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"0","bdPos":"left","bdTop":"180"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
 <div id="headPage">
  </div>
<div id="centbox">
    <div class="man">
          <div class="man_left">
                <DIV id=con>
<UL id=tags>
  <LI class=selectTag><A onClick="selectTag('tagContent0',this)"  href="javascript:void(0);">免费呼叫下单</A> </LI>
  <LI ><A onClick="selectTag('tagContent1',this)"   href="javascript:void(0);">网络下单</A> </LI>
  </UL>
<DIV id=tagContent>
<DIV class="tagContent selectTag" id=tagContent0>

         <table width="323" border="0" style="margin-top:10px;" cellspacing="0" cellpadding="0">
              <tr>
                <td width="97" height="47" align="right">电话：</td>
                <td width="181" align="left"><span class="k">
                  <input name="input" id="pre_dh" type="text" class="shuru" />
                </span></td>
              </tr>
              <tr>
                <td height="41" align="right">姓名：</td>
                <td align="left"><span class="k">
                  <input name="input2" id="pre_xm" type="text" class="shuru" />
                </span></td>
              </tr>
              <tr>
                <td align="right">&nbsp;</td>
                <td height="50" colspan="2" align="center"><a href="javascript:void(0)" onclick="addPreOrder();"><img src="resources/images/hj.jpg" /></a></td>
              </tr>
              <tr>
                <td height="38" colspan="3" align="center"><span style="text-align:center; line-height:28px;"><a href="pages/register/Register_family.jsp">家庭用户注册</a> | <a href="pages/register/Register_company.jsp">企业用户注册</a> | <a href="pages/register/Register_volunteer.jsp">义工注册</a></span></td>
              </tr>
            </table>

</DIV>
<DIV class="tagContent" id=tagContent1>

  <table width="333" border="0" style="margin-top:10px;" cellspacing="0" cellpadding="0">
  <tr>
    <td width="100px" align="right">姓名：</td>
    <td width="80" height="35" align="left"><span class="k">
      <input name="input3" id="xm" type="text" class="shuru"  style="width:100px;"/>
    </span></td>
    <td width="85" align="center">电话：</td>
    <td width="80" align="left"><span class="k">
      <input name="input9" id="dh" type="text" class="shuru"  style="width:100px;"/>
    </span></td>
  </tr>
  <tr>
    <td width="90" align="right">服务类型：</td>
    <td height="34" align="left">
    <s:select list="serviceList" id="lx" name="serviceId" listKey="CODE_NAME" cssStyle="height:20px" listValue="CODE_NAME" ></s:select>
    </td>
    <td align="left">服务时间</td>
    <td align="left">
    <b:datetimepicker id="sj" cssStyle="width:70px"></b:datetimepicker>
    </td>
  </tr>
  <tr>
    <td width="90" align="right">服务地址：</td>
    <td colspan="3" height="34" align="left">
    <input name="input9" id="dz" type="text" class="shuru"  style="width:240px;"/>
    </td>
  </tr>
 <tr>
  <td colspan="4" ></td>
 </tr>
  <tr>
    <td align="right">需求描述：</td>
    <td height="41" colspan="4" align="left"><textarea name="textarea" id="ms" cols="30" rows="9" style="width:240px; height:60px; background:#f7f7f7; border:#c9c9c9 1px solid;"></textarea></td>
  </tr>
  <tr>
    <td align="right">&nbsp;</td>
    <td height="50" colspan="3" align="left"><a href="javascript:void(0)" onclick="addNetOrder();"><img src="resources/images/x12.jpg" width="120" height="38" /></a></td>
  </tr>
</table>
        
</DIV>
</DIV></DIV> 
                
          </div>
   <div class="jiaodian">
    <script>
     var box =new PPTBox();
     box.width = 630; //宽度
     box.height = 280;//高度
     box.autoplayer = 3;//自动播放间隔时间
	<s:iterator value="list">
		<s:if test='PICTURES_SITE=="index_news"'> 
			//首页新闻广告图片
			 box.add({"url":'<%=basePath%><s:property value="PICTURES_SRC"/>',"href":'<s:property value="PICTURES_LINK"/>',"title":'<s:property value="PICTURES_TITLE"/>'});
		</s:if> 
	</s:iterator>
     box.show();
</script>
    </div>
  </div>
</div>
<div id="banner1"></div>
<div id="p1">
			<div class="p1_left">
				<div class="aixinbt">
					<span class="axbt">爱心企业推荐</span><span class="axmore">
					<span class="hong"><a href="<%=basePath %>lovecompany/LoveCompany!loveCPApplay.action">申请爱心企业</a>
					</span>&nbsp;<span class="cheng"> <a href="<%=basePath %>lovecompany/LoveCompany!companyList.action">查看更多企业</a>
					</span>
					</span>
				</div>
				<div class="aixinlogo" id='love_logos'> 
				</div>
			</div>
			<div class="p1_right">
        <div class="fabu"><img src="resources/images/fabu.jpg" style="cursor:pointer" onclick="javascript:free_publish('<s:property value='#session.user'/>')"/></div>
        <div class="gonggao">
             <div class="ggtop">本站公告</div>
             <div class="ggxinxi" id="topoNotice">
             </div>
        </div>
    </div>
</div>
<div id="p2">
     <div class="p2_left">
       <div class="aixinbt"><span class="axbt">爱心募捐</span><span class="axmore"> <a href="#">点击查看爱心申请流程与规则</a> </span></div>
        <div class="p2_xinxi">
             <div class="juanzeng">
                   <div class="juanzeng_top"><span class="juanzeng_bt cheng">最新捐赠</span><span style="float:right; line-height:26px; padding-right:10px;"><a href="javascript:donation()">更多>></a></span></div>
                   <div class="juanzeng_tuwen">
	                         <ul>
			        	 		<s:iterator value="donation" status="don">
			                   		<s:if test='#don.index<5' >
					                    <li><img src='<%=basePath%><s:property value="IMAGE_URL" />'  onerror="this.onerror='';this.src='resources/images/no.jpg'"  /><p><a href="javascript:void(0)" onclick="donation_show('<s:property value="ID"/>','0');"><s:property value="TITLE"/></a></p></li>
			                   		</s:if>
			             		</s:iterator>
	                         </ul>
                   </div>
                   <div class="juanzeng_xinxi">
                          <ul>
		                     <s:iterator value="donation" status="don2">
		                   		<s:if test='#don2.index>4' >
		                   			<li><span class="w"><a href="javascript:void(0)" onclick="donation_show('<s:property value="ID"/>','0');">·<s:property value="TITLE" /></a></span><span class="d">乌鲁木齐市</span><span class="r"><s:property value="RELEASE_TIME" /></span></li>
		                   		</s:if>
		             		</s:iterator>
                         </ul>
                   </div>
             </div>
             <div class="qiuzeng">
                    <div class="qiuzengtop">诚心求赠</div>
                    <div class="qzxx">
                         <ul>
                         	<s:iterator value="forgifts" >
                             	<li>[<s:property value="RELEASE_TIME" />]<a href="javascript:void(0)" onclick="donation_show('<s:property value="ID"/>','1');"><s:property value="TITLE" /></a></li>
		             		</s:iterator>
                         </ul>
                    </div>
             </div>
        </div>
     </div>
     <div class="p2_right">
          <div class="ggtop">论坛热点推荐</div>
          <div class="bbsxinxi" id="bbsxinxi"> 
          </div>
     </div>
</div>
<div id="p3">
     <div class="p3_left">
                   <div class="aixinbt"><span class="fubt">服务企业分类</span><span class="axmore hong"> </span></div>
                   <div class="p3_fenlei">
                   <s:iterator value="largeTypeList" var="large">
                   	 <div class="fenlei" style="border-right:#e9e9e9 1px solid;">
                   		<h1><a href="servicecompany/ServiceCompany.action?selectServiceTypeId=<s:property value="SERVICE_TYPE_ID"/>"><s:property value="SERVICE_TYPE_NAME"/> <span class="10zi">>></span></a></h1>
                   		<p class="lan">
                   		    <s:iterator value="subTypeList">
                   		      <s:if test="SERVICE_TYPE_PARENT_ID==#large.SERVICE_TYPE_ID">
                   		       <span><a href="servicecompany/ServiceCompany.action?selectServiceTypeId=<s:property value="SERVICE_TYPE_ID"/>"><s:property value="SERVICE_TYPE_NAME"/></a> ┊</span>
                   		      </s:if>
                   		    </s:iterator>
                   		</p>
                   	 </div>		
                   </s:iterator>
                   
                   </div>
     </div>
     <div class="p3_right">
            <div class="axqytop" >
                           <div class="ggtop">爱心企业排行</div>
                          <div class="paihang" id="topoCompany">
                          </div>
            </div>
            <div class="sbnner" id='index_minor_one'></div>
            <div class="sbnner"  id='index_minor_two'></div> 
     </div>
</div>
<div id="p4">
     <div class="p4_left">
         <div class="aixinbt"><span class="fubt">最新供需动态</span><span class="axmore" style="text-align:right; padding-right:10px;"> <a href="javascript:services();">更多服务信息</a> </span>
         </div>
         <div class="p4_xinxi">
               <div class="gong">
                   <ul> 
                   <s:iterator value="provideList">
                   	<li><span>[<b:inputProperty value="RELEASE_TIME" fp="yyyy-MM-dd"/>]</span><a href="javascript:services_show('<s:property value="ID"/>','<s:property value="USER_TYPE"/>')"><s:property value="TITLE"/></a></li> 
                   </s:iterator> 
                   </ul>
               </div>
                
               <div class="qiu">
	               <ul> 
	                  <s:iterator value="demandList">
	                   <li><span>[<b:inputProperty value="RELEASE_TIME" fp="yyyy-MM-dd"/>]</span><a href="javascript:services_show('<s:property value="ID"/>','<s:property value="USER_TYPE"/>')"><s:property value="TITLE"/></a></li> 
	                  </s:iterator> 
	               </ul>
               </div>
         </div>
     </div>
     <div class="p4_right">
             <div class="ggtop">优秀企业推荐</div>
             <div class="tuijian">
                   <ul>
                   <s:iterator value="recCompanyList">
                   	<li><h1 class="lan"><a href="javascript:getCompanyInfo('<s:property value="COMPANY_ID"/>')"><s:property value="COMPANY_NAME"/></a></h1>
                   	<p title="<s:property value="RECOMMENDED_REASONS"/>">推荐原因：<s:if test="RECOMMENDED_REASONS.length()>12"><s:property value="RECOMMENDED_REASONS.substring(0,12)"/></s:if><s:else><s:property value="RECOMMENDED_REASONS"/></s:else></p> 
                   	</li>
                   </s:iterator>
                   </ul>
             </div>
     </div>
</div>
<div id="banner2"></div>
<div id="p5">
     <div class="p5news">
         <div class="p5news_top">
             <span class="p5bt">新闻中心</span><span class="p5more bai"> <a href="javascript:news_list('6','6')">更多>> </a> </span>
         </div>
         <div class="p5xinxi">
              <ul>
                       <s:iterator value="xwlist">
                       <li><span>[<b:inputProperty value="RECORD_DATE" fp="yyyy-MM-dd"/>]</span><a href="javascript:news_show('<s:property value="NEWS_ID"/>','6')"><s:property value="NEWS_TITLE"/></a></li> 
                        </s:iterator> 
            </ul>
         </div>
     </div>
<div class="p5news" style="margin-left:7px; display:inline;">
         <div class="p5news_top">
             <span class="p5bt">政务公开</span><span class="p5more bai"> <a href="javascript:news_list('3','6')">更多>> </a> </span>
         </div>
         <div class="p5xinxi">
              <ul>
                      <s:iterator value="zwlist">
                       <li><span>[<b:inputProperty value="RECORD_DATE" fp="yyyy-MM-dd"/>]</span><a href="javascript:news_show('<s:property value="NEWS_ID"/>','6')"><s:property value="NEWS_TITLE"/></a></li> 
                        </s:iterator> 
            </ul>
         </div>
     </div>
<div class="p4_right" style="margin-top:6px;">
             <div class="ggtop">常见问题解答</div>
             <div class="tuijian" id='questionList'> 
     		</div>
     </div>
</div>
<div id="footPage"></div>
 <script type="text/javascript">
	<s:iterator value="list">
		<s:if test='PICTURES_SITE=="index_major_one"'> 
			$j('#banner1').append("<a href='<s:property value="PICTURES_LINK"/>'   target='_blank'><img src='<%=basePath%><s:property value="PICTURES_SRC"/>'   width='996px'  height='100px'    /></a>");
		</s:if>
		<s:if test='PICTURES_SITE=="index_major_two"'>
			$j('#banner2').append("<a href='<s:property value="PICTURES_LINK"/>'   target='_blank'><img src='<%=basePath%><s:property value="PICTURES_SRC"/>'   width='996px'  height='100px'   /></a>");
		</s:if>
		<s:if test='PICTURES_SITE=="index_minor_one"'>
			$j('#index_minor_one').append("<a href='<s:property value="PICTURES_LINK"/>'   target='_blank'><img src='<%=basePath%><s:property value="PICTURES_SRC"/>'   width='210px'  height='86px'  /></a>");
		</s:if>
		<s:if test='PICTURES_SITE=="index_minor_two"'> 
			$j('#index_minor_two').append("<a href='<s:property value="PICTURES_LINK"/>'   target='_blank'><img src='<%=basePath%><s:property value="PICTURES_SRC"/>'    width='210px'  height='86px'   /></a>");
		</s:if>
	</s:iterator> 
</script>

  </body>
</html>
