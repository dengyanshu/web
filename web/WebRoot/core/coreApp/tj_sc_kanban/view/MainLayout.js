Ext.define("core.tj_sc_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.tj_sc_kanban',
	layout:'border',
	items:[
		{xtype:'tj_sc_kb_navigation',region:'west'},
		{xtype:'tj_sc_kb_content',region:'center'}
	]
	
});
