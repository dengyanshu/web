Ext.define("core.smt_jitchaoling.view.ResultView",{
	extend:'Ext.grid.Panel',
	region:'center',
	alias:'widget.smt_jitchaoling_listview',
	store:'core.smt_jitchaoling.store.Store',
	columns : [
			//{header : 'PickingListId',dataIndex : 'PickingListId',width : 120},
			{header : '工单',dataIndex : 'MOName',width : 160},
			{header : '超领单',dataIndex : 'PickingListName',width : 125}, 
			{header : '仓别',dataIndex : 'StockName',width : 125},
			{header : '超领单状态',dataIndex : 'PickingListStates',width : 120},
			{header : 'OA状态',dataIndex : 'OA状态',width : 100}
	],
	dockedItems:[{
		xtype:'pagingtoolbar',
		store : 'core.smt_jitchaoling.store.Store',
		dock:'bottom',
		displayInfo:true,
		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
		emptyMsg:'没有数据'		
	}]
});