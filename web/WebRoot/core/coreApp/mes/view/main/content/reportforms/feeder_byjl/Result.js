 /***************************************************************************
  								<Feeder保养记录查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.feeder_byjl.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.feeder_byjl.result',
	store:'core.mes.store.reportforms.feeder_byjl.Store',		
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"Feeder编号",width:100,dataIndex:'FeederName',sortable:true},
		{header:"规格描述",width:100,dataIndex:'FeederDescription',sortable:true},
		{header:"供应商",width:100,dataIndex:'Vendorname',sortable:true},
		{header:"用户名称",width:100,dataIndex:'Username',sortable:true},
		{header:"飞达状态",width:100,dataIndex:'FDStatus',sortable:true},
		{header:"飞达保养日期",width:100,dataIndex:'飞达保养日期',sortable:true},
		{header:"保养类型",width:100,dataIndex:'FeederType1',sortable:true},
		{header:"下一次月保养日期",width:100,dataIndex:'下一次月保养日期',sortable:true},
		{header:"下一次月季度保养日期",width:110,dataIndex:'下一次季度保养日期',sortable:true},
		{header:"下一次年保养日期",width:100,dataIndex:'下一次年保养日期',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.feeder_byjl.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];		
		this.callParent(arguments);
	}
 	
   });
 