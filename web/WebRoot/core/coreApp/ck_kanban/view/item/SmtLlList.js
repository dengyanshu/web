Ext.define("core.ck_kanban.view.item.SmtLlList",{
	extend : "Ext.window.Window",
	alias : 'widget.ck_smt_ll_list_kb',
	width:500,
	maximized:true,
	layout:'fit',
	items:[{
		xtype:'grid',
		columns:[
			{text:'序号',dataIndex:'RowNum',width:50},
			{text:'工作中心',dataIndex:'WorkCenterName',width:150},
			{text:'料号',dataIndex:'ProductName',width:150},
			{text:'产品描述',dataIndex:'ProductDescript',width:150},
			{text:'需求数量',dataIndex:'QtyRequired',width:150},
			{text:'领料数量',dataIndex:'QtySend',width:150},
			{text:'已使用数量',dataIndex:'QtyUsed',width:150},
			{text:'剩余数量',dataIndex:'QtyLeft',width:150},
			{text:'单位数量',dataIndex:'QtyUnit',width:150},
			{text:'可生产板数',dataIndex:'PCBCanUsed',flex:1}
			//{text:'isAlert',dataIndex:'isAlert',flex:1}
		],
		viewConfig:{
			forceFit:true,
			enableRowBody:true,
			getRowClass:function(record,rowIndex,p,store){
				var cls='';
				if(record.data.isAlert=="1"){ //等同于record.get('isAlert')
					cls="row-red .x-grid-cell";
				}else if(record.data.isAlert=="2"){
					cls="row-orange .x-grid-cell";
				}
				return cls;
			}
		},
		store:'core.ck_kanban.store.smt.ll.ListStore',
		dockedItems:[{
			xtype:'pagingtoolbar',
			store : 'core.ck_kanban.store.smt.ll.ListStore',
			dock:'bottom',
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
		}]
	}]
});