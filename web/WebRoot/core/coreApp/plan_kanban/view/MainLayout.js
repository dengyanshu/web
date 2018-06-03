Ext.define("core.plan_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.plan_kanban',
	layout:'border',
	items:[
		{xtype:'plan_kb_navigation',region:'west'},
		{xtype:'plan_kb_content',region:'center'}
	]
	
});
