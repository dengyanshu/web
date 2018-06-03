 /***************************************************************************
  								<数据链查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.sjl.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.sjl.result',
	store:'core.mes.store.reportforms.sjl.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"事件日期",dataIndex:'EVENTDATE',sortable:true,width:120},
		{header:"事件码",dataIndex:'LotId',sortable:true,width:100},
		{header:"工作流节点名称",dataIndex:'DataChainId',sortable:true,width:100},
		{header:"用户名称",dataIndex:'TxnCode',sortable:true,width:100},
		{header:"手机工作中心",dataIndex:'WorkflowStepName',sortable:true,width:100},
		{header:"资源名称",dataIndex:'UserName',sortable:true,width:100},
		{header:"用户备注说明",dataIndex:'WorkcenterName',sortable:true,width:100}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.sjl.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];

	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 