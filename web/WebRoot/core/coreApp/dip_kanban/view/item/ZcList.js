Ext.define("core.dip_kanban.view.item.ZcList",{
	extend : "Ext.window.Window",
	alias : 'widget.dip_zc_list_kb',
	width:500,
	maximized:true,
	layout:'fit',
	items:[{
		xtype:'grid',
		loadMask : true,
		columns:[
			{text:'序号',dataIndex:'RowNum',width:100},
			{text:'工作中心',dataIndex:'WorkCenterName',width:250},
			{text:'工单数量',dataIndex:'MOQty',width:250},
			{text:'工序',dataIndex:'WorkingProcedure',width:250},
			{text:'产出数量',dataIndex:'OutputQty',width:250},
			{text:'在制数量',dataIndex:'OnMakeQty',flex:1}
		],
		store:'core.dip_kanban.store.zc.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.dip_kanban.store.zc.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}]
	}]
});