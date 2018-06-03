Ext.define("core.dc_mo_kanban.view.Main", {
		extend : "Ext.Panel",
		alias : 'widget.dc_mo_kb_main',
   	    layout:'card',
   	    items:[
   	    	{xtype:'dc_mo_kb_lines'},
   	    	{xtype:'dc_mo_kb_moview'}
   	    ]
       
});