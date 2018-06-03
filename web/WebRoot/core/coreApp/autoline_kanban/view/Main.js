Ext.define("core.autoline_kanban.view.Main",{
	extend:'Ext.Panel',
	alias:'widget.autoline_kanban_main',
	layout:'fit',
	//bodyStyle: 'background:black; padding:10px;',
	items:[
		{xtype:'autoline_kanban_result'}
	]
   }
);