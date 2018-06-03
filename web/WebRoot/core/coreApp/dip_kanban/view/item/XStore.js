Ext.define("core.dip_kanban.view.item.XStore", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_xstore_kb',
			loadMask : true,
			stripeRows : true,
			store : 'core.dip_kanban.store.xstore.Store',
			columns : [
			           {header : '料号',dataIndex : 'ProductName',flex : 2.0 }, 
			           {header : '仓别',dataIndex : 'StockName',flex : 2.0   }, 
			           {header : '库位',dataIndex : 'StockLocationName',flex : 2.0   }, 
			           {header : '存量',dataIndex : 'QTY',flex :2.0   }, 
			           {header : '备注',dataIndex : 'Remark',flex : 3.0 }
					],
					
					dockedItems:[{
						xtype:'pagingtoolbar',
						store : 'core.dip_kanban.store.xstore.Store',
						dock:'bottom',
						displayInfo:true,
						displayMsg:'第{0} 到 {1} 条数据 共{2}条',
						emptyMsg:'没有数据',
					}]

		});