Ext.define("core.silou_line_kanban.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.silou_line_kanban_main',
	layout:'border',
	//bodyStyle: 'background:black; padding:10px;',
	items:[
		{xtype:'silou_line_kanban_listview'},
		{xtype:'silou_line_kanban_search'},
		{xtype:'silou_line_kanban_chartview'}
	]			
});