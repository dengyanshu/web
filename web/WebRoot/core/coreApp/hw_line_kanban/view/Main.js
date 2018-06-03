Ext.define("core.hw_line_kanban.view.Main", {
		extend : "Ext.Panel",
		alias : 'widget.hw_line_kb_main',
   	    layout:'card',
   	    items:[
   	    	{xtype:'hw_line_kb_lines'},
   	    	{xtype:'hw_line_kb_moview'}
   	    ]
       
});