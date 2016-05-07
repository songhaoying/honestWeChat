Bonc.widget={toolbar:function(a,b){a=jQuery.extend({height:380,width:510,show:"clip",hide:"clip",buttons:null,resizable:true,modal:false,draggable:true},a,{dialogClass:"dialog-tool"});if(a){if(!a.id){a.id="bonc_widget_toolbar_default"}if(!a.url){Bonc.showDialog(a,b)}else{jQuery.get(a.url,a.params,function(c){a.content=c;Bonc.showDialog(a,b)})}}},toolbarClose:function(a){a=a||"bonc_widget_toolbar_default";jQuery("#"+a).dialog("close")}};Bonc.menu={navMenu:Bonc.extend(Bonc.BaseComponent,{clazz:"Bonc.menu.navMenu",_getHTML:function(e,l){if(e&&e.length>0){function h(o){var q=o?o.children||o:[],r=0;for(var p=0;p<q.length;p++){r+=h(q[p])+1}return r}var g="",m=15,a=0,k=h(e),n=5,c=Math.ceil(k/m);if(c>n){c=n;m=Math.ceil(k/c)}if(l==1){g+='<div><table class="column"><tbody><tr><td class="first">'}g+='<ul class="lvl'+l+'">';for(var d=0;d<e.length;d++){var b=e[d],f=b[this.parentNodeId];var j=((d==1)?" first ":"")+(b.children.length==0?" leaf":" collapsed ")+" lvl"+l+" ";g+='<li class="'+j+'" lvl="'+l+'"><img src="'+Bonc.Constants.BLANK_IMAGE_URL+'"/><a href="#" lvl="'+l+'" class="'+j+'"';if(b.url){g+=' murl="'+b.url+'"'}g+=' toggle="'+(b.toggle||"0")+'"';g+=">"+b.text+"</a>";if(b.children.length>0){g+=this._getHTML(b.children,l+1)}g+="</li>";if(l==1){a++;a+=h(b);if(d<e.length&&(a>m||(a+1+h(e[d+1]))>m)){if(c>0){g+="</ul></td><td><ul>";a=0;c--}}}}g+="</ul>";if(l==1){g+="</td></tr></tbody></table></div>"}return g}else{return""}},hidemenu:function(a){if(this.fireEvent("beforehidemenu")){a.removeClass("expanded").children("div").hide()}},showmenu:function(a){if(this.fireEvent("beforeshowmenu")){a.addClass("expanded").children("div").show()}},render:function(){this.menu=jQuery("#"+this.renderTo);this.fireEvent("beforerender",this.menu);var a=Bonc.treelize({data:this.data,rootId:this.rootId,parentNodeId:this.parentNodeId,nodeId:this.nodeId});this.menu.html(this._getHTML(a,0));this.afterrender()},afterrender:function(){var c=this.menu,a=this;c.find("div").bgIframe({opacity:true});var b=jQuery("li.lvl0",c);b.each(function(){var d=jQuery(this);d.data("timers",{});d.hover(function(){clearTimeout(d.data("timers").hidetimer);clearTimeout(d.data("timers").showtimer);var e=jQuery(this);d.data("timers").showtimer=setTimeout(function(){var g=e.children("a"),j=g.position(),i=j.left,h=g.next("div"),f=c.position().left+c.width();if(!e.hasClass("leaf")){x=h.find("td").length;i=((i+x*198)<f)?(i):(f-x*198);if(i<0){i=0}h.css({position:"absolute",top:(j.top+g.height()+2)+"px",left:i+"px",width:x*198+"px"}).show();a.showmenu(d)}},300)},function(){clearTimeout(d.data("timers").hidetimer);clearTimeout(d.data("timers").showtimer);d.data("timers").hidetimer=setTimeout(function(){a.hidemenu(d)},100)});d.find("a").live("click",function(){b.find("a").removeClass("selected");var e=jQuery(this).addClass("selected");if(!e.hasClass("lvl0")){a.hidemenu(e.parents("table").parent("div").hide().prev("a").addClass("selected").parent("li"))}if(a.click){a.click(this)}})});this.fireEvent("afterrender",this.menu)}}),slideMenu:Bonc.extend(Bonc.BaseComponent,{clazz:"Bonc.menu.slideMenu",transition:{overtime:300,outtime:300},showhidedelay:{showdelay:100,hidedelay:200},detectwebkit:navigator.userAgent.toLowerCase().indexOf("applewebkit")!=-1,detectie6:document.all&&!window.XMLHttpRequest,_getHTML:function(f,a){if(f&&f.length>0){var d='<ul class="lvl'+a+'">';for(var c=0;c<f.length;c++){var e=f[c],g=e[this.parentNodeId];var b=((c==0)?" first ":"")+(e.children.length==0?" leaf":" collapsed ")+" lvl"+a+" ";d+='<li class="'+b+'" lvl="'+a+'"><a href="#" lvl="'+a+'" class="'+b+'"';if(e.url){d+=' murl="'+e.url+'"'}d+=">"+e.text+"</a>";if(e.children.length>0){d+=this._getHTML(e.children,a+1)}d+="</li>"}d+="</ul>";return d}else{return""}},render:function(){this.menu=jQuery("#"+this.renderTo).hide();this.fireEvent("beforerender",this.menu);var a=Bonc.treelize({data:this.data,rootId:this.rootId,parentNodeId:this.parentNodeId,nodeId:this.nodeId});this.menu.html(this._getHTML(a,0));this.afterrender()},afterrender:function(){this.menu.show();var b=this,a=this.menu.children("ul");if(b.click){a.find("a").click(function(d){b.click(this,d)})}var c=a.find("ul").bgIframe({opacity:true}).parent();c.hover(function(d){jQuery(this).children("a:eq(0)").addClass("selected")},function(d){jQuery(this).children("a:eq(0)").removeClass("selected")}).each(function(e){var f=jQuery(this).css({zIndex:100-e});var d=jQuery(this).find("ul:eq(0)").css({display:"block"});d.data("timers",{});this._dimensions={w:this.offsetWidth,h:this.offsetHeight,subulw:d.outerWidth(),subulh:d.outerHeight()};this.istopheader=f.parents("ul").length==1?true:false;d.css({top:this.istopheader?(a.height()+a.position().top)+"px":0});f.hover(function(j){var h=d;var k=f.get(0);clearTimeout(h.data("timers").hidetimer);var g=jQuery(this).parents("div"),i=g.position().left+g.outerWidth(true);h.data("timers").showtimer=setTimeout(function(){k._offsets={left:f.offset().left,top:f.offset().top};var m=k.istopheader?f.position().left:k._dimensions.w;if(k.istopheader){if(m+k._dimensions.subulw>i){m=i-k._dimensions.subulw}}else{if(k._offsets.left+m+k._dimensions.subulw>i){m=-1*h.width()}}if(h.queue().length<=1){var l=0;h.css({left:m+"px",width:k._dimensions.subulw+"px"}).animate({height:"show",opacity:"show"},b.transition.overtime,function(){this.style.overflow=""});h.find(">li>a").each(function(){var n=jQuery(this).width();l=l>n?l:n});if(l>0){h.find(">li>a").width(l)}}},b.showhidedelay.showdelay)},function(h){var g=d;var i=f.get(0);clearTimeout(g.data("timers").showtimer);g.data("timers").hidetimer=setTimeout(function(){g.animate({height:"hide",opacity:"hide"},b.transition.outtime)},b.showhidedelay.hidedelay)})});a.find("ul").css({display:"none",visibility:"visible"});this.fireEvent("afterrender",this.menu)}}),Menu:Bonc.extend(Bonc.BaseComponent,{clazz:"Bonc.menu.Menu",_getHTML:function(f,a){if(f&&f.length>0){var d='<ul class="lvl'+a+'">';for(var c=0;c<f.length;c++){var e=f[c],g=e[this.parentNodeId];var b=((c==0)?" first ":"")+(e.children.length==0?" leaf":" collapsed ")+" lvl"+a+" ";d+='<li class="'+b+'" lvl="'+a+'"><a href="#" lvl="'+a+'" class="'+b+'"';if(e.url){d+=' url="'+e.url+'"'}d+="menu="+jQuery.fn.toJSON(e);d+=">"+e.text+"</a>";if(e.children.length>0){d+=this._getHTML(e.children,a+1)}d+="</li>"}d+="</ul>";return d}else{return""}},render:function(){this.menu=jQuery("#"+this.renderTo).hide();this.fireEvent("beforerender",this.menu);var a=Bonc.treelize({data:this.data,rootId:this.rootId,parentNodeId:this.parentNodeId,nodeId:this.nodeId});this.menu.html(this._getHTML(a,0));this.afterrender()},afterrender:function(){this.menu.show();var b=this,a=this.menu.children("ul");if(b.click){a.find("a").click(function(c){b.click(this,c)})}this.fireEvent("afterrender",this.menu)}})};
Bonc.showOnlineUser=function(a){a=Bonc.apply({url:Bonc.toFullPath("/xframe/security/HeartBeat.action"),detailUrl:Bonc.toFullPath("/xframe/security/HeartBeat!detail.action"),template:"在线用户数($totalOnline$)",intervalTime:180000,showPostion:"status",showDetail:false},a);_gloabl_getUsersCount=function(){jQuery.ajax({url:a.url,global:false,dataType:"json",success:function(c){var b=c?(c.length==1?c[0].totalOnline:c.length):1;if(a.id){jQuery("#"+a.id).html(a.template.replace("$totalOnline$",b))}else{window.status=a.template.replace("$totalOnline$",b)}}})};_gloabl_getUsersCount();setInterval("_gloabl_getUsersCount()",a.intervalTime||300)};
if(window.Ajax){Bonc.Component={};Bonc.Component.DepartmentTree=Class.create();Bonc.Component.DepartmentTree.prototype={config:null,parameters:null,deptInfo:null,initialize:function(b){this.config=b||{};this.config.department=$(b.department);this.config.deptName=$(b.deptName);if(!Object.isUndefined($(b.deptRule))&&(b.deptRule)){this.config.deptRule=$(b.deptRule)}this.config.deptName.style.cursor="pointer";this.config.container=null;var a=this;Event.observe(this.config.deptName,"click",function(c){if(a.parameters!=a.config.parameters){a.parameters=a.config.parameters;new Ajax.Request(Bonc.toFullPath("/xframe/security/Department"),{asynchronous:false,parameters:a.parameters||{},onSuccess:function(d){a.deptInfo=d.responseJSON[0]}});if(a.tree){a.tree.destroy()}a.render()}a.config.container.show()})},getXY:function(e,a){var i=e.positionedOffset();var c=i.left;var f=c+a.width-(document.body.scrollWidth-document.viewport.getScrollOffsets().left);if(f>0){c-=f}var h=i.top+e.getHeight();var g;var j;var d;if(Prototype.Browser.IE){g=document.documentElement.scrollHeight;j=document.viewport.getScrollOffsets().top;d=a.height}else{g=document.body.scrollHeight;d=a.height}var b=document.documentElement.clientHeight;if((h-d)>0){if(g/2<h){h=h-d}}c=c+"px";h=h+"px";return{x:c,y:h}},render:function(){var c=Bonc.createElementId();var d=Bonc.createElementId();var e=['<div><span style="font-size:12px;">选择部门</span>','<img style="width:50px;height:5px;" src="'+Ext.BLANK_IMAGE_URL+'"/>','<a href="javascript:void(0);" id="'+c+'">清空</a>&nbsp;&nbsp;&nbsp;&nbsp;','<a href="javascript:void(0);" id="'+d+'">关闭</a></div>'].join("");var a=this;this.tree=new Ext.tree.TreePanel({title:e,width:230,height:300,autoScroll:true,containerScroll:true,loader:new Ext.tree.TreeLoader({dataUrl:Bonc.toFullPath("/xframe/security/Department!getChildren"),baseParams:{regionNo:a.deptInfo.regionNo}}),rootVisible:(a.deptInfo.deptName!=null&&a.deptInfo.deptName!=""&&a.deptInfo.deptName!="undefined")});this.root=new Ext.tree.AsyncTreeNode({id:a.deptInfo.department,text:a.deptInfo.deptName});this.tree.setRootNode(this.root);this.tree.on("click",function(g,f){a.config.department.value=g.attributes.id;a.config.deptName.value=g.attributes.text;if(a.config.deptName&&a.config.deptName.onchange){Bonc.fireEvent(a.config.deptName,"change")}if(!Object.isUndefined(a.config.deptRule)){a.config.deptRule.value=g.attributes.id}a.config.container.hide();return true});a.config.container=new Ext.Window({renderTo:Ext.getBody(),closable:false,width:230,showshaw:false,frame:false,height:300,layout:"table",items:[this.tree]});var b=a.config.container;b.x=a.getXY(a.config.deptName,b).x;b.y=a.getXY(a.config.deptName,b).y;a.config.container.show();this.clearButton=$(c);this.colseButton=$(d);Event.observe(this.clearButton,"click",function(f){try{a.config.department.value="";a.config.deptName.value="";if(!Object.isUndefined(a.config.deptRule)){a.config.deptRule.value=""}a.config.container.hide()}catch(g){}});Event.observe(this.colseButton,"click",function(f){try{a.config.container.hide()}catch(g){}});this.root.expand(false,false,function(f){if(f.firstChild){f.firstChild.expand()}})}}};
Bonc.Ajax.registerCallBack(function(b){var a=b.getResponseHeader("AJAX_LOGIN_STATUS");if(a&&a=="NO_LOGIN"){window.top.location.href=Bonc.toFullPath("/Login!input.action");b.abort();return false}return true},"success");
if(window.Ajax){Bonc.Component={};Bonc.Component.TreeSelectObj=Class.create();Bonc.Component.TreeSelectObj.prototype={config:null,parameters:null,objInfo:null,initialize:function(b){this.config=b||{};this.config.objId=$(b.objId);this.config.objName=$(b.objName);if(this.config.objId.value==null||this.config.objId.value==""){alert(this.config.objId.id+"不能为null或空！");return false}if(this.config.objName.value==null||this.config.objName.value==""){alert(this.config.objName.id+"不能为null或空！");return false}if(this.config.rootUrl==null||this.config.rootUrl==""){alert("必须设置rootUrl属性！");return false}if(this.config.childUrl==null||this.config.childUrl==""){alert("必须设置childUrl属性！");return false}if(this.config.panelTitle==null||this.config.panelTitle==""){this.config.ppanelTitle="请选择"}this.config.objName.style.cursor="pointer";this.config.container=null;var a=this;Event.observe(this.config.objName,"click",function(c){if(a.parameters!=a.config.parameters){a.parameters=a.config.parameters;new Ajax.Request(a.config.rootUrl,{asynchronous:false,parameters:a.parameters||{},onSuccess:function(d){var jsonObj=d.responseJSON[0];for(var key in jsonObj){if("id"==key){a.objInfo="{objId : '"+jsonObj[key]+"',"}if("text"==key){a.objInfo+="objName : '"+jsonObj[key]+"'}"}}a.objInfo=eval("("+a.objInfo+")")}});if(a.tree){a.tree.destroy()}a.render()}a.config.container.show()})},getXY:function(p,t){var l=p.positionedOffset();var r=l.left;var o=r+t.width-(document.body.scrollWidth-document.viewport.getScrollOffsets().left);if(o>0){r-=o}var m=l.top+p.getHeight();var n;var k;var q;if(Prototype.Browser.IE){n=document.documentElement.scrollHeight;k=document.viewport.getScrollOffsets().top;q=t.height}else{n=document.body.scrollHeight;q=t.height}var s=document.documentElement.clientHeight;if((m-q)>0){if(n/2<m){m=m-q}}r=r+"px";m=m+"px";return{x:r,y:m}},render:function(){var i=Bonc.createElementId();var h=Bonc.createElementId();var g=['<div><span style="font-size:12px;margin-left: 0px;">'+this.config.panelTitle+"</span>",'<a href="javascript:void(0);" style="margin-left: 80px;" id="'+i+'">清空</a>&nbsp;&nbsp;&nbsp;','<a href="javascript:void(0);" id="'+h+'">关闭</a></div>'].join("");var f=this;this.tree=new Ext.tree.TreePanel({title:g,width:230,height:300,autoScroll:true,containerScroll:true,enableDD:false,loader:new Ext.tree.TreeLoader({dataUrl:f.config.childUrl,baseParams:f.parameters||{}}),rootVisible:(f.objInfo.objName!=null&&f.objInfo.objName!=""&&f.objInfo.objName!="undefined")});this.root=new Ext.tree.AsyncTreeNode({id:f.objInfo.objId,text:f.objInfo.objName});this.tree.setRootNode(this.root);this.tree.on("click",function(b,c){f.config.objId.value=b.attributes.id;f.config.objName.value=b.attributes.text;var a=f.config.callback;if(typeof(a)!="undefined"&&typeof(a)=="function"){a()}f.config.container.hide();return true});f.config.container=new Ext.Window({renderTo:Ext.getBody(),closable:false,width:230,showshaw:false,frame:false,height:300,layout:"fit",items:[this.tree]});var e=f.config.container;e.x=f.getXY(f.config.objName,e).x;e.y=f.getXY(f.config.objName,e).y;f.config.container.show();this.clearButton=$(i);this.colseButton=$(h);Event.observe(this.clearButton,"click",function(b){try{f.config.objId.value="";f.config.objName.value="";f.config.container.hide()}catch(a){}});Event.observe(this.colseButton,"click",function(b){try{f.config.container.hide()}catch(a){}});this.root.expand(false,false,function(a){if(a.firstChild){a.firstChild.expand()}})}}};