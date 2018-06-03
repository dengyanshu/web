Ext.define("core.mes.view.MainFrame",{
	extend:'Ext.Panel',
	alias:'widget.mesframe',
	layout:'border',
	items:[
		{xtype:'mesnavigation',region:'west'},
		{xtype:'mescontent',region:'center'}
	]
	
});