Ext.define("core.ff_moname.view.ResultView",{
	extend:'Ext.grid.Panel',
	//region:'center',
	layout:'fit',
	alias:'widget.ff_moname_listview',
	store:'core.ff_moname.store.Store',
	columns : [
	        {header : '线体',dataIndex : 'WorkcenterName',width : 160},
			{header : '工单',dataIndex : 'MOName',width : 160},
			{header : '机型',dataIndex : 'ProductDescription',width : 125}, 
			{header : '工单批量',dataIndex : 'MOQtyRequired',width : 125},
			{header : '工段',dataIndex : 'workprocedureFlowDescription',width : 120},
			{header : '班次',dataIndex : 'ShiftName',width : 100},
			
			{header : '计划产出',dataIndex : 'StandardProductivity',width : 160},
			{header : '实际产出',dataIndex : 'QTY',width : 160},
			{header : '产出差异',dataIndex : 'Difference',width : 125}, 
			{header : '计划达成率',dataIndex : 'Efficiency',width : 125},
			{header : '未达成原因',dataIndex : 'Cause',width : 120},
			{header : '负责组长',dataIndex : 'Principal',width : 100}
			
		
	],
	dockedItems:[{
		xtype:'pagingtoolbar',
		store : 'core.ff_moname.store.Store',
		dock:'bottom',
		displayInfo:true,
		displayMsg:'第{0} 到 {1} 条数据 共{2}条',
		emptyMsg:'没有数据'		
	}]
});