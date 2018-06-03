 /***************************************************************************
  								<收料查询结果显示界面> 
 ***************************************************************************/
 
   Ext.define("core.mes.view.main.content.reportforms.ckwl.Result",{
   	extend:"core.mes.base.BaseGrid",
 	alias:'widget.ckwl.result',
	store:'core.mes.store.reportforms.ckwl.Store1',
	columns:[  
		{xtype: 'rownumberer',header:'序号',width : 50,align:'center'},
		{header:"库位",dataIndex:'库位',sortable:true,width:200},
		{header:"产品描述",dataIndex:'产品描述',sortable:true,width:200},
		{header:"料号",dataIndex:'料号',sortable:true,width:200}
	],
	initComponent:function(){
		this.dockedItems=[{
			xtype:'pagingtoolbar',
			store:'core.mes.store.reportforms.ckwl.Store1',
			dock:'bottom',
			pageSize:15,
			displayInfo:true,
			displayMsg:'第{0} 到 {1} 条数据 共{2}条',
			emptyMsg:'没有数据'
	}];
	   this.callParent(arguments);  //初始化后的参数传给上级
	}
 	
   });
 