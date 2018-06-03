 /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.sljl.Result",{
 	extend:"core.mes.base.BaseGrid",
 	alias:'widget.sljl.result',
	store:'core.mes.store.reportforms.sljl.Store',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"机型",width:100,dataIndex:'机型',sortable:true},
		{header:"线别",width:100,dataIndex:'  线别  ',sortable:true},
		{header:"机台&槽位",width:100,dataIndex:'机台& 槽位',sortable:true},
		{header:"上料物料条码",width:100,dataIndex:'上料物料条码 ',sortable:true},
		{header:"上料数量",width:100,dataIndex:'上料数量 ',sortable:true},
		{header:"料号",width:100,dataIndex:'料号 ',sortable:true},
		{header:"上料时间",width:100,dataIndex:'上料时间 ',sortable:true},
		//{header:"物料描述",width:100,dataIndex:'ProductDescription',sortable:true},
		{header:"物料规格描述",width:100,dataIndex:'物料规格描述',sortable:true},
		{header:"物料直接供应商",width:100,dataIndex:'物料直接供应商 ',sortable:true}
	],						
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.sljl.Store',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
		
		this.callParent(arguments);
	}
 	
   });
   
 