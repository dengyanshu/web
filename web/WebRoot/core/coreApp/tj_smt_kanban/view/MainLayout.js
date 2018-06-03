Ext.define("core.tj_smt_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.tj_smt_kanban',
	layout:'border',
	items:[
		{xtype:'tj_smt_kb_navigation',region:'west'},
		{xtype:'tj_smt_kb_content',region:'center'}
	]
	
});
