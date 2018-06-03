Ext.define("core.kanban.view.Content",{
	extend:'Ext.TabPanel',
	alias:'widget.kanban_content',
	ActiveTab:0,				//默认激活的页面
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