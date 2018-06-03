Ext.define("core.manpower.view.NorthPanel",{
	extend:'Ext.Panel',
	alias:'widget.manpower-northpanel',
	region:'north',
	layout:'border',
	
	height: 300,
	
	items:[
	   {xtype:"m-northpanel-north"},
	   {xtype:'m-northpanel-west'},
	   {xtype:'m-northpanel-center'},
	   {xtype:'m-northpanel-east'}
	]


	

});