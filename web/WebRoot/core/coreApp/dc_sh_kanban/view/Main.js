Ext.define("core.dc_sh_kanban.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.dc_sh_kanban_main',
	layout:'fit',
	//bodyStyle: 'background:black; padding:10px;',
	items:[
		{xtype:'dc_sh_kanban_result'}
	]
   }
);