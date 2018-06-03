Ext.define("core.ck_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.ck_kanban',
	layout:'border',
	items:[
		{xtype:'ck_kb_navigation',region:'west'},
		{xtype:'ck_kb_content',region:'center'}
	]
	
});
