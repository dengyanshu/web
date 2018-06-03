Ext.define("core.smt_tp_kanban.view.Main", {
		extend : "Ext.Panel",
		alias : 'widget.smt_tp_kb_main',
   	    layout:'card',
   	    items:[
   	    	{xtype:'smt_tp_kb_lines'},
   	    	{xtype:'smt_tp_kb_moview'}
   	    	//{xtype:'smt_line_kb_list'}
   	    ]
       
});