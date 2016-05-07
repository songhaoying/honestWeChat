String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
String.prototype.trimLeft = function(){ 
	return this.replace(/(^\s*)/g, ""); 
};
String.prototype.trimRight = function(){
	return this.replace(/(\s*$)/g, ""); 
};

/*
 * 收集参数 
 * Bonc.serializeForm($('form1'),{'element':[$('el1'),$('el2')],'className':['el-class1'],'selector':'.cls1 input'})
 * 第一个参数为需要排除的表单
 * 第二个参数为需要排除的条件
 * element为需要排序的元素或元素数组
 * className为需要排除的元素容器的class名称或class名称数组，在这个指定条件下的input、select、textarea类型的元素将排除
 * selector为需要排除的元素的选择条件或条件数组，使用方式参照prototype的Element.select()函数的使用方式，与Element.select()函数的差别在于多个条件时应该为数组
 * */
Bonc.serializeForm=function(){
	var args=$A(arguments);
	form=$(args.shift());
	var options=args.shift();
	var exclude=[];
	var selector=[];
	if(options){
		exclude=[options.element];
		$A([options.className].flatten().compact()).each(function(cl){
			selector=selector.concat(['.'+cl+' input',
			          '.'+cl+' select',
			          '.'+cl+' textarea']);
		});
		selector=selector.concat([options.selector]).flatten().compact();
		
	}
	exclude=exclude.concat(Selector.findChildElements(form, selector.compact())).flatten().compact();
	exclude.each(function (el){
		Form.Element.disable(el);
	});
	var ret=form.serialize(true);
	exclude.each(function (el){
		Form.Element.enable(el);
	});
	return ret;
};

/*查找子元素*/
Bonc.findChildren=function(element, only, recursive, tagName) {
	  if(!element || !element.childNodes)return null;
	  tagName = tagName.toUpperCase();
	  if(only) only = [only].flatten();
	  var elements = [];
	  $A(element.childNodes).each( function(e) {
	    if(e.tagName && e.tagName.toUpperCase()==tagName &&
	      (!only || (Element.classNames(e).detect(function(v) { return only.include(v) }))))
	        elements.push(e);
	    if(recursive) {
	      var grandchildren = Element.findChildren(e, only, recursive, tagName);
	      if(grandchildren) elements.push(grandchildren);
	    }
	  });

	  return (elements.length>0 ? elements.flatten() : []);
};
/*修改Ajax.Updater，修改IE下的样式不能加载的问题
Ajax.Updater.addMethods({
	updateContent:function(responseText) {
	    var receiver = this.container[this.success() ? 'success' : 'failure'],
	    options = this.options;
	
		if (!options.evalScripts) responseText = responseText.stripScripts();
		if(Prototype.Browser.IE){
			responseText = '<div style="display: none;">&nbsp;</div>' + responseText;
			//responseText = '<span style="display: none;"></span>' + responseText;
			//responseText = responseText.replace(/<script(.*)defer([^\s|^>]*)([^>]*)>/gi,'<script$1$3>');
		}
		if (receiver = $(receiver)) {
		  if (options.insertion) {
		    if (Object.isString(options.insertion)) {
		      var insertion = { }; insertion[options.insertion] = responseText;
		      receiver.insert(insertion);
		    }
		    else options.insertion(receiver, responseText);
		  }
		  else receiver.update(responseText);
		}
		
	}
});
*/