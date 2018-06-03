Ext.define("core.dip_kanban.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.dip_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'DIP看板',
			html:'<img src="/web/core/css/image/title/dip_kanban.png"/>'
		}
	]
	
        
});