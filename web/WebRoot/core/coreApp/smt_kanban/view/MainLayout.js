Ext.define("core.smt_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.smt_kanban',
	layout:'border',
	items:[
		{xtype:'smt_kb_navigation',region:'west'},
		{xtype:'smt_kb_content',region:'center'}
	]
	
});
