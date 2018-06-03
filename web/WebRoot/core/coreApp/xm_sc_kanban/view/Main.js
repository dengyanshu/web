Ext.define("core.xm_sc_kanban.view.Main", {
		extend : "Ext.Panel",
		alias : 'widget.xm_sc_kb_main',
   	    layout:'card',
   	    items:[
   	    	{xtype:'xm_sc_kb_lines'},
   	    	{xtype:'xm_sc_kb_item'}
   	    ]
       
});