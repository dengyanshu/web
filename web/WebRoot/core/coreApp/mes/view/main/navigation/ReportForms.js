 /***************************************************************************
  								<报表功能模块（树）> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.navigation.ReportForms",{
 	extend:"Ext.Panel",
 	alias:'widget.tree_report_forms',
 	title:'报表查询',
 	iconCls:"operate_tree",
 	layout:'fit',
 	items:[
 		{
 			xtype:'reportforms'					//添加一棵树
 		}
 	]
 	
 });