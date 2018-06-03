Ext.define("core.smt_sb_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.smtsb_kanban',
	layout:'border',
	//maximized:true,
	
	items:[
		{xtype:'smtsb_kb_navigation',region:'west'},
		{xtype:'smtsb_kb_content',region:'center'}
	]
	
});
