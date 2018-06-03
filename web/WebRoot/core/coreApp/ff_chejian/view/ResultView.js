Ext.define("core.ff_chejian.view.ResultView",{
	extend:'Ext.grid.Panel',
	region:'center',
	alias:'widget.ff_chejian_listview',
	store:'core.ff_chejian.store.Store',
	columns : [
			//{header : 'PickingListId',dataIndex : 'PickingListId',width : 120},
			{header : '工单',dataIndex : 'MOName',width : 160},
			{header : '线体',dataIndex : 'WorkcenterName',width : 125}, 
			{header : '工序',dataIndex : 'WorkprocedureFlowName',width : 125},
			{header : '料号',dataIndex : 'ProductName',width : 120},
			{header : '描述',dataIndex : 'ProductDescription',width : 160},
			
			{header : '工单批量',dataIndex : 'MOQtyRequired',width : 100},
			{header : '用量',dataIndex : 'UnitQty',width : 100}, 
			{header : '物料需求量',dataIndex : 'RequiredMount',width : 100},
			{header : '已发数量',dataIndex : 'SendingMount',width : 100},
			{header : '欠料数量',dataIndex : 'OweMount',width : 100},
			
		
			{header : '上料数量',dataIndex : 'OnLoadMount',width : 100},
			{header : '待发数量',dataIndex : 'LStorePlusMount',width : 100}, 
			{header : '剩余数量',dataIndex : 'SurplusMount',width : 100},
			{header : '可生产板数',dataIndex : 'CanUserPCBQty',width : 100},
			{header : '状态',dataIndex : 'MStatus',width : 100}
			
	]
//	dockedItems:[{
//		xtype:'pagingtoolbar',
//		store : 'core.ff_chejian.store.Store',
//		dock:'bottom',
//		displayInfo:true,
//		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
//		emptyMsg:'没有数据'		
//	}]
});