Ext.define("core.iqc_kanban.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.iqc_kanban_main',
	layout:'border',
	items:[
	    {xtype:'iqc_kanban_search'},
		{xtype:'iqc_kanban_listview'}
	]			
});