 /***************************************************************************
  								<SMT贴片类型查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.smt_tplx.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.smt_tplx.result',
	store:'core.mes.store.reportforms.smt_tplx.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单",dataIndex:'MOName',sortable:true,width:200},
		{header:"PCB板类型为0_单面贴片/1_双面贴片",dataIndex:'MOSMTPath',sortable:true,width:200}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.smt_tplx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];

	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 