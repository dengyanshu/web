Ext.define("core.smt_sb2_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.smtsb2_kanban',
	layout:'border',
	//maximized:true,
	
	items:[
		{xtype:'smtsb2_kb_navigation',region:'west'},
		{xtype:'smtsb2_kb_content',region:'center'}
	]
	
});
