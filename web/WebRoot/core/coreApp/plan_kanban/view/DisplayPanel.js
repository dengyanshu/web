Ext.define("core.plan_kanban.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.plan_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'生产人力规划',
			html:'<img src="/web/core/css/image/title/sc_kanban.png"/>'
		}
	]
	
        
});