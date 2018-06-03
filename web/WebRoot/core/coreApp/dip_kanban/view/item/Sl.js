var states = Ext.create('Ext.data.Store', {
    fields: ['abbr', 'name'],
    data : [
        {"abbr":"WKC10000000D", "name":"test1"}
    ]
});

Ext.define("core.dip_kanban.view.item.Sl", {
			extend : "Ext.grid.Panel",
			alias : 'widget.dip_sl_kb',
			loadMask : true,	 
			stripeRows : true,
			store : 'core.dip_kanban.store.sl.Store',
			columns : [
	   			{text:'序号',dataIndex:'RowNum',width:80},
	   			{text:'工单',dataIndex:'MOName',width:180},
	   			{text:'需求数量',dataIndex:'MOQtyRequired',width:100},
	   			{text:'投入产出比',dataIndex:'InputDone',width:260,
					renderer : function(value) {
						return Ext.create('core.util.model.KanBanProgressStatus').ProgressStatus2(value);
					}
				},
	   			{text:'料号',dataIndex:'ProductName',width:180},
	   			{text:'生产线别',dataIndex:'WorkCenterName',width:100},
	   			{text:'产品描述',dataIndex:'ProductDescription',width:180},
	   			{text:'产品规格',dataIndex:'ProductSpecification',width:180}
			],
			dockedItems:[{
				xtype:'pagingtoolbar',
				store : 'core.dip_kanban.store.sl.Store',
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