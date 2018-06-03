Ext.define("core.xm_line_kanban.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.xm_line_kanban_main',
	layout:'border',
	//bodyStyle: 'background:black; padding:10px;',
	items:[
		{xtype:'xm_line_kanban_listview'},
		{xtype:'xm_line_kanban_search'},
		{xtype:'xm_line_kanban_chartview'}
	]			
});