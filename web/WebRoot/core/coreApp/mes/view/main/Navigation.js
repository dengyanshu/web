/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 
 
 Ext.define("core.mes.view.main.Navigation",{
 	extend:'Ext.Panel',
 	alias:'widget.mesnavigation',
 	title:'功能列表',
 	iconCls:'operate_tree',
 	id:'mes_navigation',
 	collapsible:true,
 	split:true,
 	margins:'5 2 5 5',
 	width:220,
	layout:{
		//布局为卡片布局
		type:"accordion",	
		//有动画效果
		animate:true		
	},
	items:[
		{xtype:'tree_report_forms'},   //报表查询
		{xtype:'panel',title:'其它项目一',iconCls:"operate_tree"}
	]
 });