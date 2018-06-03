Ext.define("core.tj_led_kanban.view.item.MxList",{
	extend : "Ext.window.Window",
	alias : 'widget.tj_led_mx_list_kb',
	width:500,
	maximized:true,
	layout:'fit',
	items:[{
		xtype:'grid',
		columns:[
			{xtype:'rownumberer',text:'序号',width:100},
			{text:'在制数量',dataIndex:'在制数量',width:250},
			{text:'规程',dataIndex:'SpecificationName',flex:1}
		],
		store:'core.tj_led_kanban.store.mx.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.tj_led_kanban.store.mx.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}]
	}]
});