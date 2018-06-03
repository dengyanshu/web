 /***************************************************************************
  								<入库查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.rk.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.rk.result',
	store:'core.mes.store.reportforms.rk.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"产品",dataIndex:'0',sortable:true,width:200},
		{header:"料号",dataIndex:'1',sortable:true,width:200},
		{header:"入库收获数量",dataIndex:'2',sortable:true,width:200}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.rk.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];

	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 