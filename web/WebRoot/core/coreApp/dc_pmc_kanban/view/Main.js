Ext.define("core.dc_pmc_kanban.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.dc_pmc_kanban_main',
	layout:'fit',
	//bodyStyle: 'background:black; padding:10px;',
	items:[
		{xtype:'dc_pmc_kanban_result'}
	]
   }
);