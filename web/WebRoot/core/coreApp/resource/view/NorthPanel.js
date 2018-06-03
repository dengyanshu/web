Ext.define("core.resource.view.NorthPanel",{
	extend:'Ext.Panel',
	alias:'widget.resource-northpanel',
	region:'north',
	layout:'border',
	
	height: 180,
	
	items:[
	   {xtype:"m-northpanel-north"}
	   //{xtype:'m-northpanel-west'},
//	   {xtype:'m-northpanel-center'}
	   //{xtype:'m-northpanel-east'}
	]


	
});