Ext.define("core.smt_xbc_kanban.view.Main", {
		extend : "Ext.Panel",
		alias : 'widget.smt_xbc_kb_main',
   	    layout:'card',
   	    items:[
   	    	{xtype:'smt_xbc_kb_lines'},
   	    	{xtype:'smt_xbc_kb_moview'}
   	    	//,{xtype:'smt_xbc_sl_list_kb'}
   	    ]
       
});