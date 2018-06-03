 /***************************************************************************
  								<工单物料出库明细查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.gdwlckmx.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.gdwlckmx.result',
	store:'core.mes.store.reportforms.gdwlckmx.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"料号",dataIndex:'ProductName',sortable:true,width:100},
		{header:"出货需求数量",dataIndex:'ItemQtyRequired',sortable:true,width:100},
		{header:"出库数量",dataIndex:'出库数量',sortable:true,width:100},
		{header:"产品描述",dataIndex:'ProductDescription',sortable:true,width:100},
		{header:"产品规格",dataIndex:'ProductSpecification',sortable:true,width:100}
		
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.gdwlckmx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 