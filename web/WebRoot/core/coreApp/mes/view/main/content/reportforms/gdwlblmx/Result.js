 /***************************************************************************
  								<工单物料备料明细查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.gdwlblmx.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.gdwlblmx.result',
	store:'core.mes.store.reportforms.gdwlblmx.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"料号",dataIndex:'ProductName',sortable:true},
		{header:"出货需求数量",dataIndex:'ItemQtyRequired',sortable:true},
		{header:"备料数量",dataIndex:'备料数量',sortable:true},
		{header:"产品描述",dataIndex:'ProductDescription',sortable:true},
		{header:"产品规格",dataIndex:'ProductSpecification',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.gdwlblmx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 