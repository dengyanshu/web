Ext.define("core.smt_line_kanban.view.Main", {
		extend : "Ext.Panel",
		alias : 'widget.smt_line_kb_main',
   	    layout:'card',
   	    items:[
   	    	{xtype:'smt_line_kb_lines'},
   	    	{xtype:'smt_line_kb_moview'}
   	    	//{xtype:'smt_line_kb_list'}
   	    ]
       
});