 /***************************************************************************
  								<物料入库查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.wlrk.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.wlrk.result',
	store:'core.mes.store.reportforms.wlrk.Store',	
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"产品",width:100,dataIndex:'产品',sortable:true},
		{header:"料号",width:100,dataIndex:'料号',sortable:true},
		{header:"入库收获数量",width:100,dataIndex:'入库收货数量',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.wlrk.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 