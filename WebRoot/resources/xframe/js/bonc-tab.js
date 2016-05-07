/*
*定义对象 保存菜单的相关属性及相关动作
*/
var MenuClick = Class.create();
MenuClick.prototype={
	initialize : function(lvl,tabname){
		this._index_1="";
		this._index_2="";
		this._lvl=lvl;
		this._tabname=tabname+"_";
		this._e_click=null;
		this._e_lvl_1=null;//一级元素li
		this._e_lvl_2=null;//二级元素ul
		this._e_menu_click=null;
		this._e_menu_move=null;
	},
	//设置一级菜单的序号和二级菜单的序号
	setIndex : function(){
		if(this._lvl=='1'){
			var s_click=this._e_click.id;
			var a_t=s_click.split("_");
			this._index_1=a_t.last();
			this._index_2='';
		}else{
			var s_click=this._e_click.id;
			var a_t=s_click.split("_");
			this._index_2=a_t.last();
			a_t.pop();
			this._index_1=a_t.last();
		}
	},
	//设置一级菜单中li元素
	set_e_lvl_1 :function(){
		if(this._lvl=='1'){
			this._e_lvl_1=this._e_click.up(0);
		}else{
			this._e_lvl_1=$(this._tabname+'id_li_f_'+this._index_1);
		}
	},
	//设置二级菜单中ul元素
	set_e_lvl_2 :function(){
		this._e_lvl_2=$(this._tabname+'id_ul_s_'+this._index_1);
		if(this._e_lvl_2!=null){
			if(this._e_lvl_2.down(0)==undefined){
				this._e_lvl_2=null;
			}
		}		
	},
	//设置第一级菜单的样式
	setstyle_1 : function (){
		//alert(this._lvl);
		var e_temp;
		var a_temp;	
		if(this._lvl=='1'){
			//alert(this._e_lvl_1);
			this._e_lvl_1.down(0).className='sys_nav_a1_sel';	
			
			this._e_lvl_1.className='sys_nav_tab_sel';
			a_temp=this._e_lvl_1.siblings();
			a_temp.each(function(e_t){
					e_t.className='sys_nav_tab';
					e_t.down(0).className='sys_nav_a1';
				});
		}else{
			this._e_lvl_1.siblings().each(function(e_t){
				e_t.className='sys_nav_tab';
				e_t.down(0).className='sys_nav_a1';
			});
			this._e_lvl_1.className='sys_nav_tab_sel';
			this._e_lvl_1.down(0).className='sys_nav_a1_sel';
		}
	},
	//设置第二级菜单的样式
	setstyle_2 : function(){
		//首先隐藏所有二级菜单
		this._e_lvl_1.up(0).siblings('UL').each(function(e_t){
			e_t.setStyle({display:'none',position:'absolute'});
		});
		
		if(this._lvl=='1' && this._e_lvl_2!=null ){
			var e_a_temp;
			var e_ul_temp;
			e_a_temp=this._e_lvl_2.down(0).down(0);
			
			this._e_lvl_2.setStyle({display:'',position:'absolute'});
			
			e_a_temp.className='sys_nav_a2_sel';
			var a_temp=e_a_temp.up(0).siblings();
			a_temp.each(function(e_t){
					e_t.down(0).className='sys_nav_a2';
				});
		}
		if(this._lvl=='2'){
			this._e_lvl_2.setStyle({display:'',position:'absolute'});
			
			$(this._tabname+'id_a_s_'+this._index_1+'_'+this._index_2).className='sys_nav_a2_sel';
			($(this._tabname+'id_a_s_'+this._index_1+'_'+this._index_2).up(0).siblings()).each(function(e_t){
				e_t.down(0).className='sys_nav_a2';
			});
			
		}	
	},
	
	
	
	//点击时的动作
	mouseClick : function (lvl){
		//alert("a");
		var e_click;
		try{
			e_click=Event.element(event);
		}catch(E){
			
		}
		
		if(e_click==null){
			e_click=$(this._tabname+'id_a_f_1');//首个id
			if(e_click==null){
				return null;
			}
		}
		this._e_click=$(e_click);
		this._lvl=lvl;
		this.do_all();
		
		if(this._e_lvl_1!=null && this._e_lvl_2!=null){
			fixSysManuPosition(this._e_lvl_1,this._e_lvl_2);
		}
		this._e_menu_click=Object.clone(this);
		
	},
	
	//二级元素mouse out 时的动作
	mouseOutSecLvl : function(){
		var m_temp_move=this._e_menu_move;
		//判断是否是mouse move动作
		if(m_temp_move!=null){
			//判断鼠标位置是否溢出元素右边
			if(Event.pointerX(event)>Element.viewportOffset(m_temp_move._e_lvl_2).left+(m_temp_move._e_lvl_2).getDimensions().width){
				recoverSrc(this._e_menu_click);
				this._e_menu_move=null;
				return ;	
			}
			//判断鼠标位置是否溢出元素左边
			if(Event.pointerX(event)< Element.viewportOffset(m_temp_move._e_lvl_2).left+5){
				recoverSrc(this._e_menu_click);
				this._e_menu_move=null;
				return ;	
			}
			//判断鼠标位置是否溢出元素下边
			if(Event.pointerY(event)+2>=Element.viewportOffset(m_temp_move._e_lvl_2).top+(m_temp_move._e_lvl_2).getDimensions().height){
				recoverSrc(this._e_menu_click);
				this._e_menu_move=null;	
				return ;
			}
		}else{
			return 0;	
		}
	},

	//mouse over时动作
	mouseOver : function(lvl){
		var e_click;
		try{
			e_click=Event.element(event);
		}catch(E){}
	
		if(e_click==null){
			e_click=$(this._tabname+'id_a_f_1');
			if(e_click==null){
				return null;
			}
		}
		
		this._e_click=$(e_click);
		this._lvl=lvl;
		this.do_all();
		if(this._e_lvl_1!=null && this._e_lvl_2!=null){
			fixSysManuPosition(this._e_lvl_1,this._e_lvl_2);
		}
		this._e_menu_move=Object.clone(this);
	},

	//一级元素mouse out 时的动作
	mouseOutFirLvl:function(){
		//alert("a");
		var m_temp_move=this._e_menu_move;
		var e_1_p=Element.viewportOffset(m_temp_move._e_lvl_1);
		var mouse_top=Event.pointerY(event);
		var limit_p=e_1_p.top+(m_temp_move._e_lvl_1).getDimensions().height;
		if(mouse_top>=limit_p){
			//alert("b");
			if(m_temp_move._e_lvl_2==null){//如果二级菜单是空的话
				//alert("c");
				recoverSrc(this._e_menu_click);
				this._e_menu_move=null;
			}else{
				//alert("d");
				return null;
			}
		}else{
			//alert(this._e_menu_click._e_click.tagName);
			recoverSrc(this._e_menu_click);
			this._e_menu_move=null;
		}
		
	},

	do_all:function(){
			this.setIndex();
			this.set_e_lvl_1();
			this.set_e_lvl_2();
			this.setstyle_1();
			this.setstyle_2();
	}
};
	
//设置元素位置
function fixSysManuPosition(op,oc){
	var pp=Element.viewportOffset(op);//一级元素选择的位置对象
	var pd=op.getDimensions(); //选中的一级元素的尺寸对象
	var cd=oc.getDimensions();//二级元素的尺寸对象
	var l=pp.left+pd.width/2-cd.width/2;//二级元素的left
	var t=pp.top+pd.height;//二级元素的height
	if(l<0)
		l=0;
	else {
		var vw=document.body.getDimensions().width;
		if(l+cd.width>vw)
			l=vw-cd.width;
	}
	oc.setStyle({left:l});
}
	
//恢复原来的菜单样式
function recoverSrc(m_temp){
	if(m_temp!=null){
		m_temp.setstyle_1();
		m_temp.setstyle_2();
		if(m_temp._e_lvl_1!=null && m_temp._e_lvl_2!=null){
			fixSysManuPosition(m_temp._e_lvl_1,m_temp._e_lvl_2);
		}
	}	
}