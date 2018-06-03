Ext.define("core.tj_zm_kanban.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.tj_zm_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'天津zm看板',
			html:'<img src="/web/core/css/image/title/tj_zm_kanban.png"/>'
		}
	]
	
        
});