/*
 * 这个js的内容暂时只为按日的计划分解和营销日志使用
 * 当活动id得不到（即为空）的时候是为营销日志使用的，反之则是计划分解
 */
daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);    //每月天数
//今日对象
 Today=function () {
    this.now = new Date();
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
    this.day = this.now.getDate();
} 
today = new Today();    //今日对象
year = today.year;      //当前显示的年份
month = today.month;    //当前显示的月份
//显示上月日程
prevMonthc=function (activityPlanId,deptId,assignMonth,actionName,methodName) {
	if ((month - 1) < 0) {
        month = 11;
        year--;
    } else {
        month--;
    }
    assignMonth=year+'年'+(month+1)+'月';
    $('prevMonth').src=Bonc.getContextPath()+"/resources/app/img/ultimo_r.gif";
    $('thisMonth').src=Bonc.getContextPath()+"/resources/app/img/instant_b.gif";
    $('nextMonth').src=Bonc.getContextPath()+"/resources/app/img/proximo_b.gif";
    fillBox(activityPlanId,deptId,assignMonth,actionName,methodName);              //填充每日单元格
}

//显示下月日程
nextMonthc=function (activityPlanId,deptId,assignMonth,actionName,methodName) {
	 if((month + 1) > 11) {
        month = 0;
        year++;
    } else {
        month++;
    }
    assignMonth=year+'年'+(month+1)+'月';
    $('prevMonth').src=Bonc.getContextPath()+"/resources/app/img/ultimo_b.gif";
    $('thisMonth').src=Bonc.getContextPath()+"/resources/app/img/instant_b.gif";
    $('nextMonth').src=Bonc.getContextPath()+"/resources/app/img/proximo_r.gif";
    fillBox(activityPlanId,deptId,assignMonth,actionName,methodName);              //填充每日单元格
}

//显示本月日程
thisMonthc=function(activityPlanId,deptId,assignMonth,actionName,methodName) {
    year = today.year;
    month = today.month;
    assignMonth=year+'年'+(month+1)+'月';
    $('prevMonth').src=Bonc.getContextPath()+"/resources/app/img/ultimo_b.gif";
    $('thisMonth').src=Bonc.getContextPath()+"/resources/app/img/instant_r.gif";
    $('nextMonth').src=Bonc.getContextPath()+"/resources/app/img/proximo_b.gif";
    fillBox(activityPlanId,deptId,assignMonth,actionName,methodName);              //填充每日单元格
}

//根据当前年月填充每日单元格
fillBox=function(activityPlanId,deptId,assignMonth,actionName,methodName) {
	if(assignMonth.strip()=='')
		assignMonth=year+'年'+(month+1)+'月';
	updateDateInfo(assignMonth);                   //更新年月提示
  //清空每日单元格
	var s=$$('td.calBox').size();
	for(var i=0;i<s;i++){
		$$('td.calBox')[i].innerHTML='';
	}
  var dayCounter = 1;                 //设置天数计数器并初始化为1
  var cal = new Date(year, month, 1); //以当前年月第一天为参数创建日期对象
  var startDay = cal.getDay();        //计算填充开始位置
  //计算填充结束位置
  var endDay = startDay + getDays(cal.getMonth(), cal.getFullYear(),daysInMonth) - 1;
  
  //如果显示的是今日所在月份的日程，设置day变量为今日日期
  var day = -1;
  if (today.year == year && today.month == month) {
      day = today.day;
  }
  //从startDay开始到endDay结束，在每日单元格内填入日期信息
  var i;
  for (i=startDay; i<=endDay; i++) {
       if (dayCounter==day) {
          $("calBox" + i).update("<div class='date today' id='" + year + "-" + (month+1) + "-" + dayCounter + "' onclick='openAddBox(this)'>" +
        		  				dayCounter + " (今日)</div><div style='cursor:pointer;' id='e_"+ year + "-" + (month+1) + "-" + dayCounter + "' class='emptyDiv' onclick='openAddBox(this)'></div>");
      } else {
          $("calBox" + i).update("<div class='date' id='" + year + "-" + (month+1) + "-" + dayCounter + "' onclick='openAddBox(this)'>" +
        		  				dayCounter + "</div><div style='cursor:pointer;' id='e_"+ year + "-" + (month+1) + "-" + dayCounter + "' class='emptyDiv' onclick='openAddBox(this)'></div>");
      }
      dayCounter++;
      
  }
  if(i>=36){
	  $('endTr').style.display='block';
  }else{
	  $('endTr').style.display='none';
  }
  getTasks(activityPlanId,deptId,assignMonth,actionName,methodName);                         //从服务器获取任务信息
}

//从服务器获取任务信息
 getTasks=function(activityPlanId,deptId,assignMonth,actionName,methodName) {
	if(methodName!='undefined'&&methodName.strip()!='')
		var url=Bonc.toFullPath(actionName+'!'+methodName);
	else
		var url=Bonc.toFullPath(actionName);
 	new Ajax.Request(url, {
		parameters:{'activityPlanId':activityPlanId,
					'deptId':deptId,
 					'assignMonth':assignMonth},
		asynchronous:false,
		onSuccess: function(transport) {
			var tmp = transport.responseText.evalJSON();
			var size=tmp.size();
			if(activityPlanId.strip()==''){
				for(var i=0;i<size;i++){
					buildTask(tmp[i].logDate, tmp[i].resultId, tmp[i].logContent,tmp[i].partLogContent);
				}
 			}else{
				for(var i=0;i<size;i++){
					buildTask(tmp[i].divideDate, tmp[i].resultId, tmp[i].targetNum);
				}
					
			}
				
		}
	});
}

//根据日期、任务编号、任务内容在页面上创建任务节点
buildTask=function(buildDate, taskId, taskInfo,partContent) {
	//如果当前日期下有日志内容，那么点击日期头就不能再有新增日志的功能
	$(buildDate).style.cursor='auto';
	$(buildDate).writeAttribute({onclick:function(){}});
	$('e_'+buildDate).remove();
	$(buildDate).up(0).insert("<div id='task" + taskId + "' name='"+buildDate+"' class='task' onclick='editTask(this)' title='"+taskInfo+"'>" + partContent + "</div>");
	
}

//判断是否闰年返回每月天数
getDays=function(month, year,daysInMonth) {
  if (1 == month) {
      if (((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400)) {
          return 29;
      } else {
          return 28;
      }
  } else {
      return daysInMonth[month];
  }
}

//更新年月提示
updateDateInfo=function(assignMonth) {
  $("dateInfo").update(assignMonth);
}

//打开新建任务box
openAddBox=function(src) {
	//如果没有参数传递过来，说明当前日期下有过内容，只是被删除了。
	if(src==undefined||src.id==undefined){
		src=this;
	}
	var date=src.id;
	if(date.indexOf('e_')!=-1){
		date=date.substr(2);
	}
	 $("taskDate").innerHTML=date;                    //设置新建日期
	  if($("taskInfo")!=null)
		  $("taskInfo").value="";                         //初始化新建任务内容
	  if($("logInfo")!=null)
		  $("logInfo").value="";                         //初始化新建任务内容
	  var top = YAHOO.util.Dom.getViewportHeight()/2-150;                   //设置左边距
	  var left = YAHOO.util.Dom.getViewportWidth()/2-300 ;                     //设置顶边距
	  //显示新建任务box
	  $("addBox").setStyle({'left':left,'top':top});
	  $('addBox').style.display='block';
	  
}

//向服务器提交新任务信息
addTask=function(activityPlanId,assignMonth,actionName,method) {
  if($("taskInfo")!=null)
	var taskInfo = $F("taskInfo");                //获取任务信息
  else if($("logInfo")!=null)
	var logInfo=$F("logInfo");//获取日志信息
  var buildDate = $("taskDate").innerHTML;          //获取任务日期
  if(method!='undefined'&&method.strip()!='')
	  var url=Bonc.toFullPath(actionName+'!'+method);
  else
	  var url=Bonc.toFullPath(actionName);
 if(assignMonth=='undefined'||assignMonth.strip()==''){
	assignMonth=$('dateInfo').innerHTML.strip();
 }
  if(taskInfo!=undefined){
	  //检查任务信息是否为空
	  if (taskInfo.strip()=="") {
	      alert("请输入任务信息。");
	  } else {
		  var numExp=/[0-9]/;
		  var nums=taskInfo.strip().toArray();
		  for(var j=0;j<nums.length;j++){
		  	  if(numExp.test(nums[j])==false){
				  var errorMsg=taskInfo+'不是正整数！';
				  Bonc.showDialog({title:'提示信息',content:errorMsg});
				  return false;
			  }
		  }
		  new Ajax.Request(url, {
		  		parameters:{'activityPlanId':activityPlanId,
							'assignMonth':assignMonth,
		    				'targetNum':taskInfo,
		  					'divideDate':buildDate},
		  		asynchronous:false,
		  		onSuccess: function(taskId) {                          //回调函数
		            buildTask(buildDate, taskId, taskInfo); //建立任务节点
		        	closeAddBox();                          //关闭新建任务box
		    	}
		  	});
	  }
  }else if(logInfo!=undefined){
	  //检查日志信息是否为空
	  if (logInfo.strip()=="") {
	      alert("请输入日志信息。");
	  } else {
		  
		  new Ajax.Request(url, {
		  		parameters:{'activityPlanId':activityPlanId,
							'assignMonth':assignMonth,
		    				'logContent':logInfo,
		  					'logDate':buildDate},
		  		asynchronous:false,
		  		onSuccess: function(taskId) {                          //回调函数
		  			//处理显示的日志内容的长度，如果文字个数大于20，就要省略
		  			var partContent='';
		  			//alert(taskId+"--");
		  			if(logInfo.length>20){
		  				partContent=logInfo.substr(0,20)+'...';
		  			}else{
		  				partContent=logInfo;
		  			}
		            buildTask(buildDate, taskId.responseText, logInfo,partContent); //建立任务节点
		        	closeAddBox();                          //关闭新建任务box
		    	}
		  	});
	  }
  }
     
}

//关闭新建任务box
closeAddBox=function() {
	$("addBox").style.display='none';
}

//打开编辑任务box
editTask=function(src) {
  $("editTaskDate").innerHTML=src.name;                    //设置修改日期
  $("taskId").value=src.id.substr(4);             //对任务编号隐藏域赋值
  if($("editTaskInfo")!=null)
	  $("editTaskInfo").value=src.innerHTML;          //设置编辑内容
  else if($("editLogInfo")!=null)
	  $("editLogInfo").value=src.title;          //设置编辑内容
   var top = YAHOO.util.Dom.getViewportHeight()/2-150;                   //设置左边距
	var left = YAHOO.util.Dom.getViewportWidth()/2-300 ;                     //设置顶边距
  $("editBox").setStyle({'left':left,'top':top});
  $('editBox').style.display='block';  //显示编辑任务box
}

//删除任务
delTask=function(actionName,method) {
  var taskId = $("taskId").value;                //获取任务编号
  if(method!='undefined'&&method.strip()!='')
	  var url=Bonc.toFullPath(actionName+'!'+method);
  else
	  var url=Bonc.toFullPath(actionName);
  new Ajax.Request(url, {
		parameters:{'resultId':taskId},
		asynchronous:false,
		onSuccess: function() {                                //回调函数
			  $("task" + taskId).remove();           //在页面删除任务节点
			  //删除任务之后，要使点击日期和div空白框都能在此新增日志内容
              var dateId=$('editTaskDate').innerHTML.strip();
			  $(dateId).style.cursor='pointer';
			  $(dateId).writeAttribute({onclick:openAddBox});
			  $(dateId).up(0).insert("<div style='cursor:pointer;' id='e_"+dateId + "' class='emptyDiv' onclick='openAddBox(this)'></div>");
	          closeEditBox();                         //关闭编辑box
	    }
	});
}

//关闭编辑box
closeEditBox=function() {
	$("editBox").style.display='none';
}

//更新任务信息
updateTask=function(actionName,method) {
  var taskId = $("taskId").value; 
  if($("editTaskInfo")!=null)
	  var taskInfo = $("editTaskInfo").value;        //任务内容
  else if($("editLogInfo")!=null)
	  var logInfo=$('editLogInfo').value;//日志内容
  if(method!='undefined'&&method.strip()!='')
	  var url=Bonc.toFullPath(actionName+'!'+method);
  else
	  var url=Bonc.toFullPath(actionName);
  if(taskInfo!=undefined){
	  //检查任务信息是否为空
	  if (taskInfo.strip()=="") {
	      alert("请输入任务信息。");
	  } else {
		  var numExp=/[0-9]/;
		  var nums=taskInfo.strip().toArray();
		  for(var j=0;j<nums.length;j++){
		  	  if(numExp.test(nums[j])==false){
				  var errorMsg=taskInfo+'不是正整数！';
				  Bonc.showDialog({title:'提示信息',content:errorMsg});
				  return false;
			  }
		  }
		 
		  new Ajax.Request(url, {
	  		  parameters:{'resultId':taskId,
	    				  'targetNum':taskInfo},
	  		  asynchronous:false,
	  		  onSuccess: function() {                            //回调函数
	    			 	 $("task" + taskId).update(taskInfo); //更新页面任务内容
	  		  				//更新任务title的内容
	  		  			$("task" + taskId).title=taskInfo;
		       		     closeEditBox();                     //关闭编辑box
		      }
	  	  });
	   }
  }else if(logInfo!=undefined){
	//检查日志信息是否为空
	  if (logInfo.strip()=="") {
	      alert("请输入日志信息。");
	  } else {
		 
		  new Ajax.Request(url, {
	  		  parameters:{'resultId':taskId,
	    				  'logContent':logInfo},
	  		  asynchronous:false,
	  		  onSuccess: function() {                            //回调函数
	    				//更新任务title的内容
	  	  		  		$("task" + taskId).title=logInfo;
    					//处理显示的日志内容的长度，如果文字个数大于20，就要省略
			  			if(logInfo.length>20){
			  				logInfo=logInfo.substr(0,20)+'...';
			  			}
	    			 	 $("task" + taskId).update(logInfo); //更新页面任务内容
		       		     closeEditBox();                     //关闭编辑box
		      }
	  	  });
	   }
	  
  }
}

//返回对象对页面左边距
getLeft=function(src){
  var obj = src;
  var objLeft = obj.offsetLeft;
  while(obj != null && obj.offsetParent != null && obj.offsetParent.tagName != "BODY"){
      objLeft += obj.offsetParent.offsetLeft;
      obj = obj.offsetParent;
  }
  return objLeft;
}

//返回对象对页面上边距
getTop=function(src){
  var obj = src;
  var objTop = obj.offsetTop;
  while(obj != null && obj.offsetParent != null && obj.offsetParent.tagName != "BODY"){
      objTop += obj.offsetParent.offsetTop;
      obj = obj.offsetParent;
  }
  return objTop;
}
