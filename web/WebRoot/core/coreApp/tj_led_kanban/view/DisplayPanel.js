Ext.define("core.tj_led_kanban.view.DisplayPanel",{
	extend:'Ext.TabPanel',
	alias:'widget.tj_led_kb_content',
	ActiveTab:0,
	margins:'5 5 5 0',
	enableTabScroll:true,
	items:[
		{
			xtype:'panel',
			title:'天津LED看板',
			html:'<img src="/web/core/css/image/title/tj_led_kanban.png"/>'
		}
	]
	
        
});