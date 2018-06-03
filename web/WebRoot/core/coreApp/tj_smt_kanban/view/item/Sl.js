Ext.define("core.tj_smt_kanban.view.item.Sl", {
			extend : "Ext.grid.Panel",
			alias : 'widget.tj_smt_sl_kb',
			loadMask : true,	 
			stripeRows : true,
			store : 'core.tj_smt_kanban.store.sl.Store',
			columns : [
					{
						header : '序号',
						dataIndex : 'RowNum',
						width : 50
					},
					{
						header : '工单',
						dataIndex : 'MOName',
						width : 140
					}, {
						header : '需求数量',
						dataIndex : 'MOQtyRequired',
						width : 80
					}, {
						header : '投入产出比',
						dataIndex : 'InputDone',
						width : 260,
						renderer : function(value) {
							return Ext.create("core.util.model.KanBanProgressStatus").ProgressStatus2(value);
						}
					}, {
						header : '料号',
						dataIndex : 'ProductName',
						width : 140
					}, {
						header : '生产线别',
						dataIndex : 'WorkCenterName',
						width : 80
					}, {
						header : '产品描述',
						dataIndex : 'ProductDescription',
						width : 240
					}, {
						header : '产品规格',
						dataIndex : 'ProductSpecification',
						flex : 1
					}

			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.tj_smt_kanban.store.sl.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
				//defaults:{xtype:'label'},
				items:[
					{xtype:'label',html:'<img src="/web/core/css/image/grid/green2.gif"/>'},
					{xtype:'label',text:'代表已投入数量'},
					{xtype:'label',html:'<img src="/web/core/css/image/grid/green.gif"/>'},
					{xtype:'label',text:'代表已完成数量'},
					{xtype:'button',text:'停止',action:'stop'},'-',
					{xtype:'textfield',name:'mo',emptyText:'请输入工单',disabled:true},'-',
					{xtype:'button',text:'查询',action:'search',disabled:true}
				]
			}]
		});