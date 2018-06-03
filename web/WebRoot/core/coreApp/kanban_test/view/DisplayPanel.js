Ext.define("core.kanban_test.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.tj_sc_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'生产看板',
			html:'<img src="/web/core/css/image/title/tj_sc_kanban.png"/>'
		}
	]
	
        
});