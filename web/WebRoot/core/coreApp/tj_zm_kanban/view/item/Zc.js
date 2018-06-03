Ext.define("core.tj_zm_kanban.view.item.Zc", {
			extend : "Ext.grid.Panel",
			alias : 'widget.tj_zm_zc_kb',
			loadMask : true, 
			stripeRows : true,
			store : 'core.tj_zm_kanban.store.zc.Store',
			columns : [
					{
						text : '序号',
						xtype : 'rownumberer',
						width : 100,
						align:'center'
					},
					{
						header : '工作中心',
						dataIndex : 'WorkcenterName',
						width : 200
					},
					{
						header : '工作中心',
						dataIndex : 'WorkcenterId',
						hidden:true
					},
					{
						header : '投入数量',
						dataIndex : 'InputQty',
						width : 200
					},{
						header : '产出数量',
						dataIndex : 'CompleteQty',
						width : 200
					},{
						header : '维修数量',
						dataIndex : 'RepairQty',
						flex : 1
					}

			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.tj_zm_kanban.store.zc.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据'
			}]
		});