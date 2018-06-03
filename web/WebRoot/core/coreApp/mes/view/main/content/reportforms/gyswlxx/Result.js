 /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.gyswlxx.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.gyswlxx.result',
	store:'core.mes.store.reportforms.gyswlxx.Store',	
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单",width:100,dataIndex:'MOName',sortable:true},
		{header:"LotSN",width:100,dataIndex:'LotSN',sortable:true},
		{header:"物料批号",width:100,dataIndex:'物料批号',sortable:true},
		{header:"ProductName",width:100,dataIndex:'ProductName',sortable:true},
		{header:"供应商",width:100,dataIndex:'供应商',sortable:true},
		{header:"事业部",width:100,dataIndex:'事业部',sortable:true},
		{header:"LOT CODE",width:100,dataIndex:'LOT CODE',sortable:true},
		{header:"DATE CODE",width:100,dataIndex:'DATE CODE',sortable:true},
		{header:"数量",width:100,dataIndex:'数量',sortable:true},
		{header:"物料生产日期",width:100,dataIndex:'物料生产日期',sortable:true},
		{header:"规程",width:100,dataIndex:'规程',sortable:true},
		{header:"PSN码",width:100,dataIndex:'PSN码',sortable:true},
		{header:"用户描述",width:100,dataIndex:'UserDescription',sortable:true},
		{header:"扣料时间",width:100,dataIndex:'扣料时间',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.gyswlxx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 