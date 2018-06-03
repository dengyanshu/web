Ext.define("core.sx_line_kanban.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.sx_line_kanban_main',
	layout:'border',
	//bodyStyle: 'background:black; padding:10px;',
	items:[
		{xtype:'sx_line_kanban_listview'},
		{xtype:'sx_line_kanban_search'},
		{xtype:'sx_line_kanban_chartview'}
	]			
});