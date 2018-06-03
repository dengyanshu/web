 /***************************************************************************
  								<报表功能模块（树）> 
 ***************************************************************************/
 
  Ext.define("core.xigao.view.main.navigation.ReportForms",{
 	extend:"Ext.Panel",
 	alias:'widget.tree_report_forms',
 	title:'报表查询',
 	iconCls:"operate-tree",
 	layout:'fit',
 	items:[
 		{
 			xtype:'xigao_reportforms'					//添加一棵树
 		}
 	]
 	
 });