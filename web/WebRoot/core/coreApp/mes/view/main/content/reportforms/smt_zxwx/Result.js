 /***************************************************************************
  								<SMT在线维修查询> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.smt_zxwx.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.smt_zxwx.result',
	store:'core.mes.store.reportforms.smt_zxwx.Store',	
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单",width:100,dataIndex:'工单',sortable:true},
		{header:"LotSN",width:100,dataIndex:'LotSN批号',sortable:true},
		{header:"机型",width:100,dataIndex:'机型',sortable:true},
		{header:"维修方法代码（不良描述）",width:100,dataIndex:'维修方法代码(不良描述)',sortable:true},
		{header:"维修位置",width:100,dataIndex:'维修位置',sortable:true},
		{header:"维修次数",width:100,dataIndex:'维修次数',sortable:true},
		{header:"维修员",width:100,dataIndex:'维修员',sortable:true},
		{header:"维修时间",width:100,dataIndex:'维修时间',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.smt_zxwx.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 