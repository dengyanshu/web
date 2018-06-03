Ext.define("core.dip_kanban.view.item.SlList",{
	extend : "Ext.window.Window",
	alias : 'widget.dip_sl_list_kb',
	width:500,
	maximized:true,
	loadMask : true,
	layout:'fit',
	items:[{
		xtype:'grid',
		columns:[
			{text:'序号',dataIndex:'RowNum',width:50},
			{text:'工作中心',dataIndex:'WorkCenterName',width:120},
			{text:'料号',dataIndex:'ProductName',width:120},
			{text:'产品描述',dataIndex:'ProductDescript',width:300},
			{text:'需求数量',dataIndex:'RequireQuantity',width:80},
			{text:'备料数量',dataIndex:'ReadyQuantity',width:80},
			{text:'已用数量',dataIndex:'UsedQuantity',width:80},
			{text:'剩余数量',dataIndex:'SurplusMount',width:80},
			{text:'可生产板数',dataIndex:'CanUsePCBQty',width:100},
			{text:'单位数量',dataIndex:'UnitQty',width:80},
			{text:'库位',dataIndex:'StockLocation',width:120},
			{text:'站别',dataIndex:'SpecificationName',flex:1}
		],
		store:'core.dip_kanban.store.sl.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.dip_kanban.store.sl.ListStore',
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
				}
				return cls;
			}
		}
	}]
});