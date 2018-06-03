 /***************************************************************************
  								<锡膏使用记录查询> 
 ***************************************************************************/
 
   Ext.define("core.xigao.view.main.content.xgsyjlcx.Result",{
 	extend:"core.xigao.base.XiGaoBaseGrid",
 	alias:'widget.xgsyjlcx.result',
	store:'core.xigao.store.xgsyjlcx.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"锡膏SN",dataIndex:'锡膏SN',sortable:true,width:120},
		{header:"工单",dataIndex:'工单',sortable:true,width:100},
		{header:"ProductSpecification",dataIndex:'ProductSpecification',sortable:true,width:100},
		{header:"线体",dataIndex:'线体',sortable:true,width:100},
		{header:"锡膏型号",dataIndex:'锡膏型号',sortable:true,width:100},
		{header:"LotCode",dataIndex:'LotCode',sortable:true,width:100},
		{header:"DateCode",dataIndex:'DateCode',sortable:true,width:100},
		{header:"锡膏料号",dataIndex:'锡膏料号',sortable:true,width:100},
		{header:"锡膏入库时间",dataIndex:'锡膏入库时间',sortable:true,width:100},
		{header:"锡膏回温时间",dataIndex:'锡膏回温时间',sortable:true,width:100},
		{header:"锡膏出库时间",dataIndex:'锡膏出库时间',sortable:true,width:100},
		{header:"锡膏上线时间",dataIndex:'锡膏上线时间',sortable:true,width:100},
		{header:"使用人",dataIndex:'使用人',sortable:true,width:100}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.xigao.store.xgsyjlcx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
	   this.callParent(arguments);  //初始化后的参数传给上级
	}	
});
 