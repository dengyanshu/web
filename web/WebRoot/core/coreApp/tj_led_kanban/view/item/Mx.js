Ext.define("core.tj_led_kanban.view.item.Mx", {
			extend : "Ext.grid.Panel",
			alias : 'widget.tj_led_mx_kb',
			loadMask : true, 
			stripeRows : true,
			store : 'core.tj_led_kanban.store.mx.Store',
			columns : [
					{
						header : '序号',
						dataIndex : 'RowNum',
						width : 50
					},
					{
						header : '工单',
						dataIndex : 'MOName',
						width : 150
					},
					{
						header : '料号',
						dataIndex : 'ProductName',
						width : 150
					},{
						header : 'RankA',
						dataIndex : 'RankA',
						width : 150
					},{
						header : 'RankB',
						dataIndex : 'RankB',
						width : 150
					},{
						header : 'Group',
						dataIndex : 'GroupTJ',
						width : 150
					},{
						header : '卓翼机型',
						dataIndex : 'zoweeType',
						width : 150
					},{
						header : '产品描述',
						dataIndex : 'ProductDescript',
						flex : 1
					}

			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.tj_led_kanban.store.mx.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
				items:[
					'-',
					{xtype:'button',text:'停止',action:'stop'},'-',
					{xtype:'textfield',name:'mo',emptyText:'请输入工单',disabled:true},'-',
					{xtype:'button',text:'查询',action:'search',disabled:true}
				]
			}]
		});