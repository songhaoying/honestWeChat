/**
 * 用于集团客户的组织结构显示
 */
 if(Object.isUndefined(Bonc))
  throw("custdepttree.js requires including bonc main.js library");


var CustDeptTree=Class.create();
CustDeptTree.prototype={
	config:null,
	parameters:null,
	deptInfo:null,
	initialize : function(config){
		this.config = config||{};
		this.config.department = $(config.department);
		this.config.deptName = $(config.deptName);
		this.config.flagVisible=false;//部门树交替显示隐藏
		this.config.deptName.style.cursor='pointer';
		this.config.container=null;
		var instance = this;
		Event.observe(this.config.deptName,'click',function(event){
			if(instance.parameters!=instance.config.parameters){
				instance.parameters=instance.config.parameters;
				new Ajax.Request(Bonc.toFullPath('/gcrm/util/CustDeptTree'),{
					asynchronous : false,
					parameters : instance.parameters||{},
					onSuccess : function(transport){
						instance.deptInfo=transport.responseJSON[0];
					}
				});
				if(instance.tree){
					instance.tree.destroy();
				}
				instance.render();
			}else{			
				if(instance.config.flagVisible){
					instance.config.flagVisible=false;
				}else{						
					instance.config.flagVisible=true;
				}				
				if(instance.config.flagVisible){				
					instance.config.container.show();
				}else{			
					instance.config.container.hide();
				}	
			}			 
						
		});
	},	
	//获得坐标位置 
	getXY:function(element,container){
	var elOffset=element.positionedOffset();
			var left=elOffset.left;
			var over=left+container.width-(document.body.scrollWidth-document.viewport.getScrollOffsets().left);
			if(over>0)left-=over;
			
			var top=elOffset.top+element.getHeight();
			var all_height;
			var top_height;
			var con_height;
			if(Prototype.Browser.IE){
			all_height=document.documentElement.scrollHeight;
			top_height=document.viewport.getScrollOffsets().top;
			con_height=container.height;
			}
			else{
			all_height=document.body.scrollHeight;
			con_height=container.height;			
			}			
			var th=document.documentElement.clientHeight;
			if((top-con_height)>0){
				if(all_height/2<top){
					top=top-con_height;
				}
			}
			left=left+'px';
			top=top+'px';
		    return {"x": left, "y": top};
	},
	render : function(){
		var clearButtonId=Bonc.createElementId();
		var colseButtonId=Bonc.createElementId();
		var title=['<div><span style="font-size:12px;">选择部门</span>',
			       	'<img style="width:110px;height:5px;" src="'+Ext.BLANK_IMAGE_URL+'"/>',
			       	'<a href="javascript:void(0);" id="'+clearButtonId+'">清空</a>&nbsp;&nbsp;&nbsp;&nbsp;',
			       	'<a href="javascript:void(0);" id="'+colseButtonId+'">关闭</a></div>'].join('');
		var instance = this;
	    this.tree = new  Ext.tree.TreePanel({
	       title: title,
	       width:330,
	       height:300,
	       autoScroll:true,   
	       containerScroll: true,
	       loader:new Ext.tree.TreeLoader({
	           dataUrl:Bonc.toFullPath('/gcrm/util/CustDeptTree!getChildren')
	         }), 
	       rootVisible:(instance.deptInfo.deptName != null && instance.deptInfo.deptName != '' && instance.deptInfo.deptName != 'undefined')
	    });
	    //创建一个根节点   
	    this.root = new Ext.tree.AsyncTreeNode({
		    	id: instance.deptInfo.department,
		    	text: instance.deptInfo.deptName
	    });
	    //为tree设置根节点   
	    this.tree.setRootNode(this.root);

		this.tree.on("click",function(node,eventObject){
			instance.config.department.value=node.attributes.id;
			instance.config.deptName.value=node.attributes.text;
		       if(instance.config.deptName&&instance.config.deptName.onchange){
		        Bonc.fireEvent(instance.config.deptName,'change');
		       } 
			
			instance.config.flagVisible=false;
			instance.config.container.hide();
			return true;
		});
		
		instance.config.container=new Ext.Window({				
			renderTo:Ext.getBody(),
			closable:false,			
			width:330,//和树宽相同，防止过宽
			showshaw:false,//去掉背景的阴影
			frame:false,//去掉外框边角         
		    height:300,layout:'table',items:[this.tree]});
		    
		    //为了那些在页面底部使用树的人，做的处理。这样处理后树可以正常的在底部显示在上面了
			var container=instance.config.container;
			container.x=instance.getXY(instance.config.deptName,container).x;
			container.y=instance.getXY(instance.config.deptName,container).y;
			
			if(instance.config.flagVisible){				
				instance.config.flagVisible=false;
			}else{				
				instance.config.flagVisible=true;
			}
			
			if(instance.config.flagVisible){				
				instance.config.container.show();
			}else{			
				instance.config.container.hide();
			}
		
                                           
	    this.clearButton=$(clearButtonId);
	    this.colseButton=$(colseButtonId);
	    
		Event.observe(this.clearButton,"click",function(event){
			try{
			instance.config.department.value='';                        
			instance.config.deptName.value='';
			instance.config.flagVisible=false;
			instance.config.container.hide();
			}catch(e){
			}
		});
		Event.observe(this.colseButton,"click",function(event){
			try{
			instance.config.flagVisible=false;
			instance.config.container.hide();
			 }catch(e){
			
			}
		});
	   
	    this.root.expand(false,false,function(n){
	        if(n.firstChild)
	        	n.firstChild.expand();
	    });
	}
};
