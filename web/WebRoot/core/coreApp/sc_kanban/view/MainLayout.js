Ext.define("core.sc_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.sc_kanban',
	layout:'border',
	items:[
		{xtype:'sc_kb_navigation',region:'west'},
		{xtype:'sc_kb_content',region:'center'}
	]
	
});
