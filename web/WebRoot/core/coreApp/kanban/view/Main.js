Ext.define("core.kanban.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.kanban',
	layout:'border',
	items:[
		{xtype:'kanban_navigation',region:'west'},
		{xtype:'kanban_content',region:'center'}
	]
});