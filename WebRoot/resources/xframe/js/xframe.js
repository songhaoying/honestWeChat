Bonc.widget={toolbar:function(a,b){a=jQuery.extend({height:380,width:510,show:"clip",hide:"clip",buttons:null,resizable:true,modal:false,draggable:true},a,{dialogClass:"dialog-tool"});if(a){if(!a.id){a.id="bonc_widget_toolbar_default"}if(!a.url){Bonc.showDialog(a,b)}else{jQuery.get(Bonc.toFullPath(a.url),a.params,function(c){a.content=c;Bonc.showDialog(a,b)})}}},toolbarClose:function(a){a=a||"bonc_widget_toolbar_default";jQuery("#"+a).dialog("close")},menu:function(d,a){var c=jQuery("#"+d+" div.content");c.find("div").bgIframe({opacity:true});var b=jQuery("li.lvl0",c);b.each(function(){var e=jQuery(this);e.data("timers",{});e.hover(function(){clearTimeout(e.data("timers").hidetimer);var g=jQuery(this);e.data("timers").showtimer=setTimeout(function(){var h=g.children("a"),k=h.position(),j=k.left,i=h.next("div"),f=c.position().left+c.width();if(!g.hasClass("leaf")){x=i.find("td").length;j=((j+x*198)<f)?(j):(f-x*198);if(j<0){j=0}i.css({position:"absolute",top:(k.top+h.height()+2)+"px",left:j+"px",width:x*198+"px"}).show();g.addClass("expanded")}})},function(){e.data("timers").hidetimer=setTimeout(function(){e.removeClass("expanded").children("div").hide()},100)});e.find("a").click(function(){b.find("a").removeClass("selected");var f=jQuery(this).addClass("selected");if(!f.hasClass("lvl0")){f.parents("table").parent("div").hide().prev("a").addClass("selected").parent("li").removeClass("expanded")}if(a&&a.click){a.click(this)}})})}};
Bonc.showOnlineUser=function(a){a=jQuery.extend({url:Bonc.toFullPath("/xframe/security/HeartBeat.action"),detailUrl:Bonc.toFullPath("/xframe/security/HeartBeat!detail.action"),template:"在线用户数($totalOnline$)",intervalTime:180000,showPostion:"status",showDetail:false},a);if(a.showPostion=="status"){Bonc.configToolBar("sysToolBar",{el:[{id:"onlineUser",show:false}]})}else{if(a.showDetail==true){a.url=a.detailUrl}}_gloabl_getUsersCount=function(){jQuery.ajax({url:a.url,global:false,dataType:"json",success:function(c){var b=c?(c.length==1?c[0].totalOnline:c.length):1;window.status=a.template.replace("$totalOnline$",b)}})};_gloabl_getUsersCount();setInterval("_gloabl_getUsersCount()",a.intervalTime||300)};
Bonc.toolBar=function(b,a){if(b&&a&&a.el){this.id=b;this._config=a;this.config=a;$j.extend(this._setting,a.setting);this.createElements();this.addClickEvent();Bonc._addToolBarQueue(b,this)}};Bonc._addToolBarQueue=function(b,a){if(!this._cache_toolbar){this._cache_toolbar={}}this._cache_toolbar[b]=a};Bonc.configToolBar=function(e,a,d){var c=d||window;if(c.Bonc&&c.Bonc._cache_toolbar){var b=c.Bonc._cache_toolbar[e];b.reConfig(a);$j(window).unload(function(){if(b.config.setting.show===false){b.ul.children("li").hide()}else{b.reConfig()}})}};Bonc.toolBar.prototype={_setting:{height:"300px",width:"300px",borderWidth:"1px",showX:"right",showY:"bottom",draggable:false,show:true},_draggableEvent:null,_hideContentevent:null,createElements:function(){var d=this.config;var f=this.id;var k=$j("<ul/>").addClass(d.menuClass||" nav"),c=d.el;this.ul=k;this.content=$j('<div id="'+f+'_container" class="container"/>').css({position:"relative"}).append('<div id="'+f+'_hander" style="cursor:move" class="hander"><div id="'+f+'_close" class="close"></div></div>').append('<div id="'+f+'_content" class="'+(d.contentClass||" content")+'"/>');var l=this;this.content.find("#"+f+"_close").click(function(){l.hideContent()});var b=$j("#"+f);if(b.size()==0){b=$j('<div id="'+f+'"/>').appendTo("body")}this.o=b.addClass("toolbar").append(this.ul).append(this.content);for(var h=0;h<c.length;h++){var j=c[h];var m=$j("<a "+(j.url?('url="'+j.url+'"'):"")+'id="'+(j.id||f+"_menu_"+h)+'"'+(j.title?('title="'+j.title+'"'):"")+(j.cssClass?('class="'+j.cssClass+'"'):"")+'><span class="title">'+(j.text||"&nbsp;")+"</span></a>");if(j.content){m.append('<span class="contentHide" style="display:none;">'+j.content+"</span>")}if(j.click){var g=j.click;m.click(function(a){g(a,this)})}m.appendTo(k).wrap("<li></li>")}this.cwidth=this.o.width();if(this.config.setting.show===false){this.ul.children().hide()}},reConfig:function(c){this.config=this._config;var h=this.ul,m=h.children().removeAttr("hashide").show();if(c&&c.el){var b=c.el;for(var f=0;f<b.length;f++){var g=b[f],k=h.find("#"+g.id);var l=k.parent();var d=m.index(l);if(g.text){k.find("span.title").html(g.text)}if(g.content){k.find("span.contentHide").html(g.content)}this.config.el[d]=$j.extend({},this.config.el[d],g);if(g.show===false){l.attr("hashide","hashide").hide()}}}this.cwidth=this.o.width()},fixedClass:function(){this.ul.children().children(".select").addClass("fixed")},addDraggableEvent:function(){var b=this.id;$j("#"+b+"_hander").show();if(this._draggableEvent===null){var a=this;this._draggableEvent=new Draggable($(b+"_container"),{handle:b+"_hander",onDrag:function(){a.removeContentHideEvent()},onEnd:function(){a.fixedClass()}})}},removeDraggableEvent:function(){var a=this.id;$j("#"+a+"_hander").hide();if(this._draggableEvent!==null){this._draggableEvent.destroy();this._draggableEvent=null}},addContentHideEvent:function(){this.removeContentHideEvent();var a=this;this.o.hover(function(){clearTimeout(this._hideContentevent);this._hideContentevent=null},function(){if(this._hideContentevent!=null){clearTimeout(this._hideContentevent);this._hideContentevent=null}this._hideContentevent=setTimeout(function(){a.hideContent()},300)})},removeContentHideEvent:function(){this.o.unbind("mouseenter mouseleave");clearTimeout(this._hideContentevent);this._hideContentevent=null},hideContent:function(a){if(a===true){this.content.css({height:"0px",borderWidth:"0px"})}else{this.content.animate({height:"0px"},500).animate({borderWidth:"0px"},0)}this.ul.find("a.select").removeClass("select fixed")},filterWidth:function(b){var a=""+b;if(a.indexOf("px")!=-1){a=a.substring(0,a.indexOf("px"))}return parseInt(a,10)},showContent:function(e,d){this.o.width(this.cwidth);var b=this.o,c=b.outerWidth(),l=this.getSetting(d);var g=this.ul.children(":eq("+d+")"),j=g.position().left,k=g.outerWidth();var h=this.filterWidth(l.width),f=l.showX==="left"?"right":"left";if(!l[f]){if(h>c){l[f]=""+(c-h)+"px"}else{if(j+h>c){l[f]=""+(c-h)+"px"}else{l[f]=""+j+"px"}}l.backheight=l.height;l.height=0}if(!l.top){if(l.showY==="bottom"){l.top="0"}else{l.top="-"+(b.outerHeight()+this.filterWidth(l.height))+"px"}}this.content.children("div.content").html(e);this.content.css(l).animate({height:l.backheight},500);this.addContentHideEvent();if(l.draggable===true){this.addDraggableEvent()}else{this.removeDraggableEvent()}},addClickEvent:function(){var c=this;var b=this.ul;var a=b.children().children();a.click(function(e){b.find("a.select").removeClass("select");var d=$j(this).addClass("select");if(d.attr("url")){new Ajax.Request(Bonc.toFullPath(d.attr("url")),{evalScript:true,onSuccess:function(f){c.showContent(f.responseText,a.index(d))}})}else{if(d.children("span.contentHide").size()>0){c.showContent(d.children("span.contentHide").html(),a.index(d))}}if(c.config.click){c.config.click(e,d)}})},getSetting:function(a){return $j.extend({},this._setting,this.config.el[a].setting)}};
Bonc.Component={};Bonc.Component.DepartmentTree=Class.create();Bonc.Component.DepartmentTree.prototype={config:null,parameters:null,deptInfo:null,initialize:function(b){this.config=b||{};this.config.department=$(b.department);this.config.deptName=$(b.deptName);if(!Object.isUndefined($(b.deptRule))&&(b.deptRule)){this.config.deptRule=$(b.deptRule)}this.config.deptName.style.cursor="pointer";this.config.container=null;var a=this;Event.observe(this.config.deptName,"click",function(c){if(a.parameters!=a.config.parameters){a.parameters=a.config.parameters;new Ajax.Request(Bonc.toFullPath("/xframe/security/Department"),{asynchronous:false,parameters:a.parameters||{},onSuccess:function(d){a.deptInfo=d.responseJSON[0]}});if(a.tree){a.tree.destroy()}a.render()}a.config.container.show()})},getXY:function(e,a){var i=e.positionedOffset();var c=i.left;var f=c+a.width-(document.body.scrollWidth-document.viewport.getScrollOffsets().left);if(f>0){c-=f}var h=i.top+e.getHeight();var g;var j;var d;if(Prototype.Browser.IE){g=document.documentElement.scrollHeight;j=document.viewport.getScrollOffsets().top;d=a.height}else{g=document.body.scrollHeight;d=a.height}var b=document.documentElement.clientHeight;if((h-d)>0){if(g/2<h){h=h-d}}c=c+"px";h=h+"px";return{x:c,y:h}},render:function(){var c=Bonc.createElementId();var d=Bonc.createElementId();var e=['<div><span style="font-size:12px;">选择部门</span>','<img style="width:50px;height:5px;" src="'+Ext.BLANK_IMAGE_URL+'"/>','<a href="javascript:void(0);" id="'+c+'">清空</a>&nbsp;&nbsp;&nbsp;&nbsp;','<a href="javascript:void(0);" id="'+d+'">关闭</a></div>'].join("");var a=this;this.tree=new Ext.tree.TreePanel({title:e,width:230,height:300,autoScroll:true,containerScroll:true,loader:new Ext.tree.TreeLoader({dataUrl:Bonc.toFullPath("/xframe/security/Department!getChildren"),baseParams:{regionNo:a.deptInfo.regionNo}}),rootVisible:(a.deptInfo.deptName!=null&&a.deptInfo.deptName!=""&&a.deptInfo.deptName!="undefined")});this.root=new Ext.tree.AsyncTreeNode({id:a.deptInfo.department,text:a.deptInfo.deptName});this.tree.setRootNode(this.root);this.tree.on("click",function(g,f){a.config.department.value=g.attributes.id;a.config.deptName.value=g.attributes.text;if(a.config.deptName&&a.config.deptName.onchange){Bonc.fireEvent(a.config.deptName,"change")}if(!Object.isUndefined(a.config.deptRule)){a.config.deptRule.value=g.attributes.id}a.config.container.hide();return true});a.config.container=new Ext.Window({renderTo:Ext.getBody(),closable:false,width:230,showshaw:false,frame:false,height:300,layout:"table",items:[this.tree]});var b=a.config.container;b.x=a.getXY(a.config.deptName,b).x;b.y=a.getXY(a.config.deptName,b).y;a.config.container.show();this.clearButton=$(c);this.colseButton=$(d);Event.observe(this.clearButton,"click",function(f){try{a.config.department.value="";a.config.deptName.value="";if(!Object.isUndefined(a.config.deptRule)){a.config.deptRule.value=""}a.config.container.hide()}catch(g){}});Event.observe(this.colseButton,"click",function(f){try{a.config.container.hide()}catch(g){}});this.root.expand(false,false,function(f){if(f.firstChild){f.firstChild.expand()}})}};
Bonc.Ajax.registerCallBack(function(a){if(a.getResponseHeader("AJAX_LOGIN_STATUS")=="NO_LOGIN"){window.top.location.href=Bonc.toFullPath("/Login!input.action");a.abort();return false}return true});
