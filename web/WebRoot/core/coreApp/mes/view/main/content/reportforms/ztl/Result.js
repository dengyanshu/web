 /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.ztl.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.ztl.result',
	store:'core.mes.store.reportforms.ztl.Store',	
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"生产时间",width:100,dataIndex:'0',sortable:true},
		{header:"生产名称",width:100,dataIndex:'1',sortable:true},
		{header:"产品规格",width:100,dataIndex:'2',sortable:true},
		{header:"产品描述",width:100,dataIndex:'3',sortable:true},
		{header:"工单",width:100,dataIndex:'4',sortable:true},
		{header:"sid",width:100,dataIndex:'5',sortable:true},
		{header:"WG",width:100,dataIndex:'6',sortable:true},
		{header:"总数",width:100,dataIndex:'7',sortable:true},
		{header:"一次Pass",width:100,dataIndex:'8',sortable:true},
		{header:"一次Fail",width:100,dataIndex:'9',sortable:true},
		{header:"重测Pass",width:100,dataIndex:'10',sortable:true},
		{header:"Pass重测Pass",width:100,dataIndex:'11',sortable:true},
		{header:"Fail重测Pass",width:100,dataIndex:'12',sortable:true},
		{header:"重测Fail",width:100,dataIndex:'13',sortable:true},
		{header:"Pass重测Fail",width:100,dataIndex:'14',sortable:true},
		{header:"Fail重测Fail",width:100,dataIndex:'15',sortable:true},
		{header:"一次Pass产出",width:100,dataIndex:'16',sortable:true},
		{header:"最终Pass产出",width:100,dataIndex:'17',sortable:true},
		{header:"误码率",width:100,dataIndex:'18',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.ztl.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
 