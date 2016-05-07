/**
 *    业务区域树   规则划分使用   2009-06-24
 * */

if(Object.isUndefined(BoncBase))
  throw("boncxframe.js requires including boncbase.js library");
//requires Bonc

if(!BoncXframe.Component)
	BoncXframe.Component={};
BoncXframe.Component.BusiAreaTree=Class.create();
BoncXframe.Component.BusiAreaTree.prototype={
	config:null,parameters:null,deptInfo:null,
	initialize : function(config){
		this.config = config||{};
		this.config.busiarea = $(config.busiarea);
		this.config.busiareaName = $(config.busiareaName);
		//this.config.busiareaName.readOnly='readOnly';
		this.config.busiareaName.style.cursor='pointer';
		var containerId=config.container;
		this.config.container=$(config.container);
		if(!this.config.container){
			if(typeof containerId !='string')
				containerId=Bonc.createElementId();
			this.config.container = new Element('div',{'id':containerId});
			document.body.appendChild(this.config.container);
			this.config.container.hide();
		}
		this.config.container.setStyle({
			position : 'absolute',
			left : (this.config.busiareaName.viewportOffset().left)+'px',
			top : (this.config.busiareaName.viewportOffset().top+this.config.busiareaName.getHeight()+2)+'px'
		});
			
		var instance = this;
		Event.observe(this.config.busiareaName,'click',function(event){
			if(instance.parameters!=instance.config.parameters){
				instance.parameters=instance.config.parameters;
				new Ajax.Request(Bonc.toFullPath('/tms/saleexecute/sort/BusiAreaTree'),{
					asynchronous : false,
					parameters : instance.parameters||{},
					onSuccess : function(transport){
						instance.deptInfo=transport.responseJSON[0];
					}
				});
				if(instance.tree){
					instance.tree.destroy();
				}
				//instance.config.container.update('');
				instance.render();
			}
			instance.config.container.show();
		});
	},
	render : function(){
		var el = new Element('div');
		this.config.container.appendChild(el);
		var clearButtonId=Bonc.createElementId();
		var colseButtonId=Bonc.createElementId();
		var title=['<div><span style="font-size:12px;">选择业务区域</span>',
			       	'<img style="width:50px;height:5px;" src="'+Ext.BLANK_IMAGE_URL+'"/>',
			       	'<a href="javascript:void(0);" id="'+clearButtonId+'">清空</a>&nbsp;&nbsp;&nbsp;&nbsp;',
			       	'<a href="javascript:void(0);" id="'+colseButtonId+'">关闭</a></div>'].join('');
		var instance = this;
	    this.tree = new  Ext.tree.TreePanel({
	       el : el,
	       title: title,
	       autoScroll:true,   
	       containerScroll: true,
	       width:'250px',
	       loader:new Ext.tree.TreeLoader({
	           dataUrl:Bonc.toFullPath('/tms/saleexecute/sort/BusiAreaTree!getChildren'),
	          
	           baseParams :{regionNo:instance.deptInfo.regionNo}
	         }), 
	       autoHeight:true,
	       rootVisible:(instance.deptInfo.busiareaName != null && instance.deptInfo.busiareaName != '' && instance.deptInfo.busiareaName != 'undefined')
	    });
	    //创建一个根节点   
	    this.root = new Ext.tree.AsyncTreeNode({
		    	id: instance.deptInfo.busiarea,
		    	text: instance.deptInfo.busiareaName
	    });
	    //为tree设置根节点   
	    this.tree.setRootNode(this.root);

		this.tree.on("click",function(node,eventObject){
			instance.config.busiarea.value=node.attributes.id;
			instance.config.busiareaName.value=node.attributes.text;
			instance.config.container.hide();
			return true;
		});

	    //渲染  
	    this.tree.render();

	    this.clearButton=$(clearButtonId);
	    this.colseButton=$(colseButtonId);
	    
		Event.observe(this.clearButton,"click",function(event){
			instance.config.busiarea.value='';
			instance.config.busiareaName.value='';
			instance.config.container.hide();
		});
		Event.observe(this.colseButton,"click",function(event){
			instance.config.container.hide();
		});
	    
	    this.root.expand(false,false,function(n){
	        if(n.firstChild)
	        	n.firstChild.expand();
	    });
	}
};

Object.extend(Bonc,new BoncXframe());
if(!Bonc.Component)
	Bonc.Component={};
Object.extend(Bonc.Component, {
	BusiAreaTree : BoncXframe.Component.BusiAreaTree
});