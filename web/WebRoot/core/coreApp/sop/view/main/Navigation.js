/***************************************************************************
  								<导航类> 
 ***************************************************************************/
 
 
 Ext.define("core.sop.view.main.Navigation",{
 	extend:'Ext.Panel',
 	alias:'widget.sopnavigation',
 	title:'功能列表',
 	//iconCls:'operate-tree',
 	//id:'sop-navigation',
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
		{xtype:'soptree',title:'SOP',iconCls:"operate-tree"}   //报表查询
		//{xtype:'panel',title:'其它项目',iconCls:"operate-tree"}
	]
 });