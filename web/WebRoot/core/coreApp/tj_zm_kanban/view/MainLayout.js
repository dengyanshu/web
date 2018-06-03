Ext.define("core.tj_zm_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.tj_zm_kanban',
	layout:'border',
	items:[
		{xtype:'tj_zm_kb_navigation',region:'west'},
		{xtype:'tj_zm_kb_content',region:'center'}
	]
	
});
