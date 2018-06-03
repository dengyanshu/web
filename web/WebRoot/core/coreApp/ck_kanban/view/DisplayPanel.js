Ext.define("core.ck_kanban.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.ck_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'仓库看板',
			html:'<img src="/web/core/css/image/title/ck_kanban.png"/>'
		}
	]
	
        
});