 /***************************************************************************
  								<批号物料细明查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.phwlxm.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.phwlxm.result',
	store:'core.mes.store.reportforms.phwlxm.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单号",dataIndex:'MOName',sortable:true,width:120},
		{header:"主批号",dataIndex:'LotSN',sortable:true,width:100},
		{header:"物料批号",dataIndex:'物料批号',sortable:true,width:100},
		{header:"料号",dataIndex:'ProductName',sortable:true,width:100},
		{header:"供应商",dataIndex:'供应商',sortable:true,width:100},
		{header:"事业部",dataIndex:'事业部',sortable:true,width:100},
		{header:"Lot Code",dataIndex:'LOT CODE',sortable:true,width:100},
		{header:"Date Code",dataIndex:'DATE CODE',sortable:true,width:100},
		{header:"数量",dataIndex:'数量',sortable:true,width:100},
		{header:"物料生产日期",dataIndex:'物料生产日期',sortable:true,width:100},
		{header:"规程",dataIndex:'规程',sortable:true,width:100},
		{header:"PSN码",dataIndex:'PSN码',sortable:true,width:100},
		{header:"用户描述",dataIndex:'UserDescription',sortable:true,width:100},
		{header:"扣料日期",dataIndex:'扣料时间',sortable:true,width:100}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.phwlxm.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];

	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 