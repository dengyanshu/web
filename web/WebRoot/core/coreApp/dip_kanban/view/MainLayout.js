Ext.define("core.dip_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.dip_kanban',
	layout:'border',
	items:[
		{xtype:'dip_kb_navigation',region:'west'},
		{xtype:'dip_kb_content',region:'center'}
	]
	
});
