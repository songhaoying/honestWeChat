getContextPath = function(){
    var contentPath = '';
    var script = document.getElementsByTagName('script');
    for (var q = 0; q < script.length; q++) {
        var h = script[q].src, i;
        if (h && (i = h.indexOf('resources/dss4/js/extJsExtend.js')) >= 0) {
            var j = h.indexOf('://');
            contentPath = j < 0 ? h.substring(0, i - 1) : h.substring(h.indexOf('/', j + 3), i - 1);
            return contentPath;
        }
    };
    return contentPath;
}

document.globalVarible={};
document.globalVarible.params={}

document.globalVarible.getParamForUrl=function(){
	var _gParams=document.globalVarible.params;
	var _tStr ='';
	for(var key in _gParams){
		//alert(gParams[key])
		_tStr+=(key+'='+_gParams[key]+'&');
	}
	//alert(_tStr);
	return _tStr;
}

document.globalVarible.setParam=function(param){
	var _str = '';
	for(var key in param){
		_str += ("key is "+ key +"value is :" + param[key]+"\n");
	}
	//alert(_str);
	var _gParams=document.globalVarible.params;
	Ext.apply(_gParams,param);
}

function grid2JsonStr(grid){
	var ret = '{';
		//列模型，包括列名，是否显示，列Id
		var colMode=grid.colModel.config;
		ret +=('colMode:{length:'+colMode.length);
			for(var i=0;i<colMode.length;i++){
				ret +=(','+i+':{');
					ret+=('hidden:'+colMode[i]['hidden']+',');
					ret+=('header:"'+colMode[i]['header']+'",');
					ret+=('id:"'+colMode[i]['id']+'"');
				ret += '}';
			}
		ret+='}'
		//数据区，包括每行的数据
		var data = grid.store.data.items;
		ret+=(',data:{length:'+data.length);
			for(var i=0; i<data.length;i++){
				ret+=(','+i+':{nouse:true');
					for(var key in data[i].data){
						ret+=(','+key+':"'+data[i].data[key]+'"');
					}
				ret+='}';
			}
		ret+='}';
		//附加信息区，包括表格名称，多行表头的信息等
		ret+=',info:{';
			ret+='fileName:"';
			ret+= 'ppp';
			ret+='"';
		ret+='}'
	ret += '}';
	return ret;
}

function getExcel(type, gridOrTableId,tableName,extId,exportHref,ifExportGridPagi){
		alert("ssss");
		BoncDssExt.DssExt.exportExcel(exportHref,ifExportGridPagi,event);
		
	
}
function down(url){
	alert(url);
	if( document.all ) //IE 
		{ 
		xUrl = getContextPath()+"/ExpExcel/"+ url;
		xUrl = encodeURI(xUrl);
		//alert(xUrl);
		//window.open(xUrl);
		//window.showModalDialog(xUrl,'','dialogHeight=200px;dialogWidth=200px;center=yes;resizable=no');
		window.location.href=xUrl;
		}
	else 
		{ 
		window.open(url);
		}
} 

function table2json(tableId){
	var ret = '<table border="1">';
	var table1 = jQuery("#"+tableId).remove("tr[type='navigation']").remove("script");
	//alert(table1.html())
	var th = jQuery("#"+tableId+" thead ");
	ret += th.html();
	var tb = jQuery("#"+tableId+" tbody[type='data']");
	//alert(tb[1].html());
	//alert(tb.length)
	jQuery.each(tb,function(i,n){
		ret += jQuery(n).html();
		//alert(jQuery(n).html());
	});
	ret += '</table>';
	
	return ret;

}


/**
function table2json(tableId){
	var jsonData = '{';
	jsonData +='colMode:{';
	//处理表头
	var head = jQuery("#"+tableId +" thead tr th");
	jsonData+='length:'+head.length;
    jQuery.each(head,function(i,n){
		jsonData+=(','+i+':{');
		jsonData +='hidden:false';
		jsonData +=(',header:"'+jQuery(n).text()+'"');
		jsonData +=(',id:"'+i+'"');
		jsonData+='}';
	})
	jsonData+='}'
	//处理表格体
	var rows = jQuery("#"+tableId+" tbody tr[type!='navigation']");
	jsonData+=',data:{';
	jsonData +=('length:'+rows.length);
	jQuery.each(rows,function(i,n){
		jsonData+=(','+i+':{nouse:true');
		var cells = jQuery(n).children('td');
		jQuery.each(cells,function(j,m){
			jsonData +=(','+j+':"'+jQuery(m).text()+'"');
		})
		jsonData+='}';
	})
	jsonData+='}';
	jsonData+='}';
	alert(jsonData);
	return jsonData;
}
**/