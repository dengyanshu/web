Ext.define("core.kanban_test.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.kanban_test',
	layout:'border',
	items:[
		{xtype:'tj_sc_kb_navigation',region:'west'},
		{xtype:'tj_sc_kb_content',region:'center'}
	]
	
});
