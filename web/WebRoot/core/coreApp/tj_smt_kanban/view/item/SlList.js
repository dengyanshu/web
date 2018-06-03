Ext.define("core.tj_smt_kanban.view.item.SlList",{
	extend : "Ext.window.Window",
	alias : 'widget.tj_smt_sl_list_kb',
	width:500,
	maximized:true,
	layout:'fit',
	items:[{
		xtype:'grid',
		columns:[
			{text:'序号',dataIndex:'RowNum',width:50},
			{text:'工作中心',dataIndex:'WorkCenterName',width:150},
			{text:'料号',dataIndex:'ProductName',width:150},
			{text:'上料数量',dataIndex:'OnLoadMount',width:150},
			{text:'剩余数量',dataIndex:'SurplusMount',width:150},
			{text:'槽位',dataIndex:'SLotNO',width:150},
			{text:'机台号',dataIndex:'StationNo',width:150},
			{text:'单位数量',dataIndex:'UnitQty',width:150},
			{text:'可生产板数',dataIndex:'CanUsePCBQty',flex:1}
		],
		store:'core.tj_smt_kanban.store.sl.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.tj_smt_kanban.store.sl.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}]
	}]
});