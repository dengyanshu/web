/***************************************************************************
  								<导航类> 
 ***************************************************************************/

 Ext.define("core.xigao.view.main.Navigation",{
 	extend:'Ext.Panel',
 	alias:'widget.xigao_navigation',
 	title:'功能列表',
 	iconCls:'operate-tree',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:200,
	layout:{
		//布局为卡片布局
		type:"accordion",	
		//有动画效果
		animate:true		
	},
	items:[
		{xtype:'tree_report_forms'}   //报表查询
	]
 });