 /***************************************************************************
  								<SMT产能查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.smt_cn.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.smt_cn.result',
	store:'core.mes.store.reportforms.smt_cn.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单",width:100,dataIndex:'MOName',sortable:true},
		{header:"订单号",width:100,dataIndex:'workcenterID',sortable:true},
		{header:"手机工作中心",width:100,dataIndex:'WorkcenterName',sortable:true},
		{header:"执行开始日期",width:100,dataIndex:'ExecutedateFrom',sortable:true},
		{header:"料号",width:100,dataIndex:'ProductName',sortable:true},
		{header:"产品描述",width:100,dataIndex:'ProductDescription',sortable:true},
		{header:"计划数量",width:100,dataIndex:'MOQtyRequired',sortable:true},
		{header:"投入数量",width:100,dataIndex:'DIPStartQty',sortable:true},
		{header:"SMTEndQty",width:100,dataIndex:'SMTEndQty',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.smt_cn.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 