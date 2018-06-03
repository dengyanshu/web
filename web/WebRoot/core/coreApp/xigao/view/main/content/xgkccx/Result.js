 /***************************************************************************
  								<锡膏库存查询>  
 ***************************************************************************/
 
   Ext.define("core.xigao.view.main.content.xgkccx.Result",{
 	extend:"core.xigao.base.XiGaoBaseGrid",
 	alias:'widget.xgkccx.result',
	store:'core.xigao.store.xgkccx.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"锡膏SN",dataIndex:'锡膏SN',sortable:true,width:120},
		{header:"LotCode",dataIndex:'LotCode',sortable:true,width:100},
		{header:"DateCode",dataIndex:'DateCode',sortable:true,width:100},
		{header:"锡膏料号",dataIndex:'锡膏料号',sortable:true,width:100},
		{header:"锡膏型号",dataIndex:'锡膏型号',sortable:true,width:100},
		{header:"锡膏状态",dataIndex:'锡膏状态',sortable:true,width:100}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.xigao.store.xgkccx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
	   this.callParent(arguments);  //初始化后的参数传给上级
	}	
});
 