/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 Ext.define("core.course_manager.view.Navigation",{
 	extend:'Ext.tree.TreePanel',
 	alias:'widget.coursemanage_navigation',
    autoScroll:true, //自动加载滚动条
    rootVisible:false,//隐藏主节点
    border:false,	//
    animate:true,	//开启动画展示
    lines:true,
    height:600,
 	title:'功能列表',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
 	/*
	layout:{
		type:"accordion",	
		animate:true		
	},
	*/
	store:'core.course_manage.store.Tree'
 });