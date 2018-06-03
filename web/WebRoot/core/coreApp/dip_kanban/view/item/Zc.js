Ext.define("core.dip_kanban.view.item.Zc", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_zc_kb',
			loadMask : true,	 
			stripeRows : true,
			store : 'core.dip_kanban.store.zc.Store',
			columns : [
					{
						header : '序号',
						dataIndex : 'RowNum',
						width : 50
					},
					{
						header : '工单',
						dataIndex : 'MOName',
						width : 120
					}, 
					{
						header : '工作中心',
						dataIndex : 'WorkCenterName',
						width : 120
					},
					{
						header : '工单需求量',
						dataIndex : 'MOQtyRequired',
						width : 100
					},
					
					{
						header : '投入产出比',
						dataIndex : 'InputDone',
						width : 260,
						renderer : function(value) {
							return Ext.create('core.util.model.KanBanProgressStatus').ProgressStatus2(value);
						}
					}, 
					
					{
						header : '料号',
						dataIndex : 'ProductName',
						width : 140
					},
					{
						header : '产品描述',
						dataIndex : 'ProductDescription',
						width : 260
					}, 
					{
						header : '产品规格',
						dataIndex : 'ProductSpecification',
						flex : 1
					}
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.zc.Store',
				dock:'bottom',
				displayInfo:true,
				displayMsg:'第{0} 到 {1} 条数据 共{2}条',
				emptyMsg:'没有数据',
				items:[
					{xtype:'label',html:'<img src="/web/core/css/image/grid/green2.gif"/>'},
					{xtype:'label',text:'代表已投入比'},
					{xtype:'label',html:'<img src="/web/core/css/image/grid/green.gif"/>'},
					{xtype:'label',text:'代表已完成比'},
					{xtype:'button',text:'停止',action:'stop'},'-',
					{xtype:'textfield',name:'mo',emptyText:'请输入工单',disabled:true},'-',
					{xtype:'button',text:'查询',action:'search',disabled:true}
				]
			}]
		});