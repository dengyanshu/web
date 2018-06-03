Ext.define("core.smt_rpc_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.smt_rpc_kanban',
	layout:'border',
	items:[
		{xtype:'smt_rpc_kb_navigation',region:'west'},
		{xtype:'smt_rpc_kb_content',region:'center'}
	]
	
});
