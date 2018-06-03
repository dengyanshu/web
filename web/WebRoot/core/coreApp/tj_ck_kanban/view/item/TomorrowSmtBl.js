Ext.define("core.tj_ck_kanban.view.item.TomorrowSmtBl", {
			extend : "Ext.grid.Panel",
			alias : 'widget.tj_ck_tomorrow_smt_bl_kb',
			loadMask : true, 
			stripeRows : true,
			store : 'core.tj_ck_kanban.store.tomorrow_bl.smt.Store',
			columns : [
					{xtype: 'rownumberer',header:'序号',width : 50}, 
					{
						header : '工单',
						dataIndex : 'MOName',
						width : 140
					},
					{
						header : '工作中心',
						dataIndex : 'WorkCenterName',
						width : 100
					},{
						header : '产品描述',
						dataIndex : 'ProductSpecification',
						width : 270
					}, {
						header : '已备项数/应备项数',
						dataIndex : '已备项数/应备项数',
						width : 260,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus(value);
						}
					}, {
						header : '已备总数/应备总数',
						dataIndex : '已备总数/应备总数',
						width : 260,
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

			],

			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.tj_ck_kanban.store.tomorrow_bl.smt.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
				items:[
					{xtype:'button',text:'停止',action:'stop'},'-',
					{xtype:'textfield',name:'mo',emptyText:'请输入工单',disabled:true},'-',
					{xtype:'button',text:'查询',action:'search',disabled:true}
				]
			}]
		
		});