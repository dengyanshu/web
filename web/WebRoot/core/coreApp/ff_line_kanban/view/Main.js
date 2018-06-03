Ext.define("core.ff_line_kanban.view.Main", {
		extend : "Ext.Panel",
		alias : 'widget.ff_line_kb_main',
   	    layout:'card',
   	    items:[
   	    	{xtype:'ff_line_kb_lines'},
   	    	{xtype:'ff_line_kb_moview'}
   	    	//{xtype:'smt_line_kb_list'}
   	    ]
       
});