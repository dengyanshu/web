Ext.define("core.tj_ck_kanban.view.BlList",{
	extend : "Ext.window.Window",
	width:500,
	maximized:true,
	layout:'fit',
	items:[{
		xtype:'grid',
		columns:[
			{text:'序号',dataIndex:'RowNum',width:50},
			{text:'工作中心',dataIndex:'WorkCenterName',width:120},
			{text:'料号',dataIndex:'ProductName',width:130},
			{text:'产品描述',dataIndex:'ProductDescript',width:280},
			{text:'库位',dataIndex:'StockLocation',width:130},
			{text:'需求数量',dataIndex:'RequireQuantity',width:95},
			{text:'备料数量',dataIndex:'ReadyQuantity',width:95},
			{text:'已用数量',dataIndex:'UsedQuantity',width:95},
			{text:'剩余数量',dataIndex:'SurplusMount',width:95},
			{text:'单位用量',dataIndex:'UnitQty',width:95},
			{text:'可生产板数',dataIndex:'CanUsePCBQty',flex:1}
		],
		store:'core.tj_ck_kanban.store.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.tj_ck_kanban.store.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}],
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			getRowClass:function(record,rowIndex,p,store){
				var cls='';
				if(record.data.isAlert!="0"){ //等同于record.get('isAlert')
					cls="row-red .x-grid-cell";
				}else if(record.data.isAlert=="2"){
					cls="row-orange .x-grid-cell";
				}
				return cls;
			}
		}
	}]
});