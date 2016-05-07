if(Object.isUndefined(Bonc))
  throw("unifyview.js requires including bonc main.js library");

var UnifyView=Class.create({
	initialize: function(element,data) {
		this.view=$(element);//视图元素
		this.nodesData = data||[];//视图中的节点数据，为数组类型
		var options={
			viewClass:'unify',//视图样式
			layoutTopClass:'layout-top',//视图布局的顶部的样式
			layoutLeftClass:'layout-left',//视图布局的中部左边的样式
			layoutRightClass:'layout-right',//视图布局的中部右边的样式
			layoutBottomClass:'layout-bottom',//视图布局的底部的样式
			nodeContainerClass:'node-container',//视图节点容器的样式
			nodeCollapsedClass:'node-container-collapsed',//视图节点收缩的样式
			nodeTitleClass:'node-title',//视图节点的标题栏样式
			nodeTitleImgClass:'node-title-img',//视图节点的标题栏上的图片的样式
			nodeButtonClass:'node-button',//视图button的样式
			nodeLinkClass:'node-link',//视图链接的样式
			nodeBodyClass:'node-body',//视图节点内容的样式
			blankImgUrl:'',//空白图片url
			layoutTag:'div',//视图布局的tagName
			queryParams:{}//传递给视图节点的参数对象
		};
		Object.extend(options,arguments[2] || { });//第三个参数为附加选项
		this.options=options;
		/*layout 元素*/
		var top=this.view.down(this.options.layoutTag+'.'+this.options.layoutTopClass);
		var left=this.view.down(this.options.layoutTag+'.'+this.options.layoutLeftClass);
		var right=this.view.down(this.options.layoutTag+'.'+this.options.layoutRightClass);
		var bottom=this.view.down(this.options.layoutTag+'.'+this.options.layoutBottomClass);
		this.layouts=new Hash({0:top,1:left,2:right,3:bottom});
	},
	//创建所有的节点
	createNodes:function(){
		var instance=this;
		this.nodesData.each(function(nodeData,ind){
			instance.createNode(nodeData,ind);
		});
	},
	//创建单个节点
	createNode:function(nodeData,ind){
		var instance=this;
		//var nodeContainer = new Element('div',{'class':this.options.nodeContainerClass,'attr':Object.toJSON(nodeData)});
		var nodeContainer = new Element('div',{'class':this.options.nodeContainerClass});
		var layout = this.layouts.get(nodeData.POSITION);
		layout.appendChild(nodeContainer);
		//加载title
		var nodeTitle;
		if(nodeData.TITLE_URL && nodeData.TITLE_URL != null){
			var img;
			//当为查看视图时，标题栏添加附加样式和按钮
			if(this.options.queryParams["params.taskType"]!=''){
			    nodeTitle= new Element('div',{'class':this.options.nodeTitleClass+ind});
				//nodeTitle= new Element('div',{'class':this.options.nodeTitleClass+' '+this.options.nodeTitleClass+ind});
				img = new Element('img',{'class':this.options.nodeTitleImgClass,'src':this.options.blankImgUrl});				
			}else{
				nodeTitle= new Element('div');
			}
			var tmptable= new Element('table',{'cellSpacing':0,'cellPadding':0,'width':'100%'});
			var tmptbody= new Element('tbody');
			var tmptr=new Element('tr');
			var tmptd=new Element('td',{'width':'100%'});
			var tmptd2=new Element('td');
			nodeContainer.appendChild(nodeTitle);
			nodeTitle.appendChild(tmptable);
			tmptable.appendChild(tmptbody);
			tmptbody.appendChild(tmptr);
			tmptr.appendChild(tmptd);
			tmptr.appendChild(tmptd2);
			if(img){
				tmptd2.appendChild(img);
			}
			new Ajax.Updater(tmptd,Bonc.toFullPath(nodeData.TITLE_URL),{
				asynchronous:false,
				evalScripts:true,
				parameters:this.options.queryParams,
				insertion: Insertion.Bottom
			});
			if(this.options.queryParams["params.taskType"]!=''){		    
				//注册收缩展开操作	
				nodeTitle.title='点击显示该显示框';			
				nodeTitle.observe('click',function(event){
					if(nodeContainer.hasClassName(instance.options.nodeCollapsedClass)){
						nodeContainer.removeClassName(instance.options.nodeCollapsedClass);
						if(!nodeContainer.down('.'+instance.options.nodeBodyClass)){
							instance.createNodeBody(nodeContainer,nodeData);						
						}
						nodeTitle.title='点击收缩该显示框';
					}else {
						nodeContainer.addClassName(instance.options.nodeCollapsedClass);
						nodeTitle.title='点击展开该显示框';
					}
				});									
			}
		}
		if(nodeTitle && nodeData.COLLAPSED==0 && this.options.queryParams["params.taskType"]!=''){
			nodeContainer.addClassName(this.options.nodeCollapsedClass);
		}else{
			instance.createNodeBody(nodeContainer,nodeData);
		}
	},
	createNodeBody: function(nodeContainer,nodeData){
		//加载内容
		var nodeBody= new Element('div',{'class':this.options.nodeBodyClass});
		nodeContainer.appendChild(nodeBody);
		new Ajax.Updater(nodeBody,Bonc.toFullPath(nodeData.CONTENT_URL),{
			asynchronous:true,
			evalScripts:true,
			parameters:this.options.queryParams,
			insertion: Insertion.Bottom
		});
	}
});


//填充视图
var unifyViewFill=function(custInfoId,containerId,queryParams){
	$(custInfoId).select('.accessViewAlink').each(function(eldiv){
		var container=$(containerId);
		var elalink=eldiv.down('a');
		var elimg=eldiv.down('img');	
		Event.observe(eldiv,'click',function(event){
			var element=Event.element(event);
			//这里ie有个问题，没有prototype的方法，所以执行Element.extend()；
			element=Element.extend(element);
			if(!element.hasClassName('accessViewAlink'))
				element=element.up('.accessViewAlink');
			$(custInfoId).select('.accessViewAlink img.arrow-right').each(function(el,ind){				
				el.removeClassName('arrow-right');		
			});
			$(custInfoId).select('.accessViewAlink a.node-link').each(function(el,ind){			    
				el.removeClassName('node-link');																							
			});
					
			var servInfo=$(element.getAttribute('pageId'));
			if(!servInfo){
				servInfo = new Element('div',{'id':element.getAttribute('pageId'),'class':'unify-info-line5 node-body collapsed'});
				var params=Object.clone(queryParams);
				Object.extend(params,element.getAttribute('params').evalJSON());		
				new Ajax.Updater(servInfo,Bonc.toFullPath('/tms/custcatalog/unify/viewer/Controller!fillView'),{
					asynchronous:true,
					evalScripts:true,
					parameters:params,
					insertion: Insertion.Bottom
				});
				container.appendChild(servInfo);
			}
			$A(container.childNodes).each(function(e) {
				if(e==servInfo){
					if(e.hasClassName('collapsed')){
						e.removeClassName('collapsed');
						elimg.addClassName('arrow-right');
						elalink.addClassName('node-link');
					}else{//客户视图
						if(queryParams["params.taskType"]=='01'){
					     e.addClassName('collapsed');
					     if(e!=container.childNodes[0]){
						    container.childNodes[0].removeClassName('collapsed');
						    $(custInfoId).select('.accessViewAlink')[0].down('img').addClassName('arrow-right');
						    $(custInfoId).select('.accessViewAlink')[0].down('a').addClassName('node-link');
					       }
	                    }else{//客户接触
                         e.addClassName('collapsed');	
				         }				
					 }
				}else{
					e.addClassName('collapsed');
				}
			});
	    });		
	});
	//默认click事件
	if(queryParams["params.taskType"]=='01'){
		if($$('.accessViewAlink')!=null){
		Bonc.fireEvent($$('.accessViewAlink')[0],'click');
	    }	   
	}else if(queryParams["params.taskType"]=='03'){
		if($$('.accessViewAlink')!=null){
		Bonc.fireEvent($$('.accessViewAlink')[0],'click');
	    }	   
	}
};
