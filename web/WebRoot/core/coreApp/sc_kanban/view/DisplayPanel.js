Ext.define("core.sc_kanban.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.sc_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'仓库看板',
			html:'<img src="/web/core/css/image/title/sc_kanban.png"/>'
		}
	]
	
        
});