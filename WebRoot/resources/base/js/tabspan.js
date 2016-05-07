
if(Object.isUndefined(Bonc))
  throw("tabspan.js requires including bonc main.js library");


/**
 使用js生成一个tab页，使用示例：
 var data=[{name:'测试页1',url:'/pages/tms/test1.jsp'},
           {name:'测试页2',url:'/pages/tms/test2.jsp'},
           {name:'测试页3',url:'/pages/tms/test3.jsp'}];
var options={'tabsData':data};
var container=$('testSpan');
new Bonc.TabSpan(options).render(container);
 data为tab页数据
 options为参数集，必选参数为tabsData，其他的为可选参数，以下是参数的默认值：
	tabSpanClass:'tabspan',	
	tabsClass:'tabspan-tabs',
	tabClass:'tabspan-tab',
	tabSelectedClass:'selected',
	tabTitleClass:'tabspan-tabTitle',
	tabBodysClass:'tabspan-tabBodys',
	tabBodyClass:'tabspan-tabBody',
	collapsedClass:'collapsed',
	tabsData:[],
	tabBodyParameters:{}
 container为tab页放置的容器或容器ID
 tabData属性：必选：name可选url、tabPageId、pageId、params、params['params.refresh']为true时页面将刷新
 
 自定义click函数时
 tabData的url属性不可以设置，如：{name:'操作','pageId':'index_05','tabPageId':'li_index_05'}
 然后在创建tabspan后向tab注册click事件，如：
 Event.observe($('li_index_05'),'click',markView.goView.bindAsEventListener(markView));
 或
 Event.observe($('li_index_05'),'click',goView2);
 注意在手动调用tab的click时，需要每次都把tabData属性params['params.refresh']设置为true，否则页面会保持样
 isRefresh:false 不刷新某个页面 true 刷新页面
 index:指定第一次执行第几个tab页面
 */
Bonc.TabSpan=Class.create();
Bonc.TabSpan.prototype={
	initialize:function(){
		var options={
			tabSpanClass:'tabspan',	
			tabsClass:'tabspan-tabs',
			tabClass:'tabspan-tab',
			tabClass2:'tabspan-tab2',
			tabClass3:'tabspan-tab3',
			tabSelectedClass:'selected',
			tabSelectedClass2:'selected2',
			tabSelectedClass3:'selected3',
			tabTitleClass:'tabspan-tabTitle',
			tabBodysClass:'tabspan-tabBodys',
			tabBodyClass:'tabspan-tabBody',
			collapsedClass:'collapsed',
			isExt:false,
			isRefresh:false,
			tabsData:[],
			tabBodyParameters:{},//访问tab页内容需要带上的参数
			index:0//
		};
		Object.extend(options,arguments[0] || { });
		this.options=options;
	},
	render:function(container){
		this.container=$(container);
		var tabSpan=new Element('div',{'class':this.options.tabSpanClass});
		var tabs=new Element('ul',{'class':this.options.tabsClass});
		tabSpan.appendChild(tabs);
		var tabBodys=new Element('div',{'class':this.options.tabBodysClass});
		tabSpan.appendChild(tabBodys);
		this.container.appendChild(tabSpan);
		//this.container.appendChild(tabBodys);
		var instance=this;
		this.options.tabsData.each(function(tabData,index){
			if(!tabData.pageId)
			tabData.pageId=Bonc.createElementId();
			instance.createTab(tabs,tabData);
		});
		Bonc.fireEvent(tabs.down('li',instance.options.index),'click');
	},
	createTab:function(tabs,tabData){
		var tab;
		if(tabData.name.length<=4){
				tab=new Element('li',{'class':this.options.tabClass,'id':tabData.tabPageId||"li_"+tabData.pageId});
			}
		else if(tabData.name.length>4&&tabData.name.length<=6){
				tab=new Element('li',{'class':this.options.tabClass2,'id':tabData.tabPageId||"li_"+tabData.pageId});
			}
		else{
				tab=new Element('li',{'class':this.options.tabClass3,'id':tabData.tabPageId||"li_"+tabData.pageId});
			}
		//var tab=new Element('li',{'class':this.options.tabClass,'id':tabData.tabPageId||"li_"+tabData.pageId});
		var span=new Element('span',{'class':this.options.tabTitleClass});
		span.update(tabData.name);
		tab.appendChild(span);
		tabs.appendChild(tab);
		var tabBodys=this.container.down('div.'+this.options.tabBodysClass);
		var tabBody=new Element('div',{'id':tabData.pageId,'class':this.options.tabBodyClass});
		tabBodys.appendChild(tabBody);
		var instance=this;
		Event.observe(tab,'click',function(event){
			//隐藏提示条
			if($('ajax-indicator')){
				 Element.hide('ajax-indicator');
			}
			tabs.select('li.'+instance.options.tabClass).each(function(span2){
				if(span2.hasClassName(instance.options.tabSelectedClass)){
						span2.removeClassName(instance.options.tabSelectedClass);
				}
			});
			tabs.select('li.'+instance.options.tabClass2).each(function(span2){
				if(span2.hasClassName(instance.options.tabSelectedClass2)){
					    span2.removeClassName(instance.options.tabSelectedClass2);
				}
			});
			tabs.select('li.'+instance.options.tabClass3).each(function(span2){
				if(span2.hasClassName(instance.options.tabSelectedClass3)){
					    span2.removeClassName(instance.options.tabSelectedClass3);
				}
			});
			if(tabData.name.length<=4){
				tab.addClassName(instance.options.tabSelectedClass);
			}else if(tabData.name.length>4&&tabData.name.length<=6){
				tab.addClassName(instance.options.tabSelectedClass2);
			}else{
				tab.addClassName(instance.options.tabSelectedClass3);
			}
			
			$A(tabBodys.childNodes).each(function(tempTabBody){
				if(tempTabBody==tabBody){
					if(tempTabBody.hasClassName(instance.options.collapsedClass)){
						tempTabBody.removeClassName(instance.options.collapsedClass);
					}
				}else{
					tempTabBody.addClassName(instance.options.collapsedClass);
				}
			});
			if(tabData.url && tabData.url !=''
				&& (!tabBodys.down('#'+tabData.pageId).down()
						|| (tabData.params && tabData.params['params.refresh'])||tabData.isRefresh)){
				var params={};
				Object.extend(params,instance.options.tabBodyParameters);
				Object.extend(params,tabData.params||{});
				if(tabData.url.indexOf("bext/web/Ext.action")>=0){
					//var ih = ['<iframe onload="',
					//	"document.parentWindow.document.getElementById('theContent').height=document.body.scrollHeight",'"',
					//	' name="theContent" id="theContent" width="100%" height="500"  frameborder="0" scrolling="yes" src="',
					//	tabData.url,'"></iframe>'
					//	].join('');
					$(tabBody).innerHTML = '<iframe  name="theContent" id="theContent" width="100%" height="500"  frameborder="0" scrolling="yes" src="'+tabData.url+'"></iframe>';
					//$(tabBody).innerHTML = ih;
				}else{
				new Ajax.Updater(tabBody,Bonc.toFullPath(tabData.url),{
					parameters:params,
					evalScripts:true,
					method:'post'
				});
				}
				if(!tabData.isRefresh){
				  if(tabData.params){tabData.params['params.refresh']=false;}	
				}
			}
		});
	}
};