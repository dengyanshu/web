Ext.define("core.ff_cn_kanban.view.Main", {
		extend : "Ext.Panel",
		alias : 'widget.ff_cn_kb_main',
   	    layout:'card',
   	    items:[
   	    	{xtype:'ff_cn_kb_lines'},
   	    	{xtype:'ff_cn_kb_moview'}
   	    	//{xtype:'smt_line_kb_list'}
   	    ]
       
});