Ext.define("core.sop.view.MainFrame",{
	extend:'Ext.Panel',
	alias:'widget.sopframe',
	layout:'border',
	items:[
		{xtype:'sopnavigation',region:'west'},
		{xtype:'sopcontent',region:'center'}
	]
	
});
