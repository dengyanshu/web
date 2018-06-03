 /***************************************************************************
  								<工厂产线实际生产安排查询操作界面> 
 ***************************************************************************/
 
  Ext.define("core.mes.view.main.content.reportforms.gccxsjscap.Center",{
  	extend:"core.mes.base.BaseGrid",
 	alias:'widget.result.center',
	store:'core.mes.store.reportforms.gccxsjscap.Store',		
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工作中心",width:100,dataIndex:'工作中心',sortable:true},
		{header:"工单",width:100,dataIndex:'工单',sortable:true},
		{header:"工单数量",width:100,dataIndex:'工单数量',sortable:true},
		{header:"产品描述",width:100,dataIndex:'产品描述',sortable:true},
		{header:"生产开始时间",width:100,dataIndex:'生产开始时间',sortable:true},
		{header:"生产结束时间",width:100,dataIndex:'生产结束时间',sortable:true},
		{header:"计划生产开始时间",width:100,dataIndex:'计划生产开始时间',sortable:true},
		{header:"计划生产结束时间",width:100,dataIndex:'计划生产结束时间',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			dock:'bottom',
			store:'core.mes.store.reportforms.gccxsjscap.Store',
			pageSize: 15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];	
		this.callParent(arguments);
	}

 });