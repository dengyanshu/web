 /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.cn.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.cn.result',
	store:'core.mes.store.reportforms.cn.Store',	
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"工单",width:100,dataIndex:'MOName',sortable:true},
		{header:"产品名称",width:100,dataIndex:'productname',sortable:true},
		{header:"产品描述",width:100,dataIndex:'ProductDescription',sortable:true},
		{header:"工作中心",width:100,dataIndex:'WorkcenterName',sortable:true},
		{header:"规程名",width:100,dataIndex:'SpecificationName',sortable:true},
		{header:"总产量",width:100,dataIndex:'总产量',sortable:true},
		{header:"开始时间",width:100,dataIndex:'开始事件',sortable:true},
		{header:"结束时间",width:100,dataIndex:'结束事件',sortable:true}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.cn.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];	
		this.callParent(arguments);
	}
 	
   });
 