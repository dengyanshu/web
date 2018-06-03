Ext.define("core.ck_kanban.view.item.Bl", {
			extend : "Ext.grid.Panel",
			alias : 'widget.ck_bl_kb',
			loadMask : true, 
			stripeRows : true,
			store : 'core.ck_kanban.store.bl.Store',
			columns : [
					{xtype: 'rownumberer',header:'序号',width : 50}, 
					{
						header : '工作中心',
						dataIndex : 'WorkCenterName',
						width : 100
					},
					{
						header : '工单',
						dataIndex : 'MOName',
						width : 140
					},{
						header : '机种',
						dataIndex : 'ProductSpecification',
						width : 270
					},{
						header : '工单批量',
						dataIndex : 'ProductSpecification',
						width : 270
					},{
						header : '生产总量',
						dataIndex : 'ProductSpecification',
						width : 270
					},{
						header : '完工率',
						dataIndex : 'ProductSpecification',
						width : 270
					},{
						header : '当班计划量',
						dataIndex : 'ProductSpecification',
						width : 270
					},{
						header : '当班生产量',
						dataIndex : 'ProductSpecification',
						width : 270
					},{
						header : '差异数',
						dataIndex : 'ProductSpecification',
						width : 270
					},{
						header : '直通率',
						dataIndex : 'ProductSpecification',
						width : 270
					}, {
						header : '异常原因',
						dataIndex : 'UtilizeRate',
						flex : 1,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus(value);
						}
					}

			],

			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.ck_kanban.store.bl.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据'
			}]
		
		});