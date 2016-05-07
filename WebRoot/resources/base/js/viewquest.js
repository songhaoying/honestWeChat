if(Object.isUndefined(Bonc))
  throw("viewquest.js requires including bonc main.js library");
/**
 * 查看问卷
 * 调用方式：
 * 显示：
 * 	ViewQuest.fill(container,questData); //container 容器 questData问卷数据
 * 问卷结果：
 *  ViewQuest.collectQuestResult(form);//form 问卷所在form
 */
var ViewQuest={
css: {
	'quest':'quest',
	'el':'el',
	'elTable':'el-table',
	'elTableLvl':'el-tablelvl',
	'elTd':'el-td',
	'elTdLvl':'el-tdlvl',
	'elBlock':'el-block',
	'elInline':'el-inline',
	'elHidden':'el-hidden',
	'elHiddenTable':'el-hiddentable',
	'elSpantext':'el-spantext',
	'elInputCheckbox':'el-input-checkbox',
	'elInputRadio':'el-input-radio',
	'elInputText':'el-input-text',
	'elTextarea':'el-textarea',
	'elAlink':'el-alink',
	'elImg':'el-img',
	'elDivText':'el-divtext'
},

/*
 填充元素
	REL_LAG 
	1	本节点为根节点    
	2	本节点是上一个节点的子节点  
	3	本节点是上一个节点的兄弟
	4	本节点是上一个节点的祖先的兄弟
	REL_LEAD
	1	本节点为最后一个节点                   
	2	本节点是下一个节点的父节点 
	3	本节点是下一个节点的兄弟                           
	4	本节点是下一个节点的兄弟的子节点
 */
fill: function(container,questData){
	container=$(container);
	$A(Object.keys(questData)).each(function (questId,ind1){
		var container2=new Element('div',{'class':ViewQuest.css.quest+' '+ViewQuest.css.quest+questId});
		container.appendChild(container2);
		
		var table=new Element('table',{'cellspacing':'0','cellpadding':'0','border':'0','width':'100%',
			'class':ViewQuest.css.el+' '+ViewQuest.css.elBlock+' '+ViewQuest.css.elTable+' '+ViewQuest.css.elTableLvl+'1'});
		container2.appendChild(table);
		var tbody=new Element('tbody');
		table.appendChild(tbody);
		var tr=new Element('tr');
		tbody.appendChild(tr);
		var td=null;
		questData[questId].each(function (elData,ind){
			td=new Element('td',{
				'class':ViewQuest.css.el+' '+ViewQuest.css.elTd+' '+(elData.EL_INLINE==1?ViewQuest.css.elInline:ViewQuest.css.elBlock)+' '+ViewQuest.css.elTdLvl+elData.LVL});
			tr.appendChild(td);
			//填充元素内容
			var div=new Element('div',{'class':ViewQuest.css.el+' '+ViewQuest.css.elDivText+' '+ViewQuest.css.elDivText+elData.LVL});
			td.appendChild(div);
			ViewQuest.fillElContent(div,elData,questId);
			//如果下一个元素是本元素的兄弟，并且不在同一行，则换行
			if(elData.REL_LEAD ==3 && elData.EL_INLINE!=1){
				tbody = tr.up('tbody');
				tr=new Element('tr');
				tbody.appendChild(tr);
			}else if(elData.REL_LEAD ==2){//如果元素有子元素，则创建一个table以用来存放子元素
				var tmpcss=ViewQuest.css.el+' ';
				
				tmpcss+=ViewQuest.css.elTable+' '+(ViewQuest.css.elTableLvl+(elData.LVL+1))+' ';
				if(elData.CHILD_HIDDEN==1){
					tmpcss+=ViewQuest.css.elHiddenTable+' '+ViewQuest.css.elHidden;
				}
				//如果下一个元素是本元素的子元素，并且在同一行
				if(elData.CHILD_INLINE==1){
					//td=new Element('td',{'class':ViewQuest.css.el+' '+ViewQuest.css.elTd+' '+(elData.EL_INLINE==1?ViewQuest.css.elInline:ViewQuest.css.elBlock)+' '+ViewQuest.css.elTdLvl+(elData.LVL+1)});
					td=new Element('td');
					tr.appendChild(td);
				}
				
				table=new Element('table',{'cellspacing':'0','cellpadding':'0','border':'0','class':tmpcss});
				td.appendChild(table);
				tbody=new Element('tbody');
				table.appendChild(tbody);
				tr=new Element('tr');
				tbody.appendChild(tr);
			}else if(elData.REL_LEAD ==4){//本节点是下一个节点的兄弟的子节点
				var size=elData.LVL-elData.LEAD_LVL;
				if(size>0){
					var tmptd=tr.up('td',size-1)||td;
					tr=tr.up('tr',size-1)||tr;
					if(!tmptd.hasClassName(ViewQuest.css.elInline)){
						tbody=tr.up('tbody');
						tr=new Element('tr');
						tbody.appendChild(tr);
					}
				}
			}
		});
	});
},
/*
  填充元素的内容
	EL_TYPE
	01	复选框
	02	单选框
	03	下拉框--暂未实现
	04	文本框
	05	文本内容
	06	超链接
	07	日历
	08	文本域
  */
fillElContent:function(div,elData,questId){
	var prefix='questResult.el_'+questId+'_';

	var tmpel1;
	var tmpel2;
	if(elData.EL_TYPE=='01'){
		tmpel1=new Element('input',{'class':ViewQuest.css.el+' '+ViewQuest.css.elInputCheckbox+' '+ViewQuest.css.elInputCheckbox+elData.LVL,'type':'checkbox',
									'name':prefix+elData.PARENT_EL_ID,
									'value':elData.EL_ID});
		
		tmpel2=new Element('span',{'class':ViewQuest.css.el+' '+ViewQuest.css.elSpantext+' '+ViewQuest.css.elSpantext+elData.LVL}).update(elData.EL_HTML);
		div.appendChild(tmpel1);
		div.appendChild(tmpel2);
		
		if(elData.IS_SELECTED==1){
			tmpel1.checked='checked';
		}
	}else if(elData.EL_TYPE=='02'){
		tmpel1=new Element('input',{'class':ViewQuest.css.el+' '+ViewQuest.css.elInputRadio+' '+ViewQuest.css.elInputRadio+elData.LVL,
			'type':'radio',
			'name':prefix+elData.PARENT_EL_ID,
			'value':elData.EL_ID});
		tmpel2=new Element('span',{'class':ViewQuest.css.el+' '+ViewQuest.css.elSpantext+' '+ViewQuest.css.elSpantext+elData.LVL}).update(elData.EL_HTML);
		div.appendChild(tmpel1);
		div.appendChild(tmpel2);
		if(elData.IS_SELECTED==1){
			tmpel1.checked='checked';
		}
	}else if(elData.EL_TYPE=='04'){
		tmpel1=new Element('input',{'class':ViewQuest.css.el+' '+ViewQuest.css.elInputText+' '+ViewQuest.css.elInputText+elData.LVL,
			'type':'text',
			'name':prefix+elData.EL_ID});
		tmpel2=new Element('span',{'class':ViewQuest.css.el+' '+ViewQuest.css.elSpantext+' '+ViewQuest.css.elSpantext+elData.LVL}).update(elData.EL_HTML);
		div.appendChild(tmpel2);
		div.appendChild(tmpel1);
	}else if(elData.EL_TYPE=='05'){
		tmpel1=new Element('span',{'class':ViewQuest.css.el+' '+ViewQuest.css.elSpantext+' '+ViewQuest.css.elSpantext+elData.LVL}).update(elData.EL_HTML);
		div.appendChild(tmpel1);
	}else if(elData.EL_TYPE=='06'){
		tmpel1=new Element('a',{'class':ViewQuest.css.el+' '+ViewQuest.css.elAlink+' '+ViewQuest.css.elAlink+elData.LVL,
			'href':'javascript:void(0)'}).update(elData.EL_HTML);
		div.appendChild(tmpel1);
	}else if(elData.EL_TYPE=='07'){
		tmpel2=new Element('span',{'class':ViewQuest.css.el+' '+ViewQuest.css.elSpantext+' '+ViewQuest.css.elSpantext+elData.LVL}).update(elData.EL_HTML);
		tmpel1=new Element('input',{'type':'text',
				'name':prefix+elData.EL_ID,
				'class':ViewQuest.css.el+' '+ViewQuest.css.elInputText+' '+ViewQuest.css.elInputText+elData.LVL,
				'readonly':'readonly',
				'style':'cursor:pointer;'});
		var tmpel3=new Element('img',{'src':Bonc.getContextPath()+'/resources/niche/img/dateIcon.gif',
			'class':ViewQuest.css.el+' '+ViewQuest.css.elImg+' '+ViewQuest.css.elImg+elData.LVL
			});
		div.appendChild(tmpel2);
		div.appendChild(tmpel1);
		div.appendChild(tmpel3);
		Event.observe(tmpel1,'click',function(event){
			var el=Event.element(event);
			SelectDate(el,'yyyy-MM-dd');
		});
		Event.observe(tmpel3,'click',function(event){
			SelectDate(tmpel1,'yyyy-MM-dd');
		});
	}else if(elData.EL_TYPE=='08'){
		tmpel1=new Element('textarea',{'class':ViewQuest.css.el+' '+ViewQuest.css.elTextarea+' '+ViewQuest.css.elTextarea+elData.LVL,
			'name':prefix+elData.EL_ID});
		tmpel2=new Element('span',{'class':ViewQuest.css.el+' '+ViewQuest.css.elSpantext+' '+ViewQuest.css.elSpantext+elData.LVL}).update(elData.EL_HTML);
		div.appendChild(tmpel2);
		div.appendChild(tmpel1);
	}
	if(tmpel1){
		//注册元素的click事件，但存在使用元素进行导航时使用
		Event.observe(tmpel1,'click',function(event){
			//当子元素有隐藏属性时
			if(elData.CHILD_HIDDEN==1){
				var el=Event.element(event);
				var tmpTable=el.up('div').next('table.'+ViewQuest.css.elHiddenTable) ||(el.up('td').next('td')?el.up('td').next('td').down('table.'+ViewQuest.css.elHiddenTable):null);
				
				//把当前元素的相关元素隐藏
				var tmpTbody=el.up('tbody');
				if(tmpTbody){
					tmpTbody.select('table.'+(ViewQuest.css.elTableLvl+(elData.LVL+1))+'.'+ViewQuest.css.elHiddenTable).each(function(e){
						if(tmpTable !=e)
							e.addClassName(ViewQuest.css.elHidden);
					});
				}
				//设置当前元素的关联隐藏元素的显示状态
				if(tmpTable){
					if(tmpTable.hasClassName(ViewQuest.css.elHidden)){
						tmpTable.removeClassName(ViewQuest.css.elHidden);
					}else{
						tmpTable.addClassName(ViewQuest.css.elHidden);
					}
				}
			}
		});	
	}
	return div;
}
};