 /***************************************************************************
  								<物料收料单回传查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.wlsldhc.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.wlsldhc.result',
	store:'core.mes.store.reportforms.wlsldhc.Store',		
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"POName",width:100,dataIndex:'POName',sortable:true},
		{header:"MDocCode",width:100,dataIndex:'MDocCode',sortable:true},
		{header:"LotQty",width:100,dataIndex:'LotQty',sortable:true},
		{header:"ProductName",width:100,dataIndex:'ProductName',sortable:true},
		{header:"ProductDescription",width:100,dataIndex:'ProductDescription',sortable:true},
		{header:"IsmDoc",width:100,dataIndex:'IsmDoc',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.wlsldhc.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 