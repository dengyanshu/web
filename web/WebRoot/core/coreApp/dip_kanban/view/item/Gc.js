Ext.define("core.dip_kanban.view.item.Gc", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_gc_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.dip_kanban.store.gc.Store',
			columns : [
					{header : '序号',dataIndex : 'id',flex : 0.4},
					{header : '工单',dataIndex : 'MOName',flex : 1.4}, 
					{header : '线别',dataIndex : 'WorkcenterName',flex : 0.8}, 
					//{header : '制程列表',dataIndex : 'WorkprocedureFlowName_List',flex : 1.2},
					{header : '工单需求数量',dataIndex : 'MOQtyRequired',flex : 1.2},
					//{header : '计划数量',dataIndex : 'PlanQty',flex : 0.8},
					{header : '标准产能',dataIndex : 'StandardProductivity',flex : 0.8},
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.gc.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
			}]

		});