Ext.define("core.ck_kanban.view.item.SmtLl", {
			extend : "Ext.grid.Panel",
			alias : 'widget.ck_smt_ll_kb',
			loadMask : true, 
			stripeRows : true,
			store : 'core.ck_kanban.store.smt.ll.Store',
			columns : [
					{xtype: 'rownumberer',header:'序号',width : 50}, 
					{header : '工单',dataIndex : 'MOName',width : 140},
					{header : '工作中心',dataIndex : 'WorkCenterName',width : 100},
					{header : '产品描述',dataIndex : 'ProductSpecification',width : 270}, 
					{header : '已领物料项数/应领物料项数',dataIndex : 'ItemsCompleteRate',width : 260,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus(value);
						}
					},
					{header : '已领物料总数/应领物料总数',dataIndex : 'AbsoluteCompleteRate',width : 260,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus(value);
						}

					}, 
					{header : '完成率',dataIndex : 'AbsoluteCompleteRate',flex : 1,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus(value);
						}
					}
			],

			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.ck_kanban.store.smt.ll.Store',
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