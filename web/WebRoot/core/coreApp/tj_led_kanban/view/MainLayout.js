Ext.define("core.tj_led_kanban.view.MainLayout",{
	extend:'Ext.Panel',
	alias:'widget.tj_led_kanban',
	layout:'border',
	items:[
		{xtype:'tj_led_kb_navigation',region:'west'},
		{xtype:'tj_led_kb_content',region:'center'}
	]
	
});
