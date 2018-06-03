Ext.define("core.ck_kanban.view.item.Bl", {
			extend : "Ext.grid.Panel",
			alias : 'widget.ck_bl_kb',
			loadMask : true, 
			stripeRows : true,
			store : 'core.ck_kanban.store.bl.Store',
			columns : [
					{xtype: 'rownumberer',header:'序号',width : 50}, 
					{
						header : '工单',
						dataIndex : 'moname',
						width : 140
					},
					{
						header : '工作中心',
						dataIndex : '工作中心',
						width : 100
					},{
						header : '产品描述',
						dataIndex : 'ProductSpecification',
						width : 300
					}, {
						header : '已备项数/应备项数',
						dataIndex : '已备项数/应备项数',
						width : 250,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus(value);
						}
					}, {
						header : '已备总数/应备总数',
						dataIndex : '已备总数/应备总数',
						width : 250,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus(value);
						}

					}, {
						header : '利用率',
						dataIndex : 'UtilizeRate',
						flex : 1,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus(value);
						}
					}

			]
		});