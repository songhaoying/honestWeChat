/**
 * 树形控制类
 *@authod liling
 */
 if(Object.isUndefined(Bonc))
  throw("tabspan.js requires including bonc main.js library");

 
var Tree=new function()
{   
    this._churl=null;//获取孩子路径
    this._rurl=null;//获取根节点路径
    this._inputObj=null;//获取input对象
    this._valueObj=null;//存放部门ID的页面HIDDEN对象
    //定义图标显示用数组
	this.icon=new Array();
	this.icon["member"]=Bonc.getContextPath()+'/resources/tms/img/child.gif';
	this.icon["open"]=Bonc.getContextPath()+'/resources/tms/img/opened.gif';
	this.icon["close"]=Bonc.getContextPath()+'/resources/tms/img/closed.gif';	
	this.icon["root"]=Bonc.getContextPath()+'/resources/tms/img/folder.gif';
	
    //加入样式
    document.write('<style type="text/css">');
    document.write('.treeImgRoot{margin-left:5px;margin-top:5px;cursor:pointer;vertical-align:text-bottom;margin-right:2px}');
    document.write('.treeSpanRoot{cursor:pointer;margin-top:5px;cursor:pointer;line-height:16px;height:16px}');
    document.write('.treeSpan{cursor:pointer;line-height:16px;height:16px;}');
    document.write('.treeClose{cursor:pointer;margin-top:5px;padding-left:38%}');
    document.write('.treeImg{cursor:pointer;vertical-align:text-bottom;margin-right:2px}');
    document.write('.treeCloseInp{cursor:pointer;HEIGHT:18px;border:1 solid #D0D0D0}');
    document.write('</style>');
    
    
//取得HTML控件绝对位置
this.getAbsPoint = function (e){
  var x = e.offsetLeft;
  var y = e.offsetTop;
  while(e = e.offsetParent){
    x += e.offsetLeft;
    y += e.offsetTop;
  };
  return {"x": x, "y": y};
};

//显示树 参数事件对象，部门iD,存文本的输入框对象，存部门值的hidden对象
this.showTree = function (param) {
    var event=param.event;
    var deptId=param.deptId;
    var descObj=param.descObj;
    var valueObj=param.valueObj;
    var panel = document.getElementById("TreePanel");
    var container = document.getElementById("ContainerTreePanel");
   
    if(!Object.isUndefined(valueObj)){
     this._valueObj=valueObj;
    }
    if(!Object.isUndefined(descObj)){
     this._inputObj=descObj;
    }
   Tree._churl=Bonc.toFullPath('/tms/saletask/organizational/marksheet/Tree!getChilds.action');
   Tree._rurl=Bonc.toFullPath('/tms/saletask/organizational/marksheet/Tree!getRoot.action');
     if(Object.isUndefined(deptId)){
       // alert("department is required");
       // throw("department is required");
       // return;
       deptId="1985-05-28";
      }
     
  Tree.getRoot(deptId,panel);
  //var xy = this.getAbsPoint(dataObj);
  panel.style.left = Event.pointerX(event)+ "px";
  //panel.style.top = (Event.pointerX(event) + dataObj.offsetHeight) + "px";
  panel.style.top = Event.pointerY(event) + "px";
  panel.style.display ="";
  container.style.display ="";
};
//关闭树
this.openTree=function (){
   var panel = document.getElementById("TreePanel");
   var container = document.getElementById("ContainerTreePanel");
   panel.style.display = "none";
   container.style.display = "none";
   //panel.innerHTML="";
}
//动态获取根节点
      this.getRootNode=function(id){
      var obj;
   	  new Ajax.Request(this._rurl,{
    	parameters:{'deptId':id},
   	 	asynchronous:false,
    	onSuccess: function(transport){
    	    obj=transport.responseJSON;
        }
       });
       return obj;
     };
     
    /**
	 * 添加根元素
	 * @param _parentId:指定节点的id ,contDiv  id='TreePanel'外层div
	 */ 
     this.addRoot=function(obj,TreePanel){
         _pContainer=document.createElement("div");
         _pContainer.id=obj[0].id;
         _pContainer.innerHTML+='<img class="treeImgRoot"  onclick="Tree.getChildren(this,\''+obj[0].id+'\',\'root\')" src="'+this.icon["root"]+'"/>';
		 _pContainer.innerHTML+='<span  class="treeSpanRoot" name="treeText" onclick="treeNodeChoosed(this,\''+obj[0].id+'\',\''+obj[0].ddesc+'\');">'+obj[0].ddesc+'</span>';	
		 _pContainer.innerHTML+='<span class="treeClose"><input type="button" value="关闭" class="treeCloseInp" onclick="Tree.openTree()"/></span>';	
		 TreePanel.appendChild(_pContainer);		  
     };
     
	/**
	 * 获取根节点
	 * @param _parentId:指定节点的id,contDiv  id='TreePanel'外层div
	 */ 
	this.getRoot=function(_parentId,TreePanel)
	{  
	    if (this.alreadyGetChileren(_parentId))
		{
		    var childContainer=document.getElementById(_parentId);
		    if (childContainer)
		    {   
		        //childContainer.style.display=(childContainer.style.display=="none")?"":"none";
		        var _parentNode=document.getElementById(_parentId);
		        if (_parentNode.firstChild && _parentNode.firstChild.tagName=="IMG")
		        {
		            _parentNode.firstChild.src=(childContainer.style.display=="none")?this.icon["root"]:this.icon["root"];
		        }
		    }
		    return;
		};
		    //为了联动清空上次结果
		    TreePanel.innerHTML=TreePanel.innerHTML==""?"":"";
            var obj=Tree.getRootNode(_parentId);
            if(obj.length==0){
               alert("对不起条件不足,无法生成树");
               return;
            }
            //添加根元素数据
		    Tree.addRoot(obj,TreePanel);   
		    var objcl=Tree.getNodes(_parentId);
		    if(objcl.length!=0){
		    //不定制部门处理
		      if(_parentId=="1985-05-28"){
		         _parentId=obj[0].id;
		      }
		      //添加子元素数据
		    Tree.addChildren(_parentId,objcl); 
		    }         
	};
     
	/**
	 * 获取指定节点的子节点
	 * @param currObj点击了图片触发当前事件标记,_parentId:指定节点的id,flag 是否为根节点
	 */ 
	this.getChildren=function(currObj,_parentId,flag)
	{   
	    if (this.alreadyGetChileren(_parentId))
		{
		    var childContainer=document.getElementById(_parentId+"_subContainer");
		    if (childContainer)
		    {   
		       if(currObj){
		       childContainer.style.display=(childContainer.style.display=="none")?"":"none";
		       }
		        var _parentNode=document.getElementById(_parentId);
		        if (_parentNode.firstChild && _parentNode.firstChild.tagName=="IMG")
		        {    
		            if(!Object.isUndefined(flag)&&flag=="root"){
		              _parentNode.firstChild.src=(childContainer.style.display=="none")?this.icon["root"]:this.icon["root"];
		              return;
		            }
		            _parentNode.firstChild.src=(childContainer.style.display=="none")?this.icon["close"]:this.icon["open"];
		        }
		    }
		    return;
		}
            var obj=Tree.getNodes(_parentId);
		    Tree.addChildren(_parentId,obj);           
	};
	
	//动态获取节点
     this.getNodes=function(id){
     var obj;
   	  new Ajax.Request(this._churl,{
    	parameters:{'deptId':id},
   	 	asynchronous:false,
    	onSuccess: function(transport){
    		obj=transport.responseJSON;
        }
       });
       return obj;
     };
    
	/**
	 * 根据获取的数据，设置指定节点的子节点
	 * @param _parentId:指定节点id
	 * @param _data:获取的数据
	 */
	this.addChildren=function(_parentId,_data)
	{   
	    if (this.alreadyGetChileren(_parentId))
	    {	     
	        return;
	    }
	    
	    var _parentNode=document.getElementById(_parentId);
	    if (_parentNode&&_parentNode.firstChild && _parentNode.firstChild.tagName=="IMG")
	    {
	        _parentNode.firstChild.src=this.icon["open"];
	    }	    	         
	    //子级容器，所有子级选项都放一个容器中
	    _nodeContainer=document.createElement("div");
		_nodeContainer.id=_parentId+"_subContainer";
		//子级容器放入父级容器
		_parentNode.appendChild(_nodeContainer);
		var _children=_data;
		var _child=null;
		var _point=this;
		for(var i=0; i<_children.length; i++)
		{
			_child=_children[i];				
			_node=document.createElement("div");
			if (i!=_children.length-1)
			{
			    _node.style.cssText="padding-bottom:5px";
			}			
			_node.innerHTML="";
			//_node.id=_child.getAttribute("id");	
			_node.id=_child.id;
			//若节点存在下级节点
			if (_child.leaf==0)
			{
			    _node.innerHTML+='<img class="treeImg" onclick="Tree.getChildren(this,\''+_child.id+'\')" src="'+this.icon["close"]+'"/>';
			    _node.innerHTML+='<span class="treeSpan" name="treeText" onclick="treeNodeChoosed(this,\''+_child.id+'\',\''+_child.ddesc+'\');">'+_child.ddesc+'</span>';			    
			}
			//否则节点不存在下级节点
			else if (_child.leaf==1)
			{
			    _node.innerHTML+='<img class="treeImg" onclick="try{treeNodeChoosed(this.nextSibling);}catch(e){alert(e.message);}" src="'+this.icon["member"]+'" style="margin-left:14px"/>';
			    _node.innerHTML+='<span class="treeSpan""  name="treeText" onclick="treeNodeChoosed(this,\''+_child.id+'\',\''+_child.ddesc+'\');">'+_child.ddesc+'</span>';			    
			}
			//节点加入子级容器
			_nodeContainer.appendChild(_node);						
		}
		_nodeContainer.style.cssText="border-left:0px solid #ccc;margin-left:7px;margin-top:5px;padding-left:10px";	    
	};
	
	/**
	 * 判断指定节点是否已经获取子节点
	 * @param _nodeId 指定节点id
	 * @return [boolean]true为已经获取，false为未获取
	 */
	this.alreadyGetChileren=function(_nodeId)
	{
	    var obj=document.getElementById(_nodeId+"_subContainer");
	    if (obj)
	    {	       
	        return true;               
	    }
	    return false;	    
	}	
};// the Tree end

/**
 * 点击菜单后的动作 参数是当前对象和部门ID,部门描述
 */
function treeNodeChoosed(_obj,id,desc)
{   
     
     //给输入框赋值,如果输入框有onchange事件就触发onchange事件
     if(!Object.isUndefined(Tree._inputObj)&&Tree._inputObj!=null){
      Tree._inputObj.value=desc;
      //触发onchange事件
      if(!Object.isUndefined(Tree._inputObj.onchange)&&!Object.isUndefined(Tree._valueObj)&&Tree._valueObj!=null){
         //隐藏域的部门id和本次部门id不同
          if(Tree._valueObj.value!=id){
          Tree._valueObj.value=id;
          Bonc.fireEvent(Tree._inputObj,'change');
          }
        };
      };
     
      //给hidden对象赋值
      if(!Object.isUndefined(Tree._valueObj)&&Tree._valueObj!=null){
      Tree._valueObj.value=id;
      };
      
    var choosedColor="lightblue";
    var unChoosedColor="white";
    
    if (_obj.style.backgroundColor==choosedColor)
    {
        _obj.style.backgroundColor=unChoosedColor;           
    }
    else
    {
        //var allNodeText=document.getElementsByName("treeText");
        var allNodeText=document.getElementsByTagName("SPAN");
        for (var i=0; i<allNodeText.length; i++)
        {
            allNodeText[i].style.backgroundColor=unChoosedColor;
        }
        _obj.style.backgroundColor=choosedColor;
    }    
    //点击并且关闭树
    Tree.openTree();
}
//当长度过长换行输出
  function breakLine(ddesc){
     if(ddesc&&ddesc.length>7){
       ddesc=ddesc.substring(0,7)+"<br/>"+ddesc.substring(7);
     } 
     return ddesc;
 }
 document.write('<div id="ContainerTreePanel" style="display:none">');
// document.write('<div id="TreePanel" style="position: absolute;display: none;z-index: 9999;background-color: #FFFFFF;border: 1px solid #CCCCCC;width:175px;font-size:12px;"></div>');
 document.write('<div id="TreePanel" style="position: absolute;display: none;z-index: 9999;background-color: #FFFFFF;border: 1px solid #CCCCCC;width:250px;height:330px;overflow-y: scroll;font-size:12px;"></div>');
   if(document.all)
   {
	   document.write('<iframe style="position:absolute;z-index:3000;width:expression(this.previousSibling.offsetWidth);');
	   document.write('height:expression(this.previousSibling.offsetHeight);');
	   document.write('left:expression(this.previousSibling.offsetLeft);top:expression(this.previousSibling.offsetTop);');
	   document.write('display:expression(this.previousSibling.style.display);" scrolling="no" frameborder="no"></iframe>');
   }
    document.write('</div>');