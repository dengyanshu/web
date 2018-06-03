Ext.define("core.tj_ck_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.tj_ck_kanban',
	layout:'border',
	items:[
		{xtype:'tj_ck_kb_navigation',region:'west'},
		{xtype:'tj_ck_kb_content',region:'center'}
	]
	
});
