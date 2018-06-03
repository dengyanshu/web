 /***************************************************************************
  								<SMT上料查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.smt_sl.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.smt_sl.result',
	store:'core.mes.store.reportforms.smt_sl.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单",dataIndex:'0',sortable:true,width:100},
		{header:"SMT线别",dataIndex:'1',sortable:true,width:100},
		{header:"机台",dataIndex:'2',sortable:true,width:100},
		{header:"槽位号",dataIndex:'3',sortable:true,width:100},
		{header:"批号",dataIndex:'4',sortable:true,width:100},
		{header:"料号",dataIndex:'5',sortable:true,width:100},
		{header:"产品描述",dataIndex:'6',sortable:true,width:100},
		{header:"ResidueQTY",dataIndex:'7',sortable:true,width:100}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.smt_sl.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];

	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 