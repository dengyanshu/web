Ext.define("core.dip_kanban.view.item.Cll", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_cll_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.dip_kanban.store.cll.Store',
			columns : [
			           {header : '序号',dataIndex : 'id',flex : 0.4 }, 
			           {header : '工单',dataIndex : 'MOName',flex : 1.7 }, 
			           {header : '料号',dataIndex : 'ProductName',flex : 1.4 }, 
			           {header : '物料描述',dataIndex : 'ProductDescription',flex : 1.4 }, 
			           {header : '超领--需求数量',dataIndex : 'RequireQty',flex : 1.4 }, 
			           {header : '余料仓--库存数量',dataIndex : 'StockQty',flex : 1.5 }, 
			           {header : '备注',dataIndex : 'Remark',flex : 1.3 }
					],
					
					dockedItems:[{
						xtype:'pagingtoolbar',
						store : 'core.dip_kanban.store.cll.Store',
						dock:'bottom',
						displayInfo:true,
						displayMsg:'第{0} 到 {1} 条数据 共{2}条',
						emptyMsg:'没有数据',
					}]

		});