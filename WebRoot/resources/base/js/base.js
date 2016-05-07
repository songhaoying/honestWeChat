
function __firefox() {
	HTMLElement.prototype.__defineGetter__("runtimeStyle", __element_style);
	window.constructor.prototype.__defineGetter__("event", __window_event);
	Event.prototype.__defineGetter__("srcElement", __event_srcElement);
}
function __element_style() {
	return this.style;
}
function __window_event() {
	return __window_event_constructor();
}
function __event_srcElement() {
	return this.target;
}
function __window_event_constructor() {
	if (document.all) {
		return window.event;
	}
	var c = __window_event_constructor.caller;
	while (c != null) {
		var b = c.arguments[0];
		if (b) {
			var a = b.constructor;
			if (a.toString().indexOf("Event") != -1) {
				return b;
			}
		}
		c = c.caller;
	}
	return null;
}

var Bonc = {Constants:{WEB_APP_CONTEXT_PATH:"/", WEB_APP_ACTION_EXTENSION:"action", BLANK_IMAGE_URL:this.WEB_APP_CONTEXT_PATH + "/resources/base/img/s.gif"}, newId:function () {
	return "bonc_el_" + new Date().getTime() + "_" + parseInt(Math.random() * 10000);
}, getContextPath:function () {
	return this.Constants.WEB_APP_CONTEXT_PATH;
}, _getContextPath:function (d) {
	if (!d) {
		throw "param JSURL must not null";
	}
	var a = document.getElementsByTagName("script");
	d = d.indexOf("/") == 0 ? d.substring(1) : d;
	for (var f = 0; f < a.length; f++) {
		var e = a[f].src, c;
		if (e && (c = e.indexOf(d)) >= 0) {
			var b = e.indexOf("://");
			return b < 0 ? e.substring(0, c - 1) : e.substring(e.indexOf("/", b + 3), c - 1);
		}
	}
	return "/";
}, toFullPath:function (b) {
	if (!b || "string" != typeof (b)) {
		return b || "";
	}
	if (b.indexOf("/") === 0) {
		b = (this.Constants.WEB_APP_CONTEXT_PATH === "/" ? "" : this.Constants.WEB_APP_CONTEXT_PATH) + b;
	}
	var a = b.indexOf("?");
	if (a < 0) {
		a = b.length;
	}
	return b.lastIndexOf(".", a) < 0 ? b.substring(0, a) + "." + this.Constants.WEB_APP_ACTION_EXTENSION + b.substring(a) : b;
}, showMask:function () {
	var a = jQuery(document);
	jQuery("<div id=\"bonc_mask_default\" class=\"bonc-mask\"></div>").height(a.height() - 20).width(a.width() - 20).appendTo("body");
}, removeMask:function () {
	jQuery("#bonc_mask_default").remove();
}, showDialog:function (c, b) {
	if (c) {
		var c = jQuery.extend({resizable:false, height:140, modal:true, draggable:false, buttons:{"\u5173\u95ed":function () {
			jQuery(this).dialog("close");
		}}, id:"bonc_el_dialog", content:"", dragStart:function (d, e) {
			Bonc.showMask();
		}, dragStop:function (d, e) {
			Bonc.removeMask();
		}, resizeStart:function (d, e) {
			Bonc.showMask();
		}, resizeStop:function (d, e) {
			Bonc.removeMask();
		}}, c, {autoOpen:false});
		if (!c.minWidth || c.minWidth < 260) {
			c.minWidth = 260;
		}
		if (!c.minHeight || c.minHeight < 320) {
			c.minHeight = 320;
		}
		b = b || window;
		var a = b.jQuery("#" + c.id);
		if (a.size() > 0) {
			a.html(c.content);
			if (!a.hasClass("ui-dialog-content")) {
				a.dialog(c);
			}
		} else {
			a = jQuery("<div id=\"" + c.id + "\">" + c.content + "</div>");
			b.jQuery("body").append(a);
			a.dialog(c);
		}
		a.dialog("open");
	}
}, alert:function (b, a) {
	if (!a) {
		a = b;
		b = "\u63d0\u793a";
	}
	this.showDialog({id:"bonc_alert_comp", title:b, content:a, minHeight:130});
}, remind:function (d, b, a) {
	a = a || {};
	var c = jQuery("#" + d);
	if (c.length == 0) {
		c = jQuery("<div id=\"" + d + "\" class=\"" + (a.position || "bottom-right") + "\"></div>").appendTo("body");
	}
	c.jGrowl(b, a);
}, showPopupTooltip:function (a, d, b) {
	var c = jQuery("<div class=\"popupTooltip\" style=\"z-index:9999;left:" + a + "px;top:" + d + "px;\">" + b + "</div>").appendTo("body");
	setTimeout(function () {
		c.fadeOut(300, function () {
			c.remove();
		});
	}, 1000);
}, fireEvent:function (a, b) {
	jQuery(a).trigger(b);
}, setCookie:function (b, c, f) {
	if (b && c) {
		var a = "";
		if (f) {
			var e = new Date();
			e.setTime(e.getTime() + f * 24 * 60 * 60 * 1000);
			a = "; expires=" + e.toGMTString();
		}
		document.cookie = b + "=" + encodeURIComponent(c) + a + "; path=/";
	}
}, getCookie:function (a) {
	var e = null;
	if (document.cookie && document.cookie != "") {
		var d = document.cookie.split(";");
		for (var c = 0; c < d.length; c++) {
			var b = jQuery.trim(d[c]);
			if (b.substring(0, a.length + 1) == (a + "=")) {
				e = decodeURIComponent(b.substring(a.length + 1));
				break;
			}
		}
	}
	return e;
}, removeCookie:function (a) {
	this.setCookie(a, "", -1);
}, extend:function (a) {
	jQuery.extend(true, this, a);
}, _scrollMenu:function (g, f) {
	var e = document.getElementById(g);
	if (e) {
		var b = e.clientWidth, c = e.scrollWidth, d = e.scrollLeft, a = e.timerScrollMenu;
		switch (f) {
		  case "left":
			if (d < 0) {
				clearTimeout(a);
				return;
			}
			e.scrollLeft = d - 20;
			e.timerScrollMenu = setTimeout("Bonc._scrollMenu('" + g + "','" + f + "')", 300);
			break;
		  case "right":
			if (d + b > c) {
				clearTimeout(a);
				return;
			}
			e.scrollLeft = d + 20;
			e.timerScrollMenu = setTimeout("Bonc._scrollMenu('" + g + "','" + f + "')", 300);
			break;
		  default:
			clearTimeout(a);
			break;
		}
	}
}, scrollMenu:function (f, c, d) {
	var a = jQuery("#" + c);
	var b = jQuery("#" + d);
	var e = jQuery("#" + f);
	if (e.length > 0 && a.length > 0 && d.length > 0) {
		w = e[0].clientWidth, tw = e[0].scrollWidth;
		if (w >= tw) {
			e.parent().removeClass("withscroll").addClass("noscroll");
		} else {
			e.parent().removeClass("noscroll").addClass("withscroll");
			a.hover(function () {
				Bonc._scrollMenu(f, "left");
			}, function () {
				Bonc._scrollMenu(f, "stop");
			});
			b.hover(function () {
				Bonc._scrollMenu(f, "right");
			}, function () {
				Bonc._scrollMenu(f, "stop");
			});
		}
	}
}};
Bonc.Event = {events:{"dom:loaded":[]}, on:function (a, d, c) {
	a = a.toLowerCase();
	var e = this.events[a];
	if (!e) {
		return false;
	}
	for (var b = 0; b < e.length; b++) {
		if (e[b].handler == d) {
			return false;
		}
	}
	c = c || this.obj;
	e.push({handler:d, scope:c});
}, fire:function () {
	var b = this.events[arguments[0].toLowerCase()];
	if (!b) {
		return false;
	}
	var a = b.pop();
	while (typeof a == "object") {
		a.handler.apply(a.scope || window, Array.prototype.slice.call(arguments, 1));
		a = b.pop();
	}
	return true;
}};
Bonc.extend(Bonc.Event);
Bonc.NavTab = function (a) {
	jQuery.extend(this, a);
};
Bonc.NavTab.prototype = {target:null, click:null, tabs:null, cssClass:"navtab", subtabs:null, render:function (b) {
	var a = $(b);
	Bonc.fireEvent(this.createTabs(a, this.tabs).down("A"), "click");
}, createTabs:function (d, f) {
	d.addClassName(this.cssClass);
	for (var e = 0; e < f.length; e++) {
		var g = f[e];
		if (g.url.strip() == "" && g.children != "") {
			g.url = (g.children[0].url);
		}
		var b = new Element("LI");
		var c = new Element("A", {tabind:e, href:g.url, target:this.target, menuId:g.id, leaf:"" + g.leaf, lvl:g.lvl});
		c.update(g.title);
		b.appendChild(c);
		d.appendChild(b);
		Event.observe(c, "click", this.click.bindAsEventListener(this));
	}
	return d;
}, click:function (d) {
	var c = Event.element(d);
	c.blur();
	var a = c.up("." + this.cssClass);
	if ("OL" == a.tagName) {
		var b = a.down(".selectedtab");
		if (b) {
			b.removeClassName("selectedtab");
		}
		c.addClassName("selectedtab");
	} else {
		this.switchTab(c, a, d);
	}
	if (this.clickFunc && !this.clickFunc(d, c)) {
		Event.stop(d);
	}
}, switchTab:function (a, d) {
	if (this.subtabs) {
		this.subtabs.remove();
		this.subtabs = null;
	}
	var i = d.down(".selectedtab");
	if (i) {
		i.removeClassName("selectedtab");
	}
	a.addClassName("selectedtab");
	var f = this.tabs[a.getAttribute("tabind")].children;
	if (f && f.length) {
		var k;
		d.parentNode.insertBefore(k = this.subtabs = this.createTabs(new Element("OL"), f), d.nextSibling);
		k.style.position = "absolute";
		var h = a.cumulativeOffset();
		var e = a.getDimensions();
		var b = k.getDimensions();
		var g = h.top + e.height;
		var c = h.left + e.width / 2 - b.width / 2;
		if (c < 0) {
			c = 0;
		} else {
			var j = document.viewport.getWidth();
			if (c + b.width > j) {
				c = j - b.width;
			}
		}
		k.style.left = c + "px";
		k.style.top = g + "px";
		$A(k.getElementsByTagName("A")).each(function (l) {
			if (l.href == a.href) {
				$(l).addClassName("selectedtab");
				throw $break;
			}
		});
	}
}};
Bonc.AppletBox = {_slideAppletBox:function (c, a) {
	switch (a) {
	  case "1":
		jQuery("#img_1" + c).hide();
		jQuery("#img_2" + c).show();
		jQuery("#inner" + c).slideUp();
		break;
	  case "2":
		jQuery("#img_1" + c).show();
		jQuery("#img_2" + c).hide();
		jQuery("#inner" + c).slideDown();
		break;
	  case "3":
		var b = jQuery("#" + c);
		b.slideUp("200", function () {
			b.remove();
		});
		break;
	}
}, maxAppletBox:function (a) {
	jQuery("#inner" + a).slideUp();
	jQuery("#img_mm" + a).removeClass("minButton").addClass("maxButton").attr("alt", "\u6700\u5927\u5316");
}, minAppletBox:function (a) {
	jQuery("#inner" + a).slideDown();
	jQuery("#img_mm" + a).removeClass("maxButton").addClass("minButton").attr("alt", "\u6700\u5c0f\u5316");
}, removeAppletBox:function (b) {
	var a = jQuery("#" + b);
	a.slideUp("200", function () {
		a.remove();
	});
}, getAppletCloseIcon:function (a) {
	return $("img_3" + a);
}, getAppletMinIcon:function (a) {
	return $("img_1" + a);
}};
Bonc.extend(Bonc.AppletBox);
Bonc.Form = {checkAllRecords:function (d, c, a) {
	var b = jQuery("#" + a).attr("checked");
	jQuery("#" + d + " :checkbox[name=\"" + c + "\"]").each(function () {
		this.checked = b;
	});
}, bindCheckAll:function (a, e, d) {
	var c = jQuery("#" + e + " :checkbox[name=\"" + d + "\"]");
	var f = jQuery("#" + a);
	var b = c.length;
	c.each(function () {
		if (this.checked == false) {
			b -= 1;
			return false;
		}
	});
	if (c.length != 0 && b == c.length) {
		f.attr("checked", true);
	} else {
		f.attr("checked", false);
	}
	f.bind("click", function () {
		var g = this.checked;
		c.each(function () {
			if (!this.disabled) {
				this.checked = g;
			}
		});
		return true;
	});
	c.bind("click", function () {
		var g = c.length;
		c.each(function () {
			if (this.checked == false) {
				g -= 1;
				return false;
			}
		});
		if (g == c.length) {
			f.attr("checked", true);
		} else {
			f.attr("checked", false);
		}
	});
}, bindCheckOne:function (c, b) {
	var a = jQuery("#" + c + " :checkbox[name=\"" + b + "\"]");
	a.bind("click", function (e) {
		e.stopPropagation();
		var d = this.checked;
		a.attr("checked", false);
		this.checked = d;
	});
}, selectOneCheckbox:function (f, e, b) {
	var d = false;
	var a = 0;
	var c;
	$(f).getInputs("checkbox", e).each(function (g) {
		if (g.checked) {
			a++;
			c = g.value;
			d = true;
		}
	});
	if (!d) {
		alert(b || "\u8bf7\u5148\u9009\u62e9\u8bb0\u5f55!");
		return false;
	} else {
		if (a > 1) {
			alert(b || "\u53ea\u80fd\u9009\u62e9\u4e00\u6761\u8bb0\u5f55!");
		} else {
			return c;
		}
	}
	return false;
}, setRadioValue:function (c, a, b) {
	jQuery("#" + c + " :radio[name=\"" + a + "\"]").val([b]);
}, commitBatchOperation:function (f, e, a, d) {
	var c = false, b = jQuery("#" + f);
	b.find(":checkbox[name=\"" + e + "\"]").each(function () {
		return !(c = this.checked);
	});
	if (!c) {
		Bonc.alert(a || "\u8bf7\u5148\u9009\u62e9\u8981\u5220\u9664\u7684\u8bb0\u5f55!");
		return false;
	} else {
		if (confirm(d || "\u662f\u5426\u786e\u8ba4\u5220\u9664\u6240\u9009\u8bb0\u5f55\uff1f")) {
			b.submit();
		}
	}
	return false;
}, _checkFormField:function (b, a, n, m) {
	var e = $(b[a]);
	var k = e.type;
	var c = new Array();
	if (k == "select-multiple") {
		c = $F(e);
	} else {
		if (k == "text" || k == "file" || k == "textarea") {
			c[0] = $F(e).strip();
		} else {
			if (k == "select-one" || k == "password") {
				c[0] = $F(e);
			} else {
				var g = $(b)[a];
				var f = 0;
				var d = 0;
				k = $(b)[a][0].type;
				for (f = 0; f < g.length; f++) {
					if (g[f].checked) {
						c[d] = g[f].value;
						d++;
					}
				}
			}
		}
	}
	var l = true;
	if (n.indexOf("required") != -1) {
		l = this.validateRequired(c, m);
		if (l != true) {
			return l;
		}
	}
	if (true == l) {
		if (n.indexOf("email") != -1) {
			return this.validateEmail(c, m);
		}
		if (n.indexOf("numeric") != -1) {
			return this.validateNumeric(c, m);
		}
		if (n.indexOf("trimLen") != -1) {
			var h = n.substring(n.indexOf("(") + 1, n.indexOf(")")).strip();
			return this.validateLen(c, h, true, m);
		}
		if (n.indexOf("len") != -1) {
			var h = n.substring(n.indexOf("(") + 1, n.indexOf(")")).strip();
			return this.validateLen(c, h, false, m);
		}
	}
	return true;
}, validateRequired:function (b, a) {
	if (b == null || b.length == 0 || b[0] == "" || b[0] == "-1") {
		return a + "\u4e0d\u80fd\u4e3a\u7a7a";
	}
	return true;
}, validateEmail:function (d, b) {
	if (this.validateRequired(d, b) != true) {
		return true;
	} else {
		var a = new RegExp(/^[0-9a-zA-Z_\-\.]+@[0-9a-zA-Z_\-]+(\.[0-9a-zA-Z_\-]+)*$/);
		var c = 0;
		for (c = 0; c < d.length; c++) {
			if ((d[c].strip().match(a) == null)) {
				return b + "\u4e0d\u662f\u6709\u6548\u7684Email\u5730\u5740";
			}
		}
		return true;
	}
}, validateNumeric:function (d, a) {
	if (this.validateRequired(d, a) != true) {
		return true;
	} else {
		var c = new RegExp(/^[0-9]*$/);
		var b = 0;
		for (b = 0; b < d.length; b++) {
			if ((d[b].strip().match(c) == null)) {
				return a + "\u4e0d\u662f\u6709\u6548\u7684\u6570\u5b57";
			}
		}
		return true;
	}
}, validateLen:function (e, a, b, c) {
	if (this.validateRequired(e, c) != true) {
		return true;
	} else {
		var d = 0;
		for (d = 0; d < e.length; d++) {
			if (b) {
				e[d] = e[d].strip();
			}
			if (e[d].length != a) {
				return c + "\u957f\u5ea6\u4e0d\u7b49\u4e8e" + a;
			}
		}
		return true;
	}
}, checkFormField:function (c, b, e, a) {
	var d = this._checkFormField(c, b, e, a);
	if (d == true) {
		return true;
	}
	Bonc.showDialog({title:"\u8f93\u5165\u9519\u8bef", content:d, minHeight:180, height:180, showLoading:function () {
	}});
	return false;
}};
Bonc.extend(Bonc.Form);
Bonc.Document = {_readyExec:[], registerReady:function (a) {
	this._readyExec.push(a);
}, executeReady:function () {
	var a = this._readyExec.pop();
	while (typeof a == "function") {
		a();
		a = this._readyExec.pop();
	}
}, createElementIdRange:0, createElementId:function () {
	return Bonc.newId();
}, colorTableTR:function (a, b) {
	var a = a || ".grid0", b = b || ["odd", "even"], c = b.length;
	jQuery("table" + a + " tbody tr").each(function (d, e) {
		jQuery(this).addClass(b[d % c]);
	});
}, addTitleTip:function (a) {
	a = a || "[titletip][titletip!=\"\"]";
	jQuery(a).hover(function (c) {
		this.top = (c.pageY + 5);
		this.left = (c.pageX + 5);
		var b = this.getAttribute("titletip");
		if (b && b != "") {
			jQuery("body").append("<p id=\"bonc-titletip\" class=\"titletip\" style=\"position:absolute;z-index:7000\">" + this.getAttribute("titletip") + "</p>");
			jQuery("p#bonc-titletip").css("top", this.top + "px").css("left", this.left + "px").css("z-index", 1000).fadeIn("slow");
		}
	}, function () {
		jQuery("p#bonc-titletip").fadeOut("slow").remove();
	});
}, setIframeAutoHeight:function (c, b, a) {
	jQuery("#" + c).load(function () {
		var d = jQuery(this);
		var f = d.data("__heightInterval");
		clearInterval(f);
		b = b || 0;
		var e = (typeof b == "function") ? b() : b;
		d.height(e);
		f = setInterval(function () {
			try {
				var k = jQuery("#" + c);
				var i = k[0].contentDocument || k[0].contentWindow.document;
				var l = (typeof b == "function") ? b() : b;
				var g = (typeof a == "function") ? a() : a;
				var j = i.body.scrollHeight;
				if (!jQuery.browser.msie) {
					j = Math.max(i.body.offsetHeight, i.documentElement.offsetHeight);
				}
				j = (l && j < l) ? l : j;
				j = (g && j > g) ? g : j;
				k.height(j);
			}
			catch (m) {
			}
		}, 200);
		d.data("__heightInterval", f);
	});
}, setIframeAutoWidth:function (c, a, b) {
	jQuery("#" + c).load(function () {
		var e = jQuery(this);
		var f = e.data("__widthInterval");
		clearInterval(f);
		if (!e.data("__overflowX")) {
			e.data("__overflowX", e.css("overflow-x"));
		}
		var d = (typeof a == "function") ? a() : a;
		if (d) {
			e.width(d);
		}
		f = setInterval(function () {
			var j = jQuery("#" + c);
			try {
				var i = j[0].contentDocument || j[0].contentWindow.document;
				var h = (typeof a == "function") ? a() : a;
				var l = (typeof b == "function") ? b() : b;
				var g = i.documentElement.scrollWidth;
				g = (h && g < h) ? h : g;
				g = (l && g > l) ? l : g;
				j.width(g);
			}
			catch (k) {
			}
		}, 200);
		e.data("__widthInterval", f);
	});
}, richtextConfig:{defaultLanguage:"zh-cn", font_names:"Arial;Times New Roman;Verdana;\u5b8b\u4f53;\u9ed1\u4f53;", skin:"office2003", resize_enabled:false, toolbar:"Bonc", toolbar_Bonc:[["Bold", "Italic", "Underline", "Strike", "-", "Subscript", "Superscript"], ["NumberedList", "BulletedList", "-", "Outdent", "Indent", "Blockquote"], ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"], ["Link", "Unlink", "Anchor"], ["Table", "HorizontalRule", "Smiley", "SpecialChar", "PageBreak"], "/", ["Styles", "Format", "Font", "FontSize"], ["TextColor", "BGColor"], ["Maximize", "ShowBlocks", "-", "Undo", "Redo"]]}, configRichtext:function (a) {
	jQuery.extend(Bonc.Document.richtextConfig, a);
}};
Bonc.extend(Bonc.Document);
Bonc.Document.registerReady(Bonc.Document.addTitleTip);
Bonc.Document.registerReady(Bonc.Document.colorTableTR);
jQuery(function () {
	Bonc.Document.executeReady();
});
if (undefined != window.Ajax && Ajax.Updater) {
	Ajax.Updater.addMethods({updateContent:function (d) {
		var c = this.container[this.success() ? "success" : "failure"], a = this.options;
		if (!a.evalScripts) {
			d = d.stripScripts();
		}
		if (Prototype.Browser.IE) {
			d = "<div style=\"display: none;\">&nbsp;</div>" + d;
		}
		if (c = $(c)) {
			if (a.insertion) {
				if (Object.isString(a.insertion)) {
					var b = {};
					b[a.insertion] = d;
					c.insert(b);
				} else {
					a.insertion(c, d);
				}
			} else {
				c.update(d);
			}
		}
	}});
	Ajax.Responders.register({onCreate:function (b) {
		if (b.options && b.options.global != false) {
			if (!$("ajax-indicator")) {
				var a = new Element("DIV", {id:"ajax-indicator", style:"display:none;"}).update("<span>\u8f7d\u5165\u4e2d...</span>");
				document.body.appendChild(a);
			}
			if (Ajax.activeRequestCount > 0) {
				Element.show("ajax-indicator");
			}
		}
	}, onComplete:function (a) {
		Bonc.Ajax.executeCallBack(a.transport);
		if (a.options && a.options.global != false) {
			if ($("ajax-indicator") && Ajax.activeRequestCount < 1) {
				Element.hide("ajax-indicator");
			}
		}
	}});
}
jQuery.ajaxSetup({beforeSend:function (b) {
	if (this.global) {
		var a = jQuery("#ajax-indicator-jquery");
		if (a.size() == 0) {
			a = jQuery("<div id=\"ajax-indicator-jquery\" class=\"ajaxLoading\" style=\"display:none;\">\u8f7d\u5165\u4e2d...</div>").appendTo(document.body);
		}
		a.show();
	}
}, complete:function (a) {
	Bonc.Ajax.executeCallBack(a);
	if (this.global) {
		jQuery("#ajax-indicator-jquery").hide();
	}
}});
Bonc.Ajax = {_callBack:[], registerCallBack:function (a) {
	this._callBack.push(a);
}, executeCallBack:function (b) {
	for (var a = 0; a < this._callBack.length; a++) {
		this._callBack[a](b);
	}
}, linkThisPageDefer:function (b, a) {
	this.updateContainer(a, b);
}, linkThisPagebyParamDefer:function (b, a, c) {
	this.updateContainer(a, b, c);
}, linkThisPage:function (b, a) {
	this.updateContainer(a, b);
}, linkThisPagebyParam:function (b, a, c) {
	this.updateContainer(a, b, c);
}, updateContainer:function (a, b, d) {
	if (a && b) {
		var c = jQuery("#" + a);
		if (c.size() != 0) {
			jQuery.ajax({type:"POST", url:Bonc.toFullPath(b), data:d || "", success:function (e) {
				c.html(e);
			}, error:function () {
				c.html("<span class=\"ajaxUpdateError\">" + ((d && d.failMsg) || "\u83b7\u53d6\u5185\u5bb9\u5931\u8d25!") + "</span>");
			}});
		} else {
			Bonc.alert("\u5bb9\u5668\u6307\u5b9a\u9519\u8bef\uff01<p style=\"padding-top:3px;\">\u539f\u56e0\uff1a\u9875\u9762\u4e0d\u5b58\u5728id\u4e3a\"" + a + "\"\u7684\u5143\u7d20\u3002</p>");
		}
	} else {
		Bonc.alert("\u53c2\u6570\u9519\u8bef\uff01");
	}
}, importJS:function (a) {
	jQuery.getScript(Bonc.toFullPath(a));
}};
Bonc.Ajax.registerCallBack(function () {
	Bonc.Document.addTitleTip();
});
Bonc.Ajax.registerCallBack(function () {
	Bonc.Document.colorTableTR();
});
Bonc.extend(Bonc.Ajax);

