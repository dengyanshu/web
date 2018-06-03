Ext.define("core.manpower.view.MainPanel",{
	extend:'Ext.panel.Panel',
	alias:'widget.manpower_mainpanel',
	layout:'border',
	items:[
	   {xtype:'manpower-centerpanel'},
	   {xtype:'manpower-northpanel'}
	]

});