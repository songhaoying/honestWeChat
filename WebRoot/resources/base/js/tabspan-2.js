
if(Object.isUndefined(Bonc))
  throw("tabspan.js requires including bonc main.js library");
Bonc.TabSpan2=Class.create();
Bonc.TabSpan2.prototype={
	initialize:function(){
		var options={
			tabSpanClass:'tabspan_t',
			tabsClass:'tabspan-tabs_t',
			tabsClass2:'tabspan-tabs_t2',
			tabClass:'tabspan-tab_t',
			tabClass2:'tabspan-tab2_t',
			tabClass3:'tabspan-tab3_t',
			tabSelectedClass:'selected_t',
			tabSelectedClass2:'selected2_t',
			tabSelectedClass3:'selected3_t',
			tabTitleClass:'tabspan-tabTitle_t',
			tabTitleClass2:'tabspan-tabTitle_t2',
			tabTitleClass3:'tabspan-tabTitle_t3',
			tabTitleClass4:'tabspan-tabTitle_t4',
			tabBodysClass:'tabspan-tabBodys_t',
			tabBodyClass:'tabspan-tabBody_t',
			collapsedClass:'collapsed_t',
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
		var tabtu=new Element('ul',{'class':this.options.tabsClass2});
		var tabBodystu =new Element('div',{'style':'width:100%;'});
		tabBodystu.update("&nbsp;");
		tabtu.appendChild(tabBodystu);
		tabSpan.appendChild(tabtu);
		var tabBodys=new Element('div',{'class':this.options.tabBodysClass});
		tabSpan.appendChild(tabBodys);
		this.container.appendChild(tabSpan);
		//this.container.appendChild(tabBodys);
		var instance=this;
		var indexd=0;
		this.options.tabsData.each(function(tabData,index){
			if(!tabData.pageId)
			tabData.pageId=Bonc.createElementId();
			instance.createTab(tabs,tabData);
			indexd=index;
		});
		Bonc.fireEvent(tabs.down('li',instance.options.index),'click');
	},
	createTab:function(tabs,tabData){
		var tab;
		if(tabData.name.length<=8){
				tab=new Element('li',{'class':this.options.tabClass,'id':tabData.tabPageId||"li_"+tabData.pageId});
			}
		else if(tabData.name.length>8&&tabData.name.length<=10){
				tab=new Element('li',{'class':this.options.tabClass2,'id':tabData.tabPageId||"li_"+tabData.pageId});
			}
		else{
				tab=new Element('li',{'class':this.options.tabClass3,'id':tabData.tabPageId||"li_"+tabData.pageId});
			}
		//var tab=new Element('li',{'class':this.options.tabClass,'id':tabData.tabPageId||"li_"+tabData.pageId});
		var span=new Element('span',{'class':this.options.tabTitleClass});
		var divdd=new Element('div',{});
		span.appendChild(divdd);
		var divdd2=new Element('div',{'class':this.options.tabTitleClass4});
		
		divdd2.update(tabData.name);
		span.appendChild(divdd2);
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
						span2.select('div.'+instance.options.tabTitleClass2).each(function(ss){
							ss.removeClassName(instance.options.tabTitleClass2);
						});
						span2.select('div.'+instance.options.tabTitleClass3).each(function(ss2){
							ss2.removeClassName(instance.options.tabTitleClass3);
							ss2.addClassName(instance.options.tabTitleClass4);
						});
				}
			});
			tabs.select('li.'+instance.options.tabClass2).each(function(span2){
				if(span2.hasClassName(instance.options.tabSelectedClass2)){
					    span2.removeClassName(instance.options.tabSelectedClass2);
					    span2.select('div.'+instance.options.tabTitleClass2).each(function(ss){
							ss.removeClassName(instance.options.tabTitleClass2);
						});
						span2.select('div.'+instance.options.tabTitleClass3).each(function(ss2){
							ss2.removeClassName(instance.options.tabTitleClass3);
							ss2.addClassName(instance.options.tabTitleClass4);
						});
				}
			});
			tabs.select('li.'+instance.options.tabClass3).each(function(span2){
				if(span2.hasClassName(instance.options.tabSelectedClass3)){
					    span2.removeClassName(instance.options.tabSelectedClass3);
					    span2.select('div.'+instance.options.tabTitleClass2).each(function(ss){
							ss.removeClassName(instance.options.tabTitleClass2);
						});
						span2.select('div.'+instance.options.tabTitleClass3).each(function(ss2){
							ss2.removeClassName(instance.options.tabTitleClass3);
							ss2.addClassName(instance.options.tabTitleClass4);
						});
				}
			});
			if(tabData.name.length<=8){
				tab.addClassName(instance.options.tabSelectedClass);
				divdd.addClassName(instance.options.tabTitleClass2);
				divdd2.addClassName(instance.options.tabTitleClass3);
			}else if(tabData.name.length>8&&tabData.name.length<=10){
				tab.addClassName(instance.options.tabSelectedClass2);
				divdd.addClassName(instance.options.tabTitleClass2);
				divdd2.addClassName(instance.options.tabTitleClass3);
			}else{
				tab.addClassName(instance.options.tabSelectedClass3);
				divdd.addClassName(instance.options.tabTitleClass2);
				divdd2.addClassName(instance.options.tabTitleClass3);
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